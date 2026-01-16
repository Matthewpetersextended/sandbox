// frontend/components/lessons/create/CreateLessonHeader.tsx

"use client"

export default function CreateLessonHeader() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-emerald-100 dark:border-emerald-900/30 px-6 py-3 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-4 text-[#0d101b] dark:text-white">
        <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          Sandbox
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a 
            className="text-sm font-medium leading-normal hover:text-primary transition-colors" 
            href="/home"
          >
            Dashboard
          </a>
          <a 
            className="text-sm font-medium leading-normal hover:text-primary transition-colors" 
            href="/library"
          >
            My Library
          </a>
          <a 
            className="text-sm font-medium leading-normal hover:text-primary transition-colors" 
            href="#"
          >
            Templates
          </a>
        </div>
        
        <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
          <span>Upgrade Plan</span>
        </button>
        
        <div 
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full size-10 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-white font-semibold"
        >
          P
        </div>
      </div>
    </header>
  )
}