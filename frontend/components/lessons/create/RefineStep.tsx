//app/tools/Lessons/components/lesson-wizard/RefineStep.tsx

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LessonData } from "@/app/(dashboard)/lessons/create/page";
import { Info, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RefineStepProps {
  data: LessonData;
  onUpdate: (data: Partial<LessonData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const RefineStep = ({ data, onUpdate, onNext, onBack }: RefineStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-foreground">Refine your lesson</h1>
        <p className="text-lg text-muted-foreground">
          Almost done. Pick your preferences. Or, leave it to us!
        </p>
      </div>

      <div className="bg-card rounded-2xl p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center gap-2">
              Additional instructions <span className="text-muted-foreground">(optional)</span>
              <Info className="w-4 h-4 text-muted-foreground" />
            </Label>
            <Button variant="outline" size="sm" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Generate lesson outline
            </Button>
          </div>
          <Textarea
            placeholder="You can include specific topics, learning objectives or paste in existing lesson plans..."
            value={data.additionalInstructions}
            onChange={(e) => onUpdate({ additionalInstructions: e.target.value })}
            className="min-h-32 resize-none text-base"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            Resources
            <Info className="w-4 h-4 text-muted-foreground" />
          </Label>
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Checkbox
              id="resources"
              checked={data.useResources}
              onCheckedChange={(checked) => onUpdate({ useResources: checked as boolean })}
            />
            <div className="space-y-1">
              <Label htmlFor="resources" className="text-base font-medium cursor-pointer">
                Use existing resources in my lesson
              </Label>
              <p className="text-sm text-muted-foreground">Paste in a URL or upload a file</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium">Include in my lesson</Label>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="objectives"
                checked={data.includeObjectives}
                onCheckedChange={(checked) => onUpdate({ includeObjectives: checked as boolean })}
              />
              <div className="space-y-1">
                <Label htmlFor="objectives" className="text-base font-medium cursor-pointer">
                  Learning goals/objectives
                </Label>
                <p className="text-sm text-muted-foreground">
                  Description of understanding, knowledge or skills students will gain
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="vocabulary"
                checked={data.includeVocabulary}
                onCheckedChange={(checked) => onUpdate({ includeVocabulary: checked as boolean })}
              />
              <Label htmlFor="vocabulary" className="text-base font-medium cursor-pointer">
                Key vocabulary list
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg bg-secondary/30">
              <Checkbox
                id="activities"
                checked={data.includeActivities}
                onCheckedChange={(checked) => onUpdate({ includeActivities: checked as boolean })}
              />
              <div className="space-y-1">
                <Label htmlFor="activities" className="text-base font-medium cursor-pointer">
                  Learning activities
                </Label>
                <p className="text-sm text-muted-foreground">(increases lesson length)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg">
              <Checkbox
                id="video"
                checked={data.includeVideo}
                onCheckedChange={(checked) => onUpdate({ includeVideo: checked as boolean })}
              />
              <div className="flex items-start justify-between w-full">
                <div className="space-y-1">
                  <Label htmlFor="video" className="text-base font-medium cursor-pointer">
                    YouTube video
                  </Label>
                  <p className="text-sm text-muted-foreground">We'll include a relevant video for you</p>
                </div>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">
                  PRO
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack} className="text-base">
          Back
        </Button>
        <Button onClick={onNext} className="text-base px-8">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RefineStep;