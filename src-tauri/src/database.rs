use rusqlite::{params, Connection, Result};
use chrono::{ DateTime, Local };
use std::collections::HashSet;
use std::sync::mpsc;

struct Person {
    id: String,
    rank: String,
    last: String,
    first: String,
    room: String,
    group: String,
    leave_date: DateTime<Local>
}

fn print_person(person: &Person) {
    println!("ID: {}", person.id);
    println!("Rank: {}", person.rank);
    println!("Last: {}", person.last);
    println!("First: {}", person.first);
    println!("Room: {}", person.room);
    println!("Group: {}", person.group);
    println!("Leave Date: {}", person.leave_date);
}

pub fn connect_and_wait(query_rx: mpsc::Receiver<String>) {

    let ranks: HashSet<&str> = HashSet::from(["PVT", "PV2", "PFC", "SPC", "CPL", "SGT", "SSG", "SFC", "MSG", "1SG", "SGM", "CSM", "WO1", "CW2", "CW3", "CW4", "CW5", "2LT", "1LT", "CPT", "MAJ", "LTC", "COL", "BG", "MG", "LTG", "GEN", "GA", "CIV"]);
    let groups: HashSet<&str> = HashSet::from(["Resident", "Guest", "Hotel Divarty", "Rotational Unit", "Chain Of Command", "Other"]);

    let conn = Connection::open("barracks.db").unwrap();

    // if the database doesn't exist, create it
    // conn.execute(
    //     "CREATE TABLE IF NOT EXISTS personnel (
    //         id TEXT PRIMARY KEY,
    //         rank TEXT CHECK(rank IN ('PVT', 'PV2', 'PFC', 'SPC', 'CPL', 'SGT', 'SSG', 'SFC', 'MSG', '1SG', 'SGM', 'CSM', 'WO1', 'CW2', 'CW3', 'CW4', 'CW5', '2LT', '1LT', 'CPT', 'MAJ', 'LTC', 'COL', 'BG', 'MG', 'LTG', 'GEN', 'GA', 'CIV')),
    //         last TEXT,
    //         first TEXT,
    //         room TEXT,
    //         group TEXT CHECK(group IN ('Resident', 'Guest', 'HotelDivarty', 'RotationalUnit', 'ChainOfCommand', 'Other')),
    //         leaveDate DATE )"
    // )?;

    // conn.execute(
    //     "CREATE TABLE IF NOT EXISTS logs (
    //         id TEXT,
    //         date DATE,
    //         time TIME )"
    // )?;


    for query in query_rx {
        
        let stmt = conn.prepare(&query);
        match stmt {
            Ok(mut stmt) => {
                let person_iter = stmt.query_map([], |row| {
                    Ok(Person {
                        id: row.get(0)?,
                        rank: row.get(1)?,
                        last: row.get(2)?,
                        first: row.get(3)?,
                        room: row.get(4)?,
                        group: row.get(5)?,
                        // for now just do current date
                        leave_date: Local::now(),
                    })
                });

                match person_iter {
                    Ok(person_iter) => {
                        for person in person_iter {
                            print_person(&person.unwrap());
                        }
                    }
                    Err(_) => {
                        println!("Invalid query 1: ~{}~", &query);
                        continue;
                    }
                }

            },
            Err(_) => println!("Invalid query 2: ~{}~", &query)
        }
    }

}