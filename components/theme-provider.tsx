"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const prevTheme = React.useRef<string | undefined>(undefined);
  const isInitialMount = React.useRef(true);

  // Add transition class as soon as possible when theme changes
  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevTheme.current = theme;
      return;
    }

    const handleThemeChange = () => {
      // Add transition class immediately when theme changes
      document.documentElement.classList.add('theme-transitioning');
      setIsTransitioning(true);

      // Remove transition class after animation completes
      const timer = setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 1200);

      return timer;
    };

    if (theme !== prevTheme.current) {
      const timer = handleThemeChange();
      prevTheme.current = theme;
      
      return () => {
        clearTimeout(timer);
        document.documentElement.classList.remove('theme-transitioning');
      };
    }
  }, [theme]);

  return children;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" {...props}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </NextThemesProvider>
  );
}
