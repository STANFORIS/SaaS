use sqlx::postgres::PgPool;
use crate::models::identity::Identity;

pub async fn insert_identity(pool: &PgPool, identity: &Identity) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        INSERT INTO identities (
            national_id, first_name, middle_name, last_name, date_of_birth, gender,
            place_of_birth, nationality, phone, email, street, sector, cell, district, province,
            fingerprint, face_image, iris_scan, public_key, marital_status, occupation,
            registration_source, request_timestamp, registrar_id, verification_token, verified, certificate
        ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26
        )
        "#,
        identity.national_id,
        identity.first_name,
        identity.middle_name,
        identity.last_name,
        identity.date_of_birth,
        identity.gender,
        identity.place_of_birth,
        identity.nationality,
        identity.phone,
        identity.email,
        identity.street,
        identity.sector,
        identity.cell,
        identity.district,
        identity.province,
        identity.fingerprint.clone(),
        identity.face_image.clone(),
        identity.iris_scan.clone(),
        identity.public_key.clone(),
        identity.marital_status,
        identity.occupation,
        identity.registration_source,
        identity.request_timestamp,
        identity.registrar_id,
        identity.verification_token,
        identity.verified,
        identity.certificate.clone()
    )
    .execute(pool)
    .await?;
    Ok(())
}
