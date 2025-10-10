// src/digital_identity/dto/digital_identity.dto.ts

import { IsString, IsOptional, IsEnum, IsEmail, IsDateString } from 'class-validator';
import { Gender, MaritalStatus } from './enums';

export class IdentityRegisterRequest {
  @IsString()
  national_id!: string;

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

  @IsString()
  fingerprint_data!: string;

  @IsString()
  face_image_data!: string;

  @IsString()
  iris_scan_data!: string;

  @IsString()
  public_key!: string;

  @IsEnum(MaritalStatus)
  marital_status!: MaritalStatus;

  @IsString()
  occupation!: string;

  @IsString()
  registration_source!: string;

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
}

export class IdentityRegisterResponse {
  digital_identity_id!: string;
  token!: string;
  status!: string;
  message!: string;
}

export class IdentityLoginRequest {
  username!: string;
  password!: string;
  device_id?: string;
}

export class IdentityLoginResponse {
  digital_identity_id!: string;
  token!: string;
  status!: string;
  message!: string;
}
export class IdentityVerificationResponse {
  valid!: boolean;
  digital_identity_id?: string;
  status?: string;
  message!: string;
}












// import { Gender, MaritalStatus } from './enums';

// export class IdentityRegisterRequest {
//   national_id!: string;
//   first_name!: string;
//   middle_name!: string;
//   last_name!: string;
//   date_of_birth!: string;
//   gender!: Gender;
//   nationality!: string;
//   province!: string;
//   district!: string;
//   sector!: string;
//   cell!: string;
//   village!: string;
//   isibo?: string;
//   phone!: string;
//   email!: string;
//   address!: string;
//   fingerprint_data!: string;
//   face_image_data!: string;
//   iris_scan_data!: string;
//   public_key!: string;
//   marital_status!: MaritalStatus;
//   occupation!: string;
//   registration_source!: string;
//   request_timestamp!: string;
//   registrar_id!: string;
//   registration_center_id!: string;
//   device_id!: string;
//   system_unique_email_id!: string;
//   username!: string;
//   password!: string;
// }