
// frontend/app/(dashboard)/settings/page.tsx
'use client'

import { useState } from 'react'
import SettingsTabs from '@/app/(dashboard)/settings/tabs/page'
import AccountSettings from '@/app/(dashboard)/settings/account/page'
import BillingSettings from '@/app/(dashboard)/settings/billing/page'
import PreferenceSettings from '@/app/(dashboard)/settings/preferences/page'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />
      case 'billing':
        return <BillingSettings />
      case 'preferences':
        return <PreferenceSettings />
      default:
        return <AccountSettings />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Tabs Navigation */}
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Active Tab Content */}
          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}