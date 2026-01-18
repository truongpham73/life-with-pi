"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiHealthIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  ChevronRight,
  Video,
  MessageSquare,
  Calendar,
  User,
  Heart,
  Phone,
  Stethoscope,
  Building,
  Pill,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock doctors data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Nguyen Van Minh",
    image: "/doctor-male-1.png",
    specialization: "general",
    hospital: "Cho Ray Hospital",
    experience: 15,
    patients: 5600,
    rating: 4.9,
    reviews: 890,
    consultationFee: 150,
    available: true,
    nextSlot: "Today, 2:00 PM",
    languages: ["Vietnamese", "English"],
  },
  {
    id: 2,
    name: "Dr. Tran Thi Lan",
    image: "/doctor-female-1.png",
    specialization: "womens",
    hospital: "Tu Du Hospital",
    experience: 12,
    patients: 4200,
    rating: 4.8,
    reviews: 720,
    consultationFee: 180,
    available: true,
    nextSlot: "Today, 4:30 PM",
    languages: ["Vietnamese"],
  },
  {
    id: 3,
    name: "Dr. Le Hoang Nam",
    image: "/doctor-male-2.png",
    specialization: "pediatric",
    hospital: "Children Hospital 1",
    experience: 10,
    patients: 3800,
    rating: 4.9,
    reviews: 650,
    consultationFee: 200,
    available: true,
    nextSlot: "Tomorrow, 9:00 AM",
    languages: ["Vietnamese", "English"],
  },
  {
    id: 4,
    name: "Dr. Pham Minh Duc",
    image: "/doctor-male-3.png",
    specialization: "dental",
    hospital: "Nha Khoa Kim",
    experience: 8,
    patients: 2500,
    rating: 4.7,
    reviews: 420,
    consultationFee: 120,
    available: true,
    nextSlot: "Today, 5:00 PM",
    languages: ["Vietnamese"],
  },
]

// Mock appointments
const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Nguyen Van Minh",
    specialization: "General",
    date: "Jan 15, 2026",
    time: "2:00 PM",
    type: "video",
    status: "upcoming",
  },
  {
    id: 2,
    doctor: "Dr. Tran Thi Lan",
    specialization: "Women's Health",
    date: "Jan 10, 2026",
    time: "10:00 AM",
    type: "in-person",
    status: "completed",
  },
]

// Health tips
const healthTips = [
  {
    id: 1,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily",
    icon: Heart,
  },
  {
    id: 2,
    title: "Regular Exercise",
    description: "30 minutes of physical activity daily",
    icon: Heart,
  },
  {
    id: 3,
    title: "Balanced Diet",
    description: "Eat more vegetables and fruits",
    icon: Heart,
  },
]

export default function PiHealthPage() {
  const { language, t } = useI18n()
  const st = serviceTranslations[language].piHealth
  const [activeTab, setActiveTab] = useState("doctors")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { key: "all", label: st.categories.all },
    { key: "general", label: st.categories.general },
    { key: "specialist", label: st.categories.specialist },
    { key: "dental", label: st.categories.dental },
    { key: "mental", label: st.categories.mental },
    { key: "pediatric", label: st.categories.pediatric },
    { key: "womens", label: st.categories.womens },
  ]

  const filteredDoctors = mockDoctors.filter((d) => {
    if (selectedCategory !== "all" && d.specialization !== selectedCategory) return false
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title={t.services.piHealth.name}
        icon={<PiHealthIcon className="w-full h-full" />}
        colorClass="bg-[oklch(0.6_0.2_350)] text-white"
        searchPlaceholder={language === "vi" ? "Tìm bác sĩ, bệnh viện..." : "Search doctors, hospitals..."}
        onSearch={setSearchQuery}
      />

      <div className="container px-4 py-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <Card className="p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center mb-2">
              <Video className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
            </div>
            <span className="text-xs font-medium">{st.labels.videoConsult}</span>
          </Card>
          <Card className="p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
            </div>
            <span className="text-xs font-medium">{st.labels.chatConsult}</span>
          </Card>
          <Card className="p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center mb-2">
              <Pill className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
            </div>
            <span className="text-xs font-medium">{st.labels.pharmacy}</span>
          </Card>
          <Card className="p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <span className="text-xs font-medium">{st.labels.emergencyCall}</span>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="doctors" className="gap-1">
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.doctor}</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.myAppointments}</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.medicalRecords}</span>
            </TabsTrigger>
          </TabsList>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="mt-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={selectedCategory === cat.key ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-shrink-0 rounded-full",
                    selectedCategory === cat.key ? "bg-[oklch(0.6_0.2_350)]" : "bg-transparent",
                  )}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Doctors List */}
            <div className="space-y-3">
              {filteredDoctors.map((doctor) => (
                <Link key={doctor.id} href={`/services/pihealth/doctor/${doctor.id}`}>
                  <Card className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {st.categories[doctor.specialization as keyof typeof st.categories]}
                            </p>
                          </div>
                          {doctor.available && (
                            <Badge className="bg-[oklch(0.7_0.18_145)]">{st.labels.available}</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {doctor.hospital}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            {doctor.rating}
                          </span>
                          <span className="text-muted-foreground">({doctor.reviews})</span>
                          <span className="text-muted-foreground">
                            {doctor.experience} {st.labels.years}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div>
                            <span className="font-bold text-primary">π {doctor.consultationFee}</span>
                            <span className="text-sm text-muted-foreground ml-1">/{st.labels.consultationFee}</span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {st.labels.nextAvailable}: {doctor.nextSlot}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                        <Video className="h-4 w-4" />
                        {st.labels.videoConsult}
                      </Button>
                      <Button size="sm" className="flex-1 gap-1 bg-[oklch(0.6_0.2_350)]">
                        <Calendar className="h-4 w-4" />
                        {st.labels.bookAppointment}
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="mt-4">
            <div className="space-y-3">
              {mockAppointments.length > 0 ? (
                mockAppointments.map((apt) => (
                  <Card key={apt.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant={apt.status === "upcoming" ? "default" : "secondary"}
                        className={apt.status === "upcoming" ? "bg-[oklch(0.6_0.2_350)]" : ""}
                      >
                        {apt.status === "upcoming"
                          ? language === "vi"
                            ? "Sắp tới"
                            : "Upcoming"
                          : language === "vi"
                            ? "Đã hoàn thành"
                            : "Completed"}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        {apt.type === "video" ? <Video className="h-3 w-3" /> : <User className="h-3 w-3" />}
                        {apt.type === "video" ? st.labels.videoConsult : st.labels.inPerson}
                      </span>
                    </div>
                    <h3 className="font-semibold">{apt.doctor}</h3>
                    <p className="text-sm text-muted-foreground">{apt.specialization}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {apt.time}
                      </span>
                    </div>
                    {apt.status === "upcoming" && (
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          {st.labels.reschedule}
                        </Button>
                        <Button size="sm" className="flex-1 bg-[oklch(0.6_0.2_350)]">
                          {apt.type === "video"
                            ? language === "vi"
                              ? "Tham gia"
                              : "Join Call"
                            : st.labels.viewDetails}
                        </Button>
                      </div>
                    )}
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === "vi" ? "Bạn chưa có lịch hẹn nào" : "You don't have any appointments yet"}
                  </p>
                  <Button className="mt-4 bg-[oklch(0.6_0.2_350)]">{st.labels.bookAppointment}</Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Medical Records Tab */}
          <TabsContent value="records" className="mt-4">
            <div className="space-y-3">
              <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{st.labels.prescriptions}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "vi" ? "3 đơn thuốc gần đây" : "3 recent prescriptions"}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{language === "vi" ? "Kết quả xét nghiệm" : "Lab Results"}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "vi" ? "5 kết quả gần đây" : "5 recent results"}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[oklch(0.6_0.2_350)]/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-[oklch(0.6_0.2_350)]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{st.labels.insurance}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "vi" ? "Quản lý bảo hiểm y tế" : "Manage your health insurance"}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </div>

            {/* Health Tips */}
            <section className="mt-8">
              <h3 className="font-semibold mb-4">{st.labels.healthTips}</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {healthTips.map((tip) => (
                  <Card key={tip.id} className="p-4 flex-shrink-0 w-[200px]">
                    <tip.icon className="h-8 w-8 text-[oklch(0.6_0.2_350)] mb-2" />
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* Emergency Button */}
        <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
          <Button size="lg" className="rounded-full h-14 w-14 bg-destructive hover:bg-destructive/90 shadow-lg">
            <Phone className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
