"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiPayIcon, PiNetworkLogo } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowUpRight,
  ArrowDownLeft,
  QrCode,
  Scan,
  CreditCard,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Plus,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Car,
  Utensils,
  Gamepad2,
  GraduationCap,
  Heart,
  ArrowLeftRight,
  Settings,
  Shield,
  Bell,
  Wallet,
  History,
  PieChart,
  Sparkles,
  Check,
  Search,
  UserPlus,
  Lock,
  Fingerprint,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const mockTransactions = [
  {
    id: 1,
    type: "expense",
    category: "food",
    description: "PiFood - Phở Thìn Bờ Hồ",
    descEn: "PiFood - Pho Thin Bo Ho",
    amount: -45,
    date: "2026-01-14",
    time: "12:30",
    status: "completed",
  },
  {
    id: 2,
    type: "income",
    category: "transfer",
    description: "Nhận từ @pioneer_john",
    descEn: "Received from @pioneer_john",
    amount: 500,
    date: "2026-01-14",
    time: "10:15",
    status: "completed",
  },
  {
    id: 3,
    type: "expense",
    category: "transport",
    description: "PiMove - Sân bay Nội Bài",
    descEn: "PiMove - Noi Bai Airport",
    amount: -120,
    date: "2026-01-13",
    time: "08:00",
    status: "completed",
  },
  {
    id: 4,
    type: "expense",
    category: "shopping",
    description: "PiShop - iPhone 15 Pro Max",
    descEn: "PiShop - iPhone 15 Pro Max",
    amount: -899,
    date: "2026-01-12",
    time: "15:45",
    status: "completed",
  },
  {
    id: 5,
    type: "income",
    category: "transfer",
    description: "Hoàn tiền từ PiShop",
    descEn: "Refund from PiShop",
    amount: 50,
    date: "2026-01-12",
    time: "09:30",
    status: "completed",
  },
  {
    id: 6,
    type: "expense",
    category: "entertainment",
    description: "PiPlay - Vé xem phim Avatar 3",
    descEn: "PiPlay - Avatar 3 Movie Tickets",
    amount: -60,
    date: "2026-01-11",
    time: "19:00",
    status: "completed",
  },
]

const recentRecipients = [
  { id: 1, name: "John Pioneer", username: "@pioneer_john", avatar: "JP" },
  { id: 2, name: "Nguyễn Văn A", username: "@nguyenvana", avatar: "NA" },
  { id: 3, name: "Trần Thị B", username: "@tranthib", avatar: "TB" },
  { id: 4, name: "David Lee", username: "@david_pi", avatar: "DL" },
]

const spendingByCategory = [
  { category: "food", amount: 850, percentage: 35, color: "bg-pifood" },
  { category: "transport", amount: 420, percentage: 17, color: "bg-pimove" },
  { category: "shopping", amount: 650, percentage: 27, color: "bg-pishop" },
  { category: "entertainment", amount: 280, percentage: 12, color: "bg-piplay" },
  { category: "other", amount: 220, percentage: 9, color: "bg-muted-foreground" },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "food":
      return Utensils
    case "transport":
      return Car
    case "shopping":
      return ShoppingBag
    case "entertainment":
      return Gamepad2
    case "education":
      return GraduationCap
    case "health":
      return Heart
    case "transfer":
      return ArrowLeftRight
    default:
      return Wallet
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "food":
      return "text-pifood bg-pifood/10"
    case "transport":
      return "text-pimove bg-pimove/10"
    case "shopping":
      return "text-pishop bg-pishop/10"
    case "entertainment":
      return "text-piplay bg-piplay/10"
    case "education":
      return "text-pilearn bg-pilearn/10"
    case "health":
      return "text-pihealth bg-pihealth/10"
    case "transfer":
      return "text-primary bg-primary/10"
    default:
      return "text-muted-foreground bg-muted"
  }
}

export default function PiPayPage() {
  const { language } = useI18n()
  const st = serviceTranslations[language].piPay
  const [activeTab, setActiveTab] = useState("wallet")
  const [showBalance, setShowBalance] = useState(true)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const [showSendDialog, setShowSendDialog] = useState(false)
  const [showReceiveDialog, setShowReceiveDialog] = useState(false)
  const [showQrDialog, setShowQrDialog] = useState(false)
  const [showScanDialog, setShowScanDialog] = useState(false)
  const [showAddRecipientDialog, setShowAddRecipientDialog] = useState(false)
  const [showPaymentMethodsDialog, setShowPaymentMethodsDialog] = useState(false)
  const [showSecurityDialog, setShowSecurityDialog] = useState(false)
  const [showNotificationsDialog, setShowNotificationsDialog] = useState(false)
  const [showLimitsDialog, setShowLimitsDialog] = useState(false)
  const [showTransactionDetail, setShowTransactionDetail] = useState<(typeof mockTransactions)[0] | null>(null)

  // Form states
  const [sendAmount, setSendAmount] = useState("")
  const [sendRecipient, setSendRecipient] = useState("")
  const [sendNote, setSendNote] = useState("")
  const [sendSuccess, setSendSuccess] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [newRecipientUsername, setNewRecipientUsername] = useState("")

  const walletBalance = 12450.75
  const walletAddress = "GCDXYZ123456789ABCDEFGHIJKLMNOP"

  const filteredTransactions = mockTransactions.filter((tx) => {
    if (selectedFilter === "all") return true
    return tx.type === selectedFilter
  })

  const groupTransactionsByDate = (transactions: typeof mockTransactions) => {
    const grouped: { [key: string]: typeof mockTransactions } = {}
    transactions.forEach((tx) => {
      const date = tx.date
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(tx)
    })
    return grouped
  }

  const getDateLabel = (date: string) => {
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
    if (date === today) return st.labels.today
    if (date === yesterday) return st.labels.yesterday
    return new Date(date).toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const groupedTransactions = groupTransactionsByDate(filteredTransactions)

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const handleSend = () => {
    // Simulate sending
    setSendSuccess(true)
    setTimeout(() => {
      setSendSuccess(false)
      setShowSendDialog(false)
      setSendAmount("")
      setSendRecipient("")
      setSendNote("")
    }, 2000)
  }

  const handleAddRecipient = () => {
    // Simulate adding recipient
    setShowAddRecipientDialog(false)
    setNewRecipientUsername("")
  }

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title="PiPay"
        icon={<PiPayIcon className="w-full h-full" />}
        colorClass="pi-gradient text-primary-foreground"
        showSearch={false}
      />

      <div className="container px-4 py-4">
        {/* Wallet Card */}
        <Card className="pi-gradient text-primary-foreground p-6 mb-6 overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 opacity-80" />
                  <p className="text-sm opacity-80 font-medium">{st.labels.availableBalance}</p>
                </div>
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-bold tracking-tight">
                    {showBalance ? `π ${walletBalance.toLocaleString()}` : "π ••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-sm opacity-70 mt-1">≈ $3,735.23 USD</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg">
                <PiNetworkLogo className="h-8 w-8" />
              </div>
            </div>

            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-2 text-sm opacity-80 mb-5 hover:opacity-100 transition-opacity"
            >
              <span className="font-mono truncate">
                {walletAddress.slice(0, 12)}...{walletAddress.slice(-8)}
              </span>
              {copiedAddress ? <Check className="h-4 w-4 text-green-300" /> : <Copy className="h-4 w-4" />}
              {copiedAddress && (
                <span className="text-xs text-green-300">{language === "vi" ? "Đã sao chép!" : "Copied!"}</span>
              )}
            </button>

            <div className="grid grid-cols-4 gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-col h-auto py-3 bg-white/15 hover:bg-white/25 text-primary-foreground border-0 rounded-xl backdrop-blur-sm"
                onClick={() => setShowSendDialog(true)}
              >
                <ArrowUpRight className="h-5 w-5 mb-1.5" />
                <span className="text-xs font-medium">{st.labels.send}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-col h-auto py-3 bg-white/15 hover:bg-white/25 text-primary-foreground border-0 rounded-xl backdrop-blur-sm"
                onClick={() => setShowReceiveDialog(true)}
              >
                <ArrowDownLeft className="h-5 w-5 mb-1.5" />
                <span className="text-xs font-medium">{st.labels.receive}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-col h-auto py-3 bg-white/15 hover:bg-white/25 text-primary-foreground border-0 rounded-xl backdrop-blur-sm"
                onClick={() => setShowQrDialog(true)}
              >
                <QrCode className="h-5 w-5 mb-1.5" />
                <span className="text-xs font-medium">{st.labels.qrCode}</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-col h-auto py-3 bg-white/15 hover:bg-white/25 text-primary-foreground border-0 rounded-xl backdrop-blur-sm"
                onClick={() => setShowScanDialog(true)}
              >
                <Scan className="h-5 w-5 mb-1.5" />
                <span className="text-xs font-medium">{st.labels.scan}</span>
              </Button>
            </div>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12 rounded-xl bg-muted/50 p-1">
            <TabsTrigger
              value="wallet"
              className="gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.transactions}</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">{st.labels.analytics}</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-1.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">{language === "vi" ? "Cài đặt" : "Settings"}</span>
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="wallet" className="mt-4">
            {/* Quick Send */}
            <section className="mb-6">
              <h3 className="font-semibold mb-3 text-foreground">{st.labels.recentRecipients}</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                <button
                  className="flex-shrink-0 flex flex-col items-center gap-2"
                  onClick={() => setShowAddRecipientDialog(true)}
                >
                  <div className="h-14 w-14 rounded-2xl border-2 border-dashed border-primary/50 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{st.labels.addRecipient}</span>
                </button>
                {recentRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    className="flex-shrink-0 flex flex-col items-center gap-2 group"
                    onClick={() => {
                      setSendRecipient(recipient.username)
                      setShowSendDialog(true)
                    }}
                  >
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <span className="font-semibold text-lg text-foreground">{recipient.avatar}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{recipient.username}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Transaction Filters */}
            <div className="flex gap-2 mb-4">
              {["all", "income", "expense"].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full",
                    selectedFilter === filter ? "pi-gradient text-primary-foreground" : "bg-transparent",
                  )}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter === "all"
                    ? st.labels.allTransactions
                    : filter === "income"
                      ? st.labels.income
                      : st.labels.expense}
                </Button>
              ))}
            </div>

            {/* Transaction List - Make transactions clickable */}
            <div className="space-y-4">
              {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <div key={date}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">{getDateLabel(date)}</h4>
                  <div className="space-y-2">
                    {transactions.map((tx) => {
                      const CategoryIcon = getCategoryIcon(tx.category)
                      const colorClass = getCategoryColor(tx.category)
                      return (
                        <Card
                          key={tx.id}
                          className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setShowTransactionDetail(tx)}
                        >
                          <div className={cn("h-11 w-11 rounded-xl flex items-center justify-center", colorClass)}>
                            <CategoryIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1 text-foreground">
                              {language === "vi" ? tx.description : tx.descEn}
                            </p>
                            <p className="text-xs text-muted-foreground">{tx.time}</p>
                          </div>
                          <div className="text-right">
                            <p
                              className={cn("font-semibold", tx.type === "income" ? "text-pishop" : "text-foreground")}
                            >
                              {tx.type === "income" ? "+" : ""}π {Math.abs(tx.amount).toLocaleString()}
                            </p>
                            <Badge
                              variant="secondary"
                              className={cn("text-xs", tx.status === "completed" ? "bg-pishop/10 text-pishop" : "")}
                            >
                              {st.labels[tx.status as keyof typeof st.labels]}
                            </Badge>
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="p-4 border-pishop/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-pishop/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-pishop" />
                  </div>
                  <span className="text-sm text-muted-foreground">{st.labels.thisMonthIncome}</span>
                </div>
                <p className="text-2xl font-bold text-pishop">+π 4,520</p>
              </Card>
              <Card className="p-4 border-pifood/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-pifood/10 flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-pifood" />
                  </div>
                  <span className="text-sm text-muted-foreground">{st.labels.thisMonthSpending}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">-π 2,420</p>
              </Card>
            </div>

            {/* Spending by Category */}
            <section>
              <h3 className="font-semibold mb-4 text-foreground">{st.labels.spendingByCategory}</h3>
              <div className="space-y-3">
                {spendingByCategory.map((item) => (
                  <Card key={item.category} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center",
                            getCategoryColor(item.category),
                          )}
                        >
                          {(() => {
                            const Icon = getCategoryIcon(item.category)
                            return <Icon className="h-5 w-5" />
                          })()}
                        </div>
                        <span className="font-medium text-foreground">
                          {st.categories[item.category as keyof typeof st.categories]}
                        </span>
                      </div>
                      <span className="font-semibold text-foreground">π {item.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", item.color)}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* Settings Tab - Make settings items clickable */}
          <TabsContent value="settings" className="mt-4">
            <div className="space-y-3">
              <Card
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setShowPaymentMethodsDialog(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-primary bg-primary/10">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{st.labels.paymentMethods}</h3>
                    <p className="text-sm text-muted-foreground">{st.labels.linkedAccounts}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setShowSecurityDialog(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-accent bg-accent/10">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{st.labels.security}</h3>
                    <p className="text-sm text-muted-foreground">{`${st.labels.changePin}, ${st.labels.biometric}`}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setShowNotificationsDialog(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-piplay bg-piplay/10">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{st.labels.notifications}</h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "vi" ? "Quản lý thông báo giao dịch" : "Manage transaction alerts"}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              <Card
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setShowLimitsDialog(true)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-pishop bg-pishop/10">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{st.labels.limits}</h3>
                    <p className="text-sm text-muted-foreground">{`${st.labels.dailyLimit}: π 10,000`}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>

              {/* Pi Network Connection */}
              <Card className="p-4 border-primary/30 bg-primary/5">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl pi-gradient flex items-center justify-center shadow-md">
                    <PiNetworkLogo className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{st.labels.piNetwork}</h3>
                    <p className="text-sm text-muted-foreground">{st.labels.piMainnet}</p>
                  </div>
                  <Badge className="bg-pishop text-white border-0">{st.labels.walletConnected}</Badge>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Send Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              {language === "vi" ? "Gửi Pi" : "Send Pi"}
            </DialogTitle>
            <DialogDescription>
              {language === "vi" ? "Gửi Pi đến người dùng khác trên mạng Pi" : "Send Pi to another user on Pi Network"}
            </DialogDescription>
          </DialogHeader>

          {sendSuccess ? (
            <div className="py-8 text-center">
              <div className="h-16 w-16 rounded-full bg-pishop/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-pishop" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {language === "vi" ? "Gửi thành công!" : "Sent successfully!"}
              </h3>
              <p className="text-muted-foreground">
                {language === "vi"
                  ? `Đã gửi π ${sendAmount} đến ${sendRecipient}`
                  : `Sent π ${sendAmount} to ${sendRecipient}`}
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{language === "vi" ? "Người nhận" : "Recipient"}</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={language === "vi" ? "@username hoặc địa chỉ ví" : "@username or wallet address"}
                    value={sendRecipient}
                    onChange={(e) => setSendRecipient(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{language === "vi" ? "Số lượng (π)" : "Amount (π)"}</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="text-2xl font-bold h-14"
                />
                <p className="text-xs text-muted-foreground">
                  {language === "vi"
                    ? `Số dư khả dụng: π ${walletBalance.toLocaleString()}`
                    : `Available balance: π ${walletBalance.toLocaleString()}`}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{language === "vi" ? "Ghi chú (tùy chọn)" : "Note (optional)"}</Label>
                <Input
                  placeholder={language === "vi" ? "Thêm ghi chú..." : "Add a note..."}
                  value={sendNote}
                  onChange={(e) => setSendNote(e.target.value)}
                />
              </div>
            </div>
          )}

          {!sendSuccess && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSendDialog(false)}>
                {language === "vi" ? "Hủy" : "Cancel"}
              </Button>
              <Button
                className="pi-gradient text-primary-foreground"
                onClick={handleSend}
                disabled={!sendAmount || !sendRecipient}
              >
                {language === "vi" ? "Gửi ngay" : "Send Now"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Receive Dialog */}
      <Dialog open={showReceiveDialog} onOpenChange={setShowReceiveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ArrowDownLeft className="h-5 w-5 text-pishop" />
              {language === "vi" ? "Nhận Pi" : "Receive Pi"}
            </DialogTitle>
            <DialogDescription>
              {language === "vi"
                ? "Chia sẻ địa chỉ ví hoặc mã QR để nhận Pi"
                : "Share your wallet address or QR code to receive Pi"}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="bg-white p-6 rounded-2xl flex items-center justify-center">
              <div className="h-48 w-48 bg-[url('/qr-code-for-pi-wallet.jpg')] bg-contain bg-center bg-no-repeat" />
            </div>

            <div className="space-y-2">
              <Label>{language === "vi" ? "Địa chỉ ví của bạn" : "Your wallet address"}</Label>
              <div className="flex gap-2">
                <Input value={walletAddress} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={handleCopyAddress}>
                  {copiedAddress ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full pi-gradient text-primary-foreground">
              {language === "vi" ? "Chia sẻ địa chỉ" : "Share Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              {language === "vi" ? "Mã QR của bạn" : "Your QR Code"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-white p-8 rounded-2xl flex items-center justify-center mb-4">
              <div className="h-56 w-56 bg-[url('/qr-code-for-pi-wallet-payment.jpg')] bg-contain bg-center bg-no-repeat" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {language === "vi"
                ? "Hiển thị mã này để người khác quét và gửi Pi cho bạn"
                : "Show this code for others to scan and send Pi to you"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Scan Dialog */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5 text-primary" />
              {language === "vi" ? "Quét mã QR" : "Scan QR Code"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="aspect-square bg-muted rounded-2xl flex flex-col items-center justify-center">
              <Scan className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center px-8">
                {language === "vi"
                  ? "Đưa camera vào mã QR để quét. Tính năng này cần quyền truy cập camera."
                  : "Point your camera at a QR code to scan. This feature requires camera permission."}
              </p>
            </div>

            <Button className="w-full mt-4 bg-transparent" variant="outline">
              {language === "vi" ? "Cho phép truy cập Camera" : "Allow Camera Access"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Recipient Dialog */}
      <Dialog open={showAddRecipientDialog} onOpenChange={setShowAddRecipientDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              {language === "vi" ? "Thêm người nhận" : "Add Recipient"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>{language === "vi" ? "Username" : "Username"}</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  placeholder="username"
                  value={newRecipientUsername}
                  onChange={(e) => setNewRecipientUsername(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRecipientDialog(false)}>
              {language === "vi" ? "Hủy" : "Cancel"}
            </Button>
            <Button
              className="pi-gradient text-primary-foreground"
              onClick={handleAddRecipient}
              disabled={!newRecipientUsername}
            >
              {language === "vi" ? "Thêm" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Methods Dialog */}
      <Dialog open={showPaymentMethodsDialog} onOpenChange={setShowPaymentMethodsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{st.labels.paymentMethods}</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <Card className="p-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl pi-gradient flex items-center justify-center">
                  <PiNetworkLogo className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Pi Wallet</p>
                  <p className="text-sm text-muted-foreground">{language === "vi" ? "Mặc định" : "Default"}</p>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </div>
            </Card>

            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 bg-transparent">
              <Plus className="h-5 w-5" />
              {language === "vi" ? "Liên kết thẻ ngân hàng" : "Link bank card"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Security Dialog */}
      <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{st.labels.security}</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-3">
            {[
              {
                icon: Lock,
                label: st.labels.changePin,
                desc: language === "vi" ? "Đổi mã PIN 6 số" : "Change 6-digit PIN",
              },
              { icon: Fingerprint, label: st.labels.biometric, desc: language === "vi" ? "Đã bật" : "Enabled" },
              {
                icon: Smartphone,
                label: language === "vi" ? "Xác thực 2 lớp" : "Two-factor auth",
                desc: language === "vi" ? "Đã bật" : "Enabled",
              },
            ].map((item, i) => (
              <Card key={i} className="p-4 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Notifications Dialog */}
      <Dialog open={showNotificationsDialog} onOpenChange={setShowNotificationsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{st.labels.notifications}</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {[
              { label: language === "vi" ? "Giao dịch thành công" : "Successful transactions", enabled: true },
              { label: language === "vi" ? "Nhận tiền" : "Incoming payments", enabled: true },
              { label: language === "vi" ? "Khuyến mãi" : "Promotions", enabled: false },
              { label: language === "vi" ? "Cập nhật bảo mật" : "Security updates", enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span>{item.label}</span>
                <Button
                  variant={item.enabled ? "default" : "outline"}
                  size="sm"
                  className={item.enabled ? "pi-gradient text-primary-foreground" : ""}
                >
                  {item.enabled ? (language === "vi" ? "Bật" : "On") : language === "vi" ? "Tắt" : "Off"}
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Limits Dialog */}
      <Dialog open={showLimitsDialog} onOpenChange={setShowLimitsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{st.labels.limits}</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{st.labels.dailyLimit}</span>
                <span className="font-medium">π 10,000</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/4 pi-gradient rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground">
                {language === "vi" ? "Đã sử dụng: π 2,450 / π 10,000" : "Used: π 2,450 / π 10,000"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{language === "vi" ? "Giới hạn tháng" : "Monthly limit"}</span>
                <span className="font-medium">π 100,000</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-1/5 pi-gradient rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground">
                {language === "vi" ? "Đã sử dụng: π 20,150 / π 100,000" : "Used: π 20,150 / π 100,000"}
              </p>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              {language === "vi" ? "Yêu cầu tăng hạn mức" : "Request limit increase"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!showTransactionDetail} onOpenChange={() => setShowTransactionDetail(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{language === "vi" ? "Chi tiết giao dịch" : "Transaction Details"}</DialogTitle>
          </DialogHeader>

          {showTransactionDetail && (
            <div className="py-4 space-y-4">
              <div className="text-center pb-4 border-b">
                <p
                  className={cn(
                    "text-3xl font-bold",
                    showTransactionDetail.type === "income" ? "text-pishop" : "text-foreground",
                  )}
                >
                  {showTransactionDetail.type === "income" ? "+" : "-"}π{" "}
                  {Math.abs(showTransactionDetail.amount).toLocaleString()}
                </p>
                <Badge className="mt-2 bg-pishop/10 text-pishop">
                  {st.labels[showTransactionDetail.status as keyof typeof st.labels]}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "vi" ? "Mô tả" : "Description"}</span>
                  <span className="font-medium text-right">
                    {language === "vi" ? showTransactionDetail.description : showTransactionDetail.descEn}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "vi" ? "Danh mục" : "Category"}</span>
                  <span className="font-medium">
                    {st.categories[showTransactionDetail.category as keyof typeof st.categories]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "vi" ? "Ngày" : "Date"}</span>
                  <span className="font-medium">{showTransactionDetail.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "vi" ? "Giờ" : "Time"}</span>
                  <span className="font-medium">{showTransactionDetail.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === "vi" ? "Mã giao dịch" : "Transaction ID"}</span>
                  <span className="font-mono text-sm">TX{showTransactionDetail.id.toString().padStart(8, "0")}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
