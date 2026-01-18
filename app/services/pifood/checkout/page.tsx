"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ChevronLeft,
  MapPin,
  Clock,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Wallet,
  ChevronRight,
  Percent,
  CheckCircle,
  Bike,
  MessageSquare,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Phở Bò Tái Nạm Gầu",
    nameEn: "Special Combo Beef Pho",
    price: 55,
    quantity: 2,
    note: "",
  },
  {
    id: 5,
    name: "Quẩy (2 cái)",
    nameEn: "Fried Dough Sticks (2 pcs)",
    price: 10,
    quantity: 1,
    note: "",
  },
  {
    id: 8,
    name: "Trà Đá",
    nameEn: "Iced Tea",
    price: 5,
    quantity: 2,
    note: "",
  },
]

const deliveryOptions = [
  { id: "standard", time: "20-30 min", fee: 0 },
  { id: "express", time: "10-15 min", fee: 15 },
  { id: "scheduled", time: "Schedule", fee: 0 },
]

export default function CheckoutPage() {
  const { language } = useI18n()
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("pi_wallet")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [note, setNote] = useState("")
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const isVietnamese = language === "vi"

  const updateQuantity = (itemId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = Math.max(0, item.quantity + delta)
            return { ...item, quantity: newQty }
          }
          return item
        })
        .filter((item) => item.quantity > 0),
    )
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = deliveryOptions.find((o) => o.id === deliveryOption)?.fee || 0
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0
  const total = subtotal + deliveryFee - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome20") {
      setPromoApplied(true)
    }
  }

  const handlePlaceOrder = () => {
    setIsOrdering(true)
    setTimeout(() => {
      setIsOrdering(false)
      setOrderSuccess(true)
    }, 2000)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isVietnamese ? "Đặt hàng thành công!" : "Order Placed Successfully!"}
          </h1>
          <p className="text-muted-foreground mb-2">
            {isVietnamese ? "Mã đơn hàng: #PF202601150001" : "Order ID: #PF202601150001"}
          </p>
          <p className="text-muted-foreground mb-8">
            {isVietnamese
              ? "Đơn hàng của bạn đang được chuẩn bị. Dự kiến giao trong 20-30 phút."
              : "Your order is being prepared. Estimated delivery in 20-30 minutes."}
          </p>

          <Card className="p-4 mb-6 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-pifood/10 flex items-center justify-center">
                <Bike className="h-5 w-5 text-pifood" />
              </div>
              <div>
                <p className="font-semibold">{isVietnamese ? "Đang tìm tài xế..." : "Finding driver..."}</p>
                <p className="text-sm text-muted-foreground">
                  {isVietnamese ? "Vui lòng chờ trong giây lát" : "Please wait a moment"}
                </p>
              </div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-pifood rounded-full animate-pulse" style={{ width: "30%" }} />
            </div>
          </Card>

          <div className="flex gap-3 max-w-sm mx-auto">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.push("/services/pifood")}>
              {isVietnamese ? "Đặt thêm" : "Order More"}
            </Button>
            <Button
              className="flex-1 bg-pifood hover:bg-pifood/90"
              onClick={() => router.push("/services/pifood/orders")}
            >
              {isVietnamese ? "Theo dõi đơn" : "Track Order"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="font-semibold text-lg">{isVietnamese ? "Thanh toán" : "Checkout"}</h1>
        </div>
      </div>

      <div className="container px-4 py-4 space-y-4">
        {/* Delivery Address */}
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-pifood/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-pifood" />
              </div>
              <div>
                <p className="font-semibold">{isVietnamese ? "Địa chỉ giao hàng" : "Delivery Address"}</p>
                <p className="text-sm text-muted-foreground mt-1">123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM</p>
                <p className="text-sm text-muted-foreground">
                  {isVietnamese ? "Người nhận: Nguyễn Văn A • 0901234567" : "Recipient: Nguyen Van A • 0901234567"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Restaurant Info */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl overflow-hidden">
              <img
                src="/vietnamese-pho-restaurant-interior.jpg"
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">Phở Thìn Bờ Hồ</p>
              <p className="text-sm text-muted-foreground">1.2 km • 20-30 min</p>
            </div>
          </div>
        </Card>

        {/* Cart Items */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">
            {isVietnamese ? "Các món đã chọn" : "Your Items"} ({cartItems.length})
          </h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-medium">{isVietnamese ? item.name : item.nameEn}</p>
                  <p className="text-sm text-pifood font-semibold">π {item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="h-4 w-4 text-destructive" />
                    ) : (
                      <Minus className="h-4 w-4" />
                    )}
                  </Button>
                  <span className="font-medium w-6 text-center">{item.quantity}</span>
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full bg-pifood hover:bg-pifood/90"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 gap-2 text-pifood" onClick={() => router.back()}>
            <Plus className="h-4 w-4" />
            {isVietnamese ? "Thêm món khác" : "Add more items"}
          </Button>
        </Card>

        {/* Delivery Options */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">{isVietnamese ? "Tùy chọn giao hàng" : "Delivery Options"}</h3>
          <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption} className="space-y-3">
            {deliveryOptions.map((option) => (
              <div key={option.id} className="flex items-center">
                <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                <Label
                  htmlFor={option.id}
                  className="flex-1 flex items-center justify-between p-3 rounded-xl border cursor-pointer peer-data-[state=checked]:border-pifood peer-data-[state=checked]:bg-pifood/5"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {option.id === "standard"
                          ? isVietnamese
                            ? "Tiêu chuẩn"
                            : "Standard"
                          : option.id === "express"
                            ? isVietnamese
                              ? "Nhanh"
                              : "Express"
                            : isVietnamese
                              ? "Đặt lịch"
                              : "Schedule"}
                      </p>
                      <p className="text-sm text-muted-foreground">{option.time}</p>
                    </div>
                  </div>
                  <span className={option.fee === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {option.fee === 0 ? (isVietnamese ? "Miễn phí" : "Free") : `+ π ${option.fee}`}
                  </span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>

        {/* Note */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">{isVietnamese ? "Ghi chú cho quán" : "Note for restaurant"}</h3>
          </div>
          <Textarea
            placeholder={isVietnamese ? "Ví dụ: Ít hành, thêm ớt..." : "E.g.: Less onion, extra chili..."}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </Card>

        {/* Promo Code */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Percent className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">{isVietnamese ? "Mã giảm giá" : "Promo Code"}</h3>
          </div>
          {promoApplied ? (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-600">WELCOME20</span>
              </div>
              <span className="text-green-600 font-semibold">-20%</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder={isVietnamese ? "Nhập mã giảm giá" : "Enter promo code"}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" className="bg-transparent" onClick={handleApplyPromo}>
                {isVietnamese ? "Áp dụng" : "Apply"}
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {isVietnamese ? "Thử mã: WELCOME20 để giảm 20%" : "Try code: WELCOME20 for 20% off"}
          </p>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">{isVietnamese ? "Phương thức thanh toán" : "Payment Method"}</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
            <div className="flex items-center">
              <RadioGroupItem value="pi_wallet" id="pi_wallet" className="peer sr-only" />
              <Label
                htmlFor="pi_wallet"
                className="flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer peer-data-[state=checked]:border-pifood peer-data-[state=checked]:bg-pifood/5"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold">π</span>
                </div>
                <div>
                  <p className="font-medium">Pi Wallet</p>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese ? "Số dư: π 1,250.00" : "Balance: π 1,250.00"}
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer peer-data-[state=checked]:border-pifood peer-data-[state=checked]:bg-pifood/5"
              >
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{isVietnamese ? "Thẻ tín dụng/ghi nợ" : "Credit/Debit Card"}</p>
                  <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center">
              <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
              <Label
                htmlFor="cash"
                className="flex-1 flex items-center gap-3 p-3 rounded-xl border cursor-pointer peer-data-[state=checked]:border-pifood peer-data-[state=checked]:bg-pifood/5"
              >
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{isVietnamese ? "Tiền mặt" : "Cash"}</p>
                  <p className="text-sm text-muted-foreground">
                    {isVietnamese ? "Thanh toán khi nhận hàng" : "Pay on delivery"}
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">{isVietnamese ? "Tổng cộng" : "Order Summary"}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isVietnamese ? "Tạm tính" : "Subtotal"}</span>
              <span>π {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{isVietnamese ? "Phí giao hàng" : "Delivery fee"}</span>
              <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                {deliveryFee === 0 ? (isVietnamese ? "Miễn phí" : "Free") : `π ${deliveryFee}`}
              </span>
            </div>
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>{isVietnamese ? "Giảm giá (20%)" : "Discount (20%)"}</span>
                <span>- π {discount}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-border text-base font-bold">
              <span>{isVietnamese ? "Tổng thanh toán" : "Total"}</span>
              <span className="text-pifood">π {total}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
        <Button
          className="w-full h-14 bg-pifood hover:bg-pifood/90 shadow-xl rounded-2xl text-base"
          onClick={handlePlaceOrder}
          disabled={isOrdering || cartItems.length === 0}
        >
          {isOrdering
            ? isVietnamese
              ? "Đang xử lý..."
              : "Processing..."
            : isVietnamese
              ? `Đặt hàng • π ${total}`
              : `Place Order • π ${total}`}
        </Button>
      </div>
    </div>
  )
}
