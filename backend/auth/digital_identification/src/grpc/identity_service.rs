use tonic::{Request, Response, Status};
use crate::models::identity::Identity;
use crate::db::postgres;
use sqlx::PgPool;
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;
use chrono::Utc;

use rwanda::identity::{
    register_response::RegistrationStatus,
    national_identity_service_server::NationalIdentityService,
    RegisterRequest, RegisterResponse, VerificationRequest, VerificationResponse,
};

pub struct IdentityService {
    pub db_pool: PgPool,
}

#[tonic::async_trait]
impl NationalIdentityService for IdentityService {
    async fn register_identity(
        &self,
        request: Request<RegisterRequest>,
    ) -> Result<Response<RegisterResponse>, Status> {
        let req = request.into_inner();

        // Generate a random verification token
        let token: String = thread_rng()
            .sample_iter(&Alphanumeric)
            .take(6)
            .map(char::from)
            .collect();

        let identity = Identity {
            national_id: req.national_id.clone(),
            first_name: req.first_name,
            middle_name: Some(req.middle_name),
            last_name: req.last_name,
            date_of_birth: req.date_of_birth,
            gender: req.gender.to_string(),
            place_of_birth: Some(req.place_of_birth),
            nationality: Some(req.nationality),
            phone: Some(req.phone),
            email: Some(req.email),

            street: Some(req.street),
            sector: Some(req.sector),
            cell: Some(req.cell),
            district: Some(req.district),
            province: Some(req.province),

            fingerprint: Some(req.fingerprint_data),
            face_image: Some(req.face_image_data),
            iris_scan: Some(req.iris_scan_data),

            public_key: Some(req.public_key),
            marital_status: Some(req.marital_status.to_string()),
            occupation: Some(req.occupation),

            registration_source: Some(req.registration_source),
            request_timestamp: Some(Utc::now().naive_utc()),
            registrar_id: Some(req.registrar_id),

            verification_token: Some(token.clone()),
            verified: false,
            certificate: None,
        };

        // Insert into database
        match postgres::insert_identity(&self.db_pool, &identity).await {
            Ok(_) => Ok(Response::new(RegisterResponse {
                status: RegistrationStatus::Success.into(),
                message: "Identity registered successfully".into(),
                national_id: identity.national_id,
                verification_token: token,
                certificate: vec![],
                registration_timestamp: Some(prost_types::Timestamp::from(Utc::now())),
            })),
            Err(e) => Err(Status::internal(format!("Database error: {}", e))),
        }
    }

    async fn verify_identity(
        &self,
        request: Request<VerificationRequest>,
    ) -> Result<Response<VerificationResponse>, Status> {
        let req = request.into_inner();

        // Fetch identity
        let identity = sqlx::query!("SELECT verification_token FROM identities WHERE national_id = $1", req.national_id)
            .fetch_one(&self.db_pool)
            .await
            .map_err(|_| Status::not_found("Identity not found"))?;

        if identity.verification_token != req.verification_token {
            return Ok(Response::new(VerificationResponse {
                verified: false,
                message: "Invalid verification token".into(),
                verification_timestamp: Some(prost_types::Timestamp::from(Utc::now())),
            }));
        }

        // Update verified
        sqlx::query!("UPDATE identities SET verified = TRUE WHERE national_id = $1", req.national_id)
            .execute(&self.db_pool)
            .await
            .map_err(|_| Status::internal("Failed to update verification status"))?;

        Ok(Response::new(VerificationResponse {
            verified: true,
            message: "Identity verified successfully".into(),
            verification_timestamp: Some(prost_types::Timestamp::from(Utc::now())),
        }))
    }
}
