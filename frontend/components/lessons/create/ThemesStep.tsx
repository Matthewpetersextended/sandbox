//app/tools/Lessons/components/lesson-wizard/ThemesStep.tsx

import { Button } from "@/components/ui/button";
import { LessonData } from "@/app/(dashboard)/lessons/create/page";
import { cn } from "@/lib/utils";

interface ThemeStepProps {
  data: LessonData;
  onUpdate: (data: Partial<LessonData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const themes = [
  { id: "light", name: "Light", description: "A light touch", color: "bg-gray-50" },
  { id: "science", name: "Science", description: "For curious minds", color: "bg-blue-100" },
  { id: "maths", name: "Maths", description: "Numbers are fun", color: "bg-orange-100" },
  { id: "simple", name: "Simple", description: "Less is more", color: "bg-amber-50" },
  { id: "classic", name: "Classic", description: "The original", color: "bg-rose-50" },
  { id: "bright", name: "Bright", description: "Fun and fresh", color: "bg-cyan-400" },
  { id: "mint", name: "Mint", description: "Fresh and clean", color: "bg-emerald-100" },
  { id: "blueprint", name: "Blueprint", description: "Technical precision", color: "bg-blue-200" },
  { id: "pop", name: "Pop", description: "Playful and bright", color: "bg-yellow-400" },
];

const categories = [
  "Popular",
  "Light",
  "Dark",
  "Simple",
  "Early learners",
  "Professional",
  "Fun",
  "Subjects",
  "All",
];

const ThemeStep = ({ data, onUpdate, onNext, onBack }: ThemeStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Last of all. Let's get colourful.</h1>
        <p className="text-lg text-muted-foreground">Pick a theme. You can swap later too.</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Popular" ? "default" : "outline"}
              className={cn(
                "rounded-full",
                category === "Popular" && "bg-primary text-primary-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onUpdate({ theme: theme.id })}
              className={cn(
                "p-8 rounded-2xl border-2 transition-all text-left h-48 flex flex-col justify-center items-center",
                theme.color,
                data.theme === theme.id
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-transparent hover:border-border"
              )}
            >
              <h3 className="text-2xl font-bold mb-1">{theme.name}</h3>
              <p className="text-sm text-muted-foreground">{theme.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base">
          Back
        </Button>
        <Button onClick={onNext} className="text-base px-8">
          Create Lesson
        </Button>
      </div>
    </div>
  );
};

export default ThemeStep;