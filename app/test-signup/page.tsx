"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"

export default function TestSignupPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [name, setName] = useState("Test User")
  const [result, setResult] = useState("")
  const { signUp, user } = useAuth()

  const testSignup = async () => {
    setResult("Testing signup...")
    const { error } = await signUp(email, password, name)

    if (error) {
      setResult(`Error: ${error}`)
    } else {
      setResult("Success! Account created.")
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-md mx-auto">
        <Card className="glass-effect border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Test Signup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button onClick={testSignup} className="w-full gradient-red text-white">
              Test Signup
            </Button>

            {result && <div className="p-3 bg-gray-800 rounded text-white text-sm">{result}</div>}

            {user && <div className="p-3 bg-green-900 rounded text-white text-sm">Logged in as: {user.email}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
