"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Calendar, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const [searchData, setSearchData] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    guests: "2",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic
    console.log("Search data:", searchData)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 noise-texture" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: "3em" }}
          >
            <Badge className="mb-8 bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-300 border-blue-500/30 px-6 py-2 text-lg backdrop-blur-sm">
              🚗 Premium Car Rental Experience
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="hero-text">Rent Your</span>
              <br />
              <span className="accent-text">Dream Car</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience luxury and performance with our premium collection of vehicles. From exotic supercars to
              elegant sedans, find your perfect ride.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <form onSubmit={handleSearch} className="glass-card p-6 rounded-3xl max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Where to?"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 h-12"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                    className="pl-10 bg-white/10 border-white/20 text-white focus:border-blue-500 h-12"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                    className="pl-10 bg-white/10 border-white/20 text-white focus:border-blue-500 h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 h-12 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Premium Cars" },
              { number: "50+", label: "Cities" },
              {
                number: "4.9",
                label: "Average Rating",
                icon: <Star className="h-5 w-5 text-yellow-400 fill-current" />,
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">{stat.number}</span>
                  {stat.icon && <span className="ml-2">{stat.icon}</span>}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Browse Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-black bg-transparent backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
