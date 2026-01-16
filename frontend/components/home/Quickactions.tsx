// components/home/Quickactions.tsx

"use client"

interface QuickActionCard {
  id: string
  title: string
  description: string
  icon: string
  gradient: string
}

const quickActions: QuickActionCard[] = [
  {
    id: "presentation",
    title: "New Presentation",
    description: "Generate professional slides from any topic or PDF document.",
    icon: "present_to_all",
    gradient: "from-emerald-100 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-900/40",
  },
  {
    id: "worksheet",
    title: "New Worksheet",
    description: "Create customized practice problems and student layouts instantly.",
    icon: "description",
    gradient: "from-emerald-50 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-900/40",
  },
  {
    id: "quiz",
    title: "New Quiz",
    description: "Build auto-grading assessments and knowledge checks with AI.",
    icon: "quiz",
    gradient: "from-emerald-100 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-900/40",
  },
]

export default function QuickActions() {
  return (
    <section className="mb-10">
      <h3 className="text-[#0d101b] dark:text-white text-lg font-bold mb-6">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className="group bg-white dark:bg-[#0d1b15] p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30 hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md text-left"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.gradient} text-primary dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">
                {action.icon}
              </span>
            </div>
            
            <h4 className="text-base font-bold text-[#0d101b] dark:text-white mb-1">
              {action.title}
            </h4>
            
            <p className="text-sm text-sage-600 dark:text-emerald-200/60 mb-4">
              {action.description}
            </p>
            
            <div className="flex items-center text-primary text-sm font-semibold">
              Start Creating
              <span className="material-symbols-outlined text-lg ml-1">
                arrow_forward
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}