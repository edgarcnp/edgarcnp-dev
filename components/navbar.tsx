"use client"

import { useEffect, useState } from "react"

interface NavbarProps {
    activeSection: string
    isDark: boolean
    onThemeToggle: () => void
    onNavigate: (section: string) => void
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
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        let throttleTimer: NodeJS.Timeout | null = null

        const handleScroll = () => {
            if (throttleTimer) return

            setIsScrolled(window.scrollY > 10)

            throttleTimer = setTimeout(() => {
                throttleTimer = null
            }, 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (throttleTimer) clearTimeout(throttleTimer)
        }
    }, []) // Dependency array is correct as no dependencies change

    const handleMobileNavigation = (sectionId: string) => {
        onNavigate(sectionId)
        closeMobileMenu()
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setIsAnimating(true)
        setTimeout(() => {
            setIsAnimating(false)
        }, 300)
    }

    const openMobileMenu = () => {
        setIsMobileMenuOpen(true)
        setIsAnimating(false)
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 pointer-events-none">
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
                            className="sm:hidden flex-shrink-0 px-2 py-1 rounded-full hover:bg-white/10 transition-theme flex items-center justify-center group"
                            aria-label="Toggle mobile menu"
                        >
                            <div className="relative w-3.5 h-3.5 translate-y-[0.06rem]">
                                <span
                                    className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.25' : 'translate-y-0'
                                        }`}
                                />
                                <span
                                    className={`absolute top-1.25 left-0 w-full h-0.5 bg-current transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                <span
                                    className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.25' : 'translate-y-0'
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
                                    className={`px-3 py-0 rounded-full text-xs sm:text-sm font-semibold transition-theme leading-none -translate-y-[0.05rem] ${activeSection === section.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
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
                                className="px-3 py-0 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-theme flex items-center gap-0.5 leading-none -translate-y-[0.05rem]"
                                aria-label="Open status page in new window"
                            >
                                Status
                                <svg
                                    className="w-3 h-3 flex-shrink-0 translate-y-[0.1rem]"
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
                            className="hidden sm:block w-px h-6"
                            style={{
                                backgroundColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                            }}
                        />

                        {/* Theme Toggle Button */}
                        <button
                            onClick={onThemeToggle}
                            className="flex-shrink-0 px-2 py-1 rounded-full hover:bg-white/10 transition-theme flex items-center justify-center"
                            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                        >
                            {isDark ? (
                                <svg
                                    className="w-4 h-4 text-muted-foreground hover:text-foreground transition-theme"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-4 h-4 text-muted-foreground hover:text-foreground transition-theme"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Always in DOM for smooth animations */}
            <div className={`fixed inset-0 z-40 sm:hidden ${isMobileMenuOpen || isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ visibility: isMobileMenuOpen || isAnimating ? 'visible' : 'hidden' }}>
                <div
                    className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMobileMenu}
                />
                <div
                    className={`fixed top-16 left-4 right-4 bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl transition-all duration-300 ease-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-2 opacity-0 scale-95'
                        }`}
                >
                    <div className="p-4 space-y-2">
                        {NAVBAR_SECTIONS.map((section, index) => (
                            <button
                                key={section.id}
                                onClick={() => handleMobileNavigation(section.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-theme ${activeSection === section.id
                                    ? "text-foreground bg-muted font-semibold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`}
                                style={activeSection === section.id && !isDark ? { backgroundColor: 'oklch(0.9 0 0)' } : {}}
                            >
                                {section.label}
                            </button>
                        ))}
                        <a
                            href="https://status.edgarcnp.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-theme"
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
            </div>
        </>
    )
}
