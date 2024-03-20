use chrono::{ DateTime, Local };

pub struct Person {
    id: String,
    rank: String,
    last: String,
    first: String,
    room: String,
    group: String,
    leave_date: DateTime<Local>,
    found: bool,
}

impl Person {
    pub fn new(id: String, rank: String, last: String, first: String, room: String, group: String, leave_date: DateTime<Local>) -> Person {
        Person { id, rank, last, first, room, group, leave_date, found: true, }
    }

    pub fn anon(id: String) -> Person {
        Person { id, rank: "".to_string(), last: "".to_string(), first: "".to_string(), room: "".to_string(), group: "".to_string(), leave_date: Local::now(), found: false,}
    }

    pub fn is_found(&self) -> bool { self.found }
    pub fn get_id(&self) -> &String { &self.id }
    pub fn get_rank(&self) -> &String { &self.rank }
    pub fn get_last(&self) -> &String { &self.last }
    pub fn get_first(&self) -> &String { &self.first }
    pub fn get_room(&self) -> &String { &self.room }
    pub fn get_group(&self) -> &String { &self.group }
    pub fn get_leave_date(&self) -> &DateTime<Local> { &self.leave_date }

    pub fn get_full_name(&self) -> String {
        self.rank.clone() + " " + &self.first + ", " + &self.last
    }

}

pub fn print_person(person: &Person) {
    println!("ID: {}", person.id);
    println!("Rank: {}", person.rank);
    println!("Last: {}", person.last);
    println!("First: {}", person.first);
    println!("Room: {}", person.room);
    println!("Group: {}", person.group);
    println!("Leave Date: {}", person.leave_date);
}
