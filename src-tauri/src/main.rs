// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::Local;
use image::{ImageBuffer, Rgba};
use scrap::{Capturer, Display};
use std::fs::File;
use std::io::ErrorKind::WouldBlock;
use std::time::Duration;
use std::{fs, thread};
use tauri::api::path::data_dir;

fn get_data_directory() -> Option<String> {
    data_dir().map(|path| path.to_string_lossy().into_owned())
}
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, screenshot])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
//fn screenshot() {
fn screenshot(x: usize, y: usize, width: usize, height: usize) {
    // Set the section of the screen to capture (x, y, width, height)
    //let x = 100;
    //let y = 100;
    //let width = 300;
    //let height = 200;

    // Get the primary display
    let display = Display::primary().expect("Couldn't find primary display.");
    // Get screen dimensions
    let screen_width = display.width();
    let screen_height = display.height();

    let mut capturer = Capturer::new(display).expect("Couldn't begin capture.");

    // Capture the screen in a loop until successful
    let frame;
    loop {
        match capturer.frame() {
            Ok(buffer) => {
                frame = buffer.to_owned();
                break;
            }
            Err(error) if error.kind() == WouldBlock => {
                // Frame not ready, wait a bit and retry
                thread::sleep(Duration::new(0, 1_000_000));
                continue;
            }
            Err(error) => panic!("Error: {}", error),
        }
    }

    // Create a new image buffer for the screenshot
    let mut img = ImageBuffer::<Rgba<u8>, _>::new(width as u32, height as u32);

    // Copy the section of the screen to the new image buffer
    for row in 0..height {
        for col in 0..width {
            let screen_x = x + col;
            let screen_y = y + row;
            if screen_x < screen_width && screen_y < screen_height {
                let offset = 4 * (screen_y * screen_width + screen_x);
                let pixel = [frame[offset + 2], frame[offset + 1], frame[offset], 255];
                img.put_pixel(col as u32, row as u32, Rgba(pixel));
            }
        }
    }

    // Get the current local date and time
    let now = Local::now();

    // Format the date and time as "yyyy-mm-dd-HH-MM-SS-sss"
    let formatted_now = now.format("%Y-%m-%d-%H-%M-%S-%3f");

    let file_name = format!("{}.png", formatted_now);
    dbg!(&file_name);
    match data_dir() {
        Some(mut path) => {
            path.push("sketchnotes"); // specify your desired subdirectory here
            if let Err(e) = fs::create_dir_all(&path) {
                dbg!(e);
            }
            path.push(file_name);
            //let mut file = File::create(&path).map_err(|e| e.to_string()).unwrap();

            img.save(&path).expect("Failed to save screenshot.");
            println!("Screenshot saved to {}", &path.to_string_lossy());
            //file.write_all(content.as_bytes())
            //    .map_err(|e| e.to_string())?;
            //Ok(path.to_string_lossy().into_owned())
        }
        None => {
            dbg!("err");
        }
    }
    // Save the image as a PNG file
    //img.save("../screenshot.png")
}
