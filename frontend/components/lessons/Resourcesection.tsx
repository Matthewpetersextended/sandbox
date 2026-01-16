// frontend/components/lessons/Resourcesection.tsx

"use client"

import ResourceCard from "./Resourcecard"
import AddResourceCard from "./Addresourcecard"

interface Resource {
  id: string
  title: string
  description: string
  icon: string
  badge?: string
}

interface ResourceSectionProps {
  title: string
  icon: string
  count: number
  resources: Resource[]
  showAddCard?: boolean
  addCardTitle?: string
  addCardSubtitle?: string
}

export default function ResourceSection({ 
  title, 
  icon,
  count,
  resources,
  showAddCard = false,
  addCardTitle = "Add Resource",
  addCardSubtitle = "Click to add"
}: ResourceSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[#0d101b] dark:text-white text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">{icon}</span>
          {title}
        </h3>
        <span className="text-xs text-sage-600 dark:text-emerald-300 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>
      
      {/* Resource Cards */}
      <div className="flex flex-col gap-4">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={resource.title}
            description={resource.description}
            icon={resource.icon}
            badge={resource.badge}
          />
        ))}
        
        {/* Optional Add Card */}
        {showAddCard && (
          <AddResourceCard
            title={addCardTitle}
            subtitle={addCardSubtitle}
          />
        )}
      </div>
    </div>
  )
}