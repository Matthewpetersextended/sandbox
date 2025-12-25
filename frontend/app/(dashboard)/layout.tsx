//frontend/app/(dashboard)/layout.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AppSidebar } from "@/components/sidebar/app-sidebar"; // Named import instead of default
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from "@/components/ui/sidebar"; // Add shadcn sidebar imports
import { Separator } from "@/components/ui/seperator";
import { hasEnvVars } from "@/lib/firebase/check-env-vars";
import { Toaster } from "@/components/ui/sonner";

type ClientLayoutProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isEditorRoute: boolean;
};

export default function ClientLayout({ 
  children,
  isAuthenticated,
  isEditorRoute 
}: ClientLayoutProps) {
  // Track window width to adjust layout on small screens
  const [windowWidth, setWindowWidth] = useState(0);
  
  // Set up window resize listener
  useEffect(() => {
    // Initialize window width
    setWindowWidth(window.innerWidth);
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // For editor routes, we don't show the sidebar
  if (isEditorRoute) {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Main Content Area for Editor */}
        <main className="flex-1 flex flex-col h-screen min-w-0">
          {/* Top Navigation Bar - Only render when not authenticated */}
          {!isAuthenticated && (
            <nav className="w-full flex justify-center h-16 sticky top-0 z-10 bg-transparent">
              <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
                {!hasEnvVars && <EnvVarWarning />}
              </div>
            </nav>
          )}

          {/* Scrollable Page Content */}
          <div className="flex-1 overflow-x-auto min-w-0">
            {children}
          </div>

          {/* Toast notifications */}
          <Toaster />
        </main>
      </div>
    );
  }

  // For non-editor routes, use the sidebar layout
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header with sidebar trigger */}
        {isAuthenticated && (
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {/* Navigation content removed */}
          </header>
        )}
        
        {/* Top Navigation Bar - Only render when not authenticated */}
        {!isAuthenticated && (
          <nav className="w-full flex justify-center h-16 sticky top-0 z-10 bg-transparent">
            <div className="w-full max-w-5xl flex justify-end items-center p-3 px-5 text-sm">
              {!hasEnvVars && <EnvVarWarning />}
            </div>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1">
            {children}
          </div>
        </main>

        {/* Toast notifications */}
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}