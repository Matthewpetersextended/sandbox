//frontend/app/(dashboard)/layout.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/seperator";
import { Button } from "@/components/ui/button";
import { hasEnvVars } from "@/lib/firebase/check-env-vars";
import { Toaster } from "@/components/ui/sonner";

type ClientLayoutProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isEditorRoute: boolean;
};

// Custom header component that uses sidebar context
function LayoutHeader({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="-ml-1 h-9 w-9"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      {/* Environment warning when not authenticated */}
      {!isAuthenticated && (
        <div className="flex-1 flex justify-end">
          {!hasEnvVars && <EnvVarWarning />}
        </div>
      )}
    </header>
  );
}

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
        {/* Header with custom sidebar toggle button */}
        <LayoutHeader isAuthenticated={isAuthenticated} />

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