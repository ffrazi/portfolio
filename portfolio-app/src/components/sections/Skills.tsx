'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Layout, Terminal } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Terminal size={22} />,
      skills: ["Python", "Java", "JS", "SQL"],
    },
    {
      title: "Frameworks",
      icon: <Layout size={22} />,
      skills: ["Flask", "Django", "FastAPI", "RestfulAPI", "React"],
    },
    {
      title: "Database",
      icon: <Database size={22} />,
      skills: ["Firebase", "Docker", "Vercel", "Render", "Sqlite", "Kaggle"],
    },
  ];

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">Constellation of Skills</h2>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skills-card glass"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="skill-item"
                    whileHover={{ scale: 1.05, borderColor: '#8b5cf6' }}
                  >
                    <div className="skill-dot"></div>
                    <span className="skill-name">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 1rem;
        }

        @media (max-width: 900px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .skills-card {
          padding: 2.25rem;
          height: 100%;
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1rem;
        }

        .category-icon {
          color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.1);
          padding: 0.6rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-header h3 {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.65rem 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.2s ease;
          cursor: default;
        }

        .skill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-purple);
          box-shadow: 0 0 8px var(--accent-purple);
        }

        .skill-name {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .skill-item:hover .skill-name {
          color: var(--text-primary);
        }

        .skill-item:hover .skill-dot {
          background: var(--accent-violet);
          box-shadow: 0 0 12px var(--accent-violet);
        }
      `}</style>
    </section>
  );
}
