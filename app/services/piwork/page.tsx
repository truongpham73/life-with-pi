"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiWorkIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Bookmark,
  BookmarkCheck,
  Building2,
  ChevronRight,
  Filter,
  Zap,
  Send,
  FileText,
  Upload,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "VNG Corporation",
    companyLogo: "/vng-logo.png",
    location: "Ho Chi Minh City",
    salary: { min: 2500, max: 4000, currency: "π" },
    type: "fullTime",
    category: "tech",
    experience: "3-5",
    skills: ["React", "TypeScript", "Next.js"],
    remote: true,
    urgent: true,
    postedDays: 2,
    applicants: 45,
    saved: false,
  },
  {
    id: 2,
    title: "Digital Marketing Manager",
    company: "Shopee Vietnam",
    companyLogo: "/shopee-logo.png",
    location: "Ho Chi Minh City",
    salary: { min: 1800, max: 2500, currency: "π" },
    type: "fullTime",
    category: "marketing",
    experience: "2-4",
    skills: ["SEO", "Google Ads", "Facebook Ads"],
    remote: false,
    urgent: false,
    postedDays: 5,
    applicants: 78,
    saved: true,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "FPT Software",
    companyLogo: "/fpt-logo.png",
    location: "Ha Noi",
    salary: { min: 1500, max: 2500, currency: "π" },
    type: "fullTime",
    category: "design",
    experience: "2-3",
    skills: ["Figma", "Adobe XD", "Sketch"],
    remote: true,
    urgent: false,
    postedDays: 1,
    applicants: 32,
    saved: false,
  },
  {
    id: 4,
    title: "Blockchain Developer",
    company: "Pi Network Vietnam",
    companyLogo: "/pi-network-logo.png",
    location: "Remote",
    salary: { min: 3000, max: 5000, currency: "π" },
    type: "remote",
    category: "tech",
    experience: "3+",
    skills: ["Solidity", "Web3.js", "Smart Contracts"],
    remote: true,
    urgent: true,
    postedDays: 0,
    applicants: 28,
    saved: false,
  },
  {
    id: 5,
    title: "Content Writer (Freelance)",
    company: "Life with Pi",
    companyLogo: "/lifewithpi-logo.png",
    location: "Remote",
    salary: { min: 50, max: 100, currency: "π", perHour: true },
    type: "freelance",
    category: "freelance",
    experience: "1+",
    skills: ["Content Writing", "SEO", "Copywriting"],
    remote: true,
    urgent: false,
    postedDays: 3,
    applicants: 56,
    saved: false,
  },
]

const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "VNG Corporation",
    appliedDate: "Jan 10, 2026",
    status: "interview",
  },
  {
    id: 2,
    jobTitle: "UI/UX Designer",
    company: "Grab Vietnam",
    appliedDate: "Jan 5, 2026",
    status: "underReview",
  },
]

const topCompanies = [
  { id: 1, name: "VNG", logo: "/vng-logo.png", jobs: 45 },
  { id: 2, name: "FPT", logo: "/fpt-logo.png", jobs: 62 },
  { id: 3, name: "Shopee", logo: "/shopee-logo.png", jobs: 38 },
  { id: 4, name: "Grab", logo: "/grab-logo.png", jobs: 29 },
]

export default function PiWorkPage() {
  const { language } = useI18n()
  const { toast } = useToast()
  const st = serviceTranslations[language].piWork
  const [activeTab, setActiveTab] = useState("jobs")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [savedJobs, setSavedJobs] = useState<number[]>([2])
  const [selectedJob, setSelectedJob] = useState<(typeof mockJobs)[0] | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  })

  const categories = [
    { key: "all", label: st.categories.all },
    { key: "tech", label: st.categories.tech },
    { key: "marketing", label: st.categories.marketing },
    { key: "design", label: st.categories.design },
    { key: "finance", label: st.categories.finance },
    { key: "freelance", label: st.categories.freelance },
  ]

  const filteredJobs = mockJobs.filter((job) => {
    if (selectedCategory !== "all" && job.category !== selectedCategory) return false
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interview":
        return "bg-[oklch(0.7_0.18_145)]"
      case "underReview":
        return "bg-primary"
      case "offered":
        return "bg-[oklch(0.55_0.2_270)]"
      case "rejected":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  const getStatusLabel = (status: string) => {
    return st.labels[status as keyof typeof st.labels] || status
  }

  const handleViewDetails = (job: (typeof mockJobs)[0]) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const handleApply = (job: (typeof mockJobs)[0]) => {
    setSelectedJob(job)
    setShowApplyDialog(true)
  }

  const handleSubmitApplication = () => {
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      toast({
        title: language === "vi" ? "Vui lòng điền đầy đủ thông tin" : "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    toast({
      title: language === "vi" ? "Ứng tuyển thành công!" : "Application Submitted!",
      description:
        language === "vi"
          ? "Chúng tôi sẽ liên hệ với bạn trong vòng 24-48 giờ"
          : "We will contact you within 24-48 hours",
    })

    setShowApplyDialog(false)
    setApplicationData({ fullName: "", email: "", phone: "", coverLetter: "" })
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <ServiceHeader
        title={language === "vi" ? "PiWork" : "PiWork"}
        icon={<PiWorkIcon className="w-full h-full" />}
        colorClass="bg-[oklch(0.6_0.15_40)] text-white"
        searchPlaceholder={st.labels.searchJobs}
        onSearch={setSearchQuery}
      />

      <div className="container px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12">
            <TabsTrigger value="jobs" className="gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.findJobs}</span>
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-1">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.myApplications}</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-1">
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.savedJobs}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={selectedCategory === cat.key ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex-shrink-0 rounded-full",
                    selectedCategory === cat.key ? "bg-[oklch(0.6_0.15_40)]" : "bg-transparent",
                  )}
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            <section className="mb-6">
              <h3 className="font-semibold mb-3">{st.labels.topCompanies}</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {topCompanies.map((company) => (
                  <Card
                    key={company.id}
                    className="p-3 flex-shrink-0 w-[120px] text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-xl bg-muted mx-auto mb-2 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">{company.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {company.jobs} {language === "vi" ? "việc" : "jobs"}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{st.labels.recentJobs}</h3>
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  <Filter className="h-4 w-4" />
                  {language === "vi" ? "Lọc" : "Filter"}
                </Button>
              </div>

              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold line-clamp-1">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <button onClick={() => toggleSaveJob(job.id)} className="flex-shrink-0">
                            {savedJobs.includes(job.id) ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.urgent && (
                            <Badge className="bg-destructive text-xs gap-1">
                              <Zap className="h-3 w-3" />
                              {st.labels.urgentHiring}
                            </Badge>
                          )}
                          {job.remote && (
                            <Badge variant="secondary" className="text-xs">
                              {st.labels.remoteOk}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {st.jobTypes[job.type as keyof typeof st.jobTypes]}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.experience} {st.labels.yearsExp}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="font-bold text-primary">
                            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                            <span className="font-normal text-sm text-muted-foreground ml-1">
                              /{job.salary.perHour ? st.labels.perHour : st.labels.perMonth}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {job.applicants} {st.labels.applicants}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleViewDetails(job)}
                      >
                        {language === "vi" ? "Xem chi tiết" : "View Details"}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-[oklch(0.6_0.15_40)] gap-1"
                        onClick={() => handleApply(job)}
                      >
                        <Send className="h-4 w-4" />
                        {st.labels.easyApply}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="applications" className="mt-4">
            {mockApplications.length > 0 ? (
              <div className="space-y-3">
                {mockApplications.map((app) => (
                  <Card key={app.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge>
                      <span className="text-sm text-muted-foreground">{app.appliedDate}</span>
                    </div>
                    <h3 className="font-semibold">{app.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      {language === "vi" ? "Xem chi tiết" : "View Details"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === "vi" ? "Bạn chưa ứng tuyển công việc nào" : "You haven't applied to any jobs yet"}
                </p>
                <Button className="mt-4 bg-[oklch(0.6_0.15_40)]" onClick={() => setActiveTab("jobs")}>
                  {st.labels.findJobs}
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            {savedJobs.length > 0 ? (
              <div className="space-y-3">
                {mockJobs
                  .filter((job) => savedJobs.includes(job.id))
                  .map((job) => (
                    <Card key={job.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold line-clamp-1">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                          <div className="font-bold text-primary mt-2">
                            {job.salary.currency} {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()}
                          </div>
                        </div>
                        <button onClick={() => toggleSaveJob(job.id)}>
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        </button>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-[oklch(0.6_0.15_40)]">
                        {st.labels.applyNow}
                      </Button>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === "vi" ? "Bạn chưa lưu việc làm nào" : "You haven't saved any jobs yet"}
                </p>
                <Button className="mt-4 bg-[oklch(0.6_0.15_40)]" onClick={() => setActiveTab("jobs")}>
                  {st.labels.findJobs}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedJob.company}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedJob.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedJob.urgent && (
                  <Badge className="bg-destructive gap-1">
                    <Zap className="h-3 w-3" />
                    {st.labels.urgentHiring}
                  </Badge>
                )}
                {selectedJob.remote && <Badge variant="secondary">{st.labels.remoteOk}</Badge>}
                <Badge variant="outline">{st.jobTypes[selectedJob.type as keyof typeof st.jobTypes]}</Badge>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="font-bold text-primary text-lg">
                  {selectedJob.salary.currency} {selectedJob.salary.min.toLocaleString()} -{" "}
                  {selectedJob.salary.max.toLocaleString()}
                  <span className="font-normal text-sm text-muted-foreground ml-1">
                    /{selectedJob.salary.perHour ? st.labels.perHour : st.labels.perMonth}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{language === "vi" ? "Mô tả công việc" : "Job Description"}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === "vi"
                    ? "Chúng tôi đang tìm kiếm một ứng viên tài năng cho vị trí này. Ứng viên cần có kinh nghiệm làm việc trong lĩnh vực liên quan và kỹ năng giao tiếp tốt."
                    : "We are looking for a talented candidate for this position. The candidate needs to have relevant work experience and good communication skills."}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">{language === "vi" ? "Yêu cầu" : "Requirements"}</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>
                    {selectedJob.experience} {st.labels.yearsExp}
                  </li>
                  {selectedJob.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {selectedJob.applicants} {st.labels.applicants}
              </div>

              <Button
                className="w-full bg-[oklch(0.6_0.15_40)]"
                onClick={() => {
                  setShowJobDetails(false)
                  handleApply(selectedJob)
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                {st.labels.applyNow}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{language === "vi" ? "Ứng tuyển công việc" : "Apply for Job"}</DialogTitle>
          </DialogHeader>

          {selectedJob && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-medium text-sm">{selectedJob.title}</p>
                <p className="text-xs text-muted-foreground">{selectedJob.company}</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="fullName">{language === "vi" ? "Họ và tên" : "Full Name"} *</Label>
                  <Input
                    id="fullName"
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                    placeholder={language === "vi" ? "Nguyễn Văn A" : "John Doe"}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{language === "vi" ? "Số điện thoại" : "Phone Number"} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                    placeholder="+84 123 456 789"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter">{language === "vi" ? "Thư giới thiệu" : "Cover Letter"}</Label>
                  <Textarea
                    id="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                    placeholder={language === "vi" ? "Giới thiệu về bản thân..." : "Tell us about yourself..."}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>{language === "vi" ? "Đính kèm CV" : "Attach CV"}</Label>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    {language === "vi" ? "Tải lên CV" : "Upload CV"}
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-[oklch(0.6_0.15_40)]" onClick={handleSubmitApplication}>
                <CheckCircle className="h-4 w-4 mr-2" />
                {language === "vi" ? "Gửi hồ sơ" : "Submit Application"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
