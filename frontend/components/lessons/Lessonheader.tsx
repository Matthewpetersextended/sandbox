// frontend/components/lessons/Lessonheader.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface LessonHeaderProps {
  title: string
  onShare?: () => void
  onAddResource?: () => void
}

export default function LessonHeader({ 
  title,
  onShare,
  onAddResource 
}: LessonHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/30 px-8 py-4">
      <div className="flex items-center gap-6 w-full max-w-2xl">
        <div className="flex items-center gap-3">
          <Link 
            href="/lessons"
            className="text-sage-600 dark:text-emerald-300 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          
          <div className="h-6 w-px bg-emerald-100 dark:bg-emerald-900/30 mx-1"></div>
          
          <h2 className="text-[#0d101b] dark:text-white text-lg font-bold truncate">
            {title}
          </h2>
        </div>
        
        {/* Search Bar */}
        <div className="flex-grow max-w-md h-10 hidden md:block">
          <div className="flex w-full items-stretch rounded-xl h-full bg-emerald-50 dark:bg-emerald-900/20 border border-transparent focus-within:border-primary/50 transition-all">
            <div className="text-sage-600 dark:text-emerald-300 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent focus-visible:ring-0 text-[#0d101b] dark:text-white placeholder:text-sage-400 px-3 text-sm font-normal"
              placeholder="Search resources in this lesson..."
              type="text"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button 
          variant="outline"
          onClick={onShare}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary text-sm font-bold rounded-xl hover:bg-primary/5"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span>Share</span>
        </Button>
        
        <Button 
          onClick={onAddResource}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white dark:text-background-dark text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Resource</span>
        </Button>
        
        <div className="h-10 w-px bg-emerald-100 dark:bg-emerald-900/30 mx-2"></div>
        
        <div 
          className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full h-10 w-10 border-2 border-primary/20 flex items-center justify-center text-white font-semibold"
        >
          P
        </div>
      </div>
    </header>
  )
}