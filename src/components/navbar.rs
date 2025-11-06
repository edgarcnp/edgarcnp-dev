use leptos::*;

#[component]
pub fn Navbar(
    active_section: String,
    is_dark: bool,
    on_theme_toggle: impl Fn() + 'static,
    on_navigate: impl Fn(&str) + 'static,
) -> impl IntoView {
    let (is_scrolled, set_is_scrolled) = create_signal(false);
    let (is_mobile_menu_open, set_is_mobile_menu_open) = create_signal(false);

    // Handle scroll effect
    create_effect(move |_| {
        let closure =
            wasm_bindgen::closure::Closure::wrap(Box::new(move |_event: web_sys::Event| {
                let scroll_y = web_sys::window().unwrap().scroll_y().unwrap_or(0.0);
                set_is_scrolled.set(scroll_y > 10.0);
            }) as Box<dyn FnMut(_)>);

        let window = web_sys::window().unwrap();
        window
            .add_event_listener_with_callback("scroll", closure.as_ref().unchecked_ref())
            .unwrap();

        // Store closure to prevent it from being dropped
        closure.forget();
    });

    let handle_mobile_navigation = move |section_id: &str| {
        on_navigate(section_id);
        set_is_mobile_menu_open.set(false);
    };

    let close_mobile_menu = move || {
        set_is_mobile_menu_open.set(false);
    };

    let open_mobile_menu = move || {
        set_is_mobile_menu_open.set(true);
    };

    view! {
        <>
            <nav class="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 pointer-events-none transition-theme">
                <div
                    class=move || format!(
                        "pointer-events-auto transition-theme {}",
                        if is_scrolled.get() {
                            "backdrop-blur-sm bg-background/50 shadow-lg"
                        } else {
                            "backdrop-blur bg-background/40 shadow-md"
                        }
                    )
                    style=move || {
                        format!(
                            "border: 1px solid transparent; \
                            background: {}; \
                            background-color: {}; \
                            backdrop-filter: blur(4px); \
                            -webkit-backdrop-filter: blur(4px); \
                            box-shadow: {};",
                            if is_dark {
                                "linear-gradient(white, white) padding-box, linear-gradient(to center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) border-box"
                            } else {
                                "linear-gradient(black, black) padding-box, linear-gradient(to center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)) border-box"
                            },
                            if is_dark { "rgba(255, 255, 255, 0.01)" } else { "rgba(0, 0, 0, 0.05)" },
                            if is_dark {
                                "0 0 4px rgba(255, 255, 255, 0.025), inset 0 0 1px 2.5px rgba(255, 255, 255, 0.075)"
                            } else {
                                "0 0 4px rgba(0, 0, 0, 0.025), inset 0 0 1px 2.5px rgba(0, 0, 0, 0.075)"
                            }
                        )
                    }
                >
                    <div class="flex items-center gap-1 sm:gap-2">
                        {/* Mobile Menu Button */}
                        <button
                            on:click=move |_| {
                                if is_mobile_menu_open.get() {
                                    close_mobile_menu();
                                } else {
                                    open_mobile_menu();
                                }
                            }
                            class="sm:hidden shrink-0 px-2 py-1 rounded-full transition-theme flex items-center justify-center group text-foreground"
                            attr:aria_label="Toggle mobile menu"
                        >
                            <div class="relative w-3.5 h-3.5 translate-y-[0.06rem]">
                                <span
                                    class=move || format!(
                                        "absolute top-0 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out {}",
                                        if is_mobile_menu_open.get() { "translate-y-1.25 rotate-45" } else { "rotate-0" }
                                    )
                                />
                                <span
                                    class=move || format!(
                                        "absolute top-1.25 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ease-in-out {}",
                                        if is_mobile_menu_open.get() { "opacity-0" } else { "opacity-100" }
                                    )
                                />
                                <span
                                    class=move || format!(
                                        "absolute top-2.5 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out {}",
                                        if is_mobile_menu_open.get() { "-translate-y-1.25 -rotate-45" } else { "rotate-0" }
                                    )
                                />
                            </div>
                        </button>

                        {/* Menu Items - Hidden on mobile, shown on tablet+ */}
                        <div class="hidden sm:flex items-center gap-1">
                            {move || {
                                [
                                    ("intro", "Home"),
                                    ("work", "Work"),
                                    ("thoughts", "Thoughts"),
                                    ("footer", "Contact"),
                                ]
                                .iter()
                                .map(|(id, label)| {
                                    let id_str = id.to_string();
                                    view! {
                                        <button
                                            on:click=move |_| on_navigate(id)
                                            class=move || format!(
                                                "px-3 py-0 rounded-full text-xs sm:text-sm font-semibold transition-theme leading-none -translate-y-[0.05rem] {}",
                                                if active_section == *id { "text-foreground" } else { "text-muted-foreground" }
                                            )
                                            attr:aria_label=format!("Navigate to {}", label)
                                        >
                                            {label}
                                        </button>
                                    }
                                })
                                .collect::<Vec<_>>()
                            }}

                            <a
                                href="https://status.edgarcnp.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="px-3 py-0 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground  transition-theme  flex items-center gap-0.5 leading-none -translate-y-[0.05rem]"
                                attr:aria_label="Open status page in new window"
                            >
                                Status
                                <svg
                                    class="w-3 h-3 shrink-0 translate-y-[0.1rem]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    attr:aria_hidden="true"
                                >
                                    <path
                                        stroke_linecap="round"
                                        stroke_linejoin="round"
                                        stroke_width="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Divider - Made visible in both light and dark modes */}
                        <div
                            class="w-px h-6"
                            style=move || {
                                format!(
                                    "background-color: {};",
                                    if is_dark { "rgba(255, 255, 255, 0.15)" } else { "rgba(0, 0, 0, 0.15)" }
                                )
                            }
                        />

                        {/* Theme Toggle Button */}
                        <button
                            on:click=on_theme_toggle
                            class="shrink-0 px-2 py-1 rounded-full transition-theme flex items-center justify-center group text-foreground"
                            attr:aria_label=move || format!("Switch to {} mode", if is_dark { "light" } else { "dark" })
                        >
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 32 32"
                            >
                                {/* Sun rays that rotate and scale to form moon */}
                                <g class=move || format!(
                                    "transition-all duration-1000 ease-in-out origin-center {}",
                                    if is_dark { "opacity-0 scale-0 rotate-180" } else { "opacity-100 scale-100 rotate-0" }
                                )>
                                    <circle cx="16" cy="16" r="4" class="text-foreground" fill="currentColor" />
                                    <path d="M16 6L16 4M16 28L16 26M6 16L4 16M28 16L26 16M22.6 9.4L24.48 7.52M24.48 24.48L22.6 22.6M9.4 22.6L7.52 24.48M7.52 7.52L9.4 9.4" class="text-foreground" stroke="currentColor" stroke_width="2" stroke_linecap="round" />
                                </g>
                                {/* Moon shape that appears when sun rays disappear */}
                                <g class=move || format!(
                                    "transition-all duration-1000 ease-in-out origin-center {}",
                                    if is_dark { "opacity-100 scale-100 rotate-0" } else { "opacity-0 scale-0 -rotate-180" }
                                )>
                                    <defs>
                                        <mask id="moon-mask">
                                            <g transform="rotate(-30, 16, 16)">
                                                <rect width="32" height="32" fill="white" />
                                                <ellipse cx="22" cy="16" rx="10" ry="14" fill="black" />
                                            </g>
                                        </mask>
                                    </defs>
                                    <circle cx="16" cy="16" r="14" class="text-foreground" fill="currentColor" mask="url(#moon-mask)" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Always in DOM for smooth animations */}
            <div class=move || format!(
                "fixed inset-0 z-40 sm:hidden {}",
                if is_mobile_menu_open.get() { "pointer-events-auto" } else { "pointer-events-none" }
            )>
                <div
                    on:click=move |_| close_mobile_menu()
                    class=move || format!(
                        "fixed inset-0 bg-background/80 backdrop-blur-sm transition-mobile-menu-bg {}",
                        if is_mobile_menu_open.get() { "opacity-100" } else { "opacity-0" }
                    )
                />
                <div
                    class=move || format!(
                        "fixed top-16 left-4 right-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl transition-mobile-menu {}",
                        if is_mobile_menu_open.get() { "opacity-100 pointer-events-auto" } else { "opacity-0 pointer-events-none" }
                    )
                >
                    <div class="p-4 space-y-2">
                        {move || {
                            [
                                ("intro", "Home"),
                                ("work", "Work"),
                                ("thoughts", "Thoughts"),
                                ("footer", "Contact"),
                            ]
                            .iter()
                            .map(|(id, label)| {
                                let id_str = id.to_string();
                                view! {
                                    <button
                                        on:click=move |_| handle_mobile_navigation(id)
                                        class=move || format!(
                                            "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-theme {}",
                                            if active_section == *id {
                                                "text-foreground bg-muted font-semibold active-section-light"
                                            } else {
                                                "text-muted-foreground"
                                            }
                                        )
                                    >
                                        {label}
                                    </button>
                                }
                            })
                            .collect::<Vec<_>>()
                        }}
                        <a
                            href="https://status.edgarcnp.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground  transition-theme "
                        >
                            Status
                            <svg
                                class="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke_linecap="round"
                                    stroke_linejoin="round"
                                    stroke_width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    }
}
