"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { smoothScrollTo } from "@/lib/scroll-utils"
import { useThemeDetection } from "@/lib/theme-utils"
import { NAVIGATION, type SectionName } from "@/lib/constants"
import IntroSection from "@/components/intro-section";
import WorkSection from "@/components/work-section";
import ThoughtsSection from "@/components/thoughts-section";
import FooterSection from "@/components/footer-section";

export default function Home() {
    const { setTheme, resolvedTheme } = useTheme()
    const [activeSection, setActiveSection] = useState<SectionName>("intro")
    const lastScrollTimeRef = useRef(0)
    const sectionsRef = useRef<Map<string, HTMLElement | null>>(new Map())
    const [currentYear, setCurrentYear] = useState<number | null>(null)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    // Use custom hook for theme detection
    const { isDark } = useThemeDetection('dark') // Default to dark during SSR


    // Helper function to get all valid navigation sections
    const getNavigationSections = useCallback((): HTMLElement[] => {
        return NAVIGATION.SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    }, []);

    useEffect(() => {
        // Set current year after mount to ensure consistency
        setCurrentYear(new Date().getFullYear())

        // Detect if device supports touch (mobile/tablet)
        const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setIsTouchDevice(touchDevice)

        // Determine initial active section based on current scroll position
        const updateActiveSectionOnLoad = () => {
            const sections = getNavigationSections()
            const scrollPosition = window.scrollY + window.innerHeight / 2

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    if (NAVIGATION.SECTIONS.includes(section.id as SectionName)) {
                        setActiveSection(section.id as SectionName)
                    }
                    break
                }
            }
        }

        // Update active section after a short delay to ensure DOM is ready
        const timer = setTimeout(updateActiveSectionOnLoad, 100)

        return () => clearTimeout(timer)

    }, [getNavigationSections])


    // Global smooth scroll handler for all anchor links
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleAnchorClick = (e: Event) => {
                const target = e.target as HTMLElement
                const link = target.closest('a[href^="#"]') as HTMLAnchorElement

                if (link && link.getAttribute('href') !== '#') {
                    e.preventDefault()
                    const targetId = link.getAttribute('href')?.substring(1)
                    if (targetId) {
                        const targetElement = document.getElementById(targetId)
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' })
                        }
                    }
                }
            }

            document.addEventListener('click', handleAnchorClick)
            return () => document.removeEventListener('click', handleAnchorClick)
        }
    }, [])

    useEffect(() => {
        // Set the active section based on current scroll position and add animations to all sections
        const timeoutId = setTimeout(() => {
            const sections = getNavigationSections()
            const scrollPosition = window.scrollY + (window.innerHeight / 2)

            // Find which section is currently in view
            let currentSectionId = "intro" // Default to intro if no section is found

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    currentSectionId = section.id
                    break
                }
            }

            if (NAVIGATION.SECTIONS.includes(currentSectionId as SectionName)) {
                setActiveSection(currentSectionId as SectionName)
            }

            // Add animation classes to all sections to make them visible
            NAVIGATION.SECTIONS.forEach((sectionId) => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    sectionElement.classList.add("animate-fade-in-up", "opacity-100");
                }
            });
        }, 200)

        return () => clearTimeout(timeoutId)
    }, [getNavigationSections])

    useEffect(() => {
        // Set the title to "edgarcnp.dev | *Section*"
        const sectionName = NAVIGATION.SECTION_NAMES[activeSection as keyof typeof NAVIGATION.SECTION_NAMES] || "Home"
        document.title = `edgarcnp.dev | ${sectionName}`
    }, [activeSection])

    useEffect(() => {
        // Universal scroll-based section detection for all devices
        const handleScroll = () => {
            const sections = getNavigationSections()
            const scrollPosition = window.scrollY + window.innerHeight / 2

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    if (NAVIGATION.SECTIONS.includes(section.id as SectionName)) {
                        setActiveSection(section.id as SectionName)
                    }
                    break
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [getNavigationSections])

    const toggleTheme = useCallback(() => {
        // Set the new theme - transitions are handled by explicit CSS rules
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, [resolvedTheme, setTheme])

    const setSectionRef = (id: string) => (el: HTMLElement | null) => {
        if (el) {
            sectionsRef.current.set(id, el)
        }
    }

    const handleNavigation = (sectionId: string) => {
        if (typeof window !== 'undefined') {
            const targetSection = document.getElementById(sectionId)
            if (targetSection) {
                // Use native smooth scrolling for all devices to ensure consistent momentum behavior
                targetSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    if (currentYear === null) {
        return (
            <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden transition-theme main-background-container">
                {/* Placeholder content while loading */}
            </div>
        );
    }

    return (
        <div className="min-h-fit bg-background text-foreground relative overflow-x-hidden transition-theme main-background-container">
            <Navbar activeSection={activeSection} isDark={isDark} onThemeToggle={toggleTheme} onNavigate={handleNavigation} />

            <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
                <div className="flex flex-col gap-4">
                    {NAVIGATION.SECTIONS.map((section) => (
                        <button
                            key={section}
                            onClick={() => handleNavigation(section)}
                            className={`w-2 h-8 rounded-full transition-theme ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                }`}
                            aria-label={`Navigate to ${NAVIGATION.SECTION_NAMES[section as keyof typeof NAVIGATION.SECTION_NAMES]}`}
                        />
                    ))}
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 space-y-6 sm:space-y-16 pt-8 sm:pt-16 pb-16 sm:pb-24">
                <IntroSection ref={setSectionRef("intro")} currentYear={currentYear} className="animate-fade-in-up opacity-100 pt-16 sm:pt-24" />
                <WorkSection ref={setSectionRef("work")} className="animate-fade-in-up opacity-100" />
                <ThoughtsSection ref={setSectionRef("thoughts")} className="animate-fade-in-up opacity-100" />
                <FooterSection ref={setSectionRef("footer")} currentYear={currentYear} className="animate-fade-in-up opacity-100" />
            </main>

            <div className="fixed top-0 left-0 right-0 h-24 gradient-overlay-top pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 right-0 h-24 gradient-overlay-bottom pointer-events-none"></div>
        </div>
    )
}
