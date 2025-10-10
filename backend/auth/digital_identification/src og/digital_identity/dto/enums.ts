export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export enum MaritalStatus {
  SINGLE = 0,
  MARRIED = 1,
  DIVORCED = 2,
  WIDOWED = 3,
}
export enum IdentityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DEACTIVATED = 'DEACTIVATED',
}
export enum RegistrationSource {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
export enum LoginStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  LOCKED = 'LOCKED',
}
export enum RegistrationStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}
export enum IdentityType {
  NATIONAL_ID = 'NATIONAL_ID',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
}
export enum BiometricType {
  FINGERPRINT = 'FINGERPRINT',
  FACE = 'FACE',
  IRIS = 'IRIS',
}
export enum EventType {
  IDENTITY_REGISTERED = 'IDENTITY_REGISTERED',
  IDENTITY_UPDATED = 'IDENTITY_UPDATED',
  IDENTITY_DEACTIVATED = 'IDENTITY_DEACTIVATED',
}
export enum ErrorCode {
  INVALID_REQUEST = 'INVALID_REQUEST',
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
  KIOSK = 'KIOSK',
}
export enum DeviceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}
export enum CommunicationChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
}
export enum Language {
  ENGLISH = 'ENGLISH',
  KINYARWANDA = 'KINYARWANDA',
  FRENCH = 'FRENCH',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}
export enum AuditStatus {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}
export enum NotificationType {
  ALERT = 'ALERT',
  REMINDER = 'REMINDER',
  PROMOTION = 'PROMOTION',
}
export enum NotificationStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}
export enum VerificationMethod {
  OTP = 'OTP',
  BIOMETRIC = 'BIOMETRIC',
  PASSWORD = 'PASSWORD',
}
export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
}
export enum DataSource {
  SURREALDB = 'SURREALDB',
  FIREBASE = 'FIREBASE',
  ISAR = 'ISAR',
}
export enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
}
export enum HashingAlgorithm {
  BCRYPT = 'BCRYPT',
  SCRYPT = 'SCRYPT',
  PBKDF2 = 'PBKDF2',
  ARGON2 = 'ARGON2',
}
export enum EncryptionAlgorithm {
  AES = 'AES',
  RSA = 'RSA',
  ECC = 'ECC',
}
export enum TokenType {
  JWT = 'JWT',
  OAUTH = 'OAUTH',
  SAML = 'SAML',
}

export enum TokenStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
}
export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}
export enum SessionType {
  WEB = 'WEB',
  MOBILE = 'MOBILE',
  API = 'API',
}
export enum AuditType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
}
export enum AuditLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
export enum ComplianceStandard {
  GDPR = 'GDPR',
  HIPAA = 'HIPAA',
  CCPA = 'CCPA',
}
export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PENDING = 'PENDING',
}
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
export enum RiskStatus {
  MITIGATED = 'MITIGATED',
  UNMITIGATED = 'UNMITIGATED',
  PENDING = 'PENDING',
}
export enum MonitoringTool {
  PROMETHEUS = 'PROMETHEUS',
  GRAFANA = 'GRAFANA',
  ELK = 'ELK',
}
export enum AlertLevel {
  INFO = 'INFO',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}
export enum AlertStatus {
  NEW = 'NEW',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
}

