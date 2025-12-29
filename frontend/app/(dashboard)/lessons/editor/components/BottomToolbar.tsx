//frontend/app/(dashboard)/lessons/editor/components/BottomToolbar.tsx

import React, { useState, useRef, useEffect } from 'react';
import { 
  MousePointer2, 
  Type, 
  Image, 
  Shapes, 
  Smile, 
  MessageCircle, 
  Plus,
  MonitorPlay,
  LayoutGrid,
  ChevronDown,
  Search,
  Table,
  Code,
  Hash,
  Hexagon,
  GitBranch,
  Workflow,
  ArrowRight,
  Minus,
  Square,
  Circle,
  Triangle,
  Star,
  GraduationCap,
  SlidersHorizontal,
  Trash2,
  Download,
  ArrowLeft,
  ArrowDown,
  RefreshCw,
  Diamond,
  Move,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore, SlideElement, TableCell, ShapeType } from '../store/useEditorStore';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface ToolButtonProps {
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  tooltip?: string;
  hasDropdown?: boolean;
  isOrange?: boolean;
}

const ToolButton: React.FC<ToolButtonProps> = ({
  icon,
  isActive,
  onClick,
  tooltip,
  hasDropdown,
  isOrange
}) => (
  <div className="relative group">
    <Button
      variant={isOrange ? "default" : "ghost"}
      onClick={onClick}
      className={cn(
        "relative h-10 w-10",
        hasDropdown && "pr-6 w-auto",
        isOrange && "bg-orange-500 hover:bg-orange-600 text-white rounded-full",
        !isOrange && isActive && "bg-accent text-accent-foreground",
        !isOrange && !isActive && "hover:bg-accent/50"
      )}
    >
      {icon}
      {hasDropdown && (
        <ChevronDown className="h-3 w-3 absolute right-1.5 top-1/2 -translate-y-1/2" />
      )}
    </Button>
    {tooltip && (
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-border">
        {tooltip}
      </div>
    )}
  </div>
);

const Divider: React.FC = () => (
  <div className="w-px h-6 bg-toolbar-border mx-1" />
);

// Shape definitions for the dropdown
const shapeOptions: { id: ShapeType; icon: React.ReactNode; label: string }[] = [
  { id: 'rectangle', icon: <Square className="h-5 w-5" />, label: 'Rectangle' },
  { id: 'circle', icon: <Circle className="h-5 w-5" />, label: 'Circle' },
  { id: 'diamond', icon: <Diamond className="h-5 w-5" />, label: 'Diamond' },
  { id: 'triangle', icon: <Triangle className="h-5 w-5" />, label: 'Triangle' },
  { id: 'star', icon: <Star className="h-5 w-5" />, label: 'Star' },
  { id: 'arrow-right', icon: <Move className="h-5 w-5" />, label: 'Cross' },
  { id: 'arrow-left', icon: <ArrowLeft className="h-5 w-5" />, label: 'Arrow Left' },
  { id: 'arrow-right', icon: <ArrowRight className="h-5 w-5" />, label: 'Arrow Right' },
  { id: 'speech-bubble', icon: <MessageSquare className="h-5 w-5" />, label: 'Speech Bubble' },
  { id: 'line', icon: <Minus className="h-5 w-5" />, label: 'Line' },
  { id: 'diagonal', icon: <span className="h-5 w-5 flex items-center justify-center text-lg font-light">/</span>, label: 'Diagonal' },
];

const otherTools = [
  { id: 'table', icon: <Table className="h-5 w-5" />, label: 'Table' },
  { id: 'code', icon: <Code className="h-5 w-5" />, label: 'Code block' },
  { id: 'slideNumber', icon: <Hash className="h-5 w-5" />, label: 'Slide number' },
];

const libraries = [
  { 
    id: 'add-own', 
    name: 'Add your own', 
    icons: [<Plus className="h-6 w-6 text-muted-foreground" />],
    isAddNew: true 
  },
  { 
    id: 'diagrams', 
    name: 'Diagrams', 
    icons: [
      <Hexagon className="h-4 w-4" />,
      <GitBranch className="h-4 w-4" />,
      <Plus className="h-4 w-4" />,
      <Minus className="h-4 w-4" />,
      <Square className="h-4 w-4" />,
      <Circle className="h-4 w-4" />
    ]
  },
  { 
    id: 'icons-outline', 
    name: 'Icons Outline', 
    icons: [
      <GraduationCap className="h-4 w-4" />,
      <SlidersHorizontal className="h-4 w-4" />,
      <Trash2 className="h-4 w-4" />,
      <Download className="h-4 w-4" />,
      <ArrowLeft className="h-4 w-4" />,
      <ArrowDown className="h-4 w-4" />
    ]
  },
  { 
    id: 'icons-solid', 
    name: 'Icons Solid', 
    icons: [
      <GraduationCap className="h-4 w-4 fill-current" />,
      <SlidersHorizontal className="h-4 w-4 fill-current" />,
      <Trash2 className="h-4 w-4 fill-current" />,
      <Download className="h-4 w-4 fill-current" />,
      <ArrowLeft className="h-4 w-4 fill-current" />,
      <RefreshCw className="h-4 w-4 fill-current" />
    ]
  },
];

export const BottomToolbar: React.FC = () => {
  const { activeTool, setActiveTool, addElement, currentSlideIndex, selectElement, setPendingShape } = useEditorStore();
  const [showShapesMenu, setShowShapesMenu] = useState(false);
  const [showAssetsMenu, setShowAssetsMenu] = useState(false);
  const [assetsSearch, setAssetsSearch] = useState('');
  const shapesRef = useRef<HTMLDivElement>(null);
  const assetsRef = useRef<HTMLDivElement>(null);

  const createTableCells = (rows: number, cols: number): TableCell[][] => {
    return Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: cols }, (_, colIndex) => ({
        id: `cell-${rowIndex}-${colIndex}`,
        content: '',
      }))
    );
  };

  const handleAddTable = () => {
    const newTable: SlideElement = {
      id: `table-${Date.now()}`,
      type: 'table',
      content: '',
      x: 250,
      y: 150,
      width: 400,
      height: 200,
      tableData: {
        rows: 3,
        cols: 3,
        cells: createTableCells(3, 3),
      },
    };
    addElement(currentSlideIndex, newTable);
    selectElement(newTable.id);
    setShowAssetsMenu(false);
  };

  const handleShapeSelect = (shapeType: ShapeType) => {
    setPendingShape(shapeType);
    setActiveTool('shapes');
    setShowShapesMenu(false);
  };

  const tools = [
    { id: 'cursor', icon: <MousePointer2 className="h-5 w-5" />, tooltip: 'Select', hasDropdown: true },
    { id: 'text', icon: <Type className="h-5 w-5" />, tooltip: 'Text' },
    { id: 'image', icon: <Image className="h-5 w-5" />, tooltip: 'Image' },
    { id: 'shapes', icon: <Shapes className="h-5 w-5" />, tooltip: 'Shapes' },
    { id: 'stickers', icon: <Smile className="h-5 w-5" />, tooltip: 'Stickers' },
    { id: 'comment', icon: <MessageCircle className="h-5 w-5" />, tooltip: 'Comment' },
    { id: 'more', icon: <Plus className="h-5 w-5" />, tooltip: 'Assets library', isOrange: true },
  ];

  const rightTools = [
    { id: 'present', icon: <MonitorPlay className="h-5 w-5" />, tooltip: 'Present' },
    { id: 'grid', icon: <LayoutGrid className="h-5 w-5" />, tooltip: 'Grid view' },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shapesRef.current && !shapesRef.current.contains(e.target as Node)) {
        setShowShapesMenu(false);
      }
      if (assetsRef.current && !assetsRef.current.contains(e.target as Node)) {
        setShowAssetsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToolClick = (toolId: string) => {
    if (toolId === 'shapes') {
      setShowShapesMenu(!showShapesMenu);
      setShowAssetsMenu(false);
    } else if (toolId === 'more') {
      setShowAssetsMenu(!showAssetsMenu);
      setShowShapesMenu(false);
    } else {
      setShowShapesMenu(false);
      setShowAssetsMenu(false);
    }
    setActiveTool(toolId);
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="flex items-center gap-1 bg-toolbar rounded-2xl px-2 py-2 toolbar-shadow border border-toolbar-border">
        {/* Main Tools */}
        {tools.map((tool: any) => (
          <ToolButton
            key={tool.id}
            icon={tool.icon}
            isActive={activeTool === tool.id}
            onClick={() => handleToolClick(tool.id)}
            tooltip={tool.tooltip}
            hasDropdown={tool.hasDropdown}
            isOrange={tool.isOrange}
          />
        ))}

        <Divider />

        {/* Right Tools */}
        {rightTools.map((tool) => (
          <ToolButton
            key={tool.id}
            icon={tool.icon}
            isActive={activeTool === tool.id}
            onClick={() => handleToolClick(tool.id)}
            tooltip={tool.tooltip}
          />
        ))}
      </div>

      {/* Shapes Dropdown */}
      {showShapesMenu && (
        <div 
          ref={shapesRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-popover rounded-xl p-3 shadow-xl border border-border animate-scale-in z-50"
        >
          <div className="grid grid-cols-4 gap-2">
            {shapeOptions.map((shape) => (
              <button
                key={shape.id + shape.label}
                className="w-12 h-12 rounded-lg bg-muted hover:bg-accent flex items-center justify-center transition-colors text-foreground"
                onClick={() => handleShapeSelect(shape.id)}
                title={shape.label}
              >
                {shape.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Assets Library Dropdown */}
      {showAssetsMenu && (
        <div 
          ref={assetsRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-popover rounded-2xl p-4 shadow-xl border border-border animate-scale-in w-[420px] max-h-[500px] overflow-y-auto"
        >
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={assetsSearch}
              onChange={(e) => setAssetsSearch(e.target.value)}
              className="pl-9 bg-muted border-border rounded-lg"
            />
          </div>

          {/* Other Tools Section */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-foreground mb-2">Other tools</h3>
            <div className="space-y-1">
              {otherTools.map((tool) => (
                <button
                  key={tool.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                  onClick={() => {
                    if (tool.id === 'table') {
                      handleAddTable();
                    } else {
                      setShowAssetsMenu(false);
                    }
                  }}
                >
                  <span className="text-muted-foreground">{tool.icon}</span>
                  <span className="text-sm text-foreground">{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Libraries Section */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Libraries</h3>
            <div className="grid grid-cols-2 gap-3">
              {libraries.map((library) => (
                <button
                  key={library.id}
                  className={cn(
                    "border border-border rounded-xl p-4 hover:border-primary/50 transition-colors text-left",
                    library.isAddNew && "flex flex-col items-center justify-center min-h-[100px]"
                  )}
                  onClick={() => setShowAssetsMenu(false)}
                >
                  {library.isAddNew ? (
                    <>
                      <Plus className="h-6 w-6 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">{library.name}</span>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {library.icons.slice(0, 8).map((icon, idx) => (
                          <div key={idx} className="text-foreground">
                            {icon}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{library.name}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
