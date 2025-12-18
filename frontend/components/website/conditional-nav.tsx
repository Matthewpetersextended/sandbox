// components/conditional-nav.tsx
"use client";

import ClientHeaderAuth from "@/components/website/client-header-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ConditionalNav() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  if (!isHomepage) return null;

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 pr-5 pl-2 text-sm">
        <div className="flex gap-5 items-center font-semibold -ml-3">
          <Link href="/" className="flex items-center">
            <img
              src="/TeacherPro2.0.png"
              alt="Teacher Pro"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <ClientHeaderAuth />
      </div>
    </nav>
  );
}