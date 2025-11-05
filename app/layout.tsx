import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import LoaderContainer from "./loader-container"
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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                          (function() {
                            try {
                              // Get the stored theme from localStorage
                              const storedTheme = localStorage.getItem('edgarcnp-theme');

                              if (storedTheme === 'dark') {
                                // If dark theme is stored, immediately add the dark class to the html element
                                document.documentElement.classList.add('dark');
                              } else if (storedTheme === 'light') {
                                // If light theme is stored, ensure dark class is removed
                                document.documentElement.classList.remove('dark');
                              } else {
                                // If no theme is stored, check system preference
                                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                                  document.documentElement.classList.add('dark');
                                } else {
                                  document.documentElement.classList.remove('dark');
                                }
                              }
                            } catch (e) {
                              // If there's an error (e.g., localStorage not available), default to dark
                              document.documentElement.classList.add('dark');
                            }
                          })();

                          // Immediately create and show the loader container for immediate display
                          const loaderContainer = document.createElement('div');
                          loaderContainer.id = 'loader-root';
                          document.body.appendChild(loaderContainer);

                          // Add initial loader styling to make it visible immediately
                          const loaderStyle = document.createElement('style');
                          loaderStyle.textContent = \`
                            #loader-root {
                              position: fixed;
                              top: 0;
                              left: 0;
                              width: 100%;
                              height: 100%;
                              display: flex;
                              align-items: center;
                              justify-content: center;
                              background-color: var(--background, white);
                              z-index: 9999;
                              opacity: 1;
                              transition: opacity 0.5s ease;
                            }
                            #loader-root.hidden {
                              opacity: 0;
                              pointer-events: none;
                            }
                          \`;
                          document.head.appendChild(loaderStyle);
                        `
                    }}
                />
                <LoaderContainer />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange={false}
                    storageKey="edgarcnp-theme"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
