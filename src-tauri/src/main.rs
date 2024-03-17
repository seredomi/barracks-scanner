
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{listen, Event};
use std::thread;
use std::time::SystemTime;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


fn detect_scans() {
    let mut key_buff: Vec<String> = Vec::new();
    let mut key_times: Vec<SystemTime> = Vec::new();

    let callback = move |event: Event| {
        match event.name {
            Some(string) => {
                if string == "\r" {
                    println!("Scanned: {}", key_buff.join(""));
                    key_buff.clear();
                    key_times.clear();
                } else {
                    key_buff.push(string);
                    key_times.push(SystemTime::now());
                }
            },
            None => (),
        }
    };

    std::thread::spawn(|| listen(callback));
}


fn main() {

    thread::spawn(|| detect_scans());

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .invoke_handler(tauri::generate_handler![
            greet,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
