"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Heart, MessageCircle } from "lucide-react"
import { useLocalization } from "@/components/localization-provider"

const testimonials = [
  {
    name: "Maria Santos",
    location: "Rural Philippines",
    age: 14,
    quote:
      "Ang ganda ng lessons! Parang ginawa talaga para sa akin. Nakakaintindi ako ng science dahil ginagamit nila yung rice terraces sa examples.",
    translation:
      "The lessons are beautiful! It really feels like it was made for me. I understand science because they use rice terraces in examples.",
    subject: "Biology",
    device: "2G Phone",
    rating: 5,
    flag: "🇵🇭",
    gradient: "from-primary to-learning",
    achievement: "🌾 Cultural Explorer",
  },
  {
    name: "Linh Nguyen",
    location: "Ho Chi Minh City, Vietnam",
    age: 16,
    quote:
      "Tôi thích cách nền tảng này giải thích toán học bằng kiến trúc chùa. Rất dễ hiểu và gần gũi với văn hóa của chúng tôi.",
    translation:
      "I love how this platform explains mathematics using temple architecture. Very easy to understand and close to our culture.",
    subject: "Mathematics",
    device: "4G Smartphone",
    rating: 5,
    flag: "🇻🇳",
    gradient: "from-creative to-accent",
    achievement: "🏛️ Math Master",
  },
  {
    name: "Somchai Patel",
    location: "Bangkok, Thailand",
    age: 15,
    quote: "เยี่ยมมาก! ครูปัญญาประดิษฐ์พูดภาษาไทยได้ดีและให้กำลังใจแบบคนไทย 'เก่งมาก!' ทำให้รู้สึกอบอุ่น",
    translation:
      "Excellent! The AI teacher speaks Thai well and encourages like Thai people 'Very good!' Makes me feel warm.",
    subject: "History",
    device: "5G Tablet",
    rating: 5,
    flag: "🇹🇭",
    gradient: "from-nature to-success",
    achievement: "🎓 History Hero",
  },
]

export function TestimonialsSection() {
  const { t } = useLocalization()

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-white via-accent-50/20 to-creative-50/20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-accent/10 to-creative/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-primary/10 to-learning/10 rounded-full blur-3xl animate-blob" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <Badge
            variant="outline"
            className="mb-6 border-accent/20 text-accent bg-accent/5 backdrop-blur-sm px-6 py-2 text-lg animate-scale-in"
          >
            <MessageCircle className="mr-2 h-5 w-5 animate-pulse-soft" />
            Student Voices
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-6">
            What learners are{" "}
            <span className="bg-gradient-to-r from-accent via-creative to-primary bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
              saying
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Real stories from real students across Southeast Asia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-colored-lg transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm rounded-3xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Decorative Quote */}
              <div className="absolute top-4 right-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                💬
              </div>

              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <Quote className="h-10 w-10 text-primary/20 animate-pulse-soft" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-accent text-accent animate-bounce-soft"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed text-lg font-medium">
                  "{testimonial.quote}"
                </blockquote>

                <div className="text-sm text-gray-500 italic mb-6 p-4 bg-gradient-to-r from-gray-50 to-primary-50/30 rounded-2xl border-l-4 border-primary/20">
                  <span className="font-semibold text-primary">Translation:</span> "{testimonial.translation}"
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl shadow-lg animate-bounce-soft`}
                    >
                      {testimonial.flag}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                      <div className="text-xs text-gray-400">Age {testimonial.age}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className={`text-xs bg-gradient-to-r ${testimonial.gradient} text-white border-0 shadow-sm`}
                  >
                    {testimonial.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                    {testimonial.device}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-accent/20 text-accent bg-accent/5">
                    <Heart className="w-3 h-3 mr-1" />
                    {testimonial.achievement}
                  </Badge>
                </div>

                {/* Hover Effect Indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
