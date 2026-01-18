"use client"

import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Percent,
  Zap,
  TrendingUp,
  Settings,
  BarChart3,
  ChevronRight,
  Utensils,
  Car,
  ShoppingBag,
  Briefcase,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

const benefitIcons = [Users, Percent, Zap, TrendingUp, Settings, BarChart3]
const partnerTypeIcons: Record<string, any> = {
  "Restaurant Partner": Utensils,
  "Đối Tác Nhà Hàng": Utensils,
  "Driver Partner": Car,
  "Đối Tác Tài Xế": Car,
  "Merchant Partner": ShoppingBag,
  "Đối Tác Người Bán": ShoppingBag,
  "Service Provider": Briefcase,
  "Nhà Cung Cấp Dịch Vụ": Briefcase,
}

export default function PartnerPage() {
  const { language } = useI18n()
  const t = pagesTranslations[language].partner

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container max-w-4xl text-center">
          <Badge className="bg-white/20 text-primary-foreground mb-4">
            {language === "vi" ? "Cơ hội đối tác" : "Partnership Opportunity"}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg opacity-90 mb-6">{t.subtitle}</p>
          <p className="opacity-80 max-w-2xl mx-auto">{t.intro}</p>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8 space-y-12">
        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">{t.benefits.title}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {t.benefits.items.map((benefit, index) => {
              const Icon = benefitIcons[index]
              return (
                <Card key={index} className="p-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Partnership Types */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">{t.types.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.types.items.map((type, index) => {
              const Icon = partnerTypeIcons[type.title] || Briefcase
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{type.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                      <div className="space-y-1">
                        {type.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-[oklch(0.7_0.18_145)]" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">{t.process.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.process.steps.map((step, index) => (
              <Card key={index} className="p-4 text-center relative">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < t.process.steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-muted-foreground z-10" />
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
            <h2 className="text-2xl font-bold mb-4">{t.cta.title}</h2>
            <Button size="lg" className="mb-4">
              {t.cta.button}
            </Button>
            <p className="text-sm text-muted-foreground">{t.cta.contact}</p>
          </Card>
        </section>

        <div className="pt-8 border-t flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="text-primary hover:underline">
            {language === "vi" ? "Về Chúng Tôi" : "About Us"}
          </Link>
          <Link href="/help" className="text-primary hover:underline">
            {language === "vi" ? "Trung Tâm Hỗ Trợ" : "Help Center"}
          </Link>
          <Link href="/terms" className="text-primary hover:underline">
            {language === "vi" ? "Điều Khoản Dịch Vụ" : "Terms of Service"}
          </Link>
        </div>
      </div>
    </div>
  )
}
