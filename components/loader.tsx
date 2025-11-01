'use client';

import { useEffect, useState } from 'react';

const Loader = () => {
    const [loadingText, setLoadingText] = useState('Loading');
    const [show, setShow] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const handleDOMReady = () => {
            setTimeout(() => {
                setLoadingText('Ready');

                setTimeout(() => {
                    // Start fade out transition
                    setOpacity(0);

                    // Remove loader from DOM after transition completes (300ms)
                    setTimeout(() => {
                        setShow(false);
                    }, 300);
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
            {/* Fixed-position grid that never moves */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="grid grid-cols-5 grid-rows-7 w-10 h-14 gap-0.5">
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-100"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-200"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-100"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-100"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-200"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-300"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-200"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-200"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-300"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-300"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-400"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-500"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-700"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-400"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-400"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-800"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-500"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-500"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-600"></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-breathing-stars animation-delay-700"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-900"></div>

                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-600"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-700"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-800"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-900"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full animate-subtle-breathing animation-delay-1000"></div>
                    </div>
                </div>
            </div>

            {/* Separate flex container for text that doesn't affect grid */}
            <div className="flex flex-col items-center pointer-events-auto">
                <div className="h-40 flex items-end justify-center"> {/* Spacer to push text below fixed grid */}
                    <div className="flex flex-col items-center">
                        <p className="text-xl font-medium text-foreground tracking-wide w-20 text-center">
                            {loadingText}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground h-4 flex items-center justify-center">
                            {loadingText === 'Loading' ? 'Preparing your experience.' : 'Almost there.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
