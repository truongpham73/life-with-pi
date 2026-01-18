"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Video, MessageSquare, Star, MapPin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n/context"
import Link from "next/link"

const mockAppointments = [
  {
    id: "APT-2026-001234",
    status: "upcoming",
    doctor: {
      name: "Dr. Nguyen Van Minh",
      specialization: "General Medicine",
      avatar: "/doctor-male-1.png",
      hospital: "Cho Ray Hospital",
    },
    type: "video",
    date: "Jan 16, 2026",
    time: "14:00",
    duration: "30 min",
    fee: 150,
    notes: "Regular checkup",
    meetingLink: "https://meet.pihealth.vn/abc123",
  },
  {
    id: "APT-2026-001233",
    status: "completed",
    doctor: {
      name: "Dr. Tran Thi Lan",
      specialization: "Gynecology",
      avatar: "/doctor-female-1.png",
      hospital: "Tu Du Hospital",
    },
    type: "in-person",
    date: "Jan 10, 2026",
    time: "10:00",
    duration: "45 min",
    fee: 180,
    notes: "Annual checkup",
    prescription: true,
    rating: 5,
  },
  {
    id: "APT-2026-001232",
    status: "upcoming",
    doctor: {
      name: "Dr. Le Hoang Nam",
      specialization: "Pediatrics",
      avatar: "/doctor-male-2.png",
      hospital: "Children Hospital 1",
    },
    type: "chat",
    date: "Jan 17, 2026",
    time: "09:00",
    duration: "20 min",
    fee: 100,
    notes: "Follow-up consultation",
  },
  {
    id: "APT-2026-001231",
    status: "cancelled",
    doctor: {
      name: "Dr. Pham Minh Duc",
      specialization: "Dental",
      avatar: "/doctor-male-3.png",
      hospital: "Nha Khoa Kim",
    },
    type: "in-person",
    date: "Jan 8, 2026",
    time: "15:00",
    duration: "60 min",
    fee: 120,
    cancelReason: "Schedule conflict",
  },
]

export default function AppointmentsPage() {
  const router = useRouter()
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof mockAppointments)[0] | null>(null)
  const [showDetail, setShowDetail] = useState(false)

  const t = {
    vi: {
      title: "Lịch hẹn của tôi",
      all: "Tất cả",
      upcoming: "Sắp tới",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      joinCall: "Tham gia",
      reschedule: "Đổi lịch",
      cancel: "Hủy",
      rate: "Đánh giá",
      rebook: "Đặt lại",
      viewPrescription: "Xem đơn thuốc",
      upcoming: "Sắp tới",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      video: "Video call",
      "in-person": "Trực tiếp",
      chat: "Chat",
      appointmentDetail: "Chi tiết lịch hẹn",
      consultationType: "Hình thức",
      dateTime: "Ngày giờ",
      fee: "Phí khám",
      notes: "Ghi chú",
      noAppointments: "Chưa có lịch hẹn nào",
      bookNow: "Đặt lịch ngay",
    },
    en: {
      title: "My Appointments",
      all: "All",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
      joinCall: "Join Call",
      reschedule: "Reschedule",
      cancel: "Cancel",
      rate: "Rate",
      rebook: "Rebook",
      viewPrescription: "View Prescription",
      upcoming: "Upcoming",
      completed: "Completed",
      cancelled: "Cancelled",
      video: "Video Call",
      "in-person": "In-person",
      chat: "Chat",
      appointmentDetail: "Appointment Detail",
      consultationType: "Type",
      dateTime: "Date & Time",
      fee: "Consultation Fee",
      notes: "Notes",
      noAppointments: "No appointments yet",
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
      case "video":
        return <Video className="h-4 w-4" />
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (activeTab === "all") return true
    return apt.status === activeTab
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
            <TabsTrigger value="upcoming" className="text-xs py-2">
              {txt.upcoming}
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

      {/* Appointments List */}
      <div className="p-4 space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">{txt.noAppointments}</p>
            <Link href="/services/pihealth">
              <Button className="bg-primary">{txt.bookNow}</Button>
            </Link>
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-card rounded-xl border p-4 space-y-3 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                setSelectedAppointment(apt)
                setShowDetail(true)
              }}
            >
              {/* Appointment Header */}
              <div className="flex items-start gap-3">
                <img
                  src={apt.doctor.avatar || "/placeholder.svg"}
                  alt={apt.doctor.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{apt.doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{apt.doctor.specialization}</p>
                      <p className="text-xs text-muted-foreground">{apt.doctor.hospital}</p>
                    </div>
                    <Badge className={getStatusColor(apt.status)}>
                      {txt[apt.status as keyof typeof txt] || apt.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{apt.time}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getTypeIcon(apt.type)}
                  <span>{txt[apt.type as keyof typeof txt] || apt.type}</span>
                </div>
              </div>

              {/* Fee */}
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm text-muted-foreground">{txt.fee}</span>
                <span className="font-bold text-primary">{apt.fee}π</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {apt.status === "upcoming" && apt.type === "video" && (
                  <Button
                    className="flex-1 bg-primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(apt.meetingLink, "_blank")
                    }}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    {txt.joinCall}
                  </Button>
                )}
                {apt.status === "upcoming" && (
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={(e) => e.stopPropagation()}>
                    {txt.reschedule}
                  </Button>
                )}
                {apt.status === "completed" && (
                  <>
                    {apt.prescription && (
                      <Button
                        variant="outline"
                        className="flex-1 gap-1 bg-transparent"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FileText className="h-4 w-4" />
                        {txt.viewPrescription}
                      </Button>
                    )}
                    {!apt.rating && (
                      <Button className="flex-1 bg-primary" onClick={(e) => e.stopPropagation()}>
                        <Star className="h-4 w-4 mr-2" />
                        {txt.rate}
                      </Button>
                    )}
                  </>
                )}
                {apt.status === "cancelled" && (
                  <Button className="flex-1 bg-primary" onClick={(e) => e.stopPropagation()}>
                    {txt.rebook}
                  </Button>
                )}
              </div>

              {/* Rating */}
              {apt.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">{language === "vi" ? "Đánh giá:" : "Rating:"}</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < apt.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{txt.appointmentDetail}</DialogTitle>
          </DialogHeader>

          {selectedAppointment && (
            <div className="space-y-4">
              {/* Doctor Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <img
                  src={selectedAppointment.doctor.avatar || "/placeholder.svg"}
                  alt={selectedAppointment.doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{selectedAppointment.doctor.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.doctor.specialization}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.doctor.hospital}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{txt.consultationType}</span>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(selectedAppointment.type)}
                    <span>{txt[selectedAppointment.type as keyof typeof txt]}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{txt.dateTime}</span>
                  <span>
                    {selectedAppointment.date}, {selectedAppointment.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{txt.fee}</span>
                  <span className="font-bold text-primary">{selectedAppointment.fee}π</span>
                </div>
                {selectedAppointment.notes && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{txt.notes}</span>
                    <span>{selectedAppointment.notes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
