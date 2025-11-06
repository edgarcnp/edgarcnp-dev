import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

type ThemeType = 'dark' | 'light';

interface UseThemeDetectionReturn {
    isDark: boolean;
    mounted: boolean;
}

/**
 * Utility function to get the stored theme preference before hydration
 * This can be used to determine the theme before React components mount
 */
export const getStoredTheme = (): ThemeType | null => {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('edgarcnp-theme');
        if (storedTheme) {
            const theme = storedTheme as ThemeType;
            return theme === 'dark' || theme === 'light' ? theme : null;
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
 * Ensures hydration safety by initializing with consistent server/client state
 */
export const useThemeDetection = (defaultTheme: ThemeType = 'dark'): UseThemeDetectionReturn => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Initialize to default theme on server, will be updated after mount
    // This prevents hydration mismatches by ensuring consistent initial state
    const [isDark, setIsDark] = useState(() => defaultTheme === 'dark');

    useEffect(() => {
        setMounted(true);
        // After mounting, determine actual theme based on resolved theme, stored theme, or default
        const themeToCheck = resolvedTheme || getStoredTheme() || defaultTheme;
        const currentIsDark = themeToCheck === 'dark';
        setIsDark(currentIsDark);
    }, [resolvedTheme, defaultTheme]);

    return { isDark, mounted };
};
