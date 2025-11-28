// components/dashboard/AnnouncementBanner.tsx

import { Button } from '@/components/ui/button'

export default function AnnouncementBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 mb-12">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 flex items-center justify-between shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📣</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Try our new activity sheets
            </h3>
            <p className="text-gray-600">
              We've built a new and improved way to create classroom-ready activities to share, export or print.
            </p>
          </div>
        </div>
        
        <Button className="bg-teal-700 hover:bg-teal-800 text-white font-semibold whitespace-nowrap">
          Try it now
        </Button>
      </div>
    </div>
  )
}