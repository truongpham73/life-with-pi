import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container flex items-center h-14 px-4">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-6 w-32 ml-3" />
        </div>
      </div>
      <div className="px-4 py-6 space-y-4">
        <Skeleton className="h-8 w-40" />
        <Card className="p-4">
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      </div>
    </div>
  )
}
