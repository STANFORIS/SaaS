export declare enum Gender {
    UNKNOWN = 0,
    MALE = 1,
    FEMALE = 2,
    OTHER = 3
}
export declare enum MaritalStatus {
    SINGLE = 0,
    MARRIED = 1,
    DIVORCED = 2,
    WIDOWED = 3
}
export declare enum IdentityStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    DEACTIVATED = "DEACTIVATED"
}
export declare enum RegistrationSource {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}
export declare enum LoginStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    LOCKED = "LOCKED"
}
export declare enum RegistrationStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING"
}
export declare enum IdentityType {
    NATIONAL_ID = "NATIONAL_ID",
    PASSPORT = "PASSPORT",
    DRIVER_LICENSE = "DRIVER_LICENSE"
}
export declare enum BiometricType {
    FINGERPRINT = "FINGERPRINT",
    FACE = "FACE",
    IRIS = "IRIS"
}
export declare enum EventType {
    IDENTITY_REGISTERED = "IDENTITY_REGISTERED",
    IDENTITY_UPDATED = "IDENTITY_UPDATED",
    IDENTITY_DEACTIVATED = "IDENTITY_DEACTIVATED"
}
export declare enum ErrorCode {
    INVALID_REQUEST = "INVALID_REQUEST",
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
    AUTHORIZATION_FAILED = "AUTHORIZATION_FAILED",
    USER_NOT_FOUND = "USER_NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR"
}
export declare enum DeviceType {
    MOBILE = "MOBILE",
    TABLET = "TABLET",
    DESKTOP = "DESKTOP",
    KIOSK = "KIOSK"
}
export declare enum DeviceStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}
export declare enum CommunicationChannel {
    SMS = "SMS",
    EMAIL = "EMAIL",
    PUSH_NOTIFICATION = "PUSH_NOTIFICATION"
}
export declare enum Language {
    ENGLISH = "ENGLISH",
    KINYARWANDA = "KINYARWANDA",
    FRENCH = "FRENCH"
}
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare enum Permission {
    READ = "READ",
    WRITE = "WRITE",
    DELETE = "DELETE",
    UPDATE = "UPDATE"
}
export declare enum AuditAction {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT"
}
export declare enum AuditStatus {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export declare enum NotificationType {
    ALERT = "ALERT",
    REMINDER = "REMINDER",
    PROMOTION = "PROMOTION"
}
export declare enum NotificationStatus {
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
    FAILED = "FAILED"
}
export declare enum VerificationMethod {
    OTP = "OTP",
    BIOMETRIC = "BIOMETRIC",
    PASSWORD = "PASSWORD"
}
export declare enum VerificationStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    FAILED = "FAILED"
}
export declare enum DataSource {
    SURREALDB = "SURREALDB",
    FIREBASE = "FIREBASE",
    ISAR = "ISAR"
}
export declare enum Environment {
    DEVELOPMENT = "DEVELOPMENT",
    STAGING = "STAGING",
    PRODUCTION = "PRODUCTION"
}
export declare enum HashingAlgorithm {
    BCRYPT = "BCRYPT",
    SCRYPT = "SCRYPT",
    PBKDF2 = "PBKDF2",
    ARGON2 = "ARGON2"
}
export declare enum EncryptionAlgorithm {
    AES = "AES",
    RSA = "RSA",
    ECC = "ECC"
}
export declare enum TokenType {
    JWT = "JWT",
    OAUTH = "OAUTH",
    SAML = "SAML"
}
export declare enum TokenStatus {
    ACTIVE = "ACTIVE",
    REVOKED = "REVOKED",
    EXPIRED = "EXPIRED"
}
export declare enum SessionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    EXPIRED = "EXPIRED"
}
export declare enum SessionType {
    WEB = "WEB",
    MOBILE = "MOBILE",
    API = "API"
}
export declare enum AuditType {
    SYSTEM = "SYSTEM",
    USER = "USER"
}
export declare enum AuditLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR"
}
export declare enum ComplianceStandard {
    GDPR = "GDPR",
    HIPAA = "HIPAA",
    CCPA = "CCPA"
}
export declare enum ComplianceStatus {
    COMPLIANT = "COMPLIANT",
    NON_COMPLIANT = "NON_COMPLIANT",
    PENDING = "PENDING"
}
export declare enum RiskLevel {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}
export declare enum RiskStatus {
    MITIGATED = "MITIGATED",
    UNMITIGATED = "UNMITIGATED",
    PENDING = "PENDING"
}
export declare enum MonitoringTool {
    PROMETHEUS = "PROMETHEUS",
    GRAFANA = "GRAFANA",
    ELK = "ELK"
}
export declare enum AlertLevel {
    INFO = "INFO",
    WARNING = "WARNING",
    CRITICAL = "CRITICAL"
}
export declare enum AlertStatus {
    NEW = "NEW",
    ACKNOWLEDGED = "ACKNOWLEDGED",
    RESOLVED = "RESOLVED"
}
