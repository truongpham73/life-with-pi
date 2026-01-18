"use client"

import { Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, FileText, HelpCircle } from "lucide-react"

function HelpCategoryContent() {
  const { category } = useParams()
  const router = useRouter()
  const { language } = useI18n()
  const t = pagesTranslations[language].help

  const categoryData = t.categories.find((c) => c.slug === category)

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {language === "vi" ? "Không tìm thấy danh mục" : "Category not found"}
          </p>
          <Button onClick={() => router.push("/help")}>
            {language === "vi" ? "Về Trung tâm hỗ trợ" : "Back to Help Center"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container max-w-4xl px-4 py-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/help")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === "vi" ? "Trung tâm hỗ trợ" : "Help Center"}
          </Button>
          <h1 className="text-2xl font-bold">{categoryData.title}</h1>
          <p className="text-muted-foreground mt-1">
            {categoryData.articles.length} {language === "vi" ? "bài viết" : "articles"}
          </p>
        </div>
      </div>

      {/* Articles List */}
      <div className="container max-w-4xl px-4 py-6">
        <div className="space-y-3">
          {categoryData.articles.map((article: { title: string; slug: string }, index: number) => (
            <Link key={index} href={`/help/${category}/${article.slug}`}>
              <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{article.title}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="mt-8 p-6 text-center bg-muted/50">
          <HelpCircle className="h-10 w-10 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">
            {language === "vi" ? "Không tìm thấy câu trả lời?" : "Didn't find your answer?"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {language === "vi"
              ? "Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7"
              : "Our support team is available 24/7 to help you"}
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">{language === "vi" ? "Chat Trực Tuyến" : "Live Chat"}</Button>
            <Button>{language === "vi" ? "Gửi Yêu Cầu" : "Submit Request"}</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function HelpCategoryPage() {
  return (
    <Suspense fallback={null}>
      <HelpCategoryContent />
    </Suspense>
  )
}
