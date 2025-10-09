use std::process::Command;
use std::fs;
use sqlx::postgres::PgPoolOptions;
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv::dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .unwrap_or("postgres://stanforis:password@localhost:5432/stanforis_id".to_string());

    // 1️⃣ Check if psql exists
    let psql_exists = Command::new("psql")
        .arg("--version")
        .output()
        .is_ok();

    if psql_exists {
        println!("psql detected! You can also manually run the schema if needed.");
    } else {
        println!("psql not found, using Rust sqlx to apply schema directly...");
    }

    // 2️⃣ Connect to PostgreSQL via sqlx
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await?;

    // 3️⃣ Read schema.sql
    let schema_sql = fs::read_to_string("db/schema.sql")?;
    
    // 4️⃣ Apply schema
    match sqlx::query(&schema_sql).execute(&pool).await {
        Ok(_) => println!("Database schema applied successfully!"),
        Err(e) => eprintln!("Error applying schema: {}", e),
    }

    Ok(())
}
