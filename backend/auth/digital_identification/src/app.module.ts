// Root module
import { Module } from '@nestjs/common';
import { DigitalIdentityModule } from './digital_identity/digital_identity.module';

@Module({
  imports: [DigitalIdentityModule],
})
export class AppModule {}
