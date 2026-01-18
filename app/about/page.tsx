"use client"

import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Lightbulb, Shield, Globe, Mail, MapPin, Users, Zap, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const { language } = useI18n()
  const t = pagesTranslations[language].about

  const valueIcons = [Heart, Lightbulb, Shield, Globe]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container max-w-4xl text-center">
          <Badge className="bg-white/20 text-primary-foreground mb-4">Life with Pi</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg opacity-90">{t.subtitle}</p>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8 space-y-12">
        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-3">{t.mission.title}</h2>
            <p className="text-muted-foreground">{t.mission.description}</p>
          </Card>
          <Card className="p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-3">{t.vision.title}</h2>
            <p className="text-muted-foreground">{t.vision.description}</p>
          </Card>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-2xl font-bold mb-4">{t.story.title}</h2>
          <p className="text-muted-foreground mb-6">{t.story.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{t.story.founded}</p>
              <p className="text-2xl font-bold text-primary">{t.story.foundedDate}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{t.story.pioneers}</p>
              <p className="text-2xl font-bold text-primary">{t.story.pioneersCount}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{t.story.countries}</p>
              <p className="text-2xl font-bold text-primary">{t.story.countriesCount}</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{t.story.transactions}</p>
              <p className="text-2xl font-bold text-primary">{t.story.transactionsCount}</p>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.values.title}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.values.items.map((value, index) => {
              const Icon = valueIcons[index]
              return (
                <Card key={index} className="p-4 flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Leadership Team */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.team.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Nguyen Van A", role: t.team.ceo },
              { name: "Tran Thi B", role: t.team.cto },
              { name: "Le Van C", role: t.team.coo },
              { name: "Pham Thi D", role: t.team.cmo },
            ].map((member, index) => (
              <Card key={index} className="p-4 text-center">
                <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t.contact.title}</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${t.contact.email}`} className="hover:underline">
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{t.contact.address}</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Links */}
        <section className="flex flex-wrap gap-4 justify-center pb-8">
          <Link href="/privacy" className="text-primary hover:underline">
            {language === "vi" ? "Chính Sách Quyền Riêng Tư" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="text-primary hover:underline">
            {language === "vi" ? "Điều Khoản Dịch Vụ" : "Terms of Service"}
          </Link>
          <Link href="/security" className="text-primary hover:underline">
            {language === "vi" ? "Bảo Mật" : "Security"}
          </Link>
          <Link href="/help" className="text-primary hover:underline">
            {language === "vi" ? "Trợ Giúp" : "Help Center"}
          </Link>
        </section>
      </div>
    </div>
  )
}
