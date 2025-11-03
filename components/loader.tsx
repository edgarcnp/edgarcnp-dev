'use client';

import { useEffect, useState } from 'react';

// AnimationGrid component to prevent re-rendering of animations
const AnimationGrid = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="grid grid-cols-5 grid-rows-7 w-16 h-20 gap-1">
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-100"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-100"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-100"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-300"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-300"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-400"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-500"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-700"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-400"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-800"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-500"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-600"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-breathing-stars animation-delay-700"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-900"></div>

                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-700"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-800"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-900"></div>
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-1000"></div>
                </div>
            </div>
        </div>
    );
};

const Loader = () => {
    const [show, setShow] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleDOMReady = () => {
            setTimeout(() => {
                // Start fade out transition
                setOpacity(0);

                // Remove loader from DOM after transition completes (500ms)
                setTimeout(() => {
                    setShow(false);
                }, 500);
            }, 500);
        };

        if (document.readyState === 'loading') {
            // DOM is still loading
            document.addEventListener('DOMContentLoaded', handleDOMReady);
        } else {
            // DOM is already ready
            handleDOMReady();
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener('DOMContentLoaded', handleDOMReady);
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
