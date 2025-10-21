"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const lastScrollTimeRef = useRef(0)
  const sectionsRef = useRef<Map<string, HTMLElement | null>>(new Map())
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const scrollDelay = 900
    const smoothScrollTo = (element: HTMLElement, duration = 1000) => {
      const startPosition = window.scrollY
      const targetPosition = element.offsetTop
      const distance = targetPosition - startPosition
      let start: number | null = null

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime
        const elapsed = currentTime - start
        const progress = Math.min(elapsed / duration, 1)
        const ease = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()

      if (now - lastScrollTimeRef.current < scrollDelay) {
        e.preventDefault()
        return
      }

      const sections = ["intro", "work", "thoughts", "footer"]
      const currentIndex = sections.indexOf(activeSection)
      let nextIndex = currentIndex

      if (e.deltaY > 0) {
        nextIndex = Math.min(currentIndex + 1, sections.length - 1)
      } else {
        nextIndex = Math.max(currentIndex - 1, 0)
      }

      if (nextIndex !== currentIndex) {
        e.preventDefault()
        lastScrollTimeRef.current = now

        const targetSection = document.getElementById(sections[nextIndex])
        if (targetSection) {
          smoothScrollTo(targetSection, 900)

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
          }
          scrollTimeoutRef.current = setTimeout(() => {
            // Reset for next scroll
          }, scrollDelay)
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeSection])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    if (el) {
      sectionsRef.current.set(id, el)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "thoughts", "footer"].map((section) => (
            <button
              key={section}
              onClick={() => {
                lastScrollTimeRef.current = Date.now()
                const targetSection = document.getElementById(section)
                if (targetSection) {
                  const startPosition = window.scrollY
                  const targetPosition = targetSection.offsetTop
                  const distance = targetPosition - startPosition
                  let start: number | null = null

                  const easeInOutCubic = (t: number) => {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                  }

                  const animation = (currentTime: number) => {
                    if (start === null) start = currentTime
                    const elapsed = currentTime - start
                    const progress = Math.min(elapsed / 900, 1)
                    const ease = easeInOutCubic(progress)

                    window.scrollTo(0, startPosition + distance * ease)

                    if (progress < 1) {
                      requestAnimationFrame(animation)
                    }
                  }

                  requestAnimationFrame(animation)
                }
              }}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header id="intro" ref={setSectionRef("intro")} className="h-screen flex items-center opacity-0">
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {currentYear}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Edgar
                  <br />
                  <span className="text-muted-foreground">Christian</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  <span className="text-foreground">Embedded Engineer</span> crafting digital experiences at the
                  intersection of
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                  and
                  <span className="text-foreground"> user experience</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Remote - Indonesia</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Network Engineer</div>
                  <div className="text-muted-foreground">@ PT. Efrat Sinergi Indonesia</div>
                  <div className="text-xs text-muted-foreground">2021 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {[
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
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="work" ref={setSectionRef("work")} className="h-screen flex items-center opacity-0">
          <div className="w-full space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2021 — Present</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
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
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
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

        <section id="thoughts" ref={setSectionRef("thoughts")} className="h-screen flex items-center opacity-0">
          <div className="w-full space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
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
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

        <footer id="footer" ref={setSectionRef("footer")} className="h-screen flex items-center opacity-0">
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
                      href="mailto:edgarcnp@proton.me"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg">edgarcnp@proton.me</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  {[
                    { name: "GitHub", handle: "@edgarcnp", url: "https://github.com/edgarcnp" },
                    { name: "Codeberg", handle: "@edgarcnp", url: "https://codeberg.org/edgarcnp" },
                    { name: "Codeberg", handle: "@edgarcnp", url: "#" },
                    { name: "LinkedIn", handle: "felixmacaspac", url: "#" },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
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
                  © {currentYear} Edgar Christian. All rights reserved.
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
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
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
