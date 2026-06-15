'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Cpu, Database, Server } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code size={24} />,
      skills: ["Python", "Java", "JavaScript", "SQL"],
    },
    {
      title: "Frameworks",
      icon: <Layers size={24} />,
      skills: ["Flask", "FastAPI", "Django", "React", "REST API"],
    },
    {
      title: "AI, ML & CV",
      icon: <Cpu size={24} />,
      skills: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "LangChain", "NLP"],
    },
    {
      title: "Database",
      icon: <Database size={24} />,
      skills: ["MySQL", "SQLite", "Firebase", "PostgreSQL"],
    },
    {
      title: "Cloud & DevOps",
      icon: <Server size={24} />,
      skills: ["Docker", "Git", "GitHub", "Vercel", "Render", "Kaggle"],
    },
  ];

  return (
    <section id="skills" className="skills-section">
      {/* Space floating particles */}
      <div className="particles-container">
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 6 + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 10;
          const duration = 15 + Math.random() * 20;

          return (
            <motion.div
              key={i}
              className="space-particle"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.1, 0.6, 0.1],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <div className="container skills-container">
        <h2 className="section-title">Skills</h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skills-card glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                borderColor: 'rgba(168, 85, 247, 0.6)',
                boxShadow: '0 0 35px rgba(139, 92, 246, 0.35), inset 0 0 15px rgba(168, 85, 247, 0.15)'
              }}
            >
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-dot" />
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-section {
          position: relative;
          overflow: hidden;
        }

        .particles-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .space-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-purple) 0%, transparent 80%);
          box-shadow: 0 0 10px var(--accent-purple);
        }

        .skills-container {
          max-width: 1400px !important;
          position: relative;
          z-index: 2;
        }

        .section-title {
          font-size: 3rem;
          margin-bottom: 4rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-auto-rows: 1fr; /* Forces equal height for all cards in the row */
          gap: 2rem;
        }

        .skills-card {
          padding: 2.5rem 2rem;
          background: rgba(10, 10, 25, 0.45);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1.25rem;
        }

        .category-icon {
          color: #ffffff;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-indigo));
          padding: 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
        }

        .category-header h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          flex-grow: 1;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .skill-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-purple);
          box-shadow: 0 0 8px var(--accent-purple);
          flex-shrink: 0;
        }

        .skill-name {
          font-size: 1.05rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .skills-card:hover .skill-name {
          color: var(--text-primary);
        }

        .skills-card:hover .skill-dot {
          background: var(--text-purple);
          box-shadow: 0 0 12px var(--text-purple);
        }

        /* Responsive Layouts */
        @media (max-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.75rem;
          }
        }

        @media (max-width: 850px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 550px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .skills-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
