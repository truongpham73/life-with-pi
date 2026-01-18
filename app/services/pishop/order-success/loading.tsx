import { Skeleton } from "@/components/ui/skeleton"

export default function OrderSuccessLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <Skeleton className="w-20 h-20 rounded-full mb-6" />
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-4 w-64 mb-6" />
      <Skeleton className="w-full max-w-sm h-40 mb-6" />
    </div>
  )
}
