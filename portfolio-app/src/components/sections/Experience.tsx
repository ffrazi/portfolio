'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: "AI/ML Developer & Tester",
      company: "LCS Controls Pvt. Ltd.",
      period: "June 2025 – Present",
      description: "Architecting and deploying production-ready ML models, fine-tuning existing models for performance optimization, and developing L&D training resources for internal teams and new joinees across Electronics, CS, and AI/ML domains.",
      tech: ["Python", "TensorFlow", "LangChain", "FastAPI", "Docker"],
    },
    {
      role: "Software Engineering Intern",
      company: "LCS Controls Pvt. Ltd.",
      period: "June 2025 – July 2025",
      description: "Designed and implemented robust backend automation routines, worked on telemetry APIs, and refined relational schemas to optimize system integration speeds.",
      tech: ["Python", "Flask", "PostgreSQL", "REST APIs"],
    },
    {
      role: "Online Software Intern",
      company: "HostCircle IT Solutions",
      period: "July 2024 – August 2024",
      description: "Administered virtualization nodes, automated server maintenance configurations, managed container setups, and gained hands-on experience in networking infrastructure and security policies.",
      tech: ["Linux", "Docker", "Bash Scripting", "Networking"],
    },
  ];

  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">Timeline of Experience</h2>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Lightning bolt node */}
              <div className="timeline-dot">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="dot-icon-svg">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" />
                </svg>
              </div>

              <div className="timeline-card glass">
                <div className="card-header">
                  <div className="header-meta">
                    <span className="role">{exp.role}</span>
                    <span className="company text-purple">{exp.company}</span>
                  </div>
                  <div className="date-badge">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="description">{exp.description}</p>
                <div className="tech-tags">
                  {exp.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(148, 163, 184, 0.05) 0%, 
            rgba(226, 232, 240, 0.6) 15%, 
            rgba(255, 255, 255, 0.8) 50%, 
            rgba(226, 232, 240, 0.6) 85%, 
            rgba(148, 163, 184, 0.05) 100%
          );
          transform: translateX(-50%);
          z-index: 1;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.15), 0 0 20px rgba(148, 163, 184, 0.1);
        }

        .timeline-item {
          display: flex;
          justify-content: flex-end;
          width: 50%;
          position: relative;
          z-index: 2;
          padding: 1.5rem 0;
        }

        .timeline-item.left {
          align-self: flex-start;
          justify-content: flex-start;
          left: 0;
          padding-right: 3rem;
        }

        .timeline-item.right {
          align-self: flex-end;
          justify-content: flex-start;
          left: 50%;
          padding-left: 3rem;
        }

        .timeline-dot {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(226, 232, 240, 0.15), rgba(148, 163, 184, 0.1));
          border: 2px solid rgba(226, 232, 240, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.2), 0 0 25px rgba(148, 163, 184, 0.15);
          transition: all 0.3s ease;
          z-index: 3;
          backdrop-filter: blur(4px);
        }

        .timeline-dot:hover {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 40px rgba(226, 232, 240, 0.25);
          border-color: rgba(255, 255, 255, 0.7);
        }

        .timeline-item.right .timeline-dot {
          left: 0;
        }

        .dot-icon-svg {
          color: rgba(226, 232, 240, 0.9);
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
        }

        .timeline-card {
          width: 100%;
          padding: 2rem;
          position: relative;
          cursor: pointer;
          border-color: rgba(148, 163, 184, 0.12);
        }

        .timeline-card:hover {
          border-color: rgba(226, 232, 240, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(226, 232, 240, 0.05);
        }

        .timeline-card::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 0;
          height: 0;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          z-index: 1;
        }

        .timeline-item.left .timeline-card::before {
          right: -10px;
          border-left: 10px solid rgba(148, 163, 184, 0.12);
          transform: translateY(-50%);
        }

        .timeline-item.right .timeline-card::before {
          left: -10px;
          border-right: 10px solid rgba(148, 163, 184, 0.12);
          transform: translateY(-50%);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          gap: 1rem;
        }

        .header-meta {
          display: flex;
          flex-direction: column;
        }

        .role {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .company {
          font-size: 0.95rem;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .date-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(226, 232, 240, 0.06);
          border: 1px solid rgba(226, 232, 240, 0.15);
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          color: rgba(226, 232, 240, 0.8);
          font-weight: 600;
          white-space: nowrap;
        }

        .description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }
          .timeline-item {
            width: 100% !important;
            padding-left: 50px !important;
            padding-right: 0 !important;
            align-self: flex-start !important;
            left: 0 !important;
          }
          .timeline-item.left .timeline-card::before,
          .timeline-item.right .timeline-card::before {
            left: -10px;
            right: auto;
            border-right: 10px solid rgba(148, 163, 184, 0.12);
            border-left: none;
          }
          .timeline-dot {
            left: 20px !important;
          }
          .card-header {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
