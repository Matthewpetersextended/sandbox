// app/tools/Lessons/page.tsx 

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import LessonCard from "@/app/(dashboard)/lessons/lessoncards";
import { 
  fetchLessons, 
  handleLessonError,
  type Lesson 
} from "@/app/tools/Calendar/utils/lessonApi";

const LessonsPage = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lessons on component mount
  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedLessons = await fetchLessons();
      setLessons(fetchedLessons);
    } catch (err) {
      const errorMessage = handleLessonError(err);
      setError(errorMessage);
      console.error('Error fetching lessons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    loadLessons();
  };

  // Get unique segment types from a lesson
  const getSegmentTypes = (lesson: Lesson): string[] => {
    if (!lesson.segments || lesson.segments.length === 0) {
      return [];
    }
    // Extract unique segment types (projectName)
    const types = lesson.segments.map((seg: { projectName: any; }) => seg.projectName);
    return Array.from(new Set(types));
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    // Format as "26 Oct 2025"
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Lessons</h1>
            <p className="text-lg text-muted-foreground">
              One-off lessons. You can create printable worksheets from within a lesson.
            </p>
          </div>
          <Button
            onClick={() => router.push("/tools/Lessons/create")}
            size="lg"
            className="gap-2 px-6 h-12 text-base font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            Create new <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="text-red-700 border-red-300 hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-gray-600">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Loading lessons...</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && lessons.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No lessons yet
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by creating your first lesson
            </p>
            <Button
              onClick={() => router.push("/tools/Lessons/create")}
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4" />
              Create your first lesson
            </Button>
          </div>
        )}

        {/* Lessons Grid */}
        {!isLoading && !error && lessons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
  <LessonCard
    key={lesson.id}
    id={lesson.id!}  // ADD THIS LINE
    title={lesson.title}
    image="/solarsystem.jpg"
    segments={getSegmentTypes(lesson)}
    author={lesson.author || "Unknown"}
    authorInitials={
      lesson.author
        ? lesson.author
            .split(" ")
            .map((n: any[]) => n[0])
            .join("")
            .toUpperCase()
        : "?"
    }
    updatedDate={formatDate(lesson.updatedAt || lesson.createdAt || lesson.date)}
  />
))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsPage;