
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod state;
mod database;
mod person;
use state::{AppState, ServiceAccess};
use tauri::{State, Manager, AppHandle};

#[tauri::command]
fn check_id(app_handle: AppHandle, id: String) -> String {
    println!("Checking ID: {}", id);
    return app_handle.db(|db: &rusqlite::Connection| database::search_for_id(db, id));
}

fn main() {

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .manage(AppState { db: Default::default() })
        .invoke_handler(tauri::generate_handler![ check_id])
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