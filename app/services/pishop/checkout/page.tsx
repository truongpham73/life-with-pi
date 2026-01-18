"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, CreditCard, Check, Package, ShoppingBag, Truck } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { language } = useI18n()
  const { items, getTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("pi-wallet")

  const t = {
    checkout: language === "vi" ? "Thanh Toán" : "Checkout",
    shippingAddress: language === "vi" ? "Địa chỉ giao hàng" : "Shipping Address",
    reviewOrder: language === "vi" ? "Xem lại đơn hàng" : "Review Order",
    payment: language === "vi" ? "Phương thức thanh toán" : "Payment Method",
    name: language === "vi" ? "Họ tên" : "Full Name",
    phone: language === "vi" ? "Điện thoại" : "Phone",
    address: language === "vi" ? "Địa chỉ" : "Address",
    city: language === "vi" ? "Thành phố" : "City",
    postalCode: language === "vi" ? "Mã bưu điện" : "Postal Code",
    continue: language === "vi" ? "Tiếp tục" : "Continue",
    back: language === "vi" ? "Quay lại" : "Back",
    subtotal: language === "vi" ? "Tạm tính" : "Subtotal",
    shipping: language === "vi" ? "Vận chuyển" : "Shipping",
    discount: language === "vi" ? "Giảm giá" : "Discount",
    total: language === "vi" ? "Tổng cộng" : "Total",
    piWallet: language === "vi" ? "Ví Pi" : "Pi Wallet",
    creditCard: language === "vi" ? "Thẻ tín dụng" : "Credit Card",
    cod: language === "vi" ? "Thanh toán khi nhận hàng" : "Cash on Delivery",
    placeOrder: language === "vi" ? "Đặt hàng" : "Place Order",
    processing: language === "vi" ? "Đang xử lý..." : "Processing...",
    freeShipping: language === "vi" ? "Miễn phí" : "Free",
    items: language === "vi" ? "sản phẩm" : "items",
    deliveryTime: language === "vi" ? "Giao hàng trong 2-3 ngày" : "Delivery in 2-3 days",
    orderSummary: language === "vi" ? "Tóm tắt đơn hàng" : "Order Summary",
    shippingTo: language === "vi" ? "Giao đến" : "Ship to",
    fillRequired: language === "vi" ? "Vui lòng điền đầy đủ thông tin" : "Please fill all required fields",
  }

  const totalPrice = getTotal()
  const shippingFee = totalPrice >= 500 ? 0 : 15
  const finalTotal = totalPrice + shippingFee

  const isFormValid = shippingInfo.name && shippingInfo.phone && shippingInfo.address && shippingInfo.city

  const handleContinue = () => {
    if (step === 1 && !isFormValid) {
      alert(t.fillRequired)
      return
    }

    if (step < 3) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setIsProcessing(true)
      setTimeout(() => {
        clearCart()
        router.push("/services/pishop/order-success")
      }, 1500)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-3 font-semibold">{t.checkout}</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="px-4 py-4 border-b bg-muted/30">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-1 transition-all ${
                    step > s
                      ? "bg-green-500 text-white"
                      : step === s
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                <span
                  className={`text-xs text-center max-w-[80px] ${step === s ? "text-primary font-medium" : "text-muted-foreground"}`}
                >
                  {s === 1 && t.shippingAddress}
                  {s === 2 && t.reviewOrder}
                  {s === 3 && t.payment}
                </span>
              </div>
              {index < 2 && <div className={`w-8 h-0.5 mx-1 mt-[-20px] ${step > s ? "bg-green-500" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Step 1: Shipping Address */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {t.shippingAddress}
            </h2>
            <Card className="p-4 space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t.name} *</label>
                <Input
                  placeholder={t.name}
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t.phone} *</label>
                <Input
                  placeholder={t.phone}
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t.address} *</label>
                <Input
                  placeholder={t.address}
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t.city} *</label>
                <Input
                  placeholder={t.city}
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">{t.postalCode}</label>
                <Input
                  placeholder={t.postalCode}
                  value={shippingInfo.postalCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                  className="h-12"
                />
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Review Order */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              {t.reviewOrder}
            </h2>

            {/* Shipping Info Summary */}
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{shippingInfo.name}</p>
                  <p className="text-sm text-muted-foreground">{shippingInfo.phone}</p>
                  <p className="text-sm text-muted-foreground">
                    {shippingInfo.address}, {shippingInfo.city}
                    {shippingInfo.postalCode && `, ${shippingInfo.postalCode}`}
                  </p>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card className="p-4">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                {t.orderSummary} ({items.length} {t.items})
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=64&width=64&query=product"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      <p className="text-sm font-semibold text-primary">
                        π {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Info */}
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">{t.deliveryTime}</p>
                  <p className="text-sm text-muted-foreground">
                    {shippingFee === 0 ? t.freeShipping : `π ${shippingFee}`}
                  </p>
                </div>
              </div>
            </Card>

            {/* Price Summary */}
            <Card className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.subtotal}</span>
                <span>π {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.shipping}</span>
                <span className={shippingFee === 0 ? "text-green-500" : ""}>
                  {shippingFee === 0 ? t.freeShipping : `π ${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>{t.total}</span>
                <span className="text-primary">π {finalTotal.toLocaleString()}</span>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Payment Method */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              {t.payment}
            </h2>

            <div className="space-y-3">
              {[
                {
                  id: "pi-wallet",
                  label: t.piWallet,
                  icon: "π",
                  desc: language === "vi" ? "Thanh toán nhanh bằng Pi" : "Fast payment with Pi",
                  recommended: true,
                },
                {
                  id: "cod",
                  label: t.cod,
                  icon: "💵",
                  desc: language === "vi" ? "Thanh toán khi nhận hàng" : "Pay when you receive",
                },
                {
                  id: "credit-card",
                  label: t.creditCard,
                  icon: "💳",
                  desc: language === "vi" ? "Visa, Mastercard" : "Visa, Mastercard",
                },
              ].map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer border-2 transition-all ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{method.label}</span>
                        {method.recommended && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            {language === "vi" ? "Khuyên dùng" : "Recommended"}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.desc}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}
                    >
                      {paymentMethod === method.id && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Final Price Summary */}
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-medium">{t.total}</span>
                <span className="text-2xl font-bold text-primary">π {finalTotal.toLocaleString()}</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-background border-t shadow-lg z-40">
        <div className="px-4 py-3 space-y-2">
          {/* Price Display */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t.total}</span>
            <span className="text-xl font-bold text-primary">π {finalTotal.toLocaleString()}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12 bg-transparent" onClick={handleBack}>
              {t.back}
            </Button>
            <Button
              className="flex-1 h-12 bg-gradient-to-r from-primary to-[oklch(0.65_0.18_50)] text-primary-foreground font-semibold text-base"
              onClick={handleContinue}
              disabled={isProcessing || (step === 1 && !isFormValid)}
            >
              {isProcessing ? t.processing : step === 3 ? t.placeOrder : t.continue}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
