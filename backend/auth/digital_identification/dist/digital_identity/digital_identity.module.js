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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalIdentityModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const digital_identity_controller_1 = require("./digital_identity.controller");
const digital_identity_grpc_1 = require("./digital_identity.grpc");
const digital_identity_service_1 = require("./digital_identity.service");
const surreal_service_1 = require("./db/surreal.service");
let DigitalIdentityModule = class DigitalIdentityModule {
    constructor(surreal) {
        this.surreal = surreal;
    }
    async onModuleInit() {
        await this.surreal.init();
    }
};
exports.DigitalIdentityModule = DigitalIdentityModule;
exports.DigitalIdentityModule = DigitalIdentityModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'NATS_SERVICE',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        servers: [process.env.NATS_URL || 'nats://localhost:4222'],
                    },
                },
            ]),
        ],
        controllers: [
            digital_identity_controller_1.DigitalIdentityController,
            digital_identity_grpc_1.DigitalIdentityGrpcController,
        ],
        providers: [
            surreal_service_1.SurrealService,
            {
                provide: digital_identity_service_1.DigitalIdentityService,
                useFactory: (client) => new digital_identity_service_1.DigitalIdentityService(client),
                inject: ['NATS_SERVICE'],
            },
        ],
        exports: [
            digital_identity_service_1.DigitalIdentityService,
            surreal_service_1.SurrealService,
        ],
    }),
    __metadata("design:paramtypes", [surreal_service_1.SurrealService])
], DigitalIdentityModule);
//# sourceMappingURL=digital_identity.module.js.map