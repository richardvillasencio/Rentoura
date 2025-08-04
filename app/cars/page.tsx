import { Suspense } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import CarGrid from "@/components/cars/car-grid"
import SearchFilters from "@/components/cars/search-filters"
import { getCars } from "@/lib/api/cars"
import type { SearchFilters as SearchFiltersType } from "@/lib/types"

interface CarsPageProps {
  searchParams: SearchFiltersType
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const cars = await getCars(searchParams)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Luxury Car Rentals</h1>
            <p className="text-xl text-gray-300">Discover premium vehicles from trusted hosts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SearchFilters />
            </div>
            <div className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="glass-effect rounded-2xl h-96 animate-pulse" />
                    ))}
                  </div>
                }
              >
                <CarGrid cars={cars} />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
