"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { MapPin, Filter, X } from "lucide-react"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get("location") || "")
  const [type, setType] = useState(searchParams.get("type") || "any")
  const [transmission, setTransmission] = useState(searchParams.get("transmission") || "any")
  const [fuel, setFuel] = useState(searchParams.get("fuel") || "any")
  const [seats, setSeats] = useState(searchParams.get("seats") || "any")
  const [instantBook, setInstantBook] = useState(searchParams.get("instantBook") === "true")
  const [priceRange, setPriceRange] = useState([0, 1000])

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (location) params.set("location", location)
    if (type !== "any") params.set("type", type)
    if (transmission !== "any") params.set("transmission", transmission)
    if (fuel !== "any") params.set("fuel", fuel)
    if (seats !== "any") params.set("seats", seats)
    if (instantBook) params.set("instantBook", "true")
    if (priceRange[1] < 1000) params.set("priceRange", `${priceRange[0]}-${priceRange[1]}`)

    router.push(`/cars?${params.toString()}`)
  }

  const clearFilters = () => {
    setLocation("")
    setType("any")
    setTransmission("any")
    setFuel("any")
    setSeats("any")
    setInstantBook(false)
    setPriceRange([0, 1000])
    router.push("/cars")
  }

  return (
    <div className="glass-effect rounded-2xl p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white">
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="Enter city or address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Car Type */}
        <div className="space-y-2">
          <Label className="text-white">Car Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="any">Any type</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="convertible">Convertible</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transmission */}
        <div className="space-y-2">
          <Label className="text-white">Transmission</Label>
          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Any transmission" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="any">Any transmission</SelectItem>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel Type */}
        <div className="space-y-2">
          <Label className="text-white">Fuel Type</Label>
          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Any fuel type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="any">Any fuel type</SelectItem>
              <SelectItem value="gasoline">Gasoline</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seats */}
        <div className="space-y-2">
          <Label className="text-white">Seats</Label>
          <Select value={seats} onValueChange={setSeats}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Any number" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="any">Any number</SelectItem>
              <SelectItem value="2">2 seats</SelectItem>
              <SelectItem value="4">4 seats</SelectItem>
              <SelectItem value="5">5 seats</SelectItem>
              <SelectItem value="7">7+ seats</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-white">Price Range (per day)</Label>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={25} className="w-full" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1] === 1000 ? "1000+" : priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Instant Book */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="instant-book"
            checked={instantBook}
            onCheckedChange={setInstantBook}
            className="border-gray-700"
          />
          <Label htmlFor="instant-book" className="text-white">
            Instant Book only
          </Label>
        </div>

        <Button onClick={applyFilters} className="w-full gradient-red text-white hover:opacity-90 font-semibold">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
