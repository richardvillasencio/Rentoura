"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Heart, MessageSquare, Calendar, User, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-xl text-gray-300">Ready to explore luxury cars?</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-effect border-gray-700 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Car className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Browse Cars</h3>
                <p className="text-gray-400 text-sm mb-4">Discover luxury vehicles</p>
                <Button asChild className="gradient-red text-white hover:opacity-90">
                  <Link href="/cars">Browse Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Favorites</h3>
                <p className="text-gray-400 text-sm mb-4">Your saved cars</p>
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                  <Link href="/favorites">View Favorites</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Bookings</h3>
                <p className="text-gray-400 text-sm mb-4">Manage your rentals</p>
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                  <Link href="/bookings">View Bookings</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Messages</h3>
                <p className="text-gray-400 text-sm mb-4">Chat with hosts</p>
                <Button asChild variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                  <Link href="/messages">View Messages</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-effect border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Role</label>
                    <p className="text-white capitalize">{user.role}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full border-red-500 text-red-500 bg-transparent mt-4">
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-gray-700 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Browse Luxury Cars</h4>
                      <p className="text-gray-400 text-sm">
                        Explore our collection of premium vehicles from trusted hosts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Book Your Perfect Ride</h4>
                      <p className="text-gray-400 text-sm">
                        Select dates, choose insurance, and book instantly or request approval
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Enjoy Your Experience</h4>
                      <p className="text-gray-400 text-sm">
                        Pick up your vehicle and enjoy an unforgettable luxury driving experience
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
