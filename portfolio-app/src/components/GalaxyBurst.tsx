'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalaxyBurst() {
  const [stage, setStage] = useState<'idle' | 'charging' | 'burst' | 'reveal'>('idle');

  useEffect(() => {
    // Stage transition timers
    const chargeTimer = setTimeout(() => setStage('charging'), 500);
    const burstTimer = setTimeout(() => setStage('burst'), 2200);
    const revealTimer = setTimeout(() => setStage('reveal'), 2800);

    return () => {
      clearTimeout(chargeTimer);
      clearTimeout(burstTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  const nameWords = "Aneesa Zainab Fazulullah".split(" ");

  return (
    <div className="hero-container">
      <AnimatePresence>
        {/* Core Galaxy Sphere before the burst */}
        {stage !== 'reveal' && stage !== 'burst' && (
          <motion.div
            className={`galaxy-core ${stage}`}
            initial={{ scale: 0.1, opacity: 0 }}
            animate={{
              scale: stage === 'charging' ? [1, 1.3, 0.8, 2] : 1,
              opacity: stage === 'charging' ? [0.6, 1, 0.8, 1] : 0.6,
            }}
            exit={{ scale: 8, opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
            transition={{
              duration: stage === 'charging' ? 1.7 : 1,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      {/* Burst Particles */}
      {stage === 'burst' && (
        <div className="particle-burst">
          {Array.from({ length: 40 }).map((_, i) => {
            const angle = (i * 360) / 40 + Math.random() * 15;
            const distance = 150 + Math.random() * 250;
            const size = Math.random() * 6 + 2;
            const delay = Math.random() * 0.2;
            const duration = 0.6 + Math.random() * 0.6;

            return (
              <motion.div
                key={i}
                className="burst-particle"
                style={{
                  width: size,
                  height: size,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * distance,
                  y: Math.sin((angle * Math.PI) / 180) * distance,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Main Hero Reveal Content */}
      <div className="reveal-content">
        {stage === 'reveal' && (
          <div className="text-reveal-wrapper">
            <h1 className="hero-name">
              {nameWords.map((word, wordIndex) => (
                <span key={wordIndex} className="word-span">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      className="letter-span"
                      initial={{ opacity: 0, scale: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: (wordIndex * 4 + letterIndex) * 0.04,
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  &nbsp;
                </span>
              ))}
            </h1>

            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            >
              Welcome to my portfolio
            </motion.h2>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              CS Undergrad & Competitive Programmer | Builder of Intelligent Systems
            </motion.p>

            <motion.div
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="scroll-text">Explore Constellations</span>
              <div className="chevron-down" />
            </motion.div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hero-container {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 5;
        }

        .galaxy-core {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle, #c084fc 0%, #8b5cf6 50%, #4f46e5 100%);
          box-shadow: 0 0 50px #8b5cf6, 0 0 100px #6366f1, 0 0 150px #4338ca;
        }

        .galaxy-core.charging {
          box-shadow: 0 0 80px #a855f7, 0 0 140px #8b5cf6, 0 0 200px #6366f1, 0 0 300px #4f46e5;
        }

        .particle-burst {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .burst-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, #c084fc 50%, #8b5cf6 100%);
          box-shadow: 0 0 10px #c084fc, 0 0 20px #8b5cf6;
        }

        .reveal-content {
          text-align: center;
          z-index: 10;
          max-width: 900px;
          padding: 0 2rem;
        }

        .text-reveal-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-name {
          font-family: var(--font-serif);
          font-size: 4.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff 40%, #c084fc 70%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.35));
        }

        .word-span {
          display: inline-flex;
          white-space: nowrap;
        }

        .letter-span {
          display: inline-block;
          transform-origin: center bottom;
        }

        .hero-subtitle {
          font-family: var(--font-sans);
          font-size: 1.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }

        .hero-tagline {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--text-purple);
          letter-spacing: 1px;
          max-width: 600px;
          line-height: 1.6;
        }

        .scroll-indicator {
          margin-top: 5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .scroll-indicator:hover {
          transform: translateY(4px);
        }

        .scroll-text {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .chevron-down {
          width: 14px;
          height: 14px;
          border-right: 2px solid var(--text-secondary);
          border-bottom: 2px solid var(--text-secondary);
          transform: rotate(45deg);
          animation: chevron-pulse 2s infinite ease-in-out;
        }

        @keyframes chevron-pulse {
          0%, 100% { transform: translateY(0) rotate(45deg); opacity: 0.5; }
          50% { transform: translateY(8px) rotate(45deg); opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.75rem;
          }
          .hero-subtitle {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </div>
  );
}
