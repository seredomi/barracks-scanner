use crate::person::Person;
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

    println!("Checking id: {}", id);
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


pub fn query_all(db: &Connection, search: String) -> Vec<Person> {
    let query = "SELECT * FROM personnel WHERE (id like '%".to_string() + &search
                        + "%' OR firstName like '%" + &search + "%' OR lastName like '%" + &search +
                        "%') ORDER BY lastName, firstName";
    print!("Query: {}", query);
    let personnel = query_to_personnel(&db, &query);
    match personnel {
        Ok(personnel) => return personnel,
        Err(_) => {
            println!("Error in query_all ");
            return Vec::new()
        }
    }
}