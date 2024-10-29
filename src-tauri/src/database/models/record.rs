use serde::{Deserialize, Serialize};
use surrealdb::RecordId;


#[derive(Debug, Serialize, Deserialize)]
pub struct RecordKeyModel {
    pub id: RecordId,
}