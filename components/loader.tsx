'use client';

import type { ReactElement, FC } from 'react';
import { useEffect, useState, memo, useRef } from 'react';

// AnimationGrid component to prevent re-rendering of animations
const AnimationGrid = memo((): ReactElement => {
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
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

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing 300"></div>
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

    useEffect(() => {
        const handlePageInteractive = () => {
            // Start fade out transition after a delay
            fadeOutTimerRef.current = setTimeout(() => {
                setOpacity(0);

                // Remove loader from DOM after transition completes (500ms)
                removeTimerRef.current = setTimeout(() => {
                    setShow(false);
                }, 500);
            }, 500);
        };

        const checkReadyState = () => {
            if (document.readyState === 'complete') {
                handlePageInteractive();
            }
        };

        if (document.readyState === 'loading') {
            // Page is still loading, add event listener
            document.addEventListener('readystatechange', checkReadyState);
        } else {
            // Page is already interactive or complete
            handlePageInteractive();
        }

        // Cleanup event listener
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

    if (!show) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background transition-opacity duration-300"
            style={{ opacity }}
        >
            {/* Animation grid */}
            <AnimationGrid />
        </div>
    );
};

export default Loader;
