"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface LoaderProps {
  onLoadComplete: () => void;
}

export function Loader({ onLoadComplete }: LoaderProps) {
  const { resolvedTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingPhase, setLoadingPhase] = useState<'init' | 'resources' | 'complete'>('init');
  const [mounted, setMounted] = useState(false);
  
  // Only access theme after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to light theme during SSR to match default styles
  const isDark = mounted ? resolvedTheme === "dark" : false;

  useEffect(() => {
    let observer: PerformanceObserver | null = null;
    let resourcesLoaded = 0;
    let totalResources = 0;

    const updateProgress = () => {
      if (totalResources === 0) return;

      // Calculate real progress based on multiple factors
      const resourceProgress = (resourcesLoaded / totalResources) * 100;
      const domProgress = document.readyState === 'complete' ? 100 : 
                         document.readyState === 'interactive' ? 60 : 30;
      const imagesLoaded = Array.from(document.images).filter(img => img.complete).length;
      const totalImages = document.images.length;
      const imageProgress = totalImages === 0 ? 100 : (imagesLoaded / totalImages) * 100;
      
      // Weight the different progress metrics
      const targetProgress = Math.min(
        (resourceProgress * 0.4) + // Resource loading: 40% weight
        (domProgress * 0.3) + // DOM readiness: 30% weight
        (imageProgress * 0.3), // Image loading: 30% weight
        99 // Cap at 99% until final check
      );
      
      // Smoothly animate to target progress
      const animate = (timestamp: number) => {
        if (!animationStart) animationStart = timestamp;
        const elapsed = timestamp - animationStart;
        const duration = 1000; // Slower, smoother animation
        
        // Custom easing function for smoother progression
        const easeOutCubic = (x: number): number => {
          const t = x - 1;
          return t * t * t + 1;
        };

        const animationProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(animationProgress);
        
        // Ensure we never go backwards in progress
        const newProgress = Math.max(
          progress,
          progress + (targetProgress - progress) * easedProgress
        );
        
        setProgress(newProgress);
        
        if (animationProgress < 1) {
          requestAnimationFrame(animate);
        } else if (targetProgress >= 99) {
          checkCompletion();
        }
      };
      
      let animationStart: number | null = null;
      requestAnimationFrame(animate);
    };

    const checkCompletion = () => {
      // Comprehensive readiness check
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const allResourcesLoaded = entries.every(resource => resource.responseEnd > 0);
      const mainContentLoaded = document.querySelector('main')?.hasChildNodes();
      const allImagesLoaded = Array.from(document.images).every(img => img.complete);
      const fontsLoaded = document.fonts.status === 'loaded';
      
      // Check if all critical elements are ready
      if (allResourcesLoaded && 
          document.readyState === 'complete' && 
          mainContentLoaded &&
          allImagesLoaded &&
          fontsLoaded) {
        
        // Set to 99% first to show "Ready" state
        if (progress < 99) {
          setProgress(99);
          setTimeout(() => {
            // After 500ms, complete the loading
            setProgress(100);
            setLoadingPhase('complete');
            
            // Then start the fade out
            setTimeout(() => {
              setIsVisible(false);
              requestAnimationFrame(onLoadComplete);
            }, 300);
          }, 500);
        }
      } else {
        // If not everything is ready, check again in a short interval
        setTimeout(checkCompletion, 100);
      }
    };

    const handleResourceLoad = () => {
      const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      totalResources = entries.length;
      resourcesLoaded = entries.filter(r => r.responseEnd > 0).length;
      updateProgress();
    };

    // Start monitoring resources
    if (PerformanceObserver.supportedEntryTypes.includes('resource')) {
      observer = new PerformanceObserver(() => {
        handleResourceLoad();
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }

    // Initial state
    handleResourceLoad();

    // Listen for load event as backup
    window.addEventListener('load', checkCompletion);

    return () => {
      window.removeEventListener('load', checkCompletion);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [onLoadComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-all duration-1000 ${
        !isVisible ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 via-transparent to-foreground/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: mounted 
              ? `radial-gradient(circle at 50% 50%, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`
              : 'none',
            backgroundSize: '24px 24px'
          }}
        ></div>
      </div>

      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 border-2 border-muted-foreground/30 rounded-full">
            {/* Progress circle */}
            <svg
              className="absolute top-0 left-0 w-full h-full -rotate-90 transform"
              viewBox="0 0 100 100"
            >
              <circle
                className="transition-all duration-500 ease-out"
                cx="50"
                cy="50"
                r="48"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${progress * 3.02} 1000`}
                style={{
                  color: 'var(--foreground)',
                  opacity: 0.8,
                }}
              />
            </svg>

          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-8 h-8 rounded-full ${
                isDark ? "bg-foreground" : "bg-muted-foreground"
              } transition-transform duration-500`}
              style={{
                transform: `scale(${0.8 + (progress / 500)})`,
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3 min-w-[200px]">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-light text-foreground whitespace-nowrap">Loading</h2>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {progress < 20 ? 'Initializing...' :
               progress < 40 ? 'Loading resources...' :
               progress < 60 ? 'Preparing assets...' :
               progress < 80 ? 'Finalizing...' :
               progress < 99 ? 'Almost there...' :
               'Ready'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative w-72">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-muted-foreground to-foreground rounded-full"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          </div>
          
          {/* Subtle loading pulse effect */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              animation: progress < 100 ? 'pulse-glow 2s ease-in-out infinite' : 'none',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              transform: `translateX(${progress}%)`,
              opacity: progress < 100 ? 0.5 : 0
            }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-sm text-muted-foreground font-mono">
          {Math.round(Math.min(progress, 100))}%
        </div>
      </div>
    </div>
  );
}