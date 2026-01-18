import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-24 mb-6" />
          <Skeleton className="h-6 w-20 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-24 w-full mb-8" />
        <Skeleton className="h-48 w-full mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}
