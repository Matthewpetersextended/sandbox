import { create } from 'zustand';

export interface TableCell {
  id: string;
  content: string;
}

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'diamond' | 'star' | 'arrow-right' | 'arrow-left' | 'speech-bubble' | 'line' | 'diagonal';

export interface SlideElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'table';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  styles?: {
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: 'left' | 'center' | 'right';
    color?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  };
  shapeType?: ShapeType;
  tableData?: {
    rows: number;
    cols: number;
    cells: TableCell[][];
  };
}

export interface Slide {
  id: string;
  elements: SlideElement[];
}

export interface SlideBackground {
  type: 'color' | 'image' | 'video';
  value: string; // hex color or URL
  opacity: number;
}

interface EditorState {
  slides: Slide[];
  currentSlideIndex: number;
  selectedElementId: string | null;
  backgroundSelected: boolean;
  activeTool: string;
  zoomLevel: number;
  pendingShape: ShapeType | null;
  slideBackgrounds: Record<string, SlideBackground>;
  
  // Actions
  addSlide: () => void;
  deleteSlide: (index: number) => void;
  setCurrentSlide: (index: number) => void;
  setActiveTool: (tool: string) => void;
  updateSlideElement: (slideIndex: number, elementId: string, updates: Partial<SlideElement>) => void;
  addElement: (slideIndex: number, element: SlideElement) => void;
  selectElement: (elementId: string | null) => void;
  selectBackground: (selected: boolean) => void;
  setZoomLevel: (level: number) => void;
  setPendingShape: (shape: ShapeType | null) => void;
  updateSlideBackground: (slideId: string, background: Partial<SlideBackground>) => void;
}

const createDefaultSlide = (): Slide => ({
  id: `slide-${Date.now()}`,
  elements: [
    {
      id: 'title-1',
      type: 'text',
      content: 'Slide Deck Title',
      x: 80,
      y: 200,
      width: 600,
      height: 80,
      styles: {
        fontSize: '48px',
        fontWeight: '700',
        color: '#1a1a1a',
      },
    },
    {
      id: 'subtitle-1',
      type: 'text',
      content: 'This is just the beginning of something big.',
      x: 80,
      y: 290,
      width: 600,
      height: 40,
      styles: {
        fontSize: '20px',
        fontWeight: '400',
        color: '#4a4a4a',
      },
    },
  ],
});

export const useEditorStore = create<EditorState>((set) => ({
  slides: [createDefaultSlide()],
  currentSlideIndex: 0,
  selectedElementId: null,
  backgroundSelected: false,
  activeTool: 'cursor',
  zoomLevel: 100,
  pendingShape: null,
  slideBackgrounds: {},

  addSlide: () =>
    set((state) => ({
      slides: [...state.slides, createDefaultSlide()],
      currentSlideIndex: state.slides.length,
    })),

  deleteSlide: (index) =>
    set((state) => {
      if (state.slides.length <= 1) return state;
      const newSlides = state.slides.filter((_, i) => i !== index);
      return {
        slides: newSlides,
        currentSlideIndex: Math.min(state.currentSlideIndex, newSlides.length - 1),
      };
    }),

  setCurrentSlide: (index) => set({ currentSlideIndex: index }),

  setActiveTool: (tool) => set({ activeTool: tool }),

  updateSlideElement: (slideIndex, elementId, updates) =>
    set((state) => ({
      slides: state.slides.map((slide, i) =>
        i === slideIndex
          ? {
              ...slide,
              elements: slide.elements.map((el) =>
                el.id === elementId ? { ...el, ...updates } : el
              ),
            }
          : slide
      ),
    })),

  addElement: (slideIndex, element) =>
    set((state) => ({
      slides: state.slides.map((slide, i) =>
        i === slideIndex
          ? { ...slide, elements: [...slide.elements, element] }
          : slide
      ),
    })),

  selectElement: (elementId) => set({ selectedElementId: elementId, backgroundSelected: false }),

  selectBackground: (selected) => set({ backgroundSelected: selected, selectedElementId: null }),

  setZoomLevel: (level) => set({ zoomLevel: Math.min(Math.max(level, 10), 400) }),

  setPendingShape: (shape) => set({ pendingShape: shape }),

  updateSlideBackground: (slideId, background) =>
    set((state) => ({
      slideBackgrounds: {
        ...state.slideBackgrounds,
        [slideId]: {
          ...(state.slideBackgrounds[slideId] || { type: 'color', value: '#ffffff', opacity: 100 }),
          ...background,
        },
      },
    })),
}));
