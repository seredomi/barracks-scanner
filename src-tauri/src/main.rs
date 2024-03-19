
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn track_page(page: &str) {
    println!("Entering page: {}", page);
}

mod state;
mod input;
mod database;
use state::{AppState, ServiceAccess};
use tauri::{State, Manager, AppHandle};
use std::thread;
use std::sync::mpsc;

fn main() {

    let (scanner_tx, database_rx) = mpsc::channel();
    // let personnel_tx = scanner_tx.clone();
    // let logs_tx = scanner_tx.clone();
    let (database_tx, scanner_rx) = mpsc::channel();

    // connect to database and await calls
    thread::spawn(move || database::connect_and_wait(database_tx, database_rx));

    // TODO: only run when the ID Scanner page is open
    thread::spawn(move || input::await_scan(scanner_tx, scanner_rx));

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .manage(AppState { db: Default::default() })
        .invoke_handler(tauri::generate_handler![ greet, track_page])
        .setup(|app| {
            let handle = app.handle();
            let app_state: State<AppState> = handle.state();
            let db = database::connect("barracks.db".to_string()).expect("Couldn't connect to 'barracks.db'");
            *app_state.db.lock().unwrap() = Some(db);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}