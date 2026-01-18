"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiTravelIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Plane,
  Building2,
  Map,
  Package,
  Calendar,
  Users,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRightLeft,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock flights data
const mockFlights = [
  {
    id: 1,
    airline: "Vietnam Airlines",
    logo: "/vietnam-airlines-logo.png",
    from: "SGN",
    fromCity: "Ho Chi Minh",
    to: "HAN",
    toCity: "Hanoi",
    departureTime: "06:00",
    arrivalTime: "08:10",
    duration: "2h 10m",
    stops: 0,
    price: 450,
    class: "economy",
  },
  {
    id: 2,
    airline: "VietJet Air",
    logo: "/vietjet-logo.png",
    from: "SGN",
    fromCity: "Ho Chi Minh",
    to: "DAD",
    toCity: "Da Nang",
    departureTime: "09:30",
    arrivalTime: "10:50",
    duration: "1h 20m",
    stops: 0,
    price: 280,
    class: "economy",
  },
  {
    id: 3,
    airline: "Bamboo Airways",
    logo: "/bamboo-airways-logo.png",
    from: "SGN",
    fromCity: "Ho Chi Minh",
    to: "PQC",
    toCity: "Phu Quoc",
    departureTime: "14:00",
    arrivalTime: "15:00",
    duration: "1h",
    stops: 0,
    price: 350,
    class: "economy",
  },
]

// Mock hotels data
const mockHotels = [
  {
    id: 1,
    name: "InterContinental Saigon",
    image: "/intercontinental-saigon.png",
    location: "District 1, Ho Chi Minh City",
    rating: 4.9,
    reviews: 2350,
    pricePerNight: 850,
    amenities: ["wifi", "pool", "gym", "restaurant", "parking"],
    discount: 15,
  },
  {
    id: 2,
    name: "Vinpearl Resort Nha Trang",
    image: "/vinpearl-nha-trang.png",
    location: "Nha Trang, Khanh Hoa",
    rating: 4.8,
    reviews: 4120,
    pricePerNight: 1200,
    amenities: ["wifi", "pool", "gym", "restaurant", "spa"],
    discount: 20,
  },
  {
    id: 3,
    name: "JW Marriott Phu Quoc",
    image: "/jw-marriott-phuquoc.png",
    location: "Phu Quoc Island",
    rating: 4.9,
    reviews: 1890,
    pricePerNight: 1500,
    amenities: ["wifi", "pool", "beach", "restaurant", "spa"],
    discount: 0,
  },
]

// Mock tours data
const mockTours = [
  {
    id: 1,
    name: "Ha Long Bay 3D2N",
    image: "/ha-long-bay-tour.png",
    destination: "Ha Long Bay",
    duration: "3 days 2 nights",
    rating: 4.9,
    reviews: 560,
    pricePerPerson: 1200,
    includes: ["Hotel", "Meals", "Transportation", "Guide"],
    featured: true,
  },
  {
    id: 2,
    name: "Sapa Trekking Adventure",
    image: "/sapa-trekking-tour.png",
    destination: "Sapa",
    duration: "4 days 3 nights",
    rating: 4.8,
    reviews: 380,
    pricePerPerson: 900,
    includes: ["Hotel", "Meals", "Trekking Guide"],
    featured: true,
  },
  {
    id: 3,
    name: "Mekong Delta Discovery",
    image: "/mekong-delta-tour.png",
    destination: "Mekong Delta",
    duration: "1 day",
    rating: 4.7,
    reviews: 1250,
    pricePerPerson: 150,
    includes: ["Transportation", "Lunch", "Guide"],
    featured: false,
  },
]

// Popular destinations
const popularDestinations = [
  { name: "Da Nang", image: "/danang-destination.png", deals: 45 },
  { name: "Phu Quoc", image: "/phuquoc-destination.png", deals: 32 },
  { name: "Nha Trang", image: "/nhatrang-destination.png", deals: 28 },
  { name: "Ha Long", image: "/halong-destination.png", deals: 56 },
]

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  restaurant: Utensils,
  parking: Car,
  beach: Waves,
  spa: Waves,
}

export default function PiTravelPage() {
  const { language, t } = useI18n()
  const st = serviceTranslations[language].piTravel
  const [activeTab, setActiveTab] = useState("flights")
  const [tripType, setTripType] = useState("roundTrip")
  const [showAllDestinations, setShowAllDestinations] = useState(false)
  const [showAllFlights, setShowAllFlights] = useState(false)
  const [showAllHotels, setShowAllHotels] = useState(false)

  // Flight search state
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState(1)

  // Hotel search state
  const [hotelDestination, setHotelDestination] = useState("")
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title={t.services.piTravel.name}
        icon={<PiTravelIcon className="w-full h-full" />}
        colorClass="bg-[oklch(0.6_0.2_200)] text-white"
        showSearch={false}
      />

      <div className="container px-4 py-4">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-4 h-12">
            <TabsTrigger value="flights" className="gap-1 text-xs sm:text-sm">
              <Plane className="h-4 w-4" />
              <span className="hidden sm:inline">{st.tabs.flights}</span>
            </TabsTrigger>
            <TabsTrigger value="hotels" className="gap-1 text-xs sm:text-sm">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">{st.tabs.hotels}</span>
            </TabsTrigger>
            <TabsTrigger value="tours" className="gap-1 text-xs sm:text-sm">
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">{st.tabs.tours}</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-1 text-xs sm:text-sm">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">{st.tabs.packages}</span>
            </TabsTrigger>
          </TabsList>

          {/* Flights Tab */}
          <TabsContent value="flights" className="mt-4">
            <Card className="p-4">
              {/* Trip Type */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={tripType === "roundTrip" ? "default" : "outline"}
                  size="sm"
                  className={cn(tripType === "roundTrip" ? "bg-[oklch(0.6_0.2_200)]" : "bg-transparent")}
                  onClick={() => setTripType("roundTrip")}
                >
                  {st.labels.roundTrip}
                </Button>
                <Button
                  variant={tripType === "oneWay" ? "default" : "outline"}
                  size="sm"
                  className={cn(tripType === "oneWay" ? "bg-[oklch(0.6_0.2_200)]" : "bg-transparent")}
                  onClick={() => setTripType("oneWay")}
                >
                  {st.labels.oneWay}
                </Button>
              </div>

              {/* From/To */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.from}</label>
                  <Input
                    placeholder="Ho Chi Minh (SGN)"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                  />
                </div>
                <Button variant="ghost" size="icon" className="mt-4">
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.to}</label>
                  <Input placeholder="Hanoi (HAN)" value={toCity} onChange={(e) => setToCity(e.target.value)} />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.departure}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                </div>
                {tripType === "roundTrip" && (
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">{st.labels.return}</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        className="pl-10"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Passengers */}
              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-1 block">{st.labels.passengers}</label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <select
                    className="flex-1 bg-background border border-input rounded-md px-3 py-2"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {st.labels.adults}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button className="w-full bg-[oklch(0.6_0.2_200)] hover:bg-[oklch(0.5_0.2_200)]">
                <Plane className="h-4 w-4 mr-2" />
                {st.labels.searchFlights}
              </Button>
            </Card>

            {/* Flight Results */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{st.labels.popular}</h3>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAllFlights(true)}>
                  {t.common.viewAll}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {mockFlights.map((flight) => (
                <Link key={flight.id} href={`/services/pitravel/flight/${flight.id}`}>
                  <Card className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={flight.logo || "/placeholder.svg"}
                          alt={flight.airline}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{flight.airline}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold">{flight.departureTime}</span>
                          <div className="flex-1 flex items-center gap-1">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-muted-foreground">{flight.duration}</span>
                            <div className="flex-1 h-px bg-border" />
                          </div>
                          <span className="font-bold">{flight.arrivalTime}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                          <span>
                            {flight.from} → {flight.to}
                          </span>
                          <span>{flight.stops === 0 ? st.labels.direct : `${flight.stops} ${st.labels.stops}`}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-primary">π {flight.price}</p>
                        <p className="text-xs text-muted-foreground">/{st.labels.passengers.toLowerCase()}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="mt-4">
            <Card className="p-4">
              <div className="mb-4">
                <label className="text-xs text-muted-foreground mb-1 block">{st.labels.destination}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === "vi" ? "Nhập điểm đến" : "Enter destination"}
                    className="pl-10"
                    value={hotelDestination}
                    onChange={(e) => setHotelDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.checkIn}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.checkOut}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.guests}</label>
                  <select
                    className="w-full bg-background border border-input rounded-md px-3 py-2"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {st.labels.adults}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">{st.labels.rooms}</label>
                  <select
                    className="w-full bg-background border border-input rounded-md px-3 py-2"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} {st.labels.rooms}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button className="w-full bg-[oklch(0.6_0.2_200)] hover:bg-[oklch(0.5_0.2_200)]">
                <Building2 className="h-4 w-4 mr-2" />
                {st.labels.searchHotels}
              </Button>
            </Card>

            {/* Hotel Results */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{st.labels.deals}</h3>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAllHotels(true)}>
                  {t.common.viewAll}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              {mockHotels.map((hotel) => (
                <Link key={hotel.id} href={`/services/pitravel/hotel/${hotel.id}`}>
                  <Card className="overflow-hidden">
                    <div className="flex">
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <img
                          src={hotel.image || "/placeholder.svg"}
                          alt={hotel.name}
                          className="w-full h-full object-cover"
                        />
                        {hotel.discount > 0 && (
                          <Badge className="absolute top-1 left-1 text-xs bg-[oklch(0.65_0.2_25)]">
                            -{hotel.discount}%
                          </Badge>
                        )}
                      </div>
                      <div className="p-3 flex-1">
                        <h4 className="font-semibold text-sm line-clamp-1">{hotel.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span className="line-clamp-1">{hotel.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span>{hotel.rating}</span>
                          <span className="text-muted-foreground">({hotel.reviews})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {hotel.amenities.slice(0, 3).map((amenity) => {
                            const Icon = amenityIcons[amenity] || Wifi
                            return <Icon key={amenity} className="h-3 w-3 text-muted-foreground" />
                          })}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">π {hotel.pricePerNight}</span>
                          <span className="text-xs text-muted-foreground">/{st.labels.nights}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Tours Tab */}
          <TabsContent value="tours" className="mt-4">
            {/* Popular Destinations */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{st.labels.popular}</h3>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAllDestinations(true)}>
                  {t.common.viewAll}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {popularDestinations.map((dest) => (
                  <Link
                    key={dest.name}
                    href={`/services/pitravel/destination/${dest.name.toLowerCase()}`}
                    className="flex-shrink-0 w-[120px]"
                  >
                    <div className="relative h-32 rounded-xl overflow-hidden">
                      <img
                        src={dest.image || "/placeholder.svg"}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <p className="font-semibold text-sm">{dest.name}</p>
                        <p className="text-xs opacity-80">
                          {dest.deals} {language === "vi" ? "ưu đãi" : "deals"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Tours */}
            <section>
              <h3 className="font-semibold mb-4">{st.labels.featured}</h3>
              <div className="space-y-3">
                {mockTours.map((tour) => (
                  <Link key={tour.id} href={`/services/pitravel/tour/${tour.id}`}>
                    <Card className="overflow-hidden">
                      <div className="relative h-40">
                        <img
                          src={tour.image || "/placeholder.svg"}
                          alt={tour.name}
                          className="w-full h-full object-cover"
                        />
                        {tour.featured && (
                          <Badge className="absolute top-2 left-2 bg-[oklch(0.6_0.2_200)]">{t.common.featured}</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold">{tour.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{tour.destination}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-2">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span>{tour.rating}</span>
                          <span className="text-muted-foreground">
                            ({tour.reviews} {st.labels.reviews})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tour.includes.map((item) => (
                            <Badge key={item} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <span className="font-bold text-lg text-primary">π {tour.pricePerPerson}</span>
                            <span className="text-sm text-muted-foreground"> /{st.labels.pricePerPerson}</span>
                          </div>
                          <Button size="sm" className="bg-[oklch(0.6_0.2_200)]">
                            {st.labels.bookNow}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="mt-4">
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {language === "vi" ? "Combo tiết kiệm" : "Money-Saving Packages"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "vi"
                  ? "Đặt combo vé máy bay + khách sạn để tiết kiệm hơn"
                  : "Book flight + hotel combos for better savings"}
              </p>
              <Button className="bg-[oklch(0.6_0.2_200)]">{st.labels.searchFlights}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* View All Destinations Dialog */}
      <Dialog open={showAllDestinations} onOpenChange={setShowAllDestinations}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {st.labels.popular} {st.tabs.tours}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/services/pitravel/destination/${dest.name.toLowerCase()}`}
                className="group"
              >
                <div className="relative h-32 rounded-xl overflow-hidden">
                  <img
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h4 className="font-semibold text-white text-center">{dest.name}</h4>
                    <p className="text-sm text-white/80">{dest.deals} deals</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* View All Flights Dialog */}
      <Dialog open={showAllFlights} onOpenChange={setShowAllFlights}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{st.labels.searchFlights}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockFlights.map((flight) => (
              <Link key={flight.id} href={`/services/pitravel/flight/${flight.id}`}>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={flight.logo || "/placeholder.svg"}
                        alt={flight.airline}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{flight.airline}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">{flight.departureTime}</span>
                        <div className="flex-1 flex items-center gap-1">
                          <div className="flex-1 h-px bg-border" />
                          <span className="text-xs text-muted-foreground">{flight.duration}</span>
                          <div className="flex-1 h-px bg-border" />
                        </div>
                        <span className="font-bold">{flight.arrivalTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>
                          {flight.from} → {flight.to}
                        </span>
                        <span>{flight.stops === 0 ? st.labels.direct : `${flight.stops} ${st.labels.stops}`}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">π {flight.price}</p>
                      <p className="text-xs text-muted-foreground">/{st.labels.passengers.toLowerCase()}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* View All Hotels Dialog */}
      <Dialog open={showAllHotels} onOpenChange={setShowAllHotels}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{st.labels.searchHotels}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {mockHotels.map((hotel) => (
              <Link key={hotel.id} href={`/services/pitravel/hotel/${hotel.id}`}>
                <Card className="overflow-hidden">
                  <div className="flex">
                    <div className="relative w-28 h-28 flex-shrink-0">
                      <img
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      {hotel.discount > 0 && (
                        <Badge className="absolute top-1 left-1 text-xs bg-[oklch(0.65_0.2_25)]">
                          -{hotel.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="p-3 flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{hotel.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span className="line-clamp-1">{hotel.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span>{hotel.rating}</span>
                        <span className="text-muted-foreground">({hotel.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {hotel.amenities.slice(0, 3).map((amenity) => {
                          const Icon = amenityIcons[amenity] || Wifi
                          return <Icon key={amenity} className="h-3 w-3 text-muted-foreground" />
                        })}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">π {hotel.pricePerNight}</span>
                        <span className="text-xs text-muted-foreground">/{st.labels.nights}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
