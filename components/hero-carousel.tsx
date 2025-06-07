"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=500&width=700",
    title: "Maria from Rural Philippines",
    description: "Learning about rice farming through local examples",
    location: "Banaue, Philippines",
    device: "2G Phone",
    language: "Filipino",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=500&width=700",
    title: "Linh from Urban Vietnam",
    description: "Studying climate change with Mekong Delta context",
    location: "Ho Chi Minh City, Vietnam",
    device: "4G Smartphone",
    language: "Vietnamese",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=500&width=700",
    title: "Somchai from Thailand",
    description: "Exploring mathematics through temple architecture",
    location: "Bangkok, Thailand",
    device: "5G Tablet",
    language: "Thai",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=500&width=700",
    title: "Siti from Indonesia",
    description: "Learning biology through coral reef ecosystems",
    location: "Bali, Indonesia",
    device: "3G Phone",
    language: "Bahasa Indonesia",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full h-[400px] md:h-[500px] group">
      {/* Main carousel */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 transform translate-x-0"
                : index < currentSlide
                  ? "opacity-0 transform -translate-x-full"
                  : "opacity-0 transform translate-x-full"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">{slide.device}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">{slide.language}</span>
                </div>

                <h3 className="text-xl font-bold">{slide.title}</h3>
                <p className="text-sm text-white/90">{slide.description}</p>
                <p className="text-xs text-white/70">📍 {slide.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Play/Pause button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <Play className={`h-4 w-4 ${isPlaying ? "opacity-50" : "opacity-100"}`} />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
