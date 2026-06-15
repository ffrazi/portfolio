'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';

export interface GuestUser {
  name: string;
  email: string;
  isGuest: true;
}

interface AuthContextType {
  user: GuestUser | null;
  loading: boolean;
  isAllowed: boolean;
  isAdmin: boolean;
  signInGuest: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'aneesazainabf@gmail.com';

async function logVisit(name: string, email: string) {
  await addDoc(collection(db, 'visitLogs'), {
    name,
    email,
    timestamp: serverTimestamp(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GuestUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check local storage for guest
    const guestData = localStorage.getItem('guest_user');
    let initialGuest: GuestUser | null = null;
    if (guestData) {
      try {
        initialGuest = JSON.parse(guestData);
      } catch(e) {}
    }

    if (initialGuest) {
      setUser(initialGuest);
      setIsAllowed(true);
      setIsAdmin(initialGuest.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    } else {
      setUser(null);
      setIsAllowed(false);
      setIsAdmin(false);
    }
    setLoading(false);
  }, []);

  const signInGuest = async (name: string, email: string) => {
    try {
      // Authenticate anonymously first to get write permissions if required by security rules
      try {
        await signInAnonymously(auth);
      } catch (authError) {
        console.warn('Anonymous auth sign-in failed (make sure it is enabled in Firebase Console):', authError);
      }

      await logVisit(name, email);
      const guestUser: GuestUser = { name, email, isGuest: true };
      localStorage.setItem('guest_user', JSON.stringify(guestUser));
      setUser(guestUser);
      setIsAllowed(true);
      setIsAdmin(email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
      return { success: true };
    } catch (error: any) {
      console.error('Sign in guest failed:', error);
      return { 
        success: false, 
        error: error?.message || 'Failed to enter. Please try again.' 
      };
    }
  };

  const signOutUser = async () => {
    localStorage.removeItem('guest_user');
    setUser(null);
    setIsAllowed(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAllowed, isAdmin, signInGuest, signOut: signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
