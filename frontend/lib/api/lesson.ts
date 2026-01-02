// frontend/lib/api/lessons.ts

import { apiGet, apiPost, apiPut, apiDelete } from './clients';

/**
 * Lesson segment type
 */
export interface LessonSegment {
  id?: string;
  projectName: string;
  duration?: number;
  content?: any;
  [key: string]: any;
}

/**
 * Lesson type definition
 */
export interface Lesson {
  id?: string;
  title: string;
  author?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  segments: LessonSegment[];
  description?: string;
  gradeLevel?: string;
  subject?: string;
  [key: string]: any;
}

/**
 * Create lesson input type
 */
export interface CreateLessonInput {
  title: string;
  description?: string;
  gradeLevel?: string;
  subject?: string;
  segments?: LessonSegment[];
}

/**
 * Update lesson input type
 */
export interface UpdateLessonInput {
  title?: string;
  description?: string;
  gradeLevel?: string;
  subject?: string;
  segments?: LessonSegment[];
}

/**
 * Fetch all lessons for the current user
 */
export async function fetchLessons(): Promise<Lesson[]> {
  try {
    const lessons = await apiGet<Lesson[]>('/api/v1/lessons');
    return lessons;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    throw error;
  }
}

/**
 * Fetch a single lesson by ID
 */
export async function fetchLessonById(lessonId: string): Promise<Lesson> {
  try {
    const lesson = await apiGet<Lesson>(`/api/v1/lessons/${lessonId}`);
    return lesson;
  } catch (error) {
    console.error(`Error fetching lesson ${lessonId}:`, error);
    throw error;
  }
}

/**
 * Create a new lesson
 */
export async function createLesson(lessonData: CreateLessonInput): Promise<Lesson> {
  try {
    const lesson = await apiPost<Lesson>('/api/v1/lessons', lessonData);
    return lesson;
  } catch (error) {
    console.error('Error creating lesson:', error);
    throw error;
  }
}

/**
 * Update an existing lesson
 */
export async function updateLesson(
  lessonId: string,
  lessonData: UpdateLessonInput
): Promise<Lesson> {
  try {
    const lesson = await apiPut<Lesson>(`/api/v1/lessons/${lessonId}`, lessonData);
    return lesson;
  } catch (error) {
    console.error(`Error updating lesson ${lessonId}:`, error);
    throw error;
  }
}

/**
 * Delete a lesson
 */
export async function deleteLesson(lessonId: string): Promise<void> {
  try {
    await apiDelete<void>(`/api/v1/lessons/${lessonId}`);
  } catch (error) {
    console.error(`Error deleting lesson ${lessonId}:`, error);
    throw error;
  }
}

/**
 * Handle lesson-related errors
 */
export function handleLessonError(error: unknown): string {
  if (error instanceof Error) {
    // Handle specific error messages
    if (error.message.includes('Authentication required')) {
      return 'Please log in to view your lessons.';
    }
    if (error.message.includes('permission')) {
      return 'You do not have permission to access these lessons.';
    }
    if (error.message.includes('not found')) {
      return 'Lesson not found.';
    }
    if (error.message.includes('Network')) {
      return 'Network error. Please check your connection and try again.';
    }
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Export type for backward compatibility
 */
export type { Lesson as default };