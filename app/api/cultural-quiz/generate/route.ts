import { type NextRequest, NextResponse } from "next/server"
import { azureOpenAI } from "@/lib/azure-ai-services"

export async function POST(request: NextRequest) {
  try {
    const { topic, language, region, tone, difficulty = "beginner" } = await request.json()

    // Cultural context mapping for Philippines
    const culturalContext = getCulturalContext(region, language)

    // Generate culturally adapted quiz using Azure OpenAI
    const quizPrompt = `
You are an AI quiz assistant for a cultural educational platform in the Philippines.

- The student speaks ${language} and prefers a ${tone} tone.
- Generate a short quiz (3 MCQs, 1 short answer) based on the topic: "${topic}".
- Translate all content into ${language}.
- Use culturally relevant examples from ${region}, Philippines (e.g., local fruits, festivals, local stories).
- Difficulty level: ${difficulty}
- Cultural context: ${JSON.stringify(culturalContext)}

For each question, provide personalized feedback in the same language and tone, explaining why the answer is correct/incorrect with encouragement.

Return in JSON format:
{
  "quiz": [
    {
      "type": "mcq",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "B",
      "feedback": {
        "correct": "...",
        "incorrect": "..."
      },
      "hint": "..."
    }
  ],
  "short_answer": {
    "question": "...",
    "ideal_answer": "...",
    "hints": "..."
  },
  "feedback_prompts": {
    "ask_for_feedback": "...",
    "encouragement_message": "..."
  },
  "ui_strings": {
    "correct": "...",
    "incorrect": "...",
    "try_again": "...",
    "hint": "...",
    "well_done": "...",
    "your_score": "...",
    "next_question": "...",
    "submit": "...",
    "end_quiz": "..."
  }
}
`

    const response = await azureOpenAI.generateCulturalContent(quizPrompt, culturalContext)

    let quizData
    try {
      quizData = JSON.parse(response)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      quizData = generateFallbackQuiz(topic, language, region, tone)
    }

    return NextResponse.json(quizData)
  } catch (error) {
    console.error("Error generating cultural quiz:", error)
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 })
  }
}

function getCulturalContext(region: string, language: string) {
  const contexts: any = {
    Luzon: {
      landmarks: ["Banaue Rice Terraces", "Mount Mayon", "Taal Lake"],
      heroes: ["Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo"],
      food: ["adobo", "lumpia", "lechon", "halo-halo"],
      festivals: ["Pahiyas", "Ati-Atihan", "Sinulog"],
      games: ["patintero", "tumbang preso", "luksong tinik"],
      examples: ["sari-sari store", "jeepney", "rice terraces", "carabao"],
    },
    Visayas: {
      landmarks: ["Chocolate Hills", "Boracay", "Kawasan Falls", "Magellan's Cross"],
      heroes: ["Lapu-Lapu", "Graciano Lopez Jaena", "Pantaleon Villegas"],
      food: ["lechon cebu", "biko", "bibingka", "tsokolate"],
      festivals: ["Sinulog", "MassKara", "Dinagyang"],
      games: ["kadang-kadang", "tubig-tubig", "langit-lupa"],
      examples: ["merkado", "habal-habal", "island hopping", "bangka"],
    },
    Mindanao: {
      landmarks: ["Mount Apo", "Enchanted River", "Tinuy-an Falls"],
      heroes: ["Sultan Kudarat", "Datu Piang", "Princess Tarhata Kiram"],
      food: ["durian", "kinilaw", "pastil", "pyanggang"],
      festivals: ["Kadayawan", "T'nalak", "Shariff Kabunsuan"],
      games: ["sungka", "takyan", "patintero"],
      examples: ["farm", "tricycle", "coconut plantation", "fishing boat"],
    },
  }

  return contexts[region] || contexts.Luzon
}

function generateFallbackQuiz(topic: string, language: string, region: string, tone: string) {
  // Fallback quiz in case Azure OpenAI fails
  const fallbackQuizzes: any = {
    fil: {
      quiz: [
        {
          type: "mcq",
          question: `Ano ang pangunahing paksa ng ${topic}?`,
          options: [
            "Unang pagpipilian",
            "Pangalawang pagpipilian",
            "Pangatlong pagpipilian",
            "Pang-apat na pagpipilian",
          ],
          correct_answer: "Pangalawang pagpipilian",
          feedback: {
            correct: "Tama! Magaling ang inyong sagot.",
            incorrect: "Mali po. Subukan muli ang sagot.",
          },
          hint: "Isipin ang pangunahing konsepto ng aralin.",
        },
      ],
      short_answer: {
        question: `Ipaliwanag ang kahalagahan ng ${topic}.`,
        ideal_answer: "Mahalaga ito dahil...",
        hints: "Isipin kung paano ito nakakaapekto sa ating pang-araw-araw na buhay.",
      },
      feedback_prompts: {
        ask_for_feedback: "Ano ang masasabi ninyo sa pagsusulit na ito?",
        encouragement_message: "Magaling! Tuloy lang sa pag-aaral!",
      },
      ui_strings: {
        correct: "Tama!",
        incorrect: "Mali.",
        try_again: "Subukan muli",
        hint: "Pahiwatig",
        well_done: "Magaling!",
        your_score: "Inyong Iskor",
        next_question: "Susunod na Tanong",
        submit: "Isumite",
        end_quiz: "Tapusin ang Pagsusulit",
      },
    },
    ceb: {
      quiz: [
        {
          type: "mcq",
          question: `Unsa ang nag-unang hilisgutan sa ${topic}?`,
          options: ["Una nga kapilian", "Ikaduhang kapilian", "Ikatulong kapilian", "Ikaupat nga kapilian"],
          correct_answer: "Ikaduhang kapilian",
          feedback: {
            correct: "Sakto! Maayo ang inyong tubag.",
            incorrect: "Sayop. Sulayi pag-usab ang tubag.",
          },
          hint: "Hunahunaa ang nag-unang konsepto sa leksyon.",
        },
      ],
      short_answer: {
        question: `Ipasabot ang kamahinungdanon sa ${topic}.`,
        ideal_answer: "Mahinungdanon kini tungod kay...",
        hints: "Hunahunaa kung giunsa kini makaapekto sa atong adlaw-adlaw nga kinabuhi.",
      },
      feedback_prompts: {
        ask_for_feedback: "Unsa ang inyong ikasulti sa pagsulay karon?",
        encouragement_message: "Maayo kaayo! Padayon sa pagkat-on!",
      },
      ui_strings: {
        correct: "Sakto!",
        incorrect: "Sayop.",
        try_again: "Sulayi pag-usab",
        hint: "Tambag",
        well_done: "Maayo kaayo!",
        your_score: "Imong Iskor",
        next_question: "Sunod nga Pangutana",
        submit: "Isumiter",
        end_quiz: "Humanon ang Pagsulay",
      },
    },
  }

  return fallbackQuizzes[language] || fallbackQuizzes.fil
}
