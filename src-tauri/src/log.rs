use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Log {
    id: String,
    rank: String,
    last: String,
    first: String,
    date: String,
    time: String,
    real: bool,
}

impl Log {
    pub fn new_real(id: String, rank: String, last: String, first: String, date: String, time: String, real: bool) -> Log {
        let new_time = time[0..8].to_string();
        Log { id, rank, last, first, date, time: new_time, real }
    }

    pub fn new_empty(id: String) -> Log {
        Log { id, rank: "".to_string(), last: "".to_string(), first: "".to_string(), date: "".to_string(), time: "".to_string(), real: false }
    }
}