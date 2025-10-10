import { DigitalIdentityService } from './digital_identity.service';
import { IdentityRegisterRequest, IdentityRegisterResponse, IdentityLoginRequest } from './dto/digital_identity.dto';
export declare class DigitalIdentityController {
    private readonly service;
    private readonly logger;
    constructor(service: DigitalIdentityService);
    register(body: IdentityRegisterRequest): Promise<IdentityRegisterResponse>;
    login(body: IdentityLoginRequest): Promise<IdentityRegisterResponse>;
    verify(token: string): Promise<{
        valid: boolean;
        digital_identity_id?: string;
        status?: import("./dto/enums").IdentityStatus;
        message?: string;
    }>;
    getIdentityById(id: string): Promise<any>;
    getIdentityByNationalId(nid: string): Promise<any>;
    updateIdentity(id: string, updates: Partial<IdentityRegisterRequest>): Promise<any>;
    revokeIdentity(id: string, reason?: string): Promise<{
        message: string;
    }>;
    listIdentities(page?: string, perPage?: string): Promise<{
        items: any[];
        total: number;
    }>;
}
