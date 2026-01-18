"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Car, Bike, Phone, MessageCircle, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n/context"
import { MapWidget } from "@/components/widgets/map-widget"

const mockTrips = [
  {
    id: "TRIP-2026-001234",
    status: "ongoing",
    type: "car",
    from: { name: "Home", address: "123 Nguyen Hue, District 1" },
    to: { name: "Tan Son Nhat Airport", address: "Truong Son, Tan Binh" },
    fare: 125,
    distance: "15.2 km",
    duration: "25 min",
    driver: {
      name: "Tran Van Hung",
      phone: "0912345678",
      avatar: "/driver-avatar-2.jpg",
      vehicle: "Toyota Vios - 51A-12345",
      rating: 4.9,
      trips: 2450,
    },
    startTime: "13:30",
    estimatedArrival: "13:55",
  },
  {
    id: "TRIP-2026-001233",
    status: "completed",
    type: "bike",
    from: { name: "Work", address: "456 Le Loi, District 3" },
    to: { name: "Home", address: "123 Nguyen Hue, District 1" },
    fare: 35,
    distance: "4.5 km",
    duration: "15 min",
    driver: {
      name: "Nguyen Van Tuan",
      vehicle: "Honda Wave",
      rating: 4.8,
    },
    completedTime: "Yesterday 18:45",
    rating: 5,
  },
  {
    id: "TRIP-2026-001232",
    status: "completed",
    type: "car",
    from: { name: "Ben Thanh Market", address: "Le Loi, District 1" },
    to: { name: "Landmark 81", address: "Vinhomes Central Park" },
    fare: 85,
    distance: "8.2 km",
    duration: "20 min",
    completedTime: "Jan 10, 2026",
    rating: 4,
  },
]

export default function TripsPage() {
  const router = useRouter()
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTrip, setSelectedTrip] = useState<(typeof mockTrips)[0] | null>(null)
  const [showTracking, setShowTracking] = useState(false)

  const t = {
    vi: {
      title: "Chuyến đi của tôi",
      all: "Tất cả",
      ongoing: "Đang đi",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      trackTrip: "Theo dõi",
      rebook: "Đặt lại",
      rate: "Đánh giá",
      ongoing: "Đang đi",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      driver: "Tài xế",
      callDriver: "Gọi",
      message: "Nhắn tin",
      fare: "Giá cước",
      distance: "Khoảng cách",
      duration: "Thời gian",
      liveTracking: "Vị trí hiện tại",
      estimatedArrival: "Dự kiến đến",
      tripDetails: "Chi tiết chuyến đi",
    },
    en: {
      title: "My Trips",
      all: "All",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
      trackTrip: "Track",
      rebook: "Rebook",
      rate: "Rate",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
      driver: "Driver",
      callDriver: "Call",
      message: "Message",
      fare: "Fare",
      distance: "Distance",
      duration: "Duration",
      liveTracking: "Live Location",
      estimatedArrival: "ETA",
      tripDetails: "Trip Details",
    },
  }

  const txt = t[language]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTrips = mockTrips.filter((trip) => {
    if (activeTab === "all") return true
    return trip.status === activeTab
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
            <TabsTrigger value="ongoing" className="text-xs py-2">
              {txt.ongoing}
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs py-2">
              {txt.completed}
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs py-2">
              {txt.cancelled}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Trips List */}
      <div className="p-4 space-y-4">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-card rounded-xl border p-4 space-y-3">
            {/* Trip Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {trip.type === "car" ? <Car className="h-5 w-5" /> : <Bike className="h-5 w-5" />}
                <span className="text-xs text-muted-foreground">{trip.id}</span>
              </div>
              <Badge className={getStatusColor(trip.status)}>
                {txt[trip.status as keyof typeof txt] || trip.status}
              </Badge>
            </div>

            {/* Route */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">{trip.from.name}</p>
                  <p className="text-xs text-muted-foreground">{trip.from.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-1" />
                <div>
                  <p className="font-medium text-sm">{trip.to.name}</p>
                  <p className="text-xs text-muted-foreground">{trip.to.address}</p>
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div className="flex justify-between items-center border-t pt-3">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{trip.distance}</span>
                <span>{trip.duration}</span>
              </div>
              <span className="font-bold text-primary">{trip.fare}π</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {trip.status === "ongoing" && (
                <>
                  <Button
                    className="flex-1 bg-primary"
                    onClick={() => {
                      setSelectedTrip(trip)
                      setShowTracking(true)
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {txt.trackTrip}
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <Phone className="h-4 w-4" />
                  </Button>
                </>
              )}
              {trip.status === "completed" && (
                <>
                  {!trip.rating && (
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Star className="h-4 w-4 mr-2" />
                      {txt.rate}
                    </Button>
                  )}
                  <Button className="flex-1 bg-primary">{txt.rebook}</Button>
                </>
              )}
            </div>

            {/* Rating Display */}
            {trip.rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">{language === "vi" ? "Đánh giá:" : "Rating:"}</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < trip.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tracking Dialog */}
      <Dialog open={showTracking} onOpenChange={setShowTracking}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{txt.tripDetails}</DialogTitle>
          </DialogHeader>

          {selectedTrip && selectedTrip.driver && (
            <div className="space-y-4">
              {/* Driver Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <img
                  src={selectedTrip.driver.avatar || "/placeholder.svg"}
                  alt={selectedTrip.driver.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{selectedTrip.driver.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedTrip.driver.vehicle}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{selectedTrip.driver.rating}</span>
                    <span className="text-xs text-muted-foreground">({selectedTrip.driver.trips} trips)</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="icon" className="h-10 w-10 rounded-full bg-primary">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 rounded-full bg-transparent">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Map */}
              <div>
                <p className="text-sm font-medium mb-2">{txt.liveTracking}</p>
                <MapWidget height="h-48" />
              </div>

              {/* Trip Info */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{txt.estimatedArrival}</p>
                  <p className="font-semibold">{selectedTrip.estimatedArrival}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{txt.distance}</p>
                  <p className="font-semibold">{selectedTrip.distance}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">{txt.fare}</p>
                  <p className="font-semibold text-primary">{selectedTrip.fare}π</p>
                </div>
              </div>

              {/* Route Summary */}
              <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <p className="text-sm">{selectedTrip.from.name}</p>
                </div>
                <div className="ml-1 border-l-2 border-dashed border-muted-foreground/30 h-4" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <p className="text-sm">{selectedTrip.to.name}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
