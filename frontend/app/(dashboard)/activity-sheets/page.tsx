//frontend/app/(dashboard)/activity-sheets/page.tsx

export default function ActivitySheetsPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Activity Sheets</h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse and manage your educational activity sheets
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Math Activities</h3>
            <p className="text-gray-600">Interactive math worksheets and activities</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Reading Comprehension</h3>
            <p className="text-gray-600">Reading exercises and comprehension activities</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Science Experiments</h3>
            <p className="text-gray-600">Hands-on science activity sheets</p>
          </div>
        </div>
      </div>
    </div>
  )
}
