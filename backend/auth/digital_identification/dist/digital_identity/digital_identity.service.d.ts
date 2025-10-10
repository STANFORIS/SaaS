import { ClientProxy } from '@nestjs/microservices';
import { IdentityRegisterRequest, IdentityRegisterResponse, IdentityLoginRequest } from './dto/digital_identity.dto';
import { IdentityStatus } from './dto/enums';
export declare class DigitalIdentityService {
    private readonly eventPublisher?;
    private readonly logger;
    private readonly ENABLE_PUBLISH;
    private readonly ENABLE_BIOMETRICS_ENCRYPTION;
    private readonly ENVIRONMENT;
    private readonly JWT_SECRET;
    private readonly JWT_EXPIRES_IN_SECONDS;
    private readonly JWT_ALGORITHM;
    private inMemoryStore;
    constructor(eventPublisher?: ClientProxy | undefined);
    registerIdentity(dto: IdentityRegisterRequest): Promise<IdentityRegisterResponse>;
    authenticateUser(dto: IdentityLoginRequest): Promise<IdentityRegisterResponse>;
    verifyIdentityToken(token: string): Promise<{
        valid: boolean;
        digital_identity_id?: string;
        status?: IdentityStatus;
        message?: string;
    }>;
    getIdentityById(id: string): Promise<any | null>;
    getIdentityByNationalId(nationalId: string): Promise<any | null>;
    updateIdentity(id: string, updates: Partial<IdentityRegisterRequest>): Promise<any>;
    revokeIdentity(id: string, reason?: string): Promise<void>;
    listIdentities(page?: number, perPage?: number, filters?: any): Promise<{
        items: any[];
        total: number;
    }>;
    private saveRecord;
    private generateJwt;
    private findByUsername;
    private encrypt;
    private publishEvent;
}
