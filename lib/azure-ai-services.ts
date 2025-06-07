// lib/azure-ai-services.ts

// Replace with your actual Azure OpenAI and Vision API keys and endpoints
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY || ""
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT || ""
const AZURE_OPENAI_DEPLOYMENT_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || ""

const AZURE_VISION_ENDPOINT = process.env.AZURE_VISION_ENDPOINT || ""
const AZURE_VISION_API_KEY = process.env.AZURE_VISION_API_KEY || ""

const azureOpenAI = {
  // Generate culturally relevant content
  generateCulturalContent: async (prompt: string, culturalContext: any) => {
    try {
      const response = await fetch(
        `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": AZURE_OPENAI_API_KEY,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You are a culturally-aware educational content generator. Create content that is authentic to ${culturalContext.country} culture, appropriate for ${culturalContext.ageGroup} learners, and uses ${culturalContext.formalityPreference} tone. Include local references, cultural elements, and region-specific examples.`,
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Azure OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || "Content generation failed"
    } catch (error) {
      console.error("Error generating cultural content:", error)
      throw error
    }
  },

  // Generate personalized feedback
  generatePersonalizedFeedback: async (userAnswer: string, correctAnswer: string, culturalContext: any) => {
    try {
      const response = await fetch(
        `${AZURE_OPENAI_ENDPOINT}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=2024-02-15-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": AZURE_OPENAI_API_KEY,
          },
          body: JSON.stringify({
            messages: [
              {
                role: "system",
                content: `You are a culturally-sensitive educational feedback system for ${culturalContext.country}. Provide encouraging, culturally appropriate feedback using ${culturalContext.formalityPreference} tone. Include cultural encouragement phrases and be supportive.`,
              },
              {
                role: "user",
                content: `User answered: "${userAnswer}". Correct answer: "${correctAnswer}". Provide culturally appropriate feedback.`,
              },
            ],
            max_tokens: 200,
            temperature: 0.6,
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Azure OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || "Feedback generation failed"
    } catch (error) {
      console.error("Error generating personalized feedback:", error)
      throw error
    }
  },
}

const azureVision = {
  analyzeImage: async (imageUrl: string) => {
    try {
      const response = await fetch(
        `${AZURE_VISION_ENDPOINT}/computervision/imageanalysis:analyze?api-version=2023-10-01&features=Caption,Read,Tags,Objects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": AZURE_VISION_API_KEY,
          },
          body: JSON.stringify({ url: imageUrl }),
        },
      )

      if (!response.ok) {
        throw new Error(`Azure Vision API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error analyzing image:", error)
      throw error
    }
  },

  // Find cultural replacement for images
  findCulturalReplacement: async (imageAnalysis: any, culturalContext: any) => {
    try {
      // This would typically connect to a cultural image database
      // For now, we'll return a placeholder that represents cultural adaptation
      const culturalImages: Record<string, Record<string, string>> = {
        ph: {
          house: "/images/cultural/ph-bahay-kubo.jpg",
          food: "/images/cultural/ph-adobo.jpg",
          transportation: "/images/cultural/ph-jeepney.jpg",
          nature: "/images/cultural/ph-rice-terraces.jpg",
        },
        vn: {
          house: "/images/cultural/vn-traditional-house.jpg",
          food: "/images/cultural/vn-pho.jpg",
          transportation: "/images/cultural/vn-motorbike.jpg",
          nature: "/images/cultural/vn-halong-bay.jpg",
        },
        th: {
          house: "/images/cultural/th-traditional-house.jpg",
          food: "/images/cultural/th-pad-thai.jpg",
          transportation: "/images/cultural/th-tuk-tuk.jpg",
          nature: "/images/cultural/th-temple.jpg",
        },
        id: {
          house: "/images/cultural/id-traditional-house.jpg",
          food: "/images/cultural/id-nasi-gudeg.jpg",
          transportation: "/images/cultural/id-becak.jpg",
          nature: "/images/cultural/id-borobudur.jpg",
        },
      }

      // Extract main subject from image analysis
      const mainSubject = imageAnalysis.description?.captions[0]?.text?.toLowerCase() || ""
      const tags = imageAnalysis.tags?.map((tag: any) => tag.name.toLowerCase()) || []

      // Find matching cultural image
      const countryImages = culturalImages[culturalContext.country.toLowerCase()] || {}

      for (const [category, imageUrl] of Object.entries(countryImages)) {
        if (mainSubject.includes(category) || tags.some((tag) => tag.includes(category))) {
          return imageUrl
        }
      }

      return null // No cultural replacement found
    } catch (error) {
      console.error("Error finding cultural replacement:", error)
      return null
    }
  },
}

const azureLanguage = {
  detectLanguage: async (text: string) => {
    try {
      const response = await fetch(
        `${process.env.AZURE_LANGUAGE_ENDPOINT || ""}/language/:analyze-text?api-version=2022-05-01`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.AZURE_LANGUAGE_KEY || "",
          },
          body: JSON.stringify({
            kind: "LanguageDetection",
            parameters: {
              modelVersion: "latest",
            },
            analysisInput: {
              documents: [
                {
                  id: "1",
                  text: text,
                },
              ],
            },
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Azure Language API error: ${response.status}`)
      }

      const data = await response.json()
      return data.results?.documents?.[0]?.detectedLanguage?.iso6391Name || "en"
    } catch (error) {
      console.error("Error detecting language:", error)
      return "en" // fallback to English
    }
  },
}

const azureTranslator = {
  translateText: async (text: string, fromLang: string, toLang: string) => {
    try {
      const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || ""
      const key = process.env.AZURE_TRANSLATOR_KEY || ""
      const region = process.env.AZURE_TRANSLATOR_REGION || ""

      let url = endpoint
      if (!url.endsWith("/")) url += "/"
      url += `translator/text/v3.0/translate?api-version=3.0&from=${fromLang}&to=${toLang}`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": region,
        },
        body: JSON.stringify([{ text }]),
      })

      if (!response.ok) {
        throw new Error(`Azure Translator API error: ${response.status}`)
      }

      const data = await response.json()
      return data[0]?.translations?.[0]?.text || text
    } catch (error) {
      console.error("Error translating text:", error)
      return text // fallback to original text
    }
  },
}

export { azureOpenAI, azureVision, azureLanguage, azureTranslator }
