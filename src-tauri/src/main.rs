// #![allow(unused)]

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use kagami_lib::database::connection::surreal::database_connection;

#[tokio::main]
async fn main() -> surrealdb::Result<()> {
    database_connection().await?;
    kagami_lib::run();
    Ok(())
}
