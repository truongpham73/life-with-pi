"use client"

import { useI18n } from "@/lib/i18n/context"
import { ServiceHeader } from "@/components/services/service-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Code2,
  Server,
  Smartphone,
  Shield,
  CheckCircle2,
  ArrowRight,
  FileCode,
  Database,
  Globe,
  Terminal,
  BookOpen,
} from "lucide-react"

export default function IntegrationGuidePage() {
  const { language } = useI18n()

  const content = {
    vi: {
      title: "Hướng dẫn Tích hợp Pi Network",
      subtitle: "Tài liệu kỹ thuật chi tiết để tích hợp Life with Pi vào mạng Pi Network",

      overview: {
        title: "Tổng quan",
        description:
          "Để tích hợp ứng dụng Life with Pi vào mạng Pi Network, bạn cần thực hiện các bước sau đây. Quá trình tích hợp bao gồm đăng ký ứng dụng, cài đặt SDK, xây dựng API server-side, và kiểm thử trong môi trường sandbox.",
      },

      requirements: {
        title: "Yêu cầu Trước khi Bắt đầu",
        items: [
          {
            icon: Smartphone,
            title: "Tài khoản Pi Network",
            description: "Bạn cần có tài khoản Pioneer đã được xác minh (KYC) để đăng ký làm developer.",
          },
          {
            icon: Globe,
            title: "Domain/Hosting",
            description:
              "Ứng dụng cần được deploy lên domain có SSL (HTTPS). Có thể sử dụng Vercel, Netlify, hoặc hosting riêng.",
          },
          {
            icon: Server,
            title: "Backend Server",
            description: "Cần có server backend để xử lý các API calls với Pi Server (approve, complete payments).",
          },
          {
            icon: Database,
            title: "Database",
            description: "Database để lưu trữ thông tin giao dịch, đơn hàng, và dữ liệu người dùng.",
          },
        ],
      },

      steps: {
        title: "Các Bước Tích hợp",
        items: [
          {
            step: 1,
            title: "Đăng ký Developer trên Pi Developer Portal",
            description: "Truy cập Pi Developer Portal trong Pi Browser để đăng ký ứng dụng.",
            details: [
              "Mở Pi Browser trên điện thoại",
              'Truy cập "Develop" trong menu Pi Browser',
              'Tạo project mới với tên "Life with Pi"',
              "Điền thông tin: App Name, Description, App URL",
              "Lưu lại API Key được cấp (QUAN TRỌNG: Giữ bí mật!)",
            ],
            code: `# Environment Variables cần thiết
PI_API_KEY=your_api_key_here
NEXT_PUBLIC_PI_SANDBOX=true  # false cho production`,
          },
          {
            step: 2,
            title: "Thêm Pi SDK vào Frontend",
            description: "Tích hợp Pi SDK JavaScript vào ứng dụng Next.js.",
            details: [
              "Pi SDK được load từ CDN của Pi Network",
              "Khởi tạo SDK với version và sandbox flag",
              "SDK chỉ hoạt động trong Pi Browser",
            ],
            code: `<!-- Thêm vào app/layout.tsx hoặc _document.tsx -->
<Script 
  src="https://sdk.minepi.com/pi-sdk.js"
  strategy="beforeInteractive"
/>
<Script id="pi-init" strategy="afterInteractive">
  {\`Pi.init({ version: "2.0", sandbox: \${process.env.NEXT_PUBLIC_PI_SANDBOX === 'true'} })\`}
</Script>`,
          },
          {
            step: 3,
            title: "Xây dựng Authentication Flow",
            description: "Implement luồng xác thực người dùng với Pi Network.",
            details: [
              "Gọi Pi.authenticate() để lấy accessToken và user info",
              "Gửi accessToken lên server để verify với Pi API",
              "Tạo session/JWT cho user trong hệ thống của bạn",
              "Lưu uid làm identifier cho user (uid là unique per app)",
            ],
            code: `// Frontend: Authenticate
const scopes = ['username', 'payments'];
const auth = await window.Pi.authenticate(
  scopes, 
  onIncompletePaymentFound
);
// auth = { accessToken, user: { uid, username } }

// Backend: Verify accessToken
const response = await fetch('https://api.minepi.com/v2/me', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` }
});`,
          },
          {
            step: 4,
            title: "Xây dựng Payment Flow",
            description: "Implement luồng thanh toán 3 giai đoạn theo chuẩn Pi Network.",
            details: [
              "Phase 1: Tạo payment từ frontend, approve từ server",
              "Phase 2: User xác nhận trong Pi Wallet (tự động)",
              "Phase 3: Complete payment từ server sau khi có txid",
              "QUAN TRỌNG: Chỉ ghi nhận thanh toán sau khi /complete trả về success",
            ],
            code: `// Frontend: Tạo payment
const payment = await Pi.createPayment({
  amount: 10,
  memo: 'Thanh toán đơn hàng #123',
  metadata: { orderId: '123' }
}, {
  onReadyForServerApproval: async (paymentId) => {
    await fetch('/api/pi/approve', {
      method: 'POST',
      body: JSON.stringify({ paymentId })
    });
  },
  onReadyForServerCompletion: async (paymentId, txid) => {
    await fetch('/api/pi/complete', {
      method: 'POST',
      body: JSON.stringify({ paymentId, txid })
    });
  },
  onCancel: (paymentId) => { /* Handle cancel */ },
  onError: (error) => { /* Handle error */ }
});

// Backend: Approve payment
const response = await fetch(
  \`https://api.minepi.com/v2/payments/\${paymentId}/approve\`,
  {
    method: 'POST',
    headers: { 'Authorization': \`Key \${PI_API_KEY}\` }
  }
);

// Backend: Complete payment
const response = await fetch(
  \`https://api.minepi.com/v2/payments/\${paymentId}/complete\`,
  {
    method: 'POST',
    headers: { 'Authorization': \`Key \${PI_API_KEY}\` },
    body: JSON.stringify({ txid })
  }
);`,
          },
          {
            step: 5,
            title: "Xử lý Incomplete Payments",
            description: "Handle các giao dịch bị gián đoạn.",
            details: [
              "Callback onIncompletePaymentFound được gọi khi authenticate",
              "Kiểm tra status của payment để quyết định hành động",
              "Có thể complete hoặc cancel tùy theo business logic",
            ],
            code: `function onIncompletePaymentFound(payment) {
  // Gửi lên server để kiểm tra và xử lý
  fetch('/api/pi/handle-incomplete', {
    method: 'POST',
    body: JSON.stringify({ payment })
  });
}`,
          },
          {
            step: 6,
            title: "Testing trong Sandbox",
            description: "Kiểm thử ứng dụng trong môi trường sandbox trước khi go-live.",
            details: [
              "Cấu hình Development URL trong Developer Portal",
              "Sử dụng Test-Pi để thử nghiệm thanh toán",
              "Authorize Sandbox từ Pi App > Pi Utilities",
              "Test trên desktop browser với sandbox URL",
            ],
            code: `# Sandbox URL format
https://sandbox.minepi.com/mobile-app-ui/app/your-app-id

# Authorize từ Pi App
Pi App > Menu > Pi Utilities > Authorize Sandbox`,
          },
          {
            step: 7,
            title: "Go Live - Production",
            description: "Chuyển sang môi trường production.",
            details: [
              "Đổi sandbox flag về false",
              "Submit app để review (nếu cần)",
              "Monitor giao dịch qua Pi Developer Portal",
              "Implement proper error handling và logging",
            ],
            code: `# Production environment
PI_API_KEY=your_production_api_key
NEXT_PUBLIC_PI_SANDBOX=false`,
          },
        ],
      },

      security: {
        title: "Bảo mật Quan trọng",
        items: [
          {
            title: "Không expose API Key",
            description: "PI_API_KEY chỉ được sử dụng ở server-side, KHÔNG BAO GIỜ gửi xuống client.",
          },
          {
            title: "Verify trước khi tin tưởng",
            description: "Luôn verify accessToken và payment status với Pi Server trước khi thực hiện business logic.",
          },
          {
            title: "Chỉ complete sau khi verify",
            description: "Chỉ ghi nhận thanh toán thành công sau khi /complete API trả về status 200.",
          },
          {
            title: "Handle incomplete payments",
            description: "Implement logic xử lý các giao dịch bị gián đoạn để tránh mất tiền của user.",
          },
        ],
      },

      files: {
        title: "Cấu trúc Files Đã Chuẩn bị",
        items: [
          { path: "lib/pi-sdk/types.ts", description: "Type definitions cho Pi SDK" },
          { path: "lib/pi-sdk/context.tsx", description: "React Context quản lý Pi connection" },
          { path: "lib/pi-sdk/server.ts", description: "Server-side API functions" },
          { path: "app/api/pi/approve/route.ts", description: "API endpoint approve payment" },
          { path: "app/api/pi/complete/route.ts", description: "API endpoint complete payment" },
          { path: "app/api/pi/verify/route.ts", description: "API endpoint verify access token" },
          { path: "components/pi/connect-wallet-button.tsx", description: "Button kết nối ví Pi" },
          { path: "components/pi/payment-button.tsx", description: "Button thanh toán với Pi" },
        ],
      },

      resources: {
        title: "Tài liệu Tham khảo",
        items: [
          { title: "Pi Developer Guide", url: "https://pi-apps.github.io/community-developer-guide/" },
          {
            title: "Pi Platform SDK",
            url: "https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/piAppPlatform/piAppPlatformSDK",
          },
          {
            title: "Pi Platform APIs",
            url: "https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/piAppPlatform/piAppPlatformAPIs",
          },
          {
            title: "Payment Flow Guide",
            url: "https://pi-apps.github.io/community-developer-guide/docs/importantTopics/paymentFlow/piPaymentFlow",
          },
        ],
      },
    },
    en: {
      title: "Pi Network Integration Guide",
      subtitle: "Detailed technical documentation to integrate Life with Pi into the Pi Network",

      overview: {
        title: "Overview",
        description:
          "To integrate the Life with Pi application into the Pi Network, you need to follow these steps. The integration process includes registering the application, installing the SDK, building server-side APIs, and testing in the sandbox environment.",
      },

      requirements: {
        title: "Prerequisites",
        items: [
          {
            icon: Smartphone,
            title: "Pi Network Account",
            description: "You need a verified Pioneer account (KYC) to register as a developer.",
          },
          {
            icon: Globe,
            title: "Domain/Hosting",
            description:
              "The app needs to be deployed to a domain with SSL (HTTPS). You can use Vercel, Netlify, or your own hosting.",
          },
          {
            icon: Server,
            title: "Backend Server",
            description:
              "A backend server is required to handle API calls with Pi Server (approve, complete payments).",
          },
          {
            icon: Database,
            title: "Database",
            description: "Database to store transaction information, orders, and user data.",
          },
        ],
      },

      steps: {
        title: "Integration Steps",
        items: [
          {
            step: 1,
            title: "Register Developer on Pi Developer Portal",
            description: "Access Pi Developer Portal in Pi Browser to register your application.",
            details: [
              "Open Pi Browser on your phone",
              'Access "Develop" in the Pi Browser menu',
              'Create a new project named "Life with Pi"',
              "Fill in information: App Name, Description, App URL",
              "Save the API Key provided (IMPORTANT: Keep it secret!)",
            ],
            code: `# Required Environment Variables
PI_API_KEY=your_api_key_here
NEXT_PUBLIC_PI_SANDBOX=true  # false for production`,
          },
          {
            step: 2,
            title: "Add Pi SDK to Frontend",
            description: "Integrate Pi SDK JavaScript into the Next.js application.",
            details: [
              "Pi SDK is loaded from Pi Network CDN",
              "Initialize SDK with version and sandbox flag",
              "SDK only works in Pi Browser",
            ],
            code: `<!-- Add to app/layout.tsx or _document.tsx -->
<Script 
  src="https://sdk.minepi.com/pi-sdk.js"
  strategy="beforeInteractive"
/>
<Script id="pi-init" strategy="afterInteractive">
  {\`Pi.init({ version: "2.0", sandbox: \${process.env.NEXT_PUBLIC_PI_SANDBOX === 'true'} })\`}
</Script>`,
          },
          {
            step: 3,
            title: "Build Authentication Flow",
            description: "Implement user authentication flow with Pi Network.",
            details: [
              "Call Pi.authenticate() to get accessToken and user info",
              "Send accessToken to server to verify with Pi API",
              "Create session/JWT for user in your system",
              "Save uid as identifier for user (uid is unique per app)",
            ],
            code: `// Frontend: Authenticate
const scopes = ['username', 'payments'];
const auth = await window.Pi.authenticate(
  scopes, 
  onIncompletePaymentFound
);
// auth = { accessToken, user: { uid, username } }

// Backend: Verify accessToken
const response = await fetch('https://api.minepi.com/v2/me', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` }
});`,
          },
          {
            step: 4,
            title: "Build Payment Flow",
            description: "Implement the 3-phase payment flow according to Pi Network standard.",
            details: [
              "Phase 1: Create payment from frontend, approve from server",
              "Phase 2: User confirms in Pi Wallet (automatic)",
              "Phase 3: Complete payment from server after receiving txid",
              "IMPORTANT: Only record payment after /complete returns success",
            ],
            code: `// Frontend: Create payment
const payment = await Pi.createPayment({
  amount: 10,
  memo: 'Payment for order #123',
  metadata: { orderId: '123' }
}, {
  onReadyForServerApproval: async (paymentId) => {
    await fetch('/api/pi/approve', {
      method: 'POST',
      body: JSON.stringify({ paymentId })
    });
  },
  onReadyForServerCompletion: async (paymentId, txid) => {
    await fetch('/api/pi/complete', {
      method: 'POST',
      body: JSON.stringify({ paymentId, txid })
    });
  },
  onCancel: (paymentId) => { /* Handle cancel */ },
  onError: (error) => { /* Handle error */ }
});`,
          },
          {
            step: 5,
            title: "Handle Incomplete Payments",
            description: "Handle interrupted transactions.",
            details: [
              "Callback onIncompletePaymentFound is called during authenticate",
              "Check payment status to decide action",
              "Can complete or cancel depending on business logic",
            ],
            code: `function onIncompletePaymentFound(payment) {
  // Send to server to check and handle
  fetch('/api/pi/handle-incomplete', {
    method: 'POST',
    body: JSON.stringify({ payment })
  });
}`,
          },
          {
            step: 6,
            title: "Testing in Sandbox",
            description: "Test the application in sandbox environment before going live.",
            details: [
              "Configure Development URL in Developer Portal",
              "Use Test-Pi for payment testing",
              "Authorize Sandbox from Pi App > Pi Utilities",
              "Test on desktop browser with sandbox URL",
            ],
            code: `# Sandbox URL format
https://sandbox.minepi.com/mobile-app-ui/app/your-app-id

# Authorize from Pi App
Pi App > Menu > Pi Utilities > Authorize Sandbox`,
          },
          {
            step: 7,
            title: "Go Live - Production",
            description: "Switch to production environment.",
            details: [
              "Change sandbox flag to false",
              "Submit app for review (if required)",
              "Monitor transactions via Pi Developer Portal",
              "Implement proper error handling and logging",
            ],
            code: `# Production environment
PI_API_KEY=your_production_api_key
NEXT_PUBLIC_PI_SANDBOX=false`,
          },
        ],
      },

      security: {
        title: "Important Security",
        items: [
          {
            title: "Do not expose API Key",
            description: "PI_API_KEY should only be used server-side, NEVER send it to the client.",
          },
          {
            title: "Verify before trusting",
            description: "Always verify accessToken and payment status with Pi Server before executing business logic.",
          },
          {
            title: "Only complete after verify",
            description: "Only record payment as successful after /complete API returns status 200.",
          },
          {
            title: "Handle incomplete payments",
            description: "Implement logic to handle interrupted transactions to avoid losing user funds.",
          },
        ],
      },

      files: {
        title: "Prepared File Structure",
        items: [
          { path: "lib/pi-sdk/types.ts", description: "Type definitions for Pi SDK" },
          { path: "lib/pi-sdk/context.tsx", description: "React Context managing Pi connection" },
          { path: "lib/pi-sdk/server.ts", description: "Server-side API functions" },
          { path: "app/api/pi/approve/route.ts", description: "API endpoint approve payment" },
          { path: "app/api/pi/complete/route.ts", description: "API endpoint complete payment" },
          { path: "app/api/pi/verify/route.ts", description: "API endpoint verify access token" },
          { path: "components/pi/connect-wallet-button.tsx", description: "Pi wallet connect button" },
          { path: "components/pi/payment-button.tsx", description: "Payment button with Pi" },
        ],
      },

      resources: {
        title: "Reference Documentation",
        items: [
          { title: "Pi Developer Guide", url: "https://pi-apps.github.io/community-developer-guide/" },
          {
            title: "Pi Platform SDK",
            url: "https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/piAppPlatform/piAppPlatformSDK",
          },
          {
            title: "Pi Platform APIs",
            url: "https://pi-apps.github.io/community-developer-guide/docs/gettingStarted/piAppPlatform/piAppPlatformAPIs",
          },
          {
            title: "Payment Flow Guide",
            url: "https://pi-apps.github.io/community-developer-guide/docs/importantTopics/paymentFlow/piPaymentFlow",
          },
        ],
      },
    },
  }

  const t = content[language]

  return (
    <main className="min-h-screen bg-background pb-24">
      <ServiceHeader title={t.title} subtitle={t.subtitle} gradient="from-pi to-pi-dark" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pi" />
              {t.overview.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{t.overview.description}</p>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {t.requirements.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.requirements.items.map((item, index) => (
                <div key={index} className="flex gap-3 p-4 bg-muted/50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-pi/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-pi" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-pi" />
              {t.steps.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {t.steps.items.map((step, index) => (
              <div key={index} className="relative">
                {index < t.steps.items.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                )}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-pi text-pi-foreground flex items-center justify-center font-bold flex-shrink-0 z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 space-y-3 pb-6">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    <ul className="space-y-1">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="w-4 h-4 text-pi flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {step.code && (
                      <div className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-zinc-300 whitespace-pre-wrap">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="w-5 h-5" />
              {t.security.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.security.items.map((item, index) => (
                <div key={index} className="p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
                  <h4 className="font-medium text-destructive mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Files Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-pi" />
              {t.files.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {t.files.items.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <code className="text-sm font-mono text-pi">{file.path}</code>
                  <span className="text-sm text-muted-foreground">{file.description}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-pi" />
              {t.resources.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {t.resources.items.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                >
                  <Globe className="w-4 h-4 text-pi" />
                  <span className="text-sm group-hover:text-pi transition-colors">{resource.title}</span>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
