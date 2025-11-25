//app/(auth-pages)/sign-up/page.tsx

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full">
          <FormMessage message={searchParams} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium text-gray-900">Sign up</h1>
            <p className="text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link className="text-blue-600 font-medium underline hover:text-blue-500" href="/sign-in">
                Sign in
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
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Your password"
                minLength={6}
                required
                className="mt-1"
              />
            </div>
            
            <SubmitButton formAction={signUpAction} pendingText="Signing up...">
              Sign up
            </SubmitButton>
            
            <FormMessage message={searchParams} />
          </div>
        </form>
        
        <SmtpMessage />
      </div>
    </div>
  );
}