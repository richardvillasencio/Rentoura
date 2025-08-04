"use client"

import { motion } from "framer-motion"
import CarCard from "./car-card"
import type { Car } from "@/lib/types"

interface CarGridProps {
  cars: Car[]
}

export default function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🚗</div>
        <h3 className="text-2xl font-bold text-white mb-2">No cars found</h3>
        <p className="text-gray-400">Try adjusting your search filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-300">
          {cars.length} car{cars.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
