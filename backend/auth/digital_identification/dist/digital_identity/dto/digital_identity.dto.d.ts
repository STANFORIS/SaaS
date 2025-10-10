import { Gender, MaritalStatus, IdentityStatus, RegistrationSource, IdentityType } from './enums';
export declare class IdentityRegisterRequest {
    national_id: string;
    identity_type: IdentityType;
    first_name: string;
    middle_name: string;
    last_name: string;
    date_of_birth: string;
    gender: Gender;
    nationality: string;
    province: string;
    district: string;
    sector: string;
    cell: string;
    village: string;
    isibo?: string;
    phone: string;
    email: string;
    address: string;
    fingerprint_data: string;
    face_image_data: string;
    iris_scan_data: string;
    public_key: string;
    marital_status: MaritalStatus;
    occupation: string;
    registration_source: RegistrationSource;
    request_timestamp: string;
    registrar_id: string;
    registration_center_id: string;
    device_id: string;
    system_unique_email_id: string;
    username: string;
    password: string;
    enablePublish?: boolean;
}
export declare class IdentityRegisterResponse {
    digital_identity_id: string;
    token: string;
    status: IdentityStatus;
    message: string;
}
export declare class IdentityLoginRequest {
    username: string;
    password: string;
    device_id?: string;
    enablePublish?: boolean;
}
export declare class IdentityLoginResponse {
    digital_identity_id: string;
    token: string;
    status: IdentityStatus;
    message: string;
}
export declare class IdentityVerificationRequest {
    token: string;
}
export declare class IdentityVerificationResponse {
    valid: boolean;
    digital_identity_id?: string;
    status?: IdentityStatus;
    message?: string;
}
export declare class IdentityUpdateRequest {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    date_of_birth?: string;
    gender?: Gender;
    phone?: string;
    email?: string;
    address?: string;
    occupation?: string;
    marital_status?: MaritalStatus;
    enablePublish?: boolean;
}
