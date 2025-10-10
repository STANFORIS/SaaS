
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SurrealService } from './digital_identity/db/surreal.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // 🧹 Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🔗 Connect to NATS microservice
  const natsOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://localhost:4222'],
      queue: 'digital_identity_queue',
      name: 'digital_identity_service',
    },
  };
  app.connectMicroservice(natsOptions);
  console.log('🔗 NATS microservice configured with servers:', natsOptions.options?.servers);

  // 🧠 gRPC microservice setup
  const protoPath =
    process.env.NODE_ENV === 'production'
      ? join(__dirname, 'proto/stanforis_digital_identity.proto')
      : join(__dirname, '../proto/stanforis_digital_identity.proto');

  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'stanforis.auth.digital_id',
      protoPath,
      url: '0.0.0.0:50051',
    },
  };
  app.connectMicroservice(grpcOptions);
  console.log('🧠 gRPC microservice configured at:', grpcOptions.options.url);

  // ⚙️ Initialize SurrealDB via SurrealService
  try {
    const surrealService = app.get(SurrealService);
    await surrealService.init(); // internally connects, signs in, and selects namespace/db
  } catch (err) {
    console.error('❌ Failed to initialize SurrealDB via SurrealService:', err);
  }

  // 🚀 Start microservices and HTTP server
  await app.startAllMicroservices();
  await app.listen(3000, '0.0.0.0');
  console.log('🛰️ SDIP NestJS microservice running on http://localhost:3000');
}

bootstrap();

