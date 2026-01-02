// frontend/lib/hooks/useAuth.ts

import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';

interface UseAuthOptions {
  redirectTo?: string; // Redirect unauthenticated users to this path
  redirectIfFound?: string; // Redirect authenticated users to this path (for login/signup pages)
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

/**
 * Custom hook for handling authentication state and route protection
 * 
 * @param options - Configuration options
 * @param options.redirectTo - Path to redirect to if user is not authenticated (e.g., '/sign-in')
 * @param options.redirectIfFound - Path to redirect to if user IS authenticated (e.g., '/dashboard')
 * 
 * @example
 * // Protect a route - redirect to sign-in if not authenticated
 * const { user, loading } = useAuth({ redirectTo: '/sign-in' });
 * 
 * @example
 * // Redirect authenticated users away from login page
 * const { user, loading } = useAuth({ redirectIfFound: '/dashboard' });
 * 
 * @example
 * // Just get auth state without redirects
 * const { user, loading, isAuthenticated } = useAuth();
 */
export function useAuth(options: UseAuthOptions = {}): UseAuthReturn {
  const { redirectTo, redirectIfFound } = options;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);

      // Handle redirects after auth state is determined
      if (!authUser && redirectTo) {
        // User is not authenticated and we want to redirect them
        router.push(redirectTo);
      } else if (authUser && redirectIfFound) {
        // User IS authenticated and we want to redirect them (useful for login/signup pages)
        router.push(redirectIfFound);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [redirectTo, redirectIfFound, router]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}

/**
 * Hook that requires authentication - will always redirect if not authenticated
 * Simpler alternative to useAuth with redirectTo option
 * 
 * @example
 * const { user, loading } = useRequireAuth();
 * if (loading) return <LoadingSpinner />;
 * // user is guaranteed to be non-null here
 */
export function useRequireAuth(): UseAuthReturn {
  return useAuth({ redirectTo: '/sign-in' });
}

/**
 * Hook for getting current user without any redirects
 * Useful for components that need to show different UI based on auth state
 * 
 * @example
 * const { user, isAuthenticated } = useCurrentUser();
 * return isAuthenticated ? <UserMenu /> : <LoginButton />;
 */
export function useCurrentUser(): UseAuthReturn {
  return useAuth();
}