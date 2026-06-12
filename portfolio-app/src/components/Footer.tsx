'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

  return (
    <footer className="site-footer">
      <div className="footer-glow" />

      <div className="footer-container">
        {/* Moon Phases */}
        <motion.div
          className="moon-phases"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {moonPhases.map((phase, index) => (
            <motion.span
              key={index}
              className="moon"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {phase}
            </motion.span>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.p
          className="footer-quote"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          &ldquo;The universe rewards those who remain curious.&rdquo;
        </motion.p>

        {/* Social Links */}
        <div className="footer-socials">
          <a href="https://github.com/ffrazi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/aneesa-zainab-6355ba2b6/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:aneesazainabf@gmail.com" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>

        {/* Divider line */}
        <div className="footer-divider" />

        {/* Copyright */}
        <p className="footer-copy">
          Built with <Heart size={14} className="heart-icon" /> by Aneesa Zainab Fazulullah
        </p>
        <p className="footer-year">© {new Date().getFullYear()} — All rights reserved</p>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          z-index: 2;
          padding: 4rem 0 2.5rem;
          text-align: center;
          overflow: hidden;
        }

        .footer-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 200px;
          background: linear-gradient(0deg,
            rgba(139, 92, 246, 0.08) 0%,
            rgba(99, 102, 241, 0.04) 40%,
            transparent 100%
          );
          pointer-events: none;
        }

        .footer-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .moon-phases {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .moon {
          font-size: 1.5rem;
          filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.3));
          cursor: default;
          transition: transform 0.2s ease;
        }

        .moon:hover {
          transform: scale(1.3);
        }

        .footer-quote {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-socials {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .footer-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.15);
          color: var(--text-secondary);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .footer-socials a:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: var(--accent-purple);
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);
        }

        .footer-divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            rgba(139, 92, 246, 0.4),
            transparent
          );
          margin: 0 auto 1.5rem;
        }

        .footer-copy {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-bottom: 0.5rem;
        }

        .footer-year {
          font-size: 0.8rem;
          color: rgba(156, 163, 175, 0.5);
          font-family: var(--font-mono);
        }

        @media (max-width: 768px) {
          .moon-phases {
            gap: 0.6rem;
          }
          .moon {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </footer>
  );
}
