
import { Module } from '@nestjs/common';
import { DigitalIdentityController } from './digital_identity.controller';
import { DigitalIdentityGrpcController } from './digital_identity.grpc';
import { DigitalIdentityService } from './digital_identity.service';

@Module({
  controllers: [
    DigitalIdentityController,
    DigitalIdentityGrpcController,
  ],
  providers: [
    DigitalIdentityService,
  ],
  exports: [
    DigitalIdentityService,
  ],
})
export class DigitalIdentityModule {}
