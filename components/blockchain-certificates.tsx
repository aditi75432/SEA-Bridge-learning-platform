"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Award, Download, Share2, ExternalLink, CheckCircle, Clock, Globe, Fingerprint } from "lucide-react"
import { useLanguage } from "./language-provider"
import { useCulturalContext } from "./cultural-context-provider"

interface BlockchainCertificate {
  id: string
  title: string
  description: string
  issuer: string
  recipientName: string
  recipientId: string
  issuedDate: Date
  blockchainHash: string
  transactionId: string
  network: "Polygon" | "Ethereum" | "BSC"
  status: "pending" | "confirmed" | "verified"
  skills: string[]
  culturalContext: string
  language: string
  credentialType: "course_completion" | "skill_mastery" | "cultural_competency" | "peer_recognition"
  verificationUrl: string
  ipfsHash: string
}

export function BlockchainCertificates() {
  const { currentLanguage } = useLanguage()
  const { profile } = useCulturalContext()
  const [certificates, setCertificates] = useState<BlockchainCertificate[]>([
    {
      id: "1",
      title: "AI Fundamentals Mastery",
      description: "Completed comprehensive AI course with cultural adaptation for Southeast Asia",
      issuer: "SEA Bridge Academy",
      recipientName: "Maria Santos",
      recipientId: "user_12345",
      issuedDate: new Date("2024-01-20"),
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
      transactionId: "0xabcdef1234567890abcdef1234567890abcdef12",
      network: "Polygon",
      status: "verified",
      skills: ["Machine Learning", "Neural Networks", "AI Ethics", "Cultural AI"],
      culturalContext: "Philippines",
      language: "Filipino",
      credentialType: "course_completion",
      verificationUrl: "https://verify.seabridge.edu/cert/1",
      ipfsHash: "QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T",
    },
    {
      id: "2",
      title: "Cultural Heritage Preservation",
      description: "Demonstrated expertise in digital preservation of SEA cultural artifacts",
      issuer: "ASEAN Cultural Institute",
      recipientName: "Maria Santos",
      recipientId: "user_12345",
      issuedDate: new Date("2024-01-15"),
      blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234",
      transactionId: "0xbcdef1234567890abcdef1234567890abcdef123",
      network: "Ethereum",
      status: "confirmed",
      skills: ["Digital Archiving", "Cultural Analysis", "Heritage Documentation"],
      culturalContext: "Southeast Asia",
      language: "English",
      credentialType: "cultural_competency",
      verificationUrl: "https://verify.seabridge.edu/cert/2",
      ipfsHash: "QmY2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U",
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)
  const [verificationId, setVerificationId] = useState("")

  const generateCertificate = async (courseId: string, skills: string[]) => {
    setIsGenerating(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newCert: BlockchainCertificate = {
      id: Date.now().toString(),
      title: "New Course Completion",
      description: "Successfully completed advanced learning module",
      issuer: "SEA Bridge Academy",
      recipientName: profile.name || "Student",
      recipientId: "user_12345",
      issuedDate: new Date(),
      blockchainHash: "0x" + Math.random().toString(16).substr(2, 40),
      transactionId: "0x" + Math.random().toString(16).substr(2, 40),
      network: "Polygon",
      status: "pending",
      skills,
      culturalContext: profile.country,
      language: currentLanguage.code,
      credentialType: "course_completion",
      verificationUrl: `https://verify.seabridge.edu/cert/${Date.now()}`,
      ipfsHash: "Qm" + Math.random().toString(36).substr(2, 44),
    }

    setCertificates((prev) => [newCert, ...prev])
    setIsGenerating(false)
  }

  const verifyCertificate = async (certId: string) => {
    // Simulate verification process
    const cert = certificates.find((c) => c.id === certId)
    if (cert) {
      window.open(cert.verificationUrl, "_blank")
    }
  }

  const shareCertificate = async (cert: BlockchainCertificate) => {
    if (navigator.share) {
      await navigator.share({
        title: cert.title,
        text: `I've earned a blockchain-verified certificate: ${cert.title}`,
        url: cert.verificationUrl,
      })
    } else {
      navigator.clipboard.writeText(cert.verificationUrl)
    }
  }

  const downloadCertificate = (cert: BlockchainCertificate) => {
    // Generate and download certificate PDF
    const link = document.createElement("a")
    link.href = `data:application/pdf;base64,${btoa("Mock PDF content")}`
    link.download = `${cert.title.replace(/\s+/g, "_")}_Certificate.pdf`
    link.click()
  }

  const getNetworkColor = (network: string) => {
    switch (network) {
      case "Ethereum":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Polygon":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "BSC":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-forest/10 text-forest border-forest/20"
      case "confirmed":
        return "bg-primary/10 text-primary border-primary/20"
      case "pending":
        return "bg-accent/10 text-accent border-accent/20"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Blockchain Certificates</h2>
          <p className="text-gray-600">Verifiable, tamper-proof credentials recognized across SEA</p>
        </div>
        <Button
          onClick={() => generateCertificate("demo", ["Demo Skill"])}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          {isGenerating ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Award className="h-4 w-4 mr-2" />
              Generate Certificate
            </>
          )}
        </Button>
      </div>

      {/* Certificate Verification */}
      <Card className="border-2 border-secondary/20 bg-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            Verify Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter certificate ID or blockchain hash"
              value={verificationId}
              onChange={(e) => setVerificationId(e.target.value)}
            />
            <Button variant="outline">
              <Fingerprint className="h-4 w-4 mr-2" />
              Verify
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            All certificates are stored on blockchain for permanent verification and cannot be forged.
          </p>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="border-2 border-transparent hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight">{cert.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(cert.status)}>
                      {cert.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {cert.status === "confirmed" && <Clock className="h-3 w-3 mr-1" />}
                      {cert.status === "pending" && <Clock className="h-3 w-3 mr-1 animate-spin" />}
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getNetworkColor(cert.network)}>
                      {cert.network}
                    </Badge>
                  </div>
                </div>
                <div className="text-4xl">
                  {cert.credentialType === "course_completion" && "🎓"}
                  {cert.credentialType === "skill_mastery" && "⚡"}
                  {cert.credentialType === "cultural_competency" && "🌏"}
                  {cert.credentialType === "peer_recognition" && "🤝"}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>

              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Issued by:</span> {cert.issuer}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Date:</span> {cert.issuedDate.toLocaleDateString()}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Cultural Context:</span> {cert.culturalContext}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Skills Verified:</div>
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500">
                  <div>Hash: {cert.blockchainHash.slice(0, 20)}...</div>
                  <div>IPFS: {cert.ipfsHash.slice(0, 20)}...</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => verifyCertificate(cert.id)} className="flex-1">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Verify
                </Button>
                <Button size="sm" variant="outline" onClick={() => downloadCertificate(cert)}>
                  <Download className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => shareCertificate(cert)}>
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Blockchain Info */}
      <Card className="border-2 border-forest/20 bg-forest/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-forest" />
            Why Blockchain Certificates?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <Shield className="h-8 w-8 mx-auto text-forest" />
              <h4 className="font-medium">Tamper-Proof</h4>
              <p className="text-sm text-gray-600">Cannot be forged or altered</p>
            </div>
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 mx-auto text-primary" />
              <h4 className="font-medium">Global Recognition</h4>
              <p className="text-sm text-gray-600">Accepted across SEA institutions</p>
            </div>
            <div className="text-center space-y-2">
              <CheckCircle className="h-8 w-8 mx-auto text-secondary" />
              <h4 className="font-medium">Instant Verification</h4>
              <p className="text-sm text-gray-600">Verify anywhere, anytime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
