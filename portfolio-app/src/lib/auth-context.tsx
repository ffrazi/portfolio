'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAllowed: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'aneesazainabf@gmail.com';

async function checkAllowed(email: string): Promise<boolean> {
  if (email === ADMIN_EMAIL) return true;
  try {
    const docRef = doc(db, 'allowedEmails', email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch {
    return false;
  }
}

async function logVisit(email: string) {
  try {
    await addDoc(collection(db, 'visitLogs'), {
      email,
      timestamp: serverTimestamp(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });
  } catch (e) {
    console.error('Failed to log visit:', e);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser?.email) {
        const allowed = await checkAllowed(firebaseUser.email);
        setIsAllowed(allowed);
        setIsAdmin(firebaseUser.email === ADMIN_EMAIL);
        if (allowed) {
          await logVisit(firebaseUser.email);
        }
      } else {
        setIsAllowed(false);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const allowed = await checkAllowed(result.user.email!);
      if (!allowed) {
        await firebaseSignOut(auth);
        return { success: false, error: 'Access denied. Your email is not authorized.' };
      }
      return { success: true };
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        return { success: false, error: 'Invalid credentials. Please check your email and password.' };
      }
      if (err.code === 'auth/wrong-password') {
        return { success: false, error: 'Incorrect password.' };
      }
      return { success: false, error: 'Authentication failed. Please try again.' };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const allowed = await checkAllowed(email);
      if (!allowed) {
        return { success: false, error: 'Access denied. Your email is not on the authorized list.' };
      }
      await createUserWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: unknown) {
      const err = error as { code?: string };
      if (err.code === 'auth/email-already-in-use') {
        return { success: false, error: 'An account already exists with this email. Try signing in.' };
      }
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const signOutUser = async () => {
    await firebaseSignOut(auth);
    setIsAllowed(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAllowed, isAdmin, signIn, signUp, signOut: signOutUser }}>
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
