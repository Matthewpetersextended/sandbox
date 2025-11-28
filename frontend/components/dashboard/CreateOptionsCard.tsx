// components/dashboard/CreateOptionsCard.tsx

import { Sparkles, Copy, FileEdit } from 'lucide-react'

interface CreateOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  isNew?: boolean
}

const createOptions: CreateOption[] = [
  {
    id: 'single-lesson',
    title: 'Single lesson',
    description: 'A one-off lesson',
    icon: <Sparkles className="w-12 h-12 text-teal-600" />,
  },
  {
    id: 'lesson-series',
    title: 'Lesson series',
    description: 'Multiple lessons on a topic',
    icon: <Copy className="w-12 h-12 text-teal-600" />,
  },
  {
    id: 'activity-sheets',
    title: 'Activity sheets',
    description: 'Print-ready sheets of tasks',
    icon: <FileEdit className="w-12 h-12 text-teal-600" />,
    isNew: true,
  },
]

export default function CreateOptionsCard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          What shall we create today?
        </h2>
        <p className="text-xl text-gray-600">
          We're here to help ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {createOptions.map((option) => (
          <button
            key={option.id}
            className="relative bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-100 hover:border-teal-500 hover:shadow-lg transition-all duration-200 group"
          >
            {option.isNew && (
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                New
              </div>
            )}
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                {option.icon}
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-teal-400" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-gray-600">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}