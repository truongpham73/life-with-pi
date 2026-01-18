import { Skeleton } from "@/components/ui/skeleton"

export default function PiPlayLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-gradient-to-br from-piplay/20 to-piplay/5 pt-12 pb-16 px-4">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="px-4 -mt-6">
        <Skeleton className="h-12 w-full rounded-xl mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
