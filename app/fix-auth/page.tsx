"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function FixAuthPage() {
  const [isFixing, setIsFixing] = useState(false)
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const fixEmailConfirmation = async () => {
    setIsFixing(true)
    setResult("")
    setError("")

    try {
      // Try to confirm the specific user
      const response = await fetch("/api/auth/confirm-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "rvillasencio@gmail.com" }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(
          "✅ Email confirmation has been disabled and your account has been activated! You can now sign in normally.",
        )
      } else {
        setError(`❌ Failed to fix: ${data.error}`)
      }
    } catch (error) {
      setError(`❌ Error: ${error}`)
    } finally {
      setIsFixing(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Fix Email Confirmation Issue</h1>

        <Card className="glass-effect border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Email Confirmation Fix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-500/20 bg-blue-500/10">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300">
                This will completely disable email confirmation and activate your account so you can sign in
                immediately.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <p className="text-gray-300">
                The "Email not confirmed" error occurs because Supabase requires email verification by default. This
                tool will:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Disable email confirmation for your account</li>
                <li>• Activate your account immediately</li>
                <li>• Allow you to sign in without email verification</li>
              </ul>

              <Button
                onClick={fixEmailConfirmation}
                disabled={isFixing}
                className="w-full gradient-red text-white hover:opacity-90 font-semibold"
              >
                {isFixing ? "Fixing..." : "Fix Email Confirmation Issue"}
              </Button>

              {result && (
                <Alert className="border-green-500/20 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300">{result}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gray-300">
              <p>After running the fix:</p>
              <ol className="space-y-2 ml-4">
                <li>1. Go back to the sign-in page</li>
                <li>2. Enter your email and password</li>
                <li>3. You should be able to sign in without any "Email not confirmed" errors</li>
              </ol>
              <div className="mt-4 p-3 bg-gray-800 rounded">
                <p className="text-sm">
                  <strong>Email:</strong> rvillasencio@gmail.com
                  <br />
                  <strong>Status:</strong> Will be confirmed after running the fix
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
