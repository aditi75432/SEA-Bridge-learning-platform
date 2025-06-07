import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, toLang, fromLang = "en" } = await request.json()

    // Skip translation if target language is English or text is empty
    if (toLang === "en" || !text || text.trim() === "") {
      return NextResponse.json({ translatedText: text })
    }

    console.log(`Translating "${text}" from ${fromLang} to ${toLang}`)

    // Use Azure Translator Service
    const subscriptionKey =
      process.env.AZURE_TRANSLATOR_KEY ||
      "AKEVjpmufNpSk79HsbmqIAFeRxAWOQeBsQGyA0X3nXR2c0xHB5OWJQQJ99BFACHYHv6XJ3w3AAAbACOGaNfa"
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || "https://Translate77.cognitiveservices.azure.com/"
    const region = process.env.AZURE_TRANSLATOR_REGION || "eastus2"

    if (!subscriptionKey || !endpoint) {
      console.error("Azure Translator credentials missing")
      return NextResponse.json({ translatedText: getMockTranslation(text, toLang) })
    }

    // Construct the Azure Translator URL - FIXED URL FORMAT
    // The correct format is: https://<NAME>.cognitiveservices.azure.com/translator/text/v3.0/translate
    let url = endpoint
    if (!url.endsWith("/")) url += "/"
    url += `translator/text/v3.0/translate?api-version=3.0&from=${fromLang}&to=${toLang}`

    console.log(`Using Azure Translator URL: ${url}`)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
          "Ocp-Apim-Subscription-Region": region,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ text: text.trim() }]),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`Azure Translator API error: ${response.status} ${response.statusText}`, errorText)

        // Log more details about the request
        console.log("Request details:", {
          url,
          subscriptionKey: subscriptionKey ? "PROVIDED" : "MISSING",
          region,
          text: text.trim(),
        })

        return NextResponse.json({ translatedText: getMockTranslation(text, toLang) })
      }

      const data = await response.json()
      const translatedText = data[0]?.translations[0]?.text || text
      console.log(`Translation successful: "${text}" -> "${translatedText}"`)
      return NextResponse.json({ translatedText })
    } catch (error) {
      console.error("Azure Translator API error:", error)
      return NextResponse.json({ translatedText: getMockTranslation(text, toLang) })
    }
  } catch (error) {
    console.error("Translation error:", error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}

// Mock translations for fallback
function getMockTranslation(text: string, toLang: string): string {
  const mockTranslations: Record<string, Record<string, string>> = {
    fil: {
      Welcome: "Maligayang pagdating",
      Home: "Tahanan",
      About: "Tungkol",
      Courses: "Mga Kurso",
      Settings: "Mga Setting",
      Dashboard: "Dashboard",
      "Sign In": "Mag-sign In",
      "Sign Up": "Mag-sign Up",
      Learn: "Matuto",
      Explore: "Tuklasin",
      Features: "Mga Feature",
      "Get Started": "Magsimula",
      Contact: "Makipag-ugnayan",
      Privacy: "Privacy",
      Terms: "Mga Tuntunin",
      Help: "Tulong",
      Support: "Suporta",
      "AI-Powered Learning Platform": "AI-Powered na Platform ng Pag-aaral",
      "Learn languages with cutting-edge AI technology": "Matuto ng mga wika gamit ang pinakabagong AI technology",
    },
    th: {
      Welcome: "ยินดีต้อนรับ",
      Home: "หน้าแรก",
      About: "เกี่ยวกับ",
      Courses: "หลักสูตร",
      Settings: "การตั้งค่า",
      Dashboard: "แดชบอร์ด",
      "Sign In": "เข้าสู่ระบบ",
      "Sign Up": "สมัครสมาชิก",
      Learn: "เรียนรู้",
      Explore: "สำรวจ",
      Features: "คุณสมบัติ",
      "Get Started": "เริ่มต้น",
      Contact: "ติดต่อ",
      Privacy: "ความเป็นส่วนตัว",
      Terms: "เงื่อนไข",
      Help: "ช่วยเหลือ",
      Support: "สนับสนุน",
      "AI-Powered Learning Platform": "แพลตฟอร์มการเรียนรู้ที่ขับเคลื่อนด้วย AI",
      "Learn languages with cutting-edge AI technology": "เรียนรู้ภาษาด้วยเทคโนโลยี AI ที่ทันสมัย",
    },
    vi: {
      Welcome: "Chào mừng",
      Home: "Trang chủ",
      About: "Giới thiệu",
      Courses: "Khóa học",
      Settings: "Cài đặt",
      Dashboard: "Bảng điều khiển",
      "Sign In": "Đăng nhập",
      "Sign Up": "Đăng ký",
      Learn: "Học tập",
      Explore: "Khám phá",
      Features: "Tính năng",
      "Get Started": "Bắt đầu",
      Contact: "Liên hệ",
      Privacy: "Riêng tư",
      Terms: "Điều khoản",
      Help: "Trợ giúp",
      Support: "Hỗ trợ",
      "AI-Powered Learning Platform": "Nền tảng học tập được hỗ trợ bởi AI",
      "Learn languages with cutting-edge AI technology": "Học ngôn ngữ với công nghệ AI tiên tiến",
    },
    id: {
      Welcome: "Selamat datang",
      Home: "Beranda",
      About: "Tentang",
      Courses: "Kursus",
      Settings: "Pengaturan",
      Dashboard: "Dasbor",
      "Sign In": "Masuk",
      "Sign Up": "Daftar",
      Learn: "Belajar",
      Explore: "Jelajahi",
      Features: "Fitur",
      "Get Started": "Mulai",
      Contact: "Kontak",
      Privacy: "Privasi",
      Terms: "Syarat",
      Help: "Bantuan",
      Support: "Dukungan",
      "AI-Powered Learning Platform": "Platform Pembelajaran Bertenaga AI",
      "Learn languages with cutting-edge AI technology": "Pelajari bahasa dengan teknologi AI terdepan",
    },
  }

  return mockTranslations[toLang]?.[text] || text
}
