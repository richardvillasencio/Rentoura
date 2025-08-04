"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Star,
  MapPin,
  Zap,
  Users,
  Heart,
  Share2,
  Shield,
  Fuel,
  Settings,
  CalendarIcon,
  MessageSquare,
  Phone,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Car } from "@/lib/types"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/hooks/use-toast"

interface CarDetailContentProps {
  car: Car
}

export default function CarDetailContent({ car }: CarDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [isFavorited, setIsFavorited] = useState(false)
  const { user } = useAuth()

  const handleBooking = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book this car",
        variant: "destructive",
      })
      return
    }

    if (!startDate || !endDate) {
      toast({
        title: "Select dates",
        description: "Please select your rental dates",
        variant: "destructive",
      })
      return
    }

    // Calculate total days and price
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = days * car.price_per_day

    toast({
      title: "Booking initiated",
      description: `Total: $${totalPrice.toFixed(2)} for ${days} days`,
    })
  }

  const handleFavorite = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
        variant: "destructive",
      })
      return
    }

    setIsFavorited(!isFavorited)
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Car removed from your favorites" : "Car saved to your favorites",
    })
  }

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    return days * car.price_per_day
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="relative">
              <Image
                src={car.images[selectedImage] || "/placeholder.svg?height=500&width=800&query=luxury+car"}
                alt={car.title}
                width={800}
                height={500}
                className="w-full h-96 object-cover rounded-2xl"
              />

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70 text-white"
                  onClick={handleFavorite}
                >
                  <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {car.instant_book && (
                  <Badge className="bg-[#d4af37] text-black">
                    <Zap className="h-3 w-3 mr-1" />
                    Instant Book
                  </Badge>
                )}
                <Badge variant="secondary" className="bg-black/50 text-white capitalize">
                  {car.type}
                </Badge>
              </div>
            </div>

            {/* Thumbnail Images */}
            {car.images.length > 1 && (
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-[#d4af37]" : "border-gray-700",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=80&width=80&query=luxury+car"}
                      alt={`${car.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-effect rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{car.title}</h1>
                <div className="flex items-center text-gray-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{car.location}</span>
                </div>
                {car.average_rating && car.review_count && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-red-500 fill-current" />
                    <span className="text-white font-semibold">{car.average_rating}</span>
                    <span className="text-gray-400">({car.review_count} reviews)</span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-red-500">${car.price_per_day}</div>
                <div className="text-gray-400">per day</div>
              </div>
            </div>

            {/* Car Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="h-5 w-5 text-red-500" />
                <span>{car.seats} seats</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Settings className="h-5 w-5 text-red-500" />
                <span className="capitalize">{car.transmission}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Fuel className="h-5 w-5 text-red-500" />
                <span className="capitalize">{car.fuel}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-5 w-5 text-red-500" />
                <span>Insured</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>
          </motion.div>

          {/* Host Information */}
          {car.host && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-effect rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Meet Your Host</h3>
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={car.host.profile_image || "/placeholder.svg"} alt={car.host.name} />
                  <AvatarFallback className="bg-red-500 text-white text-lg">
                    {car.host.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{car.host.name}</h4>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 text-red-500 fill-current" />
                    <span className="text-white">4.9</span>
                    <span className="text-gray-400">(127 reviews)</span>
                  </div>
                  {car.host.bio && <p className="text-gray-300 mb-4">{car.host.bio}</p>}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="sticky top-24"
          >
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Book This Car</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white",
                            !startDate && "text-gray-400",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MMM dd") : "Select"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                          className="text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white",
                            !endDate && "text-gray-400",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MMM dd") : "Select"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                          className="text-white"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Price Breakdown */}
                {startDate && endDate && (
                  <div className="space-y-2 pt-4 border-t border-gray-700">
                    <div className="flex justify-between text-gray-300">
                      <span>
                        ${car.price_per_day}/day ×{" "}
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Service fee</span>
                      <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700">
                      <span>Total</span>
                      <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <Button
                  onClick={handleBooking}
                  className="w-full gradient-red text-white hover:opacity-90 font-semibold py-3"
                  disabled={!startDate || !endDate}
                >
                  {car.instant_book ? "Book Instantly" : "Request to Book"}
                </Button>

                <p className="text-xs text-gray-400 text-center">You won't be charged yet</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
