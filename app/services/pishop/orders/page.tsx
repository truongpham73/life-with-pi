"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, Truck, MapPin, Phone, MessageCircle, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n/context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const mockOrders = [
  {
    id: "ORD-2026-001234",
    status: "shipping",
    date: "2026-01-14",
    total: 125.5,
    items: [{ name: "iPhone 15 Pro Max", quantity: 1, price: 120, image: "/iphone-15-pro-max-display.png" }],
    seller: "Apple Store Vietnam",
    tracking: {
      carrier: "Giao Hàng Nhanh",
      trackingNumber: "GHN123456789",
      estimatedDelivery: "2026-01-16",
      currentLocation: "Quận 1, TP.HCM",
      history: [
        { time: "2026-01-14 09:00", status: "Đơn hàng đã được đặt", location: "Online" },
        { time: "2026-01-14 14:00", status: "Đang lấy hàng", location: "Kho Apple Store" },
        { time: "2026-01-14 18:00", status: "Đã lấy hàng", location: "Quận 7, TP.HCM" },
        { time: "2026-01-15 08:00", status: "Đang vận chuyển", location: "Trung tâm phân loại" },
        { time: "2026-01-15 14:00", status: "Đang giao hàng", location: "Quận 1, TP.HCM" },
      ],
    },
  },
  {
    id: "ORD-2026-001233",
    status: "delivered",
    date: "2026-01-10",
    total: 45.0,
    items: [{ name: "Nike Air Max 270", quantity: 1, price: 45, image: "/nike-air-max-270-side.jpg" }],
    seller: "Nike Vietnam Store",
    tracking: {
      carrier: "J&T Express",
      trackingNumber: "JT987654321",
      deliveredAt: "2026-01-12 10:30",
    },
  },
  {
    id: "ORD-2026-001232",
    status: "processing",
    date: "2026-01-15",
    total: 89.0,
    items: [{ name: 'Samsung 4K TV 55"', quantity: 1, price: 89, image: "/samsung-4k-tv.png" }],
    seller: "Samsung Official",
    tracking: null,
  },
  {
    id: "ORD-2026-001231",
    status: "cancelled",
    date: "2026-01-08",
    total: 25.0,
    items: [{ name: "Dyson V15 Vacuum", quantity: 1, price: 25, image: "/dyson-vacuum.png" }],
    seller: "Dyson Vietnam",
    tracking: null,
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const { language } = useI18n()
  const { toast } = useToast()
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockOrders)[0] | null>(null)
  const [showTracking, setShowTracking] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState("")
  const [showContactDialog, setShowContactDialog] = useState(false)

  const t = {
    vi: {
      title: "Đơn hàng của tôi",
      search: "Tìm kiếm đơn hàng...",
      all: "Tất cả",
      processing: "Đang xử lý",
      shipping: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
      orderDate: "Ngày đặt",
      total: "Tổng tiền",
      trackOrder: "Theo dõi đơn hàng",
      viewDetail: "Xem chi tiết",
      reorder: "Mua lại",
      review: "Đánh giá",
      contact: "Liên hệ",
      trackingTitle: "Theo dõi vận chuyển",
      carrier: "Đơn vị vận chuyển",
      trackingNumber: "Mã vận đơn",
      estimatedDelivery: "Dự kiến giao",
      currentLocation: "Vị trí hiện tại",
      deliveryHistory: "Lịch sử vận chuyển",
      contactDriver: "Liên hệ tài xế",
      noOrders: "Chưa có đơn hàng nào",
      shopNow: "Mua sắm ngay",
      items: "sản phẩm",
      deliveredAt: "Đã giao lúc",
    },
    en: {
      title: "My Orders",
      search: "Search orders...",
      all: "All",
      processing: "Processing",
      shipping: "Shipping",
      delivered: "Delivered",
      cancelled: "Cancelled",
      orderDate: "Order Date",
      total: "Total",
      trackOrder: "Track Order",
      viewDetail: "View Detail",
      reorder: "Reorder",
      review: "Review",
      contact: "Contact",
      trackingTitle: "Shipment Tracking",
      carrier: "Carrier",
      trackingNumber: "Tracking Number",
      estimatedDelivery: "Estimated Delivery",
      currentLocation: "Current Location",
      deliveryHistory: "Delivery History",
      contactDriver: "Contact Driver",
      noOrders: "No orders yet",
      shopNow: "Shop Now",
      items: "items",
      deliveredAt: "Delivered at",
    },
  }

  const txt = t[language]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipping":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return txt.processing
      case "shipping":
        return txt.shipping
      case "delivered":
        return txt.delivered
      case "cancelled":
        return txt.cancelled
      default:
        return status
    }
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTab = activeTab === "all" || order.status === activeTab
    return matchesSearch && matchesTab
  })

  const handleReorder = (order: (typeof mockOrders)[0]) => {
    toast({
      title: language === "vi" ? "Đã thêm vào giỏ hàng" : "Added to cart",
      description:
        language === "vi"
          ? `Đã thêm ${order.items.length} sản phẩm vào giỏ hàng`
          : `Added ${order.items.length} items to cart`,
    })
    router.push("/services/pishop/cart")
  }

  const handleSubmitReview = () => {
    toast({
      title: language === "vi" ? "Cảm ơn đánh giá của bạn" : "Thank you for your review",
      description: language === "vi" ? "Đánh giá đã được gửi thành công" : "Your review has been submitted",
    })
    setShowReviewDialog(false)
    setReviewRating(5)
    setReviewComment("")
  }

  const handleContactDriver = () => {
    toast({
      title: language === "vi" ? "Đang kết nối..." : "Connecting...",
      description: language === "vi" ? "Đang kết nối với tài xế" : "Connecting with driver",
    })
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{txt.title}</h1>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={txt.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="w-full grid grid-cols-5 h-auto">
            <TabsTrigger value="all" className="text-xs py-2">
              {txt.all}
            </TabsTrigger>
            <TabsTrigger value="processing" className="text-xs py-2">
              {txt.processing}
            </TabsTrigger>
            <TabsTrigger value="shipping" className="text-xs py-2">
              {txt.shipping}
            </TabsTrigger>
            <TabsTrigger value="delivered" className="text-xs py-2">
              {txt.delivered}
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs py-2">
              {txt.cancelled}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">{txt.noOrders}</p>
            <Link href="/services/pishop">
              <Button className="bg-primary text-primary-foreground">{txt.shopNow}</Button>
            </Link>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl border p-4 space-y-3">
              {/* Order Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{order.seller}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
              </div>

              {/* Items */}
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-muted"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                    <p className="text-sm font-semibold text-primary">{item.price} π</p>
                  </div>
                </div>
              ))}

              {/* Order Info */}
              <div className="flex items-center justify-between text-sm border-t pt-3">
                <span className="text-muted-foreground">
                  {txt.orderDate}: {order.date}
                </span>
                <span className="font-semibold">
                  {txt.total}: {order.total} π
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {order.status === "shipping" && (
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowTracking(true)
                    }}
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    {txt.trackOrder}
                  </Button>
                )}
                {order.status === "delivered" && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowReviewDialog(true)
                      }}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {txt.review}
                    </Button>
                    <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => handleReorder(order)}>
                      {txt.reorder}
                    </Button>
                  </>
                )}
                {order.status === "processing" && (
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowContactDialog(true)
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {txt.contact}
                  </Button>
                )}
                {order.status === "cancelled" && (
                  <Button className="flex-1 bg-primary text-primary-foreground" onClick={() => handleReorder(order)}>
                    {txt.reorder}
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tracking Dialog */}
      <Dialog open={showTracking} onOpenChange={setShowTracking}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              {txt.trackingTitle}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder?.tracking && (
            <div className="space-y-4">
              {/* Tracking Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{txt.carrier}</span>
                  <span className="text-sm font-medium">{selectedOrder.tracking.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{txt.trackingNumber}</span>
                  <span className="text-sm font-medium">{selectedOrder.tracking.trackingNumber}</span>
                </div>
                {selectedOrder.tracking.estimatedDelivery && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{txt.estimatedDelivery}</span>
                    <span className="text-sm font-medium text-primary">{selectedOrder.tracking.estimatedDelivery}</span>
                  </div>
                )}
                {selectedOrder.tracking.currentLocation && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{txt.currentLocation}</span>
                    <span className="text-sm font-medium">{selectedOrder.tracking.currentLocation}</span>
                  </div>
                )}
              </div>

              {/* Map Placeholder */}
              <div className="relative h-40 bg-muted rounded-lg overflow-hidden">
                <img
                  src="/delivery-map-route-ho-chi-minh-city.jpg"
                  alt="Delivery Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{selectedOrder.tracking.currentLocation}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              {selectedOrder.tracking.history && (
                <div>
                  <h4 className="font-medium mb-3">{txt.deliveryHistory}</h4>
                  <div className="space-y-4">
                    {selectedOrder.tracking.history.map((event, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${idx === selectedOrder.tracking!.history!.length - 1 ? "bg-primary" : "bg-muted-foreground/30"}`}
                          />
                          {idx < selectedOrder.tracking!.history!.length - 1 && (
                            <div className="w-0.5 h-full bg-muted-foreground/20 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p
                            className={`text-sm font-medium ${idx === selectedOrder.tracking!.history!.length - 1 ? "text-primary" : ""}`}
                          >
                            {event.status}
                          </p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Driver */}
              <Button className="w-full bg-transparent" variant="outline" onClick={handleContactDriver}>
                <Phone className="h-4 w-4 mr-2" />
                {txt.contactDriver}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{txt.review}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Rating */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === "vi" ? "Đánh giá của bạn" : "Your Rating"}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${star <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-sm font-medium mb-2 block">{language === "vi" ? "Nhận xét" : "Comment"}</label>
              <Textarea
                placeholder={language === "vi" ? "Chia sẻ trải nghiệm của bạn..." : "Share your experience..."}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit */}
            <Button className="w-full bg-primary text-primary-foreground" onClick={handleSubmitReview}>
              {language === "vi" ? "Gửi đánh giá" : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Seller Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{txt.contact}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedOrder && (
              <>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">{selectedOrder.seller}</p>
                  <p className="text-xs text-muted-foreground">{selectedOrder.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    {language === "vi" ? "Gọi điện" : "Call"}
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {language === "vi" ? "Nhắn tin" : "Message"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
