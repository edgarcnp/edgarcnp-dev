#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use axum::Router;
    use edgarcnp_dev::{file_and_error_handler, App};
    use leptos::*;
    use leptos_axum::{generate_route_list, leptos_routes, AxumOptions, LeptosOptions};
    use leptos_router::SsrMode;

    // Setting this to None means we'll be using cargo-leptos and its env
    // set to "dev" if not set by cargo-leptos
    let conf = get_configuration(None).await.unwrap();
    let leptos_options = conf.leptos_options;
    let addr = leptos_options.site_addr;
    let routes = generate_route_list(App);

    // Build our application with a route
    let app = Router::new()
        .leptos_routes(&leptos_options, routes.clone(), {
            let leptos_options = leptos_options.clone();
            move || App {}
        })
        .fallback(file_and_error_handler)
        .with_state(AxumOptions::new(leptos_options));

    // Run our application
    log::info!("listening on http://{}", &addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[cfg(not(feature = "ssr"))]
pub fn main() {
    // no client-side main function
    // unless we want this to work with e.g., Trunk for a purely client-side app
    // see lib.rs for hydration function instead
}
