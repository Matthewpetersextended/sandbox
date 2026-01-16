// frontend/components/lessons/create/Formsection.tsx

"use client"

interface FormSectionProps {
  number: string
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function FormSection({ 
  number, 
  title, 
  subtitle, 
  children 
}: FormSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-emerald-900 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.1em]">
          {number}. {title}
        </h3>
        {subtitle && (
          <span className="text-[10px] text-emerald-600/60 dark:text-emerald-400/50">
            {subtitle}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}