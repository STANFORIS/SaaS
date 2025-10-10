
// src/digital_identity/digital_identity.grpc.ts
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DigitalIdentityService } from './digital_identity.service';
import {
  IdentityRegisterRequest,
  IdentityRegisterResponse,
  IdentityLoginRequest,       // <-- add this line
} from './dto/digital_identity.dto';


@Controller()
export class DigitalIdentityGrpcController {
  constructor(private readonly service: DigitalIdentityService) {}

  @GrpcMethod('DigitalIdentityService', 'RegisterIdentity')
  async registerIdentity(request: IdentityRegisterRequest): Promise<IdentityRegisterResponse> {
    return this.service.registerIdentity(request);
  }

  @GrpcMethod('DigitalIdentityService', 'Login')
  async login(request: IdentityLoginRequest): Promise<IdentityRegisterResponse> {
    return this.service.authenticateUser(request);
  }

  @GrpcMethod('DigitalIdentityService', 'VerifyIdentity')
  async verifyIdentity(request: { token: string }) {
    return this.service.verifyIdentityToken(request.token);
  }
}
