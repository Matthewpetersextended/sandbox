//frontend/app/(dashboard)/lessons/editor/components/RightSidebar.tsx

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Monitor, Check, ChevronDown, Square, Grid3X3, Image, Play, Link, Command, Option, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '../store/useEditorStore';
import { TextToolsPanel } from '../components/TextToolPanel';
import { BackgroundToolsPanel } from '../components/BackgroundToolsPanel';
import { Input } from '@/components/ui/input';
import { ShareDialog } from '../components/ShareDialog';

type TabType = 'design' | 'animate';
type BackgroundType = 'solid' | 'gradient' | 'image';

const transitionOptions = [
  { id: 'none', label: 'None' },
  { id: 'smart-animate', label: 'Smart animate' },
  { id: 'dissolve', label: 'Dissolve' },
  { id: 'push', label: 'Push' },
  { id: 'slide-in', label: 'Slide in' },
  { id: 'slide-out', label: 'Slide out' },
  { id: 'move-in', label: 'Move in' },
  { id: 'move-out', label: 'Move out' },
];

const templateStyles = [
  { id: 'light', label: 'Light slides', font: 'Inter', colors: ['#e5e5e5', '#64748b', '#0ea5e9'] },
  { id: 'dark', label: 'Dark slides', font: 'Inter', colors: ['#1e293b', '#475569', '#3b82f6'] },
  { id: 'warm', label: 'Warm slides', font: 'Georgia', colors: ['#fef3c7', '#f59e0b', '#dc2626'] },
  { id: 'cool', label: 'Cool slides', font: 'Arial', colors: ['#e0f2fe', '#0284c7', '#7c3aed'] },
];

const textStyles = [
  { id: 'title', label: 'Title', font: 'Inter', size: 96, weight: '700' },
  { id: 'header1', label: 'Header 1', font: 'Inter', size: 60, weight: '700' },
  { id: 'header2', label: 'Header 2', font: 'Inter', size: 48, weight: '600' },
  { id: 'header3', label: 'Header 3', font: 'Inter', size: 36, weight: '600' },
  { id: 'body1', label: 'Body 1', font: 'Inter', size: 36, weight: '400' },
  { id: 'body2', label: 'Body 2', font: 'Inter', size: 30, weight: '400' },
  { id: 'body3', label: 'Body 3', font: 'Inter', size: 24, weight: '400' },
  { id: 'note', label: 'Note', font: 'Inter', size: 20, weight: '400' },
];

const templateColors = [
  '#1a1a1a', '#ffffff', '#d4d4d4', '#a3a3a3', '#f9a8d4', '#f472b6', '#fb923c',
  '#fb7185', '#f87171', '#fdba74', '#fbbf24', '#facc15', '#a3e635', '#4ade80',
  '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8', '#60a5fa', '#818cf8', '#a78bfa',
  '#c084fc', '#e879f9', '#f0abfc',
];

const backgroundColors = [
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'light-gray', label: 'Light gray', color: '#f1f5f9' },
  { id: 'dark', label: 'Dark', color: '#1e293b' },
  { id: 'black', label: 'Black', color: '#000000' },
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
  { id: 'green', label: 'Green', color: '#22c55e' },
];

const zoomPresets = [50, 100, 200];

const zoomOptions = [
  { id: 'pixel-grid', label: 'Pixel grid', checked: true },
  { id: 'snap-to-grid', label: 'Snap to pixel grid', checked: true, shortcut: '⇧⌘\'' },
  { id: 'multiplayer', label: 'Multiplayer cursors', checked: true, shortcut: '⌥⌘\\' },
  { id: 'property-labels', label: 'Property labels', checked: true },
  { id: 'comments', label: 'Comments', checked: true, shortcut: '⇧C' },
];

export const RightSidebar: React.FC = () => {
  const { selectedElementId, slides, currentSlideIndex, zoomLevel, setZoomLevel, backgroundSelected } = useEditorStore();
  const [activeTab, setActiveTab] = useState<TabType>('design');
  const [selectedTransition, setSelectedTransition] = useState('none');
  const [showTransitionDropdown, setShowTransitionDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('light');
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('solid');
  const [selectedBgColor, setSelectedBgColor] = useState('white');
  const [showBgColorDropdown, setShowBgColorDropdown] = useState(false);
  const [showPresentDropdown, setShowPresentDropdown] = useState(false);
  const [showZoomDropdown, setShowZoomDropdown] = useState(false);
  const [zoomInputValue, setZoomInputValue] = useState(zoomLevel.toString());
  const [zoomOptionsState, setZoomOptionsState] = useState(zoomOptions);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Get selected element
  const currentSlide = slides[currentSlideIndex];
  const selectedElement = currentSlide?.elements.find(el => el.id === selectedElementId);
  const isTextElementSelected = selectedElement?.type === 'text';
  const isBackgroundSelected = backgroundSelected && !selectedElementId;
  
  const transitionDropdownRef = useRef<HTMLDivElement>(null);
  const templateDropdownRef = useRef<HTMLDivElement>(null);
  const bgColorDropdownRef = useRef<HTMLDivElement>(null);
  const presentDropdownRef = useRef<HTMLDivElement>(null);
  const zoomDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (transitionDropdownRef.current && !transitionDropdownRef.current.contains(e.target as Node)) {
        setShowTransitionDropdown(false);
      }
      if (templateDropdownRef.current && !templateDropdownRef.current.contains(e.target as Node)) {
        setShowTemplateDropdown(false);
      }
      if (bgColorDropdownRef.current && !bgColorDropdownRef.current.contains(e.target as Node)) {
        setShowBgColorDropdown(false);
      }
      if (presentDropdownRef.current && !presentDropdownRef.current.contains(e.target as Node)) {
        setShowPresentDropdown(false);
      }
      if (zoomDropdownRef.current && !zoomDropdownRef.current.contains(e.target as Node)) {
        setShowZoomDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync zoom input with zoom level
  useEffect(() => {
    setZoomInputValue(zoomLevel.toString());
  }, [zoomLevel]);

  const selectedTransitionLabel = transitionOptions.find(t => t.id === selectedTransition)?.label || 'None';
  const selectedTemplateData = templateStyles.find(t => t.id === selectedTemplate);
  const selectedBgColorData = backgroundColors.find(c => c.id === selectedBgColor);

  const handlePresent = (mode: 'present' | 'present-notes') => {
    // TODO: Implement presentation mode
    console.log('Present mode:', mode);
    setShowPresentDropdown(false);
  };

  const handleCopyLink = () => {
    // TODO: Implement copy link
    console.log('Copy presentation link');
    setShowPresentDropdown(false);
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 400));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 10));
  };

  const handleZoomToFit = () => {
    setZoomLevel(100);
  };

  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomInputValue(e.target.value);
  };

  const handleZoomInputBlur = () => {
    const value = parseInt(zoomInputValue);
    if (!isNaN(value) && value >= 10 && value <= 400) {
      setZoomLevel(value);
    } else {
      setZoomInputValue(zoomLevel.toString());
    }
  };

  const handleZoomInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleZoomInputBlur();
    }
  };

  const toggleZoomOption = (optionId: string) => {
    setZoomOptionsState(prev => 
      prev.map(opt => opt.id === optionId ? { ...opt, checked: !opt.checked } : opt)
    );
  };

  return (
    <aside className="w-64 bg-sidebar border-l border-sidebar-border flex flex-col h-full">
      {/* Header with Share */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
            M
          </div>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative" ref={presentDropdownRef}>
            <button 
              onClick={() => setShowPresentDropdown(!showPresentDropdown)}
              className="p-2 rounded hover:bg-sidebar-accent transition-colors border border-border"
            >
              <Play className="h-4 w-4 text-muted-foreground" />
            </button>

            {/* Present Dropdown */}
            {showPresentDropdown && (
              <div className="absolute top-full right-0 mt-2 w-[360px] bg-popover border border-border rounded-2xl shadow-xl z-50 p-4 animate-scale-in">
                <div className="grid grid-cols-2 gap-3">
                  {/* Present Option */}
                  <button
                    onClick={() => handlePresent('present')}
                    className="text-left p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <h4 className="text-sm font-medium text-foreground mb-1">Present</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⌥</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⌘</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⏎</span>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg border border-border" />
                    <p className="text-xs text-muted-foreground mt-3">
                      Play your slides in order, one by one—perfect for sharing your deck.
                    </p>
                  </button>

                  {/* Present + Notes Option */}
                  <button
                    onClick={() => handlePresent('present-notes')}
                    className="text-left p-4 rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <h4 className="text-sm font-medium text-foreground mb-1">Present + Notes</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⇧</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⌥</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⌘</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px]">⏎</span>
                    </div>
                    <div className="aspect-video bg-foreground rounded-lg flex items-center">
                      <div className="w-1/2 h-3/4 bg-background rounded m-2" />
                      <div className="w-1/2 flex flex-col gap-1 p-2">
                        <div className="h-1.5 w-full bg-muted-foreground/50 rounded" />
                        <div className="h-1.5 w-3/4 bg-muted-foreground/50 rounded" />
                        <div className="h-1.5 w-2/3 bg-muted-foreground/50 rounded" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      Open two views: one for your deck, and one for your notes.
                    </p>
                  </button>
                </div>

                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  <Link className="h-4 w-4" />
                  Copy presentation link
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => setShowShareDialog(true)}
            className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Share
          </button>
        </div>

        {/* Share Dialog */}
        <ShareDialog open={showShareDialog} onOpenChange={setShowShareDialog} />
      </div>

      {/* Tabs */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('design')}
            className={cn(
              "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeTab === 'design'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Design
          </button>
          <button
            onClick={() => setActiveTab('animate')}
            className={cn(
              "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeTab === 'animate'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Animate
          </button>
        </div>
        
        {/* Zoom Dropdown */}
        <div className="relative flex items-center justify-end mt-3" ref={zoomDropdownRef}>
          <button
            onClick={() => setShowZoomDropdown(!showZoomDropdown)}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-accent transition-colors"
          >
            <span className="text-sm text-muted-foreground">{zoomLevel}%</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showZoomDropdown && (
            <div className="absolute top-full right-0 mt-1 w-[200px] bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-scale-in">
              {/* Zoom Input */}
              <div className="px-3 py-2">
                <Input
                  value={zoomInputValue}
                  onChange={handleZoomInputChange}
                  onBlur={handleZoomInputBlur}
                  onKeyDown={handleZoomInputKeyDown}
                  className="h-8 text-sm bg-muted border-border"
                  placeholder="Zoom %"
                />
              </div>

              {/* Zoom Actions */}
              <div className="border-t border-border">
                <button
                  onClick={handleZoomIn}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  <span>Zoom in</span>
                  <span className="text-xs text-muted-foreground">⌘+</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  <span>Zoom out</span>
                  <span className="text-xs text-muted-foreground">⌘−</span>
                </button>
                <button
                  onClick={handleZoomToFit}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                >
                  <span>Zoom to fit</span>
                  <span className="text-xs text-muted-foreground">⇧1</span>
                </button>
                {zoomPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setZoomLevel(preset)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    <span>Zoom to {preset}%</span>
                    {preset === 100 && <span className="text-xs text-muted-foreground">⇧0</span>}
                  </button>
                ))}
              </div>

              {/* Toggle Options */}
              <div className="border-t border-border pt-1">
                {zoomOptionsState.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleZoomOption(option.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {option.checked && <Check className="h-3 w-3 text-foreground" />}
                      {!option.checked && <div className="w-3" />}
                      <span>{option.label}</span>
                    </div>
                    {option.shortcut && (
                      <span className="text-xs text-muted-foreground">{option.shortcut}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'design' ? (
        <>
          {/* Show text tools when text element is selected */}
          {isTextElementSelected && selectedElement ? (
            <div className="p-4 flex-1 overflow-y-auto">
              <TextToolsPanel selectedElement={selectedElement} />
            </div>
          ) : isBackgroundSelected ? (
            <div className="p-4 flex-1 overflow-y-auto">
              {/* Slide Title */}
              <h3 className="text-base font-medium text-foreground mb-4">Slide {currentSlideIndex + 1}</h3>
              
              {/* Template Style - Still show when background is selected */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-foreground mb-3">Template style</h3>
                
                <div className="relative" ref={templateDropdownRef}>
                  <button
                    onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                    className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
                  >
                    {/* Color preview squares */}
                    <div className="flex gap-0.5">
                      {selectedTemplateData?.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-8 first:rounded-l last:rounded-r"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-foreground">{selectedTemplateData?.label}</div>
                      <div className="text-xs text-muted-foreground">{selectedTemplateData?.font}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Background Tools Panel */}
              <BackgroundToolsPanel />
            </div>
          ) : (
            <>
              {/* Slide Title */}
              <div className="p-4 border-b border-sidebar-border">
                <h3 className="text-base font-medium text-foreground">Slide {currentSlideIndex + 1}</h3>
              </div>

              {/* Template Style */}
              <div className="p-4 border-b border-sidebar-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Template style</h3>
            
            <div className="relative" ref={templateDropdownRef}>
              <button
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                {/* Color preview squares */}
                <div className="flex gap-0.5">
                  {selectedTemplateData?.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-4 h-8 first:rounded-l last:rounded-r"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-foreground">{selectedTemplateData?.label}</div>
                  <div className="text-xs text-muted-foreground">{selectedTemplateData?.font}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Template Dropdown - Expanded Panel */}
              {showTemplateDropdown && (
                <div className="absolute top-full left-0 mt-1 w-[280px] bg-popover border border-border rounded-xl shadow-xl z-50 animate-scale-in max-h-[400px] overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <span className="text-sm font-medium text-foreground">{selectedTemplateData?.label}</span>
                    <button
                      onClick={() => setShowTemplateDropdown(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Text Styles Section */}
                  <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground">Text styles</span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {textStyles.map((style) => (
                        <button
                          key={style.id}
                          className="flex items-center justify-between w-full py-1.5 hover:bg-accent rounded px-2 -mx-2 transition-colors"
                        >
                          <span 
                            className="text-foreground"
                            style={{ 
                              fontSize: style.id === 'title' ? '24px' : 
                                       style.id === 'header1' ? '20px' :
                                       style.id === 'header2' ? '18px' :
                                       style.id === 'header3' ? '16px' : '14px',
                              fontWeight: style.weight 
                            }}
                          >
                            {style.label}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {style.font} · {style.size}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Section */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground">Colors</span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {templateColors.map((color, i) => (
                        <button
                          key={i}
                          className="w-7 h-7 rounded-md border border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Background */}
          <div className="p-4 flex-1">
            <h3 className="text-sm font-medium text-foreground mb-3">Background</h3>
            
            {/* Background Type Toggle */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-lg mb-3">
              <button
                onClick={() => setBackgroundType('solid')}
                className={cn(
                  "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
                  backgroundType === 'solid'
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                )}
              >
                <Square className="h-4 w-4 text-foreground" />
              </button>
              <button
                onClick={() => setBackgroundType('gradient')}
                className={cn(
                  "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
                  backgroundType === 'gradient'
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                )}
              >
                <Grid3X3 className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => setBackgroundType('image')}
                className={cn(
                  "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
                  backgroundType === 'image'
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                )}
              >
                <Image className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Color Dropdown */}
            <div className="relative" ref={bgColorDropdownRef}>
              <button
                onClick={() => setShowBgColorDropdown(!showBgColorDropdown)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                <div
                  className="w-5 h-5 rounded border border-border"
                  style={{ backgroundColor: selectedBgColorData?.color }}
                />
                <span className="flex-1 text-left text-sm text-foreground">{selectedBgColorData?.label}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Color Dropdown */}
              {showBgColorDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-scale-in">
                  {backgroundColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => {
                        setSelectedBgColor(color.id);
                        setShowBgColorDropdown(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors",
                        selectedBgColor === color.id
                          ? "bg-accent"
                          : "hover:bg-accent"
                      )}
                    >
                      <div
                        className="w-4 h-4 rounded border border-border"
                        style={{ backgroundColor: color.color }}
                      />
                      <span className="flex-1 text-left text-foreground">{color.label}</span>
                      {selectedBgColor === color.id && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Slide Transition */}
          <div className="p-4 border-b border-sidebar-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Slide transition</h3>
            
            {/* Selected Transition Display */}
            <div className="relative" ref={transitionDropdownRef}>
              <button 
                onClick={() => setShowTransitionDropdown(!showTransitionDropdown)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
              >
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 text-left text-sm text-foreground">
                  {selectedTransitionLabel}
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  showTransitionDropdown && "rotate-180"
                )} />
              </button>

              {/* Dropdown Menu */}
              {showTransitionDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 py-1 animate-scale-in">
                  {transitionOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedTransition(option.id);
                        setShowTransitionDropdown(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors",
                        selectedTransition === option.id
                          ? "bg-accent"
                          : "hover:bg-accent"
                      )}
                    >
                      <span className="w-4">
                        {selectedTransition === option.id && <Check className="h-4 w-4 text-primary" />}
                      </span>
                      <span className="text-foreground">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Object Animations */}
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-foreground">Object animations</h3>
              <button className="p-1 rounded hover:bg-accent transition-colors">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Select an object on the slide, then click the add button to animate it.
            </p>
          </div>
        </>
      )}
    </aside>
  );
};
