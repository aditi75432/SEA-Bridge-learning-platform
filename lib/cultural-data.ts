export interface CulturalProfile {
  country: string
  region: string
  language: string
  dialect?: string
  tone: "formal" | "informal" | "youth"
  schoolType: "public" | "private" | "homeschool"
  learningPace: "fast" | "flexible" | "structured"
  visualTheme: string
  curriculum: string
}

export interface CulturalContent {
  greetings: string[]
  encouragement: string[]
  examples: string[]
  culturalReferences: string[]
  localHeroes: string[]
  traditionalGames: string[]
  localFood: string[]
  landmarks: string[]
  festivals: string[]
  mythology: string[]
}

export const culturalProfiles = {
  Philippines: {
    regions: {
      Luzon: {
        dialects: ["Tagalog", "Ilocano", "Kapampangan", "Pangasinan", "Bikol"],
        landmarks: ["Banaue Rice Terraces", "Mount Mayon", "Taal Lake", "Intramuros"],
        heroes: ["Jose Rizal", "Andres Bonifacio", "Emilio Aguinaldo"],
        games: ["patintero", "tumbang preso", "luksong tinik", "sipa"],
        food: ["adobo", "lumpia", "lechon", "halo-halo"],
        festivals: ["Sinulog", "Ati-Atihan", "Pahiyas"],
        mythology: ["Maria Makiling", "Bernardo Carpio", "Mariang Sinukuan"],
        curriculum: "DepEd K-12",
        visualTheme: "rice-terraces",
        colors: {
          primary: "#0038A8", // Blue from flag
          secondary: "#CE1126", // Red from flag
          accent: "#FFCD00", // Yellow from flag
          background: "#F8FAFC",
        },
      },
      Visayas: {
        dialects: ["Cebuano", "Hiligaynon", "Waray", "Aklanon"],
        landmarks: ["Chocolate Hills", "Magellan's Cross", "Boracay", "Kawasan Falls"],
        heroes: ["Lapu-Lapu", "Graciano Lopez Jaena", "Pantaleon Villegas"],
        games: ["kadang-kadang", "tubig-tubig", "langit-lupa", "agawan base"],
        food: ["lechon cebu", "biko", "bibingka", "tsokolate"],
        festivals: ["Sinulog", "MassKara", "Dinagyang"],
        mythology: ["Tungkung Langit", "Alunsina", "Bakunawa"],
        curriculum: "DepEd K-12",
        visualTheme: "island-paradise",
        colors: {
          primary: "#0EA5E9",
          secondary: "#F97316",
          accent: "#22C55E",
          background: "#F0F9FF",
        },
      },
      Mindanao: {
        dialects: ["Cebuano", "Chavacano", "Maranao", "Tausug", "Maguindanao"],
        landmarks: ["Mount Apo", "Enchanted River", "Tinuy-an Falls"],
        heroes: ["Sultan Kudarat", "Datu Piang", "Princess Tarhata Kiram"],
        games: ["sungka", "takyan", "patintero", "tug of war"],
        food: ["durian", "kinilaw", "pastil", "pyanggang"],
        festivals: ["Kadayawan", "T'nalak", "Shariff Kabunsuan"],
        mythology: ["Rajah Indarapatra", "Princess Lawana", "Bantugan"],
        curriculum: "DepEd K-12",
        visualTheme: "tropical-mountains",
        colors: {
          primary: "#059669",
          secondary: "#DC2626",
          accent: "#F59E0B",
          background: "#F0FDF4",
        },
      },
    },
  },
}

export const translations = {
  en: {
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.about": "About",
    "nav.dashboard": "Dashboard",
    "auth.signin": "Sign In",
    "auth.signup": "Sign Up",
    "hero.title": "SEA Learn",
    "hero.subtitle": "Built for Me",
    "hero.description":
      "Experience education that speaks your language, understands your culture, and adapts to your needs.",
    "hero.cta.primary": "Start Learning",
    "hero.cta.secondary": "Explore Courses",
    "onboarding.welcome": "Welcome to SEA Bridge!",
    "onboarding.language": "Choose your preferred language",
    "onboarding.tone": "How would you like us to communicate?",
    "onboarding.region": "Which region are you from?",
    "onboarding.complete": "Complete Setup",
    "dashboard.welcome": "Welcome back",
    "dashboard.continue": "Continue Learning",
    "dashboard.achievements": "Your Achievements",
    "common.loading": "Loading...",
    "common.submit": "Submit",
    "common.back": "Back",
    "common.next": "Next",
  },
  fil: {
    "nav.home": "Tahanan",
    "nav.courses": "Mga Kurso",
    "nav.about": "Tungkol",
    "nav.dashboard": "Dashboard",
    "auth.signin": "Mag-sign In",
    "auth.signup": "Mag-sign Up",
    "hero.title": "SEA Pag-aaral",
    "hero.subtitle": "Para sa Akin",
    "hero.description":
      "Maranasan ang edukasyong nagsasalita ng inyong wika, nakakaintindi sa inyong kultura, at umaangkop sa inyong pangangailangan.",
    "hero.cta.primary": "Simulan ang Pag-aaral",
    "hero.cta.secondary": "Tuklasin ang mga Kurso",
    "onboarding.welcome": "Maligayang pagdating sa SEA Bridge!",
    "onboarding.language": "Piliin ang inyong gustong wika",
    "onboarding.tone": "Paano ninyo gustong makipag-usap namin?",
    "onboarding.region": "Saang rehiyon kayo galing?",
    "onboarding.complete": "Kumpletuhin ang Setup",
    "dashboard.welcome": "Maligayang pagbabalik",
    "dashboard.continue": "Magpatuloy sa Pag-aaral",
    "dashboard.achievements": "Inyong mga Tagumpay",
    "common.loading": "Naglo-load...",
    "common.submit": "Isumite",
    "common.back": "Bumalik",
    "common.next": "Susunod",
  },
  ceb: {
    "nav.home": "Balay",
    "nav.courses": "Mga Kurso",
    "nav.about": "Mahitungod",
    "nav.dashboard": "Dashboard",
    "auth.signin": "Mag-sign In",
    "auth.signup": "Mag-sign Up",
    "hero.title": "SEA Pagkat-on",
    "hero.subtitle": "Para Kanako",
    "hero.description":
      "Masinati ang edukasyon nga makasulti sa inyong pinulongan, makasabot sa inyong kultura, ug mo-adapt sa inyong panginahanglan.",
    "hero.cta.primary": "Sugdi ang Pagkat-on",
    "hero.cta.secondary": "Susihon ang mga Kurso",
    "onboarding.welcome": "Maayong pag-abot sa SEA Bridge!",
    "onboarding.language": "Pilia ang inyong gusto nga pinulongan",
    "onboarding.tone": "Unsaon ninyo gusto nga makig-istorya namo?",
    "onboarding.region": "Asa nga rehiyon kamo gikan?",
    "onboarding.complete": "Kompleto ang Setup",
    "dashboard.welcome": "Maayong pagbalik",
    "dashboard.continue": "Padayon sa Pagkat-on",
    "dashboard.achievements": "Inyong mga Kalampusan",
    "common.loading": "Nag-load...",
    "common.submit": "Isumite",
    "common.back": "Balik",
    "common.next": "Sunod",
  },
}

export function getCulturalContent(country: string, region: string): CulturalContent {
  const profile = culturalProfiles[country as keyof typeof culturalProfiles]
  if (!profile) return getDefaultContent()

  const regionData = profile.regions[region as keyof typeof profile.regions]
  if (!regionData) return getDefaultContent()

  return {
    greetings: getGreetings(country, region),
    encouragement: getEncouragement(country, region),
    examples: regionData.landmarks || [],
    culturalReferences: regionData.festivals || [],
    localHeroes: regionData.heroes || [],
    traditionalGames: regionData.games || [],
    localFood: regionData.food || [],
    landmarks: regionData.landmarks || [],
    festivals: regionData.festivals || [],
    mythology: regionData.mythology || [],
  }
}

function getGreetings(country: string, region: string): string[] {
  if (country === "Philippines") {
    if (region === "Visayas") {
      return ["Maayong adlaw!", "Kumusta ka?", "Maayong buntag!"]
    }
    return ["Magandang araw!", "Kumusta ka?", "Mabuhay!"]
  }
  return ["Hello!", "Good day!", "Welcome!"]
}

function getEncouragement(country: string, region: string): string[] {
  if (country === "Philippines") {
    if (region === "Visayas") {
      return ["Maayo kaayo!", "Padayon!", "Kaya nimo!"]
    }
    return ["Napakagaling!", "Tuloy lang!", "Kaya mo yan!"]
  }
  return ["Great job!", "Keep going!", "You can do it!"]
}

function getDefaultContent(): CulturalContent {
  return {
    greetings: ["Hello!", "Welcome!"],
    encouragement: ["Great job!", "Keep going!"],
    examples: ["Example 1", "Example 2"],
    culturalReferences: [],
    localHeroes: [],
    traditionalGames: [],
    localFood: [],
    landmarks: [],
    festivals: [],
    mythology: [],
  }
}
