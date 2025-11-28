// components/GoogleSignInButton.tsx
'use client'

import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import GoogleAuthButton from './GoogleAuthButton'

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      
      // Optional: Add custom parameters
      // provider.setCustomParameters({ prompt: 'select_account' })
      
      const result = await signInWithPopup(auth, provider)
      
      // User is signed in
      const user = result.user
      console.log('Successfully signed in:', user.email)
      
      // You can redirect or handle success here
      // window.location.href = '/dashboard'
      
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      
      // Handle specific error codes
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup was closed')
      } else if (error.code === 'auth/cancelled-popup-request') {
        console.log('Sign-in was cancelled')
      }
      
      setIsLoading(false)
    }
  }

  return (
    <GoogleAuthButton 
      onClick={handleSignInWithGoogle} 
      isLoading={isLoading} 
    />
  )
}