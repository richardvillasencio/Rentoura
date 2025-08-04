import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, userId } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    console.log("Confirming user:", { email, userId })

    // Use the service role client to directly update the auth.users table
    const { data, error } = await supabase.auth.admin.updateUserById(userId || email, {
      email_confirm: true,
    })

    if (error) {
      console.error("Error confirming user:", error)

      // Fallback: try to update directly in the database
      try {
        const { error: dbError } = await supabase
          .from("auth.users")
          .update({
            email_confirmed_at: new Date().toISOString(),
            confirmed_at: new Date().toISOString(),
          })
          .eq("email", email)

        if (dbError) {
          console.error("Database update error:", dbError)
          return NextResponse.json({ error: "Failed to confirm user" }, { status: 500 })
        }
      } catch (dbError) {
        console.error("Database fallback failed:", dbError)
        return NextResponse.json({ error: "Failed to confirm user" }, { status: 500 })
      }
    }

    console.log("User confirmed successfully")
    return NextResponse.json({ success: true, message: "User confirmed successfully" })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
