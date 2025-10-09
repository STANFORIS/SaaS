CREATE TABLE IF NOT EXISTS identities (
    national_id VARCHAR PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    middle_name VARCHAR,
    last_name VARCHAR NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR NOT NULL,
    place_of_birth VARCHAR,
    nationality VARCHAR,
    phone VARCHAR,
    email VARCHAR,
    street VARCHAR,
    sector VARCHAR,
    cell VARCHAR,
    district VARCHAR,
    province VARCHAR,
    fingerprint BYTEA,
    face_image BYTEA,
    iris_scan BYTEA,
    public_key BYTEA,
    marital_status VARCHAR,
    occupation VARCHAR,
    registration_source VARCHAR,
    request_timestamp TIMESTAMP,
    registrar_id VARCHAR,
    verification_token VARCHAR,
    verified BOOLEAN DEFAULT FALSE,
    certificate BYTEA
);


-- psql -U postgres -d stanforis_identity -f db/schema.sql
