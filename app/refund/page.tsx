"use client"

import type React from "react"

import { Suspense } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { extendedTranslations } from "@/lib/i18n/extended-translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Utensils,
  Car,
  ShoppingBag,
  Plane,
  Heart,
  GraduationCap,
  Briefcase,
  Gamepad2,
  CreditCard,
  MessageCircle,
  Mail,
} from "lucide-react"

function RefundContent() {
  const { language } = useI18n()
  const t = extendedTranslations[language].refundPolicy

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
              {language === "vi" ? "Chính Sách" : "Policy"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-sm text-muted-foreground">
              {language === "vi" ? "Cập nhật lần cuối: " : "Last Updated: "}
              {t.lastUpdated}
            </p>
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

        {/* General Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.generalPolicy.title}</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {t.generalPolicy.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Service Specific */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === "vi" ? "Chính Sách Theo Từng Dịch Vụ" : "Service-Specific Policies"}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {Object.entries(t.serviceSpecific).map(([key, service]) => {
              const Icon = serviceIcons[key] || CreditCard
              const serviceData = service as {
                title: string
                eligible?: string[]
                notEligible?: string[]
                process?: string
                description?: string
                returnShipping?: string
                cancellationFees?: string
              }

              return (
                <AccordionItem key={key} value={key} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="hover:no-underline px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{serviceData.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    {serviceData.description && (
                      <p className="text-muted-foreground mb-4 ml-12">{serviceData.description}</p>
                    )}

                    {serviceData.eligible && (
                      <div className="mb-4 ml-12">
                        <h4 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {language === "vi" ? "Đủ Điều Kiện Hoàn Tiền:" : "Eligible for Refund:"}
                        </h4>
                        <ul className="space-y-1">
                          {serviceData.eligible.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {serviceData.notEligible && (
                      <div className="mb-4 ml-12">
                        <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          {language === "vi" ? "Không Đủ Điều Kiện:" : "Not Eligible:"}
                        </h4>
                        <ul className="space-y-1">
                          {serviceData.notEligible.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-red-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {serviceData.process && (
                      <div className="ml-12 p-3 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-1">{language === "vi" ? "Quy Trình:" : "Process:"}</h4>
                        <p className="text-sm text-muted-foreground">{serviceData.process}</p>
                      </div>
                    )}

                    {serviceData.returnShipping && (
                      <p className="text-sm text-muted-foreground mt-2 ml-12">
                        <strong>{language === "vi" ? "Vận chuyển trả hàng: " : "Return shipping: "}</strong>
                        {serviceData.returnShipping}
                      </p>
                    )}

                    {serviceData.cancellationFees && (
                      <p className="text-sm text-muted-foreground mt-2 ml-12">
                        <strong>{language === "vi" ? "Phí hủy: " : "Cancellation fees: "}</strong>
                        {serviceData.cancellationFees}
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </section>

        {/* How to Request */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.howToRequest.title}</h2>
          <div className="space-y-4">
            {t.howToRequest.steps.map((step, index) => (
              <Card key={index}>
                <CardContent className="pt-4 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>{t.contact.title}</CardTitle>
            <CardDescription>{t.contact.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={`mailto:${t.contact.email}`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t.contact.email}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  {t.contact.chat}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function RefundPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <RefundContent />
    </Suspense>
  )
}
