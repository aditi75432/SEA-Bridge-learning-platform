import { type NextRequest, NextResponse } from "next/server"

const feedbackMessages = {
  bn: {
    correct: "Bagus!",
    incorrect: "Salah.",
    tryAgain: "Cuba lagi.",
    hint: "Petunjuk: Sila semak pelajaran.",
    encouragement: "Teruskan usaha!",
    excellent: "Cemerlang!",
  },
  my: {
    correct: "မှန်ပါတယ်!",
    incorrect: "မှားပါတယ်",
    tryAgain: "ထပ်ကြိုးစားကြည့်ပါ။",
    hint: "အချက်ပြ: သင်ခန်းစာကို ပြန်ကြည့်ပါ။",
    encouragement: "ဆက်ကြိုးစားပါ!",
    excellent: "အလွန်ကောင်းပါတယ်!",
  },
  km: {
    correct: "ត្រឹមត្រូវ!",
    incorrect: "ខុសហើយ។",
    tryAgain: "ព្យាយាម​ម្ដង​ទៀត។",
    hint: "ជំនួយ: សូមមើលមេរៀនឡើងវិញ។",
    encouragement: "បន្តព្យាយាម!",
    excellent: "ល្អបំផុត!",
  },
  pt: {
    correct: "Correto!",
    incorrect: "Incorreto.",
    tryAgain: "Tente novamente.",
    hint: "Dica: Veja a lição novamente.",
    encouragement: "Continue tentando!",
    excellent: "Excelente!",
  },
  id: {
    correct: "Betul!",
    incorrect: "Salah.",
    tryAgain: "Coba lagi.",
    hint: "Petunjuk: Baca ulang materinya.",
    encouragement: "Terus semangat!",
    excellent: "Luar biasa!",
  },
  lo: {
    correct: "ຖືກຕ້ອງ!",
    incorrect: "ຜິດແລ້ວ.",
    tryAgain: "ລອງອີກຄັ້ງ.",
    hint: "ຄຳແນະນຳ: ກວດເບິ່ງບົດຮຽນຄືນໃໝ່.",
    encouragement: "ສືບຕໍ່ພະຍາຍາມ!",
    excellent: "ດີເລີດ!",
  },
  ms: {
    correct: "Bagus!",
    incorrect: "Salah.",
    tryAgain: "Cuba lagi.",
    hint: "Petunjuk: Sila semak pelajaran.",
    encouragement: "Teruskan usaha!",
    excellent: "Cemerlang!",
  },
  fil: {
    correct: "Tama ka!",
    incorrect: "Mali iyon!",
    tryAgain: "Subukan mong muli.",
    hint: "Pahiwatig: Tingnan ang aralin muli.",
    encouragement: "Tuloy lang!",
    excellent: "Napakagaling!",
  },
  th: {
    correct: "ถูกต้อง!",
    incorrect: "ไม่ถูกต้อง",
    tryAgain: "ลองอีกครั้ง",
    hint: "คำใบ้: ลองดูบทเรียนอีกครั้ง",
    encouragement: "สู้ต่อไป!",
    excellent: "ยอดเยี่ยม!",
  },
  vi: {
    correct: "Chính xác!",
    incorrect: "Sai rồi.",
    tryAgain: "Thử lại nhé.",
    hint: "Gợi ý: Xem lại bài học.",
    encouragement: "Cố gắng lên!",
    excellent: "Xuất sắc!",
  },
  en: {
    correct: "Correct!",
    incorrect: "Incorrect.",
    tryAgain: "Try again.",
    hint: "Hint: Review the lesson.",
    encouragement: "Keep going!",
    excellent: "Excellent!",
  },
}

export async function GET(request: NextRequest, { params }: { params: { lang: string; type: string } }) {
  const { lang, type } = params

  const langMessages = feedbackMessages[lang as keyof typeof feedbackMessages]

  if (!langMessages || !langMessages[type as keyof typeof langMessages]) {
    return NextResponse.json({ error: "Feedback message not found" }, { status: 404 })
  }

  return NextResponse.json({ message: langMessages[type as keyof typeof langMessages] })
}
