'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      if (adminOnly && !isAdmin(user.email)) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, loading, router, adminOnly]);

  const isAdmin = (email: string | null) => {
    const adminEmails = ['admin@valoriya.service', 'naiym223@example.com'];
    return email ? adminEmails.includes(email) : false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-valoriya-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (adminOnly && !isAdmin(user.email)) {
    return null;
  }

  return <>{children}</>;
}