use leptos::*;

#[component]
pub fn ThoughtsSection(#[prop(optional)] class: String) -> impl IntoView {
    view! {
        <section id="thoughts" class=format!("min-h-screen flex items-center py-12 sm:py-16 {}", class)>
            <div class="w-full">
                <div class="text-center mb-12">
                    <h2 class={"text-2xl sm:text-3xl md:text-4xl font-light mb-4"}>
                        Thoughts & Musings
                    </h2>
                    <p class={"text-muted-foreground max-w-lg mx-auto"}>
                        Coming soon - A space for my thoughts on technology, development, and life.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div class={"bg-muted/50 p-6 rounded-xl border border-border transition-theme"}>
                        <h3 class={"text-lg font-medium mb-2"}>
                            Latest Post
                        </h3>
                        <p class={"text-muted-foreground text-sm"}>
                            Stay tuned for my upcoming articles on web development, Rust, and system design.
                        </p>
                    </div>

                    <div class={"bg-muted/50 p-6 rounded-xl border border-border transition-theme"}>
                        <h3 class={"text-lg font-medium mb-2"}>
                            Featured Topic
                        </h3>
                        <p class={"text-muted-foreground text-sm"}>
                            Exploring the intersection of embedded systems and web technologies.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    }
}
