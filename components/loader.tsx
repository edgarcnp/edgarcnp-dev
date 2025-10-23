"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface LoaderProps {
  onLoadComplete: () => void
}

export function Loader({ onLoadComplete }: LoaderProps) {
  const { resolvedTheme } = useTheme()
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const isDark = resolvedTheme === "dark"
  
  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    // Listen for window load event
    const handleLoad = () => {
      setProgress(100)
      clearInterval(progressInterval)
      
      // Wait a bit for the progress bar to complete, then hide loader
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => {
          onLoadComplete()
        }, 500) // Fade out duration
      }, 300)
    }

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    // Fallback timeout in case load event doesn't fire
    const fallbackTimeout = setTimeout(() => {
      handleLoad()
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimeout)
    }
  }, [onLoadComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 border-2 border-muted-foreground/30 rounded-full">
            <div 
              className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-foreground rounded-full"
              style={{
                animation: 'loader-spin 1s linear infinite'
              }}
            ></div>
            <div 
              className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-r-foreground/50 rounded-full"
              style={{
                animation: 'loader-spin 1.5s linear infinite reverse'
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-8 h-8 rounded-full ${isDark ? 'bg-foreground' : 'bg-muted-foreground'}`}
              style={{
                animation: 'loader-pulse 2s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-light text-foreground">
            Loading
          </h2>
          <p className="text-sm text-muted-foreground">
            Preparing your experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-72 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-muted-foreground to-foreground transition-all duration-500 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-muted-foreground font-mono">
          {Math.round(Math.min(progress, 100))}%
        </div>

      </div>
    </div>
  )
}
