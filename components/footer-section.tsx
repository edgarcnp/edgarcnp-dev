'use client';

import { forwardRef } from 'react';

const FooterSection = forwardRef<HTMLDivElement, { currentYear: number }>(
    ({ currentYear }, ref) => {
        return (
            <footer ref={ref} id="footer" className="h-screen flex items-center scroll-mt-20 py-16 sm:py-20 opacity-0">
                <div className="w-full space-y-12 sm:space-y-16">
                    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
                        <div className="space-y-6 sm:space-y-8">
                            <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

                            <div className="space-y-6">
                                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                                    Always interested in new opportunities, collaborations, and conversations about technology and
                                    design.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:me@edgarcnp.dev"
                                        className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-theme"
                                    >
                                        <span className="text-base sm:text-lg">me@edgarcnp.dev</span>
                                        <svg
                                            className="w-5 h-5 transform group-hover:translate-x-1 transition-theme"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {([
                                    { name: "GitHub", handle: "@edgarcnp", url: "https://github.com/edgarcnp" },
                                    { name: "Codeberg", handle: "@edgarcnp", url: "https://codeberg.org/edgarcnp" },
                                    { name: "𝕏", handle: "@edgarcnp", url: "https://x.com/edgarcnp" },
                                    { name: "LinkedIn", handle: "Edgar Christian", url: "#" },
                                ] as const).map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-theme hover:shadow-sm"
                                    >
                                        <div className="space-y-2">
                                            <div className="text-foreground group-hover:text-muted-foreground transition-theme">
                                                {social.name}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{social.handle}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-border">
                        <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                                © {currentYear} Edgar Christian. All rights reserved.
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:me@edgarcnp.dev"
                                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                                aria-label="Open chat"
                            >
                                <svg
                                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </a>

                            {/* Button Template */}
                            {/* <button
                            className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                            aria-label="Open chat"
                            >
                            <svg
                            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                            </svg>
                            </button> */}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
);

FooterSection.displayName = 'FooterSection';

export default FooterSection;
