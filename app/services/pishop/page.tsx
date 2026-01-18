"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeaderWithActions } from "@/components/services/service-header-with-actions"
import { PiShopIcon } from "@/components/icons/service-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, ChevronRight, Clock, Truck, Plus, Zap, Check, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { PiExchangeRate } from "@/components/widgets/pi-exchange-rate"

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    image: "/iphone-15-pro-max-display.png",
    price: 8500,
    originalPrice: 9500,
    rating: 4.9,
    reviews: 2350,
    sold: 5600,
    category: "electronics",
    freeShipping: true,
    discount: 10,
    isFlashSale: true,
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    image: "/nike-air-max-display.png",
    price: 450,
    originalPrice: 550,
    rating: 4.7,
    reviews: 890,
    sold: 3200,
    category: "fashion",
    freeShipping: true,
    discount: 18,
    isFlashSale: false,
  },
  {
    id: 3,
    name: 'Samsung 55" 4K Smart TV',
    image: "/samsung-4k-tv.png",
    price: 3500,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 1560,
    sold: 890,
    category: "electronics",
    freeShipping: true,
    discount: 17,
    isFlashSale: true,
  },
  {
    id: 4,
    name: "Dyson V15 Vacuum",
    image: "/dyson-vacuum.png",
    price: 2800,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 720,
    sold: 450,
    category: "home",
    freeShipping: true,
    discount: 12,
    isFlashSale: false,
  },
  {
    id: 5,
    name: "La Roche-Posay Sunscreen",
    image: "/la-roche-sunscreen.png",
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    reviews: 4500,
    sold: 12000,
    category: "beauty",
    freeShipping: false,
    discount: 15,
    isFlashSale: false,
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    image: "/yoga-mat-premium.png",
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviews: 650,
    sold: 2100,
    category: "sports",
    freeShipping: true,
    discount: 20,
    isFlashSale: false,
  },
]

// Flash sale countdown (mock)
const flashSaleEndTime = {
  hours: 2,
  minutes: 45,
  seconds: 30,
}

export default function PiShopPage() {
  const { language, t } = useI18n()
  const { addItem, getItemCount } = useCart()
  const { toast } = useToast()
  const st = serviceTranslations[language].piShop
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAllProducts, setShowAllProducts] = useState(false)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [addedProducts, setAddedProducts] = useState<number[]>([])

  const categories = [
    { key: "all", label: st.categories.all },
    { key: "electronics", label: st.categories.electronics },
    { key: "fashion", label: st.categories.fashion },
    { key: "home", label: st.categories.home },
    { key: "beauty", label: st.categories.beauty },
    { key: "sports", label: st.categories.sports },
    { key: "books", label: st.categories.books },
    { key: "toys", label: st.categories.toys },
  ]

  const filters = [
    { key: "freeShipping", label: st.filters.freeShipping },
    { key: "topDeals", label: st.filters.topDeals },
    { key: "newArrivals", label: st.filters.newArrivals },
    { key: "bestSellers", label: st.filters.bestSellers },
    { key: "piExclusive", label: st.filters.piExclusive },
  ]

  const filteredProducts = mockProducts.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const flashSaleProducts = mockProducts.filter((p) => p.isFlashSale)

  const cartCount = getItemCount()

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: (typeof mockProducts)[0], e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      seller: "PiShop Official",
    })

    // Show added animation
    setAddedProducts((prev) => [...prev, product.id])
    setTimeout(() => {
      setAddedProducts((prev) => prev.filter((id) => id !== product.id))
    }, 1500)

    toast({
      title: language === "vi" ? "Đã thêm vào giỏ hàng" : "Added to cart",
      description: product.name,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <ServiceHeaderWithActions
        serviceName={t.services.piShop.name}
        icon={PiShopIcon}
        color="pishop"
        showCart
        showNotifications
        cartLink="/services/pishop/cart"
      />

      <div className="container px-4 py-4 pb-32">
        <div className="flex items-center justify-between mb-4">
          <PiExchangeRate compact />
          <Link href="/services/pishop/orders">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Package className="h-4 w-4" />
              {language === "vi" ? "Đơn hàng" : "My Orders"}
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat.key}
              variant={selectedCategory === cat.key ? "default" : "outline"}
              size="sm"
              className={cn(
                "flex-shrink-0 rounded-full",
                selectedCategory === cat.key ? "bg-[oklch(0.7_0.18_145)]" : "bg-transparent",
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
            <Badge key={filter.key} variant="secondary" className="cursor-pointer hover:bg-secondary/80 flex-shrink-0">
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Flash Sale Section */}
        <section className="mb-6">
          <Card className="p-4 bg-[oklch(0.65_0.2_25)]/10 border-[oklch(0.65_0.2_25)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[oklch(0.65_0.2_25)]" />
                <h2 className="font-bold text-lg">{st.labels.flashSale}</h2>
              </div>
              <div className="flex items-center gap-2 text-[oklch(0.65_0.2_25)]">
                <Clock className="h-4 w-4" />
                <span className="font-mono font-bold">
                  {st.labels.endsIn}: {flashSaleEndTime.hours}h {flashSaleEndTime.minutes}m {flashSaleEndTime.seconds}s
                </span>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {flashSaleProducts.map((product) => (
                <Card key={product.id} className="flex-shrink-0 w-[160px] overflow-hidden">
                  <Link href={`/services/pishop/product/${product.id}`}>
                    <div className="relative h-32">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-[oklch(0.65_0.2_25)]">-{product.discount}%</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80",
                          wishlist.includes(product.id) && "text-[oklch(0.65_0.2_25)]",
                        )}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleWishlist(product.id)
                        }}
                      >
                        <Heart className={cn("h-4 w-4", wishlist.includes(product.id) && "fill-current")} />
                      </Button>
                    </div>
                  </Link>
                  <div className="p-2">
                    <Link href={`/services/pishop/product/${product.id}`}>
                      <p className="text-sm font-medium line-clamp-2 h-10">{product.name}</p>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-[oklch(0.65_0.2_25)]">π {product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">π {product.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        {product.sold.toLocaleString()} {st.labels.sold}
                      </p>
                      <Button
                        size="icon"
                        className={cn(
                          "h-7 w-7 rounded-full transition-all",
                          addedProducts.includes(product.id)
                            ? "bg-green-500 hover:bg-green-500"
                            : "bg-[oklch(0.65_0.2_25)] hover:bg-[oklch(0.55_0.2_25)]",
                        )}
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        {addedProducts.includes(product.id) ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        {/* Featured Products */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">{t.common.featured}</h2>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowAllProducts(true)}>
              {t.common.viewAll}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {filteredProducts.slice(0, 4).map((product) => (
              <Card key={product.id} className="flex-shrink-0 w-[180px] overflow-hidden h-full">
                <Link href={`/services/pishop/product/${product.id}`}>
                  <div className="relative h-36">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-[oklch(0.65_0.2_25)]">-{product.discount}%</Badge>
                    )}
                    {product.freeShipping && (
                      <Badge className="absolute bottom-2 left-2 bg-[oklch(0.7_0.18_145)]" variant="secondary">
                        <Truck className="h-3 w-3 mr-1" />
                        {st.labels.freeShipping}
                      </Badge>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/services/pishop/product/${product.id}`}>
                    <p className="text-sm font-medium line-clamp-2 h-10">{product.name}</p>
                  </Link>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span>{product.rating}</span>
                    <span>({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-primary">π {product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through ml-1">
                          π {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-full transition-all",
                        addedProducts.includes(product.id)
                          ? "bg-green-500 hover:bg-green-500"
                          : "bg-[oklch(0.7_0.18_145)] hover:bg-[oklch(0.6_0.18_145)]",
                      )}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {addedProducts.includes(product.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* All Products Grid */}
        <section>
          <h2 className="font-bold text-lg mb-4">{st.filters.bestSellers}</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full">
                <Link href={`/services/pishop/product/${product.id}`}>
                  <div className="relative h-32">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-[oklch(0.65_0.2_25)] text-xs">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-2 right-2 h-7 w-7 rounded-full bg-white/80",
                        wishlist.includes(product.id) && "text-[oklch(0.65_0.2_25)]",
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleWishlist(product.id)
                      }}
                    >
                      <Heart className={cn("h-3 w-3", wishlist.includes(product.id) && "fill-current")} />
                    </Button>
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/services/pishop/product/${product.id}`}>
                    <p className="text-sm font-medium line-clamp-2 h-10">{product.name}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-primary text-sm">π {product.price}</span>
                      {product.freeShipping && (
                        <Truck className="inline-block h-3 w-3 ml-2 text-[oklch(0.7_0.18_145)]" />
                      )}
                    </div>
                    <Button
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-full transition-all",
                        addedProducts.includes(product.id)
                          ? "bg-green-500 hover:bg-green-500"
                          : "bg-[oklch(0.7_0.18_145)] hover:bg-[oklch(0.6_0.18_145)]",
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(product, e)
                      }}
                    >
                      {addedProducts.includes(product.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* View All Products Dialog */}
      <Dialog open={showAllProducts} onOpenChange={setShowAllProducts}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory === "all"
                ? language === "vi"
                  ? "Tất cả sản phẩm"
                  : "All Products"
                : categories.find((c) => c.key === selectedCategory)?.label}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden h-full">
                <Link href={`/services/pishop/product/${product.id}`} onClick={() => setShowAllProducts(false)}>
                  <div className="relative h-32">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-[oklch(0.65_0.2_25)] text-xs">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/services/pishop/product/${product.id}`} onClick={() => setShowAllProducts(false)}>
                    <p className="text-sm font-medium line-clamp-2 h-10">{product.name}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">π {product.price}</span>
                    <Button
                      size="icon"
                      className={cn(
                        "h-8 w-8 rounded-full transition-all",
                        addedProducts.includes(product.id)
                          ? "bg-green-500 hover:bg-green-500"
                          : "bg-[oklch(0.7_0.18_145)] hover:bg-[oklch(0.6_0.18_145)]",
                      )}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {addedProducts.includes(product.id) ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-24 left-4 right-4 z-40">
          <Link href="/services/pishop/cart">
            <Button className="w-full h-14 bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90 shadow-lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {language === "vi" ? "Xem giỏ hàng" : "View Cart"} ({cartCount})
              </span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
