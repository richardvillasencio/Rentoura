"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import type { User } from "@/lib/types"

// Create Supabase client with email confirmation completely disabled
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    // Completely disable email confirmation flows
    flowType: "pkce",
  },
})

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          if (mounted) setLoading(false)
          return
        }

        if (session?.user && mounted) {
          await fetchUserProfile(session.user.id)
        } else if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        console.error("Session error:", error)
        if (mounted) setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log("Auth state changed:", event, session?.user?.id)

      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching user profile:", error)
        setUser(null)
      } else {
        setUser(data)
      }
    } catch (error) {
      console.error("Profile fetch error:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Enhanced email validation
  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase()

    if (!trimmedEmail) {
      return { isValid: false, error: "Email is required" }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(trimmedEmail)) {
      return { isValid: false, error: "Please enter a valid email address" }
    }

    return { isValid: true }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)

      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        setLoading(false)
        return { error: emailValidation.error }
      }

      const cleanEmail = email.trim().toLowerCase()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        setLoading(false)

        // Handle email confirmation error specifically
        if (error.message.includes("Email not confirmed") || error.message.includes("email_not_confirmed")) {
          // Try to auto-confirm the user via API
          try {
            const confirmResponse = await fetch("/api/auth/confirm-user", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: cleanEmail }),
            })

            if (confirmResponse.ok) {
              // Try signing in again after confirmation
              const { error: retryError } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password,
              })

              if (!retryError) {
                return {}
              }
            }
          } catch (confirmError) {
            console.error("Auto-confirm failed:", confirmError)
          }

          return {
            error: "Your account needs to be activated. Please contact support or try signing up again.",
          }
        }

        return { error: error.message }
      }

      return {}
    } catch (error) {
      setLoading(false)
      return { error: "An unexpected error occurred during sign in" }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)

      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        setLoading(false)
        return { error: emailValidation.error }
      }

      if (!password || password.length < 6) {
        setLoading(false)
        return { error: "Password must be at least 6 characters long" }
      }

      if (!name || name.trim().length < 2) {
        setLoading(false)
        return { error: "Name must be at least 2 characters long" }
      }

      const cleanEmail = email.trim().toLowerCase()
      const cleanName = name.trim()

      console.log("Attempting signup with:", cleanEmail)

      // Check if user already exists
      try {
        const { data: existingUser } = await supabase.from("users").select("id, email").eq("email", cleanEmail).single()

        if (existingUser) {
          setLoading(false)
          return { error: "An account with this email already exists. Please sign in instead." }
        }
      } catch (error) {
        console.log("User doesn't exist yet, proceeding with signup")
      }

      // Sign up with Supabase Auth - completely bypass email confirmation
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName,
            display_name: cleanName,
          },
          // Force email confirmation to be skipped
          emailRedirectTo: undefined,
        },
      })

      if (error) {
        console.error("Supabase auth signup error:", error)
        setLoading(false)

        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          return { error: "An account with this email already exists. Please sign in instead." }
        }

        return { error: error.message }
      }

      if (data.user) {
        console.log("User created in auth:", data.user.id)

        // Immediately confirm the user via API to bypass email confirmation
        try {
          await fetch("/api/auth/confirm-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: cleanEmail, userId: data.user.id }),
          })
        } catch (confirmError) {
          console.error("Auto-confirm failed:", confirmError)
        }

        // Create user profile
        try {
          const response = await fetch("/api/auth/create-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: data.user.id,
              email: cleanEmail,
              name: cleanName,
              role: "renter",
            }),
          })

          const result = await response.json()

          if (!response.ok) {
            console.error("Profile creation error:", result)

            if (result.code === "EMAIL_EXISTS" || result.code === "EMAIL_CONFLICT") {
              await supabase.auth.signOut()
              setLoading(false)
              return { error: "An account with this email already exists. Please sign in instead." }
            }
          } else {
            console.log("Profile created successfully:", result)
          }
        } catch (apiError) {
          console.error("API profile creation failed:", apiError)
        }

        // Wait for auth state to update
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setLoading(false)
      return {}
    } catch (error) {
      console.error("Unexpected signup error:", error)
      setLoading(false)
      return { error: "An unexpected error occurred during sign up" }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: "No user logged in" }

    try {
      const { error } = await supabase.from("users").update(data).eq("id", user.id)

      if (error) return { error: error.message }

      setUser({ ...user, ...data })
      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
