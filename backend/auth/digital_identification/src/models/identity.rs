use serde::{Serialize, Deserialize};
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Identity {
    pub national_id: String,
    pub first_name: String,
    pub middle_name: Option<String>,
    pub last_name: String,
    pub date_of_birth: String, // Use ISO 8601 string
    pub gender: String,
    pub place_of_birth: Option<String>,
    pub nationality: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,

    pub street: Option<String>,
    pub sector: Option<String>,
    pub cell: Option<String>,
    pub district: Option<String>,
    pub province: Option<String>,

    pub fingerprint: Option<Vec<u8>>,
    pub face_image: Option<Vec<u8>>,
    pub iris_scan: Option<Vec<u8>>,

    pub public_key: Option<Vec<u8>>,
    pub marital_status: Option<String>,
    pub occupation: Option<String>,

    pub registration_source: Option<String>,
    pub request_timestamp: Option<chrono::NaiveDateTime>,
    pub registrar_id: Option<String>,

    pub verification_token: Option<String>,
    pub verified: bool,
    pub certificate: Option<Vec<u8>>,
}
