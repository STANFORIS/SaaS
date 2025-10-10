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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DigitalIdentityController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalIdentityController = void 0;
const common_1 = require("@nestjs/common");
const digital_identity_service_1 = require("./digital_identity.service");
const digital_identity_dto_1 = require("./dto/digital_identity.dto");
const enums_1 = require("./dto/enums");
let DigitalIdentityController = DigitalIdentityController_1 = class DigitalIdentityController {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger(DigitalIdentityController_1.name);
    }
    async register(body) {
        try {
            return await this.service.registerIdentity(body);
        }
        catch (err) {
            this.logger.error('Registration failed', err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body) {
        try {
            return await this.service.authenticateUser(body);
        }
        catch (err) {
            this.logger.error('Login failed', err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.AUTHENTICATION_FAILED, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verify(token) {
        try {
            return await this.service.verifyIdentityToken(token);
        }
        catch (err) {
            this.logger.error('Token verification failed', err);
            throw new common_1.HttpException(enums_1.ErrorCode.INTERNAL_SERVER_ERROR, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getIdentityById(id) {
        try {
            const rec = await this.service.getIdentityById(id);
            if (!rec)
                throw new common_1.HttpException(enums_1.ErrorCode.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            const safe = { ...rec, auth: undefined, biometrics: undefined };
            return safe;
        }
        catch (err) {
            this.logger.error(`Get identity by ID failed for ${id}`, err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getIdentityByNationalId(nid) {
        try {
            const rec = await this.service.getIdentityByNationalId(nid);
            if (!rec)
                throw new common_1.HttpException(enums_1.ErrorCode.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            const safe = { ...rec, auth: undefined, biometrics: undefined };
            return safe;
        }
        catch (err) {
            this.logger.error(`Get identity by National ID failed for ${nid}`, err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateIdentity(id, updates) {
        try {
            const updated = await this.service.updateIdentity(id, updates);
            const safe = { ...updated, auth: undefined, biometrics: undefined };
            return safe;
        }
        catch (err) {
            this.logger.error(`Update identity failed for ${id}`, err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async revokeIdentity(id, reason) {
        try {
            await this.service.revokeIdentity(id, reason);
            return { message: 'Identity revoked' };
        }
        catch (err) {
            this.logger.error(`Revoke identity failed for ${id}`, err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async listIdentities(page = '1', perPage = '20') {
        try {
            const p = parseInt(page, 10) || 1;
            const pp = parseInt(perPage, 10) || 20;
            return this.service.listIdentities(p, pp, {});
        }
        catch (err) {
            this.logger.error('List identities failed', err);
            throw new common_1.HttpException(err?.message || enums_1.ErrorCode.INTERNAL_SERVER_ERROR, err?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.DigitalIdentityController = DigitalIdentityController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [digital_identity_dto_1.IdentityRegisterRequest]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [digital_identity_dto_1.IdentityLoginRequest]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)('identity/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "getIdentityById", null);
__decorate([
    (0, common_1.Get)('identity/national/:nid'),
    __param(0, (0, common_1.Param)('nid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "getIdentityByNationalId", null);
__decorate([
    (0, common_1.Patch)('identity/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "updateIdentity", null);
__decorate([
    (0, common_1.Post)('identity/:id/revoke'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "revokeIdentity", null);
__decorate([
    (0, common_1.Get)('identities'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('perPage')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DigitalIdentityController.prototype, "listIdentities", null);
exports.DigitalIdentityController = DigitalIdentityController = DigitalIdentityController_1 = __decorate([
    (0, common_1.Controller)('digital-identity'),
    __metadata("design:paramtypes", [digital_identity_service_1.DigitalIdentityService])
], DigitalIdentityController);
//# sourceMappingURL=digital_identity.controller.js.map