// frontend/components/lessons/Addresourcecard.tsx

"use client"

interface AddResourceCardProps {
  title: string
  subtitle: string
  onClick?: () => void
}

export default function AddResourceCard({ 
  title, 
  subtitle,
  onClick 
}: AddResourceCardProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-100 dark:border-emerald-900/30 rounded-xl p-6 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <span className="material-symbols-outlined text-primary mb-2">
        add_circle
      </span>
      <p className="text-xs font-bold text-[#0d101b] dark:text-white">
        {title}
      </p>
      <p className="text-[10px] text-sage-600 dark:text-emerald-200/60">
        {subtitle}
      </p>
    </div>
  )
}