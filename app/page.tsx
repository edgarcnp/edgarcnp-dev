"use client"

import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { Navbar } from "@/components/navbar"
import { smoothScrollTo } from "@/lib/scroll-utils"
import { useThemeDetection } from "@/lib/theme-utils"
import { NAVIGATION, STATUS_CONFIG, type SectionName } from "@/lib/constants"

// Availability status - change this to switch status indicators
const CURRENT_AVAILABILITY_STATUS: keyof typeof STATUS_CONFIG = "busy" // Options: "available" | "busy" | "dnd"

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

            // Then set up the observers
            sectionsRef.current.forEach((section) => {
                if (section) {
                    // Add animation classes to the current section if it's already in view
                    if (section.id === currentSectionId) {
                        section.classList.add("animate-fade-in-up")
                        section.classList.remove("opacity-0")
                    }
                    fadeInObserver.observe(section)
                    fadeOutObserver.observe(section)
                }
            })
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
                <header id="intro" ref={setSectionRef("intro")} className={`${isTouchDevice ? 'min-h-screen' : 'h-screen'} flex items-center scroll-mt-20 py-24 sm:py-20 ${isTouchDevice ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 w-full">
                        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                            <div className="space-y-3 sm:space-y-2">
                                <div className="text-xs sm:text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {currentYear || new Date().getFullYear()}</div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
                                    Edgar
                                    <br />
                                    <span className="text-muted-foreground">Christian</span>
                                </h1>
                            </div>

                            <div className="space-y-4 sm:space-y-6 max-w-md">
                                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    <span className="text-foreground">Embedded Engineer</span> crafting digital experiences at the
                                    intersection of
                                    <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                                    and
                                    <span className="text-foreground"> user experience</span>.
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 ${STATUS_CONFIG[CURRENT_AVAILABILITY_STATUS].color} rounded-full animate-pulse`}></div>
                                        {STATUS_CONFIG[CURRENT_AVAILABILITY_STATUS].text}
                                    </div>
                                    <div>Remote - Indonesia</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                            <div className="space-y-4">
                                <div className="text-xs sm:text-sm text-muted-foreground font-mono">CURRENTLY</div>
                                <div className="space-y-2">
                                    <div className="text-base sm:text-lg text-foreground">Network Engineer</div>
                                    <div className="text-sm sm:text-base text-muted-foreground">@ PT. Efrat Sinergi Indonesia</div>
                                    <div className="text-xs text-muted-foreground">2021 — Present</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-xs sm:text-sm text-muted-foreground font-mono">AREA OF EXPERTISE</div>
                                <div className="flex flex-wrap gap-2">
                                    {([
                                        "Rust",
                                        "C/C++",
                                        "Python",
                                        "Systems Engineering",
                                        "Cloud Computing",
                                        "Network Engineering",
                                        "CCNA",
                                        "HCIA",
                                        "Embedded System",
                                        "IoT",
                                        "FPGA",
                                    ] as const).map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 sm:px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-theme"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="work" ref={setSectionRef("work")} className={`${isTouchDevice ? 'min-h-screen' : 'h-screen'} flex items-center scroll-mt-20 py-16 sm:py-20 ${isTouchDevice ? 'opacity-100' : 'opacity-0'} ${isTouchDevice ? 'mt-4' : ''}`}>
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

                <section
                    id="thoughts"
                    ref={setSectionRef("thoughts")}
                    className={`${isTouchDevice ? 'min-h-screen' : 'h-screen'} flex items-center scroll-mt-20 py-16 sm:py-20 ${isTouchDevice ? 'opacity-100' : 'opacity-0'} ${isTouchDevice ? 'mt-4' : ''}`}
                >
                    <div className="w-full space-y-8 sm:space-y-12 lg:space-y-16">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">Recent Thoughts</h2>

                        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
                            {([
                                {
                                    title: "The Future of Web Development",
                                    excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                                    date: "Dec 2024",
                                    readTime: "5 min",
                                },
                                {
                                    title: "Design Systems at Scale",
                                    excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                                    date: "Nov 2024",
                                    readTime: "8 min",
                                },
                                {
                                    title: "Performance-First Development",
                                    excerpt: "Why performance should be a first-class citizen in your development workflow.",
                                    date: "Oct 2024",
                                    readTime: "6 min",
                                },
                                {
                                    title: "The Art of Code Review",
                                    excerpt: "Building better software through thoughtful and constructive code reviews.",
                                    date: "Sep 2024",
                                    readTime: "4 min",
                                },
                            ] as const).map((post, index) => (
                                <article
                                    key={`${post.date}-${post.title}`}
                                    className="group p-4 sm:p-6 lg:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-theme hover:shadow-lg cursor-pointer"
                                >
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                                            <span>{post.date}</span>
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h3 className="text-base sm:text-lg lg:text-xl font-medium group-hover:text-muted-foreground transition-theme">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{post.excerpt}</p>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-theme">
                                            <span>Read more</span>
                                            <svg
                                                className="w-4 h-4 transform group-hover:translate-x-1 transition-theme"
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
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <footer id="footer" ref={setSectionRef("footer")} className={`${isTouchDevice ? 'min-h-screen' : 'h-screen'} flex items-center scroll-mt-20 py-16 sm:py-20 ${isTouchDevice ? 'opacity-100' : 'opacity-0'} ${isTouchDevice ? 'mt-4' : ''}`}>
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
                                        <Link
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
                                        </Link>
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
                                        <Link
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
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 pt-12 sm:pt-16 border-t border-border">
                            <div className="space-y-2">
                                <div className="text-sm text-muted-foreground">
                                    © {currentYear || new Date().getFullYear()} Edgar Christian. All rights reserved.
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => { window.location.href = 'mailto:me@edgarcnp.dev'; }}
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
                                </button>

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
            </main>

            <div className="fixed top-0 left-0 right-0 h-24 gradient-overlay-top pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 right-0 h-24 gradient-overlay-bottom pointer-events-none"></div>
        </div>
    )
}
