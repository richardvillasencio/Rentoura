import { notFound } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import CarDetailContent from "@/components/cars/car-detail-content"
import { getCarById } from "@/lib/api/cars"

interface CarDetailPageProps {
  params: {
    id: string
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const car = await getCarById(params.id)

  if (!car) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <CarDetailContent car={car} />
      </main>
      <Footer />
    </div>
  )
}
