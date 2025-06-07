"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { WifiOff, Download, X } from "lucide-react"
import { useBandwidth } from "./bandwidth-detector"
import { useLocalization } from "./localization-provider"

export function OfflineIndicator() {
  const { isOffline } = useBandwidth()
  const { t } = useLocalization()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (isOffline && !isDismissed) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOffline, isDismissed])

  if (!isVisible) return null

  return (
    <Card className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 border-accent bg-accent-50 shadow-large animate-slide-in">
      <div className="p-4 flex items-center gap-3">
        <div className="flex-shrink-0">
          <WifiOff className="h-5 w-5 text-accent-600" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-accent-600">{t("offline.title")}</p>
          <p className="text-xs text-accent-600/80 mt-1">{t("offline.description")}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs border-accent-600 text-accent-600 hover:bg-accent-100">
            <Download className="h-3 w-3 mr-1" />
            {t("offline.manage")}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsDismissed(true)}
            className="text-accent-600 hover:bg-accent-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
