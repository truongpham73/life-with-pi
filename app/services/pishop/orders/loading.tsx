export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded-lg w-1/3" />
        <div className="h-10 bg-muted rounded-lg" />
        <div className="h-12 bg-muted rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  )
}
