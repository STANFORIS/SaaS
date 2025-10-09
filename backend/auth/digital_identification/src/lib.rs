pub mod grpc;
pub mod db;
pub mod models;

use tonic::transport::Server;
use grpc::identity_service::IdentityService;

pub async fn start_server() -> Result<(), Box<dyn std::error::Error>> {
    let addr = "0.0.0.0:50051".parse()?;
    let svc = IdentityService::default();

    println!("✅ Digital Identity service running on {}", addr);

    Server::builder()
        .add_service(IdentityService::new_service(svc))
        .serve(addr)
        .await?;

    Ok(())
}
