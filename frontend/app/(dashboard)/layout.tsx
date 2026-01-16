"use client";

import { EnvVarWarning } from "@/components/env-var-warning";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import DashboardHeader from "@/components/home/Dashboardheader";
import { 
  SidebarProvider,
} from "@/components/ui/sidebar";
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

  // For non-editor routes, use the sidebar + header layout
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar - Fixed width, full height */}
        <AppSidebar />
        
        {/* Main content area - Takes remaining space */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header - spans the top of main content */}
          <DashboardHeader />
          
          {/* Scrollable page content */}
          <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            {children}
          </main>

          {/* Toast notifications */}
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
}