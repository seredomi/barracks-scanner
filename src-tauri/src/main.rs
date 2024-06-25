
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod state;
mod database;
mod person;
mod log;
use state::{AppState, ServiceAccess};
use tauri::{State, Manager, AppHandle};

#[tauri::command]
async fn check_id(app_handle: AppHandle, id: String) -> person::Person {
    return app_handle.db(|db: &rusqlite::Connection| database::check_id(db, id));
}

#[tauri::command]
async fn log_scan(app_handle: AppHandle, id: String) -> () {
    return app_handle.db(|db: &rusqlite::Connection| database::log_scan(db, id));
}

#[tauri::command]
async fn query_personnel(app_handle: AppHandle, search: String) -> Vec<person::Person> {
    return app_handle.db(|db: &rusqlite::Connection| database::query_personnel(db, search));
}

#[tauri::command]
async fn update_person(app_handle: AppHandle, old_id: String, new_info: person::Person) -> () {
    return app_handle.db(|db: &rusqlite::Connection| database::update_person(db, old_id, new_info));
}

#[tauri::command]
async fn add_person(app_handle: AppHandle, new_person: person::Person) -> () {
    return app_handle.db(|db: &rusqlite::Connection| database::add_person(db, new_person));
}

#[tauri::command]
async fn delete_person(app_handle: AppHandle, id: String) -> () {
    return app_handle.db(|db: &rusqlite::Connection| database::delete_person(db, id));
}

#[tauri::command]
async fn query_logs(app_handle: AppHandle, search: String, start_date: String, end_date: String) -> Vec<log::Log> {
    return app_handle.db(|db: &rusqlite::Connection| database::query_logs(db, search, start_date, end_date));
}

#[tauri::command]
async fn get_expired(app_handle: AppHandle) -> Vec<person::Person> {
    return app_handle.db(|db: &rusqlite::Connection| database::get_expired(db));
}

fn main() {

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .manage(AppState { db: Default::default() })
        .invoke_handler(tauri::generate_handler![
            check_id,
            log_scan,
            query_personnel,
            update_person,
            add_person,
            delete_person,
            query_logs,
            get_expired])
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