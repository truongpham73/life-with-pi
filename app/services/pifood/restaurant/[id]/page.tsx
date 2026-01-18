"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Share2,
  Info,
  Phone,
  MessageSquare,
  Percent,
  ThumbsUp,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

// Mock restaurant data
const restaurantData = {
  id: 1,
  name: "Phở Thìn Bờ Hồ",
  nameEn: "Pho Thin Bo Ho",
  image: "/vietnamese-pho-restaurant-interior.jpg",
  coverImages: ["/vietnamese-pho-restaurant-interior.jpg", "/vietnamese-pho-bo-tai.jpg", "/vietnamese-bun-bo-hue.jpg"],
  cuisine: "vietnamese",
  rating: 4.9,
  reviews: 2850,
  deliveryTime: "20-30",
  deliveryFee: 0,
  minOrder: 50,
  distance: 1.2,
  address: "13 Lò Đúc, Hai Bà Trưng, Hà Nội",
  phone: "024 3821 2629",
  openHours: "06:00 - 22:00",
  description:
    "Phở Thìn Bờ Hồ là thương hiệu phở truyền thống nổi tiếng Hà Nội từ năm 1979. Với bí quyết gia truyền, nước dùng được ninh từ xương bò trong 12 giờ, kết hợp với bánh phở tươi và thịt bò tái chín mềm. Đây là điểm đến không thể bỏ qua cho những ai yêu ẩm thực Việt.",
  descriptionEn:
    "Pho Thin Bo Ho is a famous traditional Hanoi pho brand since 1979. With family recipes, the broth is simmered from beef bones for 12 hours, combined with fresh pho noodles and tender rare beef. This is a must-visit destination for Vietnamese cuisine lovers.",
  features: ["Wifi miễn phí", "Điều hòa", "Chỗ đậu xe", "Thanh toán Pi"],
  featuresEn: ["Free Wifi", "Air Conditioning", "Parking", "Pi Payment"],
}

// Menu categories with items
const menuCategories = [
  {
    id: "pho",
    name: "Phở",
    nameEn: "Pho",
    items: [
      {
        id: 1,
        name: "Phở Bò Tái",
        nameEn: "Rare Beef Pho",
        price: 45,
        originalPrice: 50,
        description: "Phở với thịt bò tái mềm, nước dùng đậm đà",
        descriptionEn: "Pho with tender rare beef, rich broth",
        image: "/vietnamese-pho-bo-tai.jpg",
        popular: true,
        spicy: false,
        rating: 4.9,
        sold: 1250,
      },
      {
        id: 2,
        name: "Phở Bò Chín",
        nameEn: "Well-done Beef Pho",
        price: 45,
        originalPrice: null,
        description: "Phở với thịt bò chín mềm, nước dùng thanh ngọt",
        descriptionEn: "Pho with tender well-done beef, sweet clear broth",
        image: "/vietnamese-pho-bo-tai.jpg",
        popular: false,
        spicy: false,
        rating: 4.8,
        sold: 890,
      },
      {
        id: 3,
        name: "Phở Bò Tái Nạm Gầu",
        nameEn: "Special Combo Beef Pho",
        price: 55,
        originalPrice: 65,
        description: "Phở đặc biệt với tái, nạm, gầu - đầy đủ nhất",
        descriptionEn: "Special pho with rare beef, flank, and brisket",
        image: "/vietnamese-pho-bo-tai.jpg",
        popular: true,
        spicy: false,
        rating: 4.9,
        sold: 2100,
      },
      {
        id: 4,
        name: "Phở Bò Viên",
        nameEn: "Beef Ball Pho",
        price: 40,
        originalPrice: null,
        description: "Phở với bò viên dai giòn tự làm",
        descriptionEn: "Pho with homemade chewy beef balls",
        image: "/vietnamese-pho-bo-tai.jpg",
        popular: false,
        spicy: false,
        rating: 4.7,
        sold: 650,
      },
    ],
  },
  {
    id: "side",
    name: "Món phụ",
    nameEn: "Side Dishes",
    items: [
      {
        id: 5,
        name: "Quẩy (2 cái)",
        nameEn: "Fried Dough Sticks (2 pcs)",
        price: 10,
        originalPrice: null,
        description: "Quẩy giòn rụm, ăn kèm phở tuyệt vời",
        descriptionEn: "Crispy fried dough sticks, perfect with pho",
        image: "/fried-dough-sticks.jpg",
        popular: true,
        spicy: false,
        rating: 4.8,
        sold: 3200,
      },
      {
        id: 6,
        name: "Trứng Gà Lòng Đào",
        nameEn: "Soft-boiled Egg",
        price: 8,
        originalPrice: null,
        description: "Trứng gà lòng đào thêm vào phở",
        descriptionEn: "Soft-boiled egg to add to your pho",
        image: "/soft-boiled-egg.jpg",
        popular: false,
        spicy: false,
        rating: 4.6,
        sold: 1800,
      },
      {
        id: 7,
        name: "Thịt Bò Tái Thêm",
        nameEn: "Extra Rare Beef",
        price: 25,
        originalPrice: null,
        description: "Phần thịt bò tái thêm cho người thích ăn nhiều thịt",
        descriptionEn: "Extra portion of rare beef for meat lovers",
        image: "/sliced-raw-beef.jpg",
        popular: true,
        spicy: false,
        rating: 4.9,
        sold: 980,
      },
    ],
  },
  {
    id: "drinks",
    name: "Đồ uống",
    nameEn: "Drinks",
    items: [
      {
        id: 8,
        name: "Trà Đá",
        nameEn: "Iced Tea",
        price: 5,
        originalPrice: null,
        description: "Trà đá mát lạnh giải khát",
        descriptionEn: "Refreshing iced tea",
        image: "/vietnamese-iced-tea.jpg",
        popular: true,
        spicy: false,
        rating: 4.5,
        sold: 5600,
      },
      {
        id: 9,
        name: "Nước Chanh Tươi",
        nameEn: "Fresh Lemonade",
        price: 15,
        originalPrice: null,
        description: "Nước chanh tươi vắt tại chỗ",
        descriptionEn: "Freshly squeezed lemonade",
        image: "/fresh-lemonade.png",
        popular: false,
        spicy: false,
        rating: 4.7,
        sold: 2300,
      },
      {
        id: 10,
        name: "Coca-Cola",
        nameEn: "Coca-Cola",
        price: 12,
        originalPrice: null,
        description: "Coca-Cola lon lạnh",
        descriptionEn: "Cold canned Coca-Cola",
        image: "/refreshing-cola-can.png",
        popular: false,
        spicy: false,
        rating: 4.5,
        sold: 1500,
      },
    ],
  },
]

// Mock reviews
const reviews = [
  {
    id: 1,
    user: "Minh T.",
    avatar: "/asian-man-avatar.png",
    rating: 5,
    date: "2 ngày trước",
    dateEn: "2 days ago",
    comment: "Phở ngon xuất sắc! Nước dùng đậm đà, thịt bò tươi ngon. Giao hàng nhanh, còn nóng hổi khi nhận.",
    commentEn: "Excellent pho! Rich broth, fresh beef. Fast delivery, still hot when received.",
    images: ["/vietnamese-pho-bo-tai.jpg"],
    helpful: 45,
    orderItems: ["Phở Bò Tái Nạm Gầu", "Quẩy"],
  },
  {
    id: 2,
    user: "Lan P.",
    avatar: "/asian-woman-avatar.png",
    rating: 5,
    date: "1 tuần trước",
    dateEn: "1 week ago",
    comment: "Đây là quán phở ngon nhất tôi từng ăn ở Hà Nội. Sẽ quay lại nhiều lần nữa!",
    commentEn: "This is the best pho I've ever had in Hanoi. Will come back many times!",
    images: [],
    helpful: 32,
    orderItems: ["Phở Bò Tái"],
  },
  {
    id: 3,
    user: "David N.",
    avatar: "/western-man-avatar.jpg",
    rating: 4,
    date: "2 tuần trước",
    dateEn: "2 weeks ago",
    comment: "Authentic Vietnamese pho. The broth is amazing. Only minus is delivery took a bit longer than expected.",
    commentEn:
      "Authentic Vietnamese pho. The broth is amazing. Only minus is delivery took a bit longer than expected.",
    images: ["/vietnamese-pho-bo-tai.jpg", "/vietnamese-pho-restaurant-interior.jpg"],
    helpful: 28,
    orderItems: ["Special Combo Beef Pho", "Fried Dough Sticks"],
  },
]

type CartItem = {
  id: number
  name: string
  nameEn: string
  price: number
  quantity: number
  note?: string
}

export default function RestaurantDetailPage() {
  const { language } = useI18n()
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("menu")
  const [activeCategory, setActiveCategory] = useState("pho")
  const [cart, setCart] = useState<CartItem[]>([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const restaurant = restaurantData

  const addToCart = (item: (typeof menuCategories)[0]["items"][0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          nameEn: item.nameEn,
          price: item.price,
          quantity: 1,
        },
      ]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
      }
      return prev.filter((i) => i.id !== itemId)
    })
  }

  const getCartQuantity = (itemId: number) => cart.find((i) => i.id === itemId)?.quantity || 0

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const isVietnamese = language === "vi"

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header with Cover Image */}
      <div className="relative h-56">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-2xl font-bold mb-1">{isVietnamese ? restaurant.name : restaurant.nameEn}</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {restaurant.rating}
            </span>
            <span>
              ({restaurant.reviews.toLocaleString()} {isVietnamese ? "đánh giá" : "reviews"})
            </span>
            <span>•</span>
            <span>{restaurant.distance} km</span>
          </div>
        </div>
      </div>

      {/* Restaurant Details Card */}
      <div className="container px-4 -mt-4 relative z-10">
        <Card className="p-4 mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {restaurant.deliveryTime} {isVietnamese ? "phút" : "min"}
            </span>
            <span className="flex items-center gap-1 text-pifood font-medium">
              {restaurant.deliveryFee === 0
                ? isVietnamese
                  ? "Miễn phí giao hàng"
                  : "Free delivery"
                : `π ${restaurant.deliveryFee}`}
            </span>
            <span>•</span>
            <span>
              {isVietnamese ? "Tối thiểu" : "Min"}: π {restaurant.minOrder}
            </span>
          </div>

          <div className="flex items-start gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{restaurant.address}</span>
          </div>

          <div className="flex items-center gap-2 text-sm mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{restaurant.openHours}</span>
            <Badge variant="secondary" className="ml-auto text-xs bg-green-100 text-green-700">
              {isVietnamese ? "Đang mở cửa" : "Open now"}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
              <Phone className="h-4 w-4" />
              {isVietnamese ? "Gọi điện" : "Call"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
              <MessageSquare className="h-4 w-4" />
              {isVietnamese ? "Nhắn tin" : "Message"}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
              <Info className="h-4 w-4" />
              {isVietnamese ? "Thông tin" : "Info"}
            </Button>
          </div>
        </Card>

        {/* Promo Banner */}
        <Card className="p-3 mb-4 bg-gradient-to-r from-pifood/10 to-primary/10 border-pifood/20">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-pifood/20 flex items-center justify-center">
              <Percent className="h-5 w-5 text-pifood" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-pifood">
                {isVietnamese ? "Giảm 20% cho đơn đầu tiên" : "20% off your first order"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isVietnamese ? "Áp dụng tự động khi thanh toán" : "Applied automatically at checkout"}
              </p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 h-12 mb-4">
            <TabsTrigger value="menu">{isVietnamese ? "Thực đơn" : "Menu"}</TabsTrigger>
            <TabsTrigger value="reviews">
              {isVietnamese ? "Đánh giá" : "Reviews"} ({restaurant.reviews})
            </TabsTrigger>
            <TabsTrigger value="info">{isVietnamese ? "Thông tin" : "Info"}</TabsTrigger>
          </TabsList>

          {/* Menu Tab */}
          <TabsContent value="menu" className="mt-0">
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {menuCategories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  className={`flex-shrink-0 rounded-full ${
                    activeCategory === cat.id ? "bg-pifood hover:bg-pifood/90" : "bg-transparent"
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {isVietnamese ? cat.name : cat.nameEn}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            {menuCategories.map((category) => (
              <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
                <h3 className="font-bold text-lg mb-4">{isVietnamese ? category.name : category.nameEn}</h3>
                <div className="space-y-3">
                  {category.items.map((item) => {
                    const quantity = getCartQuantity(item.id)
                    return (
                      <Card key={item.id} className="p-3">
                        <div className="flex gap-3">
                          <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.popular && (
                              <Badge className="absolute top-1 left-1 text-[10px] bg-pifood border-0 px-1.5 py-0.5">
                                {isVietnamese ? "Bán chạy" : "Popular"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-sm">{isVietnamese ? item.name : item.nameEn}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                  {isVietnamese ? item.description : item.descriptionEn}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Star className="h-3 w-3 fill-primary text-primary" />
                              <span>{item.rating}</span>
                              <span>•</span>
                              <span>{isVietnamese ? `Đã bán ${item.sold}` : `${item.sold} sold`}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-pifood">π {item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    π {item.originalPrice}
                                  </span>
                                )}
                              </div>
                              {quantity === 0 ? (
                                <Button
                                  size="sm"
                                  className="h-8 rounded-full bg-pifood hover:bg-pifood/90"
                                  onClick={() => addToCart(item)}
                                >
                                  <Plus className="h-4 w-4 mr-1" />
                                  {isVietnamese ? "Thêm" : "Add"}
                                </Button>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8 rounded-full bg-transparent"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="font-medium w-4 text-center">{quantity}</span>
                                  <Button
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-pifood hover:bg-pifood/90"
                                    onClick={() => addToCart(item)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-0">
            {/* Rating Summary */}
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pifood">{restaurant.rating}</div>
                  <div className="flex items-center justify-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(restaurant.rating) ? "fill-primary text-primary" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {restaurant.reviews.toLocaleString()} {isVietnamese ? "đánh giá" : "reviews"}
                  </p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm w-3">{star}</span>
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : 2}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Review List */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user}</h4>
                        <span className="text-xs text-muted-foreground">
                          {isVietnamese ? review.date : review.dateEn}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {isVietnamese ? review.comment : review.commentEn}
                      </p>
                      {review.images.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {review.images.map((img, idx) => (
                            <div key={idx} className="h-16 w-16 rounded-lg overflow-hidden">
                              <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          {isVietnamese ? "Hữu ích" : "Helpful"} ({review.helpful})
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {isVietnamese ? "Đã đặt:" : "Ordered:"} {review.orderItems.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              {isVietnamese ? "Xem thêm đánh giá" : "View more reviews"}
            </Button>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info" className="mt-0">
            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Giới thiệu" : "About"}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isVietnamese ? restaurant.description : restaurant.descriptionEn}
              </p>
            </Card>

            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Tiện ích" : "Features"}</h3>
              <div className="flex flex-wrap gap-2">
                {(isVietnamese ? restaurant.features : restaurant.featuresEn).map((feature, idx) => (
                  <Badge key={idx} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4 mb-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Giờ mở cửa" : "Opening Hours"}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{isVietnamese ? "Thứ 2 - Chủ nhật" : "Mon - Sun"}</span>
                  <span className="font-medium">{restaurant.openHours}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">{isVietnamese ? "Liên hệ" : "Contact"}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
          <Link href="/services/pifood/checkout">
            <Button className="w-full h-14 bg-pifood hover:bg-pifood/90 shadow-xl rounded-2xl justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="font-semibold">{isVietnamese ? "Xem giỏ hàng" : "View Cart"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {cartCount} {isVietnamese ? "món" : "items"}
                </span>
                <span className="font-bold">π {cartTotal}</span>
              </div>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
