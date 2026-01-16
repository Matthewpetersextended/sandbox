// frontend/components/sidebar/app-sidebar.tsx

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"

// Navigation data matching the EduAI design
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/home",
      icon: "dashboard",
    },
    {
      title: "Library",
      url: "/library",
      icon: "library_books",
    },
    {
      title: "Lessons",
      url: "/lessons",
      icon: "menu_book",
    },
    {
      title: "Classes",
      url: "/classes",
      icon: "group",
    },
  ],
  navFooter: [
    {
      title: "Settings",
      url: "/settings",
      icon: "settings",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<"aside">) {
  const pathname = usePathname()
  const { open } = useSidebar()

  return (
    <aside 
      className={`
        bg-white dark:bg-[#0a1410] 
        border-r border-emerald-100 dark:border-emerald-900/30 
        flex flex-col
        transition-all duration-300 ease-in-out
        ${open ? 'w-64' : 'w-16'}
        shrink-0
        h-screen
      `}
      {...props}
    >
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-xl">
              auto_awesome
            </span>
          </div>
          {open && (
            <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
              <span className="font-bold text-[#0d101b] dark:text-white text-lg whitespace-nowrap">
                Sandbox
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {data.navMain.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-sage-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }
                ${!open ? 'justify-center' : ''}
              `}
              title={!open ? item.title : undefined}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">
                {item.icon}
              </span>
              {open && (
                <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer with Settings */}
      <div className="border-t border-emerald-50 dark:border-emerald-900/20 px-3 py-3">
        {data.navFooter.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link
              key={item.title}
              href={item.url}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white' 
                  : 'text-sage-600 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                }
                ${!open ? 'justify-center' : ''}
              `}
              title={!open ? item.title : undefined}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0">
                {item.icon}
              </span>
              {open && (
                <span className="text-sm font-medium whitespace-nowrap">{item.title}</span>
              )}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}