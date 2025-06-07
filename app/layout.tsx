import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { CulturalContextProvider } from "@/components/cultural-context-provider"
import { EnhancedLocalizationProvider } from "@/components/enhanced-localization-provider"
import { AzureTranslateProvider } from "@/components/azure-translate-provider"
import { LanguageProvider } from "@/components/language-provider"
import { DirectTranslator } from "@/components/direct-translator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { SessionWrapper } from "@/components/session-wrapper" // ✅ import wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SEA Bridge - Culturally Adaptive Learning Platform",
  description:
    "Experience education that speaks your language, understands your culture, and adapts to your needs.",
 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SessionWrapper>
            <AuthProvider>
              <CulturalContextProvider>
                <EnhancedLocalizationProvider>
                  <AzureTranslateProvider>
                    <LanguageProvider>
                      <DirectTranslator />
                      <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                      </div>
                      <Toaster />
                    </LanguageProvider>
                  </AzureTranslateProvider>
                </EnhancedLocalizationProvider>
              </CulturalContextProvider>
            </AuthProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}


