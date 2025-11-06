use leptos::*;
use leptos_meta::*;
use leptos_router::*;

pub mod components;
pub mod lib;
pub mod routes;

#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        <Stylesheet id="tailwind" href="/pkg/edgarcnp-dev.css"/>
        <Link rel="icon" type_="image/x-icon" href="/e-icon.ico"/>
        <Meta name="theme-color" content="#000000"/>
        <Html lang="en" class={"font-sans antialiased"}>
            <Body class={"font-sans antialiased"}>
                <Routes fallback=|| "Page not found.".into_view()>
                    <Route path="" view=routes::home::HomePage ssr=SsrMode::Async/>
                </Routes>
            </Body>
        </Html>
    }
}

#[cfg(feature = "hydrate")]
#[wasm_bindgen::prelude::wasm_bindgen]
pub fn hydrate() {
    use leptos::*;

    // Initialize debug logging
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();

    leptos::mount_to_body(App);
}

use axum::{
    body::Body,
    extract::{Path, State},
    http::{Request, Response, StatusCode},
    response::IntoResponse,
    routing::get,
    Router,
};
#[cfg(feature = "ssr")]
use leptos_axum::{handle_server_fns, LeptosOptions, LeptosRouteListing};

#[cfg(feature = "ssr")]
pub async fn file_and_error_handler(
    req: Request<Body>,
    State(options): State<leptos_axum::AxumOptions>,
) -> impl IntoResponse {
    use leptos::{Errors, View};
    use std::collections::HashMap;

    let handler = leptos_axum::file_and_error_handler(options.leptos_options);
    handler(req, HashMap::<String, String>::new(), Errors::default()).await
}
