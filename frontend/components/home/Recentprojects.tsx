// components/home/Recentprojects.tsx

"use client"

import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  type: "Slides" | "Worksheet" | "Quiz"
  modified: string
  folder: string
  gradient: string
  icon: string
}

const recentProjects: Project[] = [
  {
    id: "1",
    title: "Photosynthesis Masterclass",
    type: "Slides",
    modified: "2 hours ago",
    folder: "Biology 101",
    gradient: "from-emerald-500 to-emerald-700",
    icon: "eco",
  },
  {
    id: "2",
    title: "Calculus: Limits Practice",
    type: "Worksheet",
    modified: "Oct 12, 2023",
    folder: "Advanced Math",
    gradient: "from-teal-500 to-emerald-600",
    icon: "functions",
  },
  {
    id: "3",
    title: "Renaissance Art History",
    type: "Quiz",
    modified: "Oct 10, 2023",
    folder: "World History",
    gradient: "from-emerald-600 to-green-800",
    icon: "history_edu",
  },
  {
    id: "4",
    title: "Intro to Literary Analysis",
    type: "Slides",
    modified: "Oct 08, 2023",
    folder: "English Literature",
    gradient: "from-lime-500 to-emerald-600",
    icon: "menu_book",
  },
]

export default function RecentProjects() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#0d101b] dark:text-white text-lg font-bold">
          Recent Projects
        </h3>
        
        <Button 
          variant="link" 
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 p-0"
        >
          View All
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-[#0d1b15] rounded-xl overflow-hidden border border-emerald-100 dark:border-emerald-900/30 group cursor-pointer shadow-sm hover:shadow-lg transition-all"
            onClick={() => {
              // Handle project card click
              console.log('Project clicked:', project.id)
            }}
          >
            {/* Project Thumbnail */}
            <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
              <span className="material-symbols-outlined text-white text-4xl opacity-50">
                {project.icon}
              </span>
              
              {/* Type Badge */}
              <div className="absolute top-2 right-2">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider">
                  {project.type}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-4">
              <h5 className="text-[#0d101b] dark:text-white text-sm font-bold truncate mb-1">
                {project.title}
              </h5>
              
              <p className="text-xs text-sage-500 dark:text-emerald-200/40 mb-3">
                Modified {project.modified}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-emerald-50 dark:border-emerald-900/20 pt-3">
                <span className="text-[10px] text-sage-400 dark:text-emerald-200/30 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    folder_shared
                  </span>
                  {project.folder}
                </span>
                
                <button 
                  className="text-sage-400 hover:text-primary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Handle more options click
                  }}
                >
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}