use leptos::*;

#[component]
pub fn FooterSection(current_year: i32, #[prop(optional)] class: String) -> impl IntoView {
    view! {
        <footer id="footer" class=format!("min-h-screen flex items-center py-12 sm:py-16 {}", class)>
            <div class="w-full">
                <div class="text-center">
                    <div class="mb-8">
                        <h2 class="text-2xl sm:text-3xl md:text-4xl font-light  mb-4">Get In Touch</h2>
                        <p class="text-muted-foreground  max-w-md mx-auto ">
                            Have a project in mind or want to discuss potential opportunities?
                        </p>
                    </div>

                    <div class="flex flex-col items-center gap-6">
                        <div class="flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:contact@edgarcnp.dev"
                                class={"px-6 py-3 bg-foreground text-background rounded-full hover:bg-muted transition-theme font-medium"}
                            >
                                Send an Email
                            </a>
                            <a
                                href="https://linkedin.com/in/edgarcnp"
                                target="_blank"
                                rel="noopener noreferrer"
                                class={"px-6 py-3 border border-border rounded-full hover:border-muted-foreground/50 transition-theme"}
                            >
                                Connect on LinkedIn
                            </a>
                        </div>

                        <div class="pt-8 border-t border-border">
                            <p class={"text-muted-foreground text-sm"}>
                                ©  {current_year}  Edgar Christian. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    }
}
