"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function TestAuthPage() {
  const { user, loading, signUp, signIn, signOut } = useAuth()
  const [testEmail] = useState("test@example.com")
  const [testPassword] = useState("testpassword123")
  const [testName] = useState("Test User")

  const handleTestSignUp = async () => {
    const { error } = await signUp(testEmail, testPassword, testName)
    if (error) {
      toast({
        title: "Sign Up Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Test account created successfully!",
      })
    }
  }

  const handleTestSignIn = async () => {
    const { error } = await signIn(testEmail, testPassword)
    if (error) {
      toast({
        title: "Sign In Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Signed in successfully!",
      })
    }
  }

  const handleSignOut = async () => {
    await signOut()
    toast({
      title: "Success",
      description: "Signed out successfully!",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Authentication Test</h1>

        <div className="grid gap-6">
          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Current User Status</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-2">
                  <p className="text-green-400">✅ Signed in as: {user.email}</p>
                  <p className="text-white">Name: {user.name}</p>
                  <p className="text-white">Role: {user.role}</p>
                  <p className="text-white">ID: {user.id}</p>
                  <Button onClick={handleSignOut} variant="outline" className="mt-4 bg-transparent">
                    Sign Out
                  </Button>
                </div>
              ) : (
                <p className="text-red-400">❌ Not signed in</p>
              )}
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-300 mb-2">Test Credentials:</p>
                <p className="text-sm text-gray-400">Email: {testEmail}</p>
                <p className="text-sm text-gray-400">Password: {testPassword}</p>
                <p className="text-sm text-gray-400">Name: {testName}</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleTestSignUp} className="gradient-red text-white">
                  Test Sign Up
                </Button>
                <Button
                  onClick={handleTestSignIn}
                  variant="outline"
                  className="border-red-500 text-red-500 bg-transparent"
                >
                  Test Sign In
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Environment Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
                </p>
                <p className="text-gray-300">
                  Supabase Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
