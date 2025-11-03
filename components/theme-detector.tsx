'use client';

import { useEffect } from 'react';
import { getStoredTheme } from '@/lib/theme-utils';

/**
 * Component that detects and applies the theme before React hydration
 * This helps prevent flash of incorrect theme (FOIT)
 */
export const ThemeDetector = () => {
    useEffect(() => {
        // Apply theme class immediately when component mounts
        const storedTheme = getStoredTheme() || 'dark';

        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return null; // This component doesn't render anything
};

export default ThemeDetector;
