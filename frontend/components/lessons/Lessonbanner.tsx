// frontend/components/lessons/Lessonbanner.tsx

"use client"

interface LessonBannerProps {
  title: string
  category: string
  lastUpdated: string
  imageUrl?: string
}

export default function LessonBanner({ 
  title, 
  category, 
  lastUpdated,
  imageUrl = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=400&fit=crop"
}: LessonBannerProps) {
  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-8">
      <img 
        alt={`${title} banner`}
        className="w-full h-full object-cover" 
        src={imageUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent flex flex-col justify-end p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-primary/20 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
          <span className="text-white/60 text-xs font-medium">
            Last updated: {lastUpdated}
          </span>
        </div>
        <h1 className="text-white text-3xl font-black">{title}</h1>
      </div>
    </div>
  )
}