// frontend/components/lessons/create/LessonCreationForm.tsx

"use client"

import { useState } from "react"
import FormSection from "./Formsection"
import ResourceCheckbox from "./Resourcecheckbox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface LessonFormData {
  title: string
  objectives: string
  gradeLevel: string
  subject: string
  startDate: Date | undefined
  resources: {
    slideShow: boolean
    quiz: boolean
    handouts: boolean
    homework: boolean
  }
}

export default function LessonCreationForm() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    objectives: "",
    gradeLevel: "Grade 7-9",
    subject: "Science",
    startDate: undefined,
    resources: {
      slideShow: true,
      quiz: false,
      handouts: true,
      homework: false,
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating lesson with data:", formData)
    // Add your lesson creation logic here
  }

  return (
    <div className="glass-effect border border-emerald-100 dark:border-emerald-900/50 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.1)] overflow-hidden p-8 flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Lesson Title */}
        <FormSection number="1" title="Lesson Title">
          <input 
            className="w-full h-12 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 shadow-sm transition-all text-[#0d101b] dark:text-white"
            placeholder="e.g., Photosynthesis & Plant Growth"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </FormSection>

        {/* Learning Objectives */}
        <FormSection 
          number="2" 
          title="Learning Objectives"
          subtitle="Outline what students will achieve"
        >
          <textarea 
            className="w-full min-h-[120px] rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary p-4 text-base resize-none shadow-sm transition-all text-[#0d101b] dark:text-white placeholder:text-sage-400"
            placeholder="E.g., Students will be able to explain the chemical process of photosynthesis..."
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
          />
        </FormSection>

        {/* Grade Level, Subject, Start Date */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-emerald-900 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.1em] mb-2">
              Grade Level
            </h3>
            <select 
              className="w-full h-12 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 shadow-sm transition-all text-[#0d101b] dark:text-white"
              value={formData.gradeLevel}
              onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
            >
              <option>Kindergarten</option>
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
              <option>Grade 7</option>
              <option>Grade 8</option>
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
              <option>Higher Education</option>
            </select>
          </div>

          <div>
            <h3 className="text-emerald-900 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.1em] mb-2">
              Subject
            </h3>
            <select 
              className="w-full h-12 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary px-4 shadow-sm transition-all text-[#0d101b] dark:text-white"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option>Science</option>
              <option>Mathematics</option>
              <option>English Language Arts</option>
              <option>History</option>
              <option>Computer Science</option>
            </select>
          </div>

          <div className="relative">
            <h3 className="text-emerald-900 dark:text-emerald-400 text-xs font-bold uppercase tracking-[0.1em] mb-2">
              Start Date
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="w-full h-12 justify-start text-left font-normal border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined mr-2 text-primary">
                calendar_today
              </span>
              {formData.startDate ? (
                formData.startDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              ) : (
                <span className="text-muted-foreground">Select date</span>
              )}
            </Button>
            {isCalendarOpen && (
              <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-emerald-100 dark:border-emerald-900/50">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => {
                    setFormData({ ...formData, startDate: date })
                    setIsCalendarOpen(false)
                  }}
                  className="rounded-lg border-0"
                  classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-base font-semibold text-[#0d101b] dark:text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-sage-600 dark:text-emerald-300 rounded-md w-12 font-semibold text-sm",
                    row: "flex w-full mt-2",
                    cell: "h-12 w-12 text-center text-base p-0 relative",
                    day: "h-12 w-12 p-0 font-normal hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-md transition-colors",
                    day_selected: "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-md",
                    day_today: "bg-emerald-100 dark:bg-emerald-900/30 text-[#0d101b] dark:text-white font-semibold rounded-md",
                    day_outside: "text-sage-400 dark:text-emerald-600 opacity-50",
                    day_disabled: "text-sage-400 dark:text-emerald-600 opacity-50",
                    day_hidden: "invisible",
                  }}
                  buttonVariant="ghost"
                />
              </div>
            )}
          </div>
        </section>

        {/* Resources to Generate */}
        <FormSection number="5" title="Resources to Generate">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResourceCheckbox
              label="Include Slide Deck"
              icon="slideshow"
              checked={formData.resources.slideShow}
              onChange={(checked) => setFormData({ 
                ...formData, 
                resources: { ...formData.resources, slideShow: checked }
              })}
            />
            
            <ResourceCheckbox
              label="Include Quiz"
              icon="quiz"
              checked={formData.resources.quiz}
              onChange={(checked) => setFormData({ 
                ...formData, 
                resources: { ...formData.resources, quiz: checked }
              })}
            />
            
            <ResourceCheckbox
              label="Include Handouts"
              icon="description"
              checked={formData.resources.handouts}
              onChange={(checked) => setFormData({ 
                ...formData, 
                resources: { ...formData.resources, handouts: checked }
              })}
            />
            
            <ResourceCheckbox
              label="Include Homework"
              icon="assignment"
              checked={formData.resources.homework}
              onChange={(checked) => setFormData({ 
                ...formData, 
                resources: { ...formData.resources, homework: checked }
              })}
            />
          </div>
        </FormSection>

        {/* Submit Button */}
        <section className="pt-6 border-t border-emerald-50 dark:border-emerald-900/30">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:scale-[0.98] h-auto"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            Create Lesson
          </Button>
          
          <p className="text-center text-[11px] text-emerald-700/50 dark:text-emerald-400/40 mt-5 uppercase tracking-widest font-medium">
            Professional educator toolkit powered by Sandbox AI
          </p>
        </section>
      </form>
    </div>
  )
}