"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { ChatWidget } from "@/components/chat/chat-widget"
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
  MessageCircle,
  Store,
  CheckCircle,
  FileText,
  CreditCard,
  HelpCircle,
  Package,
} from "lucide-react"
import Link from "next/link"

// Mock product data
const mockProducts: Record<string, any> = {
  "1": {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    nameVi: "iPhone 15 Pro Max 256GB",
    images: ["/iphone-15-pro-max-display.png", "/iphone-15-pro-max-back.png", "/iphone-15-pro-max-side.png"],
    price: 8500,
    originalPrice: 9500,
    rating: 4.9,
    reviews: 2350,
    sold: 5600,
    stock: 128,
    category: "electronics",
    brand: "Apple",
    freeShipping: true,
    discount: 10,
    description:
      "The iPhone 15 Pro Max features a titanium design, A17 Pro chip, 48MP main camera with 5x optical zoom, and USB-C connectivity. Experience the most powerful iPhone ever made.",
    descriptionVi:
      "iPhone 15 Pro Max với thiết kế titan, chip A17 Pro, camera chính 48MP với zoom quang học 5x và kết nối USB-C. Trải nghiệm iPhone mạnh mẽ nhất từ trước đến nay.",
    specs: [
      { key: "Display", value: "6.7-inch Super Retina XDR OLED" },
      { key: "Chip", value: "A17 Pro" },
      { key: "Storage", value: "256GB" },
      { key: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP Telephoto" },
      { key: "Battery", value: "4422 mAh" },
      { key: "OS", value: "iOS 17" },
    ],
    specsVi: [
      { key: "Màn hình", value: "6.7 inch Super Retina XDR OLED" },
      { key: "Chip", value: "A17 Pro" },
      { key: "Bộ nhớ", value: "256GB" },
      { key: "Camera", value: "48MP Chính + 12MP Góc rộng + 12MP Tele" },
      { key: "Pin", value: "4422 mAh" },
      { key: "Hệ điều hành", value: "iOS 17" },
    ],
    colors: [
      { name: "Natural Titanium", nameVi: "Titan Tự Nhiên", hex: "#9A9A9F" },
      { name: "Blue Titanium", nameVi: "Titan Xanh", hex: "#3D4754" },
      { name: "White Titanium", nameVi: "Titan Trắng", hex: "#F5F5F0" },
      { name: "Black Titanium", nameVi: "Titan Đen", hex: "#3C3C3C" },
    ],
    seller: {
      name: "Apple Vietnam Official",
      rating: 4.9,
      products: 156,
      followers: 25000,
      responseRate: 98,
      verified: true,
    },
    reviewsList: [
      {
        user: "Nguyen Van A",
        rating: 5,
        comment: "Sản phẩm tuyệt vời, giao hàng nhanh!",
        date: "2026-01-10",
        avatar: "/male-avatar.png",
      },
      {
        user: "Tran Thi B",
        rating: 5,
        comment: "Camera đẹp, pin trâu. Rất hài lòng!",
        date: "2026-01-08",
        avatar: "/female-avatar.png",
      },
      {
        user: "Le Van C",
        rating: 4,
        comment: "Máy đẹp nhưng giá hơi cao",
        date: "2026-01-05",
        avatar: "/stylized-man-avatar.png",
      },
    ],
  },
  "2": {
    id: 2,
    name: "Nike Air Max 270",
    nameVi: "Nike Air Max 270",
    images: ["/nike-air-max-display.png", "/nike-air-max-270-side.jpg", "/nike-air-max-270-back.jpg"],
    price: 450,
    originalPrice: 550,
    rating: 4.7,
    reviews: 890,
    sold: 3200,
    stock: 85,
    category: "fashion",
    brand: "Nike",
    freeShipping: true,
    discount: 18,
    description:
      "The Nike Air Max 270 delivers visible Air cushioning and a lifestyle look inspired by heritage Air Max icons.",
    descriptionVi:
      "Nike Air Max 270 mang đến đệm Air nhìn thấy được và phong cách thời trang lấy cảm hứng từ các dòng Air Max huyền thoại.",
    specs: [
      { key: "Material", value: "Mesh upper, Rubber sole" },
      { key: "Cushioning", value: "Air Max 270 unit" },
      { key: "Style", value: "Lifestyle/Running" },
      { key: "Closure", value: "Lace-up" },
    ],
    specsVi: [
      { key: "Chất liệu", value: "Thân mesh, đế cao su" },
      { key: "Đệm", value: "Đơn vị Air Max 270" },
      { key: "Phong cách", value: "Lifestyle/Chạy bộ" },
      { key: "Kiểu buộc", value: "Dây buộc" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Black/White", nameVi: "Đen/Trắng", hex: "#000000" },
      { name: "White/Red", nameVi: "Trắng/Đỏ", hex: "#FFFFFF" },
      { name: "Blue/White", nameVi: "Xanh/Trắng", hex: "#1E90FF" },
    ],
    seller: {
      name: "Nike Vietnam Store",
      rating: 4.8,
      products: 320,
      followers: 45000,
      responseRate: 95,
      verified: true,
    },
    reviewsList: [
      {
        user: "Pham Van D",
        rating: 5,
        comment: "Giày êm, form đẹp!",
        date: "2026-01-12",
        avatar: "/young-man-avatar.png",
      },
      {
        user: "Hoang Thi E",
        rating: 4,
        comment: "Đẹp nhưng size hơi chật",
        date: "2026-01-09",
        avatar: "/avatar-woman.png",
      },
    ],
  },
  "3": {
    id: 3,
    name: 'Samsung 55" 4K Smart TV',
    nameVi: 'Samsung 55" 4K Smart TV',
    images: ["/samsung-4k-tv.png"],
    price: 3500,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 1560,
    sold: 890,
    stock: 45,
    category: "electronics",
    brand: "Samsung",
    freeShipping: true,
    discount: 17,
    description:
      "Experience stunning 4K resolution with Samsung's Crystal UHD technology. Smart TV features built-in streaming apps.",
    descriptionVi:
      "Trải nghiệm độ phân giải 4K tuyệt đẹp với công nghệ Crystal UHD của Samsung. Smart TV tích hợp sẵn các ứng dụng streaming.",
    specs: [
      { key: "Display", value: "55-inch 4K UHD" },
      { key: "Resolution", value: "3840 x 2160" },
      { key: "HDR", value: "HDR10+" },
      { key: "Smart TV", value: "Tizen OS" },
    ],
    specsVi: [
      { key: "Màn hình", value: "55 inch 4K UHD" },
      { key: "Độ phân giải", value: "3840 x 2160" },
      { key: "HDR", value: "HDR10+" },
      { key: "Hệ điều hành", value: "Tizen OS" },
    ],
    colors: [{ name: "Black", nameVi: "Đen", hex: "#000000" }],
    seller: {
      name: "Samsung Vietnam Official",
      rating: 4.9,
      products: 280,
      followers: 38000,
      responseRate: 97,
      verified: true,
    },
    reviewsList: [
      {
        user: "Tran Van F",
        rating: 5,
        comment: "Hình ảnh sắc nét, âm thanh hay!",
        date: "2026-01-11",
        avatar: "/male-avatar.png",
      },
    ],
  },
  "4": {
    id: 4,
    name: "Dyson V15 Vacuum",
    nameVi: "Máy hút bụi Dyson V15",
    images: ["/dyson-vacuum.png"],
    price: 2800,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 720,
    sold: 450,
    stock: 32,
    category: "home",
    brand: "Dyson",
    freeShipping: true,
    discount: 12,
    description:
      "The Dyson V15 Detect reveals microscopic dust with a laser and shows proof of a deep clean on the LCD screen.",
    descriptionVi:
      "Dyson V15 Detect phát hiện bụi siêu nhỏ bằng laser và hiển thị bằng chứng làm sạch sâu trên màn hình LCD.",
    specs: [
      { key: "Power", value: "230 AW" },
      { key: "Runtime", value: "Up to 60 minutes" },
      { key: "Weight", value: "3.1 kg" },
      { key: "Dustbin", value: "0.76L" },
    ],
    specsVi: [
      { key: "Công suất", value: "230 AW" },
      { key: "Thời gian chạy", value: "Lên đến 60 phút" },
      { key: "Trọng lượng", value: "3.1 kg" },
      { key: "Thùng chứa", value: "0.76L" },
    ],
    colors: [{ name: "Yellow/Nickel", nameVi: "Vàng/Nickel", hex: "#FFD700" }],
    seller: {
      name: "Dyson Vietnam",
      rating: 4.8,
      products: 45,
      followers: 12000,
      responseRate: 96,
      verified: true,
    },
    reviewsList: [],
  },
  "5": {
    id: 5,
    name: "La Roche-Posay Sunscreen",
    nameVi: "Kem chống nắng La Roche-Posay",
    images: ["/la-roche-sunscreen.png"],
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    reviews: 4500,
    sold: 12000,
    stock: 500,
    category: "beauty",
    brand: "La Roche-Posay",
    freeShipping: false,
    discount: 15,
    description:
      "Anthelios UVMune 400 provides superior protection against UVA and UVB rays with a lightweight, non-greasy formula.",
    descriptionVi: "Anthelios UVMune 400 bảo vệ vượt trội khỏi tia UVA và UVB với công thức nhẹ, không nhờn.",
    specs: [
      { key: "SPF", value: "50+" },
      { key: "Volume", value: "50ml" },
      { key: "Skin Type", value: "All skin types" },
    ],
    specsVi: [
      { key: "SPF", value: "50+" },
      { key: "Dung tích", value: "50ml" },
      { key: "Loại da", value: "Mọi loại da" },
    ],
    colors: [],
    seller: {
      name: "La Roche-Posay Official",
      rating: 4.9,
      products: 120,
      followers: 28000,
      responseRate: 94,
      verified: true,
    },
    reviewsList: [],
  },
  "6": {
    id: 6,
    name: "Yoga Mat Premium",
    nameVi: "Thảm Yoga Cao Cấp",
    images: ["/yoga-mat-premium.png"],
    price: 120,
    originalPrice: 150,
    rating: 4.6,
    reviews: 650,
    sold: 2100,
    stock: 200,
    category: "sports",
    brand: "Manduka",
    freeShipping: true,
    discount: 20,
    description: "Premium yoga mat with superior grip, cushioning, and durability. Perfect for all yoga styles.",
    descriptionVi: "Thảm yoga cao cấp với độ bám tốt, đệm êm và độ bền cao. Phù hợp cho mọi phong cách yoga.",
    specs: [
      { key: "Material", value: "Natural rubber" },
      { key: "Thickness", value: "5mm" },
      { key: "Size", value: "183cm x 61cm" },
    ],
    specsVi: [
      { key: "Chất liệu", value: "Cao su tự nhiên" },
      { key: "Độ dày", value: "5mm" },
      { key: "Kích thước", value: "183cm x 61cm" },
    ],
    colors: [
      { name: "Purple", nameVi: "Tím", hex: "#800080" },
      { name: "Blue", nameVi: "Xanh", hex: "#0000FF" },
      { name: "Pink", nameVi: "Hồng", hex: "#FFC0CB" },
    ],
    seller: {
      name: "Yoga Store VN",
      rating: 4.7,
      products: 85,
      followers: 8500,
      responseRate: 92,
      verified: true,
    },
    reviewsList: [],
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useI18n()
  const { addItem, getItemCount } = useCart()
  const { toast } = useToast()
  const productId = params.id as string
  const product = mockProducts[productId] || mockProducts["1"] // Fallback to product "1" if not found

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  // Set default selected size if available
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes ? product.sizes[3] : null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const [showChat, setShowChat] = useState(false)
  const [showShop, setShowShop] = useState(false)
  const [showAddedToCart, setShowAddedToCart] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)

  const cartItemCount = getItemCount() // Use getItemCount directly

  const t = {
    addToCart: language === "vi" ? "Thêm vào giỏ" : "Add to Cart",
    buyNow: language === "vi" ? "Mua ngay" : "Buy Now",
    description: language === "vi" ? "Mô tả" : "Description",
    specifications: language === "vi" ? "Thông số" : "Specifications",
    reviews: language === "vi" ? "Đánh giá" : "Reviews",
    seller: language === "vi" ? "Người bán" : "Seller",
    sold: language === "vi" ? "đã bán" : "sold",
    inStock: language === "vi" ? "Còn hàng" : "In Stock",
    freeShipping: language === "vi" ? "Miễn phí vận chuyển" : "Free Shipping",
    guarantee: language === "vi" ? "Bảo hành chính hãng" : "Official Warranty",
    returns: language === "vi" ? "Đổi trả 30 ngày" : "30-day Returns",
    color: language === "vi" ? "Màu sắc" : "Color",
    size: language === "vi" ? "Kích cỡ" : "Size",
    quantity: language === "vi" ? "Số lượng" : "Quantity",
    viewShop: language === "vi" ? "Xem Shop" : "View Shop",
    chatNow: language === "vi" ? "Chat ngay" : "Chat Now",
    followers: language === "vi" ? "người theo dõi" : "followers",
    products: language === "vi" ? "sản phẩm" : "products",
    responseRate: language === "vi" ? "Tỷ lệ phản hồi" : "Response Rate",
    verified: language === "vi" ? "Đã xác minh" : "Verified",
    relatedProducts: language === "vi" ? "Sản phẩm liên quan" : "Related Products",
    addedToCart: language === "vi" ? "Đã thêm vào giỏ hàng" : "Added to cart",
    continueShopping: language === "vi" ? "Tiếp tục mua" : "Continue Shopping",
    goToCart: language === "vi" ? "Xem giỏ hàng" : "Go to Cart",
    chatWith: language === "vi" ? "Chat với" : "Chat with",
    typeMessage: language === "vi" ? "Nhập tin nhắn..." : "Type a message...",
    shopInfo: language === "vi" ? "Thông tin Shop" : "Shop Info",
    allProducts: language === "vi" ? "Tất cả sản phẩm" : "All Products",
    follow: language === "vi" ? "Theo dõi" : "Follow",
    following: language === "vi" ? "Đang theo dõi" : "Following",
    policies: language === "vi" ? "Chính sách mua hàng" : "Purchase Policies",
    shippingPolicy: language === "vi" ? "Chính sách vận chuyển" : "Shipping Policy",
    returnPolicy: language === "vi" ? "Chính sách đổi trả" : "Return Policy",
    warrantyPolicy: language === "vi" ? "Chính sách bảo hành" : "Warranty Policy",
    paymentPolicy: language === "vi" ? "Phương thức thanh toán" : "Payment Methods",
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: language === "vi" ? product.nameVi : product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity: quantity,
      color: product.colors?.[selectedColor]?.name,
      size: selectedSize || undefined,
      seller: product.seller?.name,
    })
    setShowAddedToCart(true) // Use showAddedToCart
    toast({
      title: t.addedToCart,
      description: `${quantity}x ${language === "vi" ? product.nameVi : product.name}`,
    })
  }

  const handleBuyNow = () => {
    // Navigate to checkout with product info
    router.push(
      `/services/pishop/checkout?productId=${product.id}&quantity=${quantity}&color=${selectedColor}${selectedSize ? `&size=${selectedSize}` : ""}`,
    )
  }

  const handleSendMessage = () => {
    // Removed message state management, assuming ChatWidget handles it internally
    // This function would now likely trigger a callback to the parent or be handled within ChatWidget
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === "vi" ? product.nameVi : product.name,
          text: product.description,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: language === "vi" ? "Đã sao chép link" : "Link copied",
        description: language === "vi" ? "Đã sao chép link sản phẩm vào clipboard" : "Product link copied to clipboard",
      })
    }
  }

  const policyContent = {
    shipping:
      language === "vi"
        ? [
            "Miễn phí vận chuyển cho đơn hàng từ 500 Pi",
            "Giao hàng tiêu chuẩn: 3-5 ngày làm việc",
            "Giao hàng nhanh: 1-2 ngày làm việc (phí 20 Pi)",
            "Giao hàng hỏa tốc: Trong ngày (phí 50 Pi)",
            "Theo dõi đơn hàng real-time qua ứng dụng",
          ]
        : [
            "Free shipping for orders over 500 Pi",
            "Standard delivery: 3-5 business days",
            "Express delivery: 1-2 business days (20 Pi fee)",
            "Same-day delivery: Within the day (50 Pi fee)",
            "Real-time order tracking via app",
          ],
    returns:
      language === "vi"
        ? [
            "Đổi trả miễn phí trong 30 ngày",
            "Sản phẩm phải còn nguyên tem, nhãn",
            "Hoàn tiền trong 3-5 ngày làm việc",
            "Hỗ trợ đổi size, màu sắc",
            "Liên hệ hotline để được hỗ trợ",
          ]
        : [
            "Free returns within 30 days",
            "Products must have original tags",
            "Refund within 3-5 business days",
            "Size and color exchange supported",
            "Contact hotline for assistance",
          ],
    warranty:
      language === "vi"
        ? [
            "Bảo hành chính hãng 12-24 tháng",
            "Bảo hành tại trung tâm ủy quyền",
            "Hỗ trợ kỹ thuật 24/7",
            "Đổi mới nếu lỗi từ nhà sản xuất",
            "Không bảo hành hư hỏng do người dùng",
          ]
        : [
            "Official warranty 12-24 months",
            "Warranty at authorized centers",
            "24/7 technical support",
            "Replacement for manufacturer defects",
            "No warranty for user-caused damage",
          ],
    payment:
      language === "vi"
        ? [
            "Thanh toán bằng Pi Wallet",
            "Thanh toán khi nhận hàng (COD)",
            "Thẻ tín dụng/ghi nợ",
            "Chuyển khoản ngân hàng",
            "Trả góp 0% lãi suất",
          ]
        : [
            "Pay with Pi Wallet",
            "Cash on Delivery (COD)",
            "Credit/Debit cards",
            "Bank transfer",
            "0% interest installments",
          ],
  }

  // Product not found handling is now done earlier
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {language === "vi" ? "Không tìm thấy sản phẩm" : "Product not found"}
          </p>
          <Button onClick={() => router.back()}>{language === "vi" ? "Quay lại" : "Go Back"}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-36">
      {" "}
      {/* Reduced bottom padding */}
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b">
        {" "}
        {/* Added backdrop-blur and z-index */}
        <div className="flex items-center justify-between p-4">
          {" "}
          {/* Simplified header structure */}
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Link href="/services/pishop/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                    {getItemCount() > 99 ? "99+" : getItemCount()}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/services/pishop/orders">
              <Button variant="ghost" size="icon">
                <Package className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Product Images */}
      <div className="relative">
        <div className="aspect-square bg-muted">
          <img
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={language === "vi" ? product.nameVi : product.name}
            className="w-full h-full object-contain"
          />
        </div>
        {product.discount > 0 && <Badge className="absolute top-4 left-4 bg-red-500">-{product.discount}%</Badge>}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {product.images.map((_: string, index: number) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                selectedImage === index ? "bg-primary" : "bg-white/60"
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
      {/* Thumbnail Gallery */}
      <div className="flex gap-2 p-4 overflow-x-auto">
        {product.images.map((img: string, index: number) => (
          <button
            key={index}
            className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden ${
              selectedImage === index ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={img || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      {/* Product Info */}
      <div className="px-4 space-y-4">
        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary">π {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-lg text-muted-foreground line-through">
              π {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Name */}
        <h1 className="text-lg font-semibold">{language === "vi" ? product.nameVi : product.name}</h1>

        {/* Rating & Sales */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews.toLocaleString()})</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            {product.sold.toLocaleString()} {t.sold}
          </span>
        </div>

        {/* Badges - Added clickable policy badges */}
        <div className="flex flex-wrap gap-2">
          {product.freeShipping && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => setShowPolicy(true)} // Use showPolicy
            >
              <Truck className="h-3 w-3" />
              {t.freeShipping}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => setShowPolicy(true)} // Use showPolicy
          >
            <Shield className="h-3 w-3" />
            {t.guarantee}
          </Badge>
          <Badge
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => setShowPolicy(true)} // Use showPolicy
          >
            <RotateCcw className="h-3 w-3" />
            {t.returns}
          </Badge>
        </div>

        <Button
          variant="outline"
          className="w-full justify-between bg-transparent"
          onClick={() => setShowPolicy(true)} // Use showPolicy
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span>{t.policies}</span>
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium">
              {t.color}: {language === "vi" ? product.colors[selectedColor].nameVi : product.colors[selectedColor].name}
            </p>
            <div className="flex gap-2">
              {product.colors.map((color: any, index: number) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === index ? "border-primary" : "border-muted"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(index)}
                >
                  {selectedColor === index && <Check className="h-5 w-5 mx-auto text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && (
          <div className="space-y-2">
            <p className="font-medium">{t.size}</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size: string) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSize(size)}
                  className="min-w-[48px]"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-2">
          <p className="font-medium">{t.quantity}</p>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>
              <Plus className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {product.stock} {t.inStock}
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{product.seller.name}</span>
                {product.seller.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Check className="h-3 w-3 mr-1" />
                    {t.verified}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>
                  {product.seller.products} {t.products}
                </span>
                <span>|</span>
                <span>
                  {product.seller.followers.toLocaleString()} {t.followers}
                </span>
                <span>|</span>
                <span>
                  {t.responseRate}: {product.seller.responseRate}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 bg-transparent"
              onClick={() => setShowChat(true)} // Use showChat
            >
              <MessageCircle className="h-4 w-4" />
              {t.chatNow}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1 bg-transparent"
              onClick={() => setShowShop(true)} // Use showShop
            >
              <Store className="h-4 w-4" />
              {t.viewShop}
            </Button>
          </div>
        </Card>

        {/* Tabs: Description, Specs, Reviews */}
        <Tabs defaultValue="description" className="mt-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="description">{t.description}</TabsTrigger>
            <TabsTrigger value="specs">{t.specifications}</TabsTrigger>
            <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <p className="text-muted-foreground leading-relaxed">
              {language === "vi" ? product.descriptionVi : product.description}
            </p>
          </TabsContent>

          <TabsContent value="specs" className="mt-4">
            <div className="space-y-2">
              {(language === "vi" ? product.specsVi : product.specs).map((spec: any, index: number) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <span className="text-muted-foreground">{spec.key}</span>
                  <span className="font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              {/* Rating Summary */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">{product.rating}</span>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {product.reviews.toLocaleString()} {t.reviews.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Review List */}
              {product.reviewsList &&
                product.reviewsList.map((review: any, index: number) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}

              <Button variant="outline" className="w-full bg-transparent">
                {language === "vi" ? "Xem tất cả đánh giá" : "View All Reviews"}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3 z-40 shadow-lg">
        {" "}
        {/* Adjusted z-index and positioning */}
        <Button
          variant="outline"
          size="icon"
          className="flex-shrink-0 bg-transparent"
          onClick={() => setShowChat(true)} // Use showChat
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2 h-12 text-base font-medium bg-transparent"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          {t.addToCart}
        </Button>
        <Button
          className="flex-1 h-12 text-base font-medium bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-500/90"
          onClick={handleBuyNow}
        >
          {t.buyNow}
        </Button>
      </div>
      {/* Chat Dialog - Replaced with ChatWidget */}
      <ChatWidget
        isOpen={showChat} // Use showChat
        onClose={() => setShowChat(false)} // Use showChat
        seller={{
          name: product.seller.name,
          avatar: "/shop-avatar.jpg", // Placeholder avatar
          online: true, // Assuming seller is online
        }}
        productName={language === "vi" ? product.nameVi || product.name : product.name}
        productImage={product.images[0]}
      />
      {/* Shop Dialog */}
      <Dialog open={showShop} onOpenChange={setShowShop}>
        {" "}
        {/* Use showShop */}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.shopInfo}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Shop Header */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{product.seller.name}</span>
                  {product.seller.verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      {t.verified}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.seller.rating}</span>
                </div>
              </div>
            </div>

            {/* Shop Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{product.seller.products}</p>
                <p className="text-xs text-muted-foreground">{t.products}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{(product.seller.followers / 1000).toFixed(1)}K</p>
                <p className="text-xs text-muted-foreground">{t.followers}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">{product.seller.responseRate}%</p>
                <p className="text-xs text-muted-foreground">{t.responseRate}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Heart className="h-4 w-4" />
                {t.follow}
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  setShowShop(false) // Use showShop
                  router.push("/services/pishop?shop=" + encodeURIComponent(product.seller.name))
                }}
              >
                <Store className="h-4 w-4" />
                {t.allProducts}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Added to Cart Dialog */}
      <Dialog open={showAddedToCart} onOpenChange={setShowAddedToCart}>
        {" "}
        {/* Use showAddedToCart */}
        <DialogContent className="max-w-sm">
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.addedToCart}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {quantity}x {language === "vi" ? product.nameVi : product.name}
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowAddedToCart(false)}>
                {" "}
                {/* Use showAddedToCart */}
                {t.continueShopping}
              </Button>
              <Button className="flex-1" onClick={() => router.push("/services/pishop/cart")}>
                {t.goToCart}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showPolicy} onOpenChange={setShowPolicy}>
        {" "}
        {/* Use showPolicy */}
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t.policies}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Shipping Policy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold">{t.shippingPolicy}</h3>
              </div>
              <ul className="space-y-2 pl-10">
                {policyContent.shipping.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Return Policy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <RotateCcw className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="font-semibold">{t.returnPolicy}</h3>
              </div>
              <ul className="space-y-2 pl-10">
                {policyContent.returns.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Warranty Policy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-semibold">{t.warrantyPolicy}</h3>
              </div>
              <ul className="space-y-2 pl-10">
                {policyContent.warranty.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="font-semibold">{t.paymentPolicy}</h3>
              </div>
              <ul className="space-y-2 pl-10">
                {policyContent.payment.map((item, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">{language === "vi" ? "Cần hỗ trợ?" : "Need help?"}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === "vi" ? "Liên hệ: support@pilife.vn" : "Contact: support@pilife.vn"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
