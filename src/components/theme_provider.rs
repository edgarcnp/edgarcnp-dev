use leptos::*;

#[component]
pub fn ThemeProvider(children: Children) -> impl IntoView {
    // This is a simplified version since we're managing theme elsewhere
    view! {
        {children()}
    }
}
