"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Trophy,
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Zap,
  Target,
  Award,
  Brain,
  Lightbulb,
  Volume2,
} from "lucide-react"

// Complete Philippine language translations
const translations = {
  fil: {
    correct: "Tama!",
    incorrect: "Mali.",
    try_again: "Subukan muli",
    hint: "Pahiwatig",
    submit: "Isumite",
    next_question: "Susunod na Tanong",
    your_score: "Inyong Iskor",
    well_done: "Magaling!",
    review_answer: "Suriin ang Sagot",
    end_quiz: "Tapusin ang Pagsusulit",
    question: "Tanong",
    of: "ng",
    complete: "Tapos na!",
    restart: "Simulan Muli",
    new_quiz: "Bagong Pagsusulit",
    continue_learning: "Magpatuloy sa Pag-aaral",
    feedback_prompt: "Ano ang masasabi ninyo sa pagsusulit na ito?",
    easy: "Madali lang!",
    bit_hard: "Medyo mahirap",
    want_more: "Gusto ko pa",
    loading: "Naglo-load...",
  },
  ceb: {
    correct: "Sakto!",
    incorrect: "Sayop.",
    try_again: "Sulayi pag-usab",
    hint: "Tambag",
    submit: "Isumiter",
    next_question: "Sunod nga Pangutana",
    your_score: "Imong Iskor",
    well_done: "Maayo kaayo!",
    review_answer: "Tan-awa ang Tubag",
    end_quiz: "Humanon ang Pagsulay",
    question: "Pangutana",
    of: "sa",
    complete: "Nahuman na!",
    restart: "Sulayi Pag-usab",
    new_quiz: "Bag-ong Pagsulay",
    continue_learning: "Padayon sa Pagkat-on",
    feedback_prompt: "Unsa ang inyong ikasulti sa pagsulay karon?",
    easy: "Sayon ra!",
    bit_hard: "Medyo lisod",
    want_more: "Gusto pa nako",
    loading: "Naghimo...",
  },
  ilo: {
    correct: "Husto!",
    incorrect: "Saan a husto.",
    try_again: "Ulitem manen",
    hint: "Palagip",
    submit: "Isumitir",
    next_question: "Sumarsaruno a Saludsod",
    your_score: "Iskor mo",
    well_done: "Naimbag!",
    review_answer: "Kitaem ti Sungbat",
    end_quiz: "Pagturposan ti Eksamen",
    question: "Saludsod",
    of: "iti",
    complete: "Nalpasen!",
    restart: "Rugian Manen",
    new_quiz: "Baro nga Eksamen",
    continue_learning: "Ituloy ti Panagsursuro",
    feedback_prompt: "Ania ti maibagam iti eksamen?",
    easy: "Nalaka laeng!",
    bit_hard: "Bassit a narigat",
    want_more: "Kayatko pay",
    loading: "Agload...",
  },
  hil: {
    correct: "Insakto!",
    incorrect: "Sala.",
    try_again: "Sulayi liwat",
    hint: "Paandam",
    submit: "Isumiter",
    next_question: "Sunod nga pamangkot",
    your_score: "Imo nga iskor",
    well_done: "Maayo gid!",
    review_answer: "Usisa sang sabat",
    end_quiz: "Tapuson ang pagsusulit",
    question: "Pamangkot",
    of: "sang",
    complete: "Tapos na!",
    restart: "Sugod liwat",
    new_quiz: "Bag-o nga pagsusulit",
    continue_learning: "Padayon sa pagtuon",
    feedback_prompt: "Ano ang masiling mo sa pagsusulit?",
    easy: "Mahapos lang!",
    bit_hard: "Medyo mabudlay",
    want_more: "Gusto ko pa",
    loading: "Nagaload...",
  },
  war: {
    correct: "Husto!",
    incorrect: "Sayop.",
    try_again: "Sulayi utro",
    hint: "Pahiwatig",
    submit: "Isumite",
    next_question: "Sunod nga pakiana",
    your_score: "Imo nga puntos",
    well_done: "Maupay!",
    review_answer: "Kitaa an baton",
    end_quiz: "Taposa an pagsusulit",
    question: "Pakiana",
    of: "han",
    complete: "Tapos na!",
    restart: "Umpisa utro",
    new_quiz: "Bag-o nga pagsusulit",
    continue_learning: "Padayon an pagtuon",
    feedback_prompt: "Ano an masasabi mo sa pagsusulit?",
    easy: "Hapos la!",
    bit_hard: "Medyo lisod",
    want_more: "Gusto ko pa",
    loading: "Nagloload...",
  },
}

// Cultural quiz data with Philippine context
const culturalQuizData = {
  fil: {
    mathematics: {
      title: "Matematika sa Pang-araw-araw",
      questions: [
        {
          type: "mcq",
          question: "Si Aling Rosa ay bumili ng 3 kilong bigas sa halagang ₱150. Magkano ang bawat kilo?",
          options: ["₱40", "₱50", "₱60", "₱45"],
          correct_answer: "₱50",
          feedback: {
            correct: "Tama! Magaling! ₱150 ÷ 3 = ₱50 bawat kilo. Ganito rin ang ginagawa natin sa palengke.",
            incorrect: "Mali po. Hatiin natin ang ₱150 sa 3 kilong bigas: ₱150 ÷ 3 = ₱50 bawat kilo.",
          },
          hint: "Hatiin ang kabuuang bayad sa bilang ng kilo.",
          cultural_context: "Ginagamit natin ang bigas sa araw-araw na buhay sa Pilipinas.",
        },
        {
          type: "mcq",
          question:
            "Ang jeepney ay tumatakbo ng 8 kilometro bawat litro ng gasolina. Ilang litro ang kailangan para sa 40 kilometro?",
          options: ["4 litro", "5 litro", "6 litro", "3 litro"],
          correct_answer: "5 litro",
          feedback: {
            correct: "Tama! 40 km ÷ 8 km/litro = 5 litro. Mahusay sa pagkukuwenta!",
            incorrect: "Mali. Hatiin ang 40 km sa 8 km bawat litro: 40 ÷ 8 = 5 litro.",
          },
          hint: "Hatiin ang kabuuang distansya sa kilometro bawat litro.",
          cultural_context: "Ang jeepney ay pangunahing transportasyon sa Pilipinas.",
        },
        {
          type: "mcq",
          question: "Sa sari-sari store ni Mang Ben, ang isang pack ng biskwit ay ₱12. Magkano ang 7 packs?",
          options: ["₱74", "₱84", "₱94", "₱64"],
          correct_answer: "₱84",
          feedback: {
            correct: "Tama! 7 × ₱12 = ₱84. Magaling sa multiplication!",
            incorrect: "Mali. I-multiply ang 7 packs × ₱12 = ₱84.",
          },
          hint: "I-multiply ang bilang ng packs sa presyo bawat pack.",
          cultural_context: "Ang sari-sari store ay makikita sa bawat sulok ng Pilipinas.",
        },
      ],
      short_answer: {
        question:
          "Kung ang isang pamilya ay kumakain ng 2 kilong bigas sa isang linggo, ilang kilo ang kailangan nila sa isang buwan (4 linggo)?",
        ideal_answer: "8 kilo",
        hints: "I-multiply ang 2 kilo sa 4 linggo.",
        feedback: "Tama! 2 kilo × 4 linggo = 8 kilo. Ganito natin kinakalkula ang pangangailangan ng pamilya.",
      },
    },
    science: {
      title: "Agham at Kalikasan",
      questions: [
        {
          type: "mcq",
          question:
            "Ano ang tawag sa proseso kung paano ginagawa ng mga halaman tulad ng malunggay ang kanilang pagkain?",
          options: ["Respirasyon", "Fotosintesis", "Digestyon", "Sirkulasyon"],
          correct_answer: "Fotosintesis",
          feedback: {
            correct:
              "Tama! Ang fotosintesis ay ginagamit ng malunggay at iba pang halaman para gumawa ng pagkain gamit ang sikat ng araw.",
            incorrect: "Mali. Ang fotosintesis ang proseso na ginagamit ng mga halaman para gumawa ng pagkain.",
          },
          hint: "Isipin ang kailangan ng halaman: tubig, hangin, at sikat ng araw.",
          cultural_context: "Ang malunggay ay masustansyang halaman na madalas natin makita sa Pilipinas.",
        },
        {
          type: "mcq",
          question: "Alin sa mga sumusunod ang renewable energy na makikita sa Pilipinas?",
          options: ["Coal", "Solar energy", "Gasoline", "Natural gas"],
          correct_answer: "Solar energy",
          feedback: {
            correct:
              "Tama! Ang solar energy ay renewable dahil hindi nauubos ang sikat ng araw. Maraming solar panels na sa Pilipinas.",
            incorrect: "Mali. Ang solar energy ang renewable energy na galing sa sikat ng araw.",
          },
          hint: "Isipin ang enerhiya na galing sa araw na hindi nauubos.",
          cultural_context: "Ang Pilipinas ay tropical country na maraming sikat ng araw.",
        },
        {
          type: "mcq",
          question: "Ano ang nangyayari sa tubig kapag umuulan sa bundok Mayon?",
          options: ["Nagiging yelo", "Bumabalik sa dagat", "Nagiging singaw", "Nagiging alat"],
          correct_answer: "Bumabalik sa dagat",
          feedback: {
            correct: "Tama! Ang ulan ay dumadaloy sa mga ilog at bumabalik sa dagat. Ito ang water cycle.",
            incorrect: "Mali. Ang ulan ay dumadaloy sa mga ilog at bumabalik sa dagat bilang bahagi ng water cycle.",
          },
          hint: "Isipin kung saan pumupunta ang tubig-ulan pagkatapos bumagsak.",
          cultural_context: "Ang Mayon ay sikat na bulkan sa Albay, Pilipinas.",
        },
      ],
      short_answer: {
        question: "Bakit mahalaga ang mga puno ng narra at molave sa ating kapaligiran?",
        ideal_answer: "Nagbibigay ng oxygen, nag-aabsorb ng carbon dioxide, at nagbibigay ng lilim.",
        hints: "Isipin ang mga benepisyo ng mga puno sa hangin at klima.",
        feedback:
          "Tama! Ang mga puno ay nagbibigay ng oxygen, nag-aabsorb ng carbon dioxide, at tumutulong sa climate.",
      },
    },
    history: {
      title: "Kasaysayan ng Pilipinas",
      questions: [
        {
          type: "mcq",
          question: "Sino ang pambansang bayani ng Pilipinas na sumulat ng Noli Me Tangere?",
          options: ["Andres Bonifacio", "Jose Rizal", "Emilio Aguinaldo", "Apolinario Mabini"],
          correct_answer: "Jose Rizal",
          feedback: {
            correct:
              "Tama! Si Jose Rizal ang sumulat ng Noli Me Tangere at El Filibusterismo para ipakita ang mga problema sa panahon ng Espanyol.",
            incorrect: "Mali. Si Jose Rizal ang sumulat ng Noli Me Tangere, hindi si Bonifacio o iba pa.",
          },
          hint: "Siya rin ang sumulat ng El Filibusterismo.",
          cultural_context: "Si Rizal ay ginugunita natin tuwing June 19, araw ng kanyang kapanganakan.",
        },
        {
          type: "mcq",
          question: "Saang lugar naganap ang unang sigaw ng himagsikan laban sa mga Espanyol?",
          options: ["Caloocan", "Balintawak", "Manila", "Cavite"],
          correct_answer: "Balintawak",
          feedback: {
            correct:
              "Tama! Sa Balintawak naganap ang Cry of Balintawak noong Agosto 1896 na naging simula ng rebolusyon.",
            incorrect: "Mali. Sa Balintawak naganap ang unang sigaw ng himagsikan noong 1896.",
          },
          hint: "Ito ay nangyari noong Agosto 1896 kasama si Andres Bonifacio.",
          cultural_context: "Ang Balintawak ay bahagi ng Quezon City ngayon.",
        },
        {
          type: "mcq",
          question: "Ano ang tawag sa sistema ng sapilitang paggawa ng mga Pilipino para sa mga Espanyol?",
          options: ["Encomienda", "Polo y servicios", "Tributo", "Bandala"],
          correct_answer: "Polo y servicios",
          feedback: {
            correct: "Tama! Ang polo y servicios ay sapilitang paggawa ng mga lalaking Pilipino na 16-60 taong gulang.",
            incorrect: "Mali. Ang polo y servicios ang tawag sa sapilitang paggawa para sa mga Espanyol.",
          },
          hint: "Ito ay sapilitang paggawa ng mga lalaki para sa mga proyekto ng gobyerno.",
          cultural_context: "Ito ay isa sa mga dahilan kung bakit naghimagsik ang mga Pilipino.",
        },
      ],
      short_answer: {
        question: "Bakit mahalaga ang Araw ng Kalayaan na ginugunita natin tuwing June 12?",
        ideal_answer:
          "Ito ang araw na ipinroklamar ni Emilio Aguinaldo ang kalayaan ng Pilipinas mula sa Espanya noong 1898.",
        hints: "Isipin ang nangyari noong June 12, 1898 sa Kawit, Cavite.",
        feedback: "Tama! Noong June 12, 1898, ipinroklamar ni Aguinaldo ang kalayaan ng Pilipinas sa Kawit, Cavite.",
      },
    },
  },
  ceb: {
    mathematics: {
      title: "Matematika sa Adlaw-adlaw",
      questions: [
        {
          type: "mcq",
          question: "Si Aling Maria mipalit og 5 ka kilo nga bugas sa kantidad nga ₱250. Pila ang bawat kilo?",
          options: ["₱40", "₱50", "₱60", "₱45"],
          correct_answer: "₱50",
          feedback: {
            correct: "Sakto! Maayo kaayo! ₱250 ÷ 5 = ₱50 matag kilo. Mao ni ang atong buhaton sa merkado.",
            incorrect: "Sayop. Bahina ang ₱250 sa 5 ka kilo: ₱250 ÷ 5 = ₱50 matag kilo.",
          },
          hint: "Bahina ang tibuok bayad sa gidaghanon sa kilo.",
          cultural_context: "Ang bugas mao ang atong panguna nga pagkaon sa Pilipinas.",
        },
        {
          type: "mcq",
          question:
            "Ang habal-habal makadagan og 6 kilometro matag litro sa gasolina. Pila ka litro ang kinahanglan para sa 30 kilometro?",
          options: ["4 litro", "5 litro", "6 litro", "3 litro"],
          correct_answer: "5 litro",
          feedback: {
            correct: "Sakto! 30 km ÷ 6 km/litro = 5 litro. Maayo ang imong pagkwenta!",
            incorrect: "Sayop. Bahina ang 30 km sa 6 km matag litro: 30 ÷ 6 = 5 litro.",
          },
          hint: "Bahina ang tibuok distansya sa kilometro matag litro.",
          cultural_context: "Ang habal-habal kay sakyanan sa mga bukid sa Mindanao.",
        },
        {
          type: "mcq",
          question: "Sa tindahan ni Manong Pedro, ang usa ka pakete sa galletas kay ₱15. Pila ang 6 ka pakete?",
          options: ["₱80", "₱90", "₱100", "₱85"],
          correct_answer: "₱90",
          feedback: {
            correct: "Sakto! 6 × ₱15 = ₱90. Maayo sa multiplication!",
            incorrect: "Sayop. I-multiply ang 6 ka pakete × ₱15 = ₱90.",
          },
          hint: "I-multiply ang gidaghanon sa pakete sa presyo matag pakete.",
          cultural_context: "Ang tindahan makita sa matag sulok sa Pilipinas.",
        },
      ],
      short_answer: {
        question:
          "Kung ang usa ka pamilya mokaon og 3 ka kilo nga bugas sa usa ka semana, pila ka kilo ang ilang kinahanglan sa usa ka buwan (4 ka semana)?",
        ideal_answer: "12 kilo",
        hints: "I-multiply ang 3 kilo sa 4 ka semana.",
        feedback: "Sakto! 3 kilo × 4 ka semana = 12 kilo. Mao ni ang atong pagkalkula sa panginahanglan sa pamilya.",
      },
    },
    science: {
      title: "Siyensya ug Kinaiyahan",
      questions: [
        {
          type: "mcq",
          question: "Unsa ang tawag sa proseso kung giunsa paghimo sa mga tanom sama sa malunggay ang ilang pagkaon?",
          options: ["Respirasyon", "Photosynthesis", "Digestyon", "Sirkulasyon"],
          correct_answer: "Photosynthesis",
          feedback: {
            correct:
              "Sakto! Ang photosynthesis gigamit sa malunggay ug uban pang tanom para mohimo og pagkaon gamit ang kahayag sa adlaw.",
            incorrect: "Sayop. Ang photosynthesis ang proseso nga gigamit sa mga tanom para mohimo og pagkaon.",
          },
          hint: "Hunahunaa ang kinahanglan sa tanom: tubig, hangin, ug kahayag sa adlaw.",
          cultural_context: "Ang malunggay kay sustansyosong tanom nga kanunay natong makita sa Pilipinas.",
        },
        {
          type: "mcq",
          question: "Asa sa mga mosunod ang renewable energy nga makita sa Pilipinas?",
          options: ["Coal", "Solar energy", "Gasoline", "Natural gas"],
          correct_answer: "Solar energy",
          feedback: {
            correct:
              "Sakto! Ang solar energy kay renewable tungod kay dili mahurot ang kahayag sa adlaw. Daghan nang solar panels sa Pilipinas.",
            incorrect: "Sayop. Ang solar energy ang renewable energy nga gikan sa kahayag sa adlaw.",
          },
          hint: "Hunahunaa ang enerhiya nga gikan sa adlaw nga dili mahurot.",
          cultural_context: "Ang Pilipinas kay tropical country nga daghan og kahayag sa adlaw.",
        },
        {
          type: "mcq",
          question: "Unsa ang mahitabo sa tubig kung moulan sa Chocolate Hills?",
          options: ["Mahimong yelo", "Mobalik sa dagat", "Mahimong alisngaw", "Mahimong parat"],
          correct_answer: "Mobalik sa dagat",
          feedback: {
            correct: "Sakto! Ang ulan modagayday sa mga sapa ug mobalik sa dagat. Mao ni ang water cycle.",
            incorrect: "Sayop. Ang ulan modagayday sa mga sapa ug mobalik sa dagat isip bahin sa water cycle.",
          },
          hint: "Hunahunaa kung asa moadto ang tubig-ulan human mahulog.",
          cultural_context: "Ang Chocolate Hills kay sikat nga lugar sa Bohol, Pilipinas.",
        },
      ],
      short_answer: {
        question: "Ngano nga importante ang mga kahoy sama sa narra ug molave sa atong palibot?",
        ideal_answer: "Naghatag og oxygen, nag-absorb og carbon dioxide, ug naghatag og landong.",
        hints: "Hunahunaa ang mga benepisyo sa mga kahoy sa hangin ug klima.",
        feedback: "Sakto! Ang mga kahoy naghatag og oxygen, nag-absorb og carbon dioxide, ug nakatabang sa climate.",
      },
    },
    history: {
      title: "Kasaysayan sa Pilipinas",
      questions: [
        {
          type: "mcq",
          question: "Kinsa ang pambansang bayani sa Pilipinas nga nagsulat sa Noli Me Tangere?",
          options: ["Andres Bonifacio", "Jose Rizal", "Emilio Aguinaldo", "Apolinario Mabini"],
          correct_answer: "Jose Rizal",
          feedback: {
            correct:
              "Sakto! Si Jose Rizal ang nagsulat sa Noli Me Tangere ug El Filibusterismo para ipakita ang mga problema sa panahon sa mga Espanyol.",
            incorrect: "Sayop. Si Jose Rizal ang nagsulat sa Noli Me Tangere, dili si Bonifacio o uban pa.",
          },
          hint: "Siya usab ang nagsulat sa El Filibusterismo.",
          cultural_context: "Si Rizal atong gihandom matag June 19, adlaw sa iyang pagkatawo.",
        },
        {
          type: "mcq",
          question: "Asa nga lugar nahitabo ang unang sigaw sa himagsikan batok sa mga Espanyol?",
          options: ["Caloocan", "Balintawak", "Manila", "Cavite"],
          correct_answer: "Balintawak",
          feedback: {
            correct:
              "Sakto! Sa Balintawak nahitabo ang Cry of Balintawak niadtong Agosto 1896 nga nahimong sinugdanan sa rebolusyon.",
            incorrect: "Sayop. Sa Balintawak nahitabo ang unang sigaw sa himagsikan niadtong 1896.",
          },
          hint: "Kini nahitabo niadtong Agosto 1896 kauban si Andres Bonifacio.",
          cultural_context: "Ang Balintawak kay bahin sa Quezon City karon.",
        },
        {
          type: "mcq",
          question: "Unsa ang tawag sa sistema sa sapilitang pagtrabaho sa mga Pilipino para sa mga Espanyol?",
          options: ["Encomienda", "Polo y servicios", "Tributo", "Bandala"],
          correct_answer: "Polo y servicios",
          feedback: {
            correct: "Sakto! Ang polo y servicios kay sapilitang pagtrabaho sa mga lalaking Pilipino nga 16-60 anyos.",
            incorrect: "Sayop. Ang polo y servicios ang tawag sa sapilitang pagtrabaho para sa mga Espanyol.",
          },
          hint: "Kini kay sapilitang pagtrabaho sa mga lalaki para sa mga proyekto sa gobyerno.",
          cultural_context: "Kini usa sa mga hinungdan ngano nga naghimagsik ang mga Pilipino.",
        },
      ],
      short_answer: {
        question: "Ngano nga importante ang Adlaw sa Kagawasan nga atong gisaulog matag June 12?",
        ideal_answer:
          "Kini ang adlaw nga gipahayag ni Emilio Aguinaldo ang kagawasan sa Pilipinas gikan sa Espanya niadtong 1898.",
        hints: "Hunahunaa ang nahitabo niadtong June 12, 1898 sa Kawit, Cavite.",
        feedback: "Sakto! Niadtong June 12, 1898, gipahayag ni Aguinaldo ang kagawasan sa Pilipinas sa Kawit, Cavite.",
      },
    },
  },
}

interface AutomatedCulturalQuizProps {
  subject: string
  culturalProfile: any
  onComplete?: (score: number, totalQuestions: number) => void
}

export function AutomatedCulturalQuiz({ subject, culturalProfile, onComplete }: AutomatedCulturalQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [shortAnswer, setShortAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [isShortAnswerPhase, setIsShortAnswerPhase] = useState(false)

  const language = culturalProfile?.language?.toLowerCase() || "fil"
  const t = translations[language as keyof typeof translations] || translations.fil
  const quizData =
    culturalQuizData[language as keyof typeof culturalQuizData]?.[subject as keyof typeof culturalQuizData.fil] ||
    culturalQuizData.fil.mathematics

  const totalQuestions = quizData.questions.length + 1 // +1 for short answer
  const currentQuestion = isShortAnswerPhase ? quizData.short_answer : quizData.questions[currentQuestionIndex]

  const handleAnswerSubmit = () => {
    if (isShortAnswerPhase) {
      // Handle short answer
      const correct = shortAnswer.toLowerCase().includes(quizData.short_answer.ideal_answer.toLowerCase().split(" ")[0])
      setIsCorrect(correct)

      if (correct) {
        setScore(score + 1)
        setStreak(streak + 1)
        setMaxStreak(Math.max(maxStreak, streak + 1))
        setFeedback(quizData.short_answer.feedback)
      } else {
        setStreak(0)
        setFeedback(`${t.incorrect} ${quizData.short_answer.feedback}`)
      }
    } else {
      // Handle MCQ
      const mcqQuestion = currentQuestion as { correct_answer: string; feedback: { correct: string; incorrect: string } }
      const correct = selectedAnswer === mcqQuestion.correct_answer
      setIsCorrect(correct)

      if (correct) {
        setScore(score + 1)
        setStreak(streak + 1)
        setMaxStreak(Math.max(maxStreak, streak + 1))
        setFeedback(mcqQuestion.feedback.correct)
      } else {
        setStreak(0)
        setFeedback(mcqQuestion.feedback.incorrect)
      }
    }

    setShowFeedback(true)
  }
  const handleNextQuestion = () => {
    if (isShortAnswerPhase) {
      setQuizCompleted(true)
      onComplete?.(score, totalQuestions)
    } else if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setShowFeedback(false)
      setShowHint(false)
    } else {
      setIsShortAnswerPhase(true)
      setShowFeedback(false)
      setShowHint(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setShortAnswer("")
    setScore(0)
    setShowFeedback(false)
    setQuizCompleted(false)
    setStreak(0)
    setMaxStreak(0)
    setIsShortAnswerPhase(false)
    setShowHint(false)
  }

  const getScoreColor = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreEmoji = () => {
    const percentage = (score / totalQuestions) * 100
    if (percentage >= 90) return "🏆"
    if (percentage >= 80) return "🌟"
    if (percentage >= 70) return "👏"
    if (percentage >= 60) return "👍"
    return "💪"
  }

  const getEncouragementMessage = () => {
    if (language === "ceb") {
      return culturalProfile.tone === "formal"
        ? "Maayo kaayo ang inyong pagkat-on! Padayon lang po!"
        : "Maayo kaayo! Padayon lang!"
    } else if (language === "fil") {
      return culturalProfile.tone === "formal" ? "Napakagaling ninyo po! Magpatuloy lang!" : "Napakagaling! Tuloy lang!"
    }
    return "Great job! Keep it up!"
  }

  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getScoreEmoji()}</div>
          <CardTitle className="text-2xl font-bold">{t.complete}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()} mb-2`}>
              {score}/{totalQuestions}
            </div>
            <div className="text-lg text-gray-600">{percentage}% Score</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="font-bold text-lg text-black">{maxStreak}</div>
              <div className="text-sm text-gray-600">Max Streak</div>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="font-bold text-lg text-black">{percentage >= 70 ? t.well_done : t.try_again}</div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>

          {percentage >= 80 && (
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="font-bold text-green-700">
                {language === "ceb" ? "Nakakuha og Achievement!" : "Nakakuha ng Achievement!"}
              </div>
              <div className="text-sm text-green-600">
                Quiz Master - 80% {language === "ceb" ? "o mas taas" : "o mas mataas"}
              </div>
            </div>
          )}

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-700 mb-2">{getEncouragementMessage()}</p>
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Volume2 className="h-4 w-4" />
                {t.hint}
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              {t.restart}
            </Button>

            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
              <Trophy className="h-4 w-4 mr-2" />
              {t.continue_learning}
            </Button>
          </div>

          {/* Student Feedback */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">{t.feedback_prompt}</p>
            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline">
                {t.easy}
              </Button>
              <Button size="sm" variant="outline">
                {t.bit_hard}
              </Button>
              <Button size="sm" variant="outline">
                {t.want_more}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentQuestionIndex + (isShortAnswerPhase ? 1 : 0)) / totalQuestions) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-primary/20 text-primary ">
            <Brain className="h-3 w-3 mr-1" />
            {t.question} {currentQuestionIndex + (isShortAnswerPhase ? 1 : 0) + 1} {t.of} {totalQuestions}
          </Badge>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-bold">{score}</span>
            </div>

            {streak > 0 && (
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="font-bold text-orange-500">{streak}</span>
              </div>
            )}

            <Button onClick={() => setShowHint(!showHint)} variant="ghost" size="sm" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              {t.hint}
            </Button>
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-4" />

        <CardTitle className="text-xl leading-relaxed">
          {isShortAnswerPhase ? currentQuestion.question : currentQuestion.question}
        </CardTitle>

        {showHint && currentQuestion.hint && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
              <p className="text-sm text-yellow-700">{currentQuestion.hint || currentQuestion.hints}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-700">
            🌍 {culturalProfile.region}
          </Badge>
          <Badge variant="outline" className="w-fit">
            📚 {quizData.title}
          </Badge>
          <Badge variant="outline" className="w-fit">
            🗣️ {language.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!showFeedback ? (
          <>
            {isShortAnswerPhase ? (
              <div className="space-y-2">
                <Label htmlFor="short-answer" className="text-sm font-medium ">
                  {language === "ceb" ? "Isulat ang inyong tubag:" : "Isulat ang inyong sagot:"}
                </Label>
                <Textarea
                  id="short-answer"
                  value={shortAnswer}
                  onChange={(e) => setShortAnswer(e.target.value)}
                  placeholder={language === "ceb" ? "Isulat dinhi..." : "Isulat dito..."}
                  className="min-h-[100px]"
                />
                {currentQuestion.hints && <p className="text-xs text-gray-500 ">{currentQuestion.hints}</p>}
              </div>
            ) : (
              <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                {currentQuestion.options.map((option: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer && !shortAnswer}
              className="w-full bg-gradient-to-r from-primary to-secondary"
            >
              {t.submit}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg border-2 ${
                isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-bold text-black">{isCorrect ? t.correct : t.incorrect}</span>
              </div>

              <p className="text-sm leading-relaxed mb-3 text-black">{feedback}</p>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Volume2 className="h-4 w-4" />
                </Button>
                {currentQuestion.cultural_context && (
                  <p className="text-xs text-gray-500 italic">{currentQuestion.cultural_context}</p>
                )}
              </div>
            </div>

            <Button onClick={handleNextQuestion} className="w-full bg-gradient-to-r from-secondary to-green-500">
              {isShortAnswerPhase ? t.end_quiz : t.next_question}
            </Button>
          </div>
        )}

        {/* Cultural Context Footer */}
        <div className="border-t pt-4 text-center">
          <p className="text-xs text-gray-500 mb-2">
            {language === "ceb"
              ? "Kini nga pagsulay gi-adapt para sa kultura sa Pilipinas"
              : "Ang pagsusulit na ito ay naka-adapt para sa Filipino na kultura"}
          </p>
          <div className="flex justify-center gap-2">
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-black">
              {culturalProfile.tone === "formal" ? "Formal" : "Casual"} tone
            </span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-black">Offline Mode</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-black">Cultural Context</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
