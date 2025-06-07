"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Heart, Rocket, Star, Zap } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-learning to-creative relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-morph" />

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce-soft" style={{ animationDelay: "1s" }}>
          <Star className="w-6 h-6 text-white/40" />
        </div>
        <div className="absolute bottom-32 left-32 animate-wiggle" style={{ animationDelay: "2s" }}>
          <Rocket className="w-7 h-7 text-white/40" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: "3s" }}>
          <Zap className="w-5 h-5 text-white/40" />
        </div>
      </div>

      <div className="container relative px-4 md:px-6 text-center text-white">
        <div className="max-w-5xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm mb-8 animate-scale-in hover:scale-105 transition-transform duration-300">
            <Sparkles className="h-5 w-5 animate-pulse-soft" />
            <span className="text-lg font-semibold">Ready to start your journey?</span>
            <Heart className="h-5 w-5 animate-bounce-soft" />
          </div>

          <h2
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="bg-gradient-to-r from-white via-accent-100 to-white bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
              Kamusta!
            </span>
            <br />
            Ready to experience learning that feels like{" "}
            <span
              className="bg-gradient-to-r from-accent-200 via-white to-accent-200 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]"
              style={{ animationDelay: "0.5s" }}
            >
              home?
            </span>
          </h2>

          <p
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Join thousands of learners across Southeast Asia who are experiencing education built specifically for their
            culture, language, and needs.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Link href="/courses">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 shadow-2xl group text-xl px-10 py-5 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-glow-lg"
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                Start Learning Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-10 py-5 rounded-2xl transform hover:scale-105 transition-all duration-300 hover:border-white/50"
            >
              <Star className="mr-3 h-6 w-6 animate-pulse-soft" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            {[
              { icon: "🎓", text: "200K+ Students", subtext: "Active Learners", gradient: "from-accent to-warning" },
              { icon: "🌏", text: "11 Countries", subtext: "Across SEA", gradient: "from-nature to-success" },
              { icon: "⭐", text: "4.9/5 Rating", subtext: "User Satisfaction", gradient: "from-creative to-accent" },
              { icon: "🔒", text: "100% Secure", subtext: "Data Protected", gradient: "from-secondary to-ocean" },
            ].map((item, index) => (
              <div key={index} className="group">
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-soft`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {item.icon}
                </div>
                <div className="text-lg font-bold text-white/95 mb-1">{item.text}</div>
                <div className="text-sm text-white/70">{item.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
