import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Determine proto path dynamically for dev vs prod
  const protoPath =
    process.env.NODE_ENV === 'production'
      ? join(__dirname, 'proto/stanforis_digital_identity.proto') // dist folder
      : join(__dirname, '../proto/stanforis_digital_identity.proto'); // src folder

  // gRPC microservice setup
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'stanforis.auth.digital_id',
      protoPath,
      url: '0.0.0.0:50051',
    },
  });

  // Start microservices
  await app.startAllMicroservices();
  await app.listen(3000, '0.0.0.0');

  console.log('SDIP NestJS microservice running on http://localhost:3000');
}

bootstrap();
