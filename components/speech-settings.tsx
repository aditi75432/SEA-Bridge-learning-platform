"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Volume2, Mic, Settings } from "lucide-react"
import { useLanguage } from "./language-provider"

interface SpeechSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export function SpeechSettings({ isOpen, onClose }: SpeechSettingsProps) {
  const { currentLanguage } = useLanguage()
  const [settings, setSettings] = useState({
    autoPlayFeedback: true,
    voiceSpeed: 0.9,
    voiceVolume: 0.8,
    microphoneEnabled: true,
    autoStopListening: true,
    confidenceThreshold: 0.7,
  })

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices()
        setAvailableVoices(voices)

        // Find default voice for current language
        const defaultVoice = voices.find((v) => v.lang.startsWith(currentLanguage.code))
        if (defaultVoice) {
          setSelectedVoice(defaultVoice.name)
        }
      }

      loadVoices()
      speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [currentLanguage.code])

  const testVoice = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        currentLanguage.code === "fil"
          ? "Kamusta! Ito ang inyong AI tutor."
          : currentLanguage.code === "vi"
            ? "Xin chào! Đây là AI tutor của bạn."
            : "Hello! This is your AI tutor.",
      )

      const voice = availableVoices.find((v) => v.name === selectedVoice)
      if (voice) {
        utterance.voice = voice
      }

      utterance.rate = settings.voiceSpeed
      utterance.volume = settings.voiceVolume

      speechSynthesis.speak(utterance)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    // Save to localStorage
    localStorage.setItem("speechSettings", JSON.stringify({ ...settings, [key]: value }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Speech Settings
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            ×
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Voice Output Settings */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Voice Output
            </h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay">Auto-play AI responses</Label>
              <Switch
                id="autoplay"
                checked={settings.autoPlayFeedback}
                onCheckedChange={(checked) => handleSettingChange("autoPlayFeedback", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Voice Selection</Label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-2 border rounded-lg bg-white"
              >
                {availableVoices
                  .filter((voice) => voice.lang.startsWith(currentLanguage.code) || voice.lang.startsWith("en"))
                  .map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Speech Speed: {settings.voiceSpeed}</Label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={settings.voiceSpeed}
                onChange={(e) => handleSettingChange("voiceSpeed", Number.parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Volume: {Math.round(settings.voiceVolume * 100)}%</Label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.voiceVolume}
                onChange={(e) => handleSettingChange("voiceVolume", Number.parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <Button onClick={testVoice} variant="outline" className="w-full">
              <Volume2 className="h-4 w-4 mr-2" />
              Test Voice
            </Button>
          </div>

          {/* Voice Input Settings */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Voice Input
            </h3>

            <div className="flex items-center justify-between">
              <Label htmlFor="microphone">Enable microphone</Label>
              <Switch
                id="microphone"
                checked={settings.microphoneEnabled}
                onCheckedChange={(checked) => handleSettingChange("microphoneEnabled", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="autostop">Auto-stop after 30 seconds</Label>
              <Switch
                id="autostop"
                checked={settings.autoStopListening}
                onCheckedChange={(checked) => handleSettingChange("autoStopListening", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Confidence Threshold: {Math.round(settings.confidenceThreshold * 100)}%</Label>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.1"
                value={settings.confidenceThreshold}
                onChange={(e) => handleSettingChange("confidenceThreshold", Number.parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-600">Lower values accept less accurate speech recognition</p>
            </div>
          </div>

          {/* Language Support Info */}
          <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <h4 className="font-medium text-sm mb-2">Language Support</h4>
            <div className="flex flex-wrap gap-1">
              {["English", "Filipino", "Thai", "Vietnamese", "Indonesian", "Malay"].map((lang) => (
                <Badge key={lang} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-2">Speech recognition quality may vary by language and browser</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
