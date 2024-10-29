use features::tasks::task_ctrl::{create_new_task, get_tasks, remove_task, toggle_checked};
use database::models::tasks::{Task, TaskCreate};

pub mod features;
pub mod database;

// use crate::db::models::Task;

// // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("ello mate!, {}! You've been greeted from Rust!", name)
}

//Create a task in database
#[tauri::command]
async fn save_task(task: TaskCreate) -> surrealdb::Result<()> {
    create_new_task(task).await?;
    Ok(())
}

//Create a task in database
#[tauri::command]
async fn list_tasks() -> surrealdb::Result<Vec<Task>> {
    let tasks: Vec<Task> = get_tasks().await?;
    Ok(tasks)
}

//Create a task in database
#[tauri::command]
async fn update_check_state(task: &str) -> surrealdb::Result<Vec<Task>> {
    dbg!(task);
    let _update = toggle_checked(task).await?;
    let tasks: Vec<Task> = get_tasks().await?;
    Ok(tasks)
}

//Create a task in database
#[tauri::command]
async fn remove_selected_task(task: &str) -> surrealdb::Result<Vec<Task>> {
    dbg!(task);
    let _remove = remove_task(task).await?;
    let tasks: Vec<Task> = get_tasks().await?;
    Ok(tasks)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            save_task,
            list_tasks,
            update_check_state,
            remove_selected_task
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
