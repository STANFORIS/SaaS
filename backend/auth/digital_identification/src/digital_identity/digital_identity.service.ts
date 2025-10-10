

import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,
} from './dto/digital_identity.dto';
import { ErrorCode, IdentityStatus, EventType, Environment } from './dto/enums';

@Injectable()
export class DigitalIdentityService {
  private readonly logger = new Logger(DigitalIdentityService.name);

  // Configurations
  private readonly ENABLE_PUBLISH = process.env.ENABLE_PUBLISH === 'true' || true;
  private readonly ENABLE_BIOMETRICS_ENCRYPTION = process.env.ENABLE_BIOMETRICS_ENCRYPTION === 'true' || true;
  private readonly ENVIRONMENT: Environment = (process.env.ENVIRONMENT as Environment) || Environment.DEVELOPMENT;

  // JWT configs
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'stanforis-dev-secret';
  private readonly JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days
  private readonly JWT_ALGORITHM: jwt.Algorithm = 'HS256';

  // Temporary in-memory store (replace with DB)
  private inMemoryStore = new Map<string, any>();

  constructor(private readonly eventPublisher?: ClientProxy) {}

  /** -------------------------
   *  Registration / Login
   * ------------------------- */

  async registerIdentity(dto: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    try {
      // Check existing identity
      const exists = await this.getIdentityByNationalId(dto.national_id);
      if (exists) throw new ConflictException(ErrorCode.INVALID_REQUEST + ': Identity exists');

      // Hash password
      const passwordHash = await bcrypt.hash(dto.password, 10);

      // Build record
      const digitalIdentityId = `SID-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
      const record = {
        digital_identity_id: digitalIdentityId,
        national_id: dto.national_id,
        profile: {
          first_name: dto.first_name,
          middle_name: dto.middle_name,
          last_name: dto.last_name,
          date_of_birth: dto.date_of_birth,
          gender: dto.gender,
          nationality: dto.nationality,
          province: dto.province,
          district: dto.district,
          sector: dto.sector,
          cell: dto.cell,
          village: dto.village,
          isibo: dto.isibo,
          phone: dto.phone,
          email: dto.email,
          address: dto.address,
          occupation: dto.occupation,
          marital_status: dto.marital_status,
        },
        biometrics: this.ENABLE_BIOMETRICS_ENCRYPTION
          ? {
              fingerprint_data: this.encrypt(dto.fingerprint_data),
              face_image_data: this.encrypt(dto.face_image_data),
              iris_scan_data: this.encrypt(dto.iris_scan_data),
            }
          : {
              fingerprint_data: dto.fingerprint_data,
              face_image_data: dto.face_image_data,
              iris_scan_data: dto.iris_scan_data,
            },
        crypto: {
          public_key: this.encrypt(dto.public_key),
        },
        auth: {
          system_unique_email_id: dto.system_unique_email_id,
          username: dto.username,
          password_hash: passwordHash,
        },
        metadata: {
          registration_source: dto.registration_source,
          request_timestamp: dto.request_timestamp,
          registrar_id: dto.registrar_id,
          registration_center_id: dto.registration_center_id,
          device_id: dto.device_id,
          created_at: new Date().toISOString(),
          status: IdentityStatus.ACTIVE,
        },
      };

      // Save to DB (here in-memory)
      await this.saveRecord(record);

      // Generate JWT
      const token = this.generateJwt({ sub: digitalIdentityId, username: dto.username });

      // Publish event if enabled
      if (this.ENABLE_PUBLISH && this.eventPublisher) {
        await this.publishEvent(EventType.IDENTITY_REGISTERED, {
          digital_identity_id: digitalIdentityId,
          national_id: dto.national_id,
          registered_at: new Date().toISOString(),
          registrar_id: dto.registrar_id,
          registration_center_id: dto.registration_center_id,
        });
      }

      return { digital_identity_id: digitalIdentityId, token, status: IdentityStatus.ACTIVE, message: 'Registration successful' };
    } catch (err) {
      this.logger.error('registerIdentity error', err);
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException(ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  async authenticateUser(dto: IdentityLoginRequest): Promise<IdentityRegisterResponse> {
    try {
      const record = await this.findByUsername(dto.username);
      if (!record) throw new NotFoundException(ErrorCode.USER_NOT_FOUND);

      const match = await bcrypt.compare(dto.password, record.auth.password_hash);
      if (!match) throw new InternalServerErrorException(ErrorCode.AUTHENTICATION_FAILED);

      const token = this.generateJwt({ sub: record.digital_identity_id, username: dto.username });

      // Publish login event
      if (this.ENABLE_PUBLISH && this.eventPublisher) {
        await this.publishEvent(EventType.IDENTITY_UPDATED, {
          digital_identity_id: record.digital_identity_id,
          login_at: new Date().toISOString(),
          device_id: dto.device_id,
        });
      }

      return {
        digital_identity_id: record.digital_identity_id,
        token,
        status: record.metadata?.status ?? IdentityStatus.ACTIVE,
        message: 'Login successful',
      };
    } catch (err) {
      this.logger.error('authenticateUser error', err);
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(ErrorCode.AUTHENTICATION_FAILED);
    }
  }

  async verifyIdentityToken(token: string): Promise<{ valid: boolean; digital_identity_id?: string; status?: IdentityStatus; message?: string }> {
    try {
      const payload = jwt.verify(token, this.JWT_SECRET) as any;
      const id = payload?.sub;
      if (!id) return { valid: false, message: 'Invalid token' };

      const record = await this.getIdentityById(id);
      if (!record) return { valid: false, message: 'Identity not found' };

      if (record.metadata?.status !== IdentityStatus.ACTIVE) {
        return { valid: false, digital_identity_id: id, status: record.metadata?.status, message: 'Identity not active' };
      }

      return { valid: true, digital_identity_id: id, status: IdentityStatus.ACTIVE, message: 'Token valid' };
    } catch (err) {
      this.logger.warn('verifyIdentityToken failed', (err as any)?.message ?? String(err));
      return { valid: false, message: 'Token invalid or expired' };
    }
  }

  /** -------------------------
   *  CRUD Methods
   * ------------------------- */

  async getIdentityById(id: string): Promise<any | null> {
    return this.inMemoryStore.get(id) ?? null;
  }

  async getIdentityByNationalId(nationalId: string): Promise<any | null> {
    for (const v of this.inMemoryStore.values()) {
      if (v.national_id === nationalId) return v;
    }
    return null;
  }

  async updateIdentity(id: string, updates: Partial<IdentityRegisterRequest>): Promise<any> {
    const record = await this.getIdentityById(id);
    if (!record) throw new NotFoundException(ErrorCode.USER_NOT_FOUND);

    const merged = {
      ...record,
      ...updates,
      metadata: { ...record.metadata, ...(updates as any).metadata },
    };

    await this.saveRecord(merged);

    if (this.ENABLE_PUBLISH && this.eventPublisher) {
      await this.publishEvent(EventType.IDENTITY_UPDATED, { digital_identity_id: id, updated_at: new Date().toISOString() });
    }

    return merged;
  }

  async revokeIdentity(id: string, reason?: string): Promise<void> {
    const record = await this.getIdentityById(id);
    if (!record) throw new NotFoundException(ErrorCode.USER_NOT_FOUND);

    record.metadata.status = IdentityStatus.DEACTIVATED;
    record.metadata.revoked_at = new Date().toISOString();
    record.metadata.revoke_reason = reason;

    await this.saveRecord(record);

    if (this.ENABLE_PUBLISH && this.eventPublisher) {
      await this.publishEvent(EventType.IDENTITY_DEACTIVATED, { digital_identity_id: id, revoked_at: record.metadata.revoked_at, reason });
    }
  }

  async listIdentities(page = 1, perPage = 20, filters: any = {}): Promise<{ items: any[]; total: number }> {
    const items = Array.from(this.inMemoryStore.values());
    const total = items.length;
    const start = (page - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);
    return { items: pageItems, total };
  }

  /** -------------------------
   *  Helpers
   * ------------------------- */

  private async saveRecord(record: any): Promise<void> {
    if (!record.digital_identity_id) throw new InternalServerErrorException('Missing ID');
    this.inMemoryStore.set(record.digital_identity_id, record);
    this.logger.log(`Saved identity ${record.digital_identity_id}`);
  }

  private generateJwt(payload: Record<string, any>): string {
    const options: SignOptions = { expiresIn: this.JWT_EXPIRES_IN_SECONDS, algorithm: this.JWT_ALGORITHM };
    return jwt.sign(payload, this.JWT_SECRET, options);
  }

  private async findByUsername(username: string): Promise<any | null> {
    for (const v of this.inMemoryStore.values()) {
      if (v.auth?.username === username) return v;
    }
    return null;
  }

  private encrypt(data: string): string {
    // TODO: Replace with real AES/RSA encryption if enabled
    return Buffer.from(data).toString('base64');
  }

  private async publishEvent(eventType: EventType, payload: any) {
    if (!this.eventPublisher) return;
    try {
      await firstValueFrom(this.eventPublisher.emit(eventType, payload));
      this.logger.log(`Published event ${eventType}`);
    } catch (err) {
      this.logger.error(`Failed to publish event ${eventType}`, err);
    }
  }
}
