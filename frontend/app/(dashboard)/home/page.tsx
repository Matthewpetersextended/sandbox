// app/(dashboard)home/page.tsx

import Header from '@/components/home/Header'
import AnnouncementBanner from '@/components/home/Announcementbanner'
import CreateOptionsCard from '@/components/home/CreateOptionsCard'
import ResourcesSection from '@/components/home/ResourcesSection'
import FeedbackButton from '@/components/home/Feedbackbutton'

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