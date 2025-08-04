"use client"
import { useAuth as useAuthProvider } from "@/components/providers/auth-provider"

export function useAuth() {
  return useAuthProvider()
}
