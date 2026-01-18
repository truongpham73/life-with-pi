"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Phone, MessageCircle, Clock, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useI18n } from "@/lib/i18n/context"
import { MapWidget } from "@/components/widgets/map-widget"

const mockFoodOrders = [
  {
    id: "FOOD-2026-001234",
    status: "delivering",
    restaurant: "Phở Thìn Bờ Hồ",
    items: [
      { name: "Phở bò tái", quantity: 2, price: 65 },
      { name: "Nem rán", quantity: 1, price: 45 },
    ],
    total: 175,
    deliveryFee: 0,
    orderTime: "12:30",
    estimatedDelivery: "13:00 - 13:15",
    driver: {
      name: "Nguyễn Văn Tài",
      phone: "0901234567",
      avatar: "/driver-avatar-1.jpg",
      vehicle: "Honda Wave - 59F1-12345",
      rating: 4.9,
    },
    tracking: [
      { time: "12:30", status: "Đơn hàng đã được đặt", completed: true },
      { time: "12:32", status: "Nhà hàng đã xác nhận", completed: true },
      { time: "12:45", status: "Đang chuẩn bị món", completed: true },
      { time: "12:55", status: "Tài xế đã lấy hàng", completed: true },
      { time: "13:05", status: "Đang giao hàng", completed: false },
    ],
  },
  {
    id: "FOOD-2026-001233",
    status: "completed",
    restaurant: "Pizza 4P's",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 189 },
      { name: "Pasta Carbonara", quantity: 1, price: 145 },
    ],
    total: 344,
    deliveryFee: 15,
    orderTime: "Yesterday 19:00",
    deliveredTime: "19:35",
    rating: 5,
  },
  {
    id: "FOOD-2026-001232",
    status: "preparing",
    restaurant: "Sushi Hokkaido",
    items: [
      { name: "Combo Sashimi", quantity: 1, price: 350 },
      { name: "Miso Soup", quantity: 2, price: 60 },
    ],
    total: 410,
    deliveryFee: 20,
    orderTime: "13:15",
    estimatedDelivery: "14:00 - 14:30",
  },
]

export default function FoodOrdersPage() {
  const router = useRouter()
  const { language } = useI18n()
  const [activeTab, setActiveTab] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof mockFoodOrders)[0] | null>(null)
  const [showTracking, setShowTracking] = useState(false)

  const t = {
    vi: {
      title: "Đơn hàng của tôi",
      all: "Tất cả",
      active: "Đang xử lý",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      trackOrder: "Theo dõi",
      reorder: "Đặt lại",
      rate: "Đánh giá",
      contact: "Liên hệ",
      preparing: "Đang chuẩn bị",
      delivering: "Đang giao",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
      driver: "Tài xế",
      callDriver: "Gọi tài xế",
      messageDriver: "Nhắn tin",
      estimatedTime: "Dự kiến",
      deliveryFee: "Phí giao hàng",
      total: "Tổng cộng",
      orderTracking: "Theo dõi đơn hàng",
      liveTracking: "Vị trí tài xế",
    },
    en: {
      title: "My Orders",
      all: "All",
      active: "Active",
      completed: "Completed",
      cancelled: "Cancelled",
      trackOrder: "Track",
      reorder: "Reorder",
      rate: "Rate",
      contact: "Contact",
      preparing: "Preparing",
      delivering: "Delivering",
      completed: "Completed",
      cancelled: "Cancelled",
      driver: "Driver",
      callDriver: "Call Driver",
      messageDriver: "Message",
      estimatedTime: "Estimated",
      deliveryFee: "Delivery Fee",
      total: "Total",
      orderTracking: "Order Tracking",
      liveTracking: "Driver Location",
    },
  }

  const txt = t[language]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "delivering":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    return txt[status as keyof typeof txt] || status
  }

  const filteredOrders = mockFoodOrders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ["preparing", "delivering"].includes(order.status)
    return order.status === activeTab
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">{txt.title}</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4 pb-2">
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="all" className="text-xs py-2">
              {txt.all}
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs py-2">
              {txt.active}
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs py-2">
              {txt.completed}
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs py-2">
              {txt.cancelled}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-card rounded-xl border p-4 space-y-3">
            {/* Order Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{order.restaurant}</p>
                <p className="text-xs text-muted-foreground">{order.id}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
            </div>

            {/* Items */}
            <div className="border-t border-b py-3 space-y-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>{item.price}π</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{txt.deliveryFee}</span>
              <span>{order.deliveryFee === 0 ? "Free" : `${order.deliveryFee}π`}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>{txt.total}</span>
              <span className="text-primary">{order.total}π</span>
            </div>

            {/* Estimated Time for active orders */}
            {order.estimatedDelivery && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {txt.estimatedTime}: {order.estimatedDelivery}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {order.status === "delivering" && (
                <>
                  <Button
                    className="flex-1 bg-primary"
                    onClick={() => {
                      setSelectedOrder(order)
                      setShowTracking(true)
                    }}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {txt.trackOrder}
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </>
              )}
              {order.status === "preparing" && (
                <Button variant="outline" className="flex-1 bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {txt.contact}
                </Button>
              )}
              {order.status === "completed" && (
                <>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    {txt.rate}
                  </Button>
                  <Button className="flex-1 bg-primary">{txt.reorder}</Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Tracking Dialog */}
      <Dialog open={showTracking} onOpenChange={setShowTracking}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{txt.orderTracking}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Driver Info */}
              {selectedOrder.driver && (
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <img
                    src={selectedOrder.driver.avatar || "/placeholder.svg"}
                    alt={selectedOrder.driver.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{selectedOrder.driver.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrder.driver.vehicle}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="h-10 w-10 rounded-full bg-transparent">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-10 w-10 rounded-full bg-transparent">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Map */}
              <div>
                <p className="text-sm font-medium mb-2">{txt.liveTracking}</p>
                <MapWidget height="h-40" />
              </div>

              {/* Timeline */}
              {selectedOrder.tracking && (
                <div className="space-y-3">
                  {selectedOrder.tracking.map((event, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            event.completed ? "bg-green-500" : "bg-muted"
                          }`}
                        >
                          {event.completed ? (
                            <Check className="h-3 w-3 text-white" />
                          ) : (
                            <Clock className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        {idx < selectedOrder.tracking!.length - 1 && (
                          <div className={`w-0.5 h-8 ${event.completed ? "bg-green-500" : "bg-muted"}`} />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${event.completed ? "" : "text-muted-foreground"}`}>
                          {event.status}
                        </p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
