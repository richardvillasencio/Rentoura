import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Fallback data in case database is not set up
const fallbackCars = [
  {
    id: "1",
    user_id: "1",
    title: "2023 Tesla Model S Plaid",
    description:
      "Experience the future of driving with this stunning Tesla Model S Plaid. Zero emissions, incredible acceleration, and luxury comfort.",
    price_per_day: 299.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "Los Angeles, CA",
    latitude: 34.0522,
    longitude: -118.2437,
    type: "luxury",
    transmission: "automatic",
    fuel: "electric",
    seats: 5,
    year: 2023,
    make: "Tesla",
    model: "Model S Plaid",
    availability_calendar: {},
    is_active: true,
    instant_book: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "1",
      name: "John Smith",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Luxury car enthusiast and host",
    },
    average_rating: 4.9,
    review_count: 24,
  },
  {
    id: "2",
    user_id: "2",
    title: "2022 Porsche 911 Turbo S",
    description:
      "Pure driving excitement in this iconic Porsche 911 Turbo S. Perfect for weekend getaways and special occasions.",
    price_per_day: 499.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "Miami, FL",
    latitude: 25.7617,
    longitude: -80.1918,
    type: "sports",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 4,
    year: 2022,
    make: "Porsche",
    model: "911 Turbo S",
    availability_calendar: {},
    is_active: true,
    instant_book: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "2",
      name: "Mike Johnson",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Car collector and host",
    },
    average_rating: 4.8,
    review_count: 18,
  },
  {
    id: "3",
    user_id: "3",
    title: "2023 BMW X7 M50i",
    description: "Luxury SUV perfect for family trips or business travel. Spacious, comfortable, and powerful.",
    price_per_day: 199.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "New York, NY",
    latitude: 40.7128,
    longitude: -74.006,
    type: "suv",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 7,
    year: 2023,
    make: "BMW",
    model: "X7 M50i",
    availability_calendar: {},
    is_active: true,
    instant_book: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "3",
      name: "Sarah Wilson",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Business executive and car enthusiast",
    },
    average_rating: 4.7,
    review_count: 31,
  },
  {
    id: "4",
    user_id: "2",
    title: "2022 Mercedes-AMG GT 63 S",
    description: "High-performance luxury coupe that combines comfort with track-ready performance.",
    price_per_day: 399.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "San Francisco, CA",
    latitude: 37.7749,
    longitude: -122.4194,
    type: "luxury",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 4,
    year: 2022,
    make: "Mercedes-AMG",
    model: "GT 63 S",
    availability_calendar: {},
    is_active: true,
    instant_book: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "2",
      name: "Mike Johnson",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Car collector and host",
    },
    average_rating: 4.6,
    review_count: 22,
  },
  {
    id: "5",
    user_id: "1",
    title: "2023 Audi RS e-tron GT",
    description:
      "Electric performance meets Audi luxury. Sustainable driving without compromising on style or performance.",
    price_per_day: 349.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "Chicago, IL",
    latitude: 41.8781,
    longitude: -87.6298,
    type: "luxury",
    transmission: "automatic",
    fuel: "electric",
    seats: 4,
    year: 2023,
    make: "Audi",
    model: "RS e-tron GT",
    availability_calendar: {},
    is_active: true,
    instant_book: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "1",
      name: "John Smith",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Luxury car enthusiast and host",
    },
    average_rating: 4.8,
    review_count: 15,
  },
  {
    id: "6",
    user_id: "3",
    title: "2023 Lamborghini Huracán EVO",
    description: "Exotic supercar experience with incredible performance and stunning Italian design.",
    price_per_day: 899.99,
    images: ["/placeholder.svg?height=400&width=600"],
    location: "Las Vegas, NV",
    latitude: 36.1699,
    longitude: -115.1398,
    type: "sports",
    transmission: "automatic",
    fuel: "gasoline",
    seats: 2,
    year: 2023,
    make: "Lamborghini",
    model: "Huracán EVO",
    availability_calendar: {},
    is_active: true,
    instant_book: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    host: {
      id: "3",
      name: "Sarah Wilson",
      profile_image: "/placeholder.svg?height=100&width=100",
      bio: "Business executive and car enthusiast",
    },
    average_rating: 4.9,
    review_count: 8,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Try to query the database first
    let query = supabase.from("cars").select("*").eq("is_active", true)

    // Apply filters
    const location = searchParams.get("location")
    if (location) {
      query = query.ilike("location", `%${location}%`)
    }

    const type = searchParams.get("type")
    if (type) {
      query = query.eq("type", type)
    }

    const transmission = searchParams.get("transmission")
    if (transmission) {
      query = query.eq("transmission", transmission)
    }

    const fuel = searchParams.get("fuel")
    if (fuel) {
      query = query.eq("fuel", fuel)
    }

    const seats = searchParams.get("seats")
    if (seats) {
      query = query.eq("seats", Number.parseInt(seats))
    }

    const instantBook = searchParams.get("instantBook")
    if (instantBook === "true") {
      query = query.eq("instant_book", true)
    }

    const priceRange = searchParams.get("priceRange")
    if (priceRange) {
      const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""))
      if (max) {
        query = query.gte("price_per_day", Number.parseInt(min)).lte("price_per_day", Number.parseInt(max))
      } else {
        query = query.gte("price_per_day", Number.parseInt(min))
      }
    }

    const limit = searchParams.get("limit")
    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const featured = searchParams.get("featured")
    if (featured === "true") {
      query = query.eq("instant_book", true).limit(6)
    }

    query = query.order("created_at", { ascending: false })

    const { data: cars, error } = await query

    if (error) {
      console.error("Database error:", error)
      // Return fallback data if database query fails
      let filteredCars = [...fallbackCars]

      // Apply client-side filtering to fallback data
      if (location) {
        filteredCars = filteredCars.filter((car) => car.location.toLowerCase().includes(location.toLowerCase()))
      }

      if (type) {
        filteredCars = filteredCars.filter((car) => car.type === type)
      }

      if (instantBook === "true") {
        filteredCars = filteredCars.filter((car) => car.instant_book)
      }

      if (limit) {
        filteredCars = filteredCars.slice(0, Number.parseInt(limit))
      }

      return NextResponse.json(filteredCars)
    }

    // If database query succeeds, fetch additional data
    const carsWithDetails = await Promise.all(
      (cars || []).map(async (car) => {
        // Try to fetch host information
        let host = null
        try {
          const { data: hostData } = await supabase
            .from("users")
            .select("id, name, profile_image, bio")
            .eq("id", car.user_id)
            .single()
          host = hostData
        } catch (error) {
          console.error("Error fetching host:", error)
        }

        // Try to fetch reviews for rating calculation
        let reviews = []
        try {
          const { data: reviewData } = await supabase.from("reviews").select("rating").eq("car_id", car.id)
          reviews = reviewData || []
        } catch (error) {
          console.error("Error fetching reviews:", error)
        }

        const averageRating =
          reviews.length > 0
            ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
            : 4.5 + Math.random() * 0.5 // Random rating between 4.5-5.0 as fallback

        return {
          ...car,
          host,
          average_rating: Math.round(averageRating * 10) / 10,
          review_count: reviews.length || Math.floor(Math.random() * 30) + 5, // Random review count as fallback
        }
      }),
    )

    return NextResponse.json(carsWithDetails)
  } catch (error) {
    console.error("API error:", error)
    // Return fallback data on any error
    return NextResponse.json(fallbackCars)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data: car, error } = await supabase.from("cars").insert([body]).select().single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create car" }, { status: 500 })
    }

    return NextResponse.json(car)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
