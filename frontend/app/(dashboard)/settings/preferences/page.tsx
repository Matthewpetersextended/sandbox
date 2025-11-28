// frontend/app/(dashboard)/settings/preferences/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Bell,
  Mail,
  MessageSquare,
  Moon,
  Globe,
  Volume2,
} from 'lucide-react'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? 'bg-teal-600' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  )
}

export default function PreferenceSettings() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    productUpdates: true,
    soundEffects: true,
    darkMode: false,
  })

  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('America/Toronto')

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = () => {
    console.log('Saving preferences:', { preferences, language, timezone })
    alert('Preferences saved successfully!')
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Preferences</h2>
        <p className="text-gray-600">Customize your experience</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <Label className="font-medium text-gray-900">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive email updates and alerts</p>
              </div>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gray-500" />
              <div>
                <Label className="font-medium text-gray-900">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <div>
                <Label className="font-medium text-gray-900">Weekly Digest</Label>
                <p className="text-sm text-gray-600">Get a weekly summary of your activity</p>
              </div>
            </div>
            <Switch
              checked={preferences.weeklyDigest}
              onCheckedChange={() => handleToggle('weeklyDigest')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-gray-500" />
              <div>
                <Label className="font-medium text-gray-900">Product Updates</Label>
                <p className="text-sm text-gray-600">Stay updated on new features</p>
              </div>
            </div>
            <Switch
              checked={preferences.productUpdates}
              onCheckedChange={() => handleToggle('productUpdates')}
            />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <Label className="font-medium text-gray-900">Dark Mode</Label>
              <p className="text-sm text-gray-600">Enable dark theme</p>
            </div>
            <Switch
              checked={preferences.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <div>
                <Label className="font-medium text-gray-900">Sound Effects</Label>
                <p className="text-sm text-gray-600">Play sounds for interactions</p>
              </div>
            </div>
            <Switch
              checked={preferences.soundEffects}
              onCheckedChange={() => handleToggle('soundEffects')}
            />
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Language & Region</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="font-medium text-gray-900 mb-2 block">Language</Label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <Label className="font-medium text-gray-900 mb-2 block">Timezone</Label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="America/Toronto">Eastern Time (Toronto)</option>
              <option value="America/New_York">Eastern Time (New York)</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <Button onClick={handleSave}>
          Save Preferences
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  )
}