"use client"

import Link from "next/link"
import { useLocalization } from "./enhanced-localization-provider"
import { useLanguage } from "./language-provider"
import { Waves } from "lucide-react"

export function Footer() {
  const { t, isLoading } = useLocalization()
  const { currentLanguage, setLanguage, languages } = useLanguage()

  if (isLoading) {
    return (
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-18 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden">
  <img
    src="/logo.png" // replace with your image path or URL
    alt="Logo"
    className="h-full w-full object-cover"
  />
</div>

              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                SEA Bridge
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{t("footer.tagline", "Bridging cultures through education")}</p>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("footer.navigation", "Navigation")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-blue-600">
                  {t("nav.home", "Home")}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-sm text-gray-600 hover:text-blue-600">
                  {t("nav.courses", "Courses")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600">
                  {t("nav.about", "About")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("footer.legal", "Legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                  {t("footer.privacy", "Privacy Policy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                  {t("footer.terms", "Terms of Service")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t("footer.language", "Language")}</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang)}
                  className={`text-sm px-2 py-1 rounded transition-colors ${
                    currentLanguage.code === lang.code ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {lang.localName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} SEA Bridge. {t("footer.rights", "All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  )
}
