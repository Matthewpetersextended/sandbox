// components/sidebar/version-switcher.tsx

"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent"
            >
              <div className="bg-primary text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-[20px]">
                  auto_awesome
                </span>
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-bold text-[#0d101b] dark:text-white text-base">
                  Sandbox
                </span>
                <span className="text-xs text-sage-600 dark:text-emerald-400">
                  v{selectedVersion}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-sage-600 dark:text-emerald-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {versions.map((version) => (
              <DropdownMenuItem
                key={version}
                onSelect={() => setSelectedVersion(version)}
                className="cursor-pointer"
              >
                <span className="flex-1">v{version}</span>
                {version === selectedVersion && (
                  <Check className="ml-auto size-4 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}