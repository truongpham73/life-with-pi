"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiMoveIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Clock,
  Star,
  Home,
  Briefcase,
  ChevronRight,
  Phone,
  MessageSquare,
  Shield,
  AlertTriangle,
  Car,
  Bike,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for ride types
const rideTypes = [
  {
    id: "bike",
    icon: Bike,
    multiplier: 1,
    capacity: "1 person",
    eta: "3-5 min",
  },
  {
    id: "car",
    icon: Car,
    multiplier: 1.5,
    capacity: "4 persons",
    eta: "5-8 min",
  },
  {
    id: "premium",
    icon: Car,
    multiplier: 2,
    capacity: "4 persons",
    eta: "7-10 min",
  },
  {
    id: "xl",
    icon: Car,
    multiplier: 2.5,
    capacity: "6 persons",
    eta: "10-15 min",
  },
]

// Mock saved places
const savedPlaces = [
  { id: 1, type: "home", name: "Home", address: "123 Nguyen Hue, District 1, HCMC", icon: Home },
  { id: 2, type: "work", name: "Work", address: "456 Le Loi, District 3, HCMC", icon: Briefcase },
]

// Mock recent places
const recentPlaces = [
  { id: 1, name: "Tan Son Nhat Airport", address: "Truong Son, Tan Binh District" },
  { id: 2, name: "Ben Thanh Market", address: "Le Loi, District 1" },
  { id: 3, name: "Landmark 81", address: "Vinhomes Central Park, Binh Thanh" },
]

// Mock trip history
const tripHistory = [
  {
    id: 1,
    date: "Jan 12, 2026",
    from: "Home",
    to: "Work",
    fare: 25,
    distance: "5.2 km",
    rating: 5,
    driver: "Nguyen Van A",
  },
  {
    id: 2,
    date: "Jan 10, 2026",
    from: "Work",
    to: "Tan Son Nhat Airport",
    fare: 85,
    distance: "12.8 km",
    rating: 4,
    driver: "Tran Van B",
  },
]

export default function PiMovePage() {
  const { language, t } = useI18n()
  const st = serviceTranslations[language].piMove
  const [pickup, setPickup] = useState("")
  const [dropoff, setDropoff] = useState("")
  const [selectedRide, setSelectedRide] = useState<string | null>(null)
  const [bookingState, setBookingState] = useState<"input" | "selectRide" | "finding" | "matched" | "onTrip">("input")
  const [showHistory, setShowHistory] = useState(false)

  const baseFare = 15 // Base fare in Pi

  const calculateFare = (rideId: string) => {
    const ride = rideTypes.find((r) => r.id === rideId)
    return ride ? Math.round(baseFare * ride.multiplier) : baseFare
  }

  const handleBookRide = () => {
    if (!dropoff) return
    setBookingState("selectRide")
  }

  const handleConfirmRide = () => {
    if (!selectedRide) return
    setBookingState("finding")

    // Simulate finding driver
    setTimeout(() => {
      setBookingState("matched")
    }, 3000)
  }

  const handleStartTrip = () => {
    setBookingState("onTrip")
  }

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title={t.services.piMove.name}
        icon={<PiMoveIcon className="w-full h-full" />}
        colorClass="bg-[oklch(0.55_0.2_250)] text-white"
        showSearch={false}
      />

      <div className="container px-4 py-4">
        {/* Main Booking Interface */}
        {bookingState === "input" && (
          <>
            {/* Location Input Card */}
            <Card className="p-4 mb-6">
              <h2 className="font-semibold mb-4">{st.labels.whereToGo}</h2>

              {/* Pickup */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-[oklch(0.55_0.2_250)]/10 flex items-center justify-center flex-shrink-0">
                  <Navigation className="h-5 w-5 text-[oklch(0.55_0.2_250)]" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={st.labels.pickup}
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="border-0 bg-muted/50 px-3"
                  />
                </div>
              </div>

              {/* Vertical line */}
              <div className="ml-5 h-6 w-px bg-border" />

              {/* Dropoff */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder={st.labels.dropoff}
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="border-0 bg-muted/50 px-3"
                  />
                </div>
              </div>

              {/* Current Location Button */}
              <Button
                variant="ghost"
                className="w-full mt-4 justify-start gap-2 text-[oklch(0.55_0.2_250)]"
                onClick={() => setPickup(st.labels.currentLocation)}
              >
                <Navigation className="h-4 w-4" />
                {st.labels.currentLocation}
              </Button>
            </Card>

            {/* Saved Places */}
            <section className="mb-6">
              <h3 className="font-semibold mb-3">{st.labels.savedPlaces}</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {savedPlaces.map((place) => (
                  <Card
                    key={place.id}
                    className="p-3 flex-shrink-0 w-[200px] cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setDropoff(place.address)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <place.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{place.type === "home" ? st.labels.home : st.labels.work}</p>
                        <p className="text-xs text-muted-foreground truncate">{place.address}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Places */}
            <section className="mb-6">
              <h3 className="font-semibold mb-3">{st.labels.recentPlaces}</h3>
              <div className="space-y-2">
                {recentPlaces.map((place) => (
                  <Card
                    key={place.id}
                    className="p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setDropoff(place.address)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{place.name}</p>
                        <p className="text-sm text-muted-foreground">{place.address}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Trip History Toggle */}
            <Button
              variant="outline"
              className="w-full mb-4 bg-transparent"
              onClick={() => setShowHistory(!showHistory)}
            >
              {st.labels.tripHistory}
              <ChevronRight className={cn("h-4 w-4 ml-2 transition-transform", showHistory && "rotate-90")} />
            </Button>

            {/* Trip History */}
            {showHistory && (
              <section className="mb-6">
                <div className="space-y-3">
                  {tripHistory.map((trip) => (
                    <Card key={trip.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-muted-foreground">{trip.date}</p>
                          <p className="font-medium">
                            {trip.from} → {trip.to}
                          </p>
                        </div>
                        <Badge variant="secondary">π {trip.fare}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{trip.distance}</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          {trip.rating}
                        </span>
                        <span>{trip.driver}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        {st.labels.bookNow}
                      </Button>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Book Button */}
            <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
              <Button
                className="w-full h-14 bg-[oklch(0.55_0.2_250)] hover:bg-[oklch(0.45_0.2_250)] shadow-lg"
                onClick={handleBookRide}
                disabled={!dropoff}
              >
                {st.labels.bookNow}
              </Button>
            </div>
          </>
        )}

        {/* Select Ride Type */}
        {bookingState === "selectRide" && (
          <>
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Navigation className="h-4 w-4 text-[oklch(0.55_0.2_250)]" />
                <span className="text-sm">{pickup || st.labels.currentLocation}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{dropoff}</span>
              </div>
            </Card>

            <h3 className="font-semibold mb-4">{st.labels.selectRide}</h3>
            <div className="space-y-3 mb-6">
              {rideTypes.map((ride) => (
                <Card
                  key={ride.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all",
                    selectedRide === ride.id ? "border-[oklch(0.55_0.2_250)] bg-[oklch(0.55_0.2_250)]/5" : "",
                  )}
                  onClick={() => setSelectedRide(ride.id)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "h-14 w-14 rounded-xl flex items-center justify-center",
                        selectedRide === ride.id ? "bg-[oklch(0.55_0.2_250)]" : "bg-muted",
                      )}
                    >
                      <ride.icon
                        className={cn("h-7 w-7", selectedRide === ride.id ? "text-white" : "text-muted-foreground")}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{st.rideTypes[ride.id as keyof typeof st.rideTypes]}</p>
                      <p className="text-sm text-muted-foreground">
                        {ride.capacity} • {ride.eta}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">π {calculateFare(ride.id)}</p>
                      <p className="text-xs text-muted-foreground">{st.labels.estimatedFare}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Payment Method */}
            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">π</span>
                  </div>
                  <div>
                    <p className="font-medium">{st.labels.piWallet}</p>
                    <p className="text-sm text-muted-foreground">{st.labels.paymentMethod}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>

            {/* Promo Code */}
            <div className="flex gap-2 mb-6">
              <Input placeholder={st.labels.promoCode} className="flex-1" />
              <Button variant="outline" className="bg-transparent">
                {st.labels.apply}
              </Button>
            </div>

            <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50 flex gap-2">
              <Button variant="outline" className="flex-1 h-14 bg-transparent" onClick={() => setBookingState("input")}>
                {t.common.back}
              </Button>
              <Button
                className="flex-1 h-14 bg-[oklch(0.55_0.2_250)] hover:bg-[oklch(0.45_0.2_250)]"
                onClick={handleConfirmRide}
                disabled={!selectedRide}
              >
                {st.labels.bookNow}
              </Button>
            </div>
          </>
        )}

        {/* Finding Driver */}
        {bookingState === "finding" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-[oklch(0.55_0.2_250)]/10 flex items-center justify-center animate-pulse">
                <Car className="h-16 w-16 text-[oklch(0.55_0.2_250)]" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-[oklch(0.55_0.2_250)]/30 animate-ping" />
            </div>
            <h3 className="font-semibold text-xl mt-8 mb-2">{st.labels.findingDriver}</h3>
            <p className="text-muted-foreground text-center">
              {language === "vi" ? "Vui lòng đợi trong giây lát" : "Please wait a moment"}
            </p>
            <Button variant="outline" className="mt-8 bg-transparent" onClick={() => setBookingState("selectRide")}>
              {st.labels.cancelRide}
            </Button>
          </div>
        )}

        {/* Driver Matched */}
        {bookingState === "matched" && (
          <>
            <div className="text-center py-8">
              <div className="h-20 w-20 rounded-full bg-[oklch(0.55_0.2_250)] mx-auto mb-4 flex items-center justify-center">
                <Car className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">{st.labels.driverFound}</h3>
              <p className="text-muted-foreground">{st.labels.driverArriving}</p>
            </div>

            {/* Driver Info Card */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted overflow-hidden">
                  <img src="/asian-male-driver.png" alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Nguyen Van A</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>4.9</span>
                    <span>•</span>
                    <span>1,234 trips</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Honda Wave • 59A1-12345</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Phone className="h-4 w-4" />
                  {st.labels.contactDriver}
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Button>
              </div>
            </Card>

            {/* Trip Details */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <Navigation className="h-4 w-4 text-[oklch(0.55_0.2_250)]" />
                <span className="text-sm">{pickup || st.labels.currentLocation}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{dropoff}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-muted-foreground">{st.labels.estimatedFare}</span>
                <span className="font-bold text-lg">π {selectedRide ? calculateFare(selectedRide) : baseFare}</span>
              </div>
            </Card>

            {/* Safety Features */}
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                {st.labels.shareTrip}
              </Button>
              <Button variant="destructive" className="flex-1 gap-2">
                <AlertTriangle className="h-4 w-4" />
                {st.labels.sos}
              </Button>
            </div>

            <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
              <Button
                className="w-full h-14 bg-[oklch(0.55_0.2_250)] hover:bg-[oklch(0.45_0.2_250)] shadow-lg"
                onClick={handleStartTrip}
              >
                {language === "vi" ? "Bắt đầu chuyến đi" : "Start Trip"}
              </Button>
            </div>
          </>
        )}

        {/* On Trip */}
        {bookingState === "onTrip" && (
          <>
            <div className="text-center py-8">
              <div className="h-20 w-20 rounded-full bg-[oklch(0.55_0.2_250)] mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Car className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-semibold text-xl mb-2">{st.labels.onTrip}</h3>
              <p className="text-muted-foreground">
                {language === "vi" ? "Đang di chuyển đến điểm đến" : "Heading to your destination"}
              </p>
            </div>

            {/* Map Placeholder */}
            <Card className="h-48 mb-4 overflow-hidden">
              <img src="/map-route-navigation.jpg" alt="Map" className="w-full h-full object-cover" />
            </Card>

            {/* Trip Progress */}
            <Card className="p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">{st.labels.estimatedTime}</p>
                  <p className="font-bold text-2xl">12 min</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{language === "vi" ? "Khoảng cách" : "Distance"}</p>
                  <p className="font-bold text-2xl">5.2 km</p>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-[oklch(0.55_0.2_250)] rounded-full transition-all" />
              </div>
            </Card>

            {/* Safety Features */}
            <div className="flex gap-2 mb-4">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Shield className="h-4 w-4" />
                {st.labels.shareTrip}
              </Button>
              <Button variant="destructive" className="flex-1 gap-2">
                <AlertTriangle className="h-4 w-4" />
                {st.labels.sos}
              </Button>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{st.labels.estimatedFare}</span>
                <span className="font-bold text-xl">π {selectedRide ? calculateFare(selectedRide) : baseFare}</span>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
