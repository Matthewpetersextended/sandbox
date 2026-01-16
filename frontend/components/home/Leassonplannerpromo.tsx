// components/home/Leassonplannerpromo.tsx

"use client"

import { Button } from "@/components/ui/button"

export default function LessonPlannerPromo() {
  return (
    <section className="mt-12 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl p-8 flex items-center justify-between">
      <div className="max-w-xl">
        <h3 className="text-primary text-xl font-bold mb-2">
          Need a specialized lesson plan?
        </h3>
        
        <p className="text-sage-600 dark:text-emerald-200/60 text-sm mb-4">
          Try our new Lesson Planner tool. Just upload your curriculum and let AI draft a 4-week module with activities, goals, and resources.
        </p>
        
        <Button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
          Explore Lesson Planner
        </Button>
      </div>
      
      <div className="hidden md:block">
        <span className="material-symbols-outlined text-8xl text-emerald-200 dark:text-emerald-900/50">
          auto_stories
        </span>
      </div>
    </section>
  )
}