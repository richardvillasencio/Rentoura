"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
  ],
  services: [
    { name: "Car Rental", href: "/cars" },
    { name: "Luxury Cars", href: "/cars?category=luxury" },
    { name: "Sports Cars", href: "/cars?category=sports" },
    { name: "SUVs", href: "/cars?category=suv" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Contact Us", href: "/contact" },
    { name: "Safety", href: "/safety" },
    { name: "Insurance", href: "/insurance" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Refund Policy", href: "/refunds" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
]

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
  }

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black border-t border-white/10">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="logo-container logo-glow p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm border border-white/10 inline-block">
                  <Image
                    src="/images/rentoura-logo-new.png"
                    alt="RenToura"
                    width={240}
                    height={80}
                    className="h-18 w-auto logo-highlight animate-logo-pulse"
                  />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                Experience luxury and performance with our premium collection of vehicles. Your journey begins with the
                perfect car.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-3 text-blue-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-3 text-green-400" />
                  <span>hello@rentoura.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 text-purple-400" />
                  <span>Los Angeles, CA</span>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([category, links], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <h3 className="text-white font-semibold mb-4 capitalize">{category}</h3>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-300 mb-6 text-sm">
                  Get the latest updates on new cars, exclusive deals, and special offers.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white border-0 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                {/* Social Links */}
                <div className="flex space-x-4 mt-8">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 RenToura. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
