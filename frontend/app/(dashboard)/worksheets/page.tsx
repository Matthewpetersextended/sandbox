//frontend/app/(dashboard)/worksheets/page.tsx

export default function WorksheetsPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Worksheets</h1>
        <p className="text-lg text-gray-600 mb-8">
          Access and manage your educational worksheets
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Grammar Worksheets</h3>
            <p className="text-gray-600">Practice grammar rules and exercises</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Multiplication Tables</h3>
            <p className="text-gray-600">Practice and master multiplication facts</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Spelling Practice</h3>
            <p className="text-gray-600">Weekly spelling words and exercises</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Vocabulary Building</h3>
            <p className="text-gray-600">Expand your vocabulary with targeted exercises</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Writing Prompts</h3>
            <p className="text-gray-600">Creative writing exercises and prompts</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-2">Problem Solving</h3>
            <p className="text-gray-600">Critical thinking and logic worksheets</p>
          </div>
        </div>
      </div>
    </div>
  )
}
