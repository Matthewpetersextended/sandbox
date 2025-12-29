//frontend/app/(dashboard)/lessons/editor/components/TextToolPanel.tsx

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, Italic, Underline, List, 
  AlignLeft, AlignCenter, AlignRight,
  AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
  ChevronDown, Square, Grid3X3, Image, Check, Search, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore, SlideElement } from '../store/useEditorStore';

const fontFamilies = [
  { id: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
  { id: 'roboto', label: 'Roboto', family: 'Roboto, sans-serif' },
  { id: 'open-sans', label: 'Open Sans', family: 'Open Sans, sans-serif' },
  { id: 'lato', label: 'Lato', family: 'Lato, sans-serif' },
  { id: 'montserrat', label: 'Montserrat', family: 'Montserrat, sans-serif' },
  { id: 'poppins', label: 'Poppins', family: 'Poppins, sans-serif' },
  { id: 'playfair', label: 'Playfair Display', family: 'Playfair Display, serif' },
  { id: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
  { id: 'times', label: 'Times New Roman', family: 'Times New Roman, serif' },
  { id: 'arial', label: 'Arial', family: 'Arial, sans-serif' },
  { id: 'helvetica', label: 'Helvetica', family: 'Helvetica, sans-serif' },
  { id: 'verdana', label: 'Verdana', family: 'Verdana, sans-serif' },
  { id: 'courier', label: 'Courier New', family: 'Courier New, monospace' },
  { id: 'source-code', label: 'Source Code Pro', family: 'Source Code Pro, monospace' },
];

const textStyles = [
  { id: 'header1', label: 'Header 1', fontSize: '48px', fontWeight: '700' },
  { id: 'header2', label: 'Header 2', fontSize: '36px', fontWeight: '700' },
  { id: 'header3', label: 'Header 3', fontSize: '28px', fontWeight: '600' },
  { id: 'body', label: 'Body', fontSize: '16px', fontWeight: '400' },
  { id: 'caption', label: 'Caption', fontSize: '14px', fontWeight: '400' },
];

const fillColors = [
  { id: 'black', label: 'Black', color: '#000000' },
  { id: 'white', label: 'White', color: '#ffffff' },
  { id: 'gray', label: 'Gray', color: '#6b7280' },
  { id: 'red', label: 'Red', color: '#ef4444' },
  { id: 'blue', label: 'Blue', color: '#3b82f6' },
  { id: 'green', label: 'Green', color: '#22c55e' },
];

const opacityOptions = ['100%', '75%', '50%', '25%'];

interface TextToolsPanelProps {
  selectedElement: SlideElement;
}

export const TextToolsPanel: React.FC<TextToolsPanelProps> = ({ selectedElement }) => {
  const { currentSlideIndex, updateSlideElement } = useEditorStore();
  
  const [selectedTextStyle, setSelectedTextStyle] = useState('header3');
  const [showTextStyleDropdown, setShowTextStyleDropdown] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState('inter');
  const [showFontFamilyDropdown, setShowFontFamilyDropdown] = useState(false);
  const [fontSearchQuery, setFontSearchQuery] = useState('');
  const [fillType, setFillType] = useState<'solid' | 'gradient' | 'image'>('solid');
  const [selectedFillColor, setSelectedFillColor] = useState('black');
  const [showFillColorDropdown, setShowFillColorDropdown] = useState(false);
  const [selectedOpacity, setSelectedOpacity] = useState('100%');
  const [showOpacityDropdown, setShowOpacityDropdown] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  
  // Text formatting states - sync with element
  const [isBold, setIsBold] = useState(selectedElement.styles?.fontWeight === '700');
  const [isItalic, setIsItalic] = useState(selectedElement.styles?.fontStyle === 'italic');
  const [isUnderline, setIsUnderline] = useState(selectedElement.styles?.textDecoration === 'underline');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>(selectedElement.styles?.textAlign || 'left');
  const [verticalAlign, setVerticalAlign] = useState<'top' | 'middle' | 'bottom'>('top');

  // Update states when selected element changes
  React.useEffect(() => {
    setIsBold(selectedElement.styles?.fontWeight === '700');
    setIsItalic(selectedElement.styles?.fontStyle === 'italic');
    setIsUnderline(selectedElement.styles?.textDecoration === 'underline');
    setTextAlign(selectedElement.styles?.textAlign || 'left');
  }, [selectedElement.id]);

  const textStyleRef = useRef<HTMLDivElement>(null);
  const fontFamilyRef = useRef<HTMLDivElement>(null);
  const fillColorRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (textStyleRef.current && !textStyleRef.current.contains(e.target as Node)) {
        setShowTextStyleDropdown(false);
      }
      if (fontFamilyRef.current && !fontFamilyRef.current.contains(e.target as Node)) {
        setShowFontFamilyDropdown(false);
        setFontSearchQuery('');
      }
      if (fillColorRef.current && !fillColorRef.current.contains(e.target as Node)) {
        setShowFillColorDropdown(false);
      }
      if (opacityRef.current && !opacityRef.current.contains(e.target as Node)) {
        setShowOpacityDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedTextStyleData = textStyles.find(t => t.id === selectedTextStyle);
  const selectedFontFamilyData = fontFamilies.find(f => f.id === selectedFontFamily);
  const selectedFillColorData = fillColors.find(c => c.id === selectedFillColor);
  
  const filteredFontFamilies = fontFamilies.filter(font =>
    font.label.toLowerCase().includes(fontSearchQuery.toLowerCase())
  );

  const handleTextStyleChange = (styleId: string) => {
    const style = textStyles.find(t => t.id === styleId);
    if (style) {
      setSelectedTextStyle(styleId);
      updateSlideElement(currentSlideIndex, selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
        }
      });
    }
    setShowTextStyleDropdown(false);
  };

  const handleFontFamilyChange = (fontId: string) => {
    const font = fontFamilies.find(f => f.id === fontId);
    if (font) {
      setSelectedFontFamily(fontId);
      updateSlideElement(currentSlideIndex, selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          fontFamily: font.family,
        }
      });
    }
    setShowFontFamilyDropdown(false);
    setFontSearchQuery('');
  };

  const handleColorChange = (colorId: string) => {
    const color = fillColors.find(c => c.id === colorId);
    if (color) {
      setSelectedFillColor(colorId);
      updateSlideElement(currentSlideIndex, selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          color: color.color,
        }
      });
    }
    setShowFillColorDropdown(false);
  };

  const toggleBold = () => {
    const newBold = !isBold;
    setIsBold(newBold);
    updateSlideElement(currentSlideIndex, selectedElement.id, {
      styles: {
        ...selectedElement.styles,
        fontWeight: newBold ? '700' : '400',
      }
    });
  };

  const toggleItalic = () => {
    const newItalic = !isItalic;
    setIsItalic(newItalic);
    updateSlideElement(currentSlideIndex, selectedElement.id, {
      styles: {
        ...selectedElement.styles,
        fontStyle: newItalic ? 'italic' : 'normal',
      }
    });
  };

  const toggleUnderline = () => {
    const newUnderline = !isUnderline;
    setIsUnderline(newUnderline);
    updateSlideElement(currentSlideIndex, selectedElement.id, {
      styles: {
        ...selectedElement.styles,
        textDecoration: newUnderline ? 'underline' : 'none',
      }
    });
  };

  const handleTextAlignChange = (align: 'left' | 'center' | 'right') => {
    setTextAlign(align);
    updateSlideElement(currentSlideIndex, selectedElement.id, {
      styles: {
        ...selectedElement.styles,
        textAlign: align,
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Alignment Tools Row */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-0.5 p-1 bg-muted rounded-lg">
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignLeft className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignCenter className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-0.5 p-1 bg-muted rounded-lg">
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignVerticalJustifyStart className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignVerticalJustifyCenter className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-2 rounded hover:bg-background transition-colors">
            <AlignVerticalJustifyEnd className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Text Section */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Text</h3>
        
        {/* Text Style Dropdown */}
        <div className="relative mb-3" ref={textStyleRef}>
          <button
            onClick={() => setShowTextStyleDropdown(!showTextStyleDropdown)}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <span className="text-base font-semibold text-foreground">{selectedTextStyleData?.label}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {showTextStyleDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 py-1">
              {textStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleTextStyleChange(style.id)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm transition-colors",
                    selectedTextStyle === style.id ? "bg-accent" : "hover:bg-accent"
                  )}
                >
                  <span className="text-foreground" style={{ fontSize: '14px', fontWeight: style.fontWeight }}>
                    {style.label}
                  </span>
                  {selectedTextStyle === style.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Font Family Dropdown */}
        <div className="relative mb-3" ref={fontFamilyRef}>
          <button
            onClick={() => setShowFontFamilyDropdown(!showFontFamilyDropdown)}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <span 
              className="text-sm text-foreground"
              style={{ fontFamily: selectedFontFamilyData?.family }}
            >
              {selectedFontFamilyData?.label}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {showFontFamilyDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden">
              {/* Search Input */}
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={fontSearchQuery}
                    onChange={(e) => setFontSearchQuery(e.target.value)}
                    placeholder="Search fonts..."
                    className="w-full pl-8 pr-8 py-1.5 text-sm bg-muted rounded-md border-none outline-none text-foreground placeholder:text-muted-foreground"
                    autoFocus
                  />
                  {fontSearchQuery && (
                    <button
                      onClick={() => setFontSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Font List */}
              <div className="max-h-48 overflow-y-auto py-1">
                {filteredFontFamilies.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleFontFamilyChange(font.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm transition-colors",
                      selectedFontFamily === font.id ? "bg-accent" : "hover:bg-accent"
                    )}
                  >
                    <span 
                      className="text-foreground" 
                      style={{ fontFamily: font.family }}
                    >
                      {font.label}
                    </span>
                    {selectedFontFamily === font.id && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
                {filteredFontFamilies.length === 0 && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No fonts found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Text Formatting Buttons */}
        <div className="flex items-center gap-1 mb-2">
          <button
            onClick={toggleBold}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm font-bold transition-colors",
              isBold ? "bg-primary/20 text-primary" : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            B
          </button>
          <button
            onClick={toggleItalic}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm italic transition-colors",
              isItalic ? "bg-primary/20 text-primary" : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            I
          </button>
          <button
            onClick={toggleUnderline}
            className={cn(
              "flex-1 py-2 rounded-lg text-sm underline transition-colors",
              isUnderline ? "bg-primary/20 text-primary" : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            U
          </button>
          <button className="flex-1 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors">
            <List className="h-4 w-4 mx-auto" />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5 flex-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => handleTextAlignChange('left')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                textAlign === 'left' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignLeft className="h-4 w-4 mx-auto text-foreground" />
            </button>
            <button
              onClick={() => handleTextAlignChange('center')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                textAlign === 'center' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignCenter className="h-4 w-4 mx-auto text-foreground" />
            </button>
            <button
              onClick={() => handleTextAlignChange('right')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                textAlign === 'right' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignRight className="h-4 w-4 mx-auto text-foreground" />
            </button>
          </div>
          <div className="flex items-center gap-0.5 flex-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setVerticalAlign('top')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                verticalAlign === 'top' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignVerticalJustifyStart className="h-4 w-4 mx-auto text-foreground" />
            </button>
            <button
              onClick={() => setVerticalAlign('middle')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                verticalAlign === 'middle' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignVerticalJustifyCenter className="h-4 w-4 mx-auto text-foreground" />
            </button>
            <button
              onClick={() => setVerticalAlign('bottom')}
              className={cn(
                "flex-1 p-1.5 rounded transition-colors",
                verticalAlign === 'bottom' ? "bg-background shadow-sm" : "hover:bg-background/50"
              )}
            >
              <AlignVerticalJustifyEnd className="h-4 w-4 mx-auto text-foreground" />
            </button>
          </div>
        </div>

        <button className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg">
          Show details
        </button>
      </div>

      {/* Fill Section */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Fill</h3>
        
        {/* Fill Type Toggle */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg mb-3">
          <button
            onClick={() => setFillType('solid')}
            className={cn(
              "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
              fillType === 'solid' ? "bg-background shadow-sm" : "hover:bg-background/50"
            )}
          >
            <Square className="h-4 w-4 text-foreground" />
          </button>
          <button
            onClick={() => setFillType('gradient')}
            className={cn(
              "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
              fillType === 'gradient' ? "bg-background shadow-sm" : "hover:bg-background/50"
            )}
          >
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => setFillType('image')}
            className={cn(
              "flex-1 flex items-center justify-center p-2 rounded-md transition-colors",
              fillType === 'image' ? "bg-background shadow-sm" : "hover:bg-background/50"
            )}
          >
            <Image className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Color Dropdown */}
        <div className="relative" ref={fillColorRef}>
          <button
            onClick={() => setShowFillColorDropdown(!showFillColorDropdown)}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <div
              className="w-5 h-5 rounded border border-border"
              style={{ backgroundColor: selectedFillColorData?.color }}
            />
            <span className="flex-1 text-left text-sm text-foreground">{selectedFillColorData?.label}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>

          {showFillColorDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-xl z-50 py-1">
              {fillColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2 text-sm transition-colors",
                    selectedFillColor === color.id ? "bg-accent" : "hover:bg-accent"
                  )}
                >
                  <div
                    className="w-4 h-4 rounded border border-border"
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="flex-1 text-left text-foreground">{color.label}</span>
                  {selectedFillColor === color.id && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Opacity Section */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Opacity</h3>
        <div className="relative" ref={opacityRef}>
          <button
            onClick={() => setShowOpacityDropdown(!showOpacityDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors"
          >
            <Grid3X3 className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm text-foreground">{selectedOpacity}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {showOpacityDropdown && (
            <div className="absolute top-full right-0 mt-1 w-24 bg-popover border border-border rounded-lg shadow-xl z-50 py-1">
              {opacityOptions.map((opacity) => (
                <button
                  key={opacity}
                  onClick={() => {
                    setSelectedOpacity(opacity);
                    setShowOpacityDropdown(false);
                  }}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm transition-colors",
                    selectedOpacity === opacity ? "bg-accent" : "hover:bg-accent"
                  )}
                >
                  <span className="text-foreground">{opacity}</span>
                  {selectedOpacity === opacity && <Check className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Link Section */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Link</h3>
        <div className="relative">
          <input
            type="text"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Add URL or slide number"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};
