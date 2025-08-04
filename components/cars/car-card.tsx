"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Zap, Users, Heart } from "lucide-react"
import { motion } from "framer-motion"
import type { Car } from "@/lib/types"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/favorites", {
        method: isFavorited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car_id: car.id }),
      })

      if (response.ok) {
        setIsFavorited(!isFavorited)
        toast({
          title: isFavorited ? "Removed from favorites" : "Added to favorites",
          description: isFavorited ? "Car removed from your favorites" : "Car saved to your favorites",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group">
      <Link href={`/cars/${car.id}`}>
        <div className="modern-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-white/10">
          <div className="relative overflow-hidden">
            <Image
              src={car.images[0] || "/placeholder.svg?height=300&width=400&query=luxury+sports+car"}
              alt={car.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {car.instant_book && (
                <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-lg">
                  <Zap className="h-3 w-3 mr-1" />
                  Instant Book
                </Badge>
              )}
              <Badge variant="secondary" className="bg-black/60 text-white capitalize border-0 backdrop-blur-sm">
                {car.type}
              </Badge>
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-10 w-10 p-0 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300"
              onClick={handleFavorite}
              disabled={isLoading}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </Button>

            {/* Host Avatar */}
            {car.host && (
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2 border border-white/20">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{car.host.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-white text-sm font-medium">{car.host.name}</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-green-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                {car.title}
              </h3>
              {car.average_rating && car.review_count && (
                <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">{car.average_rating}</span>
                  <span className="text-gray-400 text-sm">({car.review_count})</span>
                </div>
              )}
            </div>

            <div className="flex items-center text-gray-300">
              <MapPin className="h-4 w-4 mr-2 text-blue-400" />
              <span className="text-sm">{car.location}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-green-400" />
                  <span>{car.seats} seats</span>
                </div>
                <div className="capitalize">{car.transmission}</div>
                <div className="capitalize">{car.fuel}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  ${car.price_per_day}
                </span>
                <span className="text-gray-400 text-sm font-medium">per day</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
