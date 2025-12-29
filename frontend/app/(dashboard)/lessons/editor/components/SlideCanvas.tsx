//frontend/app/(dashboard)/lessons/editor/components/SlideCanvas.tsx

import React, { useState, useRef, useEffect } from 'react';
import { useEditorStore, SlideElement, ShapeType } from '../store/useEditorStore';
import { FileText, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Shape renderer component
const ShapeRenderer: React.FC<{ shapeType: ShapeType; fill?: string; stroke?: string; strokeWidth?: number }> = ({
  shapeType,
  fill = '#E07B54',
  stroke = 'transparent',
  strokeWidth = 2
}) => {
  const commonStyle = { width: '100%', height: '100%' };
  
  switch (shapeType) {
    case 'rectangle':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="2" y="2" width="96" height="96" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'circle':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle cx="50" cy="50" r="48" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'triangle':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,2 98,98 2,98" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'diamond':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="50,2 98,50 50,98 2,50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'star':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <polygon 
            points="50,2 61,35 98,35 68,57 79,91 50,70 21,91 32,57 2,35 39,35" 
            fill={fill} stroke={stroke} strokeWidth={strokeWidth} 
          />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,25 60,25 60,0 100,50 60,100 60,75 0,75" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="100,25 40,25 40,0 0,50 40,100 40,75 100,75" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'speech-bubble':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,10 H90 Q95,10 95,15 V60 Q95,65 90,65 H30 L15,80 L20,65 H10 Q5,65 5,60 V15 Q5,10 10,10 Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'line':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="50" x2="100" y2="50" stroke={fill} strokeWidth={4} />
        </svg>
      );
    case 'diagonal':
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="100" y2="0" stroke={fill} strokeWidth={4} />
        </svg>
      );
    default:
      return (
        <svg style={commonStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="2" y="2" width="96" height="96" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
  }
};

// Resize handles component
const ResizeHandles: React.FC<{
  onResizeStart: (direction: string, e: React.MouseEvent) => void;
}> = ({ onResizeStart }) => {
  const handlePositions = [
    { position: 'nw', className: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize' },
    { position: 'n', className: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize' },
    { position: 'ne', className: 'top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize' },
    { position: 'w', className: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
    { position: 'e', className: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
    { position: 'sw', className: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize' },
    { position: 's', className: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize' },
    { position: 'se', className: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize' },
  ];

  return (
    <>
      {handlePositions.map(({ position, className }) => (
        <div
          key={position}
          className={cn(
            'absolute w-2.5 h-2.5 bg-primary border-2 border-background rounded-sm z-10',
            className
          )}
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeStart(position, e);
          }}
        />
      ))}
    </>
  );
};

export const SlideCanvas: React.FC = () => {
  const { 
    slides, 
    currentSlideIndex, 
    updateSlideElement, 
    selectElement, 
    selectedElementId,
    activeTool,
    addElement,
    setActiveTool,
    zoomLevel,
    pendingShape,
    setPendingShape,
    selectBackground,
    slideBackgrounds
  } = useEditorStore();
  const [presenterNotes, setPresenterNotes] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, elemX: 0, elemY: 0 });
  const slideRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentSlideIndex];
  const scale = zoomLevel / 100;
  const slideBackground = slideBackgrounds[currentSlide?.id] || { type: 'color', value: '#ffffff', opacity: 100 };

  // Track cursor position for shape/text preview
  useEffect(() => {
    if ((!pendingShape && activeTool !== 'text') || !canvasRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPendingShape(null);
        setActiveTool('cursor');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [pendingShape, setPendingShape, setActiveTool]);

  // Handle resize
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const element = currentSlide?.elements.find(el => el.id === selectedElementId);
      if (!element) return;

      const dx = (e.clientX - resizeStart.x) / scale;
      const dy = (e.clientY - resizeStart.y) / scale;

      let newWidth = resizeStart.width;
      let newHeight = resizeStart.height;
      let newX = resizeStart.elemX;
      let newY = resizeStart.elemY;

      switch (resizeDirection) {
        case 'e':
          newWidth = Math.max(20, resizeStart.width + dx);
          break;
        case 'w':
          newWidth = Math.max(20, resizeStart.width - dx);
          newX = resizeStart.elemX + dx;
          break;
        case 's':
          newHeight = Math.max(20, resizeStart.height + dy);
          break;
        case 'n':
          newHeight = Math.max(20, resizeStart.height - dy);
          newY = resizeStart.elemY + dy;
          break;
        case 'se':
          newWidth = Math.max(20, resizeStart.width + dx);
          newHeight = Math.max(20, resizeStart.height + dy);
          break;
        case 'sw':
          newWidth = Math.max(20, resizeStart.width - dx);
          newX = resizeStart.elemX + dx;
          newHeight = Math.max(20, resizeStart.height + dy);
          break;
        case 'ne':
          newWidth = Math.max(20, resizeStart.width + dx);
          newHeight = Math.max(20, resizeStart.height - dy);
          newY = resizeStart.elemY + dy;
          break;
        case 'nw':
          newWidth = Math.max(20, resizeStart.width - dx);
          newHeight = Math.max(20, resizeStart.height - dy);
          newX = resizeStart.elemX + dx;
          newY = resizeStart.elemY + dy;
          break;
      }

      updateSlideElement(currentSlideIndex, selectedElementId!, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection, resizeStart, currentSlide, selectedElementId, currentSlideIndex, updateSlideElement, scale]);

  const handleResizeStart = (direction: string, e: React.MouseEvent) => {
    const element = currentSlide?.elements.find(el => el.id === selectedElementId);
    if (!element) return;

    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: element.width,
      height: element.height,
      elemX: element.x,
      elemY: element.y,
    });
  };

  const handleElementClick = (elementId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(elementId);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (pendingShape && slideRef.current) {
      const rect = slideRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      const newShapeElement: SlideElement = {
        id: `shape-${Date.now()}`,
        type: 'shape',
        content: '',
        x: Math.max(0, x - 50),
        y: Math.max(0, y - 50),
        width: 100,
        height: 100,
        shapeType: pendingShape,
        styles: {
          fill: '#E07B54',
          stroke: 'transparent',
          strokeWidth: 2,
        },
      };

      addElement(currentSlideIndex, newShapeElement);
      selectElement(newShapeElement.id);
      setPendingShape(null);
      setActiveTool('cursor');
      return;
    }

    if (activeTool === 'text' && slideRef.current) {
      const rect = slideRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;

      const newTextElement: SlideElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        content: 'Click to edit text',
        x: Math.max(0, x - 100),
        y: Math.max(0, y - 20),
        width: 200,
        height: 40,
        styles: {
          fontSize: '18px',
          fontWeight: '400',
          color: '#1a1a1a',
        },
      };

      addElement(currentSlideIndex, newTextElement);
      selectElement(newTextElement.id);
      setActiveTool('cursor');
    } else {
      // Clicked on background - select background
      e.stopPropagation();
      selectElement(null);
      selectBackground(true);
    }
  };

  const handleTextChange = (elementId: string, newContent: string) => {
    updateSlideElement(currentSlideIndex, elementId, { content: newContent });
  };

  const handleCellChange = (elementId: string, rowIndex: number, colIndex: number, newContent: string) => {
    const element = currentSlide?.elements.find(el => el.id === elementId);
    if (element?.tableData) {
      const newCells = element.tableData.cells.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? { ...cell, content: newContent } : cell
        )
      );
      updateSlideElement(currentSlideIndex, elementId, {
        tableData: { ...element.tableData, cells: newCells }
      });
    }
  };

  const addTableRow = (elementId: string) => {
    const element = currentSlide?.elements.find(el => el.id === elementId);
    if (element?.tableData) {
      const newRow = Array.from({ length: element.tableData.cols }, (_, i) => ({
        id: `cell-${element.tableData!.rows}-${i}`,
        content: '',
      }));
      updateSlideElement(currentSlideIndex, elementId, {
        tableData: {
          ...element.tableData,
          rows: element.tableData.rows + 1,
          cells: [...element.tableData.cells, newRow],
        },
        height: element.height + 40,
      });
    }
  };

  const addTableCol = (elementId: string) => {
    const element = currentSlide?.elements.find(el => el.id === elementId);
    if (element?.tableData) {
      const newCells = element.tableData.cells.map((row, rowIndex) => [
        ...row,
        { id: `cell-${rowIndex}-${element.tableData!.cols}`, content: '' },
      ]);
      updateSlideElement(currentSlideIndex, elementId, {
        tableData: {
          ...element.tableData,
          cols: element.tableData.cols + 1,
          cells: newCells,
        },
        width: element.width + 100,
      });
    }
  };

  const renderTableElement = (element: SlideElement) => {
    if (!element.tableData) return null;
    const { rows, cols, cells } = element.tableData;
    const cellWidth = element.width / cols;
    const cellHeight = (element.height - 40) / rows;

    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative">
          <table className="w-full h-full border-collapse">
            <tbody>
              {cells.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={cell.id}
                      className="border border-primary/30 bg-background"
                      style={{ width: cellWidth, height: cellHeight }}
                    >
                      <input
                        type="text"
                        value={cell.content}
                        onChange={(e) => handleCellChange(element.id, rowIndex, colIndex, e.target.value)}
                        className="w-full h-full px-2 text-sm bg-transparent outline-none text-foreground"
                        placeholder=""
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addTableCol(element.id);
            }}
            className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-12 bg-primary/20 hover:bg-primary/30 rounded-r-lg flex items-center justify-center transition-colors"
          >
            <Plus className="h-4 w-4 text-primary" />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            addTableRow(element.id);
          }}
          className="w-full h-8 bg-primary/20 hover:bg-primary/30 rounded-b-lg flex items-center justify-center transition-colors mt-1"
        >
          <Plus className="h-4 w-4 text-primary" />
        </button>
      </div>
    );
  };

  const getSlideBackgroundStyle = () => {
    if (slideBackground.type === 'color') {
      return { backgroundColor: slideBackground.value };
    } else if (slideBackground.type === 'image' && slideBackground.value.startsWith('data:')) {
      return { 
        backgroundImage: `url(${slideBackground.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return { backgroundColor: '#ffffff' };
  };

  return (
    <div className="flex-1 flex flex-col bg-canvas overflow-hidden">
      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 flex items-center justify-center p-8 overflow-auto"
        onClick={() => {
          if (activeTool !== 'text' && !pendingShape) {
            selectElement(null);
            selectBackground(false);
          }
        }}
        style={{ cursor: pendingShape ? 'crosshair' : 'default' }}
      >
        {/* Slide */}
        <div 
          ref={slideRef}
          className="relative rounded-lg slide-shadow transition-transform"
          style={{ 
            width: '900px', 
            height: '506px',
            minWidth: '900px',
            minHeight: '506px',
            cursor: pendingShape ? 'crosshair' : activeTool === 'text' ? 'text' : 'default',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            ...getSlideBackgroundStyle(),
          }}
          onClick={handleCanvasClick}
        >
          {currentSlide?.elements.map((element) => {
            const isSelected = selectedElementId === element.id;
            
            return (
              <div
                key={element.id}
                onClick={(e) => handleElementClick(element.id, e)}
                className={cn(
                  'absolute cursor-pointer transition-all',
                  isSelected && 'ring-2 ring-primary',
                  !isSelected && 'hover:ring-1 hover:ring-muted-foreground/30'
                )}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                }}
              >
                {element.type === 'text' && (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => handleTextChange(element.id, e.currentTarget.textContent || '')}
                    className="w-full h-full outline-none"
                    style={{
                      fontSize: element.styles?.fontSize,
                      fontWeight: element.styles?.fontWeight,
                      fontStyle: element.styles?.fontStyle,
                      textDecoration: element.styles?.textDecoration,
                      textAlign: element.styles?.textAlign,
                      color: element.styles?.color,
                      lineHeight: 1.2,
                    }}
                  >
                    {element.content}
                  </div>
                )}
                {element.type === 'shape' && element.shapeType && (
                  <ShapeRenderer 
                    shapeType={element.shapeType} 
                    fill={element.styles?.fill}
                    stroke={element.styles?.stroke}
                    strokeWidth={element.styles?.strokeWidth}
                  />
                )}
                {element.type === 'table' && renderTableElement(element)}
                
                {/* Resize handles for selected elements */}
                {isSelected && (
                  <ResizeHandles onResizeStart={handleResizeStart} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shape cursor preview */}
      {pendingShape && (
        <div
          className="fixed pointer-events-none z-50 opacity-70"
          style={{
            left: cursorPosition.x - 25,
            top: cursorPosition.y - 25,
            width: 50,
            height: 50,
          }}
        >
          <ShapeRenderer shapeType={pendingShape} fill="#E07B54" />
        </div>
      )}

      {/* Text tool cursor preview */}
      {activeTool === 'text' && !pendingShape && (
        <div
          className="fixed pointer-events-none z-50 flex items-center gap-1 px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded"
          style={{
            left: cursorPosition.x + 15,
            top: cursorPosition.y + 15,
          }}
        >
          Click to add text
        </div>
      )}

      {/* Drag Handle */}
      <div className="flex justify-center pb-2">
        <div className="w-16 h-1 rounded-full bg-muted-foreground/30" />
      </div>

      {/* Presenter Notes */}
      <div className="bg-notes border-t border-border">
        <div className="max-w-[900px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Add presenter notes..."
              value={presenterNotes}
              onChange={(e) => setPresenterNotes(e.target.value)}
              className="flex-1 bg-transparent text-sm text-muted-foreground placeholder:text-muted-foreground/50 outline-none"
            />
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-accent transition-colors text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              Start with a draft
              <span className="px-1.5 py-0.5 text-[10px] bg-muted-foreground/20 rounded">AI</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};