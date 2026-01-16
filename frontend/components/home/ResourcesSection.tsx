// components/home/ResourcesSection.tsx

import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'

const resourceCards = [
  {
    id: 1,
    title: 'Know a',
    color: 'bg-gradient-to-br from-orange-400 to-orange-500',
    dismissible: true,
  },
  {
    id: 2,
    image: '/placeholder-1.jpg', // Replace with actual image
    title: 'Resource 1',
  },
  {
    id: 3,
    image: '/placeholder-2.jpg', // Replace with actual image
    title: 'Resource 2',
  },
  {
    id: 4,
    image: '/placeholder-3.jpg', // Replace with actual image
    title: 'Resource 3',
  },
]

export default function ResourcesSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Your resources</h2>
        
        <Button 
          variant="outline" 
          className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 font-semibold"
        >
          Create folder <Plus className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {resourceCards.map((card) => (
          <div
            key={card.id}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
          >
            {card.color ? (
              <div className={`w-full h-full ${card.color} flex items-center justify-center`}>
                {card.dismissible && (
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <X className="w-5 h-5 text-white" />
                  </button>
                )}
                <h3 className="text-3xl font-bold text-white px-6">
                  {card.title}
                </h3>
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 relative">
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-sm">{card.title}</span>
                </div>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          </div>
        ))}
      </div>
    </div>
  )
}