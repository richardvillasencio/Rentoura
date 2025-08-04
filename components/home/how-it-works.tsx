"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Key, Car, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Search & Compare",
      description:
        "Browse thousands of premium vehicles in your area. Filter by type, price, and features to find your perfect match.",
      details: ["Real-time availability", "Detailed car profiles", "Transparent pricing", "Customer reviews"],
      color: "from-blue-500 to-blue-600",
    },
    {
      step: 2,
      icon: Calendar,
      title: "Book Instantly",
      description:
        "Select your dates and book in under 60 seconds. No paperwork, no waiting - just instant confirmation.",
      details: ["60-second booking", "Instant confirmation", "Digital contracts", "Flexible cancellation"],
      color: "from-green-500 to-green-600",
    },
    {
      step: 3,
      icon: Key,
      title: "Get Digital Key",
      description: "Receive your digital key via our mobile app. Unlock and start your car without meeting anyone.",
      details: ["Contactless pickup", "Mobile app control", "GPS location", "24/7 access"],
      color: "from-purple-500 to-purple-600",
    },
    {
      step: 4,
      icon: Car,
      title: "Drive & Enjoy",
      description: "Hit the road and enjoy your premium vehicle. Our 24/7 support team is always here to help.",
      details: ["Premium vehicles", "Full insurance", "24/7 support", "Easy returns"],
      color: "from-orange-500 to-orange-600",
    },
  ]

  const features = [
    { icon: CheckCircle, text: "No hidden fees" },
    { icon: Clock, text: "24/7 availability" },
    { icon: Shield, text: "Full insurance included" },
    { icon: Car, text: "Premium vehicle fleet" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

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
            🚀 Simple Process
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It <span className="accent-text">Works</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Renting a premium car has never been easier. Our streamlined process gets you on the road in minutes, not
            hours.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0"></div>
              )}

              <Card className="modern-card relative z-10">
                <CardContent className="p-8 text-center">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 mt-4`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-white/80 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color} mr-3`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="modern-card">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center text-center"
                  >
                    <feature.icon className="h-6 w-6 text-green-400 mr-3" />
                    <span className="text-white font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-white/70 mb-8">
              Join thousands of satisfied customers who trust RenToura for their premium car rental needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 text-lg font-semibold rounded-2xl btn-modern"
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
