'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GalaxyBurst() {
  const [stage, setStage] = useState<'idle' | 'charging' | 'burst' | 'reveal'>('idle');

  useEffect(() => {
    const chargeTimer = setTimeout(() => setStage('charging'), 500);
    const burstTimer = setTimeout(() => setStage('burst'), 2200);
    const revealTimer = setTimeout(() => setStage('reveal'), 3400);

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
        {/* Core sphere before the burst */}
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

      {/* Supernova Ring Explosion */}
      {(stage === 'burst' || stage === 'reveal') && (
        <>
          {/* Main expanding ring */}
          <motion.div
            className="supernova-ring"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 0.5, 3.5], opacity: [1, 0.9, 0] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Second ring - slightly delayed */}
          <motion.div
            className="supernova-ring ring-2"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: [0, 0.4, 3], opacity: [0.8, 0.6, 0] }}
            transition={{ duration: 1.6, delay: 0.15, ease: "easeOut" }}
          />

          {/* Third ring - outer glow */}
          <motion.div
            className="supernova-ring ring-3"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: [0, 0.3, 2.5], opacity: [0.5, 0.4, 0] }}
            transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          />

          {/* Central white flash */}
          <motion.div
            className="supernova-flash"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 4, 0], opacity: [1, 0.8, 0] }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />

          {/* Burst particles flying outward */}
          <div className="particle-burst">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = (i * 360) / 60 + Math.random() * 10;
              const distance = 200 + Math.random() * 400;
              const size = Math.random() * 4 + 1;
              const delay = Math.random() * 0.3;
              const duration = 0.8 + Math.random() * 0.8;

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

          {/* Radial streaks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            return (
              <motion.div
                key={`streak-${i}`}
                className="radial-streak"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
                initial={{ scaleX: 0, opacity: 0.8 }}
                animate={{ scaleX: [0, 1, 0], opacity: [0.8, 0.5, 0] }}
                transition={{ duration: 1.2, delay: 0.05, ease: "easeOut" }}
              />
            );
          })}
        </>
      )}

      {/* Main Hero Reveal Content */}
      <div className="reveal-content">
        {stage === 'reveal' && (
          <div className="text-reveal-wrapper">
            {/* Name emerges from within the explosion */}
            <motion.div
              className="name-container"
              initial={{ scale: 0.3, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-name">
                {nameWords.map((word, wordIndex) => (
                  <span key={wordIndex} className="word-span">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={letterIndex}
                        className="letter-span"
                        initial={{ opacity: 0, scale: 1.8, textShadow: '0 0 40px #fff' }}
                        animate={{ opacity: 1, scale: 1, textShadow: '0 0 0px #fff' }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + (wordIndex * 5 + letterIndex) * 0.035,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                    &nbsp;
                  </span>
                ))}
              </h1>

              {/* Glowing underline that sweeps across */}
              <motion.div
                className="name-glow-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0.3] }}
                transition={{ duration: 1.5, delay: 1.0, ease: "easeOut" }}
              />
            </motion.div>

            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
            >
              Welcome to my portfolio
            </motion.h2>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 0.8, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              CS Undergrad & Competitive Programmer | Builder of Intelligent Systems
            </motion.p>
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
          background: radial-gradient(circle, #ffffff 0%, #f1f5f9 50%, #cbd5e1 100%);
          box-shadow: 0 0 50px #ffffff, 0 0 100px #f1f5f9, 0 0 150px #cbd5e1;
        }

        .galaxy-core.charging {
          box-shadow: 0 0 80px #ffffff, 0 0 140px #f8fafc, 0 0 200px #f1f5f9, 0 0 300px #cbd5e1;
        }

        /* Supernova Ring */
        .supernova-ring {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            0 0 30px rgba(255, 255, 255, 0.6),
            0 0 60px rgba(241, 245, 249, 0.4),
            0 0 100px rgba(203, 213, 225, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
          pointer-events: none;
        }

        .supernova-ring.ring-2 {
          width: 250px;
          height: 250px;
          border: 2px solid rgba(226, 232, 240, 0.7);
          box-shadow:
            0 0 20px rgba(226, 232, 240, 0.5),
            0 0 50px rgba(203, 213, 225, 0.3);
        }

        .supernova-ring.ring-3 {
          width: 200px;
          height: 200px;
          border: 1.5px solid rgba(148, 163, 184, 0.5);
          box-shadow:
            0 0 15px rgba(148, 163, 184, 0.4),
            0 0 40px rgba(148, 163, 184, 0.2);
        }

        .supernova-flash {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.6) 40%, transparent 70%);
          pointer-events: none;
        }

        .radial-streak {
          position: absolute;
          width: 300px;
          height: 1.5px;
          background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1), transparent);
          transform-origin: left center;
          pointer-events: none;
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
          background: radial-gradient(circle, #fff 0%, #e2e8f0 50%, #94a3b8 100%);
          box-shadow: 0 0 8px #ffffff, 0 0 16px rgba(255,255,255,0.4);
        }

        .reveal-content {
          position: absolute;
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

        .name-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .name-glow-line {
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), rgba(203,213,225,0.4), transparent);
          transform-origin: center;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
        }

        .hero-name {
          font-family: var(--font-serif);
          font-size: 4.5rem;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff 40%, #c084fc 70%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.2));
        }

        .word-span {
          display: inline-flex;
          white-space: nowrap;
        }

        .letter-span {
          display: inline-block;
          transform-origin: center center;
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

        @media (max-width: 768px) {
          .hero-name {
            font-size: 2.75rem;
          }
          .hero-subtitle {
            font-size: 1.35rem;
          }
          .supernova-ring {
            width: 200px;
            height: 200px;
          }
          .supernova-ring.ring-2 {
            width: 160px;
            height: 160px;
          }
          .supernova-ring.ring-3 {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
}
