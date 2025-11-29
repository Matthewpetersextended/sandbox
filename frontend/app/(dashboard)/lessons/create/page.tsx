//app/tools/Lessons/create/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopicStep from "@/components/lessons/create/TopicStep";
import RefineStep from "@/components/lessons/create/RefineStep";
import ThemeStep from "@/components/lessons/create/ThemesStep";

export interface LessonData {
  topic: string;
  level: string;
  language: string;
  slides: number;
  date: string;
  curriculum: string;
  additionalInstructions: string;
  useResources: boolean;
  includeObjectives: boolean;
  includeVocabulary: boolean;
  includeActivities: boolean;
  includeVideo: boolean;
  theme: string;
  timezone: string;
  lessonDuration: number;
}

const CreateLesson = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    stage: 'idle',
    message: '',
    percentage: 0,
  });
  const [lessonData, setLessonData] = useState<LessonData>({
    topic: "",
    level: "",
    language: "English (US)",
    slides: 10,
    date: "",
    curriculum: "",
    additionalInstructions: "",
    useResources: false,
    includeObjectives: false,
    includeVocabulary: false,
    includeActivities: true,
    includeVideo: false,
    theme: "popular",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    lessonDuration: 60,
  });

  const updateLessonData = (data: Partial<LessonData>) => {
    setLessonData((prev) => ({ ...prev, ...data }));
  };

  const handleCreateLesson = async () => {
    try {
      setIsCreating(true);
      
      // Stage 1: Creating lesson structure
      setGenerationProgress({
        stage: 'structure',
        message: 'Creating lesson structure...',
        percentage: 10,
      });
      
      // Call AI generation API
      const response = await fetch('/api/lessons/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: lessonData.topic,
          level: lessonData.level,
          language: lessonData.language,
          slides: lessonData.slides,
          date: lessonData.date || new Date().toISOString(),
          curriculum: lessonData.curriculum,
          additionalInstructions: lessonData.additionalInstructions,
          useResources: lessonData.useResources,
          includeObjectives: lessonData.includeObjectives,
          includeVocabulary: lessonData.includeVocabulary,
          includeActivities: lessonData.includeActivities,
          includeVideo: lessonData.includeVideo,
          theme: lessonData.theme,
          timezone: lessonData.timezone,
          lessonDuration: lessonData.lessonDuration,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate lesson');
      }

      // Stage 2: Generating content
      setGenerationProgress({
        stage: 'content',
        message: 'Generating lesson content with AI...',
        percentage: 40,
      });

      // Stage 3: Fetching images
      setGenerationProgress({
        stage: 'images',
        message: 'Finding perfect images for your slides...',
        percentage: 70,
      });

      const result = await response.json();

      // Stage 4: Complete
      setGenerationProgress({
        stage: 'complete',
        message: 'Finalizing your lesson...',
        percentage: 100,
      });

      console.log('✅ Lesson generated successfully:', result);
      
      // Navigate to editor with the new lesson ID
      if (result.lessonId) {
        // Small delay to show completion
        setTimeout(() => {
          router.push(`/tools/Lessons/editor?id=${result.lessonId}`);
        }, 500);
      } else {
        throw new Error('Lesson generated but no ID returned');
      }
      
    } catch (error) {
      console.error('❌ Error generating lesson:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate lesson';
      
      // Show user-friendly error
      alert(
        `Failed to generate lesson: ${errorMessage}\n\n` +
        `Please check:\n` +
        `- Your API keys are configured correctly\n` +
        `- You have sufficient API credits\n` +
        `- Your internet connection is stable\n\n` +
        `Check the console for more details.`
      );
      
      setIsCreating(false);
      setGenerationProgress({
        stage: 'idle',
        message: '',
        percentage: 0,
      });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - create lesson and navigate to editor
      handleCreateLesson();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/tools/Lessons");
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {isCreating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-md space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                    style={{ width: `${generationProgress.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {generationProgress.percentage}% Complete
                </p>
              </div>
              
              {/* Status message */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-xl font-semibold text-foreground">
                    {generationProgress.message || 'Creating your lesson...'}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  This usually takes 30-60 seconds. Hang tight! ☕
                </p>
              </div>

              {/* Animated preview cards */}
              <div className="mt-8 space-y-3">
                <p className="text-sm text-center text-muted-foreground font-medium">
                  Preview
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i}
                      className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg animate-pulse shadow-sm"
                      style={{ 
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1.5s'
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun fact */}
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 text-center">
                  💡 <span className="font-semibold">Did you know?</span> Our AI is analyzing thousands of 
                  educational resources to create the perfect lesson for your students!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <TopicStep
                data={lessonData}
                onUpdate={updateLessonData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 2 && (
              <RefineStep
                data={lessonData}
                onUpdate={updateLessonData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <ThemeStep
                data={lessonData}
                onUpdate={updateLessonData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateLesson;