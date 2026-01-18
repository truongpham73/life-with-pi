"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiFoodIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin, ChevronRight, Plus, Minus, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock data for restaurants with more details
const mockRestaurants = [
  {
    id: 1,
    name: "Phở Thìn Bờ Hồ",
    nameEn: "Pho Thin Bo Ho",
    image: "/vietnamese-pho-restaurant-interior.jpg",
    cuisine: "vietnamese",
    rating: 4.9,
    reviews: 2850,
    deliveryTime: "20-30",
    deliveryFee: 0,
    minOrder: 50,
    distance: 1.2,
    featured: true,
    promo: "20% OFF",
    description: "Phở truyền thống Hà Nội từ năm 1979",
  },
  {
    id: 2,
    name: "Bún Chả Hương Liên",
    nameEn: "Bun Cha Huong Lien",
    image: "/vietnamese-bun-cha-restaurant.jpg",
    cuisine: "vietnamese",
    rating: 4.8,
    reviews: 3200,
    deliveryTime: "25-35",
    deliveryFee: 0,
    minOrder: 40,
    distance: 0.8,
    featured: true,
    promo: "Free Delivery",
    description: "Bún chả Obama nổi tiếng",
  },
  {
    id: 3,
    name: "Sushi Hokkaido",
    nameEn: "Sushi Hokkaido",
    image: "/japanese-sushi-restaurant-premium.jpg",
    cuisine: "asian",
    rating: 4.7,
    reviews: 1890,
    deliveryTime: "30-45",
    deliveryFee: 15,
    minOrder: 100,
    distance: 2.5,
    featured: true,
    promo: null,
    description: "Sushi Nhật Bản cao cấp",
  },
  {
    id: 4,
    name: "Pizza 4P's",
    nameEn: "Pizza 4P's",
    image: "/pizza-restaurant-artisan-wood-fired.jpg",
    cuisine: "western",
    rating: 4.6,
    reviews: 4500,
    deliveryTime: "35-50",
    deliveryFee: 10,
    minOrder: 80,
    distance: 1.8,
    featured: false,
    promo: "Buy 2 Get 1",
    description: "Pizza thủ công lò củi",
  },
  {
    id: 5,
    name: "The Coffee House",
    nameEn: "The Coffee House",
    image: "/vietnamese-coffee-shop-modern-interior.jpg",
    cuisine: "drinks",
    rating: 4.5,
    reviews: 8900,
    deliveryTime: "15-25",
    deliveryFee: 0,
    minOrder: 25,
    distance: 0.5,
    featured: true,
    promo: null,
    description: "Cà phê & trà Việt Nam",
  },
  {
    id: 6,
    name: "KFC Vietnam",
    nameEn: "KFC Vietnam",
    image: "/fried-chicken-restaurant.png",
    cuisine: "fastFood",
    rating: 4.3,
    reviews: 6200,
    deliveryTime: "20-30",
    deliveryFee: 5,
    minOrder: 50,
    distance: 1.0,
    featured: false,
    promo: "Combo Deal",
    description: "Gà rán & đồ ăn nhanh",
  },
]

// Mock menu items with more variety
const mockMenuItems = [
  {
    id: 1,
    name: "Phở Bò Tái",
    nameEn: "Rare Beef Pho",
    price: 45,
    description: "Phở bò với thịt tái mềm",
    descEn: "Beef noodle soup with rare beef",
    image: "/vietnamese-pho-bo-tai.jpg",
  },
  {
    id: 2,
    name: "Cơm Tấm Sườn",
    nameEn: "Broken Rice with Pork",
    price: 55,
    description: "Cơm tấm sườn nướng đặc biệt",
    descEn: "Grilled pork chop with broken rice",
    image: "/vietnamese-com-tam-suon.jpg",
  },
  {
    id: 3,
    name: "Bánh Mì Thịt",
    nameEn: "Vietnamese Sandwich",
    price: 25,
    description: "Bánh mì thịt nguội đầy đủ",
    descEn: "Classic Vietnamese sandwich",
    image: "/vietnamese-banh-mi-sandwich.jpg",
  },
  {
    id: 4,
    name: "Bún Bò Huế",
    nameEn: "Hue Style Beef Noodle",
    price: 50,
    description: "Bún bò Huế cay nồng đặc trưng",
    descEn: "Spicy Hue-style beef noodle soup",
    image: "/vietnamese-bun-bo-hue.jpg",
  },
]

export default function PiFoodPage() {
  const { language, t } = useI18n()
  const st = serviceTranslations[language].piFood
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { key: "all", label: st.categories.all },
    { key: "vietnamese", label: st.categories.vietnamese },
    { key: "fastFood", label: st.categories.fastFood },
    { key: "asian", label: st.categories.asian },
    { key: "western", label: st.categories.western },
    { key: "drinks", label: st.categories.drinks },
    { key: "dessert", label: st.categories.dessert },
    { key: "healthy", label: st.categories.healthy },
  ]

  const filters = [
    { key: "nearMe", label: st.filters.nearMe },
    { key: "topRated", label: st.filters.topRated },
    { key: "freeDelivery", label: st.filters.freeDelivery },
    { key: "promotions", label: st.filters.promotions },
  ]

  const filteredRestaurants = mockRestaurants.filter((r) => {
    if (selectedCategory !== "all" && r.cuisine !== selectedCategory) return false
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (itemId: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId)
      if (existing) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { id: itemId, quantity: 1 }]
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

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeader
        title={t.services.piFood.name}
        icon={<PiFoodIcon className="w-full h-full" />}
        colorClass="bg-pifood text-white"
        showCart
        cartCount={cartCount}
        searchPlaceholder={language === "vi" ? "Tìm món ăn, nhà hàng..." : "Search food, restaurants..."}
        onSearch={setSearchQuery}
      />

      <div className="container px-4 py-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-shrink-0 rounded-full",
                selectedCategory === cat.key ? "bg-pifood hover:bg-pifood/90" : "bg-transparent",
              )}
              onClick={() => setSelectedCategory(cat.key)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {filters.map((filter) => (
            <Badge
              key={filter.key}
              variant="secondary"
              className="cursor-pointer hover:bg-pifood/10 hover:text-pifood flex-shrink-0 transition-colors"
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Featured Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{t.common.featured}</h2>
            <Button variant="ghost" size="sm" className="gap-1 text-pifood">
              {t.common.viewAll}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {filteredRestaurants
              .filter((r) => r.featured)
              .map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/services/pifood/restaurant/${restaurant.id}`}
                  className="flex-shrink-0 w-[280px]"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-36">
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      {restaurant.promo && (
                        <Badge className="absolute top-2 left-2 bg-pifood border-0">{restaurant.promo}</Badge>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold mb-1 text-foreground">
                        {language === "vi" ? restaurant.name : restaurant.nameEn}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">{restaurant.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          {restaurant.rating}
                        </span>
                        <span>({restaurant.reviews.toLocaleString()})</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {restaurant.deliveryTime} min
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{restaurant.distance} km</span>
                        <span>•</span>
                        <span className="text-pifood font-medium">
                          {restaurant.deliveryFee === 0 ? t.common.free : `π ${restaurant.deliveryFee}`}{" "}
                          {st.labels.deliveryFee.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </section>

        {/* All Restaurants */}
        <section>
          <h2 className="font-bold text-lg mb-4">{st.labels.restaurant}</h2>
          <div className="grid gap-4">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/services/pifood/restaurant/${restaurant.id}`}>
                <Card className="flex overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative w-28 h-28 flex-shrink-0">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    {restaurant.promo && (
                      <Badge className="absolute top-1 left-1 text-xs bg-pifood border-0">{restaurant.promo}</Badge>
                    )}
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-semibold mb-1 text-foreground">
                      {language === "vi" ? restaurant.name : restaurant.nameEn}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{restaurant.rating}</span>
                      <span>({restaurant.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{restaurant.deliveryTime} min</span>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{restaurant.distance} km</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {st.labels.minOrder}: π {restaurant.minOrder} •{" "}
                      <span className="text-pifood">
                        {restaurant.deliveryFee === 0 ? st.filters.freeDelivery : `π ${restaurant.deliveryFee}`}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Order Section */}
        <section className="mt-8">
          <h2 className="font-bold text-lg mb-4">{st.labels.orderNow}</h2>
          <div className="grid grid-cols-2 gap-3">
            {mockMenuItems.map((item) => {
              const quantity = getCartQuantity(item.id)
              return (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-24">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-foreground">
                      {language === "vi" ? item.name : item.nameEn}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {language === "vi" ? item.description : item.descEn}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-pifood">π {item.price}</span>
                      {quantity === 0 ? (
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-pifood hover:bg-pifood/90"
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(item.id)
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 rounded-full bg-transparent"
                            onClick={(e) => {
                              e.preventDefault()
                              removeFromCart(item.id)
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium text-sm w-4 text-center">{quantity}</span>
                          <Button
                            size="icon"
                            className="h-7 w-7 rounded-full bg-pifood hover:bg-pifood/90"
                            onClick={(e) => {
                              e.preventDefault()
                              addToCart(item.id)
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 md:bottom-4 left-4 right-4 z-50">
          <Button className="w-full h-14 bg-pifood hover:bg-pifood/90 gap-3 shadow-xl rounded-2xl">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold">{st.labels.viewCart}</span>
            <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
              {cartCount} {st.labels.itemsInCart}
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
