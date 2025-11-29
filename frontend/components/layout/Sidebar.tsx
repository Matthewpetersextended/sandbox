// frontend/components/layout/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  HiHome,
  HiBookOpen,
  HiCollection,
  HiDocumentText,
  HiCog,
  HiFolder
} from 'react-icons/hi'
import { HiChevronLeft, HiChevronRight, HiPlus } from 'react-icons/hi2'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: HiHome,
  },
  {
    name: 'Lessons',
    href: '/lessons',
    icon: HiBookOpen,
  },
  {
    name: 'Lesson Series',
    href: '/lesson-series',
    icon: HiCollection,
  },
  {
    name: 'Activity Sheets',
    href: '/activity-sheets',
    icon: HiDocumentText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: HiCog,
  },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Math')
  const [classes, setClasses] = useState(['Math', 'Science', 'English', 'History'])
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [newClassName, setNewClassName] = useState('')
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'relative h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo/Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-2xl font-bold text-teal-600">CHALKie</h1>
        )}
        {isCollapsed && (
          <div className="w-full flex justify-center">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
        )}
      </div>

      {/* Class Selector */}
      <div className="px-3 py-4 border-b border-gray-200">
        {!isCollapsed ? (
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
            onOpenChange={(open) => {
              if (!open) {
                setIsAddingClass(false)
                setNewClassName('')
              }
            }}
          >
            <SelectTrigger className="w-full h-10 bg-gray-50 border-gray-200">
              <div className="flex items-center gap-2">
                <HiFolder className="w-4 h-4 text-gray-500" />
                <SelectValue placeholder="Select a class" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {/* Existing classes */}
              {classes.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}

              {/* Add new class section */}
              <div className="border-t mt-1 pt-1">
                {isAddingClass ? (
                  <div className="px-2 py-2 space-y-2">
                    <Input
                      placeholder="Class name..."
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newClassName.trim()) {
                          setClasses([...classes, newClassName.trim()])
                          setSelectedClass(newClassName.trim())
                          setNewClassName('')
                          setIsAddingClass(false)
                        } else if (e.key === 'Escape') {
                          setIsAddingClass(false)
                          setNewClassName('')
                        }
                      }}
                      autoFocus
                      className="h-8"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          if (newClassName.trim()) {
                            setClasses([...classes, newClassName.trim()])
                            setSelectedClass(newClassName.trim())
                            setNewClassName('')
                            setIsAddingClass(false)
                          }
                        }}
                        className="h-7 text-xs flex-1"
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setIsAddingClass(false)
                          setNewClassName('')
                        }}
                        className="h-7 text-xs flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setIsAddingClass(true)
                    }}
                    className="w-full flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-sm transition-colors"
                  >
                    <HiPlus className="w-4 h-4" />
                    <span>Add new class</span>
                  </button>
                )}
              </div>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex justify-center group relative">
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 p-0"
            >
              <HiFolder className="w-6 h-6 text-gray-500" />
            </Button>
            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {selectedClass}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative',
                isActive
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-700 hover:bg-gray-100',
                isCollapsed && 'justify-center'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 flex-shrink-0',
                  isActive ? 'text-teal-600' : 'text-gray-500 group-hover:text-gray-700'
                )}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle Button */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'w-full flex items-center gap-2',
            isCollapsed && 'justify-center'
          )}
        >
          {isCollapsed ? (
            <HiChevronRight className="w-5 h-5" />
          ) : (
            <>
              <HiChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}