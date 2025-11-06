use leptos::*;

// Theme management utilities
pub fn get_stored_theme() -> Option<String> {
    if let Ok(window) = web_sys::window() {
        if let Ok(storage) = window.local_storage() {
            if let Some(storage) = storage {
                if let Ok(Some(stored_theme)) = storage.get_item("edgarcnp-theme") {
                    if stored_theme == "dark" || stored_theme == "light" {
                        return Some(stored_theme);
                    }
                }
            }
        }
    }
    None
}

pub fn set_theme(theme: &str) {
    if let Ok(window) = web_sys::window() {
        if let Ok(storage) = window.local_storage() {
            if let Some(storage) = storage {
                let _ = storage.set_item("edgarcnp-theme", theme);
            }
        }

        if let Some(document) = window.document() {
            let html = document.document_element().unwrap();
            if theme == "dark" {
                html.class_list().add_1("dark").ok();
            } else {
                html.class_list().remove_1("dark").ok();
            }
        }
    }
}

pub fn get_system_theme_preference() -> String {
    if let Ok(window) = web_sys::window() {
        if let Ok(Some(mql)) = window.match_media("(prefers-color-scheme: dark)") {
            if mql.matches() {
                return "dark".to_string();
            }
        }
    }
    "light".to_string()
}
