"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { extendedTranslations } from "@/lib/i18n/extended-translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Circle, Clock, Rocket, Target, Globe, Zap } from "lucide-react"

function RoadmapContent() {
  const { language } = useI18n()
  const t = extendedTranslations[language].roadmap

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
              <Rocket className="h-3 w-3 mr-1" />
              {language === "vi" ? "Lộ Trình" : "Roadmap"}
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {/* Completed Phases */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              {t.completed.title}
            </h2>

            {t.completed.phases.map((phase, index) => (
              <div
                key={index}
                className={`relative flex items-start mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-green-500 border-4 border-background md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-8 md:w-1/2" : "md:pl-8 md:w-1/2"}`}>
                  <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          {phase.phase}
                        </Badge>
                        <Badge variant="secondary">{phase.period}</Badge>
                      </div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </section>

          {/* In Progress */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary animate-pulse" />
              {t.inProgress.title}
            </h2>

            <div className="relative flex items-start mb-8">
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10 animate-pulse" />

              {/* Content */}
              <div className="ml-12 md:ml-0 md:pr-8 md:w-1/2">
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary text-primary-foreground">{t.inProgress.phase}</Badge>
                      <Badge variant="secondary">{t.inProgress.period}</Badge>
                    </div>
                    <CardTitle className="text-lg">{language === "vi" ? "Đang Triển Khai" : "Current Phase"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {t.inProgress.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Circle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Upcoming */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-muted-foreground" />
              {t.upcoming.title}
            </h2>

            {t.upcoming.phases.map((phase, index) => (
              <div
                key={index}
                className={`relative flex items-start mb-8 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-muted-foreground/50 border-4 border-background md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:pl-8 md:w-1/2" : "md:pr-8 md:w-1/2"}`}>
                  <Card className="border-dashed">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{phase.phase}</Badge>
                        <Badge variant="secondary">{phase.period}</Badge>
                      </div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Circle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Vision 2030 */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="h-6 w-6 text-primary" />
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t.vision2030.title}</CardTitle>
            <CardDescription className="text-base">{t.vision2030.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {t.vision2030.goals.map((goal, index) => (
                <div key={index} className="text-center p-3 bg-background/50 rounded-lg">
                  <p className="text-sm font-medium">{goal}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            {language === "vi" ? "Muốn đóng góp cho hành trình của chúng tôi?" : "Want to contribute to our journey?"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/partner">{language === "vi" ? "Trở Thành Đối Tác" : "Become a Partner"}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">{language === "vi" ? "Liên Hệ" : "Contact Us"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <RoadmapContent />
    </Suspense>
  )
}
