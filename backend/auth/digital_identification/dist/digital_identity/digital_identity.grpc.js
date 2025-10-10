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
var DigitalIdentityGrpcController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalIdentityGrpcController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const digital_identity_service_1 = require("./digital_identity.service");
const digital_identity_dto_1 = require("./dto/digital_identity.dto");
const enums_1 = require("./dto/enums");
let DigitalIdentityGrpcController = DigitalIdentityGrpcController_1 = class DigitalIdentityGrpcController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(DigitalIdentityGrpcController_1.name);
    }
    async registerIdentity(request) {
        try {
            const result = await this.service.registerIdentity(request);
            return {
                digital_identity_id: result.digital_identity_id,
                token: result.token,
                status: enums_1.IdentityStatus.ACTIVE,
                message: result.message,
            };
        }
        catch (err) {
            this.logger.error('gRPC RegisterIdentity failed', err);
            return {
                digital_identity_id: '',
                token: '',
                status: enums_1.IdentityStatus.DEACTIVATED,
                message: err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async login(request) {
        try {
            const result = await this.service.authenticateUser(request);
            return {
                digital_identity_id: result.digital_identity_id,
                token: result.token,
                status: result.status,
                message: result.message,
            };
        }
        catch (err) {
            this.logger.error('gRPC Login failed', err);
            return {
                digital_identity_id: '',
                token: '',
                status: enums_1.IdentityStatus.DEACTIVATED,
                message: err?.message || enums_1.ErrorCode.AUTHENTICATION_FAILED,
            };
        }
    }
    async verifyIdentity(request) {
        try {
            const result = await this.service.verifyIdentityToken(request.token);
            return {
                valid: result.valid,
                digital_identity_id: result.digital_identity_id || '',
                status: result.status || enums_1.IdentityStatus.DEACTIVATED,
                message: result.message || '',
            };
        }
        catch (err) {
            this.logger.error('gRPC VerifyIdentity failed', err);
            return {
                valid: false,
                digital_identity_id: '',
                status: enums_1.IdentityStatus.DEACTIVATED,
                message: err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
exports.DigitalIdentityGrpcController = DigitalIdentityGrpcController;
__decorate([
    (0, microservices_1.GrpcMethod)('DigitalIdentityService', 'RegisterIdentity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [digital_identity_dto_1.IdentityRegisterRequest]),
    __metadata("design:returntype", Promise)
], DigitalIdentityGrpcController.prototype, "registerIdentity", null);
__decorate([
    (0, microservices_1.GrpcMethod)('DigitalIdentityService', 'Login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [digital_identity_dto_1.IdentityLoginRequest]),
    __metadata("design:returntype", Promise)
], DigitalIdentityGrpcController.prototype, "login", null);
__decorate([
    (0, microservices_1.GrpcMethod)('DigitalIdentityService', 'VerifyIdentity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DigitalIdentityGrpcController.prototype, "verifyIdentity", null);
exports.DigitalIdentityGrpcController = DigitalIdentityGrpcController = DigitalIdentityGrpcController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [digital_identity_service_1.DigitalIdentityService])
], DigitalIdentityGrpcController);
//# sourceMappingURL=digital_identity.grpc.js.map