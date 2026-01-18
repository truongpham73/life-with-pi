"use client"

import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const { language } = useI18n()
  const t = pagesTranslations[language].terms

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-sm opacity-80">
            {t.lastUpdated}: {t.lastUpdatedDate}
          </p>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8">
        <Card className="p-6 mb-8">
          <p className="text-muted-foreground">{t.intro}</p>
        </Card>

        <div className="space-y-8">
          {t.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-wrap gap-4">
          <Link href="/privacy" className="text-primary hover:underline">
            {language === "vi" ? "Chính Sách Quyền Riêng Tư" : "Privacy Policy"}
          </Link>
          <Link href="/security" className="text-primary hover:underline">
            {language === "vi" ? "Bảo Mật" : "Security"}
          </Link>
          <Link href="/help" className="text-primary hover:underline">
            {language === "vi" ? "Trung Tâm Hỗ Trợ" : "Help Center"}
          </Link>
        </div>
      </div>
    </div>
  )
}
