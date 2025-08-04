import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, email, name, role } = body

    if (!id || !email || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Creating user profile:", { id, email, name, role })

    // First, check if user already exists by ID or email
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .or(`id.eq.${id},email.eq.${email}`)
      .single()

    if (existingUser && !checkError) {
      console.log("User already exists:", existingUser)

      // If the existing user has the same ID, just return it
      if (existingUser.id === id) {
        return NextResponse.json(existingUser)
      }

      // If different ID but same email, this is a conflict
      if (existingUser.email === email && existingUser.id !== id) {
        return NextResponse.json(
          {
            error: "Email already registered with different account",
            code: "EMAIL_CONFLICT",
          },
          { status: 409 },
        )
      }
    }

    // Try to create new user
    const { data: user, error } = await supabase
      .from("users")
      .insert([
        {
          id,
          email,
          name,
          role: role || "renter",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)

      // Handle specific error codes
      if (error.code === "23505") {
        // Unique constraint violation - try to fetch the existing user
        console.log("Unique constraint violation, fetching existing user")

        const { data: existingUserRetry, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", id)
          .single()

        if (!fetchError && existingUserRetry) {
          console.log("Found existing user:", existingUserRetry)
          return NextResponse.json(existingUserRetry)
        }

        // If we can't find by ID, try by email
        const { data: existingByEmail, error: emailFetchError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single()

        if (!emailFetchError && existingByEmail) {
          return NextResponse.json(
            {
              error: "Email already registered",
              code: "EMAIL_EXISTS",
            },
            { status: 409 },
          )
        }
      }

      return NextResponse.json(
        {
          error: "Failed to create user profile",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      )
    }

    console.log("User profile created successfully:", user)
    return NextResponse.json(user)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
