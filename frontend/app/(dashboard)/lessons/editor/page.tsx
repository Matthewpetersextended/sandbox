//frontend/app/%28dashboard%29/lessons/editor/page.tsx

import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { LeftSidebar } from '../editor/components/LeftSidebar';
import { RightSidebar } from '../editor/components/RightSidebar';
import { SlideCanvas } from '../editor/components/SlideCanvas';
import { BottomToolbar } from '../editor/components/BottomToolbar';

export const PresentationEditor: React.FC = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-background">
      {/* Left Sidebar - Slides Panel */}
      <LeftSidebar />

      {/* Main Canvas Area */}
      <SlideCanvas />

      {/* Right Sidebar - Properties Panel */}
      <RightSidebar />

      {/* Bottom Floating Toolbar */}
      <BottomToolbar />

      {/* AI Assistant Button */}
      <button className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full bg-sky-500 hover:bg-sky-400 flex items-center justify-center transition-colors shadow-lg">
        <Sparkles className="h-6 w-6 text-primary-foreground" />
      </button>

      {/* Help Button */}
      <button className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-accent transition-colors">
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
      </button>
    </div>
  );
};
