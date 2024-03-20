use crate::person::Person;
use rusqlite::Connection;
use chrono::Local;

pub fn connect(filename: String) -> Result<Connection, rusqlite::Error> {
    let mut db = Connection::open(filename)?;
    Ok(db)
}

fn query_to_personnel(conn: &Connection, query: &str) -> Result<Vec<Person>, rusqlite::Error> {
    let mut statement = conn.prepare(&query)?;
    let mut rows = statement.query([])?;
    let mut personnel = Vec::new();
    while let Some(row) = rows.next()? {
        personnel.push(Person::new(
            row.get(0)?,
            row.get(1)?,
            row.get(2)?,
            row.get(3)?,
            row.get(4)?,
            row.get(5)?,
            Local::now()
        ));
    }
    match personnel.len() {
        0 => Ok(Vec::new()),
        _ => Ok(personnel),
    }
}

// TODO: update to return a Person if found, empty Person if not
pub fn search_for_id(db: &Connection, id: String) -> String {

    let query: String = "SELECT * FROM personnel WHERE id = '".to_string() + &id + "'";
    let personnel: Vec<Person> = query_to_personnel(&db, &query).unwrap();
    match personnel.len() {
        0 => return "id: ".to_string() + &id + " not found",
        _ => return "found ".to_string() + &personnel[0].get_full_name(),
    }
}