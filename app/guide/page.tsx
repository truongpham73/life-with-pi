"use client"

import type React from "react"

import { Suspense } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { extendedTranslations } from "@/lib/i18n/extended-translations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  Download,
  UserPlus,
  Wallet,
  Compass,
  ShoppingCart,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  ExternalLink,
  Utensils,
  Car,
  ShoppingBag,
  Plane,
  Heart,
  GraduationCap,
  Briefcase,
  Gamepad2,
  CreditCard,
} from "lucide-react"

function GuideContent() {
  const { language } = useI18n()
  const t = extendedTranslations[language].gettingStarted

  const stepIcons = [Download, UserPlus, Wallet, Compass, ShoppingCart]

  const serviceIcons: Record<string, React.ElementType> = {
    piFood: Utensils,
    piMove: Car,
    piShop: ShoppingBag,
    piTravel: Plane,
    piHealth: Heart,
    piLearn: GraduationCap,
    piWork: Briefcase,
    piPlay: Gamepad2,
    piPay: CreditCard,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            {language === "vi" ? "Quay lại" : "Back"}
          </Link>

          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              {language === "vi" ? "Hướng Dẫn" : "Guide"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-foreground">{t.intro}</p>
          </CardContent>
        </Card>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary" />
            {t.prerequisites.title}
          </h2>
          <div className="grid gap-4">
            {t.prerequisites.items.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline mt-2"
                    >
                      {language === "vi" ? "Tải Pi Network" : "Download Pi Network"}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === "vi" ? "Các Bước Bắt Đầu" : "Getting Started Steps"}
          </h2>
          <div className="space-y-6">
            {t.steps.map((step, index) => {
              const Icon = stepIcons[index]
              return (
                <Card key={index} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-16 bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-primary border-primary">
                            {language === "vi" ? `Bước ${step.step}` : `Step ${step.step}`}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            {language === "vi" ? "Mẹo:" : "Tips:"}
                          </p>
                          <ul className="space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Service Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.serviceGuides.title}</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {Object.entries(t.serviceGuides).map(([key, service]) => {
              if (key === "title") return null
              const serviceData = service as { title: string; steps: string[] }
              const Icon = serviceIcons[key] || Compass
              return (
                <AccordionItem key={key} value={key} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{serviceData.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ol className="space-y-2 ml-12 mt-2">
                      {serviceData.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </section>

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            {t.tips.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.tips.items.map((tip, index) => (
              <Card key={index} className="border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-orange-500" />
            {t.troubleshooting.title}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {t.troubleshooting.items.map((item, index) => (
              <AccordionItem key={index} value={`trouble-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  <span className="font-medium">{item.issue}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.solution}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-2">
              {language === "vi" ? "Sẵn Sàng Bắt Đầu?" : "Ready to Get Started?"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === "vi"
                ? "Khám phá tất cả dịch vụ của chúng tôi và bắt đầu hành trình Pi của bạn!"
                : "Explore all our services and start your Pi journey!"}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/services">{language === "vi" ? "Xem Dịch Vụ" : "View Services"}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">{language === "vi" ? "Trung Tâm Hỗ Trợ" : "Help Center"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function GuidePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <GuideContent />
    </Suspense>
  )
}
