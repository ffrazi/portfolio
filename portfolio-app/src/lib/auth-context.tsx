'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

export interface GuestUser {
  name: string;
  email: string;
  isGuest: true;
}

interface AuthContextType {
  user: User | GuestUser | null;
  loading: boolean;
  isAllowed: boolean;
  isAdmin: boolean;
  signInGuest: (name: string, email: string) => Promise<{ success: boolean; error?: string }>;
  signInAdmin: (password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'aneesazainabf@gmail.com';

async function logVisit(name: string, email: string) {
  try {
    await addDoc(collection(db, 'visitLogs'), {
      name,
      email,
      timestamp: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });
  } catch (e) {
    console.error('Failed to log visit:', e);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | GuestUser | null>(null);
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

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser?.email === ADMIN_EMAIL) {
        setUser(firebaseUser);
        setIsAllowed(true);
        setIsAdmin(true);
      } else if (initialGuest) {
        setUser(initialGuest);
        setIsAllowed(true);
        setIsAdmin(false);
      } else {
        setUser(null);
        setIsAllowed(false);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInGuest = async (name: string, email: string) => {
    try {
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
         return { success: false, error: 'This is the admin email. Please use the admin login.' };
      }
      await logVisit(name, email);
      const guestUser: GuestUser = { name, email, isGuest: true };
      localStorage.setItem('guest_user', JSON.stringify(guestUser));
      setUser(guestUser);
      setIsAllowed(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to enter. Please try again.' };
    }
  };

  const signInAdmin = async (password: string) => {
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Invalid admin credentials.' };
    }
  };

  const signOutUser = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem('guest_user');
    setUser(null);
    setIsAllowed(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAllowed, isAdmin, signInGuest, signInAdmin, signOut: signOutUser }}>
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
