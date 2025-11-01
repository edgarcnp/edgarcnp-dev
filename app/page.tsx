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
        // Set the active section based on current scroll position
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

            const firstSection = document.getElementById("intro")
            if (firstSection) {
                if (isTouchDevice) {
                    // For touch devices, set the current section based on scroll position
                    if (NAVIGATION.SECTIONS.includes(currentSectionId as SectionName)) {
                        setActiveSection(currentSectionId as SectionName)
                    }
                } else {
                    // For desktop, add animation classes to the first section if it's in view
                    if (currentSectionId === "intro") {
                        firstSection.classList.add("animate-fade-in-up")
                        firstSection.classList.remove("opacity-0")
                    }
                    if (NAVIGATION.SECTIONS.includes(currentSectionId as SectionName)) {
                        setActiveSection(currentSectionId as SectionName)
                    }
                }
            }
        }, 200)

        return () => clearTimeout(timeoutId)
    }, [getNavigationSections, isTouchDevice])

    useEffect(() => {
        // Set the title to "edgarcnp.dev | *Section*"
        const sectionName = NAVIGATION.SECTION_NAMES[activeSection as keyof typeof NAVIGATION.SECTION_NAMES] || "Home"
        document.title = `edgarcnp.dev | ${sectionName}`
    }, [activeSection])

    useEffect(() => {
        // For mobile/tablet devices, use simple scroll-based section detection
        if (isTouchDevice) {
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
        }

        const fadeInObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up")
                        entry.target.classList.remove("animate-fade-out-down")
                        if (NAVIGATION.SECTIONS.includes(entry.target.id as SectionName)) {
                            setActiveSection(entry.target.id as SectionName)
                        }
                    }
                })
            },
            { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" },
        )

        const fadeOutObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove("animate-fade-in-up")
                        entry.target.classList.add("animate-fade-out-down")
                    }
                })
            },
            { threshold: 0.1, rootMargin: "10% 0px 10% 0px" },
        )

        // Use a timeout to ensure DOM elements are ready
        const timeoutId = setTimeout(() => {
            // First, determine the current section based on scroll position
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

            // Then set up the observers for each section element
            NAVIGATION.SECTIONS.forEach((sectionId) => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    // Add animation classes to the current section if it's already in view
                    if (sectionId === currentSectionId) {
                        sectionElement.classList.add("animate-fade-in-up")
                        sectionElement.classList.remove("opacity-0")
                    }
                    fadeInObserver.observe(sectionElement)
                    fadeOutObserver.observe(sectionElement)
                }
            });
        }, 100)

        return () => {
            clearTimeout(timeoutId)
            fadeInObserver.disconnect()
            fadeOutObserver.disconnect()
        }
    }, [getNavigationSections, isTouchDevice])

    useEffect(() => {
        // Only enable magnetic scroll on desktop devices (non-touch)
        if (isTouchDevice) {
            return
        }

        const handleWheel = (e: WheelEvent) => {
            const now = Date.now()

            if (now - lastScrollTimeRef.current < NAVIGATION.SCROLL_DELAY) {
                e.preventDefault()
                return
            }

            const currentIndex = NAVIGATION.SECTIONS.indexOf(activeSection)
            let nextIndex = currentIndex

            if (e.deltaY > 0) {
                nextIndex = Math.min(currentIndex + 1, NAVIGATION.SECTIONS.length - 1)
            } else {
                nextIndex = Math.max(currentIndex - 1, 0)
            }

            if (nextIndex !== currentIndex) {
                e.preventDefault()
                lastScrollTimeRef.current = now

                const targetSection = document.getElementById(NAVIGATION.SECTIONS[nextIndex])
                if (targetSection) {
                    smoothScrollTo(targetSection, { duration: NAVIGATION.SCROLL_DURATION })
                }
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "PageUp" && e.key !== "PageDown") {
                return
            }

            const now = Date.now()

            if (now - lastScrollTimeRef.current < NAVIGATION.SCROLL_DELAY) {
                e.preventDefault()
                return
            }

            const currentIndex = NAVIGATION.SECTIONS.indexOf(activeSection)
            let nextIndex = currentIndex

            if (e.key === "PageDown") {
                nextIndex = Math.min(currentIndex + 1, NAVIGATION.SECTIONS.length - 1)
            } else if (e.key === "PageUp") {
                nextIndex = Math.max(currentIndex - 1, 0)
            }

            if (nextIndex !== currentIndex) {
                e.preventDefault()
                lastScrollTimeRef.current = now

                const targetSection = document.getElementById(NAVIGATION.SECTIONS[nextIndex])
                if (targetSection) {
                    smoothScrollTo(targetSection, { duration: NAVIGATION.SCROLL_DURATION })
                }
            }
        }

        window.addEventListener("wheel", handleWheel, { passive: false })
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("wheel", handleWheel)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeSection, isTouchDevice])  // Note: No need to add getNavigationSections here since it's not used in this effect

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
                if (isTouchDevice) {
                    // Use native smooth scrolling for mobile/tablet
                    targetSection.scrollIntoView({ behavior: 'smooth' })
                } else {
                    // Use custom smooth scrolling for desktop
                    lastScrollTimeRef.current = Date.now()
                    smoothScrollTo(targetSection, { duration: NAVIGATION.SCROLL_DURATION })
                }
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
        <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden transition-theme main-background-container">
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

            <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
                <IntroSection ref={setSectionRef("intro")} currentYear={currentYear} />
                <WorkSection ref={setSectionRef("work")} />
                <ThoughtsSection ref={setSectionRef("thoughts")} />
                <FooterSection ref={setSectionRef("footer")} currentYear={currentYear} />
            </main>

            <div className="fixed top-0 left-0 right-0 h-24 gradient-overlay-top pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 right-0 h-24 gradient-overlay-bottom pointer-events-none"></div>
        </div>
    )
}
