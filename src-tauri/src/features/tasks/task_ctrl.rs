use surrealdb::opt::Resource;

use crate::database::connection::surreal::DB;
use crate::database::models::record::RecordKeyModel;
use crate::database::models::tasks::{CheckState, Task, TaskCreate};

// Crud methods for task
// Create task
pub async fn create_new_task(task: TaskCreate ) -> surrealdb::Result<()> {
    dbg!(&task);
    let record: Option<RecordKeyModel> = DB
    .create("tasks")
    .content(task).await?;
    dbg!(record);
    Ok(())
}

// Toggle Checked
pub async fn toggle_checked(task_id: &str) -> surrealdb::Result<()> {
    let task_item: Option<Task> = DB.select(("tasks", task_id)).await?;
    let _update = DB
        .update(Resource::from(("tasks", &task_id.to_string())))
        .merge(CheckState {
            checked: !(task_item.unwrap().checked),
        })
        .await?;
    Ok(())
}

// Delete Task
pub async fn remove_task(task_id: &str) -> surrealdb::Result<()> {
    let _remove: Option<RecordKeyModel> = DB
        .delete(("tasks", &task_id.to_string()))
        .await?;
    Ok(())
}

// List all tasks
pub async fn get_tasks() -> surrealdb::Result<Vec<Task>> {
    let tasks: Vec<Task> = DB.select("tasks").await?;
    Ok(tasks)
}
