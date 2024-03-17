use rdev::{listen, Event};
use std::time::{ SystemTime, Duration };
use std::sync::mpsc;

pub fn detect_scans(query_tx: mpsc::Sender<String>) {

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
                        let keep = key_buff[start..key_buff.len()-1].join("");
                        println!("Discarded: {}", discard);
                        if keep.len() > 1 { 
                            let query = format!("SELECT * FROM personnel WHERE id = '{}';", &keep);
                            println!("sending query: ~{}~", query);
                            query_tx.send(query).unwrap();
                        }
                    }
                    else {
                        println!("Discarded nothing");
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