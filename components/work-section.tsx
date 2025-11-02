'use client';

import { forwardRef } from 'react';

const WorkSection = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className = "" }, ref) => {
        return (
            <section ref={ref} id="work" className={`min-h-screen flex items-center scroll-mt-20 py-12 sm:py-16 ${className}`}>
                <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">The Work Log</h2>
                        <div className="text-sm text-muted-foreground font-mono">2021 — Present</div>
                    </div>

                    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                        {([
                            {
                                year: "2023 - Present",
                                role: "Freelance Software Engineer",
                                company: "Self-Employed",
                                description: "Built performant dashboard websites for project management and team collaboration.",
                                tech: ["Python", "GraphQL", "Django", "Rust", "Axum", "Dioxus"],
                            },
                            {
                                year: "2022 - 2025",
                                role: "Network Engineer",
                                company: "PT. Efrat Sinergi Indonesia",
                                description:
                                    "Designed and implemented robust, fault-tolerant, and highly available network infrastructure supporting mission-critical systems and services, ensuring scalability, reliability, and maximum uptime.",
                                tech: ["Cisco", "Cisco IOS", "Python"],
                            },
                            {
                                year: "2021",
                                role: "Associate Network Engineer (Internship)",
                                company: "PT. Efrat Sinergi Indonesia",
                                description: "Helping a team of network engineers designing internal networks for small businesses.",
                                tech: ["Cisco", "Cisco IOS", "Python"],
                            },
                        ] as const).map((job, index) => (
                            <div
                                key={`${job.year}-${job.role}`}
                                className="group grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 lg:py-8 border-b border-border transition-theme"
                            >
                                <div className="lg:col-span-2 mb-2 lg:mb-0">
                                    <div className="text-lg sm:text-xl lg:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-theme">
                                        {job.year}
                                    </div>
                                </div>

                                <div className="lg:col-span-6 space-y-2 sm:space-y-3">
                                    <div>
                                        <h3 className="text-base sm:text-lg lg:text-xl font-medium">{job.role}</h3>
                                        <div className="text-sm sm:text-base text-muted-foreground">{job.company}</div>
                                    </div>
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                                </div>

                                <div className="lg:col-span-4 flex flex-wrap gap-1 sm:gap-2 lg:justify-end mt-2 lg:mt-0">
                                    {job.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-theme"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
);

WorkSection.displayName = 'WorkSection';

export default WorkSection;
