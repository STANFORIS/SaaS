// src/digital_identity/dto/digital_identity.dto.ts
import { IsString, IsOptional, IsEnum, IsEmail, IsDateString, IsBoolean } from 'class-validator';
import {
  Gender,
  MaritalStatus,
  IdentityStatus,
  RegistrationSource,
  IdentityType,
} from './enums';

export class IdentityRegisterRequest {
  @IsString()
  national_id!: string;

  @IsEnum(IdentityType)
  identity_type: IdentityType = IdentityType.NATIONAL_ID;

  @IsString()
  first_name!: string;

  @IsString()
  middle_name!: string;

  @IsString()
  last_name!: string;

  @IsDateString()
  date_of_birth!: string;

  @IsEnum(Gender)
  gender!: Gender;

  @IsString()
  nationality!: string;

  @IsString()
  province!: string;

  @IsString()
  district!: string;

  @IsString()
  sector!: string;

  @IsString()
  cell!: string;

  @IsString()
  village!: string;

  @IsOptional()
  @IsString()
  isibo?: string;

  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  address!: string;

  // Biometrics as base64 strings or encrypted bytes
  @IsString()
  fingerprint_data!: string;

  @IsString()
  face_image_data!: string;

  @IsString()
  iris_scan_data!: string;

  // Public crypto key
  @IsString()
  public_key!: string;

  @IsEnum(MaritalStatus)
  marital_status!: MaritalStatus;

  @IsString()
  occupation!: string;

  @IsEnum(RegistrationSource)
  registration_source!: RegistrationSource;

  @IsDateString()
  request_timestamp!: string;

  @IsString()
  registrar_id!: string;

  @IsString()
  registration_center_id!: string;

  @IsString()
  device_id!: string;

  @IsString()
  system_unique_email_id!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsBoolean()
  enablePublish?: boolean = true; // optional flag for event publishing
  // enablePublish: false;

}

export class IdentityRegisterResponse {
  digital_identity_id!: string;
  token!: string;
  status!: IdentityStatus;
  message!: string;
}

export class IdentityLoginRequest {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsString()
  device_id?: string;

  @IsOptional()
  @IsBoolean()
  enablePublish?: boolean = true; // optional flag for event publishing
  // enablePublish: false;

}

export class IdentityLoginResponse {
  digital_identity_id!: string;
  token!: string;
  status!: IdentityStatus;
  message!: string;
}

export class IdentityVerificationRequest {
  @IsString()
  token!: string;
}

export class IdentityVerificationResponse {
  valid!: boolean;
  digital_identity_id?: string;
  status?: IdentityStatus;
  message?: string;
}

export class IdentityUpdateRequest {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsEnum(MaritalStatus)
  marital_status?: MaritalStatus;

  @IsOptional()
  @IsBoolean()
  enablePublish?: boolean = true; // optional flag for event publishing
  // enablePublish: false;

}
