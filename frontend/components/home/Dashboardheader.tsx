// frontend/components/home/Dashboardheader.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="flex items-center justify-between bg-white dark:bg-[#0a1410] border-b border-emerald-100 dark:border-emerald-900/30 px-8 py-3 shrink-0">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle Button */}
        <SidebarTrigger className="text-sage-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" />
        
        <h2 className="text-[#0d101b] dark:text-white text-xl font-bold">
          Welcome back, Professor
        </h2>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-400">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-3 py-2 border-none bg-background-light dark:bg-emerald-900/20 rounded-lg text-sm focus-visible:ring-primary focus-visible:ring-2 placeholder:text-sage-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sage-600 dark:text-emerald-300"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-[#0a1410] rounded-full"></span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-sage-600 dark:text-emerald-300"
          >
            <span className="material-symbols-outlined">help_outline</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-emerald-100 dark:bg-emerald-900/30"></div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div 
            className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full h-10 w-10 border-2 border-primary/20 flex items-center justify-center text-white font-semibold"
          >
            P
          </div>
        </div>
      </div>
    </header>
  )
}