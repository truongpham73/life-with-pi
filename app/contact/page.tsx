"use client"

import type React from "react"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { extendedTranslations } from "@/lib/i18n/extended-translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  ExternalLink,
  Building,
  CheckCircle2,
} from "lucide-react"

function ContactContent() {
  const { language } = useI18n()
  const t = extendedTranslations[language].contact
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
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
              <MessageCircle className="h-3 w-3 mr-1" />
              {language === "vi" ? "Liên Hệ" : "Contact"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.intro}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Channels */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold mb-4">{language === "vi" ? "Kênh Liên Hệ" : "Contact Channels"}</h2>

            {/* Support */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  {t.channels.support.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${t.channels.support.email}`} className="hover:text-primary">
                    {t.channels.support.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${t.channels.support.phone}`} className="hover:text-primary">
                    {t.channels.support.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.channels.support.hours}</span>
                </div>
              </CardContent>
            </Card>

            {/* General */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {t.channels.general.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a href={`mailto:${t.channels.general.email}`} className="hover:text-primary block">
                  {t.channels.general.email}
                </a>
                <p className="text-muted-foreground">{t.channels.general.response}</p>
              </CardContent>
            </Card>

            {/* Partners */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-4 w-4 text-primary" />
                  {t.channels.partners.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a href={`mailto:${t.channels.partners.email}`} className="hover:text-primary block">
                  {t.channels.partners.email}
                </a>
                <p className="text-muted-foreground">{t.channels.partners.response}</p>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-red-200 dark:border-red-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2 text-red-600">
                  {t.channels.security.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <a href={`mailto:${t.channels.security.email}`} className="hover:text-primary block">
                  {t.channels.security.email}
                </a>
                <p className="text-red-600 text-xs">{t.channels.security.response}</p>
              </CardContent>
            </Card>

            {/* Office */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {t.offices.headquarters.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>{t.offices.headquarters.address}</p>
                <p>{t.offices.headquarters.city}</p>
                <p>{t.offices.headquarters.country}</p>
                <p className="mt-2">
                  <Phone className="h-3 w-3 inline mr-1" />
                  {t.offices.headquarters.phone}
                </p>
              </CardContent>
            </Card>

            {/* Social */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t.social.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {t.social.platforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {platform.name}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.form.title}</CardTitle>
                <CardDescription>
                  {language === "vi"
                    ? "Điền vào form bên dưới và chúng tôi sẽ liên hệ lại sớm nhất có thể."
                    : "Fill out the form below and we'll get back to you as soon as possible."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">
                      {language === "vi" ? "Đã Gửi Thành Công!" : "Successfully Sent!"}
                    </h3>
                    <p className="text-muted-foreground">{t.form.success}</p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: "", email: "", category: "", subject: "", message: "" })
                      }}
                    >
                      {language === "vi" ? "Gửi Tin Nhắn Khác" : "Send Another Message"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.form.fields.name}</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.form.fields.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">{t.form.fields.category}</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={language === "vi" ? "Chọn danh mục" : "Select category"} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.form.categories.map((cat, index) => (
                              <SelectItem key={index} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t.form.fields.subject}</Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.form.fields.message}</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" className="w-full md:w-auto">
                      <Send className="h-4 w-4 mr-2" />
                      {t.form.submit}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <ContactContent />
    </Suspense>
  )
}
