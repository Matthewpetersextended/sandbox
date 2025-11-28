// frontend/components/settings/SettingsTabs.tsx
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { User, CreditCard, Settings } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  {
    id: 'account',
    label: 'Account',
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: <Settings className="w-4 h-4" />,
  },
]

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8" aria-label="Settings tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}