"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { serviceTranslations } from "@/lib/i18n/service-translations"
import { ServiceHeader } from "@/components/services/service-header"
import { PiPlayIcon } from "@/components/icons/service-icons"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BookingTab } from "@/components/piplay/booking-tab"
import { MoviesTab } from "@/components/piplay/movies-tab"
import { MusicTab } from "@/components/piplay/music-tab"
import { GamesTab } from "@/components/piplay/games-tab"
import { EventsTab } from "@/components/piplay/events-tab"
import { Film, Music, Gamepad2, Ticket, CalendarDays } from "lucide-react"

export default function PiPlayPage() {
  const { language } = useI18n()
  const st = serviceTranslations[language].piPlay
  const [activeTab, setActiveTab] = useState("booking")

  const t = {
    booking: language === "vi" ? "Đặt vé" : "Booking",
    movies: language === "vi" ? "Phim" : "Movies",
    music: language === "vi" ? "Nhạc" : "Music",
    games: language === "vi" ? "Game" : "Games",
    events: language === "vi" ? "Sự kiện" : "Events",
    viewAll: language === "vi" ? "Xem tất cả" : "View all",
    popular: language === "vi" ? "Phổ biến" : "Popular",
    rating: language === "vi" ? "Đánh giá" : "Rating",
    book: language === "vi" ? "Đặt vé" : "Book Now",
    price: language === "vi" ? "Giá" : "Price",
    select: language === "vi" ? "Chọn" : "Select",
    confirm: language === "vi" ? "Xác nhận" : "Confirm",
    success: language === "vi" ? "Thành công" : "Success",
    close: language === "vi" ? "Đóng" : "Close",
    date: language === "vi" ? "Ngày" : "Date",
    time: language === "vi" ? "Giờ" : "Time",
    quantity: language === "vi" ? "Số lượng" : "Quantity",
    total: language === "vi" ? "Tổng cộng" : "Total",
    payment: language === "vi" ? "Thanh toán" : "Payment",
    piWallet: language === "vi" ? "Ví Pi" : "Pi Wallet",
    download: language === "vi" ? "Tải xuống" : "Download",
    play: language === "vi" ? "Chơi ngay" : "Play Now",
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <ServiceHeader title={st.title} subtitle={st.subtitle} icon={PiPlayIcon} color="piplay" />

      <div className="px-4 -mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5 h-12 bg-card shadow-sm rounded-xl mb-4">
            <TabsTrigger value="booking" className="flex flex-col gap-0.5 h-full data-[state=active]:bg-primary/10">
              <Ticket className="w-4 h-4" />
              <span className="text-[10px]">{t.booking}</span>
            </TabsTrigger>
            <TabsTrigger value="movies" className="flex flex-col gap-0.5 h-full data-[state=active]:bg-primary/10">
              <Film className="w-4 h-4" />
              <span className="text-[10px]">{t.movies}</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="flex flex-col gap-0.5 h-full data-[state=active]:bg-primary/10">
              <Music className="w-4 h-4" />
              <span className="text-[10px]">{t.music}</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex flex-col gap-0.5 h-full data-[state=active]:bg-primary/10">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-[10px]">{t.games}</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex flex-col gap-0.5 h-full data-[state=active]:bg-primary/10">
              <CalendarDays className="w-4 h-4" />
              <span className="text-[10px]">{t.events}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="mt-0">
            <BookingTab language={language} t={t} />
          </TabsContent>

          <TabsContent value="movies" className="mt-0">
            <MoviesTab language={language} t={t} />
          </TabsContent>

          <TabsContent value="music" className="mt-0">
            <MusicTab language={language} t={t} />
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            <GamesTab language={language} t={t} />
          </TabsContent>

          <TabsContent value="events" className="mt-0">
            <EventsTab language={language} t={t} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
