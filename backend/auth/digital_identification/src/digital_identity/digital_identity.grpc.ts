// src/digital_identity/digital_identity.grpc.ts
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DigitalIdentityService } from './digital_identity.service';
import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,
  IdentityLoginResponse,
} from './dto/digital_identity.dto';
import { IdentityStatus, ErrorCode } from './dto/enums';

@Controller()
export class DigitalIdentityGrpcController {
  private readonly logger = new Logger(DigitalIdentityGrpcController.name);

  constructor(private readonly service: DigitalIdentityService) {}

  @GrpcMethod('DigitalIdentityService', 'RegisterIdentity')
  async registerIdentity(request: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    try {
      const result = await this.service.registerIdentity(request);
      return {
        digital_identity_id: result.digital_identity_id,
        token: result.token,
        status: IdentityStatus.ACTIVE,
        message: result.message,
      };
    } catch (err: any) {
      this.logger.error('gRPC RegisterIdentity failed', err);
      return {
        digital_identity_id: '',
        token: '',
        status: IdentityStatus.DEACTIVATED,
        message: err?.message || ErrorCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @GrpcMethod('DigitalIdentityService', 'Login')
  async login(request: IdentityLoginRequest): Promise<IdentityLoginResponse> {
    try {
      const result = await this.service.authenticateUser(request);
      return {
        digital_identity_id: result.digital_identity_id,
        token: result.token,
        status: result.status as IdentityStatus,
        message: result.message,
      };
    } catch (err: any) {
      this.logger.error('gRPC Login failed', err);
      return {
        digital_identity_id: '',
        token: '',
        status: IdentityStatus.DEACTIVATED,
        message: err?.message || ErrorCode.AUTHENTICATION_FAILED,
      };
    }
  }

  @GrpcMethod('DigitalIdentityService', 'VerifyIdentity')
  async verifyIdentity(request: { token: string }) {
    try {
      const result = await this.service.verifyIdentityToken(request.token);
      return {
        valid: result.valid,
        digital_identity_id: result.digital_identity_id || '',
        status: result.status || IdentityStatus.DEACTIVATED,
        message: result.message || '',
      };
    } catch (err: any) {
      this.logger.error('gRPC VerifyIdentity failed', err);
      return {
        valid: false,
        digital_identity_id: '',
        status: IdentityStatus.DEACTIVATED,
        message: err?.message || ErrorCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
