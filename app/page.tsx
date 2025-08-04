import { Suspense } from "react"
import Hero from "@/components/home/hero"
import SearchSection from "@/components/home/search-section"
import FeaturedVehicles from "@/components/home/featured-vehicles"
import BenefitsSection from "@/components/home/benefits-section"
import HowItWorks from "@/components/home/how-it-works"
import Testimonials from "@/components/home/testimonials"
import CallToAction from "@/components/home/call-to-action"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { getCars } from "@/lib/api/cars"

export default async function HomePage() {
  // Always use try-catch and provide fallback
  let featuredCars = []

  try {
    featuredCars = await getCars({ limit: 6, featured: true })
  } catch (error) {
    console.error("Failed to fetch cars:", error)
    // The API will return fallback data, so this should still work
    featuredCars = []
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <Hero />
        <SearchSection />
        <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse rounded-2xl mx-4" />}>
          <FeaturedVehicles cars={featuredCars} />
        </Suspense>
        <BenefitsSection />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
