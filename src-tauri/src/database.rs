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
        println!("db got: {}", query);
    }

}