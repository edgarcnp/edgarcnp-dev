import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Loader from "@/components/loader"
import "./globals.css"

const geist = Geist({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geist",
})

export const metadata: Metadata = {
    title: "edgarcnp.dev",
    description: "Personal Website of Edgar Christian",
    generator: "Next.js",
    icons: {
        icon: "/e-icon.ico",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={geist.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className="font-sans antialiased" suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange={false}
                    storageKey="edgarcnp-theme"
                >
                    <Loader />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
