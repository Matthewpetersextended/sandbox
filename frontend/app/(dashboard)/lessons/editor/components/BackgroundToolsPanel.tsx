import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Eye, EyeOff, Minus, Plus, Grid3X3, X, Upload, Video, ImageIcon, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore, SlideBackground } from '../store/useEditorStore';
import { Slider } from '@/components/ui/slider';

type FillType = 'color' | 'image' | 'video';

const fillTypeIcons = [
  { type: 'color' as FillType, icon: Palette, label: 'Solid color' },
  { type: 'image' as FillType, icon: ImageIcon, label: 'Image' },
  { type: 'video' as FillType, icon: Video, label: 'Video' },
];

const presetColors = [
  '#000000', '#1a1a1a', '#4a4a4a', '#737373', '#f472b6', '#fb7185', '#fb923c',
  '#facc15', '#4ade80', '#22d3ee', '#3b82f6', '#8b5cf6', '#d946ef', '#f9fafb',
];

export const BackgroundToolsPanel: React.FC = () => {
  const { slides, currentSlideIndex, slideBackgrounds, updateSlideBackground } = useEditorStore();
  const currentSlide = slides[currentSlideIndex];
  
  const background = slideBackgrounds[currentSlide?.id] || { type: 'color', value: '#ffffff', opacity: 100 };
  
  const [showFillDropdown, setShowFillDropdown] = useState(false);
  const [selectedFillType, setSelectedFillType] = useState<FillType>(background.type);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hexValue, setHexValue] = useState(background.value.replace('#', '').toUpperCase());
  const [isVisible, setIsVisible] = useState(true);
  
  const fillDropdownRef = useRef<HTMLDivElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fillDropdownRef.current && !fillDropdownRef.current.contains(e.target as Node)) {
        setShowFillDropdown(false);
      }
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFillTypeChange = (type: FillType) => {
    setSelectedFillType(type);
    updateSlideBackground(currentSlide.id, { type });
    setShowFillDropdown(false);
  };

  const handleColorChange = (color: string) => {
    const hex = color.replace('#', '').toUpperCase();
    setHexValue(hex);
    updateSlideBackground(currentSlide.id, { value: `#${hex}`, type: 'color' });
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace('#', '').toUpperCase();
    setHexValue(value);
    if (/^[0-9A-F]{6}$/i.test(value)) {
      updateSlideBackground(currentSlide.id, { value: `#${value}` });
    }
  };

  const handleOpacityChange = (value: number[]) => {
    updateSlideBackground(currentSlide.id, { opacity: value[0] });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updateSlideBackground(currentSlide.id, { value: dataUrl, type: 'image' });
      };
      reader.readAsDataURL(file);
    }
  };

  const getFillDisplayValue = () => {
    if (selectedFillType === 'color') {
      return hexValue;
    } else if (selectedFillType === 'image') {
      return 'Image';
    } else {
      return 'Video';
    }
  };

  return (
    <div className="space-y-4">
      {/* Fill Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Fill</h3>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-accent transition-colors">
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1 rounded hover:bg-accent transition-colors">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Fill Type Button */}
        <div className="relative" ref={fillDropdownRef}>
          <button
            onClick={() => setShowFillDropdown(!showFillDropdown)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            {selectedFillType === 'color' && (
              <div
                className="w-5 h-5 border border-border"
                style={{ backgroundColor: `#${hexValue}` }}
              />
            )}
            {selectedFillType === 'image' && (
              <div className="w-5 h-5 rounded border border-border bg-muted flex items-center justify-center">
                <ImageIcon className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
            {selectedFillType === 'video' && (
              <div className="w-5 h-5 rounded border border-border bg-muted flex items-center justify-center">
                <Video className="h-3 w-3 text-muted-foreground" />
              </div>
            )}
            <span className="flex-1 text-left text-sm text-foreground">{getFillDisplayValue()}</span>
            <span className="text-sm text-muted-foreground">{background.opacity}%</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(!isVisible);
              }}
              className="p-1 hover:bg-accent rounded"
            >
              {isVisible ? (
                <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                updateSlideBackground(currentSlide.id, { value: '#ffffff', type: 'color', opacity: 100 });
                setHexValue('FFFFFF');
                setSelectedFillType('color');
              }}
              className="p-1 hover:bg-accent rounded"
            >
              <Minus className="h-4 w-4 text-muted-foreground" />
            </button>
          </button>

          {/* Fill Dropdown */}
          {showFillDropdown && (
            <div className="absolute top-full left-0 mt-2 w-[280px] bg-popover border border-border rounded-xl shadow-xl z-50 animate-scale-in overflow-hidden">
              {/* Header Tabs */}
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1.5 text-sm font-medium text-foreground bg-accent rounded-md">
                    Custom
                  </button>
                  <button className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                    Libraries
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-accent rounded">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => setShowFillDropdown(false)}
                    className="p-1 hover:bg-accent rounded"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Fill Type Icons */}
              <div className="flex items-center justify-center gap-2 p-3 border-b border-border">
                {fillTypeIcons.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => handleFillTypeChange(type)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      selectedFillType === type
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50"
                    )}
                    title={label}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>

              {/* Content based on fill type */}
              <div className="p-3">
                {selectedFillType === 'color' && (
                  <>
                    {/* Color Picker Area */}
                    <div 
                      className="relative w-full h-40 rounded-lg mb-3 cursor-crosshair"
                      style={{
                        background: `linear-gradient(to bottom, transparent, black), linear-gradient(to right, white, hsl(${getHueFromHex(hexValue)}, 100%, 50%))`,
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
                        const newColor = hsvToHex(getHueFromHex(hexValue), x * 100, (1 - y) * 100);
                        handleColorChange(newColor);
                      }}
                    >
                      <div 
                        className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg -translate-x-1/2 -translate-y-1/2"
                        style={{ 
                          left: `${getSaturationFromHex(hexValue)}%`,
                          top: `${100 - getBrightnessFromHex(hexValue)}%`,
                          backgroundColor: `#${hexValue}`
                        }}
                      />
                    </div>

                    {/* Hue Slider */}
                    <div 
                      className="relative w-full h-3 rounded-full mb-3 cursor-pointer"
                      style={{
                        background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        const hue = x * 360;
                        const newColor = hsvToHex(hue, getSaturationFromHex(hexValue), getBrightnessFromHex(hexValue));
                        handleColorChange(newColor);
                      }}
                    >
                      <div 
                        className="absolute w-4 h-4 bg-white border-2 border-white rounded-full shadow-lg -translate-x-1/2 top-1/2 -translate-y-1/2"
                        style={{ left: `${(getHueFromHex(hexValue) / 360) * 100}%` }}
                      />
                    </div>

                    {/* Opacity Slider */}
                    <div className="mb-3">
                      <Slider
                        value={[background.opacity]}
                        onValueChange={handleOpacityChange}
                        min={0}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* Hex Input */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-muted">
                        <span className="text-xs text-muted-foreground">Hex</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        value={hexValue}
                        onChange={handleHexInputChange}
                        className="flex-1 px-2 py-1.5 text-sm bg-muted border-none rounded-md text-foreground outline-none"
                        maxLength={6}
                      />
                      <span className="text-sm text-muted-foreground">{background.opacity}%</span>
                    </div>

                    {/* Preset Colors */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground">On this page</span>
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {presetColors.map((color, i) => (
                          <button
                            key={i}
                            onClick={() => handleColorChange(color)}
                            className={cn(
                              "w-6 h-6 rounded border transition-transform hover:scale-110",
                              hexValue === color.replace('#', '').toUpperCase()
                                ? "border-primary ring-1 ring-primary"
                                : "border-border"
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedFillType === 'image' && (
                  <div className="space-y-3">
                    {/* Image Preview */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      {background.type === 'image' && background.value.startsWith('data:') ? (
                        <img 
                          src={background.value} 
                          alt="Background" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                              Choose media...
                            </div>
                          </label>
                        </div>
                      )}
                    </div>

                    {background.type === 'image' && background.value.startsWith('data:') && (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors text-center">
                          Change image...
                        </div>
                      </label>
                    )}
                  </div>
                )}

                {selectedFillType === 'video' && (
                  <div className="space-y-3">
                    {/* Video Preview */}
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center p-4">
                        <div className="w-8 h-8 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg">ℹ️</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          You have to be in a Professional team to edit or add videos.
                        </p>
                        <button className="text-sm text-primary hover:underline">
                          Upgrade to Professional...
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Layout Guide Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-foreground">Layout guide</h3>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-accent transition-colors">
              <Grid3X3 className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1 rounded hover:bg-accent transition-colors">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {/* Row */}
          <div className="flex items-center gap-2">
            <div className="w-6 flex justify-center">
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="8" width="18" height="8" rx="1" />
              </svg>
            </div>
            <select className="flex-1 px-3 py-2 rounded-lg bg-muted border-none text-sm text-foreground outline-none">
              <option>1 row</option>
              <option>2 rows</option>
              <option>3 rows</option>
              <option>4 rows</option>
            </select>
            <button className="p-1.5 hover:bg-accent rounded">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-accent rounded">
              <Minus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Column */}
          <div className="flex items-center gap-2">
            <div className="w-6 flex justify-center">
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="8" y="3" width="8" height="18" rx="1" />
              </svg>
            </div>
            <select className="flex-1 px-3 py-2 rounded-lg bg-muted border-none text-sm text-foreground outline-none">
              <option>1 column</option>
              <option>2 columns</option>
              <option>3 columns</option>
              <option>4 columns</option>
            </select>
            <button className="p-1.5 hover:bg-accent rounded">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-accent rounded">
              <Minus className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-foreground">Export</h3>
          <button className="p-1 rounded hover:bg-accent transition-colors">
            <Plus className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions for color conversion
function getHueFromHex(hex: string): number {
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  
  if (max !== min) {
    const d = max - min;
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return h * 360;
}

function getSaturationFromHex(hex: string): number {
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  return max === 0 ? 0 : ((max - min) / max) * 100;
}

function getBrightnessFromHex(hex: string): number {
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  
  return Math.max(r, g, b) * 100;
}

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100;
  v /= 100;
  
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  
  let r = 0, g = 0, b = 0;
  
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  
  return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}