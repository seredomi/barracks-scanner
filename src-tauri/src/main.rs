
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use std::thread;
use std::sync::mpsc;
mod input;
mod database;

fn main() {

    let (scan_query_tx, query_rx) = mpsc::channel();

    // connect to database and await calls
    thread::spawn(move || database::connect_and_wait(query_rx));

    // TODO: only run when the ID Scanner page is open
    thread::spawn(move || input::detect_scans(scan_query_tx));

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .invoke_handler(tauri::generate_handler![
            greet,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}