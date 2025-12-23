// frontend/app/page.tsx
'use client';

import { useEffect, useState } from "react";
import { createClient } from "@/lib/firebase/auth";
import LandingPage from "@/components/website/Landing-page";
import HomePage from "@/app/(dashboard)/home/page";
import { User } from "firebase/auth";

export default function RootPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = createClient();

    // Get initial user state
    client.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If user is NOT authenticated, show the landing page
  if (!user) {
    return <LandingPage />;
  }

  // If user is authenticated, show the dashboard homepage
  return <HomePage />;
}