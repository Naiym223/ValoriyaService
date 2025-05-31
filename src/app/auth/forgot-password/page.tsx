'use client'

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-valoriya-gradient flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">Check Your Email</CardTitle>
              <CardDescription>We've sent a password reset link to your email</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                If an account with <strong>{email}</strong> exists, you'll receive a password reset link shortly.
              </p>
              <p className="text-sm text-gray-500">
                Don't see the email? Check your spam folder or try again.
              </p>
              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button variant="valoriya" className="w-full">
                    Back to Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setSuccess(false)}
                  className="w-full"
                >
                  Try Different Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-valoriya-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Link href="/auth/login" className="inline-flex items-center text-white hover:text-blue-100 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-blue-100">Enter your email to receive a reset link</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Forgot Your Password?</CardTitle>
            <CardDescription>No worries! We'll send you reset instructions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-valoriya-blue-500 focus:ring-valoriya-blue-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter the email address associated with your account
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="valoriya"
                  className="w-full h-12 text-lg font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link
                  href="/auth/login"
                  className="text-valoriya-blue-600 hover:text-valoriya-blue-800 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h3 className="text-white font-semibold mb-2">🔒 Security Note</h3>
          <p className="text-blue-100 text-sm">
            For your security, password reset links expire after 1 hour. If you don't receive an email, 
            please check your spam folder or contact support.
          </p>
        </div>
      </motion.div>
    </div>
  );
}