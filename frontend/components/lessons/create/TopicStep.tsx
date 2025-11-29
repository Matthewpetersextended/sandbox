//app/tools/Lessons/components/lesson-wizard/TopicStep.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LessonData } from "@/app/(dashboard)/lessons/create/page";
import { BookOpen, Calendar } from "lucide-react";

interface TopicStepProps {
  data: LessonData;
  onUpdate: (data: Partial<LessonData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const TopicStep = ({ data, onUpdate, onNext, onBack }: TopicStepProps) => {
  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      // Convert to ISO string for storage
      const date = new Date(dateValue);
      onUpdate({ date: date.toISOString() });
    } else {
      onUpdate({ date: '' });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Pick your topic?</h1>
        <p className="text-lg text-muted-foreground flex items-center justify-center gap-2">
          Let's start with the basics <BookOpen className="w-5 h-5" />
        </p>
      </div>

      <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-base font-medium">
            Lesson topic
          </Label>
          <Input
            id="topic"
            placeholder="E.g. The Solar System"
            value={data.topic}
            onChange={(e) => onUpdate({ topic: e.target.value })}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-base font-medium">
            Lesson date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              id="date"
              type="date"
              value={formatDateForInput(data.date)}
              onChange={handleDateChange}
              className="h-12 text-base pl-10"
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level" className="text-base font-medium">
              Level
            </Label>
            <Select value={data.level} onValueChange={(value) => onUpdate({ level: value })}>
              <SelectTrigger id="level" className="h-12">
                <SelectValue placeholder="Choose a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kindergarten">Kindergarten</SelectItem>
                <SelectItem value="1st-grade">1st Grade</SelectItem>
                <SelectItem value="2nd-grade">2nd Grade</SelectItem>
                <SelectItem value="3rd-grade">3rd Grade</SelectItem>
                <SelectItem value="4th-grade">4th Grade</SelectItem>
                <SelectItem value="5th-grade">5th Grade</SelectItem>
                <SelectItem value="6th-grade">6th Grade</SelectItem>
                <SelectItem value="7th-grade">7th Grade</SelectItem>
                <SelectItem value="8th-grade">8th Grade</SelectItem>
                <SelectItem value="high-school">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-base font-medium">
              Language
            </Label>
            <Select value={data.language} onValueChange={(value) => onUpdate({ language: value })}>
              <SelectTrigger id="language" className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English (US)">🇺🇸 English (US)</SelectItem>
                <SelectItem value="English (UK)">🇬🇧 English (UK)</SelectItem>
                <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                <SelectItem value="French">🇫🇷 French</SelectItem>
                <SelectItem value="German">🇩🇪 German</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slides" className="text-base font-medium">
              Slides
            </Label>
            <Select value={data.slides.toString()} onValueChange={(value) => onUpdate({ slides: parseInt(value) })}>
              <SelectTrigger id="slides" className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">
            Align to curriculum / standards <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Button
            variant="outline"
            className="w-full h-14 justify-start gap-3 text-base"
            onClick={() => {}}
          >
            <BookOpen className="w-5 h-5" />
            Choose curriculum
          </Button>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!data.topic || !data.level || !data.date} 
          className="text-base px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TopicStep;