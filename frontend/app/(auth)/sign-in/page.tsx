//app/(auth-pages)/sign-in/page.tsx

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900">Sign in</h1>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link className="text-blue-600 font-medium underline hover:text-blue-500" href="/sign-up">
                Sign up
              </Link>
            </p>
          </div>
          
          {/* Google Sign In Button */}
          <div>
            <GoogleSignInButton />
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with email</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input 
                name="email" 
                placeholder="you@example.com" 
                required 
                className="mt-1"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  className="text-xs text-blue-600 underline hover:text-blue-500"
                  href="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                required
                className="mt-1"
              />
            </div>
            
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}