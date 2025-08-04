import type { Car, SearchFilters } from "@/lib/types"

const API_BASE_URL = "/api"

export async function getCars(filters?: SearchFilters & { limit?: number; featured?: boolean }): Promise<Car[]> {
  try {
    const params = new URLSearchParams()

    if (filters?.location) params.set("location", filters.location)
    if (filters?.startDate) params.set("startDate", filters.startDate)
    if (filters?.endDate) params.set("endDate", filters.endDate)
    if (filters?.type) params.set("type", filters.type)
    if (filters?.priceRange) params.set("priceRange", filters.priceRange)
    if (filters?.transmission) params.set("transmission", filters.transmission)
    if (filters?.fuel) params.set("fuel", filters.fuel)
    if (filters?.seats) params.set("seats", filters.seats.toString())
    if (filters?.instantBook) params.set("instantBook", "true")
    if (filters?.limit) params.set("limit", filters.limit.toString())
    if (filters?.featured) params.set("featured", "true")

    const response = await fetch(`${API_BASE_URL}/cars?${params.toString()}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch cars")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching cars:", error)
    return []
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching car:", error)
    return null
  }
}

export async function createCar(carData: Partial<Car>): Promise<Car | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })

    if (!response.ok) {
      throw new Error("Failed to create car")
    }

    return response.json()
  } catch (error) {
    console.error("Error creating car:", error)
    return null
  }
}

export async function updateCar(id: string, carData: Partial<Car>): Promise<Car | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })

    if (!response.ok) {
      throw new Error("Failed to update car")
    }

    return response.json()
  } catch (error) {
    console.error("Error updating car:", error)
    return null
  }
}

export async function deleteCar(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
      method: "DELETE",
    })

    return response.ok
  } catch (error) {
    console.error("Error deleting car:", error)
    return false
  }
}
