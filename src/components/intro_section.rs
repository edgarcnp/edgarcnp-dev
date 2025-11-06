use leptos::*;

#[derive(Debug, Clone, Copy)]
pub enum AvailabilityStatus {
    Available,
    Busy,
    Dnd,
}

impl AvailabilityStatus {
    pub fn color(&self) -> &'static str {
        match self {
            AvailabilityStatus::Available => "bg-green-500",
            AvailabilityStatus::Busy => "bg-yellow-500",
            AvailabilityStatus::Dnd => "bg-red-500",
        }
    }

    pub fn text(&self) -> &'static str {
        match self {
            AvailabilityStatus::Available => "Available for work",
            AvailabilityStatus::Busy => "Busy with projects",
            AvailabilityStatus::Dnd => "Not available",
        }
    }
}

// Availability status - change this to switch status indicators
const CURRENT_AVAILABILITY_STATUS: AvailabilityStatus = AvailabilityStatus::Busy;

#[component]
pub fn IntroSection(
    current_year: i32,
    #[prop(optional)] class: String,
) -> impl IntoView {
    view! {
        <header id="intro" class=format!("min-h-screen flex items-center py-16 sm:py-12 {}", class)>
            <div class="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
                <div class="lg:col-span-3 space-y-6 sm:space-y-8">
                    <div class="space-y-3 sm:space-y-2">
                        <div class="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">{"PORTFOLIO / "}{current_year}</div>
                        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
                            "Edgar"
                            <br />
                            <span class="text-muted-foreground">"Christian"</span>
                        </h1>
                    </div>

                    <div class="space-y-4 sm:space-y-6 max-w-md">
                        <p class="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                            <span class="text-foreground">"Embedded Engineer"</span> " crafting digital experiences at the intersection of "
                            <span class="text-foreground">" design"</span>", "<span class="text-foreground">" technology"</span>",
                            and "
                            <span class="text-foreground">" user experience"</span>".
                        </p>

                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground ">
                            <div class="flex items-center gap-2">
                                <div class=format!("w-2 h-2 {} rounded-full animate-pulse ", CURRENT_AVAILABILITY_STATUS.color())></div>
                                {format!("{}", CURRENT_AVAILABILITY_STATUS.text())}
                            </div>
                            <div>"Remote - Indonesia "</div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                    <div class="space-y-4">
                        <div class="text-xs sm:text-sm text-muted-foreground font-mono ">CURRENTLY</div>
                        <div class="space-y-2">
                            <div class="text-base sm:text-lg text-foreground ">Network Engineer</div>
                            <div class="text-sm sm:text-base text-muted-foreground ">@ PT. Efrat Sinergi Indonesia</div>
                            <div class="text-xs text-muted-foreground ">2021 - Present</div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="text-xs sm:text-sm text-muted-foreground font-mono ">AREA OF EXPERTISE</div>
                        <div class="flex flex-wrap gap-2">
                            {[
                                "Rust",
                                "C/C++",
                                "Python",
                                "Systems Engineering ",
                                "Cloud Computing ",
                                "Network Engineering ",
                                "CCNA",
                                "HCIA",
                                "Embedded System ",
                                "IoT",
                                "FPGA",
                            ]
                            .iter()
                            .map(|skill| {
                                // Define class string by concatenating to avoid Rust parsing issue with "theme" at end
                                let class_str = ["px-2 sm:px-3 py-1 text-xs", "border border-border", "rounded-full",
                                                 "hover:border-muted-foreground/50", "transition-theme"].join(" ");
                                view! {
                                    <span class=class_str>
                                        {skill}
                                    </span>
                                }
                            })
                            .collect::<Vec<_>>()}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    }
}
