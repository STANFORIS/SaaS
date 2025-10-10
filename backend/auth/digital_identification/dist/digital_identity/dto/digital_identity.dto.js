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
exports.IdentityUpdateRequest = exports.IdentityVerificationResponse = exports.IdentityVerificationRequest = exports.IdentityLoginResponse = exports.IdentityLoginRequest = exports.IdentityRegisterResponse = exports.IdentityRegisterRequest = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("./enums");
class IdentityRegisterRequest {
    constructor() {
        this.identity_type = enums_1.IdentityType.NATIONAL_ID;
        this.enablePublish = true;
    }
}
exports.IdentityRegisterRequest = IdentityRegisterRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "national_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.IdentityType),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "identity_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "middle_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", Number)
], IdentityRegisterRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "sector", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "cell", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "village", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "isibo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "fingerprint_data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "face_image_data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "iris_scan_data", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "public_key", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MaritalStatus),
    __metadata("design:type", Number)
], IdentityRegisterRequest.prototype, "marital_status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RegistrationSource),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "registration_source", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "request_timestamp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "registrar_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "registration_center_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "device_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "system_unique_email_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityRegisterRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], IdentityRegisterRequest.prototype, "enablePublish", void 0);
class IdentityRegisterResponse {
}
exports.IdentityRegisterResponse = IdentityRegisterResponse;
class IdentityLoginRequest {
    constructor() {
        this.enablePublish = true;
    }
}
exports.IdentityLoginRequest = IdentityLoginRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityLoginRequest.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityLoginRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityLoginRequest.prototype, "device_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], IdentityLoginRequest.prototype, "enablePublish", void 0);
class IdentityLoginResponse {
}
exports.IdentityLoginResponse = IdentityLoginResponse;
class IdentityVerificationRequest {
}
exports.IdentityVerificationRequest = IdentityVerificationRequest;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityVerificationRequest.prototype, "token", void 0);
class IdentityVerificationResponse {
}
exports.IdentityVerificationResponse = IdentityVerificationResponse;
class IdentityUpdateRequest {
    constructor() {
        this.enablePublish = true;
    }
}
exports.IdentityUpdateRequest = IdentityUpdateRequest;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "first_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "middle_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "last_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "date_of_birth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", Number)
], IdentityUpdateRequest.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], IdentityUpdateRequest.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MaritalStatus),
    __metadata("design:type", Number)
], IdentityUpdateRequest.prototype, "marital_status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], IdentityUpdateRequest.prototype, "enablePublish", void 0);
//# sourceMappingURL=digital_identity.dto.js.map