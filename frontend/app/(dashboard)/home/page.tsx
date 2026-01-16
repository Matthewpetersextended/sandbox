// frontend/app/%28dashboard%29/home/page.tsx

"use client"

import QuickActions from "@/components/home/Quickactions"
import RecentProjects from "@/components/home/Recentprojects"
import LessonPlannerPromo from "@/components/home/Leassonplannerpromo"
import DashboardFooter from "@/components/home/Dashboardfooter"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full bg-background-light dark:bg-background-dark">
      {/* Main Content Area - Full Width with consistent padding */}
      <div className="flex-1 px-8 pt-8 pb-8">
        {/* Quick Actions Section */}
        <QuickActions />

        {/* Recent Projects Section */}
        <RecentProjects />

        {/* Lesson Planner Promotional Banner */}
        <LessonPlannerPromo />
      </div>

      {/* Footer */}
      <DashboardFooter />
    </div>
  )
}