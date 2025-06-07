"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocalization } from "@/components/localization-provider"
import { TrendingUp, Users, Globe } from "lucide-react"

const countries = [
  { name: "Brunei", flag: "🇧🇳", languages: 3, learners: "2K+", growth: "+15%", color: "from-primary to-learning" },
  { name: "Myanmar", flag: "🇲🇲", languages: 8, learners: "15K+", growth: "+32%", color: "from-creative to-accent" },
  { name: "Cambodia", flag: "🇰🇭", languages: 5, learners: "8K+", growth: "+28%", color: "from-nature to-success" },
  { name: "Timor-Leste", flag: "🇹🇱", languages: 4, learners: "1K+", growth: "+45%", color: "from-sunset to-warning" },
  { name: "Indonesia", flag: "🇮🇩", languages: 25, learners: "45K+", growth: "+22%", color: "from-secondary to-ocean" },
  { name: "Laos", flag: "🇱🇦", languages: 6, learners: "5K+", growth: "+38%", color: "from-learning to-creative" },
  { name: "Malaysia", flag: "🇲🇾", languages: 12, learners: "20K+", growth: "+25%", color: "from-accent to-sunset" },
  {
    name: "Philippines",
    flag: "🇵🇭",
    languages: 18,
    learners: "35K+",
    growth: "+30%",
    color: "from-primary to-secondary",
  },
  { name: "Singapore", flag: "🇸🇬", languages: 8, learners: "12K+", growth: "+18%", color: "from-nature to-ocean" },
  { name: "Thailand", flag: "🇹🇭", languages: 10, learners: "25K+", growth: "+27%", color: "from-creative to-learning" },
  { name: "Vietnam", flag: "🇻🇳", languages: 7, learners: "30K+", growth: "+35%", color: "from-sunset to-primary" },
]

export function CountriesSection() {
  const { t } = useLocalization()

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-learning-50/30 via-creative-50/20 to-nature-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-learning/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-gradient-to-br from-creative/10 to-accent/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-nature/5 to-secondary/5 rounded-full blur-3xl animate-morph" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="text-center mb-20 animate-fade-in-up">
          <Badge
            variant="outline"
            className="mb-6 border-secondary/20 text-secondary bg-secondary/5 backdrop-blur-sm px-6 py-2 text-lg animate-scale-in"
          >
            <Globe className="mr-2 h-5 w-5 animate-pulse-soft" />
            Global Reach
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-6">
            Serving learners across{" "}
            <span className="bg-gradient-to-r from-secondary via-nature to-success bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
              Southeast Asia
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tailored for 11 countries, 100+ languages and dialects, and millions of unique cultural contexts.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
          {countries.map((country, index) => (
            <Card
              key={country.name}
              className="group p-6 text-center hover:shadow-colored-lg hover:-translate-y-3 transition-all duration-500 border-2 border-transparent hover:border-secondary/20 bg-white/80 backdrop-blur-sm rounded-3xl animate-fade-in-up overflow-hidden relative"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${country.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10 space-y-4">
                <div
                  className="text-5xl group-hover:scale-125 transition-transform duration-500 animate-bounce-soft"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {country.flag}
                </div>
                <div>
                  <h3 className="font-bold text-sm group-hover:text-secondary transition-colors duration-300 mb-3">
                    {country.name}
                  </h3>
                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs bg-gradient-to-r ${country.color} text-white border-0 shadow-sm`}
                    >
                      {country.languages} languages
                    </Badge>
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5">
                      <Users className="w-3 h-3 mr-1" />
                      {country.learners}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-success/20 text-success bg-success/5">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {country.growth}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {[
            {
              number: "11",
              label: "Countries",
              icon: "🌏",
              gradient: "from-primary to-learning",
              description: "Across SEA",
            },
            {
              number: "100+",
              label: "Languages",
              icon: "🗣️",
              gradient: "from-creative to-accent",
              description: "& Dialects",
            },
            {
              number: "200K+",
              label: "Active Learners",
              icon: "👥",
              gradient: "from-nature to-success",
              description: "Growing Daily",
            },
            {
              number: "95%",
              label: "Satisfaction Rate",
              icon: "⭐",
              gradient: "from-sunset to-warning",
              description: "Love Learning",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div
  className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-soft`}
  style={{ animationDelay: `${index * 0.2}s` }}
>
  {stat.icon}
</div>

<div
  className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent text-gray-900 dark:text-white`}
>
  {stat.number}
</div>

<div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
  {stat.label}
</div>

<div className="text-sm text-gray-600 dark:text-gray-300">
  {stat.description}
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
