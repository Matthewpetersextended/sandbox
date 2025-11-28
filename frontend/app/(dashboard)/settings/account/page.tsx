// frontend/app/(dashboard)/settings/account/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateUserProfile, updateUserEmail, logOut } from '@/lib/firebase/auth'
import { Trash2, LogOut } from 'lucide-react'

type AccountFormData = {
  displayName: string
  email: string
  photoURL: string
}

export default function AccountSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const form = useForm<AccountFormData>({
    defaultValues: {
      displayName: '',
      email: '',
      photoURL: '',
    },
  })

  const onSubmit = async (data: AccountFormData) => {
    setIsLoading(true)
    setMessage(null)

    // Update profile
    const { error: profileError } = await updateUserProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    })

    if (profileError) {
      setMessage({ type: 'error', text: profileError })
      setIsLoading(false)
      return
    }

    // Update email if changed
    if (data.email) {
      const { error: emailError } = await updateUserEmail(data.email)
      if (emailError) {
        setMessage({ type: 'error', text: emailError })
        setIsLoading(false)
        return
      }
    }

    setMessage({ type: 'success', text: 'Account updated successfully!' })
    setIsLoading(false)
  }

  const handleLogout = async () => {
    const { error } = await logOut()
    if (error) {
      setMessage({ type: 'error', text: error })
    }
  }

  const handleDeleteAccount = () => {
    // Placeholder for delete account functionality
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Delete account')
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="text-sm">{message.text}</p>
        </div>
      )}

      {/* Account Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="displayName"
            rules={{
              required: 'Display name is required',
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your email address for login and notifications.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: URL to your profile photo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>

      {/* Divider */}
      <div className="my-12 border-t border-gray-200" />

      {/* Account Actions */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Sign Out</p>
                <p className="text-sm text-gray-600">Sign out of your account on this device</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div>
                <p className="font-medium text-red-900">Delete Account</p>
                <p className="text-sm text-red-700">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}