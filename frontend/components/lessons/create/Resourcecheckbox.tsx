/// frontend/components/lessons/create/Rescourcecheckbox.tsx

"use client"

interface ResourceCheckboxProps {
  label: string
  icon: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ResourceCheckbox({ 
  label, 
  icon, 
  checked, 
  onChange 
}: ResourceCheckboxProps) {
  return (
    <label className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
          {label}
        </span>
      </div>
      <input 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded text-primary focus:ring-primary border-emerald-300 dark:border-emerald-700"
        type="checkbox"
      />
    </label>
  )
}