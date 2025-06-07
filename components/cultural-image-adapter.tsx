"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"
import { azureVision } from "@/lib/azure-ai-services"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ImageIcon, RefreshCw } from "lucide-react"
import Image from "next/image"

interface CulturalImageAdapterProps {
  imageUrl: string
  alt: string
  width?: number
  height?: number
  autoAdapt?: boolean
  onImageAdapted?: (adaptedUrl: string, analysis: any) => void
  className?: string
}

export function CulturalImageAdapter({
  imageUrl,
  alt,
  width = 400,
  height = 300,
  autoAdapt = false,
  onImageAdapted,
  className = "",
}: CulturalImageAdapterProps) {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [adaptedImageUrl, setAdaptedImageUrl] = useState<string>(imageUrl)
  const [imageAnalysis, setImageAnalysis] = useState<any>(null)
  const [isAdapting, setIsAdapting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)

  // Adapt image based on cultural context
  const adaptImage = async () => {
    setIsAdapting(true)
    setError(null)

    try {
      // Analyze image using Azure Vision
      const analysis = await azureVision.analyzeImage(imageUrl)
      setImageAnalysis(analysis)

      // Find cultural replacement based on analysis
      const culturalReplacement = await azureVision.findCulturalReplacement(analysis, {
        country: profile.country,
        culturalElements: profile.culturalElements,
      })

      // If a cultural replacement is found, use it
      if (culturalReplacement) {
        setAdaptedImageUrl(culturalReplacement)

        // Call the callback if provided
        if (onImageAdapted) {
          onImageAdapted(culturalReplacement, analysis)
        }
      } else {
        // Keep the original image if no replacement is found
        setAdaptedImageUrl(imageUrl)
      }
    } catch (err) {
      console.error("Error adapting image:", err)
      setError("Failed to adapt image. Using original image.")
      setAdaptedImageUrl(imageUrl)
    } finally {
      setIsAdapting(false)
    }
  }

  // Auto-adapt image when component mounts if autoAdapt is true
  useEffect(() => {
    if (autoAdapt) {
      adaptImage()
    }
  }, [autoAdapt, imageUrl, profile.country])

  return (
    <div className={className}>
      {!autoAdapt && !adaptedImageUrl && (
        <Button
          onClick={adaptImage}
          disabled={isAdapting}
          className="bg-gradient-to-r from-primary to-secondary text-white"
        >
          {isAdapting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adapting Image...
            </>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Culturally Adapt Image
            </>
          )}
        </Button>
      )}

      {isAdapting && (
        <Card className="w-full">
          <CardContent className="p-4 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <p>Adapting image to {profile.country} cultural context...</p>
          </CardContent>
        </Card>
      )}

      {error && <div className="text-error text-sm mt-2">{error}</div>}

      {adaptedImageUrl && !isAdapting && (
        <div className="relative">
          <Image
            src={showOriginal ? imageUrl : adaptedImageUrl}
            alt={alt}
            width={width}
            height={height}
            className="rounded-lg object-cover"
          />

          {imageUrl !== adaptedImageUrl && (
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm"
                onClick={() => setShowOriginal(!showOriginal)}
              >
                {showOriginal ? "Show Adapted" : "Show Original"}
              </Button>

              <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm" onClick={adaptImage}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          )}

          {imageAnalysis && (
            <div className="mt-2 text-sm text-gray-500">
              <p>Detected: {imageAnalysis.description?.captions[0]?.text || "No description available"}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {imageAnalysis.tags?.slice(0, 5).map((tag: any, index: number) => (
                  <span key={index} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
