import { DigitalIdentityService } from './digital_identity.service';
import { IdentityRegisterRequest, IdentityRegisterResponse, IdentityLoginRequest, IdentityLoginResponse } from './dto/digital_identity.dto';
import { IdentityStatus } from './dto/enums';
export declare class DigitalIdentityGrpcController {
    private readonly service;
    private readonly logger;
    constructor(service: DigitalIdentityService);
    registerIdentity(request: IdentityRegisterRequest): Promise<IdentityRegisterResponse>;
    login(request: IdentityLoginRequest): Promise<IdentityLoginResponse>;
    verifyIdentity(request: {
        token: string;
    }): Promise<{
        valid: boolean;
        digital_identity_id: string;
        status: IdentityStatus;
        message: any;
    }>;
}
