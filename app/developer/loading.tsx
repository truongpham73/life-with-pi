export default function DeveloperLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-lg" />
          ))}
        </div>
        <div className="h-12 bg-muted rounded-lg mb-6" />
        <div className="space-y-4">
          <div className="h-48 bg-muted rounded-lg" />
          <div className="h-48 bg-muted rounded-lg" />
        </div>
      </div>
    </div>
  )
}
