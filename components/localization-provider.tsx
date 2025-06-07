"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useLanguage } from "./language-provider"

// Complete translations with all required keys
const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      courses: "Courses",
      about: "About",
      signin: "Sign In",
      signup: "Sign Up",
    },
    // Hero section
    hero: {
      badge: "AI-Powered Learning",
      title: "SEA Learn Built for Me",
      subtitle: "Localized. Personalized. Empowered Learning.",
      description:
        "Experience education that speaks your language, understands your culture, and adapts to your needs. Join thousands of learners across Southeast Asia.",
      startLearning: "Start Learning",
      chooseLanguage: "Choose My Language",
      greeting: "Welcome to your learning journey!",
    },
    // Features
    features: {
      title: "Learning that feels like home",
      subtitle: "Designed for the diverse cultures and needs of Southeast Asia",
      language: {
        title: "Learn in your own language",
        description: "Content translated and adapted to your native language and cultural context",
      },
      connection: {
        title: "Fits 2G to 5G connections",
        description: "Automatically adapts content format based on your connection speed",
      },
      cultural: {
        title: "Cultural examples and stories",
        description: "Learn with examples that reflect your local culture and experiences",
      },
      offline: {
        title: "Offline Mode Ready",
        description: "Download lessons to learn anytime, even without an internet connection",
      },
      ai: {
        title: "AI-Powered Personalization",
        description: "Smart recommendations based on your learning style and cultural background",
      },
      feedback: {
        title: "Culturally Sensitive Feedback",
        description: "Encouragement and guidance that respects your cultural communication style",
      },
    },
    // Footer
    footer: {
      tagline: "Empowering learners across Southeast Asia",
      navigation: "Navigation",
      legal: "Legal",
      language: "Language",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
    // Common
    welcome: "Welcome to SEA Bridge",
    tagline: "Localized. Personalized. Empowered Learning.",
    startLearning: "Start Learning",
    chooseLanguage: "Choose My Language",
  },
  fil: {
    nav: {
      home: "Tahanan",
      courses: "Mga Kurso",
      about: "Tungkol",
      signin: "Mag-sign In",
      signup: "Mag-sign Up",
    },
    hero: {
      badge: "AI-Powered na Pag-aaral",
      title: "SEA Learn Ginawa para sa Akin",
      subtitle: "Lokal. Personal. Pinagsasanay na Pag-aaral.",
      description:
        "Maranasan ang edukasyon na nagsasalita ng inyong wika, nakakaintindi sa inyong kultura, at umaangkop sa inyong pangangailangan.",
      startLearning: "Simulan ang Pag-aaral",
      chooseLanguage: "Piliin ang Aking Wika",
      greeting: "Maligayang pagdating sa inyong learning journey!",
    },
    features: {
      title: "Pag-aaral na parang nasa bahay",
      subtitle: "Dinisenyo para sa iba't ibang kultura at pangangailangan ng Southeast Asia",
      language: {
        title: "Matuto sa sarili mong wika",
        description: "Nilalaman na isinalin at inangkop sa inyong katutubong wika at kontekstong kultural",
      },
      connection: {
        title: "Angkop sa 2G hanggang 5G",
        description: "Awtomatikong umaangkop ang format ng nilalaman base sa bilis ng inyong koneksyon",
      },
      cultural: {
        title: "Mga halimbawa at kwentong kultural",
        description: "Matuto gamit ang mga halimbawang sumasalamin sa inyong lokal na kultura",
      },
      offline: {
        title: "Handa sa Offline Mode",
        description: "I-download ang mga aralin para matuto kahit kailan, kahit walang internet",
      },
      ai: {
        title: "AI-Powered na Personalization",
        description: "Matalinong mga rekomendasyon base sa inyong paraan ng pag-aaral",
      },
      feedback: {
        title: "Kulturally Sensitive na Feedback",
        description: "Pagsuporta na gumagalang sa inyong paraan ng komunikasyon",
      },
    },
    footer: {
      tagline: "Pagbibigay-lakas sa mga mag-aaral sa buong Southeast Asia",
      navigation: "Navigation",
      legal: "Legal",
      language: "Wika",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "Lahat ng karapatan ay nakalaan.",
    },
    welcome: "Maligayang pagdating sa SEA Bridge",
    tagline: "Lokal. Personal. Pinagsasanay na Pag-aaral.",
    startLearning: "Simulan ang Pag-aaral",
    chooseLanguage: "Piliin ang Aking Wika",
  },
  vi: {
    nav: {
      home: "Trang chủ",
      courses: "Khóa học",
      about: "Giới thiệu",
      signin: "Đăng nhập",
      signup: "Đăng ký",
    },
    hero: {
      badge: "Học tập được hỗ trợ bởi AI",
      title: "SEA Learn Được xây dựng cho tôi",
      subtitle: "Bản địa hóa. Cá nhân hóa. Học tập được trao quyền.",
      description: "Trải nghiệm giáo dục nói ngôn ngữ của bạn, hiểu văn hóa của bạn và thích ứng với nhu cầu của bạn.",
      startLearning: "Bắt đầu học",
      chooseLanguage: "Chọn ngôn ngữ của tôi",
      greeting: "Chào mừng bạn đến với hành trình học tập!",
    },
    features: {
      title: "Học tập như ở nhà",
      subtitle: "Được thiết kế cho các nền văn hóa và nhu cầu đa dạng của Đông Nam Á",
      language: {
        title: "Học bằng ngôn ngữ của bạn",
        description: "Nội dung được dịch và thích ứng với ngôn ngữ mẹ đẻ và bối cảnh văn hóa của bạn",
      },
      connection: {
        title: "Phù hợp từ 2G đến 5G",
        description: "Tự động điều chỉnh định dạng nội dung dựa trên tốc độ kết nối của bạn",
      },
      cultural: {
        title: "Ví dụ và câu chuyện văn hóa",
        description: "Học với các ví dụ phản ánh văn hóa và trải nghiệm địa phương của bạn",
      },
      offline: {
        title: "Sẵn sàng chế độ ngoại tuyến",
        description: "Tải xuống bài học để học mọi lúc, ngay cả khi không có kết nối internet",
      },
      ai: {
        title: "Cá nhân hóa được hỗ trợ bởi AI",
        description: "Đề xuất thông minh dựa trên phong cách học tập và nền tảng văn hóa của bạn",
      },
      feedback: {
        title: "Phản hồi nhạy cảm về văn hóa",
        description: "Khuyến khích và hướng dẫn tôn trọng phong cách giao tiếp văn hóa của bạn",
      },
    },
    footer: {
      tagline: "Trao quyền cho người học trên khắp Đông Nam Á",
      navigation: "Điều hướng",
      legal: "Pháp lý",
      language: "Ngôn ngữ",
      privacy: "Chính sách bảo mật",
      terms: "Điều khoản dịch vụ",
      rights: "Tất cả quyền được bảo lưu.",
    },
    welcome: "Chào mừng đến với SEA Bridge",
    tagline: "Bản địa hóa. Cá nhân hóa. Học tập được trao quyền.",
    startLearning: "Bắt đầu học",
    chooseLanguage: "Chọn ngôn ngữ của tôi",
  },
}

type LocalizationContextType = {
  t: (key: string, params?: Record<string, string>) => string
  isLoaded: boolean
}

const LocalizationContext = createContext<LocalizationContextType>({
  t: (key) => key,
  isLoaded: false,
})

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const { currentLanguage } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay to ensure proper loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [currentLanguage])

  const t = (key: string, params?: Record<string, string>) => {
    if (!isLoaded) return ""

    const keys = key.split(".")
    let value: any = translations[currentLanguage.code as keyof typeof translations] || translations.en

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        let fallback = translations.en
        for (const k of keys) {
          if (fallback && typeof fallback === "object" && k in fallback) {
            fallback = fallback[k]
          } else {
            console.warn(`Translation key not found: ${key}`)
            return key // Return the key if not found in fallback
          }
        }
        value = fallback
        break
      }
    }

    // Replace parameters if any
    if (params && typeof value === "string") {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        value = value.replace(`{{${paramKey}}}`, paramValue)
      })
    }

    return typeof value === "string" ? value : key
  }

  return <LocalizationContext.Provider value={{ t, isLoaded }}>{children}</LocalizationContext.Provider>
}

export const useLocalization = () => useContext(LocalizationContext)
