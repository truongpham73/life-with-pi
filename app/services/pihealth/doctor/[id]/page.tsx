"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  ChevronLeft,
  Star,
  Clock,
  MapPin,
  Video,
  MessageSquare,
  Building,
  Award,
  ThumbsUp,
  CalendarIcon,
  CheckCircle,
  Globe,
  GraduationCap,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock doctor data
const doctorData = {
  id: 1,
  name: "BS. Nguyễn Văn Minh",
  nameEn: "Dr. Nguyen Van Minh",
  image: "/asian-male-doctor-portrait.png",
  specialization: "Nội tổng quát",
  specializationEn: "General Internal Medicine",
  hospital: "Bệnh viện Chợ Rẫy",
  hospitalEn: "Cho Ray Hospital",
  address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
  experience: 15,
  patients: 5600,
  rating: 4.9,
  reviews: 890,
  consultationFee: 150,
  videoFee: 120,
  chatFee: 80,
  available: true,
  languages: ["Tiếng Việt", "English"],
  education: [
    { degree: "Tiến sĩ Y khoa", degreeEn: "PhD in Medicine", institution: "Đại học Y Dược TP.HCM", year: 2015 },
    { degree: "Thạc sĩ Y khoa", degreeEn: "Master of Medicine", institution: "Đại học Y Dược TP.HCM", year: 2010 },
    { degree: "Bác sĩ Đa khoa", degreeEn: "Doctor of Medicine", institution: "Đại học Y Dược TP.HCM", year: 2005 },
  ],
  certifications: [
    "Chứng chỉ hành nghề khám chữa bệnh",
    "Chứng chỉ Nội khoa chuyên sâu",
    "Thành viên Hội Tim mạch Việt Nam",
  ],
  bio: "BS. Nguyễn Văn Minh có hơn 15 năm kinh nghiệm trong lĩnh vực Nội tổng quát. Ông chuyên điều trị các bệnh lý nội khoa phức tạp, đặc biệt là các bệnh về tim mạch, tiêu hóa và hô hấp. Với phương pháp tiếp cận toàn diện và tận tâm, BS. Minh luôn đặt sức khỏe bệnh nhân lên hàng đầu.",
  bioEn:
    "Dr. Nguyen Van Minh has over 15 years of experience in General Internal Medicine. He specializes in treating complex internal medicine conditions, especially cardiovascular, digestive, and respiratory diseases. With a comprehensive and dedicated approach, Dr. Minh always puts patient health first.",
  services: [
    "Khám tổng quát",
    "Tư vấn bệnh lý tim mạch",
    "Điều trị bệnh tiêu hóa",
    "Khám sức khỏe định kỳ",
    "Tư vấn dinh dưỡng",
  ],
  servicesEn: [
    "General checkup",
    "Cardiovascular consultation",
    "Digestive disease treatment",
    "Periodic health examination",
    "Nutrition counseling",
  ],
}

// Time slots
const timeSlots = [
  { time: "08:00", available: true },
  { time: "08:30", available: true },
  { time: "09:00", available: false },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: false },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: false },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
]

// Reviews
const reviews = [
  {
    id: 1,
    user: "Nguyễn T.",
    rating: 5,
    date: "3 ngày trước",
    dateEn: "3 days ago",
    comment: "Bác sĩ rất tận tâm và chu đáo. Giải thích bệnh tình rõ ràng, dễ hiểu. Rất hài lòng với buổi khám.",
    commentEn:
      "Doctor is very dedicated and thoughtful. Explains conditions clearly and understandably. Very satisfied.",
    type: "video",
  },
  {
    id: 2,
    user: "Trần M.",
    rating: 5,
    date: "1 tuần trước",
    dateEn: "1 week ago",
    comment: "Đặt lịch dễ dàng, khám đúng giờ. Bác sĩ lắng nghe và tư vấn rất kỹ. Sẽ quay lại khám lần sau.",
    commentEn: "Easy to book, on-time consultation. Doctor listens and advises thoroughly. Will return.",
    type: "in-person",
  },
]

export default function DoctorDetailPage() {
  const { language } = useI18n()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [consultType, setConsultType] = useState<"video" | "in-person" | "chat">("video")
  const [bookingStep, setBookingStep] = useState<"select" | "confirm" | "success">("select")

  const isVietnamese = language === "vi"
  const doctor = doctorData

  const getFee = () => {
    switch (consultType) {
      case "video":
        return doctor.videoFee
      case "chat":
        return doctor.chatFee
      default:
        return doctor.consultationFee
    }
  }

  const handleConfirmBooking = () => {
    setBookingStep("confirm")
  }

  const handleBookAppointment = () => {
    setBookingStep("success")
  }

  if (bookingStep === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{isVietnamese ? "Đặt lịch thành công!" : "Appointment Booked!"}</h1>
          <p className="text-muted-foreground mb-6">
            {isVietnamese
              ? "Lịch hẹn của bạn đã được xác nhận. Chúng tôi sẽ gửi thông báo nhắc nhở trước giờ hẹn."
              : "Your appointment has been confirmed. We'll send a reminder before your appointment."}
          </p>

          <Card className="p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold">{isVietnamese ? doctor.name : doctor.nameEn}</p>
                <p className="text-sm text-muted-foreground">
                  {isVietnamese ? doctor.specialization : doctor.specializationEn}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedDate?.toLocaleDateString(isVietnamese ? "vi-VN" : "en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                {consultType === "video" ? (
                  <Video className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Building className="h-4 w-4 text-muted-foreground" />
                )}
                <span>
                  {consultType === "video"
                    ? isVietnamese
                      ? "Khám qua video"
                      : "Video consultation"
                    : consultType === "chat"
                      ? isVietnamese
                        ? "Tư vấn qua chat"
                        : "Chat consultation"
                      : isVietnamese
                        ? "Khám trực tiếp"
                        : "In-person visit"}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => router.push("/services/pihealth")}
            >
              {isVietnamese ? "Về trang chủ" : "Back to Home"}
            </Button>
            <Button
              className="flex-1 bg-[oklch(0.6_0.2_350)] hover:bg-[oklch(0.5_0.2_350)]"
              onClick={() => router.push("/services/pihealth/appointments")}
            >
              {isVietnamese ? "Xem lịch hẹn" : "View Appointments"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="font-semibold text-lg">{isVietnamese ? "Thông tin bác sĩ" : "Doctor Profile"}</h1>
        </div>
      </div>

      <div className="container px-4 py-4">
        {/* Doctor Card */}
        <Card className="p-4 mb-4">
          <div className="flex gap-4">
            <div className="h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-lg">{isVietnamese ? doctor.name : doctor.nameEn}</h2>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese ? doctor.specialization : doctor.specializationEn}
                  </p>
                </div>
                {doctor.available && (
                  <Badge className="bg-green-100 text-green-700 border-0">
                    {isVietnamese ? "Có lịch" : "Available"}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-muted-foreground">
                  ({doctor.reviews} {isVietnamese ? "đánh giá" : "reviews"})
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{isVietnamese ? doctor.hospital : doctor.hospitalEn}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-[oklch(0.6_0.2_350)]">{doctor.experience}</p>
              <p className="text-xs text-muted-foreground">{isVietnamese ? "Năm KN" : "Years Exp"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[oklch(0.6_0.2_350)]">{(doctor.patients / 1000).toFixed(1)}K</p>
              <p className="text-xs text-muted-foreground">{isVietnamese ? "Bệnh nhân" : "Patients"}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[oklch(0.6_0.2_350)]">{doctor.rating}</p>
              <p className="text-xs text-muted-foreground">{isVietnamese ? "Đánh giá" : "Rating"}</p>
            </div>
          </div>
        </Card>

        {/* Consultation Types */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card
            className={`p-3 cursor-pointer text-center transition-all ${consultType === "video" ? "border-[oklch(0.6_0.2_350)] bg-[oklch(0.6_0.2_350)]/5" : ""}`}
            onClick={() => setConsultType("video")}
          >
            <Video
              className={`h-6 w-6 mx-auto mb-2 ${consultType === "video" ? "text-[oklch(0.6_0.2_350)]" : "text-muted-foreground"}`}
            />
            <p className="text-sm font-medium">{isVietnamese ? "Video" : "Video"}</p>
            <p className="text-xs text-primary font-semibold">π {doctor.videoFee}</p>
          </Card>
          <Card
            className={`p-3 cursor-pointer text-center transition-all ${consultType === "in-person" ? "border-[oklch(0.6_0.2_350)] bg-[oklch(0.6_0.2_350)]/5" : ""}`}
            onClick={() => setConsultType("in-person")}
          >
            <Building
              className={`h-6 w-6 mx-auto mb-2 ${consultType === "in-person" ? "text-[oklch(0.6_0.2_350)]" : "text-muted-foreground"}`}
            />
            <p className="text-sm font-medium">{isVietnamese ? "Trực tiếp" : "In-person"}</p>
            <p className="text-xs text-primary font-semibold">π {doctor.consultationFee}</p>
          </Card>
          <Card
            className={`p-3 cursor-pointer text-center transition-all ${consultType === "chat" ? "border-[oklch(0.6_0.2_350)] bg-[oklch(0.6_0.2_350)]/5" : ""}`}
            onClick={() => setConsultType("chat")}
          >
            <MessageSquare
              className={`h-6 w-6 mx-auto mb-2 ${consultType === "chat" ? "text-[oklch(0.6_0.2_350)]" : "text-muted-foreground"}`}
            />
            <p className="text-sm font-medium">{isVietnamese ? "Chat" : "Chat"}</p>
            <p className="text-xs text-primary font-semibold">π {doctor.chatFee}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="info">{isVietnamese ? "Thông tin" : "Info"}</TabsTrigger>
            <TabsTrigger value="schedule">{isVietnamese ? "Đặt lịch" : "Schedule"}</TabsTrigger>
            <TabsTrigger value="reviews">{isVietnamese ? "Đánh giá" : "Reviews"}</TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="mt-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Giới thiệu" : "About"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isVietnamese ? doctor.bio : doctor.bioEn}
              </p>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[oklch(0.6_0.2_350)]" />
                {isVietnamese ? "Học vấn" : "Education"}
              </h3>
              <div className="space-y-3">
                {doctor.education.map((edu, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[oklch(0.6_0.2_350)] mt-2" />
                    <div>
                      <p className="font-medium text-sm">{isVietnamese ? edu.degree : edu.degreeEn}</p>
                      <p className="text-xs text-muted-foreground">
                        {edu.institution} • {edu.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-[oklch(0.6_0.2_350)]" />
                {isVietnamese ? "Chứng chỉ" : "Certifications"}
              </h3>
              <div className="space-y-2">
                {doctor.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Dịch vụ khám" : "Services"}</h3>
              <div className="flex flex-wrap gap-2">
                {(isVietnamese ? doctor.services : doctor.servicesEn).map((service, idx) => (
                  <Badge key={idx} variant="secondary">
                    {service}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[oklch(0.6_0.2_350)]" />
                {isVietnamese ? "Ngôn ngữ" : "Languages"}
              </h3>
              <div className="flex gap-2">
                {doctor.languages.map((lang, idx) => (
                  <Badge key={idx} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[oklch(0.6_0.2_350)]" />
                {isVietnamese ? "Địa chỉ phòng khám" : "Clinic Address"}
              </h3>
              <p className="text-sm text-muted-foreground">{doctor.address}</p>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="mt-4 space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Chọn ngày" : "Select Date"}</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border w-full"
                disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              />
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Chọn giờ" : "Select Time"}</h3>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    size="sm"
                    disabled={!slot.available}
                    className={`${selectedTime === slot.time ? "bg-[oklch(0.6_0.2_350)]" : "bg-transparent"} ${!slot.available ? "opacity-50" : ""}`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[oklch(0.6_0.2_350)]">{doctor.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {doctor.reviews} {isVietnamese ? "đánh giá" : "reviews"}
                  </p>
                </div>
              </div>
            </Card>

            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">{review.user[0]}</span>
                    </div>
                    <span className="font-medium">{review.user}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{isVietnamese ? review.date : review.dateEn}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3 w-3 ${star <= review.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {review.type === "video"
                      ? isVietnamese
                        ? "Video"
                        : "Video"
                      : isVietnamese
                        ? "Trực tiếp"
                        : "In-person"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{isVietnamese ? review.comment : review.commentEn}</p>
                <Button variant="ghost" size="sm" className="mt-2 gap-1 text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  {isVietnamese ? "Hữu ích" : "Helpful"}
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Book Button */}
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
        <Button
          className="w-full h-14 bg-[oklch(0.6_0.2_350)] hover:bg-[oklch(0.5_0.2_350)] shadow-xl rounded-2xl"
          disabled={activeTab === "schedule" && (!selectedDate || !selectedTime)}
          onClick={activeTab === "schedule" ? handleConfirmBooking : () => setActiveTab("schedule")}
        >
          {activeTab === "schedule"
            ? isVietnamese
              ? `Đặt lịch • π ${getFee()}`
              : `Book Appointment • π ${getFee()}`
            : isVietnamese
              ? "Đặt lịch khám"
              : "Book Appointment"}
        </Button>
      </div>

      {/* Confirmation Modal */}
      {bookingStep === "confirm" && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
          <Card className="w-full max-w-md m-4 p-6 rounded-t-3xl md:rounded-3xl">
            <h3 className="text-xl font-bold mb-4 text-center">
              {isVietnamese ? "Xác nhận đặt lịch" : "Confirm Booking"}
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{isVietnamese ? doctor.name : doctor.nameEn}</p>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese ? doctor.specialization : doctor.specializationEn}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isVietnamese ? "Loại khám" : "Type"}</span>
                  <span className="font-medium">
                    {consultType === "video"
                      ? isVietnamese
                        ? "Khám qua video"
                        : "Video call"
                      : consultType === "chat"
                        ? isVietnamese
                          ? "Tư vấn qua chat"
                          : "Chat consultation"
                        : isVietnamese
                          ? "Khám trực tiếp"
                          : "In-person visit"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isVietnamese ? "Ngày" : "Date"}</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString(isVietnamese ? "vi-VN" : "en-US")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{isVietnamese ? "Giờ" : "Time"}</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="font-semibold">{isVietnamese ? "Phí khám" : "Consultation Fee"}</span>
                  <span className="font-bold text-lg text-primary">π {getFee()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setBookingStep("select")}>
                {isVietnamese ? "Quay lại" : "Back"}
              </Button>
              <Button
                className="flex-1 bg-[oklch(0.6_0.2_350)] hover:bg-[oklch(0.5_0.2_350)]"
                onClick={handleBookAppointment}
              >
                {isVietnamese ? "Xác nhận" : "Confirm"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
