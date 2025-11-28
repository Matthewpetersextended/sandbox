//frontend/lib/firebase/auth.ts//frontend/lib/firebase/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import { auth } from './config'

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName?: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update display name if provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
    
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with Google (popup)
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    // Optional: Force account selection
    provider.setCustomParameters({ prompt: 'select_account' })
    
    const userCredential = await signInWithPopup(auth, provider)
    return { user: userCredential.user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

// Sign in with Google (redirect) - useful for mobile
export const signInWithGoogleRedirect = async () => {
  try {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    
    await signInWithRedirect(auth, provider)
    // Note: The page will redirect, so no return here
  } catch (error: any) {
    console.error('Error initiating Google redirect:', error)
    throw error
  }
}

// Log out
export const logOut = async () => {
  try {
    await signOut(auth)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Send password reset email
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { error: null }
  }
  catch (error: any) {
    return { error: error.message }
  }
}

// Update user profile
export const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in')
    }
    
    await updateProfile(auth.currentUser, updates)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Update user email
export const updateUserEmail = async (newEmail: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in')
    }
    
    await updateEmail(auth.currentUser, newEmail)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Update user password
export const updateUserPassword = async (newPassword: string) => {
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in')
    }
    
    await updatePassword(auth.currentUser, newPassword)
    return { error: null }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Subscribe to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Get user ID token (useful for API calls)
export const getUserToken = async () => {
  try {
    if (!auth.currentUser) {
      return { token: null, error: 'No user is currently signed in' }
    }
    
    const token = await auth.currentUser.getIdToken()
    return { token, error: null }
  } catch (error: any) {
    return { token: null, error: error.message }
  }
}