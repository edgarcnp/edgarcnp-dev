'use client';

import type { ReactElement, FC } from 'react';
import { useEffect, useState, memo, useRef } from 'react';

// AnimationGrid component to prevent re-rendering of animations
const AnimationGrid = memo((): ReactElement => {
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-9999">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="grid grid-cols-5 grid-rows-7 w-16 h-20 gap-1">
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                </div>
            </div>
        </div>
    );
});

AnimationGrid.displayName = 'AnimationGrid';

const Loader: FC = () => {
    const [show, setShow] = useState(true);
    const [opacity, setOpacity] = useState(1);
    const fadeOutTimerRef = useRef<NodeJS.Timeout | null>(null);
    const removeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Since this component will be rendered in a separate React root,
    // we can implement both document ready state detection and navigation-based showing/hiding
    useEffect(() => {
        // Handle initial page load - this will be when the page is fully loaded
        const handlePageInteractive = () => {
            // Start fade out transition after a delay to ensure content has time to render
            fadeOutTimerRef.current = setTimeout(() => {
                setOpacity(0);

                // Remove loader from DOM right after the transition completes (500ms)
                removeTimerRef.current = setTimeout(() => {
                    setShow(false);
                }, 500); // This matches the CSS transition duration
            }, 1000); // Slightly longer delay to ensure content is ready
        };

        const checkReadyState = () => {
            if (document.readyState === 'complete') {
                handlePageInteractive();
            }
        };

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            handlePageInteractive();
        } else {
            // Page is still loading, add event listener
            document.addEventListener('readystatechange', checkReadyState);

            // Also call checkReadyState to handle potential race conditions
            checkReadyState();
        }



        // Cleanup event listeners
        return () => {
            document.removeEventListener('readystatechange', checkReadyState);

            // Clear any pending timeouts to prevent state updates after unmounting
            if (fadeOutTimerRef.current) {
                clearTimeout(fadeOutTimerRef.current);
            }
            if (removeTimerRef.current) {
                clearTimeout(removeTimerRef.current);
            }
        };
    }, []);

    // Only render if the loader should be shown
    if (!show) {
        // Add a class to hide the container when loader is not shown
        setTimeout(() => {
            const container = document.getElementById('loader-root');
            if (container) {
                container.classList.add('hidden');
            }
        }, 0);
        return null;
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-500 z-9999"
            style={{ opacity }}
        >
            {/* Animation grid */}
            <AnimationGrid />
        </div>
    );
};

export default Loader;
