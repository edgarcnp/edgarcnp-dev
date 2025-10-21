"use client"

import { useState, useEffect, useRef } from "react"

interface DynamicNavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
  isDark: boolean
  onThemeToggle: () => void
}

export function DynamicNavbar({ activeSection, onNavigate, isDark, onThemeToggle }: DynamicNavbarProps) {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const sections = [
    { id: "intro", label: "Home" },
    { id: "work", label: "Work" },
    { id: "thoughts", label: "Thoughts" },
    { id: "footer", label: "Contact" },
  ]

  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeSection)
    if (activeButton && navRef.current) {
      const buttonRect = activeButton.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()

      setHighlightStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width,
      })
    }
  }, [activeSection])

  return (
    <>
      {/* Dynamic Island - Always visible at top */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="relative">
          {/* Liquid Glass Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-white/5 dark:from-white/8 dark:to-white/2 rounded-full blur-xl opacity-60"></div>

          {/* Main Container */}
          <div
            className={`relative px-6 py-3 rounded-full border backdrop-blur-2xl shadow-2xl ${
              isDark ? "border-white/15 bg-black/40" : "border-gray-300/40 bg-gray-100/60"
            }`}
          >
            <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
              <div
                className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out ${
                  isDark ? "bg-white/8" : "bg-gray-300/40"
                }`}
                style={{
                  left: `${highlightStyle.left}px`,
                  width: `${highlightStyle.width}px`,
                }}
              ></div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1 relative z-10" ref={navRef}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(section.id, el)
                  }}
                  onClick={() => onNavigate(section.id)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    activeSection === section.id
                      ? isDark
                        ? "text-white"
                        : "text-black"
                      : isDark
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.label}
                </button>
              ))}

              {/* Divider */}
              <div className={`w-px h-6 mx-2 ${isDark ? "bg-white/10" : "bg-gray-300/40"}`}></div>

              {/* Theme Toggle */}
              <button
                onClick={onThemeToggle}
                className={`p-1.5 rounded-full transition-all duration-300 ${
                  isDark
                    ? "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-300/20"
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blur effect background */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/3 dark:from-white/1 to-transparent pointer-events-none z-40"></div>
    </>
  )
}
