"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Car, Search, Filter, Star } from "lucide-react"

export default function SearchSection() {
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    carType: "",
  })

  const popularLocations = [
    { name: "San Francisco", count: "2,847 cars" },
    { name: "Los Angeles", count: "3,291 cars" },
    { name: "New York", count: "4,156 cars" },
    { name: "Miami", count: "1,923 cars" },
  ]

  const carTypes = [
    { name: "Economy", icon: "🚗", price: "from $29/day" },
    { name: "Luxury", icon: "🏎️", price: "from $89/day" },
    { name: "SUV", icon: "🚙", price: "from $59/day" },
    { name: "Sports", icon: "🏁", price: "from $149/day" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="glass-morphism text-white border-white/20 px-6 py-2 text-sm font-medium mb-6">
            🔍 Find Your Perfect Ride
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Search & <span className="accent-text">Book</span> Instantly
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover thousands of premium vehicles available for rent in your area. Book instantly with our smart search
            system.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="modern-card max-w-5xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Location */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-blue-400" />
                    Location
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Where to?"
                      value={searchData.location}
                      onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-modern"
                    />
                  </div>
                </div>

                {/* Pickup Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-400" />
                    Pickup Date
                  </label>
                  <Input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus-modern"
                  />
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-green-400" />
                    Return Date
                  </label>
                  <Input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                    className="bg-white/10 border-white/20 text-white focus-modern"
                  />
                </div>

                {/* Car Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 flex items-center">
                    <Car className="h-4 w-4 mr-2 text-purple-400" />
                    Car Type
                  </label>
                  <Select
                    value={searchData.carType}
                    onValueChange={(value) => setSearchData({ ...searchData, carType: value })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus-modern">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20 text-white">
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="luxury">Luxury</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold h-12 rounded-xl btn-modern">
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10">
                <span className="text-sm text-white/70 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Quick filters:
                </span>
                {["Instant Book", "Free Cancellation", "Electric", "Luxury"].map((filter) => (
                  <Badge
                    key={filter}
                    variant="outline"
                    className="border-white/20 text-white/80 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Popular Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="modern-card text-center">
                  <CardContent className="p-6">
                    <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">{location.name}</h4>
                    <p className="text-white/70 text-sm">{location.count}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Car Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Browse by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="modern-card text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h4 className="text-lg font-semibold text-white mb-2">{type.name}</h4>
                    <p className="text-white/70 text-sm mb-3">{type.price}</p>
                    <div className="flex items-center justify-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm text-white/70 ml-1">4.8+</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
