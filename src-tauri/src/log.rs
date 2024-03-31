use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Log {
    id: String,
    person_id: String,
    rank: String,
    last: String,
    first: String,
    date: String,
    time: String,
    real: bool,
}

impl Log {
    pub fn new_real(person_id: String, rank: String, last: String, first: String, date: String, time: String, real: bool) -> Log {
        let new_time = time[0..8].to_string();
        let new_id: String = person_id.clone() + "." + &date + "." + &new_time;
        Log { id: new_id, person_id, rank, last, first, date, time: new_time, real }
    }
}