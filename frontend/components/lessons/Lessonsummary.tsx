// frontend/components/lessons/Lessonsummary.tsx

"use client"

interface LessonSummaryProps {
  summary: string
  standards: string[]
}

export default function LessonSummary({ summary, standards }: LessonSummaryProps) {
  return (
    <div className="mt-12 p-6 bg-white dark:bg-[#0d1b15] rounded-xl border border-emerald-100 dark:border-emerald-900/30">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">
          sticky_note_2
        </span>
        <h3 className="text-sm font-bold text-[#0d101b] dark:text-white">
          Lesson Summary & Standards
        </h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-sage-600 dark:text-emerald-200/60 leading-relaxed">
          {summary}
        </p>
        
        {standards.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {standards.map((standard, index) => (
              <span 
                key={index}
                className="bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs font-medium border border-primary/20 text-sage-600 dark:text-emerald-300"
              >
                {standard}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}