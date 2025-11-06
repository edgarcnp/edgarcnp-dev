use leptos::*;

#[derive(Debug, Clone)]
pub struct Job {
    pub year: String,
    pub role: String,
    pub company: String,
    pub description: String,
    pub tech: Vec<String>,
}

#[component]
pub fn WorkSection(#[prop(optional)] class: String) -> impl IntoView {
    let jobs = vec![
        Job {
            year: "2023 - Present".to_string(),
            role: "Freelance Software Engineer".to_string(),
            company: "Self-Employed".to_string(),
            description: "Built performant dashboard websites for project management and team collaboration.".to_string(),
            tech: vec!["Python".to_string(), "GraphQL".to_string(), "Django".to_string(), "Rust".to_string(), "Axum".to_string(), "Dioxus".to_string()],
        },
        Job {
            year: "2022 - 2025".to_string(),
            role: "Network Engineer".to_string(),
            company: "PT. Efrat Sinergi Indonesia".to_string(),
            description: "Designed and implemented robust, fault-tolerant, and highly available network infrastructure supporting mission-critical systems and services, ensuring scalability, reliability, and maximum uptime.".to_string(),
            tech: vec!["Cisco".to_string(), "Cisco IOS".to_string(), "Python".to_string()],
        },
        Job {
            year: "2021".to_string(),
            role: "Associate Network Engineer (Internship)".to_string(),
            company: "PT. Efrat Sinergi Indonesia".to_string(),
            description: "Helping a team of network engineers designing internal networks for small businesses.".to_string(),
            tech: vec!["Cisco".to_string(), "Cisco IOS".to_string(), "Python".to_string()],
        },
    ];

    view! {
        <section id="work" class=format!("min-h-screen flex items-center py-12 sm:py-16 {}", class)>
            <div class="w-full space-y-6 sm:space-y-8 lg:space-y-12">
                <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <h2 class="text-2xl sm:text-3xl md:text-4xl font-light ">The Work Log</h2>
                    <div class="text-sm text-muted-foreground font-mono ">2021 - Present</div>
                </div>

                <div class="space-y-6 sm:space-y-8 lg:space-y-12">
                    {jobs
                        .into_iter()
                        .map(|job| {
                            view! {
                                <div
                                    class="group grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8 border-b border-border transition-theme"
                                >
                                    <div class="lg:col-span-2 mb-2 lg:mb-0">
                                        <div class="text-lg sm:text-xl lg:text-2xl font-light text-muted-foreground  group-hover:text-foreground transition-theme ">
                                            {job.year}
                                        </div>
                                    </div>

                                    <div class="lg:col-span-6 space-y-2 sm:space-y-3">
                                        <div>
                                            <h3 class="text-base sm:text-lg lg:text-xl font-medium">{job.role}</h3>
                                            <div class="text-sm sm:text-base text-muted-foreground ">{job.company}</div>
                                        </div>
                                        <p class="text-sm sm:text-base text-muted-foreground  leading-relaxed max-w-lg ">{job.description}</p>
                                    </div>

                                    <div class="lg:col-span-4 flex flex-wrap gap-1 sm:gap-2 lg:justify-end mt-2 lg:mt-0">
                                        {job.tech
                                            .into_iter()
                                            .map(|tech| {
                                                view! {
                                                    {
                                                        let tech_classes = || "px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-theme";
                                                        view! {
                                                            <span class=tech_classes>
                                                                {tech}
                                                            </span>
                                                        }
                                                    }
                                                }
                                            })
                                            .collect::<Vec<_>>()}
                                    </div>
                                </div>
                            }
                        })
                        .collect::<Vec<_>>()}
                </div>
            </div>
        </section>
    }
}
