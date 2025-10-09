mod db;
mod grpc;
mod models;

use tonic::transport::Server;
use grpc::identity_service::IdentityService;
use rwanda::identity::national_identity_service_server::NationalIdentityServiceServer;
use sqlx::postgres::PgPoolOptions;
use dotenv::dotenv;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")?;
    let grpc_port = env::var("GRPC_PORT").unwrap_or("50051".to_string());

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await?;

    let addr = format!("0.0.0.0:{}", grpc_port).parse()?;
    let identity_service = IdentityService { db_pool: pool };

    println!("National Identity gRPC server listening on {}", addr);

    Server::builder()
        .add_service(NationalIdentityServiceServer::new(identity_service))
        .serve(addr)
        .await?;

    Ok(())
}
