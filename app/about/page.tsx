import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Globe, Users, Zap, BookOpen, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Aditi Mehta",
      role: "Founder & CEO",
      country: "India",
      flag: "IN",
      expertise: "Educational Technology",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const milestones = [
    { year: "2025", event: "SEA Bridge founded with vision of localized learning", icon: "🚀" },
    
  ]

  const values = [
    {
      icon: Heart,
      title: "Cultural Empathy",
      description: "We understand that learning happens best when it feels familiar and respectful of your culture.",
      color: "primary",
    },
    {
      icon: Globe,
      title: "Inclusive Access",
      description: "Education should be available to everyone, regardless of location, device, or connection speed.",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Learning is a social experience. We build connections across cultures while honoring local traditions.",
      color: "accent",
    },
    {
      icon: Zap,
      title: "Innovation with Purpose",
      description: "Technology should serve humanity, not the other way around. Every feature has a cultural purpose.",
      color: "forest",
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-sky-50 to-secondary-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              Our Story
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-display mb-6 text-gray-900 dark:text-dark">
              Building bridges through{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                localized learning
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              SEA Bridge was born from a simple belief: every learner deserves education that speaks their language,
              understands their culture, and adapts to their needs. We're not just translating content—we're
              transforming how education works in Southeast Asia.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { number: "200K+", label: "Active Learners", icon: "👥" },
                { number: "11", label: "Countries", icon: "🌏" },
                { number: "100+", label: "Languages", icon: "🗣️" },
                { number: "95%", label: "Satisfaction", icon: "⭐" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display mb-4 text-gray-900 dark:text-dark">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by these core principles that put learners and their cultures first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="border-2 border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-medium"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          value.color === "primary"
                            ? "bg-primary/10"
                            : value.color === "secondary"
                              ? "bg-secondary/10"
                              : value.color === "accent"
                                ? "bg-accent/10"
                                : "bg-forest/10"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            value.color === "primary"
                              ? "text-primary"
                              : value.color === "secondary"
                                ? "text-secondary"
                                : value.color === "accent"
                                  ? "text-accent"
                                  : "text-forest"
                          }`}
                        />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="py-16 md:py-24 bg-gradient-to-br from-rice-50 to-sky-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse team of educators, technologists, and cultural experts from across Southeast Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center border-2 border-transparent hover:border-secondary/20 transition-all duration-300 hover:shadow-medium"
              >
                <CardContent className="p-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 text-2xl">{member.flag}</div>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.country}</p>
                  <Badge variant="secondary" className="text-xs">
                    {member.expertise}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display mb-4 text-gray-900 dark:text-dark">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small idea to transforming education across Southeast Asia.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-primary mb-1">{milestone.year}</div>
                  <div className="text-lg font-medium text-gray-900">{milestone.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-secondary to-forest">
        <div className="container px-4 md:px-6 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-display mb-6">Join Our Mission</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Help us build the future of education in Southeast Asia. Whether you're a learner, educator, or
            technologist, there's a place for you in our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <BookOpen className="h-5 w-5 mr-2" />
                Start Learning
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Users className="h-5 w-5 mr-2" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
