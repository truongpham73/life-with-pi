"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiLearnIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Users, BookOpen, Play, Heart, Award, ChevronRight, Filter, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const mockCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    image: "/web-development-course.png",
    instructor: "Nguyen Van A",
    category: "programming",
    level: "beginner",
    rating: 4.9,
    reviews: 12500,
    students: 85000,
    hours: 65,
    lessons: 420,
    price: 299,
    originalPrice: 599,
    bestseller: true,
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    image: "/digital-marketing-course.png",
    instructor: "Tran Thi B",
    category: "marketing",
    level: "intermediate",
    rating: 4.8,
    reviews: 8900,
    students: 52000,
    hours: 42,
    lessons: 280,
    price: 199,
    originalPrice: 399,
    bestseller: true,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    image: "/ui-ux-design-course.png",
    instructor: "Le Van C",
    category: "design",
    level: "beginner",
    rating: 4.7,
    reviews: 5600,
    students: 32000,
    hours: 28,
    lessons: 180,
    price: 149,
    originalPrice: 299,
    bestseller: false,
  },
  {
    id: 4,
    title: "Blockchain & Cryptocurrency Guide",
    image: "/blockchain-crypto-course.jpg",
    instructor: "Pham Van D",
    category: "crypto",
    level: "beginner",
    rating: 4.9,
    reviews: 7200,
    students: 45000,
    hours: 35,
    lessons: 220,
    price: 249,
    originalPrice: 499,
    bestseller: true,
  },
  {
    id: 5,
    title: "Business English Communication",
    image: "/business-english-course.png",
    instructor: "Sarah Johnson",
    category: "language",
    level: "intermediate",
    rating: 4.6,
    reviews: 3400,
    students: 18000,
    hours: 20,
    lessons: 120,
    price: 99,
    originalPrice: 199,
    bestseller: false,
  },
]

const mockEnrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2026",
    image: "/web-development-concept.png",
    instructor: "Nguyen Van A",
    progress: 45,
    lastLesson: "Section 12: React Fundamentals",
    totalLessons: 420,
    completedLessons: 189,
  },
  {
    id: 4,
    title: "Blockchain & Cryptocurrency Guide",
    image: "/interconnected-blocks.png",
    instructor: "Pham Van D",
    progress: 15,
    lastLesson: "Section 3: Understanding Bitcoin",
    totalLessons: 220,
    completedLessons: 33,
  },
]

const mockCertificates = [
  {
    id: 1,
    title: "Python for Data Science",
    issueDate: "Dec 2025",
    instructor: "DataCamp Vietnam",
  },
]

export default function PiLearnPage() {
  const { language } = useI18n()
  const st = serviceTranslations[language].piLearn
  const [activeTab, setActiveTab] = useState("explore")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { key: "all", label: st.categories.all },
    { key: "programming", label: st.categories.programming },
    { key: "business", label: st.categories.business },
    { key: "design", label: st.categories.design },
    { key: "marketing", label: st.categories.marketing },
    { key: "language", label: st.categories.language },
    { key: "crypto", label: st.categories.crypto },
  ]

  const filteredCourses = mockCourses.filter((c) => {
    if (selectedCategory !== "all" && c.category !== selectedCategory) return false
    if (selectedLevel !== "all" && c.level !== selectedLevel) return false
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title={language === "vi" ? "PiLearn" : "PiLearn"}
        icon={<PiLearnIcon className="w-full h-full" />}
        colorClass="bg-[oklch(0.55_0.2_270)] text-white"
        searchPlaceholder={st.labels.searchCourses}
        onSearch={setSearchQuery}
      />

      <div className="container px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="explore" className="gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.courses}</span>
            </TabsTrigger>
            <TabsTrigger value="my-courses" className="gap-1">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.myCourses}</span>
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.certificates}</span>
            </TabsTrigger>
          </TabsList>

          {/* Explore Courses Tab */}
          <TabsContent value="explore" className="mt-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={selectedCategory === cat.key ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-shrink-0 rounded-full",
                    selectedCategory === cat.key ? "bg-[oklch(0.55_0.2_270)]" : "bg-transparent",
                  )}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                <Filter className="h-4 w-4" />
                {st.labels.filterBy}
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                {st.labels.sortBy}: {st.labels.mostPopular}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCourses.map((course) => (
                <Link key={course.id} href={`/services/pilearn/course/${course.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      {course.bestseller && (
                        <Badge className="absolute top-2 left-2 bg-primary">{st.labels.bestseller}</Badge>
                      )}
                      <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({course.reviews.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.hours} {st.labels.hours}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {course.lessons} {st.labels.lessons}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {(course.students / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">π {course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">π {course.originalPrice}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="my-courses" className="mt-4">
            {mockEnrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {mockEnrolledCourses.map((course) => (
                  <Card key={course.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="h-20 w-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>
                              {course.progress}% {st.labels.completed.toLowerCase()}
                            </span>
                            <span className="text-muted-foreground">
                              {course.completedLessons}/{course.totalLessons} {st.labels.lessons}
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground line-clamp-1">{course.lastLesson}</p>
                      <Button size="sm" className="bg-[oklch(0.55_0.2_270)] gap-1">
                        <Play className="h-4 w-4" />
                        {st.labels.continueLearning}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === "vi" ? "Bạn chưa đăng ký khóa học nào" : "You haven't enrolled in any courses yet"}
                </p>
                <Button className="mt-4 bg-[oklch(0.55_0.2_270)]" onClick={() => setActiveTab("explore")}>
                  {language === "vi" ? "Khám phá khóa học" : "Explore Courses"}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="mt-4">
            {mockCertificates.length > 0 ? (
              <div className="space-y-3">
                {mockCertificates.map((cert) => (
                  <Card key={cert.id} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[oklch(0.55_0.2_270)]/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-[oklch(0.55_0.2_270)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{cert.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {cert.instructor} • {cert.issueDate}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === "vi" ? "Bạn chưa có chứng chỉ nào" : "You don't have any certificates yet"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
