import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Book, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50/30 via-learning-50/20 to-creative-50/30 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
          <p className="text-gray-600">Get help with SEA Bridge platform</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Common Issues
              </CardTitle>
              <CardDescription>Frequently asked questions and solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Authentication Problems</h4>
                <p className="text-sm text-gray-600">Try using the demo credentials: demo@example.com / demo123</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Page Not Loading</h4>
                <p className="text-sm text-gray-600">Clear your browser cache and refresh the page</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Features Not Working</h4>
                <p className="text-sm text-gray-600">Some features require Azure services configuration</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Us
              </CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="mailto:support@seabridge.edu">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Link>
              </Button>
              <div className="text-center">
                <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Demo Information</CardTitle>
            <CardDescription>Test the platform with these demo credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Demo User Account</h4>
              <p className="text-sm text-blue-800">Email: demo@example.com</p>
              <p className="text-sm text-blue-800">Password: demo123</p>
              <p className="text-xs text-blue-600 mt-2">This account has full access to all demo features</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
