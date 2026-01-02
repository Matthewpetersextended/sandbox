// frontend/lib/api/clients.ts

import { auth } from '@/lib/firebase/config';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

/**
 * Get the current user's Firebase ID token
 */
async function getIdToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}

/**
 * Base fetch wrapper with authentication
 */
export async function authenticatedFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getIdToken();
  
  if (!token) {
    throw new Error('Authentication required. Please log in.');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const url = `${BACKEND_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle common error cases
  if (response.status === 401) {
    throw new Error('Authentication failed. Please log in again.');
  }

  if (response.status === 403) {
    throw new Error('You do not have permission to access this resource.');
  }

  if (response.status === 404) {
    throw new Error('Resource not found.');
  }

  if (response.status >= 500) {
    throw new Error('Server error. Please try again later.');
  }

  if (!response.ok) {
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.message || 'Request failed');
    } catch {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }

  return response;
}

/**
 * GET request helper
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const response = await authenticatedFetch(endpoint, {
    method: 'GET',
  });
  return response.json();
}

/**
 * POST request helper
 */
export async function apiPost<T>(endpoint: string, data?: any): Promise<T> {
  const response = await authenticatedFetch(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
  return response.json();
}

/**
 * PUT request helper
 */
export async function apiPut<T>(endpoint: string, data?: any): Promise<T> {
  const response = await authenticatedFetch(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
  return response.json();
}

/**
 * PATCH request helper
 */
export async function apiPatch<T>(endpoint: string, data?: any): Promise<T> {
  const response = await authenticatedFetch(endpoint, {
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
  return response.json();
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const response = await authenticatedFetch(endpoint, {
    method: 'DELETE',
  });
  
  // Handle 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json();
}