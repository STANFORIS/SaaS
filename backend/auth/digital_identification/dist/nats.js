"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NatsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatsService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let NatsService = NatsService_1 = class NatsService {
    constructor() {
        this.logger = new common_1.Logger(NatsService_1.name);
        this.defaultTimeout = 5000;
        this.isConnected = false;
        this.servers = [process.env.NATS_URL || 'nats://localhost:4222'];
    }
    onModuleInit() {
        this.connect();
    }
    onModuleDestroy() {
        this.disconnect();
    }
    connect() {
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.NATS,
            options: {
                servers: this.servers,
                queue: process.env.NATS_QUEUE || 'default_queue',
                name: process.env.SERVICE_NAME || 'stanforis_service',
            },
        });
        this.client.connect().then(() => {
            this.isConnected = true;
            this.logger.log(`Connected to NATS: ${this.servers.join(',')}`);
        }).catch(err => {
            this.isConnected = false;
            this.logger.error('Failed to connect to NATS', err);
        });
    }
    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.isConnected = false;
            this.logger.log('Disconnected from NATS');
        }
    }
    async publish(event, payload, enablePublish = true) {
        if (!enablePublish)
            return;
        if (!this.isConnected) {
            this.logger.warn(`NATS not connected, skipping publish for event: ${event}`);
            return;
        }
        try {
            await (0, rxjs_1.lastValueFrom)(this.client.emit(event, payload).pipe((0, rxjs_1.timeout)(this.defaultTimeout), (0, rxjs_1.catchError)(err => {
                this.logger.error(`NATS publish error for event ${event}`, err);
                throw err;
            })));
            this.logger.log(`Published event ${event}`);
        }
        catch (err) {
            this.logger.error(`Failed to publish event ${event}`, err);
        }
    }
    async request(pattern, payload) {
        if (!this.isConnected)
            throw new Error('NATS not connected');
        return (0, rxjs_1.lastValueFrom)(this.client.send(pattern, payload).pipe((0, rxjs_1.timeout)(this.defaultTimeout)));
    }
    async ping() {
        try {
            await this.request('health_check', { timestamp: Date.now() });
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.NatsService = NatsService;
exports.NatsService = NatsService = NatsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NatsService);
//# sourceMappingURL=nats.js.map