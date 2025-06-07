"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home, LogIn } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const errorMessages = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification token has expired or has already been used.",
  Default: "An error occurred during authentication.",
  CredentialsSignin: "The credentials you provided are incorrect.",
  EmailCreateAccount: "Could not create an account with this email address.",
  EmailSignin: "Could not send the email with the magic link.",
  SessionRequired: "You must be signed in to access this page.",
  Callback: "An error occurred in the OAuth callback.",
  OAuthAccountNotLinked: "This account is already linked to another user.",
  OAuthCallback: "An error occurred during OAuth authentication.",
  OAuthCreateAccount: "Could not create OAuth account.",
  OAuthSignin: "An error occurred during OAuth sign in.",
  SigninEmailError: "Could not send sign in email.",
  SignupEmailError: "Could not send sign up email.",
}

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "Default"

  const errorMessage = errorMessages[error as keyof typeof errorMessages] || errorMessages.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50/30 via-learning-50/20 to-creative-50/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Authentication Error</CardTitle>
          <CardDescription className="text-gray-600">
            We encountered an issue while trying to authenticate you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
            {error !== "Default" && <p className="mt-2 text-xs text-red-600">Error code: {error}</p>}
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
            <p className="text-xs text-blue-700 mt-1">Email: demo@example.com</p>
            <p className="text-xs text-blue-700">Password: demo123</p>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/auth/signin">
                <LogIn className="mr-2 h-4 w-4" />
                Try Again
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link href="/support" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ErrorContent />
    </Suspense>
  )
}
