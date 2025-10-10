"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const microservices_1 = require("@nestjs/microservices");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const surreal_service_1 = require("./digital_identity/db/surreal.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const natsOptions = {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: [process.env.NATS_URL || 'nats://localhost:4222'],
            queue: 'digital_identity_queue',
            name: 'digital_identity_service',
        },
    };
    app.connectMicroservice(natsOptions);
    console.log('🔗 NATS microservice configured with servers:', natsOptions.options?.servers);
    const protoPath = process.env.NODE_ENV === 'production'
        ? (0, path_1.join)(__dirname, 'proto/stanforis_digital_identity.proto')
        : (0, path_1.join)(__dirname, '../proto/stanforis_digital_identity.proto');
    const grpcOptions = {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'stanforis.auth.digital_id',
            protoPath,
            url: '0.0.0.0:50051',
        },
    };
    app.connectMicroservice(grpcOptions);
    console.log('🧠 gRPC microservice configured at:', grpcOptions.options.url);
    try {
        const surrealService = app.get(surreal_service_1.SurrealService);
        await surrealService.init();
    }
    catch (err) {
        console.error('❌ Failed to initialize SurrealDB via SurrealService:', err);
    }
    await app.startAllMicroservices();
    await app.listen(3000, '0.0.0.0');
    console.log('🛰️ SDIP NestJS microservice running on http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map