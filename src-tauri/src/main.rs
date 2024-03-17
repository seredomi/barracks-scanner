
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rdev::{listen, Event};
use std::thread;
use std::time::SystemTime;
use std::time::Duration;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn detect_scans() {
    let mut key_buff: Vec<String> = Vec::new();
    let mut key_times: Vec<SystemTime> = Vec::new();

    // handle all events
    let callback = move |event: Event| {

        // filter out key release events
        match event.name {
            Some(string) => {

                key_times.push(SystemTime::now());
                key_buff.push(string.clone());

                // if enter is pressed, filter and flush buffer
                if string == "\r" {
                    // distinguish bw keypresses and scan input based on input speed


                    // move start to where fast scanner-like input begins
                    let mut start: usize = 0;
                    for i in 1..key_buff.len() {
                        let span = key_times[i].duration_since(key_times[i-1]);
                        match span {
                            Ok(d) => { if d > Duration::from_millis(25) { start = i; } },
                            Err(_) => continue,
                        }
                    }

                    // discard input before start
                    if start < key_buff.len() {
                        // return slice from start to end
                        let discard = key_buff[..start].join("");
                        let keep = key_buff[start..].join("");
                        println!("Discarded: {}", discard);
                        println!("Scanned: {}", keep);
                    }
                    else {
                        println!("Discarded nada");
                        println!("Scanned: {}", key_buff.join(""));
                    }
                    key_buff.clear();
                    key_times.clear();
                }
            },
            None => (),
        }
    };

    let _ = std::thread::spawn(|| listen(callback)).join();
}


fn main() {

    // in the future i want this thread to only run when the ID Scanner page is open
    thread::spawn(|| detect_scans());

    tauri::Builder::default()
        .device_event_filter(tauri::DeviceEventFilter::Always)
        .invoke_handler(tauri::generate_handler![
            greet,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}