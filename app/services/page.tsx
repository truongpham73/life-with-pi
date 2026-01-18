"use client"

import { useI18n } from "@/lib/i18n/context"
import { ServiceCard } from "@/components/home/service-card"
import {
  PiFoodIcon,
  PiMoveIcon,
  PiShopIcon,
  PiTravelIcon,
  PiHealthIcon,
  PiLearnIcon,
  PiWorkIcon,
  PiPlayIcon,
  PiPayIcon,
} from "@/components/icons/service-icons"

export default function ServicesPage() {
  const { t, language } = useI18n()

  const services = [
    {
      key: "piFood",
      href: "/services/pifood",
      icon: <PiFoodIcon className="w-full h-full" />,
      colorClass: "text-pifood",
      bgClass: "bg-pifood/10",
    },
    {
      key: "piMove",
      href: "/services/pimove",
      icon: <PiMoveIcon className="w-full h-full" />,
      colorClass: "text-pimove",
      bgClass: "bg-pimove/10",
    },
    {
      key: "piShop",
      href: "/services/pishop",
      icon: <PiShopIcon className="w-full h-full" />,
      colorClass: "text-pishop",
      bgClass: "bg-pishop/10",
    },
    {
      key: "piTravel",
      href: "/services/pitravel",
      icon: <PiTravelIcon className="w-full h-full" />,
      colorClass: "text-pitravel",
      bgClass: "bg-pitravel/10",
    },
    {
      key: "piHealth",
      href: "/services/pihealth",
      icon: <PiHealthIcon className="w-full h-full" />,
      colorClass: "text-pihealth",
      bgClass: "bg-pihealth/10",
    },
    {
      key: "piLearn",
      href: "/services/pilearn",
      icon: <PiLearnIcon className="w-full h-full" />,
      colorClass: "text-pilearn",
      bgClass: "bg-pilearn/10",
    },
    {
      key: "piWork",
      href: "/services/piwork",
      icon: <PiWorkIcon className="w-full h-full" />,
      colorClass: "text-piwork",
      bgClass: "bg-piwork/10",
    },
    {
      key: "piPlay",
      href: "/services/piplay",
      icon: <PiPlayIcon className="w-full h-full" />,
      colorClass: "text-piplay",
      bgClass: "bg-piplay/10",
    },
    {
      key: "piPay",
      href: "/services/pipay",
      icon: <PiPayIcon className="w-full h-full" />,
      colorClass: "text-pipay",
      bgClass: "bg-pipay/10",
    },
  ]

  return (
    <div className="container px-4 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance text-foreground">{t.nav.services}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          {language === "vi"
            ? "Khám phá 9 dịch vụ thiết yếu trong hệ sinh thái Pi Network. Tất cả đều hỗ trợ thanh toán bằng Pi."
            : "Explore 9 essential services in the Pi Network ecosystem. All support Pi payments."}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {services.map((service) => {
          const serviceTranslation = t.services[service.key as keyof typeof t.services]
          return (
            <ServiceCard
              key={service.key}
              href={service.href}
              icon={service.icon}
              name={serviceTranslation.name}
              tagline={serviceTranslation.tagline}
              colorClass={service.colorClass}
              bgClass={service.bgClass}
            />
          )
        })}
      </div>
    </div>
  )
}
