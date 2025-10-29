import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface UseThemeDetectionReturn {
    isDark: boolean;
    mounted: boolean;
}

/**
 * Custom hook for theme detection
 * Provides consistent theme detection across the application
 */
export const useThemeDetection = (defaultTheme: 'dark' | 'light' = 'dark'): UseThemeDetectionReturn => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Determine if dark theme is active, with fallback to default
        const currentIsDark = mounted && resolvedTheme ? (resolvedTheme === 'dark') : (defaultTheme === 'dark');
        setIsDark(currentIsDark);
    }, [resolvedTheme, mounted, defaultTheme]);

    return { isDark, mounted };
};
