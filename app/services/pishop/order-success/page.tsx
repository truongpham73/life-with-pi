"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Package, Home, ShoppingBag, Truck, ClipboardList } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  const { language } = useI18n()

  const t = {
    orderConfirmed: language === "vi" ? "Đơn hàng đã được xác nhận" : "Order Confirmed",
    orderId: language === "vi" ? "Mã đơn hàng" : "Order ID",
    estimatedDelivery: language === "vi" ? "Dự kiến giao hàng" : "Estimated Delivery",
    trackOrder: language === "vi" ? "Theo dõi đơn hàng" : "Track Order",
    viewOrders: language === "vi" ? "Xem đơn hàng" : "View Orders",
    continueShopping: language === "vi" ? "Tiếp tục mua sắm" : "Continue Shopping",
    backHome: language === "vi" ? "Quay về trang chủ" : "Back to Home",
    tomorrow: language === "vi" ? "Ngày mai" : "Tomorrow",
    thankYou: language === "vi" ? "Cảm ơn bạn đã đặt hàng!" : "Thank you for your order!",
    preparing: language === "vi" ? "Đơn hàng đang được chuẩn bị" : "Order is being prepared",
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-24">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="text-2xl font-bold mb-2 text-center">{t.orderConfirmed}</h1>
      <p className="text-muted-foreground text-center mb-6">{t.thankYou}</p>

      <Card className="w-full max-w-sm p-6 mb-6 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="text-muted-foreground">{t.orderId}</span>
          <span className="font-bold">#ORD-2026-001234</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b">
          <span className="text-muted-foreground">{t.estimatedDelivery}</span>
          <span className="font-bold">{t.tomorrow} - 14:00-16:00</span>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <Package className="h-5 w-5 text-blue-600" />
          <span className="text-sm">{t.preparing}</span>
        </div>
      </Card>

      <div className="w-full max-w-sm space-y-3">
        <Link href="/services/pishop/orders" className="block">
          <Button className="w-full bg-primary text-primary-foreground gap-2">
            <Truck className="h-4 w-4" />
            {t.trackOrder}
          </Button>
        </Link>
        <Link href="/services/pishop/orders" className="block">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <ClipboardList className="h-4 w-4" />
            {t.viewOrders}
          </Button>
        </Link>
        <Link href="/services/pishop" className="block">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <ShoppingBag className="h-4 w-4" />
            {t.continueShopping}
          </Button>
        </Link>
        <Link href="/" className="block">
          <Button variant="ghost" className="w-full gap-2">
            <Home className="h-4 w-4" />
            {t.backHome}
          </Button>
        </Link>
      </div>
    </div>
  )
}
