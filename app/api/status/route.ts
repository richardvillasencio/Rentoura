import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase.from("cars").select("count").limit(1)

    if (error) {
      return NextResponse.json({
        status: "error",
        message: "Database tables not found. Please run the initialization script.",
        error: error.message,
        database_ready: false,
      })
    }

    return NextResponse.json({
      status: "success",
      message: "Database is connected and ready",
      database_ready: true,
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to database",
      error: error instanceof Error ? error.message : "Unknown error",
      database_ready: false,
    })
  }
}
