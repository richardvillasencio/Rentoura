"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, MapPin, Users, Fuel, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const featuredCars = [
  {
    id: 1,
    title: "Ferrari F8 Tributo",
    image: "/ferrari-f8-tributo-black.png",
    price: 899,
    location: "Beverly Hills, CA",
    rating: 4.9,
    reviews: 127,
    seats: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    type: "Sports Car",
    host: "Premium Motors",
  },
  {
    id: 2,
    title: "Lamborghini Huracán",
    image: "/orange-huracan.png",
    price: 1299,
    location: "Miami, FL",
    rating: 4.8,
    reviews: 89,
    seats: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    type: "Sports Car",
    host: "Exotic Rentals",
  },
  {
    id: 3,
    title: "Porsche 911 Turbo S",
    image: "/white-porsche-911-turbo-s.png",
    price: 749,
    location: "Los Angeles, CA",
    rating: 4.9,
    reviews: 156,
    seats: 4,
    transmission: "Automatic",
    fuel: "Gasoline",
    type: "Sports Car",
    host: "Luxury Drive",
  },
  {
    id: 4,
    title: "McLaren 720S",
    image: "/blue-mclaren-720s.png",
    price: 1599,
    location: "Las Vegas, NV",
    rating: 4.7,
    reviews: 73,
    seats: 2,
    transmission: "Automatic",
    fuel: "Gasoline",
    type: "Sports Car",
    host: "Elite Motors",
  },
]

export default function FeaturedVehicles() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCars.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCars.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCars.length) % featuredCars.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-300 border-blue-500/30">
            Premium Collection
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="hero-text">Featured </span>
            <span className="accent-text">Vehicles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles, from exotic supercars to luxury sedans
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredCars.map((car, index) => (
                <div key={car.id} className="w-full flex-shrink-0">
                  <div className="modern-card mx-4 overflow-hidden bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative h-80 md:h-96 overflow-hidden">
                        <Image
                          src={car.image || "/placeholder.svg"}
                          alt={car.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0">
                            {car.type}
                          </Badge>
                          <Badge className="bg-black/60 text-white border-0 backdrop-blur-sm">Featured</Badge>
                        </div>

                        {/* Host Badge */}
                        <div className="absolute bottom-6 left-6">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                            <span className="text-white text-sm font-medium">{car.host}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-white mb-2">{car.title}</h3>
                          <div className="flex items-center text-gray-300 mb-4">
                            <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                            <span>{car.location}</span>
                          </div>

                          <div className="flex items-center space-x-1 mb-6">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="text-white font-medium">{car.rating}</span>
                            <span className="text-gray-400">({car.reviews} reviews)</span>
                          </div>
                        </div>

                        {/* Specifications */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="text-center">
                            <Users className="h-5 w-5 text-green-400 mx-auto mb-1" />
                            <span className="text-sm text-gray-300">{car.seats} Seats</span>
                          </div>
                          <div className="text-center">
                            <Settings className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                            <span className="text-sm text-gray-300">{car.transmission}</span>
                          </div>
                          <div className="text-center">
                            <Fuel className="h-5 w-5 text-purple-400 mx-auto mb-1" />
                            <span className="text-sm text-gray-300">{car.fuel}</span>
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                              ${car.price}
                            </span>
                            <span className="text-gray-400 ml-2">per day</span>
                          </div>
                          <Link href={`/cars/${car.id}`}>
                            <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 rounded-full text-white z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {featuredCars.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-green-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/cars">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent backdrop-blur-sm px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              View All Vehicles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
