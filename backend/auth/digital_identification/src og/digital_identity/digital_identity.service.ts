// src/digital_identity/digital_identity.service.ts
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
import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,
} from './dto/digital_identity.dto';

const JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days
const JWT_SECRET = process.env.JWT_SECRET || 'stanforis-dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

@Injectable()
export class DigitalIdentityService {
  private readonly logger = new Logger(DigitalIdentityService.name);

  // Temporary in-memory storage
  private inMemoryStore = new Map<string, any>();

  /**
   * Registers a new digital identity
   */
  async registerIdentity(dto: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    try {
      // Check if identity already exists
      const exists = await this.getIdentityByNationalId(dto.national_id);
      if (exists) {
        throw new ConflictException('Identity with provided national_id already exists');
      }

      // Hash password
      const passwordHash = await this.hashPassword(dto.password);

      // Build record
      const digitalIdentityId = `SID-${Date.now()}-${Math.round(Math.random() * 9999)}`;
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
        biometrics: {
          fingerprint_data: dto.fingerprint_data,
          face_image_data: dto.face_image_data,
          iris_scan_data: dto.iris_scan_data,
        },
        crypto: {
          public_key: dto.public_key,
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
          status: 'ACTIVE',
        },
      };

      // Save to in-memory (later replace with DB)
      await this.saveToSurrealDB(record);

      // Generate JWT
      const token = this.generateJwt({ sub: digitalIdentityId, username: dto.username });

      const response: IdentityRegisterResponse = {
        digital_identity_id: digitalIdentityId,
        token,
        status: 'ACTIVE',
        message: 'Registration successful',
      };

      return response;
    } catch (err) {
      this.logger.error('registerIdentity error', err);
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException('Failed to register identity');
    }
  }

  /**
   * Authenticate user with username/password
   */
  async authenticateUser(dto: IdentityLoginRequest): Promise<IdentityRegisterResponse> {
    try {
      const record = await this.findByUsername(dto.username);
      if (!record) throw new NotFoundException('User not found');

      const match = await this.comparePassword(dto.password, record.auth.password_hash);
      if (!match) {
        throw new InternalServerErrorException('Invalid credentials');
      }

      const token = this.generateJwt({ sub: record.digital_identity_id, username: dto.username });

      return {
        digital_identity_id: record.digital_identity_id,
        token,
        status: record.metadata?.status ?? 'ACTIVE',
        message: 'Login successful',
      };
    } catch (err) {
      this.logger.error('authenticateUser error', err);
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  /**
   * Verify JWT token validity
   */
  async verifyIdentityToken(
    token: string,
  ): Promise<{ valid: boolean; digital_identity_id?: string; status?: string; message?: string }> {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      const id = payload?.sub;
      if (!id) return { valid: false, message: 'Invalid token payload' };

      const record = await this.getIdentityById(id);
      if (!record) return { valid: false, message: 'Identity not found' };

      if (record.metadata?.status !== 'ACTIVE') {
        return { valid: false, digital_identity_id: id, status: record.metadata?.status, message: 'Identity not active' };
      }

      return { valid: true, digital_identity_id: id, status: 'ACTIVE', message: 'Token valid' };
    } catch (err) {
      this.logger.warn('verifyIdentityToken failed', (err as any)?.message ?? String(err));
      return { valid: false, message: 'Token invalid or expired' };
    }
  }

  /**
   * Public methods used by the controller
   */
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
    if (!record) throw new NotFoundException('Identity not found');

    const merged = {
      ...record,
      ...updates,
      metadata: { ...record.metadata, ...(updates as any).metadata },
    };

    await this.saveToSurrealDB(merged);
    return merged;
  }

  async revokeIdentity(id: string, reason?: string): Promise<void> {
    const record = await this.getIdentityById(id);
    if (!record) throw new NotFoundException('Identity not found');
    record.metadata = record.metadata ?? {};
    record.metadata.status = 'REVOKED';
    record.metadata.revoked_at = new Date().toISOString();
    record.metadata.revoke_reason = reason;
    await this.saveToSurrealDB(record);
  }

  async listIdentities(
    page = 1,
    perPage = 20,
    filters: any = {},
  ): Promise<{ items: any[]; total: number }> {
    const items = Array.from(this.inMemoryStore.values());
    const total = items.length;
    const start = (page - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);
    return { items: pageItems, total };
  }

  /* ---------------------------
     Helpers
  --------------------------- */

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private generateJwt(payload: Record<string, any>): string {
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN_SECONDS };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  private async saveToSurrealDB(record: any): Promise<void> {
    if (!record.digital_identity_id) {
      throw new InternalServerErrorException('Missing digital_identity_id in record');
    }
    this.inMemoryStore.set(record.digital_identity_id, record);
    this.logger.log(`Saved identity ${record.digital_identity_id} to in-memory store (TODO: persist to DB).`);
  }

  private async findByUsername(username: string): Promise<any | null> {
    for (const v of this.inMemoryStore.values()) {
      if (v.auth?.username === username) return v;
    }
    return null;
  }
}
