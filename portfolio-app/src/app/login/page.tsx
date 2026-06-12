'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { user, loading, isAllowed, signIn, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (!loading && user && isAllowed) {
      router.push('/');
    }
  }, [loading, user, isAllowed, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = mode === 'login'
      ? await signIn(email, password)
      : await signUp(email, password);

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'An error occurred.');
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="login-loader">
        <Loader2 className="spin" size={32} />
        <style jsx>{`
          .login-loader {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-purple);
          }
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="login-page">
      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="login-card glass"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="card-header">
          <div className="lock-icon-wrapper">
            <Lock size={24} />
          </div>
          <h1>{mode === 'login' ? 'Access Portal' : 'Create Account'}</h1>
          <p className="subtitle">
            {mode === 'login'
              ? 'Enter your credentials to view the constellation'
              : 'Register with an authorized email'
            }
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            className="error-alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input
              id="login-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="spin" />
            ) : mode === 'login' ? (
              'Enter the Constellation'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mode-toggle">
          <span>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</span>
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          >
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .login-page {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          padding: 2rem;
        }

        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(99, 102, 241, 0.3));
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 3rem;
          z-index: 1;
        }

        .card-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .lock-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-indigo));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem;
          color: white;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
        }

        .card-header h1 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .error-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #f87171;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-secondary);
          pointer-events: none;
          z-index: 1;
        }

        .input-group input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: var(--font-sans);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }

        .input-group input:focus {
          border-color: var(--accent-purple);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .input-group input::placeholder {
          color: rgba(156, 163, 175, 0.6);
        }

        .toggle-password {
          position: absolute;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0;
          display: flex;
        }

        .toggle-password:hover {
          color: var(--text-primary);
        }

        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .mode-toggle {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .mode-toggle button {
          background: none;
          border: none;
          color: var(--accent-purple);
          cursor: pointer;
          font-weight: 600;
          font-size: 0.85rem;
          margin-left: 0.25rem;
        }

        .mode-toggle button:hover {
          text-decoration: underline;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
