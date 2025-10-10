// src/digital_identity/digital_identity.module.ts
import { Module, Global, OnModuleInit } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxy } from '@nestjs/microservices';
import { DigitalIdentityController } from './digital_identity.controller';
import { DigitalIdentityGrpcController } from './digital_identity.grpc';
import { DigitalIdentityService } from './digital_identity.service';
import { SurrealService } from './db/surreal.service';

@Global() // Make this module globally available
@Module({
  imports: [
    // Register NATS client for event publishing
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [
    DigitalIdentityController,
    DigitalIdentityGrpcController,
  ],
  providers: [
    SurrealService, // <- add this here so Nest can inject it
    {
      provide: DigitalIdentityService,
      useFactory: (client: ClientProxy) => new DigitalIdentityService(client),
      inject: ['NATS_SERVICE'], // Inject the NATS client into the service
    },
  ],
  exports: [
    DigitalIdentityService,
    SurrealService, // <- export it for global use
  ],
})
export class DigitalIdentityModule implements OnModuleInit {
  constructor(private readonly surreal: SurrealService) {}

  async onModuleInit() {
    await this.surreal.init();
  }
}
