"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAzureTranslate } from "./azure-translate-provider"
import { useLanguage } from "./language-provider"
import { Loader2, Globe, RefreshCw } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TranslationControls() {
  const { translatePage, isTranslating, autoTranslate, setAutoTranslate } = useAzureTranslate()
  const { currentLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  // Don't show controls for English
  if (currentLanguage.code === "en") return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col gap-2">
        {isOpen && (
          <div className="bg-white p-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Switch id="auto-translate" checked={autoTranslate} onCheckedChange={setAutoTranslate} />
                <Label htmlFor="auto-translate">Auto-translate pages</Label>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => translatePage()}
                disabled={isTranslating}
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Translate page
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="h-10 w-10 rounded-full shadow-lg" onClick={() => setIsOpen(!isOpen)}>
                <Globe className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Translation Controls</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
