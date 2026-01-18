"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check, Download, ExternalLink, Code, Server, Smartphone, Globe } from "lucide-react"
import Link from "next/link"

export default function DeveloperPage() {
  const { t } = useI18n()
  const isVi = t.language === "vi"
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const envExample = `# Pi Network
PI_API_KEY=pi_xxxxxxxxxxxxxxxxxxxxxxxx
PI_API_SECRET=pi_secret_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_PI_SANDBOX=true

# App Config
NEXT_PUBLIC_APP_URL=https://pilife.vn
NEXT_PUBLIC_APP_NAME=Life with Pi

# Contact
NEXT_PUBLIC_SUPPORT_EMAIL=support@pilife.vn
NEXT_PUBLIC_CONTACT_EMAIL=pigo.lifepi@gmail.com`

  const initCode = `// Initialize Pi SDK
import { initPiSDK } from '@/lib/pi-sdk/client'

// Call in your app's entry point
initPiSDK()

// Authenticate user
const user = await authenticateUser()
if (user) {
  console.log('Logged in as:', user.username)
}`

  const paymentCode = `// Create a payment
import { createPayment } from '@/lib/pi-sdk/client'

createPayment(
  10, // amount in Pi
  'Payment for PiShop order #12345',
  { orderId: '12345', service: 'pishop' },
  {
    onReadyForServerApproval: async (paymentId) => {
      await fetch('/api/pi/approve', {
        method: 'POST',
        body: JSON.stringify({ paymentId })
      })
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      await fetch('/api/pi/complete', {
        method: 'POST',
        body: JSON.stringify({ paymentId, txid })
      })
    },
    onCancel: (paymentId) => {
      console.log('Payment cancelled:', paymentId)
    },
    onError: (error) => {
      console.error('Payment error:', error)
    }
  }
)`

  const deployCommands = `# 1. Build for production
npm run build

# 2. Deploy to Vercel
vercel --prod

# 3. Add Capacitor for mobile
npm install @capacitor/core @capacitor/cli
npx cap init "Life with Pi" vn.pilife.app

# 4. Add iOS
npm install @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios

# 5. Add Android
npm install @capacitor/android
npx cap add android
npx cap sync android
npx cap open android`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">
              {isVi ? "Tài Liệu Dành Cho Nhà Phát Triển" : "Developer Documentation"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isVi ? "Hướng dẫn tích hợp Pi Network" : "Pi Network Integration Guide"}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pb-32">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Code className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium text-sm">{isVi ? "SDK & API" : "SDK & API"}</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Server className="h-6 w-6 text-green-600" />
              </div>
              <span className="font-medium text-sm">{isVi ? "Server API" : "Server API"}</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-purple-600" />
              </div>
              <span className="font-medium text-sm">{isVi ? "Mobile Apps" : "Mobile Apps"}</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <span className="font-medium text-sm">{isVi ? "Web Deploy" : "Web Deploy"}</span>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="quickstart" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quickstart">{isVi ? "Bắt Đầu" : "Quick Start"}</TabsTrigger>
            <TabsTrigger value="auth">{isVi ? "Xác Thực" : "Auth"}</TabsTrigger>
            <TabsTrigger value="payment">{isVi ? "Thanh Toán" : "Payment"}</TabsTrigger>
            <TabsTrigger value="deploy">{isVi ? "Deploy" : "Deploy"}</TabsTrigger>
          </TabsList>

          {/* Quick Start */}
          <TabsContent value="quickstart" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">1</Badge>
                  {isVi ? "Đăng Ký Pi Developer Portal" : "Register on Pi Developer Portal"}
                </CardTitle>
                <CardDescription>
                  {isVi
                    ? "Truy cập Pi Browser và đăng ký ứng dụng của bạn"
                    : "Access Pi Browser and register your application"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>{isVi ? "Mở Pi Browser trên điện thoại" : "Open Pi Browser on your phone"}</li>
                  <li>{isVi ? "Truy cập: developers.minepi.com" : "Visit: developers.minepi.com"}</li>
                  <li>{isVi ? "Đăng nhập bằng tài khoản Pi đã KYC" : "Sign in with your KYC'd Pi account"}</li>
                  <li>{isVi ? 'Click "Register New App"' : 'Click "Register New App"'}</li>
                </ol>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="https://developers.minepi.com" target="_blank" rel="noopener noreferrer">
                    {isVi ? "Mở Pi Developer Portal" : "Open Pi Developer Portal"}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">2</Badge>
                  {isVi ? "Cấu Hình Environment Variables" : "Configure Environment Variables"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{envExample}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(envExample, "env")}
                  >
                    {copiedCode === "env" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication */}
          <TabsContent value="auth" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isVi ? "Khởi Tạo & Xác Thực" : "Initialize & Authenticate"}</CardTitle>
                <CardDescription>
                  {isVi ? "Khởi tạo Pi SDK và xác thực người dùng" : "Initialize Pi SDK and authenticate users"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{initCode}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(initCode, "init")}
                  >
                    {copiedCode === "init" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isVi ? "Tạo Giao Dịch Thanh Toán" : "Create Payment Transaction"}</CardTitle>
                <CardDescription>
                  {isVi ? "Tích hợp thanh toán Pi vào ứng dụng của bạn" : "Integrate Pi payments into your application"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{paymentCode}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(paymentCode, "payment")}
                  >
                    {copiedCode === "payment" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deploy */}
          <TabsContent value="deploy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{isVi ? "Lệnh Deploy" : "Deploy Commands"}</CardTitle>
                <CardDescription>
                  {isVi
                    ? "Deploy lên Vercel, iOS App Store và Google Play"
                    : "Deploy to Vercel, iOS App Store and Google Play"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{deployCommands}</pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(deployCommands, "deploy")}
                  >
                    {copiedCode === "deploy" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{isVi ? "Cấu Hình DNS cho pilife.vn" : "DNS Configuration for pilife.vn"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Host</th>
                        <th className="text-left py-2">Value</th>
                        <th className="text-left py-2">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">A</td>
                        <td className="py-2">@</td>
                        <td className="py-2 font-mono text-xs">76.76.21.21</td>
                        <td className="py-2">300</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">CNAME</td>
                        <td className="py-2">www</td>
                        <td className="py-2 font-mono text-xs">cname.vercel-dns.com</td>
                        <td className="py-2">300</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Download Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{isVi ? "Tải Xuống Tài Liệu" : "Download Documentation"}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" asChild>
              <a href="/docs/PI_NETWORK_INTEGRATION.md" download>
                <Download className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">PI_NETWORK_INTEGRATION.md</div>
                  <div className="text-xs text-muted-foreground">
                    {isVi ? "Hướng dẫn tích hợp đầy đủ" : "Complete integration guide"}
                  </div>
                </div>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 bg-transparent" asChild>
              <a href="/capacitor.config.json" download>
                <Download className="mr-3 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">capacitor.config.json</div>
                  <div className="text-xs text-muted-foreground">
                    {isVi ? "Cấu hình mobile app" : "Mobile app configuration"}
                  </div>
                </div>
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">{isVi ? "Cần Hỗ Trợ?" : "Need Help?"}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isVi ? "Liên hệ đội ngũ kỹ thuật PiLife để được hỗ trợ" : "Contact PiLife technical team for assistance"}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <a href="mailto:support@pilife.vn">{isVi ? "Email Hỗ Trợ" : "Email Support"}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:pigo.lifepi@gmail.com">{isVi ? "Liên Hệ Chung" : "General Contact"}</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
