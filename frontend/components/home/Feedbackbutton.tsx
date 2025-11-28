// components/home/FeedbackButton.tsx

export default function FeedbackButton() {
  return (
    <button className="fixed right-0 top-1/2 -translate-y-1/2 bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-6 rounded-l-lg shadow-lg transition-colors duration-200 z-50">
      <div className="transform -rotate-90 whitespace-nowrap tracking-wider text-sm">
        Feedback
      </div>
    </button>
  )
}