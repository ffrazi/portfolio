'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import GalaxyBurst from '@/components/GalaxyBurst';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Arena from '@/components/sections/Arena';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const { user, loading, isAllowed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isAllowed)) {
      router.push('/login');
    }
  }, [loading, user, isAllowed, router]);

  // Show nothing while checking auth
  if (loading || !user || !isAllowed) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-purple)',
        fontSize: '1.25rem',
        fontFamily: 'var(--font-mono)',
      }}>
        <div className="loading-pulse" style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '3px solid rgba(139, 92, 246, 0.2)',
            borderTopColor: '#8b5cf6',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 1rem',
          }} />
          Initializing constellation...
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <GalaxyBurst />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Arena />
      <Contact />
      <Footer />
    </main>
  );
}
