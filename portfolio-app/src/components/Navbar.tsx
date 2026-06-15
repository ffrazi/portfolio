'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['about', 'experience', 'projects', 'skills', 'arena', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Arena', id: 'arena' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span>FAZ</span>
            <span className="logo-dot">.</span>
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobile-toggle">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 100;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          background: transparent;
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          height: 70px;
          background: rgba(10, 10, 25, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: -1px;
          color: var(--text-primary);
        }

        .logo-dot {
          color: var(--accent-purple);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s ease;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-indigo));
          transition: width 0.3s ease;
        }

        .nav-link.active {
          color: var(--text-purple);
          font-weight: 600;
        }

        .nav-link.active::after {
          width: 100%;
        }

        .logout-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #ef4444;
          color: white;
          transform: scale(1.05);
        }

        .mobile-toggle {
          display: none;
        }

        .mobile-toggle button {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: -100%;
          width: 280px;
          height: 100vh;
          background: rgba(10, 10, 22, 0.95);
          backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
          padding: 3rem;
          border-left: 1px solid rgba(139, 92, 246, 0.15);
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-drawer.open {
          right: 0;
        }

        .mobile-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .mobile-link:hover, .mobile-link.active {
          color: var(--text-purple);
          padding-left: 0.5rem;
        }

        .mobile-logout-btn {
          margin-top: 2rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
