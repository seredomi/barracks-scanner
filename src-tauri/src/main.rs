
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{listen, Event};
use std::thread;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn callback(event: Event) {

  match event.name {
      Some(string) => println!("User wrote {:?}", string),
      None => (),
  }
}


fn main() {

    thread::spawn(|| listen(callback));

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .invoke_handler(tauri::generate_handler![
            greet,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
