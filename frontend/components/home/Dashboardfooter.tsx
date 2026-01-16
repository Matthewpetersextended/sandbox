"use client"

import Link from "next/link"

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto py-8 px-8 border-t border-emerald-50 dark:border-emerald-900/20 flex justify-between items-center text-xs text-sage-400 dark:text-emerald-200/30">
      <p>
        © {currentYear} Sandbox. Designed for Educators.
      </p>
      
      <div className="flex gap-6">
        <Link 
          href="#" 
          className="hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        <Link 
          href="#" 
          className="hover:text-primary transition-colors"
        >
          Terms of Service
        </Link>
        <Link 
          href="#" 
          className="hover:text-primary transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </footer>
  )
}