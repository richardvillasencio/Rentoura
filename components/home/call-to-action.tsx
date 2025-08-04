"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, Star, Users, Car } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CallToAction() {
  const appFeatures = [
    "Instant booking in 60 seconds",
    "Digital key delivery",
    "24/7 customer support",
    "Real-time car tracking",
  ]

  const stats = [
    { icon: Star, value: "4.9", label: "App Store Rating" },
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Car, value: "10K+", label: "Cars Available" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20"></div>
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-green-500/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="glass-morphism text-white border-white/20 px-6 py-2 text-sm font-medium mb-6">
              🚀 Ready to Drive?
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Start Your <span className="accent-text">Journey</span> Today
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Join thousands of satisfied customers who trust RenToura for their premium car rental needs. Experience
              luxury, convenience, and freedom like never before.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center text-white/80"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mr-4"></div>
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 text-lg font-semibold rounded-2xl btn-modern neon-glow"
                  asChild
                >
                  <Link href="/cars">
                    Browse Cars <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-morphism text-white border-white/20 px-8 py-4 text-lg font-semibold rounded-2xl hover:bg-white/10 bg-transparent"
                  asChild
                >
                  <Link href="/become-host">Become a Host</Link>
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Phone Mockup */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="modern-card p-8 text-center max-w-md mx-auto">
                  <Image
                    src="/car-rental-app-interface.png"
                    alt="RenToura Mobile App"
                    width={300}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="absolute -top-4 -left-4 glass-morphism rounded-2xl p-4 text-white"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Tracking</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -right-4 glass-morphism rounded-2xl p-4 text-white"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">60s</div>
                  <div className="text-sm text-white/70">Booking Time</div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-3xl blur-3xl -z-10"></div>
            </div>

            {/* App Store Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-4 mt-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="glass-morphism border-white/20 text-white hover:bg-white/10 px-6 py-3 bg-transparent"
                >
                  <Download className="mr-2 h-5 w-5" />
                  App Store
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="glass-morphism border-white/20 text-white hover:bg-white/10 px-6 py-3 bg-transparent"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
