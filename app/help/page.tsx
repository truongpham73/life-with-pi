"use client"

import { useState, Suspense } from "react"
import { useI18n } from "@/lib/i18n/context"
import { pagesTranslations } from "@/lib/i18n/pages-translations"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  Rocket,
  Utensils,
  Car,
  Wallet,
  Settings,
  Wrench,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const categoryIcons: Record<string, any> = {
  rocket: Rocket,
  utensils: Utensils,
  car: Car,
  wallet: Wallet,
  settings: Settings,
  tool: Wrench,
}

function HelpContent() {
  const { language } = useI18n()
  const t = pagesTranslations[language].help
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = t.categories
    .map((category) => ({
      ...category,
      articles: category.articles.filter((article: { title: string; slug: string }) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.articles.length > 0 || searchQuery === "")

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="container max-w-4xl text-center">
          <HelpCircle className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-lg opacity-90 mb-6">{t.subtitle}</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              className="pl-10 bg-white text-foreground h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="container max-w-4xl px-4 py-8 space-y-8">
        {/* Help Categories */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(searchQuery ? filteredCategories : t.categories).map((category, index) => {
              const Icon = categoryIcons[category.icon] || HelpCircle
              return (
                <Link key={index} href={`/help/${category.slug}`}>
                  <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors h-full">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <ul className="space-y-1">
                      {category.articles.slice(0, 2).map((article: { title: string; slug: string }, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground truncate">
                          {article.title}
                        </li>
                      ))}
                      {category.articles.length > 2 && (
                        <li className="text-sm text-primary flex items-center gap-1">
                          +{category.articles.length - 2} {language === "vi" ? "bài viết" : "more"}
                          <ChevronRight className="h-3 w-3" />
                        </li>
                      )}
                    </ul>
                  </Card>
                </Link>
              )
            })}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold mb-4">{t.faq.title}</h2>
          <Card className="p-4">
            <Accordion type="single" collapsible className="w-full">
              {t.faq.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </section>

        {/* Contact Support */}
        <section>
          <h2 className="text-xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground mb-4">{t.contact.description}</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">{t.contact.chat}</h3>
              <p className="text-sm text-muted-foreground">{language === "vi" ? "Hỗ trợ 24/7" : "24/7 Support"}</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">{t.contact.email}</h3>
              <p className="text-sm text-muted-foreground">{t.contact.emailAddress}</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold">{t.contact.phone}</h3>
              <p className="text-sm text-muted-foreground">{t.contact.phoneNumber}</p>
            </Card>
          </div>
        </section>

        <div className="pt-8 border-t flex flex-wrap gap-4">
          <Link href="/about" className="text-primary hover:underline">
            {language === "vi" ? "Về Chúng Tôi" : "About Us"}
          </Link>
          <Link href="/privacy" className="text-primary hover:underline">
            {language === "vi" ? "Chính Sách Quyền Riêng Tư" : "Privacy Policy"}
          </Link>
          <Link href="/terms" className="text-primary hover:underline">
            {language === "vi" ? "Điều Khoản Dịch Vụ" : "Terms of Service"}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function HelpPage() {
  return (
    <Suspense fallback={null}>
      <HelpContent />
    </Suspense>
  )
}
