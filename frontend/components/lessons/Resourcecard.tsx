// frontend/components/lessons/Resourcecard.tsx

"use client"

interface ResourceCardProps {
  title: string
  description: string
  icon: string
  badge?: string
  onClick?: () => void
}

export default function ResourceCard({ 
  title, 
  description, 
  icon,
  badge,
  onClick 
}: ResourceCardProps) {
  return (
    <div 
      className="group bg-white dark:bg-[#0d1b15] p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 hover:border-primary transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <button className="text-sage-600 dark:text-emerald-300 hover:text-primary">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      
      <h4 className="text-sm font-bold mb-1 text-[#0d101b] dark:text-white">
        {title}
      </h4>
      
      <p className="text-xs text-sage-600 dark:text-emerald-200/60">
        {description}
      </p>
      
      {badge && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[10px] bg-background-light dark:bg-emerald-900/20 text-sage-600 dark:text-emerald-300 px-2 py-0.5 rounded">
            {badge}
          </span>
        </div>
      )}
    </div>
  )
}