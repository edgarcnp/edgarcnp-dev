use crate::components::{
    footer_section::FooterSection, intro_section::IntroSection, loader::LoaderContainer,
    navbar::Navbar, thoughts_section::ThoughtsSection, work_section::WorkSection,
};
use leptos::*;

#[component]
pub fn HomePage() -> impl IntoView {
    let (active_section, set_active_section) = create_signal("intro".to_string());
    let current_year = chrono::offset::Local::now().year();

    // Create signals for theme management
    let (is_dark, set_is_dark) = create_signal(true);
    let (mounted, set_mounted) = create_signal(false);

    // Handle theme initialization after mount
    create_effect(move |_| {
        if !mounted.get() {
            // Initialize based on stored preference or system preference
            let stored_theme = crate::lib::get_stored_theme();
            if let Some(theme) = stored_theme {
                set_is_dark.set(theme == "dark");
            } else {
                // Default to dark as in the original
                set_is_dark.set(true);
            }
            set_mounted.set(true);
        }
    });

    // Handle theme toggle
    let toggle_theme = move || {
        let new_theme = if is_dark.get() { "dark" } else { "light" };
        crate::lib::set_theme(&new_theme);
        set_is_dark.update(|current| *current = !*current);
    };

    // Handle navigation
    let handle_navigation = move |section_id: &str| {
        if let Ok(window) = web_sys::window() {
            if let Some(target_element) = window
                .document()
                .and_then(|doc| doc.get_element_by_id(section_id))
            {
                let _ = target_element.scroll_into_view_with_scroll_into_view_options(
                    web_sys::ScrollIntoViewOptions::new().behavior(web_sys::ScrollBehavior::Smooth),
                );
            }
        }
    };

    // Handle scroll to detect active section
    create_effect(move |_| {
        let closure =
            wasm_bindgen::closure::Closure::wrap(Box::new(move |_event: web_sys::Event| {
                if let Ok(window) = web_sys::window() {
                    let scroll_position = window.scroll_y().unwrap_or(0.0)
                        + (window
                            .inner_height()
                            .unwrap_or(100.0)
                            .as_f64()
                            .unwrap_or(0.0)
                            / 2.0);

                    let sections = ["intro", "work", "thoughts", "footer"];
                    let mut current_section_id = "intro".to_string(); // Default to intro if no section is found

                    for section_id in sections.iter().rev() {
                        // Iterate in reverse to get the highest in view
                        if let Some(section_element) = window
                            .document()
                            .and_then(|doc| doc.get_element_by_id(section_id))
                        {
                            let rect = section_element.get_bounding_client_rect();
                            let offset_top = section_element.offset_top() as f64;

                            if offset_top <= scroll_position {
                                current_section_id = section_id.to_string();
                                break;
                            }
                        }
                    }

                    set_active_section.set(current_section_id);
                }
            }) as Box<dyn FnMut(_)>);

        let window = web_sys::window().unwrap();
        window
            .add_event_listener_with_callback("scroll", closure.as_ref().unchecked_ref())
            .unwrap();

        // Store closure to prevent it from being dropped
        closure.forget();
    });

    // Update document title when active section changes
    create_effect(move |_| {
        let section_name = match active_section.get().as_str() {
            "intro" => "Home",
            "work" => "Work",
            "thoughts" => "Thoughts",
            "footer" => "Contact",
            _ => "Home",
        };

        if let Ok(window) = web_sys::window() {
            let _ = window
                .document()
                .map(|doc| doc.set_title(&format!("edgarcnp.dev | {}", section_name)));
        }
    });

    // Handle global anchor click for smooth scrolling
    create_effect(move |_| {
        let closure =
            wasm_bindgen::closure::Closure::wrap(Box::new(move |event: web_sys::MouseEvent| {
                if let Ok(window) = web_sys::window() {
                    let target = event.target().unwrap();
                    let target_element = web_sys::Element::from(target);

                    // Find if the click came from an anchor link
                    let link = get_closest_anchor_link(&target_element);
                    if let Some(anchor_link) = link {
                        let href = anchor_link.get_attribute("href");
                        if let Some(href_val) = href {
                            if href_val.starts_with("#") && href_val != "#" {
                                event.prevent_default();
                                let target_id = href_val.trim_start_matches("#");
                                handle_navigation(target_id);
                            }
                        }
                    }
                }
            }) as Box<dyn FnMut(_)>);

        if let Ok(window) = web_sys::window() {
            window
                .add_event_listener_with_callback("click", closure.as_ref().unchecked_ref())
                .unwrap();

            // Store closure to prevent it from being dropped
            closure.forget();
        }
    });

    view! {
        <div class="min-h-fit bg-background text-foreground relative overflow-x-hidden transition-theme main-background-container">
            <Navbar
                active_section=active_section.get()
                is_dark=is_dark.get()
                on_theme_toggle=toggle_theme
                on_navigate=handle_navigation
            />

            <nav class="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <div class="flex flex-col gap-4">
                    {move || {
                        ["intro", "work", "thoughts", "footer"]
                            .iter()
                            .map(|section| {
                                let section_id = section.to_string();
                                view! {
                                    <button
                                        on:click=move |_| handle_navigation(section)
                                        class=format!(
                                            "w-2 h-8 rounded-full transition-theme {}",
                                            if active_section.get() == *section {
                                                "bg-foreground"
                                            } else {
                                                "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                            }
                                        )
                                        attr:aria_label=format!("Navigate to {}", get_section_name(section))
                                    >
                                    </button>
                                }
                            })
                            .collect::<Vec<_>>()
                    }}
                </div>
            </nav>

            <main class="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 space-y-6 sm:space-y-12 pt-8 sm:pt-0 pb-8 sm:pb-0">
                <IntroSection current_year=current_year class="animate-fade-in-up opacity-100 pt-16 sm:pt-12" />
                <WorkSection class="animate-fade-in-up opacity-100" />
                <ThoughtsSection class="animate-fade-in-up opacity-100" />
                <FooterSection current_year=current_year class="animate-fade-in-up opacity-100" />
            </main>

            <div class="fixed top-0 left-0 right-0 h-24 gradient-overlay-top pointer-events-none"></div>
            <div class="fixed bottom-0 left-0 right-0 h-24 gradient-overlay-bottom pointer-events-none"></div>
        </div>
    }
}

// Helper function to find the closest anchor link
fn get_closest_anchor_link(element: &web_sys::Element) -> Option<web_sys::HtmlElement> {
    let mut current = Some(element.clone());
    while let Some(el) = current {
        let tag_name = el.tag_name().to_lowercase();
        if tag_name == "a" {
            if let Ok(html_element) = el.dyn_into::<web_sys::HtmlElement>() {
                return Some(html_element);
            }
        }
        current = el.parent_element();
    }
    None
}

fn get_section_name(section: &str) -> String {
    match section {
        "intro" => "Home".to_string(),
        "work" => "Work".to_string(),
        "thoughts" => "Thoughts".to_string(),
        "footer" => "Contact".to_string(),
        _ => section.to_string(),
    }
}
