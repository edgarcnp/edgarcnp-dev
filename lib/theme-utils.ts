import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface UseThemeDetectionReturn {
    isDark: boolean;
    mounted: boolean;
}

/**
 * Utility function to get the stored theme preference before hydration
 * This can be used to determine the theme before React components mount
 */
export const getStoredTheme = (): 'dark' | 'light' | null => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('edgarcnp-theme');
        if (storedTheme) {
            return storedTheme as 'dark' | 'light';
        }
        // If no stored theme, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
    }
    return null; // Will fallback to default
};

/**
 * Custom hook for theme detection
 * Provides consistent theme detection across the application
 */
export const useThemeDetection = (defaultTheme: 'dark' | 'light' = 'dark'): UseThemeDetectionReturn => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Initialize with stored theme or default to avoid flash
    const [isDark, setIsDark] = useState(() => {
        const storedTheme = getStoredTheme();
        return storedTheme ? storedTheme === 'dark' : defaultTheme === 'dark';
    });

    useEffect(() => {
        setMounted(true);
        // Determine if dark theme is active, with fallback to default
        const currentIsDark = resolvedTheme ? (resolvedTheme === 'dark') : (getStoredTheme() || defaultTheme) === 'dark';
        setIsDark(currentIsDark);
    }, [resolvedTheme, defaultTheme]);

    return { isDark, mounted };
};
