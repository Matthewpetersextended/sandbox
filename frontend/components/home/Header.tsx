// components/dashboard/Header.tsx

import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full py-6 px-8 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <h1 className="text-4xl font-bold text-teal-600">CHALKie</h1>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="bg-white border-2 border-gray-200 hover:bg-gray-50"
        >
          <Gift className="w-4 h-4 mr-2 text-orange-500" />
          Gift a free Pro week
        </Button>
        
        <Button 
          className="bg-teal-700 hover:bg-teal-800 text-white font-semibold"
        >
          Upgrade to <span className="ml-2 px-2 py-0.5 bg-white text-teal-700 rounded text-xs font-bold">PRO</span>
        </Button>
      </div>
    </header>
  )
}