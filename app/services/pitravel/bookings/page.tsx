"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plane, Building2, Map, Calendar, Clock, Star, QrCode, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"

const mockBookings = [
  {
    id: "BK-2026-001234",
    type: "flight",
    status: "upcoming",
    airline: "Vietnam Airlines",
    flightNumber: "VN123",
    from: "SGN",
    fromCity: "Ho Chi Minh",
    to: "HAN",
    toCity: "Hanoi",
    departureDate: "Jan 20, 2026",
    departureTime: "08:00",
    arrivalTime: "10:10",
    passengers: 2,
    class: "Economy",
    price: 900,
    qrCode: "/qr-code-flight.png",
  },
  {
    id: "BK-2026-001233",
    type: "hotel",
    status: "upcoming",
    hotelName: "InterContinental Saigon",
    location: "District 1, HCMC",
    checkIn: "Jan 25, 2026",
    checkOut: "Jan 28, 2026",
    nights: 3,
    roomType: "Deluxe Room",
    guests: 2,
    price: 2550,
    image: "/intercontinental-saigon.png",
  },
  {
    id: "BK-2026-001232",
    type: "tour",
    status: "completed",
    tourName: "Mekong Delta Day Trip",
    location: "Ben Tre, Vietnam",
    date: "Jan 5, 2026",
    duration: "1 day",
    participants: 2,
    price: 180,
    rating: 5,
    image: "/mekong-delta-tour.jpg",
  },
  {
    id: "BK-2026-001231",
    type: "flight",
    status: "cancelled",
    airline: "VietJet Air",
    flightNumber: "VJ456",
    from: "SGN",
    to: "DAD",
    departureDate: "Jan 2, 2026",
    price: 280,
    refundStatus: "Refunded",
  },
]

export default function BookingsPage() {
  const router = useRouter()
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<(typeof mockBookings)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const t = {
    vi: {
      title: "Đặt chỗ của tôi",
      all: "Tất cả",
      flights: "Chuyến bay",
      hotels: "Khách sạn",
      tours: "Tour",
      upcoming: "Sắp tới",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      viewTicket: "Xem vé",
      viewVoucher: "Xem voucher",
      cancel: "Hủy",
      rate: "Đánh giá",
      rebook: "Đặt lại",
      bookingDetail: "Chi tiết đặt chỗ",
      passengers: "Hành khách",
      guests: "Khách",
      nights: "đêm",
      checkIn: "Nhận phòng",
      checkOut: "Trả phòng",
      downloadTicket: "Tải vé",
      refunded: "Đã hoàn tiền",
      noBookings: "Chưa có đặt chỗ nào",
      bookNow: "Đặt ngay",
    },
    en: {
      title: "My Bookings",
      all: "All",
      flights: "Flights",
      hotels: "Hotels",
      tours: "Tours",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
      viewTicket: "View Ticket",
      viewVoucher: "View Voucher",
      cancel: "Cancel",
      rate: "Rate",
      rebook: "Rebook",
      bookingDetail: "Booking Detail",
      passengers: "Passengers",
      guests: "Guests",
      nights: "nights",
      checkIn: "Check-in",
      checkOut: "Check-out",
      downloadTicket: "Download Ticket",
      refunded: "Refunded",
      noBookings: "No bookings yet",
      bookNow: "Book Now",
    },
  }

  const txt = t[language]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5" />
      case "hotel":
        return <Building2 className="h-5 w-5" />
      case "tour":
        return <Map className="h-5 w-5" />
      default:
        return null
    }
  }

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeTab === "all") return true
    if (activeTab === "flights") return booking.type === "flight"
    if (activeTab === "hotels") return booking.type === "hotel"
    if (activeTab === "tours") return booking.type === "tour"
    return true
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{txt.title}</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pb-2">
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="all" className="text-xs py-2">
              {txt.all}
            </TabsTrigger>
            <TabsTrigger value="flights" className="text-xs py-2">
              {txt.flights}
            </TabsTrigger>
            <TabsTrigger value="hotels" className="text-xs py-2">
              {txt.hotels}
            </TabsTrigger>
            <TabsTrigger value="tours" className="text-xs py-2">
              {txt.tours}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Bookings List */}
      <div className="p-4 space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">{txt.noBookings}</p>
            <Link href="/services/pitravel">
              <Button className="bg-primary">{txt.bookNow}</Button>
            </Link>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-card rounded-xl border p-4 space-y-3 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                setSelectedBooking(booking)
                setShowDetail(true)
              }}
            >
              {/* Booking Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(booking.type)}
                  <span className="text-xs text-muted-foreground">{booking.id}</span>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {txt[booking.status as keyof typeof txt] || booking.status}
                </Badge>
              </div>

              {/* Booking Content based on type */}
              {booking.type === "flight" && (
                <div className="space-y-2">
                  <p className="font-semibold">{booking.airline}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{booking.from}</span>
                    <Plane className="h-4 w-4 rotate-90" />
                    <span className="font-bold">{booking.to}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.departureDate}</span>
                    </div>
                    {booking.departureTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.departureTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {booking.type === "hotel" && (
                <div className="flex gap-3">
                  <img
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.hotelName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{booking.hotelName}</p>
                    <p className="text-xs text-muted-foreground">{booking.location}</p>
                    <p className="text-sm mt-1">
                      {booking.checkIn} - {booking.checkOut}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.nights} {txt.nights} • {booking.roomType}
                    </p>
                  </div>
                </div>
              )}

              {booking.type === "tour" && (
                <div className="flex gap-3">
                  <img
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.tourName}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{booking.tourName}</p>
                    <p className="text-xs text-muted-foreground">{booking.location}</p>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.date}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm text-muted-foreground">
                  {booking.passengers && `${booking.passengers} ${txt.passengers}`}
                  {booking.guests && `${booking.guests} ${txt.guests}`}
                  {booking.participants && `${booking.participants} ${txt.guests}`}
                </span>
                <span className="font-bold text-primary">{booking.price}π</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {booking.status === "upcoming" && (
                  <>
                    <Button
                      className="flex-1 bg-primary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedBooking(booking)
                        setShowDetail(true)
                      }}
                    >
                      <QrCode className="h-4 w-4 mr-2" />
                      {booking.type === "flight" ? txt.viewTicket : txt.viewVoucher}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={(e) => e.stopPropagation()}>
                      {txt.cancel}
                    </Button>
                  </>
                )}
                {booking.status === "completed" && (
                  <>
                    {!booking.rating && (
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={(e) => e.stopPropagation()}>
                        <Star className="h-4 w-4 mr-2" />
                        {txt.rate}
                      </Button>
                    )}
                    <Button className="flex-1 bg-primary" onClick={(e) => e.stopPropagation()}>
                      {txt.rebook}
                    </Button>
                  </>
                )}
                {booking.status === "cancelled" && (
                  <>
                    {booking.refundStatus && (
                      <Badge variant="secondary" className="flex-1 justify-center py-2">
                        {txt.refunded}
                      </Badge>
                    )}
                    <Button className="flex-1 bg-primary" onClick={(e) => e.stopPropagation()}>
                      {txt.rebook}
                    </Button>
                  </>
                )}
              </div>

              {/* Rating */}
              {booking.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{language === "vi" ? "Đánh giá:" : "Rating:"}</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < booking.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail Dialog with QR Code */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{txt.bookingDetail}</DialogTitle>
          </DialogHeader>

          {selectedBooking && selectedBooking.status === "upcoming" && (
            <div className="space-y-4">
              {/* QR Code */}
              <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="h-32 w-32 text-foreground" />
                </div>
                <p className="text-sm font-medium">{selectedBooking.id}</p>
                <p className="text-xs text-muted-foreground">
                  {language === "vi" ? "Quét mã để check-in" : "Scan to check-in"}
                </p>
              </div>

              {/* Booking Summary */}
              <div className="space-y-2 text-sm">
                {selectedBooking.type === "flight" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Flight</span>
                      <span>
                        {selectedBooking.airline} - {selectedBooking.flightNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span>
                        {selectedBooking.fromCity} → {selectedBooking.toCity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{selectedBooking.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span>
                        {selectedBooking.departureTime} - {selectedBooking.arrivalTime}
                      </span>
                    </div>
                  </>
                )}

                {selectedBooking.type === "hotel" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hotel</span>
                      <span>{selectedBooking.hotelName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{txt.checkIn}</span>
                      <span>{selectedBooking.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{txt.checkOut}</span>
                      <span>{selectedBooking.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room</span>
                      <span>{selectedBooking.roomType}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Download Button */}
              <Button className="w-full bg-primary">
                <Download className="h-4 w-4 mr-2" />
                {txt.downloadTicket}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
