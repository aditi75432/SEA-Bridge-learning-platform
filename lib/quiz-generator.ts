export interface GeneratedQuestion {
  id: number
  courseId: number
  questionText: string
  questionType: "multiple_choice" | "true_false" | "fill_in_blank"
  correctAnswer: string
  options: string[]
  explanation: string
  culturalContext: string
  difficultyLevel: "beginner" | "intermediate" | "advanced"
  topic: string
}

export class QuizGenerator {
  // Database of question templates by topic
  private static questionTemplates = {
    "water-cycle": [
      {
        template: "What is the main process that moves water from oceans to the atmosphere?",
        options: ["Evaporation", "Condensation", "Precipitation", "Collection"],
        correctAnswer: "Evaporation",
        explanation:
          "Evaporation is when the sun heats water in oceans, rivers, and lakes, turning it into water vapor that rises into the atmosphere.",
      },
      {
        template: "Which of these is NOT a part of the water cycle?",
        options: ["Photosynthesis", "Evaporation", "Condensation", "Precipitation"],
        correctAnswer: "Photosynthesis",
        explanation:
          "Photosynthesis is a process used by plants to convert light energy into chemical energy, not a part of the water cycle.",
      },
      {
        template: "What happens during condensation in the water cycle?",
        options: [
          "Water vapor cools and forms clouds",
          "Water falls from clouds to the ground",
          "Water seeps into the ground",
          "Water evaporates from the ocean",
        ],
        correctAnswer: "Water vapor cools and forms clouds",
        explanation:
          "Condensation occurs when water vapor in the air cools down and changes back into liquid water, forming clouds.",
      },
      {
        template: "Which human activity can affect the water cycle?",
        options: ["Deforestation", "Reading books", "Playing musical instruments", "Watching television"],
        correctAnswer: "Deforestation",
        explanation:
          "Deforestation reduces the amount of water vapor released into the atmosphere through transpiration, affecting the water cycle.",
      },
      {
        template: "What is the process called when plants release water vapor into the air?",
        options: ["Transpiration", "Respiration", "Photosynthesis", "Germination"],
        correctAnswer: "Transpiration",
        explanation:
          "Transpiration is the process where plants absorb water through their roots and release water vapor through small pores on the underside of their leaves.",
      },
    ],
    "sea-history": [
      {
        template: "Which ancient kingdom was known for its advanced water management systems?",
        options: ["Angkor", "Majapahit", "Srivijaya", "Ayutthaya"],
        correctAnswer: "Angkor",
        explanation:
          "The Angkor civilization built sophisticated irrigation systems and reservoirs that supported their massive temple complexes.",
      },
      {
        template: "Which Southeast Asian country was never colonized by European powers?",
        options: ["Thailand", "Vietnam", "Indonesia", "Philippines"],
        correctAnswer: "Thailand",
        explanation:
          "Thailand (formerly Siam) is the only Southeast Asian nation that was never colonized by European powers, maintaining its independence through diplomatic relations.",
      },
      {
        template: "The Spice Islands, famous for their nutmeg and cloves, are now part of which country?",
        options: ["Indonesia", "Malaysia", "Philippines", "Brunei"],
        correctAnswer: "Indonesia",
        explanation:
          "The Spice Islands, also known as the Maluku Islands, are part of Indonesia. They were highly sought after by European powers for their valuable spices.",
      },
      {
        template: "Which empire controlled much of maritime Southeast Asia in the 7th-13th centuries?",
        options: ["Srivijaya", "Khmer", "Pagan", "Champa"],
        correctAnswer: "Srivijaya",
        explanation:
          "The Srivijaya Empire was a maritime power that controlled much of maritime Southeast Asia, including parts of modern Indonesia, Malaysia, and southern Thailand.",
      },
      {
        template: "What was the significance of the Manila Galleon trade?",
        options: [
          "It connected Asia to the Americas through trade",
          "It was the first submarine route",
          "It was a military alliance",
          "It was a religious pilgrimage route",
        ],
        correctAnswer: "It connected Asia to the Americas through trade",
        explanation:
          "The Manila Galleon trade route connected the Philippines (under Spanish control) with Mexico, facilitating the exchange of silver, silk, spices, and other goods between Asia and the Americas.",
      },
    ],
    "sea-culture": [
      {
        template:
          "Which traditional Filipino irrigation system demonstrates community cooperation in water management?",
        options: ["Zanjera", "Bayanihan", "Sari-sari", "Jeepney"],
        correctAnswer: "Zanjera",
        explanation:
          "Zanjera is a traditional Filipino irrigation system that shows community cooperation in water management.",
      },
      {
        template: "What is 'batik' in Southeast Asian culture?",
        options: [
          "A traditional textile art using wax-resist dyeing",
          "A type of traditional boat",
          "A harvest festival",
          "A martial art form",
        ],
        correctAnswer: "A traditional textile art using wax-resist dyeing",
        explanation:
          "Batik is a technique of wax-resist dyeing applied to cloth, creating intricate patterns. It's particularly associated with Indonesia but is found throughout Southeast Asia.",
      },
      {
        template: "Which Southeast Asian country is known for its water festival called 'Songkran'?",
        options: ["Thailand", "Vietnam", "Malaysia", "Cambodia"],
        correctAnswer: "Thailand",
        explanation:
          "Songkran is Thailand's famous water festival that marks the Thai New Year. It involves water fights and the ceremonial washing of Buddha images.",
      },
      {
        template: "What is the significance of water in traditional Southeast Asian house designs?",
        options: [
          "Houses are often built on stilts to protect from flooding",
          "Water is never used in construction",
          "Houses are designed to collect rainwater only",
          "Traditional houses never face bodies of water",
        ],
        correctAnswer: "Houses are often built on stilts to protect from flooding",
        explanation:
          "Many traditional Southeast Asian houses are built on stilts, which helps protect them from flooding during monsoon seasons and provides ventilation in hot climates.",
      },
      {
        template: "Which traditional boat race festival is celebrated in Cambodia?",
        options: ["Bon Om Touk", "Regatta", "Dragon Boat Festival", "Loy Krathong"],
        correctAnswer: "Bon Om Touk",
        explanation:
          "Bon Om Touk, or the Water Festival, features boat races on the Tonle Sap River and celebrates the reversal of the Tonle Sap River's flow.",
      },
    ],
    "sea-geography": [
      {
        template: "Which is the largest island in Southeast Asia?",
        options: ["Borneo", "Java", "Sumatra", "Luzon"],
        correctAnswer: "Borneo",
        explanation:
          "Borneo is the third-largest island in the world and the largest in Asia. It is divided among three countries: Indonesia, Malaysia, and Brunei.",
      },
      {
        template: "The Mekong River flows through how many Southeast Asian countries?",
        options: ["6", "3", "4", "5"],
        correctAnswer: "6",
        explanation:
          "The Mekong River flows through six countries: China, Myanmar, Laos, Thailand, Cambodia, and Vietnam before emptying into the South China Sea.",
      },
      {
        template: "Which Southeast Asian country consists of more than 17,000 islands?",
        options: ["Indonesia", "Philippines", "Malaysia", "Vietnam"],
        correctAnswer: "Indonesia",
        explanation:
          "Indonesia is the world's largest archipelagic state, comprising approximately 17,508 islands, of which about 6,000 are inhabited.",
      },
      {
        template: "What is the highest mountain in Southeast Asia?",
        options: ["Hkakabo Razi", "Mount Kinabalu", "Fansipan", "Puncak Jaya"],
        correctAnswer: "Hkakabo Razi",
        explanation:
          "Hkakabo Razi in Myanmar is the highest mountain in Southeast Asia, standing at 5,881 meters (19,295 feet) above sea level.",
      },
      {
        template: "Which strait connects the South China Sea to the Indian Ocean?",
        options: ["Strait of Malacca", "Sunda Strait", "Lombok Strait", "Makassar Strait"],
        correctAnswer: "Strait of Malacca",
        explanation:
          "The Strait of Malacca is a narrow stretch of water between the Malay Peninsula and Sumatra, connecting the South China Sea to the Indian Ocean. It's one of the most important shipping lanes in the world.",
      },
    ],
  }

  // Cultural context examples by country
  private static culturalContexts: Record<string, Record<string, string[]>> = {
    philippines: {
      "water-cycle": ["rice terraces", "typhoon season", "Pasig River", "Manila Bay"],
      "sea-history": ["galleon trade", "Magellan's arrival", "Spanish colonial era", "Moro resistance"],
      "sea-culture": ["bayanihan spirit", "fiesta celebrations", "Filipino hospitality", "family values"],
      "sea-geography": ["archipelago", "Sierra Madre mountains", "Taal volcano", "Chocolate Hills"],
    },
    vietnam: {
      "water-cycle": ["Mekong Delta", "rice paddies", "monsoon season", "floating markets"],
      "sea-history": ["Trung Sisters", "Chinese occupation", "French colonization", "American War"],
      "sea-culture": ["water puppetry", "ao dai", "Vietnamese cuisine", "family altar"],
      "sea-geography": ["Ha Long Bay", "Red River Delta", "Annamite Range", "Son Doong Cave"],
    },
    thailand: {
      "water-cycle": ["Chao Phraya River", "floating markets", "monsoon season", "canal systems"],
      "sea-history": ["Sukhothai Kingdom", "Ayutthaya period", "Siam transformations", "modernization"],
      "sea-culture": ["Songkran festival", "Thai boxing", "spirit houses", "Buddhist traditions"],
      "sea-geography": ["Gulf of Thailand", "Andaman coast", "Doi Inthanon", "Isaan plateau"],
    },
    indonesia: {
      "water-cycle": ["volcanic lakes", "rice terraces", "monsoon patterns", "coastal mangroves"],
      "sea-history": ["Majapahit Empire", "spice trade", "Dutch colonization", "independence struggle"],
      "sea-culture": ["batik art", "wayang puppets", "gamelan music", "diverse traditions"],
      "sea-geography": ["Ring of Fire", "Komodo Island", "Lake Toba", "Raja Ampat"],
    },
    malaysia: {
      "water-cycle": ["rainforest ecosystem", "monsoon seasons", "mangrove forests", "river systems"],
      "sea-history": ["Malacca Sultanate", "Portuguese influence", "British colonial era", "formation of Malaysia"],
      "sea-culture": ["diverse ethnicities", "traditional crafts", "festivals", "food culture"],
      "sea-geography": ["Mount Kinabalu", "Taman Negara", "Cameron Highlands", "Strait of Malacca"],
    },
    general: {
      "water-cycle": ["monsoon patterns", "tropical climate", "island ecosystems", "river systems"],
      "sea-history": ["maritime trade", "colonial influences", "ancient kingdoms", "independence movements"],
      "sea-culture": ["religious diversity", "traditional arts", "agricultural practices", "community values"],
      "sea-geography": ["archipelagos", "mountain ranges", "river deltas", "tropical forests"],
    },
  }

  // Generate questions based on course, topic, and difficulty
  static generateQuestions(
    courseId: number,
    topicId: string,
    count = 5,
    difficulty: "beginner" | "intermediate" | "advanced" = "beginner",
    culturalContext = "general",
  ): GeneratedQuestion[] {
    // Normalize cultural context
    const normalizedContext = culturalContext.toLowerCase()
    const contextKey = Object.keys(this.culturalContexts).includes(normalizedContext) ? normalizedContext : "general"

    // Get templates for the topic
    const templates = this.questionTemplates[topicId as keyof typeof this.questionTemplates] || []
    if (templates.length === 0) {
      return []
    }

    // Get cultural contexts for the topic
    const contexts =
      this.culturalContexts[contextKey][topicId as keyof (typeof this.culturalContexts)[typeof contextKey]] || []

    // Generate questions
    const questions: GeneratedQuestion[] = []
    const usedTemplateIndices = new Set<number>()

    for (let i = 0; i < count && usedTemplateIndices.size < templates.length; i++) {
      // Find an unused template
      let templateIndex: number
      do {
        templateIndex = Math.floor(Math.random() * templates.length)
      } while (usedTemplateIndices.has(templateIndex))
      usedTemplateIndices.add(templateIndex)

      const template = templates[templateIndex]
      const contextIndex = Math.floor(Math.random() * contexts.length)
      const culturalContextValue = contexts[contextIndex]

      // Create question
      questions.push({
        id: i + 1,
        courseId,
        questionText: template.template,
        questionType: "multiple_choice",
        correctAnswer: template.correctAnswer,
        options: template.options,
        explanation: template.explanation,
        culturalContext: culturalContextValue,
        difficultyLevel: difficulty,
        topic: topicId,
      })
    }

    return questions
  }

  // Generate adaptive questions based on user performance
  static generateAdaptiveQuestions(
    courseId: number,
    userPerformance: { correct: number; total: number },
    culturalBackground = "general",
    preferredLanguage = "en",
  ): GeneratedQuestion[] {
    // Calculate performance percentage
    const performancePercentage =
      userPerformance.total > 0 ? (userPerformance.correct / userPerformance.total) * 100 : 50

    // Determine difficulty based on performance
    let difficulty: "beginner" | "intermediate" | "advanced"
    if (performancePercentage >= 80) {
      difficulty = "advanced"
    } else if (performancePercentage >= 50) {
      difficulty = "intermediate"
    } else {
      difficulty = "beginner"
    }

    // Determine topic based on course
    const topicId =
      courseId === 1
        ? "water-cycle"
        : courseId === 2
          ? "sea-history"
          : courseId === 3
            ? "sea-culture"
            : courseId === 4
              ? "sea-geography"
              : "water-cycle"

    // Generate questions with appropriate difficulty and cultural context
    return this.generateQuestions(courseId, topicId, 5, difficulty, culturalBackground)
  }
}
