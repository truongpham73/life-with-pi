"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ChevronLeft,
  Star,
  Clock,
  BookOpen,
  Play,
  Heart,
  Award,
  CheckCircle,
  Lock,
  Download,
  Share2,
  Globe,
  FileText,
  PlayCircle,
  Monitor,
  Smartphone,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock course data
const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp 2026",
  titleVi: "Bootcamp Phát triển Web Toàn diện 2026",
  subtitle: "Become a full-stack web developer with just ONE course",
  subtitleVi: "Trở thành lập trình viên full-stack chỉ với MỘT khóa học",
  image: "/web-development-course.png",
  previewVideo: "/web-development-course-preview-video.jpg",
  instructor: {
    name: "Nguyễn Văn A",
    avatar: "/asian-male-instructor.png",
    title: "Senior Full-Stack Developer",
    titleVi: "Lập trình viên Full-Stack cao cấp",
    rating: 4.9,
    reviews: 45000,
    students: 250000,
    courses: 12,
    bio: "10+ years of experience in web development. Former engineer at Google and Facebook.",
    bioVi: "10+ năm kinh nghiệm phát triển web. Cựu kỹ sư tại Google và Facebook.",
  },
  rating: 4.9,
  reviews: 12500,
  students: 85000,
  hours: 65,
  lessons: 420,
  articles: 85,
  downloads: 120,
  price: 299,
  originalPrice: 599,
  lastUpdated: "January 2026",
  language: "Vietnamese, English",
  level: "beginner",
  bestseller: true,
  certificate: true,
  lifetime: true,
  description:
    "This course is the most comprehensive web development course available. Whether you want to become a full-stack developer, or just want to learn how to build websites, this course has everything you need.",
  descriptionVi:
    "Đây là khóa học phát triển web toàn diện nhất hiện có. Dù bạn muốn trở thành lập trình viên full-stack hay chỉ muốn học cách xây dựng website, khóa học này có mọi thứ bạn cần.",
  whatYouLearn: [
    "Build 25+ real-world projects",
    "Master HTML, CSS, JavaScript, React, Node.js",
    "Learn to build responsive websites",
    "Work with databases like MongoDB and PostgreSQL",
    "Deploy your apps to the cloud",
    "Build RESTful APIs and GraphQL",
    "Authentication and authorization",
    "Testing and debugging",
  ],
  whatYouLearnVi: [
    "Xây dựng 25+ dự án thực tế",
    "Thành thạo HTML, CSS, JavaScript, React, Node.js",
    "Học cách xây dựng website responsive",
    "Làm việc với cơ sở dữ liệu MongoDB và PostgreSQL",
    "Triển khai ứng dụng lên cloud",
    "Xây dựng RESTful APIs và GraphQL",
    "Xác thực và phân quyền",
    "Kiểm thử và gỡ lỗi",
  ],
  requirements: ["No programming experience needed", "A computer with internet access", "Willingness to learn"],
  requirementsVi: ["Không cần kinh nghiệm lập trình", "Máy tính có kết nối internet", "Sẵn sàng học hỏi"],
}

// Course sections
const courseSections = [
  {
    id: 1,
    title: "Introduction to Web Development",
    titleVi: "Giới thiệu về Phát triển Web",
    lessons: [
      {
        id: 1,
        title: "Welcome to the Course",
        titleVi: "Chào mừng đến khóa học",
        duration: "5:20",
        free: true,
        completed: true,
      },
      {
        id: 2,
        title: "How the Internet Works",
        titleVi: "Internet hoạt động như thế nào",
        duration: "12:45",
        free: true,
        completed: true,
      },
      {
        id: 3,
        title: "Setting Up Your Development Environment",
        titleVi: "Cài đặt môi trường phát triển",
        duration: "18:30",
        free: false,
        completed: false,
      },
      {
        id: 4,
        title: "Your First Website",
        titleVi: "Website đầu tiên của bạn",
        duration: "25:10",
        free: false,
        completed: false,
      },
    ],
    totalDuration: "1h 2m",
  },
  {
    id: 2,
    title: "HTML Fundamentals",
    titleVi: "Cơ bản về HTML",
    lessons: [
      {
        id: 5,
        title: "HTML Document Structure",
        titleVi: "Cấu trúc tài liệu HTML",
        duration: "15:20",
        free: false,
        completed: false,
      },
      {
        id: 6,
        title: "Text Elements and Formatting",
        titleVi: "Phần tử văn bản và định dạng",
        duration: "22:15",
        free: false,
        completed: false,
      },
      {
        id: 7,
        title: "Links and Navigation",
        titleVi: "Liên kết và điều hướng",
        duration: "18:40",
        free: false,
        completed: false,
      },
      {
        id: 8,
        title: "Images and Multimedia",
        titleVi: "Hình ảnh và đa phương tiện",
        duration: "20:55",
        free: false,
        completed: false,
      },
      {
        id: 9,
        title: "Forms and User Input",
        titleVi: "Form và nhập liệu",
        duration: "28:30",
        free: false,
        completed: false,
      },
      {
        id: 10,
        title: "HTML5 Semantic Elements",
        titleVi: "Phần tử ngữ nghĩa HTML5",
        duration: "16:45",
        free: false,
        completed: false,
      },
    ],
    totalDuration: "2h 5m",
  },
  {
    id: 3,
    title: "CSS Styling",
    titleVi: "Định dạng CSS",
    lessons: [
      {
        id: 11,
        title: "Introduction to CSS",
        titleVi: "Giới thiệu CSS",
        duration: "12:30",
        free: false,
        completed: false,
      },
      {
        id: 12,
        title: "Selectors and Properties",
        titleVi: "Selector và thuộc tính",
        duration: "25:20",
        free: false,
        completed: false,
      },
      { id: 13, title: "Box Model", titleVi: "Box Model", duration: "18:45", free: false, completed: false },
      { id: 14, title: "Flexbox Layout", titleVi: "Bố cục Flexbox", duration: "32:10", free: false, completed: false },
      { id: 15, title: "CSS Grid", titleVi: "CSS Grid", duration: "35:25", free: false, completed: false },
      {
        id: 16,
        title: "Responsive Design",
        titleVi: "Thiết kế Responsive",
        duration: "28:40",
        free: false,
        completed: false,
      },
    ],
    totalDuration: "2h 33m",
  },
  {
    id: 4,
    title: "JavaScript Basics",
    titleVi: "Cơ bản JavaScript",
    lessons: [
      {
        id: 17,
        title: "Introduction to JavaScript",
        titleVi: "Giới thiệu JavaScript",
        duration: "15:00",
        free: false,
        completed: false,
      },
      {
        id: 18,
        title: "Variables and Data Types",
        titleVi: "Biến và kiểu dữ liệu",
        duration: "22:30",
        free: false,
        completed: false,
      },
      { id: 19, title: "Functions", titleVi: "Hàm", duration: "28:15", free: false, completed: false },
      { id: 20, title: "DOM Manipulation", titleVi: "Thao tác DOM", duration: "35:40", free: false, completed: false },
    ],
    totalDuration: "1h 41m",
  },
  {
    id: 5,
    title: "React.js",
    titleVi: "React.js",
    lessons: [
      {
        id: 21,
        title: "Introduction to React",
        titleVi: "Giới thiệu React",
        duration: "18:20",
        free: false,
        completed: false,
      },
      {
        id: 22,
        title: "Components and Props",
        titleVi: "Components và Props",
        duration: "25:45",
        free: false,
        completed: false,
      },
      {
        id: 23,
        title: "State and Lifecycle",
        titleVi: "State và Lifecycle",
        duration: "32:10",
        free: false,
        completed: false,
      },
      { id: 24, title: "Hooks", titleVi: "Hooks", duration: "45:30", free: false, completed: false },
    ],
    totalDuration: "2h 2m",
  },
]

// Reviews
const reviews = [
  {
    id: 1,
    user: "Trần Minh",
    avatar: "/asian-man-avatar-1.jpg",
    rating: 5,
    date: "1 tuần trước",
    dateEn: "1 week ago",
    comment:
      "Khóa học tuyệt vời! Giảng viên giải thích rất dễ hiểu. Tôi đã có thể xây dựng website đầu tiên chỉ sau 2 tuần học.",
    commentEn:
      "Excellent course! The instructor explains very clearly. I was able to build my first website after just 2 weeks.",
    helpful: 156,
  },
  {
    id: 2,
    user: "Nguyễn Lan",
    avatar: "/asian-woman-avatar-1.jpg",
    rating: 5,
    date: "2 tuần trước",
    dateEn: "2 weeks ago",
    comment: "Nội dung rất chi tiết và thực tế. Các dự án thực hành giúp tôi hiểu sâu hơn. Highly recommended!",
    commentEn:
      "Very detailed and practical content. The hands-on projects helped me understand better. Highly recommended!",
    helpful: 98,
  },
]

export default function CourseDetailPage() {
  const { language } = useI18n()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)

  const isVietnamese = language === "vi"
  const course = courseData

  const totalLessons = courseSections.reduce((sum, section) => sum + section.lessons.length, 0)
  const completedLessons = courseSections.reduce(
    (sum, section) => sum + section.lessons.filter((l) => l.completed).length,
    0,
  )
  const progress = Math.round((completedLessons / totalLessons) * 100)

  const handleEnroll = () => {
    setIsEnrolled(true)
    setCurrentLesson(1)
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container px-4 h-14 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Course Preview */}
      <div className="relative aspect-video bg-black">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button size="lg" className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-[oklch(0.55_0.2_270)]">
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
          <span className="text-sm bg-black/50 px-2 py-1 rounded">
            {isVietnamese ? "Xem trước miễn phí" : "Free Preview"}
          </span>
        </div>
      </div>

      <div className="container px-4 py-4">
        {/* Course Title & Info */}
        <div className="mb-4">
          {course.bestseller && (
            <Badge className="mb-2 bg-primary">{isVietnamese ? "Bán chạy nhất" : "Bestseller"}</Badge>
          )}
          <h1 className="text-xl font-bold mb-2">{isVietnamese ? course.titleVi : course.title}</h1>
          <p className="text-muted-foreground text-sm mb-3">{isVietnamese ? course.subtitleVi : course.subtitle}</p>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="font-semibold">{course.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({course.reviews.toLocaleString()} {isVietnamese ? "đánh giá" : "reviews"})
            </span>
            <span className="text-sm text-muted-foreground">
              {course.students.toLocaleString()} {isVietnamese ? "học viên" : "students"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>{isVietnamese ? "Tạo bởi" : "Created by"}</span>
            <span className="text-[oklch(0.55_0.2_270)] font-medium">{course.instructor.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.hours} {isVietnamese ? "giờ" : "hours"}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {course.lessons} {isVietnamese ? "bài học" : "lessons"}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {course.language}
            </span>
            <span className="flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              {isVietnamese ? "Mọi thiết bị" : "All devices"}
            </span>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {isEnrolled && (
          <Card className="p-4 mb-4 bg-[oklch(0.55_0.2_270)]/5 border-[oklch(0.55_0.2_270)]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{isVietnamese ? "Tiến độ của bạn" : "Your Progress"}</span>
              <span className="text-sm text-[oklch(0.55_0.2_270)] font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              {completedLessons}/{totalLessons} {isVietnamese ? "bài học hoàn thành" : "lessons completed"}
            </p>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12 mb-4">
            <TabsTrigger value="overview">{isVietnamese ? "Tổng quan" : "Overview"}</TabsTrigger>
            <TabsTrigger value="curriculum">{isVietnamese ? "Nội dung" : "Curriculum"}</TabsTrigger>
            <TabsTrigger value="reviews">{isVietnamese ? "Đánh giá" : "Reviews"}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0 space-y-4">
            {/* What You'll Learn */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">{isVietnamese ? "Bạn sẽ học được gì" : "What You'll Learn"}</h3>
              <div className="grid grid-cols-1 gap-3">
                {(isVietnamese ? course.whatYouLearnVi : course.whatYouLearn).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Course Includes */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">{isVietnamese ? "Khóa học bao gồm" : "This Course Includes"}</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <PlayCircle className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {course.hours} {isVietnamese ? "giờ video" : "hours video"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {course.articles} {isVietnamese ? "bài viết" : "articles"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {course.downloads} {isVietnamese ? "tài liệu" : "downloads"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <span>{isVietnamese ? "Truy cập mọi nơi" : "Mobile access"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span>{isVietnamese ? "Chứng chỉ" : "Certificate"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{isVietnamese ? "Truy cập trọn đời" : "Lifetime access"}</span>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Mô tả" : "Description"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isVietnamese ? course.descriptionVi : course.description}
              </p>
            </Card>

            {/* Requirements */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Yêu cầu" : "Requirements"}</h3>
              <ul className="space-y-2">
                {(isVietnamese ? course.requirementsVi : course.requirements).map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Instructor */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">{isVietnamese ? "Giảng viên" : "Instructor"}</h3>
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[oklch(0.55_0.2_270)]">{course.instructor.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {isVietnamese ? course.instructor.titleVi : course.instructor.title}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      {course.instructor.rating}
                    </span>
                    <span>
                      {course.instructor.reviews.toLocaleString()} {isVietnamese ? "đánh giá" : "reviews"}
                    </span>
                    <span>
                      {course.instructor.students.toLocaleString()} {isVietnamese ? "học viên" : "students"}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                {isVietnamese ? course.instructor.bioVi : course.instructor.bio}
              </p>
            </Card>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="mt-0">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span>
                {courseSections.length} {isVietnamese ? "phần" : "sections"} • {totalLessons}{" "}
                {isVietnamese ? "bài học" : "lessons"} • {course.hours} {isVietnamese ? "giờ" : "hours"}
              </span>
            </div>

            <Accordion type="multiple" className="space-y-2">
              {courseSections.map((section) => (
                <AccordionItem key={section.id} value={`section-${section.id}`} className="border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-sm">{isVietnamese ? section.titleVi : section.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {section.lessons.length} {isVietnamese ? "bài học" : "lessons"} • {section.totalDuration}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pb-2">
                      {section.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center gap-3 p-2 rounded-lg ${
                            lesson.free || isEnrolled ? "cursor-pointer hover:bg-muted/50" : ""
                          }`}
                          onClick={() => (lesson.free || isEnrolled) && setCurrentLesson(lesson.id)}
                        >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              lesson.completed
                                ? "bg-green-100 text-green-600"
                                : lesson.free || isEnrolled
                                  ? "bg-[oklch(0.55_0.2_270)]/10 text-[oklch(0.55_0.2_270)]"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {lesson.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : lesson.free || isEnrolled ? (
                              <Play className="h-4 w-4" />
                            ) : (
                              <Lock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${lesson.completed ? "text-muted-foreground" : ""}`}>
                              {isVietnamese ? lesson.titleVi : lesson.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                              {lesson.free && (
                                <Badge variant="secondary" className="text-[10px] px-1 py-0">
                                  {isVietnamese ? "Miễn phí" : "Free"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[oklch(0.55_0.2_270)]">{course.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.reviews.toLocaleString()} {isVietnamese ? "đánh giá" : "reviews"}
                  </p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-3">{star}</span>
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{isVietnamese ? review.date : review.dateEn}</span>
                </div>
                <p className="text-sm text-muted-foreground">{isVietnamese ? review.comment : review.commentEn}</p>
                <Button variant="ghost" size="sm" className="mt-2 gap-1 text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  {isVietnamese ? "Hữu ích" : "Helpful"} ({review.helpful})
                </Button>
              </Card>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              {isVietnamese ? "Xem thêm đánh giá" : "View More Reviews"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
        <Card className="p-4 shadow-xl rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">π {course.price}</span>
                <span className="text-sm text-muted-foreground line-through">π {course.originalPrice}</span>
                <Badge variant="secondary" className="text-xs">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {isVietnamese ? "Bao gồm truy cập trọn đời" : "Includes lifetime access"}
              </p>
            </div>
            <Button
              className="h-12 px-6 bg-[oklch(0.55_0.2_270)] hover:bg-[oklch(0.45_0.2_270)]"
              onClick={isEnrolled ? () => setActiveTab("curriculum") : handleEnroll}
            >
              {isEnrolled
                ? isVietnamese
                  ? "Tiếp tục học"
                  : "Continue Learning"
                : isVietnamese
                  ? "Đăng ký ngay"
                  : "Enroll Now"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
