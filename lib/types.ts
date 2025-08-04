export interface User {
  id: string
  email: string
  name: string
  role: "renter" | "host" | "admin"
  profile_image?: string
  bio?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Car {
  id: string
  user_id: string
  title: string
  description: string
  price_per_day: number
  images: string[]
  location: string
  latitude?: number
  longitude?: number
  type: string
  transmission: string
  fuel: string
  seats: number
  year?: number
  make?: string
  model?: string
  availability_calendar: Record<string, any>
  is_active: boolean
  instant_book: boolean
  created_at: string
  updated_at: string
  host?: User
  average_rating?: number
  review_count?: number
}

export interface Booking {
  id: string
  car_id: string
  renter_id: string
  start_date: string
  end_date: string
  total_price: number
  status: "pending" | "approved" | "cancelled" | "completed"
  insurance_tier: "none" | "standard" | "premium"
  created_at: string
  updated_at: string
  car?: Car
  renter?: User
}

export interface Review {
  id: string
  car_id: string
  reviewer_id: string
  reviewee_id: string
  booking_id: string
  rating: number
  comment: string
  role: "host" | "renter"
  created_at: string
  reviewer?: User
  reviewee?: User
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  is_read: boolean
  created_at: string
  sender?: User
  receiver?: User
}

export interface Favorite {
  id: string
  user_id: string
  car_id: string
  created_at: string
  car?: Car
}

export interface Payment {
  id: string
  booking_id: string
  method: string
  amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  stripe_payment_id?: string
  created_at: string
}

export interface PromoCode {
  id: string
  code: string
  discount_percentage?: number
  discount_amount?: number
  max_uses?: number
  current_uses: number
  expires_at?: string
  is_active: boolean
  created_at: string
}

export interface SearchFilters {
  location?: string
  startDate?: string
  endDate?: string
  type?: string
  priceRange?: string
  transmission?: string
  fuel?: string
  seats?: number
  instantBook?: boolean
}
