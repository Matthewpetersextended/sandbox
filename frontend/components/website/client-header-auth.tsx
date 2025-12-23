//components/client-header-auth.tsx

"use client";

import { hasEnvVars } from "@/lib/firebase/check-env-vars";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/config";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

// Navigation items grouped by categories
const navigationSections = [
  {
    title: "STUDENT ASSESSMENT",
    items: [
      {
        title: "Assignments & Exams",
        href: "/web-pages/assignments-exams",
        description: "Easy-to-build assignments and exams with interactive formats"
      },
      {
        title: "Polls & Quizzes",
        href: "/web-pages/polls-quizes", 
        description: "Create engaging polls and quizzes for student interaction"
      },
      {
        title: "Marking",
        href: "/web-pages/marking",
        description: "Streamline grading with efficient marking tools and rubrics"
      },
    ]
  },
  {
    title: "CLASSROOM ENGAGEMENT",
    items: [
      {
        title: "Discussions",
        href: "/web-pages/discussions", 
        description: "Foster classroom discussions and collaborative learning"
      },
      {
        title: "Live Lessons",
        href: "/web-pages/live-lesson",
        description: "Interactive live lessons with screen sharing and whiteboards"
      },
      {
        title: "Learning Games",
        href: "/web-pages/learning-games",
        description: "Gamify education with interactive learning games"
      },
    ]
  },
  {
    title: "TEACHING TOOLS",
    items: [
      {
        title: "Lesson Planning",
        href: "/web-pages/lesson-planning", 
        description: "Smart planning tools with templates and curriculum alignment to streamline lesson creation."
      },
      {
        title: "IEP Management",
        href: "/web-pages/iep-management", 
        description: "Tools to create, track, and manage Individualized Education Programs with compliance support."
      },
      {
        title: "Attendance",
        href: "/web-pages/attendance",
        description: "Track student attendance with automated reporting"
      },
    ]
  },
  {
    title: "PERSONALIZED LEARNING",
    items: [
      {
        title: "Personalized Content",
        href: "/web-pages/personalized-content", 
        description: "Adapt learning materials to match each student's individual pace and learning style."
      },
    ]
  },
  {
    title: "ANALYTICS & INSIGHTS",
    items: [
      {
        title: "Real Time Data",
        href: "/web-pages/real-time-data", 
        description: "Live dashboard showing student progress and engagement as it happens in your classroom."
      },
    ]
  }
];

// ListItem component for clean navigation
const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md px-2 py-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium">{title}</div>
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Section Header component
const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-3 py-2 mb-2">
    <h3 className="text-xs font-semibold text-green-600 uppercase tracking-wider">
      {title}
    </h3>
  </div>
)

// Main Navigation Component with sectioned dropdown
function MainNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-medium">
            Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[500px] p-4">
              <div className="grid grid-cols-2 gap-6">
                {navigationSections.map((section) => (
                  <div key={section.title} className="space-y-2">
                    <SectionHeader title={section.title} />
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/help" className={navigationMenuTriggerStyle()}>
              Help
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/about" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/web-pages/pricing" className={navigationMenuTriggerStyle()}>
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function ClientHeaderAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes with Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-6 w-full">
        <div className="flex-1">
          <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!hasEnvVars) {
    return (
      <div className="flex items-center gap-6 w-full">
        <div>
          <MainNavigation />
        </div>
        <div className="flex gap-4 items-center ml-auto">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with Firebase credentials
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="default"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none border-green-600 text-green-600 rounded-full"
            >
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button
              asChild
              size="default"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none bg-green-600 hover:bg-green-700 text-white rounded-full"
            >
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-6 w-full">
      {/* Navigation Menu */}
      <div>
        <MainNavigation />
      </div>
      
      {/* Authentication Section */}
      {user ? (
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-sm text-muted-foreground">
            Hey, {user.email || 'there'}!
          </span>
          <Button 
            type="button" 
            variant={"outline"} 
            size="sm"
            onClick={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 ml-auto">
          <Button 
            asChild 
            size="sm" 
            variant={"outline"}
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button 
            asChild 
            size="sm" 
            variant={"default"}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}