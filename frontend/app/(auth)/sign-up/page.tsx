// frontend/app/(auth)/sign-up/page.tsx

import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <SignUpForm />
    </div>
  )
}