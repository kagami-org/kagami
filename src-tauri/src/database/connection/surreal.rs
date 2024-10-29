use std::sync::LazyLock;
use surrealdb::engine::remote::ws::{Client, Ws};
use surrealdb::opt::auth::Root;
use surrealdb::Surreal;

pub static DB: LazyLock<Surreal<Client>> = LazyLock::new(Surreal::init);

pub async fn database_connection() -> surrealdb::Result<()> {
    // Connect to the database
    DB.connect::<Ws>("localhost:8000").await?;
    // Sign in to the server
    DB.signin(Root {
        username: "root",
        password: "root",
    })
    .await?;
    // Select a namespace + database
    DB.use_ns("dev").use_db("kagami").await?;

    Ok(())
}
