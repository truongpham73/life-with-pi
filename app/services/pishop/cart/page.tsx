"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Minus, Plus, Trash2, Store, Truck, Tag } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockCartItems = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    nameVi: "iPhone 15 Pro Max 256GB",
    image: "/iphone-15-pro-max-display.png",
    price: 8500,
    originalPrice: 9500,
    quantity: 1,
    seller: "Apple Vietnam Official",
    selected: true,
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    nameVi: "Nike Air Max 270",
    image: "/nike-air-max-display.png",
    price: 450,
    originalPrice: 550,
    quantity: 2,
    seller: "Nike Vietnam Store",
    selected: true,
  },
]

export default function CartPage() {
  const router = useRouter()
  const { language } = useI18n()
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState(mockCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)

  const t = {
    cart: language === "vi" ? "Giỏ Hàng" : "Shopping Cart",
    selectAll: language === "vi" ? "Chọn tất cả" : "Select All",
    delete: language === "vi" ? "Xóa" : "Delete",
    subtotal: language === "vi" ? "Tạm tính" : "Subtotal",
    shipping: language === "vi" ? "Phí vận chuyển" : "Shipping",
    discount: language === "vi" ? "Giảm giá" : "Discount",
    total: language === "vi" ? "Tổng cộng" : "Total",
    checkout: language === "vi" ? "Thanh Toán" : "Checkout",
    freeShipping: language === "vi" ? "Miễn phí vận chuyển" : "Free Shipping",
    promoCode: language === "vi" ? "Mã giảm giá" : "Promo Code",
    apply: language === "vi" ? "Áp dụng" : "Apply",
    emptyCart: language === "vi" ? "Giỏ hàng trống" : "Your cart is empty",
    continueShopping: language === "vi" ? "Tiếp tục mua sắm" : "Continue Shopping",
    items: language === "vi" ? "sản phẩm" : "items",
    promoApplied: language === "vi" ? "Đã áp dụng mã giảm giá" : "Promo code applied",
    promoInvalid: language === "vi" ? "Mã giảm giá không hợp lệ" : "Invalid promo code",
    itemRemoved: language === "vi" ? "Đã xóa sản phẩm" : "Item removed",
    deleteSelected: language === "vi" ? "Xóa đã chọn" : "Delete selected",
  }

  const selectedItems = cartItems.filter((item) => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 10
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
    )
  }

  const toggleSelect = (id: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected)
    setCartItems((items) => items.map((item) => ({ ...item, selected: !allSelected })))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
    toast({
      title: t.itemRemoved,
    })
  }

  const deleteSelectedItems = () => {
    const selectedIds = cartItems.filter((item) => item.selected).map((item) => item.id)
    if (selectedIds.length === 0) return
    setCartItems((items) => items.filter((item) => !item.selected))
    toast({
      title: t.itemRemoved,
      description: `${selectedIds.length} ${t.items}`,
    })
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "pi10" || promoCode.toLowerCase() === "save10") {
      setAppliedPromo(promoCode)
      toast({
        title: t.promoApplied,
        description: "-10%",
      })
    } else {
      toast({
        title: t.promoInvalid,
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (selectedItems.length === 0) return
    sessionStorage.setItem("checkoutItems", JSON.stringify(selectedItems))
    sessionStorage.setItem("checkoutTotal", JSON.stringify({ subtotal, shipping, discount, total }))
    router.push("/services/pishop/checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-24">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
          <Truck className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{t.emptyCart}</h2>
        <Link href="/services/pishop">
          <Button className="mt-4">{t.continueShopping}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-72">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-3 font-semibold">
            {t.cart} ({cartItems.length})
          </h1>
        </div>
      </div>

      {/* Select All */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-background">
        <div className="flex items-center gap-3">
          <Checkbox checked={cartItems.every((item) => item.selected)} onCheckedChange={toggleSelectAll} />
          <span className="text-sm">
            {t.selectAll} ({cartItems.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500"
          onClick={deleteSelectedItems}
          disabled={selectedItems.length === 0}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          {t.deleteSelected}
        </Button>
      </div>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <Store className="h-4 w-4" />
              <span>{item.seller}</span>
            </div>
            <div className="flex gap-3">
              <Checkbox checked={item.selected} onCheckedChange={() => toggleSelect(item.id)} className="mt-1" />
              <Link href={`/services/pishop/product/${item.id}`}>
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={language === "vi" ? item.nameVi : item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/services/pishop/product/${item.id}`}>
                  <p className="font-medium line-clamp-2">{language === "vi" ? item.nameVi : item.name}</p>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-primary">π {item.price.toLocaleString()}</span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      π {item.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-transparent"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 bg-transparent"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-red-500"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Promo Code */}
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="font-medium">{t.promoCode}</span>
            {appliedPromo && <span className="text-xs text-green-600 ml-auto">({appliedPromo})</span>}
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              placeholder={language === "vi" ? "Nhập mã: PI10 hoặc SAVE10" : "Enter code: PI10 or SAVE10"}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg text-sm"
            />
            <Button variant="outline" onClick={handleApplyPromo}>
              {t.apply}
            </Button>
          </div>
        </Card>
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-background border-t shadow-lg p-4 z-50">
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {t.subtotal} ({selectedItems.length} {t.items})
            </span>
            <span>π {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t.shipping}</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? t.freeShipping : `π ${shipping}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.discount}</span>
              <span className="text-green-600">-π {discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>{t.total}</span>
            <span className="text-primary">π {total.toLocaleString()}</span>
          </div>
        </div>
        <Button
          className="w-full h-14 text-lg font-semibold pi-gradient"
          disabled={selectedItems.length === 0}
          onClick={handleCheckout}
        >
          {t.checkout} ({selectedItems.length} {t.items})
        </Button>
      </div>
    </div>
  )
}
