// components/GoogleSignInButton.tsx
'use client'

import { useState } from 'react'
import GoogleAuthButton from './GoogleAuthButton'
import { signInWithGoogleAction } from '@/app/actions'

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true)
      const result = await signInWithGoogleAction()
      
      // If we got a URL back, redirect to it
      if (result?.url) {
        window.location.href = result.url
      } else if (result?.error) {
        // Handle error
        console.error(result.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error:', error)
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