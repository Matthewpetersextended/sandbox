// frontend/app/(dashboard)/lessons/create/page.tsx

import LessonCreationForm from "@/components/lessons/create/LessonCreationForm"

export default function CreateLessonPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-slate-950">
      {/* Main Content */}
      <main className="relative flex flex-col items-center justify-center py-12 px-4 min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10"></div>
        
        {/* Form Container */}
        <div className="w-full max-w-[800px] flex flex-col gap-2 relative z-10">
          {/* Page Title */}
          <div className="text-center mb-6">
            <h1 className="text-[#064e3b] dark:text-emerald-400 tracking-tight text-4xl font-extrabold leading-tight pb-2">
              Lesson Creation Hub
            </h1>
            <p className="text-emerald-800/70 dark:text-emerald-200/60 text-lg">
             
            </p>
          </div>
          
          {/* Form */}
          <LessonCreationForm />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="text-center pb-8 text-emerald-800/40 dark:text-emerald-500/30 text-xs font-medium">
        <p>© 2024 Sandbox Creation Hub. Empowering educators with sustainable technology.</p>
      </footer>
    </div>
  )
}