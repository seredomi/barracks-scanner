use crate::person::Person;
use crate::log::Log;
use rusqlite::Connection;

pub fn connect(filename: String) -> Result<Connection, rusqlite::Error> {
    let db = Connection::open(filename)?;
    Ok(db)
}

fn query_to_personnel(conn: &Connection, query: &str) -> Result<Vec<Person>, rusqlite::Error> {
    let mut statement = conn.prepare(&query)?;
    let mut rows = statement.query([])?;
    let mut personnel = Vec::new();
    while let Some(row) = rows.next()? {
        personnel.push(Person::new_known(
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
            row.get(4)?,
            row.get(5)?,
            row.get(6)?,
        ));
    }
    match personnel.len() {
        0 => Ok(Vec::new()),
        _ => Ok(personnel),
    }
}

pub fn check_id(db: &Connection, id: String) -> Person {

    let query: String = "SELECT * FROM personnel WHERE id = '".to_string() + &id + "'";
    let personnel = query_to_personnel(&db, &query);
    match personnel {
        Ok(personnel) => match personnel.len() {
            0 => return Person::new_unknown(id),
            _ => return personnel[0].clone(),
        },
        Err(_) => {
            println!("Error in check_id");
            return Person::new_unknown(id)
        }
    }
}


pub fn query_personnel(db: &Connection, search: String) -> Vec<Person> {
    let query = "SELECT * FROM personnel WHERE (id like '%".to_string() + &search
                        + "%' OR firstName like '%" + &search + "%' OR lastName like '%" + &search +
                        "%') ORDER BY lastName, firstName";
    let personnel = query_to_personnel(&db, &query);
    match personnel {
        Ok(personnel) => return personnel,
        Err(_) => {
            println!("Error in query_personnel ");
            return Vec::new()
        }
    }
}

pub fn update_person(db: &Connection, old_id: String, new_info: Person) -> () {
    let query = 
        "UPDATE personnel SET id = '".to_string() + &new_info.get_id()
        + "', rank = '" + &new_info.get_rank() + "', lastName = '" + &new_info.get_last()
        + "', firstName = '" + &new_info.get_first() + "', room = '" + &new_info.get_room()
        + "', groupName = '" + &new_info.get_group() + "', leaveDate = '" + &new_info.get_leave_date_string()
        + "' WHERE id = '" + &old_id + "'";
    //TODO: i think there should be a prepare statement first
    let _ = db.execute(&query, []);
}


pub fn add_person(db: &Connection, new_person: Person) -> () {
    let query = 
        "INSERT INTO personnel (id, rank, lastName, firstName, room, groupName, leaveDate) VALUES ('".to_string() 
        + &new_person.get_id() + "', '" + &new_person.get_rank() + "', '" + &new_person.get_last() 
        + "', '" + &new_person.get_first() + "', '" + &new_person.get_room() + "', '" + &new_person.get_group() 
        + "', '" + &new_person.get_leave_date_string() + "')";
    //TODO: i think there should be a prepare statement first
    let _ = db.execute(&query, []);
}



pub fn query_logs(db: &Connection, search: String, start_date: String, end_date: String) -> Vec<Log> {
    let query: String = 
        "SELECT logs.id, rank, lastName, firstName, date, time FROM logs INNER JOIN personnel ON logs.id = personnel.id ".to_string()
        + "WHERE (logs.id like '%" + &search + "%' OR firstName like '%" + &search + "%' OR lastName like '%" + &search + "%') "
        + "AND date BETWEEN date('" + &start_date + "') AND date('" + &end_date + "') ORDER BY date DESC, time DESC";
    let mut statement = db.prepare(&query).unwrap();
    let mut rows = statement.query([]).unwrap();
    let mut logs = Vec::new();
    while let Some(row) = rows.next().unwrap() {
        logs.push(Log::new_real(
            row.get(0).unwrap(),
            row.get(1).unwrap(),
            row.get(2).unwrap(),
            row.get(3).unwrap(),
            row.get(4).unwrap(),
            row.get(5).unwrap(),
            true,
        ));
    }
    logs
}

pub fn log_scan(db: &Connection, id: String) -> () {
    let query = "INSERT INTO logs (id, date, time) VALUES ('".to_string() + &id + "', date('now', 'localtime'), time('now', 'localtime'))";
    println!("log scan query: **{}**", query);
    let mut statement = db.prepare(&query).unwrap();
    let _ = statement.execute([]);
}

pub fn get_expired(db: &Connection) -> Vec<Person> {
    let query = "SELECT * FROM personnel WHERE leaveDate < date('now', 'localtime') ORDER BY leaveDate";
    let personnel = query_to_personnel(&db, &query);
    match personnel {
        Ok(personnel) => return personnel,
        Err(_) => {
            println!("Error in purge_personnel ");
            return Vec::new()
        }
    }
}