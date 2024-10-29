use serde::{Deserialize, Serialize};
use surrealdb::RecordId;


#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    pub id: RecordId,
    pub name: String,
    pub task: String,
    pub checked: bool,
    pub order: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TaskCreate {
    pub name: String,
    pub task: String,
    pub checked: bool,
    pub order: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CheckState {
    pub checked: bool,
}