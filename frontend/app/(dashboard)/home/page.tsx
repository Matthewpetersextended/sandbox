// app/home/page.tsx

import Header from '@/components//dashboard/Header'
import AnnouncementBanner from '@/components/dashboard/Announcementbanner'
import CreateOptionsCard from '@/components/dashboard/CreateOptionsCard'
import ResourcesSection from '@/components/dashboard/ResourcesSection'
import FeedbackButton from '@/components/dashboard/Feedbackbutton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-8 pb-16">
        {/* Announcement Banner */}
        <AnnouncementBanner />

        {/* Create Options */}
        <CreateOptionsCard />

        {/* Resources Section */}
        <ResourcesSection />
      </main>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  )
}