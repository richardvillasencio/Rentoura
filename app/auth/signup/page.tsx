"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  // Enhanced email validation
  const isValidEmail = (email: string) => {
    const trimmedEmail = email.trim().toLowerCase()
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return (
      emailRegex.test(trimmedEmail) &&
      !trimmedEmail.includes("..") &&
      !trimmedEmail.startsWith(".") &&
      !trimmedEmail.endsWith(".")
    )
  }

  // Memoized validation status
  const validationStatus = useMemo(() => {
    const hasName = name.trim().length >= 2
    const hasValidEmail = email.trim() && isValidEmail(email)
    const hasValidPassword = password.length >= 6
    const passwordsMatch = password === confirmPassword
    const termsAccepted = acceptTerms

    return {
      hasName,
      hasValidEmail,
      hasValidPassword,
      passwordsMatch,
      termsAccepted,
      isValid: hasName && hasValidEmail && hasValidPassword && passwordsMatch && termsAccepted,
    }
  }, [name, email, password, confirmPassword, acceptTerms])

  const validateForm = () => {
    console.log("Validating form:", { name, email, password, confirmPassword, acceptTerms })

    if (!name.trim()) {
      setError("Please enter your full name")
      return false
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long")
      return false
    }

    if (!email.trim()) {
      setError("Please enter your email address")
      return false
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g., yourname@gmail.com)")
      return false
    }

    if (!password) {
      setError("Please enter a password")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return false
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")

    setError("")
    setSuccess(false)

    if (!validateForm()) {
      console.log("Form validation failed")
      return
    }

    console.log("Form validation passed, attempting signup")
    setIsLoading(true)

    try {
      const { error } = await signUp(email.trim().toLowerCase(), password, name.trim())

      if (error) {
        console.error("Signup error:", error)
        setError(error)
        setIsLoading(false)
      } else {
        console.log("Signup successful")
        setSuccess(true)
        toast({
          title: "Account created successfully!",
          description: "Welcome to RenToura! You're now signed in.",
        })

        // Redirect to dashboard after successful signup
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (error) {
      console.error("Unexpected signup error:", error)
      setError("An unexpected error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          <Card className="glass-effect border-gray-700">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to RenToura!</h2>
              <p className="text-gray-400 mb-4">
                Your account has been created successfully. You're now signed in and ready to explore luxury cars.
              </p>
              <Button
                className="gradient-red text-white hover:opacity-90 font-semibold"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Car className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold gradient-red bg-clip-text text-transparent">RenToura</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join the luxury car rental community</p>
        </div>

        <Card className="glass-effect border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
            <CardDescription className="text-gray-400">
              Create your account and start renting luxury cars instantly
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Email Format Info */}
            <Alert className="mb-4 border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-300">
                <strong>Email Tips:</strong> Use common domains like @gmail.com, @yahoo.com, or @outlook.com for best
                results. Avoid test emails like test@gmail.com as they may be rejected.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                    {error.includes("already exists") && (
                      <div className="mt-2">
                        <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 underline">
                          Sign in to your existing account
                        </Link>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isLoading}
                    minLength={2}
                  />
                </div>
                {name && !validationStatus.hasName && (
                  <p className="text-xs text-red-400">Name must be at least 2 characters</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isLoading}
                  />
                </div>
                {email && !validationStatus.hasValidEmail && (
                  <p className="text-xs text-red-400">Please enter a valid email address</p>
                )}
                <p className="text-xs text-gray-500">
                  Recommended: Use your real email with @gmail.com, @yahoo.com, or @outlook.com
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    required
                    minLength={6}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {password && !validationStatus.hasValidPassword && (
                  <p className="text-xs text-red-400">Password must be at least 6 characters</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {confirmPassword && !validationStatus.passwordsMatch && (
                  <p className="text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                  className="border-gray-700"
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-red-500 hover:text-red-400">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-red-500 hover:text-red-400">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full gradient-red text-white hover:opacity-90 font-semibold"
                disabled={isLoading || !validationStatus.isValid}
              >
                {isLoading ? "Creating account..." : "Create Account & Sign In"}
              </Button>

              {/* Validation status */}
              <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-800 rounded">
                <p className="mb-1">Form Status:</p>
                <div className="flex items-center space-x-4">
                  <span>Name: {validationStatus.hasName ? "✅" : "❌"}</span>
                  <span>Email: {validationStatus.hasValidEmail ? "✅" : "❌"}</span>
                  <span>Password: {validationStatus.hasValidPassword ? "✅" : "❌"}</span>
                  <span>Match: {validationStatus.passwordsMatch ? "✅" : "❌"}</span>
                  <span>Terms: {validationStatus.termsAccepted ? "✅" : "❌"}</span>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-red-500 hover:text-red-400 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
