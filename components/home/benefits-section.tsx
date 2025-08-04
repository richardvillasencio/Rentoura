"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock, Star, Headphones, CreditCard, MapPin, Zap, Award } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Insurance",
      description: "Full coverage protection with zero deductible. Drive with complete peace of mind.",
      color: "from-blue-500 to-blue-600",
      features: ["$1M liability coverage", "Collision protection", "24/7 roadside assistance"],
    },
    {
      icon: Clock,
      title: "Instant Booking",
      description: "Book any car in under 60 seconds. No paperwork, no waiting, just drive.",
      color: "from-green-500 to-green-600",
      features: ["60-second booking", "Digital key delivery", "Skip the counter"],
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Every vehicle is professionally cleaned and maintained to the highest standards.",
      color: "from-purple-500 to-purple-600",
      features: ["Professional detailing", "Regular maintenance", "Quality guarantee"],
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our expert team is always here to help, whenever you need assistance.",
      color: "from-orange-500 to-orange-600",
      features: ["Round-the-clock support", "Multilingual team", "Emergency assistance"],
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay your way with multiple payment options and transparent pricing.",
      color: "from-pink-500 to-pink-600",
      features: ["Multiple payment methods", "No hidden fees", "Instant refunds"],
    },
    {
      icon: MapPin,
      title: "Convenient Locations",
      description: "Pick up and drop off at thousands of locations across 100+ cities.",
      color: "from-teal-500 to-teal-600",
      features: ["100+ cities", "Airport locations", "Hotel delivery"],
    },
  ]

  const stats = [
    { icon: Award, value: "4.9/5", label: "Customer Rating", color: "text-yellow-400" },
    { icon: Shield, value: "99.9%", label: "Uptime Guarantee", color: "text-green-400" },
    { icon: Zap, value: "<60s", label: "Average Booking Time", color: "text-blue-400" },
    { icon: Star, value: "50K+", label: "Happy Customers", color: "text-purple-400" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

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
            ✨ Why Choose RenToura
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Premium <span className="accent-text">Benefits</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience the difference with our premium car rental service. We've designed every aspect of our platform
            to provide you with the ultimate convenience and peace of mind.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="modern-card">
                  <CardContent className="p-6">
                    <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="modern-card h-full">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-6`}
                  >
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">{benefit.description}</p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/80 text-sm">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${benefit.color} mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
