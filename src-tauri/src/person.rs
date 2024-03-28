use serde::{Serialize, Deserialize};
use chrono::NaiveDate;


#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Person {
    id: String,
    rank: String,
    last: String,
    first: String,
    room: String,
    group: String,
    #[serde(with = "date_format")]
    leave_date: NaiveDate,
    found: bool,
}

impl Person {
    pub fn new_known(id: String, rank: String, last: String, first: String, room: String, group: String, rec_leave_date: String) -> Person {
        let leave_date = NaiveDate::parse_from_str(&rec_leave_date, date_format::FORMAT);
        match leave_date {
            Ok(leave_date) => Person { id, rank, last, first, room, group, leave_date, found: true, },
            Err(_) => {
                println!("Error parsing leave date: {}", rec_leave_date);
                let p: Person = Person { id, rank, last, first, room, group, leave_date: NaiveDate::from_ymd_opt(9999, 1, 1).unwrap(), found: true, };
                p.print();
                println!("---------------");
                return p;
            },
        }
    }

    pub fn new_unknown(id: String) -> Person {
        let leave_date: NaiveDate = NaiveDate::from_ymd_opt(1, 1, 1).unwrap();
        Person { id, rank: "".to_string(), last: "".to_string(), first: "".to_string(), room: "".to_string(), group: "".to_string(), leave_date, found: false, }
    }

    pub fn is_found(&self) -> bool { self.found }
    pub fn get_id(&self) -> &String { &self.id }
    pub fn get_rank(&self) -> &String { &self.rank }
    pub fn get_last(&self) -> &String { &self.last }
    pub fn get_first(&self) -> &String { &self.first }
    pub fn get_room(&self) -> &String { &self.room }
    pub fn get_group(&self) -> &String { &self.group }
    pub fn get_leave_date(&self) -> &NaiveDate { &self.leave_date }
    pub fn get_leave_date_string(&self) -> String { format!("{}", self.leave_date.format(date_format::FORMAT)) }

    pub fn get_full_name(&self) -> String {
        self.rank.clone() + " " + &self.first + ", " + &self.last
    }

    pub fn print(&self) {
        println!("ID: {}", self.id);
        println!("Rank: {}", self.rank);
        println!("Last: {}", self.last);
        println!("First: {}", self.first);
        println!("Room: {}", self.room);
        println!("Group: {}", self.group);
        println!("Leave Date: {}", self.leave_date);
    }

}

mod date_format {
    use chrono::NaiveDate;
    use serde::{self, Deserialize, Deserializer, Serializer};

    pub const FORMAT: &'static str = "%Y-%m-%d";

    pub fn serialize<S> ( date: &NaiveDate, serializer: S) -> Result<S::Ok, S::Error>
    where S: Serializer, {
        let s = format!("{}", date.format(FORMAT));
        serializer.serialize_str(&s)
    }

    pub fn deserialize<'de, D> ( deserializer: D) -> Result<NaiveDate, D::Error>
    where D: Deserializer<'de>, {
        let s = String::deserialize(deserializer)?;
        let date = NaiveDate::parse_from_str(&s, FORMAT).map_err(serde::de::Error::custom)?;
        Ok(date)
    }
}