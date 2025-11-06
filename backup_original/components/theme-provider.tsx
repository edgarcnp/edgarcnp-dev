'use client'

import type { FC } from 'react'
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from 'next-themes'

export const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
