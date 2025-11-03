'use client';

import { useEffect } from 'react';
import { getStoredTheme } from '@/lib/theme-utils';

/**
 * Component that detects and applies the theme before React hydration
 * This helps prevent flash of incorrect theme (FOIT)
 */
export const ThemeDetector = () => {
    useEffect(() => {
        // Remove any existing theme classes to ensure clean state
        document.documentElement.classList.remove('dark', 'light');

        // Apply theme class immediately when component mounts
        const storedTheme = getStoredTheme();
        const themeToApply = storedTheme || 'dark';

        if (themeToApply === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark'); // 'light' is default with no class
        }
    }, []);

    return null; // This component doesn't render anything
};

export default ThemeDetector;
