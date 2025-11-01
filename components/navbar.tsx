'use client'

import { useEffect, useState } from "react"
import { type SectionName } from "@/lib/constants"

interface NavbarProps {
    activeSection: SectionName
    isDark: boolean
    onThemeToggle: () => void
    onNavigate: (section: SectionName) => void
}

const NAVBAR_SECTIONS = [
    { id: "intro", label: "Home" },
    { id: "work", label: "Work" },
    { id: "thoughts", label: "Thoughts" },
    { id: "footer", label: "Contact" },
] as const

export function Navbar({ activeSection, isDark, onThemeToggle, onNavigate }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        let isMounted = true;
        let throttleTimer: NodeJS.Timeout | null = null

        const handleScroll = () => {
            if (throttleTimer || !isMounted) return

            setIsScrolled(window.scrollY > 10)

            throttleTimer = setTimeout(() => {
                throttleTimer = null
            }, 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            isMounted = false;
            window.removeEventListener("scroll", handleScroll)
            if (throttleTimer) clearTimeout(throttleTimer)
        }
    }, [])

    const handleMobileNavigation = (sectionId: SectionName) => {
        onNavigate(sectionId)
        closeMobileMenu()
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true)
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 pointer-events-none transition-theme">
                <div
                    className={`pointer-events-auto transition-theme ${isScrolled ? "backdrop-blur-sm bg-background/50 shadow-lg" : "backdrop-blur bg-background/40 shadow-md"
                        } rounded-full px-2 py-2`}
                    style={{
                        // Gradient border effect using background with padding-box
                        border: `1px solid transparent`,
                        background: isDark
                            ? `linear-gradient(white, white) padding-box, linear-gradient(to center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) border-box`
                            : `linear-gradient(black, black) padding-box, linear-gradient(to center, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1)) border-box`,
                        // Dark mode/light mode backgrounds per previous accepted settings
                        backgroundColor: isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.05)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        boxShadow: isDark
                            ? "0 0 4px rgba(255, 255, 255, 0.025), inset 0 0 1px 2.5px rgba(255, 255, 255, 0.075)"
                            : "0 0 4px rgba(0, 0, 0, 0.025), inset 0 0 1px 2.5px rgba(0, 0, 0, 0.075)",
                    }}
                >
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => isMobileMenuOpen ? closeMobileMenu() : openMobileMenu()}
                            className="sm:hidden shrink-0 px-2 py-1 rounded-full transition-theme flex items-center justify-center group text-foreground"
                            aria-label="Toggle mobile menu"
                        >
                            <div className="relative w-3.5 h-3.5 translate-y-[0.06rem]">
                                <span
                                    className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-1.25 rotate-45' : 'rotate-0'
                                        }`}
                                />
                                <span
                                    className={`absolute top-1.25 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                <span
                                    className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-translate-y-1.25 -rotate-45' : 'rotate-0'
                                        }`}
                                />
                            </div>
                        </button>

                        {/* Menu Items - Hidden on mobile, shown on tablet+ */}
                        <div className="hidden sm:flex items-center gap-1">
                            {NAVBAR_SECTIONS.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => onNavigate(section.id)}
                                    className={`px-3 py-0 rounded-full text-xs sm:text-sm font-semibold transition-theme leading-none -translate-y-[0.05rem] ${activeSection === section.id ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                    aria-label={`Navigate to ${section.label}`}
                                >
                                    {section.label}
                                </button>
                            ))}

                            <a
                                href="https://status.edgarcnp.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-0 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground transition-theme flex items-center gap-0.5 leading-none -translate-y-[0.05rem]"
                                aria-label="Open status page in new window"
                            >
                                Status
                                <svg
                                    className="w-3 h-3 shrink-0 translate-y-[0.1rem]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        </div>

                        {/* Divider - Made visible in both light and dark modes */}
                        <div
                            className="w-px h-6"
                            style={{
                                backgroundColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                            }}
                        />

                        {/* Theme Toggle Button */}
                        <button
                            onClick={onThemeToggle}
                            className="shrink-0 px-2 py-1 rounded-full transition-theme flex items-center justify-center group text-foreground"
                            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 32 32"
                            >
                                {/* Sun rays that rotate and scale to form moon */}
                                <g className={`transition-all duration-1000 ease-in-out origin-center ${isDark ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}`}>
                                    <circle cx="16" cy="16" r="4" className="text-foreground" fill="currentColor" />
                                    <path d="M16 6L16 4M16 28L16 26M6 16L4 16M28 16L26 16M22.6 9.4L24.48 7.52M24.48 24.48L22.6 22.6M9.4 22.6L7.52 24.48M7.52 7.52L9.4 9.4" className="text-foreground" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </g>
                                {/* Moon shape that appears when sun rays disappear */}
                                <g className={`transition-all duration-1000 ease-in-out origin-center ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}>
                                    <defs>
                                        <mask id="moon-mask">
                                            <g transform="rotate(-30, 16, 16)">
                                                <rect width="32" height="32" fill="white" />
                                                <ellipse cx="22" cy="16" rx="10" ry="14" fill="black" />
                                            </g>
                                        </mask>
                                    </defs>
                                    <circle cx="16" cy="16" r="14" className="text-foreground" fill="currentColor" mask="url(#moon-mask)" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav >

            {/* Mobile Menu Overlay - Always in DOM for smooth animations */}
            < div className={`fixed inset-0 z-40 sm:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`
            }>
                <div
                    className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-mobile-menu-bg ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMobileMenu}
                />
                <div
                    className={`fixed top-16 left-4 right-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl transition-mobile-menu ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <div className="p-4 space-y-2">
                        {NAVBAR_SECTIONS.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => handleMobileNavigation(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-theme ${activeSection === section.id
                                    ? "text-foreground bg-muted font-semibold active-section-light"
                                    : "text-muted-foreground"
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                        <a
                            href="https://status.edgarcnp.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-theme"
                        >
                            Status
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div >
        </>
    )
}
