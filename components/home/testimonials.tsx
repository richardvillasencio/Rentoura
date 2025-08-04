"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote, Verified, ThumbsUp } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Business Executive",
      location: "San Francisco, CA",
      avatar: "/professional-woman-headshot.png",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      likes: 24,
      text: "Absolutely incredible experience! The Tesla Model S was pristine and the booking process was seamless. The digital key feature saved me so much time at the airport. Will definitely use RenToura again for my business trips.",
      carRented: "Tesla Model S",
      tripType: "Business",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      location: "Los Angeles, CA",
      avatar: "/professional-man-headshot.png",
      rating: 5,
      date: "1 month ago",
      verified: true,
      likes: 31,
      text: "The BMW M4 was a dream to drive! Perfect for my weekend getaway to Napa Valley. The car was spotless, fully fueled, and the insurance coverage gave me complete peace of mind. Customer service was exceptional.",
      carRented: "BMW M4 Competition",
      tripType: "Leisure",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      location: "Miami, FL",
      avatar: "/professional-latina-woman-headshot.png",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      likes: 18,
      text: "Outstanding service from start to finish. The Range Rover was perfect for our family vacation. The 24/7 support team was incredibly helpful when we had a minor question. Highly recommend RenToura!",
      carRented: "Range Rover Evoque",
      tripType: "Family",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Entrepreneur",
      location: "New York, NY",
      avatar: "/professional-businessman-headshot.png",
      rating: 5,
      date: "1 week ago",
      verified: true,
      likes: 42,
      text: "The Porsche 911 exceeded all expectations! Booked it for a special anniversary dinner and it made the evening unforgettable. The car was immaculate and performed flawlessly. Worth every penny!",
      carRented: "Porsche 911 Carrera",
      tripType: "Special Occasion",
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Creative Director",
      location: "Seattle, WA",
      avatar: "/professional-asian-woman-headshot.png",
      rating: 5,
      date: "2 months ago",
      verified: true,
      likes: 27,
      text: "The Mercedes EQS was absolutely stunning! As someone who cares about the environment, I loved driving an electric luxury car. The technology was incredible and the ride was so smooth and quiet.",
      carRented: "Mercedes EQS",
      tripType: "Business",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Investment Banker",
      location: "Las Vegas, NV",
      avatar: "/professional-man-suit-headshot.png",
      rating: 5,
      date: "3 days ago",
      verified: true,
      likes: 56,
      text: "The Lamborghini Huracán was the highlight of my Vegas trip! The booking process was incredibly smooth and the car was delivered right to my hotel. Pure luxury and performance. An unforgettable experience!",
      carRented: "Lamborghini Huracán",
      tripType: "Leisure",
    },
  ]

  const overallStats = {
    averageRating: 4.9,
    totalReviews: 2847,
    fiveStarPercentage: 94,
    recommendationRate: 98,
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

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
            💬 Customer Stories
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What Our <span className="accent-text">Customers</span> Say
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what thousands of satisfied customers have to say about their
            RenToura experience.
          </p>

          {/* Overall Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{overallStats.averageRating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-white/70 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{overallStats.totalReviews.toLocaleString()}</div>
              <div className="text-white/70 text-sm">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{overallStats.fiveStarPercentage}%</div>
              <div className="text-white/70 text-sm">5-Star Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{overallStats.recommendationRate}%</div>
              <div className="text-white/70 text-sm">Would Recommend</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="modern-card h-full">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          {testimonial.verified && <Verified className="h-4 w-4 text-blue-400" />}
                        </div>
                        <p className="text-white/70 text-sm">{testimonial.role}</p>
                        <p className="text-white/60 text-xs">{testimonial.location}</p>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 text-white/30" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">{testimonial.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-white/80 leading-relaxed mb-4">{testimonial.text}</p>

                  {/* Car & Trip Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                      {testimonial.carRented}
                    </Badge>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                      {testimonial.tripType}
                    </Badge>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{testimonial.likes} helpful</span>
                    </div>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-xs">
                      Verified Review
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="modern-card max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Trusted by Thousands</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <div className="text-lg font-semibold text-white mb-2">Award Winning</div>
                  <div className="text-white/70 text-sm">Best Car Rental Platform 2024</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔒</div>
                  <div className="text-lg font-semibold text-white mb-2">Secure & Safe</div>
                  <div className="text-white/70 text-sm">Bank-level security & encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">⚡</div>
                  <div className="text-lg font-semibold text-white mb-2">Lightning Fast</div>
                  <div className="text-white/70 text-sm">Book in under 60 seconds</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
