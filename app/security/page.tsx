"use client"

import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle2, AlertTriangle, Mail } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const { language } = useI18n()
  const t = pagesTranslations[language].security

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-lg opacity-90">{t.subtitle}</p>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8 space-y-8">
        <Card className="p-6">
          <p className="text-muted-foreground">{t.intro}</p>
        </Card>

        {/* Security Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.sections.map((section, index) => (
            <Card key={index} className="p-6">
              <h2 className="text-lg font-bold mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-[oklch(0.7_0.18_145)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Security Tips */}
        <section>
          <h2 className="text-xl font-bold mb-4">{t.tips.title}</h2>
          <Card className="p-6">
            <ul className="space-y-3">
              {t.tips.items.map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <AlertTriangle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Report Section */}
        <section>
          <Card className="p-6 border-destructive/50 bg-destructive/5">
            <h2 className="text-xl font-bold mb-2">{t.report.title}</h2>
            <p className="text-muted-foreground mb-4">{t.report.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`mailto:${t.report.email}`}>
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  {t.report.button}
                </Button>
              </a>
              <p className="text-sm text-muted-foreground self-center">{t.report.email}</p>
            </div>
          </Card>
        </section>

        <div className="pt-8 border-t flex flex-wrap gap-4">
          <Link href="/privacy" className="text-primary hover:underline">
            {language === "vi" ? "Chính Sách Quyền Riêng Tư" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="text-primary hover:underline">
            {language === "vi" ? "Điều Khoản Dịch Vụ" : "Terms of Service"}
          </Link>
          <Link href="/help" className="text-primary hover:underline">
            {language === "vi" ? "Trung Tâm Hỗ Trợ" : "Help Center"}
          </Link>
        </div>
      </div>
    </div>
  )
}
