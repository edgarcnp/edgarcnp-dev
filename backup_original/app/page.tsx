"use client"

import { useEffect, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { useThemeDetection } from "@/lib/theme-utils"
import { NAVIGATION, type SectionName } from "@/lib/constants"
import IntroSection from "@/components/intro-section";
import WorkSection from "@/components/work-section";
import ThoughtsSection from "@/components/thoughts-section";
import FooterSection from "@/components/footer-section";

export default function Home() {
    const { setTheme, resolvedTheme } = useTheme()
    const [activeSection, setActiveSection] = useState<SectionName>("intro")
    const [currentYear] = useState<number>(new Date().getFullYear())

    // Use custom hook for theme detection
    const { isDark, mounted } = useThemeDetection('dark') // Default to dark during SSR

    // Helper function to get all valid navigation sections
    const getNavigationSections = useCallback((): HTMLElement[] => {
        return NAVIGATION.SECTIONS.map((id: SectionName) => {
            const element = document.getElementById(id);
            return element as HTMLElement | null;
        }).filter((element): element is HTMLElement => element !== null);
    }, []);

    useEffect(() => {
        // Global smooth scroll handler for all anchor links
        const handleAnchorClick = (e: MouseEvent) => {
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
    }, [])

    useEffect(() => {
        // Set the active section based on current scroll position and add animations to all sections
        const updateSectionOnScroll = () => {
            const sections = getNavigationSections()
            const scrollPosition = window.scrollY + (window.innerHeight / 2)

            // Find which section is currently in view
            let currentSectionId: SectionName = "intro" // Default to intro if no section is found

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i]
                if (section && section.offsetTop <= scrollPosition) {
                    currentSectionId = section.id as SectionName
                    break
                }
            }

            if (NAVIGATION.SECTIONS.includes(currentSectionId)) {
                setActiveSection(currentSectionId)
            }

            // Add animation classes to all sections to make them visible
            NAVIGATION.SECTIONS.forEach((sectionId: SectionName) => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    sectionElement.classList.add("animate-fade-in-up", "opacity-100");
                }
            });
        }

        // Initial call to set up animations
        updateSectionOnScroll()

        // Universal scroll-based section detection for all devices
        const handleScroll = () => {
            updateSectionOnScroll()
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [getNavigationSections])

    useEffect(() => {
        // Set the title to "edgarcnp.dev | *Section*"
        const sectionName = NAVIGATION.SECTION_NAMES[activeSection] || "Home"
        document.title = `edgarcnp.dev | ${sectionName}`
    }, [activeSection])

    const toggleTheme = useCallback(() => {
        // Set the new theme - transitions are handled by explicit CSS rules
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }, [resolvedTheme, setTheme])

    const handleNavigation = (sectionId: SectionName) => {
        if (typeof window !== 'undefined') {
            const targetSection = document.getElementById(sectionId) as HTMLElement | null
            if (targetSection) {
                // Use native smooth scrolling for all devices to ensure consistent momentum behavior
                targetSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
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

            <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 space-y-6 sm:space-y-12 pt-8 sm:pt-0 pb-8 sm:pb-0">
                <IntroSection currentYear={currentYear} className="animate-fade-in-up opacity-100 pt-16 sm:pt-12" />
                <WorkSection className="animate-fade-in-up opacity-100" />
                <ThoughtsSection className="animate-fade-in-up opacity-100" />
                <FooterSection currentYear={currentYear} className="animate-fade-in-up opacity-100" />
            </main>

            <div className="fixed top-0 left-0 right-0 h-24 gradient-overlay-top pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 right-0 h-24 gradient-overlay-bottom pointer-events-none"></div>
        </div>
    )
}
