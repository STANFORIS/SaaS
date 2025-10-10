"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertStatus = exports.AlertLevel = exports.MonitoringTool = exports.RiskStatus = exports.RiskLevel = exports.ComplianceStatus = exports.ComplianceStandard = exports.AuditLevel = exports.AuditType = exports.SessionType = exports.SessionStatus = exports.TokenStatus = exports.TokenType = exports.EncryptionAlgorithm = exports.HashingAlgorithm = exports.Environment = exports.DataSource = exports.VerificationStatus = exports.VerificationMethod = exports.NotificationStatus = exports.NotificationType = exports.AuditStatus = exports.AuditAction = exports.Permission = exports.Role = exports.Language = exports.CommunicationChannel = exports.DeviceStatus = exports.DeviceType = exports.ErrorCode = exports.EventType = exports.BiometricType = exports.IdentityType = exports.RegistrationStatus = exports.LoginStatus = exports.RegistrationSource = exports.IdentityStatus = exports.MaritalStatus = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender[Gender["UNKNOWN"] = 0] = "UNKNOWN";
    Gender[Gender["MALE"] = 1] = "MALE";
    Gender[Gender["FEMALE"] = 2] = "FEMALE";
    Gender[Gender["OTHER"] = 3] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus[MaritalStatus["SINGLE"] = 0] = "SINGLE";
    MaritalStatus[MaritalStatus["MARRIED"] = 1] = "MARRIED";
    MaritalStatus[MaritalStatus["DIVORCED"] = 2] = "DIVORCED";
    MaritalStatus[MaritalStatus["WIDOWED"] = 3] = "WIDOWED";
})(MaritalStatus || (exports.MaritalStatus = MaritalStatus = {}));
var IdentityStatus;
(function (IdentityStatus) {
    IdentityStatus["ACTIVE"] = "ACTIVE";
    IdentityStatus["INACTIVE"] = "INACTIVE";
    IdentityStatus["SUSPENDED"] = "SUSPENDED";
    IdentityStatus["DEACTIVATED"] = "DEACTIVATED";
})(IdentityStatus || (exports.IdentityStatus = IdentityStatus = {}));
var RegistrationSource;
(function (RegistrationSource) {
    RegistrationSource["ONLINE"] = "ONLINE";
    RegistrationSource["OFFLINE"] = "OFFLINE";
})(RegistrationSource || (exports.RegistrationSource = RegistrationSource = {}));
var LoginStatus;
(function (LoginStatus) {
    LoginStatus["SUCCESS"] = "SUCCESS";
    LoginStatus["FAILED"] = "FAILED";
    LoginStatus["LOCKED"] = "LOCKED";
})(LoginStatus || (exports.LoginStatus = LoginStatus = {}));
var RegistrationStatus;
(function (RegistrationStatus) {
    RegistrationStatus["SUCCESS"] = "SUCCESS";
    RegistrationStatus["FAILED"] = "FAILED";
    RegistrationStatus["PENDING"] = "PENDING";
})(RegistrationStatus || (exports.RegistrationStatus = RegistrationStatus = {}));
var IdentityType;
(function (IdentityType) {
    IdentityType["NATIONAL_ID"] = "NATIONAL_ID";
    IdentityType["PASSPORT"] = "PASSPORT";
    IdentityType["DRIVER_LICENSE"] = "DRIVER_LICENSE";
})(IdentityType || (exports.IdentityType = IdentityType = {}));
var BiometricType;
(function (BiometricType) {
    BiometricType["FINGERPRINT"] = "FINGERPRINT";
    BiometricType["FACE"] = "FACE";
    BiometricType["IRIS"] = "IRIS";
})(BiometricType || (exports.BiometricType = BiometricType = {}));
var EventType;
(function (EventType) {
    EventType["IDENTITY_REGISTERED"] = "IDENTITY_REGISTERED";
    EventType["IDENTITY_UPDATED"] = "IDENTITY_UPDATED";
    EventType["IDENTITY_DEACTIVATED"] = "IDENTITY_DEACTIVATED";
})(EventType || (exports.EventType = EventType = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    ErrorCode["AUTHENTICATION_FAILED"] = "AUTHENTICATION_FAILED";
    ErrorCode["AUTHORIZATION_FAILED"] = "AUTHORIZATION_FAILED";
    ErrorCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["MOBILE"] = "MOBILE";
    DeviceType["TABLET"] = "TABLET";
    DeviceType["DESKTOP"] = "DESKTOP";
    DeviceType["KIOSK"] = "KIOSK";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["ACTIVE"] = "ACTIVE";
    DeviceStatus["INACTIVE"] = "INACTIVE";
    DeviceStatus["BLOCKED"] = "BLOCKED";
})(DeviceStatus || (exports.DeviceStatus = DeviceStatus = {}));
var CommunicationChannel;
(function (CommunicationChannel) {
    CommunicationChannel["SMS"] = "SMS";
    CommunicationChannel["EMAIL"] = "EMAIL";
    CommunicationChannel["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
})(CommunicationChannel || (exports.CommunicationChannel = CommunicationChannel = {}));
var Language;
(function (Language) {
    Language["ENGLISH"] = "ENGLISH";
    Language["KINYARWANDA"] = "KINYARWANDA";
    Language["FRENCH"] = "FRENCH";
})(Language || (exports.Language = Language = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));
var Permission;
(function (Permission) {
    Permission["READ"] = "READ";
    Permission["WRITE"] = "WRITE";
    Permission["DELETE"] = "DELETE";
    Permission["UPDATE"] = "UPDATE";
})(Permission || (exports.Permission = Permission = {}));
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "CREATE";
    AuditAction["UPDATE"] = "UPDATE";
    AuditAction["DELETE"] = "DELETE";
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var AuditStatus;
(function (AuditStatus) {
    AuditStatus["SUCCESS"] = "SUCCESS";
    AuditStatus["FAILURE"] = "FAILURE";
})(AuditStatus || (exports.AuditStatus = AuditStatus = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["ALERT"] = "ALERT";
    NotificationType["REMINDER"] = "REMINDER";
    NotificationType["PROMOTION"] = "PROMOTION";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["DELIVERED"] = "DELIVERED";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["FAILED"] = "FAILED";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var VerificationMethod;
(function (VerificationMethod) {
    VerificationMethod["OTP"] = "OTP";
    VerificationMethod["BIOMETRIC"] = "BIOMETRIC";
    VerificationMethod["PASSWORD"] = "PASSWORD";
})(VerificationMethod || (exports.VerificationMethod = VerificationMethod = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["FAILED"] = "FAILED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var DataSource;
(function (DataSource) {
    DataSource["SURREALDB"] = "SURREALDB";
    DataSource["FIREBASE"] = "FIREBASE";
    DataSource["ISAR"] = "ISAR";
})(DataSource || (exports.DataSource = DataSource = {}));
var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "DEVELOPMENT";
    Environment["STAGING"] = "STAGING";
    Environment["PRODUCTION"] = "PRODUCTION";
})(Environment || (exports.Environment = Environment = {}));
var HashingAlgorithm;
(function (HashingAlgorithm) {
    HashingAlgorithm["BCRYPT"] = "BCRYPT";
    HashingAlgorithm["SCRYPT"] = "SCRYPT";
    HashingAlgorithm["PBKDF2"] = "PBKDF2";
    HashingAlgorithm["ARGON2"] = "ARGON2";
})(HashingAlgorithm || (exports.HashingAlgorithm = HashingAlgorithm = {}));
var EncryptionAlgorithm;
(function (EncryptionAlgorithm) {
    EncryptionAlgorithm["AES"] = "AES";
    EncryptionAlgorithm["RSA"] = "RSA";
    EncryptionAlgorithm["ECC"] = "ECC";
})(EncryptionAlgorithm || (exports.EncryptionAlgorithm = EncryptionAlgorithm = {}));
var TokenType;
(function (TokenType) {
    TokenType["JWT"] = "JWT";
    TokenType["OAUTH"] = "OAUTH";
    TokenType["SAML"] = "SAML";
})(TokenType || (exports.TokenType = TokenType = {}));
var TokenStatus;
(function (TokenStatus) {
    TokenStatus["ACTIVE"] = "ACTIVE";
    TokenStatus["REVOKED"] = "REVOKED";
    TokenStatus["EXPIRED"] = "EXPIRED";
})(TokenStatus || (exports.TokenStatus = TokenStatus = {}));
var SessionStatus;
(function (SessionStatus) {
    SessionStatus["ACTIVE"] = "ACTIVE";
    SessionStatus["INACTIVE"] = "INACTIVE";
    SessionStatus["EXPIRED"] = "EXPIRED";
})(SessionStatus || (exports.SessionStatus = SessionStatus = {}));
var SessionType;
(function (SessionType) {
    SessionType["WEB"] = "WEB";
    SessionType["MOBILE"] = "MOBILE";
    SessionType["API"] = "API";
})(SessionType || (exports.SessionType = SessionType = {}));
var AuditType;
(function (AuditType) {
    AuditType["SYSTEM"] = "SYSTEM";
    AuditType["USER"] = "USER";
})(AuditType || (exports.AuditType = AuditType = {}));
var AuditLevel;
(function (AuditLevel) {
    AuditLevel["INFO"] = "INFO";
    AuditLevel["WARN"] = "WARN";
    AuditLevel["ERROR"] = "ERROR";
})(AuditLevel || (exports.AuditLevel = AuditLevel = {}));
var ComplianceStandard;
(function (ComplianceStandard) {
    ComplianceStandard["GDPR"] = "GDPR";
    ComplianceStandard["HIPAA"] = "HIPAA";
    ComplianceStandard["CCPA"] = "CCPA";
})(ComplianceStandard || (exports.ComplianceStandard = ComplianceStandard = {}));
var ComplianceStatus;
(function (ComplianceStatus) {
    ComplianceStatus["COMPLIANT"] = "COMPLIANT";
    ComplianceStatus["NON_COMPLIANT"] = "NON_COMPLIANT";
    ComplianceStatus["PENDING"] = "PENDING";
})(ComplianceStatus || (exports.ComplianceStatus = ComplianceStatus = {}));
var RiskLevel;
(function (RiskLevel) {
    RiskLevel["LOW"] = "LOW";
    RiskLevel["MEDIUM"] = "MEDIUM";
    RiskLevel["HIGH"] = "HIGH";
})(RiskLevel || (exports.RiskLevel = RiskLevel = {}));
var RiskStatus;
(function (RiskStatus) {
    RiskStatus["MITIGATED"] = "MITIGATED";
    RiskStatus["UNMITIGATED"] = "UNMITIGATED";
    RiskStatus["PENDING"] = "PENDING";
})(RiskStatus || (exports.RiskStatus = RiskStatus = {}));
var MonitoringTool;
(function (MonitoringTool) {
    MonitoringTool["PROMETHEUS"] = "PROMETHEUS";
    MonitoringTool["GRAFANA"] = "GRAFANA";
    MonitoringTool["ELK"] = "ELK";
})(MonitoringTool || (exports.MonitoringTool = MonitoringTool = {}));
var AlertLevel;
(function (AlertLevel) {
    AlertLevel["INFO"] = "INFO";
    AlertLevel["WARNING"] = "WARNING";
    AlertLevel["CRITICAL"] = "CRITICAL";
})(AlertLevel || (exports.AlertLevel = AlertLevel = {}));
var AlertStatus;
(function (AlertStatus) {
    AlertStatus["NEW"] = "NEW";
    AlertStatus["ACKNOWLEDGED"] = "ACKNOWLEDGED";
    AlertStatus["RESOLVED"] = "RESOLVED";
})(AlertStatus || (exports.AlertStatus = AlertStatus = {}));
//# sourceMappingURL=enums.js.map