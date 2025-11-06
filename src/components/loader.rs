use leptos::*;

#[component]
pub fn LoaderContainer() -> impl IntoView {
    view! {
        <div
            id="loader-root"
            class="fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-500 z-9999"
        >
            <div class="fixed inset-0 flex items-center justify-center pointer-events-none z-9999">
                <div class="relative w-24 h-24 flex items-center justify-center">
                    <div class="grid grid-cols-5 grid-rows-7 w-16 h-20 gap-1">
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div class="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    </div>
                </div>
            </div>
        </div>
    }
}
