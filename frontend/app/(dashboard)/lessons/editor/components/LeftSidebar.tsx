//frontend/app/(dashboard)/lessons/editor/components/LeftSidebar.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, Grid3X3, LayoutGrid, ChevronLeft, Search, ChevronRight, Check } from 'lucide-react';
import { useEditorStore } from '@/app/(dashboard)/lessons/editor/store/useEditorStore';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

// Main menu structure
const mainMenuItems = [
  { id: 'back-to-files', label: 'Back to files', type: 'action' },
  { id: 'actions', label: 'Actions...', shortcut: '⌘K', type: 'action' },
  { id: 'divider-1', type: 'divider' },
  { 
    id: 'file', 
    label: 'File', 
    type: 'submenu',
    items: [
      { id: 'new-slides', label: 'New Slides', type: 'action' },
      { id: 'new', label: 'New', type: 'submenu', items: [] },
      { id: 'divider', type: 'divider' },
      { id: 'place-image', label: 'Place image...', shortcut: '⇧⌘K', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'save-local', label: 'Save local copy...', type: 'action' },
      { id: 'save-version', label: 'Save to version history...', shortcut: '⌥⌘S', type: 'action' },
      { id: 'show-version', label: 'Show version history', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'export', label: 'Export...', shortcut: '⇧⌘E', type: 'action', disabled: true },
      { id: 'export-slides', label: 'Export slides to...', type: 'action' },
    ]
  },
  { 
    id: 'edit', 
    label: 'Edit', 
    type: 'submenu',
    items: [
      { id: 'undo', label: 'Undo', shortcut: '⌘Z', type: 'action' },
      { id: 'redo', label: 'Redo', shortcut: '⇧⌘Z', type: 'action', disabled: true },
      { id: 'divider', type: 'divider' },
      { id: 'copy-as', label: 'Copy as', type: 'submenu', items: [] },
      { id: 'paste-over', label: 'Paste over selection', shortcut: '⇧⌘V', type: 'action' },
      { id: 'paste-replace', label: 'Paste to replace', shortcut: '⇧⌘R', type: 'action' },
      { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D', type: 'action' },
      { id: 'delete', label: 'Delete', shortcut: '⌫', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'find', label: 'Find', shortcut: '⌘F', type: 'action' },
      { id: 'find-next', label: 'Find next', shortcut: '⇧⌘F', type: 'action' },
      { id: 'find-previous', label: 'Find previous', shortcut: '⇧⌘D', type: 'action' },
      { id: 'find-replace', label: 'Find and replace...', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'select-all', label: 'Select all', shortcut: '⌘A', type: 'action' },
      { id: 'select-matching', label: 'Select matching layers', shortcut: '⌥⌘A', type: 'action', disabled: true },
      { id: 'select-none', label: 'Select none', shortcut: '⎋', type: 'action' },
      { id: 'select-inverse', label: 'Select inverse', shortcut: '⇧⌘A', type: 'action' },
      { id: 'select-all-with', label: 'Select all with', type: 'submenu', items: [] },
    ]
  },
  { 
    id: 'view', 
    label: 'View', 
    type: 'submenu',
    items: [
      { id: 'layout-guides', label: 'Layout guides', shortcut: '⇧G', type: 'action' },
      { id: 'rulers', label: 'Rulers', shortcut: '⇧R', type: 'action' },
      { id: 'comments', label: 'Comments', shortcut: '⇧C', type: 'toggle', checked: true },
      { id: 'outlines', label: 'Outlines', type: 'submenu', items: [] },
      { id: 'pixel-preview', label: 'Pixel preview', shortcut: '⇧⌘P', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'property-labels', label: 'Property labels', type: 'toggle', checked: true },
      { id: 'minimize-ui', label: 'Minimize UI', shortcut: '⇧⌘\\', type: 'action' },
      { id: 'show-hide-ui', label: 'Show/Hide UI', shortcut: '⌘\\', type: 'toggle', checked: true },
      { id: 'multiplayer-cursors', label: 'Multiplayer cursors', shortcut: '⌥⌘\\', type: 'toggle', checked: true },
      { id: 'enter-design-mode', label: 'Enter design mode', shortcut: '⇧D', type: 'action' },
      { id: 'divider', type: 'divider' },
      { id: 'zoom-in', label: 'Zoom in', shortcut: '⌘+', type: 'action' },
      { id: 'zoom-out', label: 'Zoom out', shortcut: '⌘-', type: 'action' },
      { id: 'zoom-100', label: 'Zoom to 100%', shortcut: '⌘0', type: 'action' },
      { id: 'zoom-fit', label: 'Zoom to fit', shortcut: '⇧1', type: 'action' },
      { id: 'zoom-selection', label: 'Zoom to selection', shortcut: '⇧2', type: 'action' },
    ]
  },
  { 
    id: 'object', 
    label: 'Object', 
    type: 'submenu',
    items: [
      { id: 'group', label: 'Group selection', shortcut: '⌘G', type: 'action' },
      { id: 'ungroup', label: 'Ungroup', shortcut: '⇧⌘G', type: 'action' },
      { id: 'frame-selection', label: 'Frame selection', shortcut: '⌥⌘G', type: 'action' },
    ]
  },
  { 
    id: 'text', 
    label: 'Text', 
    type: 'submenu',
    items: [
      { id: 'bold', label: 'Bold', shortcut: '⌘B', type: 'action' },
      { id: 'italic', label: 'Italic', shortcut: '⌘I', type: 'action' },
      { id: 'underline', label: 'Underline', shortcut: '⌘U', type: 'action' },
    ]
  },
  { 
    id: 'arrange', 
    label: 'Arrange', 
    type: 'submenu',
    items: [
      { id: 'bring-front', label: 'Bring to front', shortcut: '⌘]', type: 'action' },
      { id: 'send-back', label: 'Send to back', shortcut: '⌘[', type: 'action' },
      { id: 'bring-forward', label: 'Bring forward', shortcut: '⌥⌘]', type: 'action' },
      { id: 'send-backward', label: 'Send backward', shortcut: '⌥⌘[', type: 'action' },
    ]
  },
  { id: 'divider-2', type: 'divider' },
  { 
    id: 'plugins', 
    label: 'Plugins', 
    type: 'submenu',
    items: [
      { id: 'manage-plugins', label: 'Manage plugins...', type: 'action' },
    ]
  },
  { 
    id: 'preferences', 
    label: 'Preferences', 
    type: 'submenu',
    items: [
      { id: 'account-settings', label: 'Account settings', type: 'action' },
      { id: 'keyboard-shortcuts', label: 'Keyboard shortcuts', type: 'action' },
    ]
  },
  { id: 'libraries', label: 'Libraries', type: 'action' },
  { id: 'divider-3', type: 'divider' },
  { id: 'open-desktop', label: 'Open in desktop app', type: 'action' },
  { 
    id: 'help', 
    label: 'Help and account', 
    type: 'submenu',
    items: [
      { id: 'help-center', label: 'Help center', type: 'action' },
      { id: 'keyboard-shortcuts', label: 'Keyboard shortcuts', type: 'action' },
    ]
  },
] as const;

// Template packs with categories
const templatePacks = {
  recents: [
    { id: 'light-slides', name: 'Light slides', theme: 'light' },
  ],
  basic: [
    { id: 'light-slides', name: 'Light slides', theme: 'light' },
    { id: 'dark-slides', name: 'Dark slides', theme: 'dark' },
  ],
  vibes: [
    { id: 'mid-mod', name: 'Mid Mod', theme: 'vibes', accent: 'desert' },
    { id: 'lush-lux', name: 'Lush Lux', theme: 'vibes', accent: 'pink' },
    { id: 'bold-blobs', name: 'Bold Blobs', theme: 'vibes', accent: 'cream' },
    { id: 'clean-zine', name: 'Clean Zine', theme: 'vibes', accent: 'mint' },
  ],
};

// Slide template definitions with visual preview data
const slideTemplates = [
  { id: 'slide-deck-title', title: 'Slide Deck Title', subtitle: 'This is just the beginning of something big.' },
  { id: 'section-title', title: 'Section title', subtitle: '' },
  { id: 'section-left', title: 'Section Title', subtitle: 'Quick description about the section.', align: 'left' },
  { id: 'section-center', title: 'Section Title', subtitle: 'Quick description about the section.', align: 'center' },
  { id: 'section-bottom', title: 'Section Title', subtitle: 'Quick description about the section.', align: 'bottom' },
  { id: 'highlight', title: 'Highlight', subtitle: 'Use this slide to highlight a single important thing. To keep it short and sweet, you might link away to relevant doc or file.', align: 'right' },
  { id: 'simple-list', title: 'Simple list', items: ['First thing', 'Second thing', 'Third thing'] },
  { id: 'two-columns', title: 'Two columns', items: ['First thing', 'Second thing', 'Third thing', 'Fourth thing'] },
  { id: 'simple-list-3', title: 'Simple list', cols: 3, items: ['First thing', 'Second thing', 'Third thing'] },
  { id: 'simple-set-4', title: 'Simple Set', cols: 4, items: ['First thing', 'Second thing', 'Third thing', 'Fourth thing'] },
  { id: 'principles', title: 'Principles', cards: ['Principle 1', 'Principle 2', 'Principle 3'] },
  { id: 'header-grid', title: 'Header', hasGrid: true },
];

const SlideCard: React.FC<{
  index: number;
  isActive: boolean;
  isSelected?: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}> = ({ index, isActive, isSelected, title, subtitle, onClick }) => (
  <div
    onClick={onClick}
    className={cn(
      "relative cursor-pointer group",
      "transition-all duration-200"
    )}
  >
    <div className="flex items-start gap-2">
      <span className="text-xs text-muted-foreground mt-2 w-4 text-right">
        {index + 1}
      </span>
      <div
        className={cn(
          "flex-1 aspect-[16/10] rounded-md bg-slide p-3 transition-all",
          "border-2",
          isSelected ? "border-primary ring-2 ring-primary/20" : isActive ? "border-primary/50" : "border-transparent",
          "hover:border-muted-foreground/30"
        )}
      >
        <div className="text-[8px] font-bold text-slide-foreground truncate">
          {title}
        </div>
        <div className="text-[6px] text-muted-foreground mt-1 truncate">
          {subtitle}
        </div>
      </div>
    </div>
  </div>
);

export const LeftSidebar: React.FC = () => {
  const { slides, currentSlideIndex, setCurrentSlide, addSlide, deleteSlide } = useEditorStore();
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState('Untitled');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [dropdownView, setDropdownView] = useState<'packs' | 'templates'>('packs');
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard delete for selected slide
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedSlideIndex !== null) {
        // Don't delete if editing title or in an input field
        if (isEditingTitle || document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        deleteSlide(selectedSlideIndex);
        setSelectedSlideIndex(null);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlideIndex, isEditingTitle, deleteSlide]);

  // Close template dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowTemplateDropdown(false);
        setDropdownView('packs');
        setSelectedPack(null);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close main menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mainMenuRef.current && !mainMenuRef.current.contains(e.target as Node)) {
        setShowMainMenu(false);
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePackSelect = (packId: string) => {
    setSelectedPack(packId);
    setDropdownView('templates');
  };

  const handleBackToPacks = () => {
    setDropdownView('packs');
    setSelectedPack(null);
  };

  const getPackName = (packId: string) => {
    const allPacks = [...templatePacks.recents, ...templatePacks.basic, ...templatePacks.vibes];
    return allPacks.find(p => p.id === packId)?.name || 'Templates';
  };

  // Focus input when editing title
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTemplateSelect = (templateId: string) => {
    // Add slide with selected template (for now, just adds default slide)
    addSlide();
    setShowTemplateDropdown(false);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (!presentationTitle.trim()) {
      setPresentationTitle('Untitled');
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
      if (!presentationTitle.trim()) {
        setPresentationTitle('Untitled');
      }
    }
    if (e.key === 'Escape') {
      setIsEditingTitle(false);
    }
  };

  const handleMenuItemClick = (itemId: string) => {
    // Handle menu item actions here
    console.log('Menu item clicked:', itemId);
    setShowMainMenu(false);
    setActiveSubmenu(null);
  };

  return (
    <aside className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-1 relative" ref={mainMenuRef}>
          {/* Main Menu Button */}
          <button 
            onClick={() => setShowMainMenu(!showMainMenu)}
            className={cn(
              "flex items-center gap-2 p-1.5 rounded transition-colors",
              showMainMenu ? "bg-primary text-primary-foreground" : "hover:bg-sidebar-accent"
            )}
          >
            <Grid3X3 className="h-4 w-4" />
            <ChevronDown className={cn(
              "h-3 w-3 transition-transform",
              showMainMenu && "rotate-180"
            )} />
          </button>
          
          {/* Main Menu Dropdown */}
          {showMainMenu && (
            <div className="absolute top-full left-0 mt-1 w-52 bg-popover border border-border rounded-lg shadow-xl z-50">
              <div className="py-1">
                {mainMenuItems.map((item, index) => {
                  if (item.type === 'divider') {
                    return <div key={`divider-${index}`} className="h-px bg-border my-1" />;
                  }
                  
                  const hasSubmenu = item.type === 'submenu' && 'items' in item;
                  const isActive = activeSubmenu === item.id;
                  
                  return (
                    <div 
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => hasSubmenu && setActiveSubmenu(item.id)}
                      onMouseLeave={() => hasSubmenu && setActiveSubmenu(null)}
                    >
                      <button
                        onClick={() => !hasSubmenu && handleMenuItemClick(item.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-1.5 text-sm text-left transition-colors",
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground",
                          ('disabled' in item && item.disabled) ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        disabled={'disabled' in item && Boolean(item.disabled)}
                      >
                        <span>{item.label}</span>
                        <div className="flex items-center gap-2">
                          {'shortcut' in item && item.shortcut && (
                            <span className={cn(
                              "text-xs",
                              isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                            )}>{item.shortcut}</span>
                          )}
                          {hasSubmenu && <ChevronRight className="h-3 w-3" />}
                        </div>
                      </button>
                      
                      {/* Submenu */}
                      {hasSubmenu && isActive && 'items' in item && item.items.length > 0 && (
                        <div className="absolute left-full top-0 w-56 bg-popover border border-border rounded-lg shadow-xl ml-0.5">
                          <div className="py-1">
                            {item.items.map((subItem, subIndex) => {
                              if (subItem.type === 'divider') {
                                return <div key={`sub-divider-${subIndex}`} className="h-px bg-border my-1" />;
                              }
                              
                              return (
                                <button
                                  key={subItem.id}
                                  onClick={() => handleMenuItemClick(subItem.id)}
                                  className={cn(
                                    "w-full flex items-center justify-between px-3 py-1.5 text-sm text-left transition-colors",
                                    "hover:bg-accent text-foreground",
                                    'disabled' in subItem && subItem.disabled && "opacity-50 cursor-not-allowed"
                                  )}
                                  disabled={'disabled' in subItem && Boolean(subItem.disabled)}
                                >
                                  <div className="flex items-center gap-2">
                                    {'checked' in subItem && subItem.type === 'toggle' && (
                                      <Check className={cn(
                                        "h-3 w-3",
                                        subItem.checked ? "opacity-100" : "opacity-0"
                                      )} />
                                    )}
                                    <span>{subItem.label}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {'shortcut' in subItem && subItem.shortcut && (
                                      <span className="text-xs text-muted-foreground">{subItem.shortcut}</span>
                                    )}
                                    {subItem.type === 'submenu' && <ChevronRight className="h-3 w-3" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-sidebar-accent transition-colors">
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded hover:bg-sidebar-accent transition-colors">
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={presentationTitle}
              onChange={(e) => setPresentationTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="w-full text-sm font-medium text-foreground bg-transparent border border-primary rounded px-1 py-0.5 outline-none"
            />
          ) : (
            <button
              onClick={handleTitleClick}
              className="flex items-center gap-2 hover:bg-sidebar-accent rounded px-1 py-0.5 -ml-1 transition-colors"
            >
              <h2 className="text-sm font-medium text-foreground">{presentationTitle}</h2>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">Drafts</span>
          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-badge-free/20 text-badge-free rounded">
            Free
          </span>
        </div>
      </div>

      {/* New Slide Buttons - Split */}
      <div className="p-3 relative" ref={dropdownRef}>
        <div className="flex items-center gap-0.5">
          {/* Dropdown Button */}
          <button
            onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
            className={cn(
              "flex-1 flex items-center justify-between h-9 px-3 text-sm",
              "bg-transparent border border-border rounded-l-md",
              "hover:bg-accent transition-colors",
              "text-foreground"
            )}
          >
            <span>New slide</span>
            <ChevronDown className={cn(
              "h-3 w-3 text-muted-foreground transition-transform",
              showTemplateDropdown && "rotate-180"
            )} />
          </button>
          
          {/* Quick Add Button */}
          <button
            onClick={addSlide}
            className={cn(
              "h-9 w-9 flex items-center justify-center",
              "bg-transparent border border-l-0 border-border rounded-r-md",
              "hover:bg-accent transition-colors"
            )}
          >
            <Plus className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Template Dropdown - Full Panel */}
        {showTemplateDropdown && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/20" 
              onClick={() => {
                setShowTemplateDropdown(false);
                setDropdownView('packs');
                setSelectedPack(null);
                setSearchQuery('');
              }}
            />
            
            {/* Template Panel */}
            <div className="relative ml-60 w-[500px] h-full bg-popover border-r border-border shadow-2xl animate-in slide-in-from-left-2">
              {/* Template Packs View */}
              {dropdownView === 'packs' && (
                <>
                  {/* Search Header */}
                  <div className="px-4 py-3 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search templates"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 bg-muted/50 border-0"
                      />
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[calc(100%-60px)]">
                    <div className="p-4 space-y-6">
                      {/* Recents */}
                      <div>
                        <h3 className="text-sm font-medium text-foreground mb-3">Recents</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {templatePacks.recents.map((pack) => (
                            <button
                              key={pack.id}
                              onClick={() => handlePackSelect(pack.id)}
                              className="group aspect-[16/10] bg-white rounded-lg border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden"
                            >
                              <div className="w-full h-full p-4 flex flex-col justify-end">
                                <div className="text-[10px] font-bold text-black">Slide Deck Title</div>
                                <div className="text-[6px] text-gray-500">This is just the beginning of something big.</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Light slides</p>
                      </div>

                      {/* Basic */}
                      <div>
                        <h3 className="text-sm font-medium text-foreground mb-3">Basic</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {templatePacks.basic.map((pack) => (
                            <button
                              key={`basic-${pack.id}`}
                              onClick={() => handlePackSelect(pack.id)}
                              className={cn(
                                "group aspect-[16/10] rounded-lg border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden",
                                pack.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                              )}
                            >
                              <div className="w-full h-full p-4 flex flex-col justify-end">
                                <div className={cn(
                                  "text-[10px] font-bold",
                                  pack.theme === 'dark' ? 'text-white' : 'text-black'
                                )}>Slide Deck Title</div>
                                <div className={cn(
                                  "text-[6px]",
                                  pack.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                )}>This is just the beginning of something big.</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-2">
                          <p className="text-sm text-muted-foreground">Light slides</p>
                          <p className="text-sm text-muted-foreground">Dark slides</p>
                        </div>
                      </div>

                      {/* Vibes */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-foreground">Vibes</h3>
                          <button className="text-sm text-primary hover:underline">See all</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {templatePacks.vibes.map((pack) => (
                            <button
                              key={pack.id}
                              onClick={() => handlePackSelect(pack.id)}
                              className={cn(
                                "group aspect-[16/10] rounded-lg border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden",
                                pack.accent === 'desert' ? 'bg-amber-100' : '',
                                pack.accent === 'pink' ? 'bg-pink-200' : '',
                                pack.accent === 'cream' ? 'bg-amber-50' : '',
                                pack.accent === 'mint' ? 'bg-emerald-100' : ''
                              )}
                            >
                              <div className="w-full h-full p-3 flex flex-col justify-center items-center">
                                <div className={cn(
                                  "text-sm font-bold uppercase tracking-wide",
                                  pack.accent === 'pink' ? 'text-pink-800' : 'text-gray-800'
                                )}>{pack.name}</div>
                                <div className="text-[6px] text-gray-600 mt-1">A quick description of what's to come</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          {templatePacks.vibes.map((pack) => (
                            <p key={`label-${pack.id}`} className="text-sm text-muted-foreground">{pack.name}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </>
              )}

              {/* Individual Templates View */}
              {dropdownView === 'templates' && (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleBackToPacks}
                        className="p-1 hover:bg-accent rounded transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <span className="text-sm text-foreground">
                        Templates / <span className="font-medium">{getPackName(selectedPack || '')}</span>
                        <span className="text-muted-foreground ml-1">by Figma</span>
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        slideTemplates.forEach(t => handleTemplateSelect(t.id));
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-accent hover:bg-accent/80 rounded-md transition-colors"
                    >
                      Add all slides
                    </button>
                  </div>
                  
                  {/* Templates Grid */}
                  <ScrollArea className="h-[calc(100%-52px)]">
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {slideTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template.id)}
                          className={cn(
                            "group aspect-[16/10] rounded-lg border border-border hover:border-primary hover:shadow-md transition-all overflow-hidden",
                            selectedPack === 'dark-slides' ? 'bg-gray-900' : 'bg-white'
                          )}
                        >
                          <div className="w-full h-full p-3 flex flex-col">
                            {/* Slide Deck Title */}
                            {template.id === 'slide-deck-title' && (
                              <div className="flex flex-col justify-center h-full bg-muted/30 rounded -m-1 p-2">
                                <div className={cn("text-[10px] font-bold", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className={cn("text-[6px] mt-0.5", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>{template.subtitle}</div>
                              </div>
                            )}
                            
                            {/* Section Title - Simple */}
                            {template.id === 'section-title' && (
                              <div className="flex items-center justify-center h-full">
                                <div className={cn("text-[10px] font-medium", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                              </div>
                            )}
                            
                            {/* Section with align left */}
                            {template.id === 'section-left' && (
                              <div className="flex flex-col justify-end h-full pb-2">
                                <div className={cn("text-[8px] font-medium", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>{template.subtitle}</div>
                              </div>
                            )}
                            
                            {/* Section center */}
                            {template.id === 'section-center' && (
                              <div className="flex flex-col items-center justify-center h-full">
                                <div className={cn("text-[8px] font-medium", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>{template.subtitle}</div>
                              </div>
                            )}
                            
                            {/* Section bottom */}
                            {template.id === 'section-bottom' && (
                              <div className="flex flex-col justify-end h-full">
                                <div className={cn("text-[5px] mb-0.5", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>{template.subtitle}</div>
                                <div className={cn("text-[8px] font-medium", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                              </div>
                            )}
                            
                            {/* Highlight */}
                            {template.id === 'highlight' && (
                              <div className="flex flex-col justify-center items-end h-full text-right pr-1">
                                <div className={cn("text-[8px] font-medium", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className={cn("text-[4px] max-w-[60%]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>{template.subtitle}</div>
                              </div>
                            )}
                            
                            {/* Simple list */}
                            {template.id === 'simple-list' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 flex flex-col justify-center gap-0.5">
                                  {template.items?.map((item, i) => (
                                    <div key={i} className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-600')}>{item}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Two columns */}
                            {template.id === 'two-columns' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 grid grid-cols-2 gap-1">
                                  {template.items?.map((item, i) => (
                                    <div key={i} className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-600')}>{item}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Simple list 3 cols */}
                            {template.id === 'simple-list-3' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 grid grid-cols-3 gap-1">
                                  {template.items?.map((item, i) => (
                                    <div key={i} className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-600')}>{item}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Simple set 4 cols */}
                            {template.id === 'simple-set-4' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 grid grid-cols-4 gap-1">
                                  {template.items?.map((item, i) => (
                                    <div key={i} className={cn("text-[5px]", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-600')}>{item}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Principles */}
                            {template.id === 'principles' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 grid grid-cols-3 gap-1">
                                  {template.cards?.map((card, i) => (
                                    <div key={i} className={cn("rounded-sm p-1 flex flex-col", selectedPack === 'dark-slides' ? 'bg-blue-900/50' : 'bg-blue-50')}>
                                      <div className={cn("text-[5px] font-medium", selectedPack === 'dark-slides' ? 'text-blue-300' : 'text-blue-600')}>{card}</div>
                                      <div className={cn("text-[4px] mt-auto", selectedPack === 'dark-slides' ? 'text-gray-400' : 'text-gray-500')}>This is what we believe.</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Header with grid */}
                            {template.id === 'header-grid' && (
                              <div className="flex flex-col h-full">
                                <div className={cn("text-[6px] font-medium mb-1", selectedPack === 'dark-slides' ? 'text-white' : 'text-black')}>{template.title}</div>
                                <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-0.5">
                                  {Array.from({ length: 8 }).map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={cn(
                                        "rounded-sm",
                                        selectedPack === 'dark-slides' 
                                          ? (i % 2 === 0 ? "bg-gray-700" : "bg-gray-600")
                                          : (i % 2 === 0 ? "bg-gray-100" : "bg-gray-200")
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Slides List */}
      <div 
        ref={slidesContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
        tabIndex={0}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          // If clicking the container (not a slide), deselect
          if (e.currentTarget === slidesContainerRef.current) {
            setSelectedSlideIndex(null);
          }
        }}
      >
        {slides.map((slide, index) => {
          const titleEl = slide.elements.find(el => el.id.includes('title'));
          const subtitleEl = slide.elements.find(el => el.id.includes('subtitle'));
          
          return (
            <SlideCard
              key={slide.id}
              index={index}
              isActive={currentSlideIndex === index}
              isSelected={selectedSlideIndex === index}
              title={titleEl?.content || 'Untitled Slide'}
              subtitle={subtitleEl?.content || ''}
              onClick={() => {
                setCurrentSlide(index);
                setSelectedSlideIndex(index);
              }}
            />
          );
        })}
      </div>
    </aside>
  );
};