"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DigitalIdentityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalIdentityService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rxjs_1 = require("rxjs");
const microservices_1 = require("@nestjs/microservices");
const enums_1 = require("./dto/enums");
let DigitalIdentityService = DigitalIdentityService_1 = class DigitalIdentityService {
    constructor(eventPublisher) {
        this.eventPublisher = eventPublisher;
        this.logger = new common_1.Logger(DigitalIdentityService_1.name);
        this.ENABLE_PUBLISH = process.env.ENABLE_PUBLISH === 'true' || true;
        this.ENABLE_BIOMETRICS_ENCRYPTION = process.env.ENABLE_BIOMETRICS_ENCRYPTION === 'true' || true;
        this.ENVIRONMENT = process.env.ENVIRONMENT || enums_1.Environment.DEVELOPMENT;
        this.JWT_SECRET = process.env.JWT_SECRET || 'stanforis-dev-secret';
        this.JWT_EXPIRES_IN_SECONDS = 7 * 24 * 60 * 60;
        this.JWT_ALGORITHM = 'HS256';
        this.inMemoryStore = new Map();
    }
    async registerIdentity(dto) {
        try {
            const exists = await this.getIdentityByNationalId(dto.national_id);
            if (exists)
                throw new common_1.ConflictException(enums_1.ErrorCode.INVALID_REQUEST + ': Identity exists');
            const passwordHash = await bcrypt.hash(dto.password, 10);
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
                    status: enums_1.IdentityStatus.ACTIVE,
                },
            };
            await this.saveRecord(record);
            const token = this.generateJwt({ sub: digitalIdentityId, username: dto.username });
            if (this.ENABLE_PUBLISH && this.eventPublisher) {
                await this.publishEvent(enums_1.EventType.IDENTITY_REGISTERED, {
                    digital_identity_id: digitalIdentityId,
                    national_id: dto.national_id,
                    registered_at: new Date().toISOString(),
                    registrar_id: dto.registrar_id,
                    registration_center_id: dto.registration_center_id,
                });
            }
            return { digital_identity_id: digitalIdentityId, token, status: enums_1.IdentityStatus.ACTIVE, message: 'Registration successful' };
        }
        catch (err) {
            this.logger.error('registerIdentity error', err);
            if (err instanceof common_1.ConflictException)
                throw err;
            throw new common_1.InternalServerErrorException(enums_1.ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
    async authenticateUser(dto) {
        try {
            const record = await this.findByUsername(dto.username);
            if (!record)
                throw new common_1.NotFoundException(enums_1.ErrorCode.USER_NOT_FOUND);
            const match = await bcrypt.compare(dto.password, record.auth.password_hash);
            if (!match)
                throw new common_1.InternalServerErrorException(enums_1.ErrorCode.AUTHENTICATION_FAILED);
            const token = this.generateJwt({ sub: record.digital_identity_id, username: dto.username });
            if (this.ENABLE_PUBLISH && this.eventPublisher) {
                await this.publishEvent(enums_1.EventType.IDENTITY_UPDATED, {
                    digital_identity_id: record.digital_identity_id,
                    login_at: new Date().toISOString(),
                    device_id: dto.device_id,
                });
            }
            return {
                digital_identity_id: record.digital_identity_id,
                token,
                status: record.metadata?.status ?? enums_1.IdentityStatus.ACTIVE,
                message: 'Login successful',
            };
        }
        catch (err) {
            this.logger.error('authenticateUser error', err);
            if (err instanceof common_1.NotFoundException)
                throw err;
            throw new common_1.InternalServerErrorException(enums_1.ErrorCode.AUTHENTICATION_FAILED);
        }
    }
    async verifyIdentityToken(token) {
        try {
            const payload = jwt.verify(token, this.JWT_SECRET);
            const id = payload?.sub;
            if (!id)
                return { valid: false, message: 'Invalid token' };
            const record = await this.getIdentityById(id);
            if (!record)
                return { valid: false, message: 'Identity not found' };
            if (record.metadata?.status !== enums_1.IdentityStatus.ACTIVE) {
                return { valid: false, digital_identity_id: id, status: record.metadata?.status, message: 'Identity not active' };
            }
            return { valid: true, digital_identity_id: id, status: enums_1.IdentityStatus.ACTIVE, message: 'Token valid' };
        }
        catch (err) {
            this.logger.warn('verifyIdentityToken failed', err?.message ?? String(err));
            return { valid: false, message: 'Token invalid or expired' };
        }
    }
    async getIdentityById(id) {
        return this.inMemoryStore.get(id) ?? null;
    }
    async getIdentityByNationalId(nationalId) {
        for (const v of this.inMemoryStore.values()) {
            if (v.national_id === nationalId)
                return v;
        }
        return null;
    }
    async updateIdentity(id, updates) {
        const record = await this.getIdentityById(id);
        if (!record)
            throw new common_1.NotFoundException(enums_1.ErrorCode.USER_NOT_FOUND);
        const merged = {
            ...record,
            ...updates,
            metadata: { ...record.metadata, ...updates.metadata },
        };
        await this.saveRecord(merged);
        if (this.ENABLE_PUBLISH && this.eventPublisher) {
            await this.publishEvent(enums_1.EventType.IDENTITY_UPDATED, { digital_identity_id: id, updated_at: new Date().toISOString() });
        }
        return merged;
    }
    async revokeIdentity(id, reason) {
        const record = await this.getIdentityById(id);
        if (!record)
            throw new common_1.NotFoundException(enums_1.ErrorCode.USER_NOT_FOUND);
        record.metadata.status = enums_1.IdentityStatus.DEACTIVATED;
        record.metadata.revoked_at = new Date().toISOString();
        record.metadata.revoke_reason = reason;
        await this.saveRecord(record);
        if (this.ENABLE_PUBLISH && this.eventPublisher) {
            await this.publishEvent(enums_1.EventType.IDENTITY_DEACTIVATED, { digital_identity_id: id, revoked_at: record.metadata.revoked_at, reason });
        }
    }
    async listIdentities(page = 1, perPage = 20, filters = {}) {
        const items = Array.from(this.inMemoryStore.values());
        const total = items.length;
        const start = (page - 1) * perPage;
        const pageItems = items.slice(start, start + perPage);
        return { items: pageItems, total };
    }
    async saveRecord(record) {
        if (!record.digital_identity_id)
            throw new common_1.InternalServerErrorException('Missing ID');
        this.inMemoryStore.set(record.digital_identity_id, record);
        this.logger.log(`Saved identity ${record.digital_identity_id}`);
    }
    generateJwt(payload) {
        const options = { expiresIn: this.JWT_EXPIRES_IN_SECONDS, algorithm: this.JWT_ALGORITHM };
        return jwt.sign(payload, this.JWT_SECRET, options);
    }
    async findByUsername(username) {
        for (const v of this.inMemoryStore.values()) {
            if (v.auth?.username === username)
                return v;
        }
        return null;
    }
    encrypt(data) {
        return Buffer.from(data).toString('base64');
    }
    async publishEvent(eventType, payload) {
        if (!this.eventPublisher)
            return;
        try {
            await (0, rxjs_1.firstValueFrom)(this.eventPublisher.emit(eventType, payload));
            this.logger.log(`Published event ${eventType}`);
        }
        catch (err) {
            this.logger.error(`Failed to publish event ${eventType}`, err);
        }
    }
};
exports.DigitalIdentityService = DigitalIdentityService;
exports.DigitalIdentityService = DigitalIdentityService = DigitalIdentityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], DigitalIdentityService);
//# sourceMappingURL=digital_identity.service.js.map