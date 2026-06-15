'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: "AI/ML Developer & Tester",
      company: "BrumBella IoT Private Ltd.",
      period: "June 2026 – Present",
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
          {/* Central vertical line */}
          <div className="timeline-line" />

          {experiences.map((exp, index) => {
            // First item (index 0) on right (|_), second on left (_|), third on right (|_)
            const isLeft = index % 2 === 1;
            return (
              <motion.div
                key={index}
                className="timeline-row"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* LEFT CARD */}
                <div className={`timeline-side left-side ${isLeft ? 'has-card' : 'empty'}`}>
                  {isLeft && (
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
                  )}
                </div>

                {/* CENTER DOT */}
                <div className="timeline-center">
                  <div className="timeline-dot" />
                </div>

                {/* RIGHT CARD */}
                <div className={`timeline-side right-side ${!isLeft ? 'has-card' : 'empty'}`}>
                  {!isLeft && (
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
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .timeline-container {
          position: relative;
          max-width: 1100px;
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
            rgba(139, 92, 246, 0.1) 0%,
            var(--accent-purple) 20%,
            var(--accent-indigo) 80%,
            rgba(99, 102, 241, 0.1) 100%
          );
          transform: translateX(-50%);
          z-index: 1;
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);
        }

        .timeline-row {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 2;
          margin-bottom: 3rem;
        }

        .timeline-side {
          flex: 1;
          min-width: 0;
          position: relative;
        }

        .left-side {
          padding-right: 3rem;
        }

        .right-side {
          padding-left: 3rem;
        }

        /* Horizontal Connector Lines (Tree Branches) */
        .left-side.has-card::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3rem; /* connects card edge to center line */
          height: 2px;
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.1), var(--accent-purple));
          z-index: 1;
          box-shadow: 0 1px 4px rgba(139, 92, 246, 0.2);
        }

        .right-side.has-card::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3rem; /* connects center line to card edge */
          height: 2px;
          background: linear-gradient(90deg, var(--accent-purple), rgba(139, 92, 246, 0.1));
          z-index: 1;
          box-shadow: 0 1px 4px rgba(139, 92, 246, 0.2);
        }

        .left-side.empty,
        .right-side.empty {
          visibility: hidden;
        }

        .timeline-center {
          flex-shrink: 0;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
        }

        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--accent-purple);
          box-shadow: 0 0 8px var(--accent-purple), 0 0 15px rgba(139, 92, 246, 0.5);
          z-index: 3;
          transition: all 0.3s ease;
        }

        .timeline-dot:hover {
          transform: scale(1.3);
          box-shadow: 0 0 12px var(--accent-purple), 0 0 25px var(--accent-purple);
        }

        .timeline-card {
          padding: 2rem;
          cursor: pointer;
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
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          color: var(--text-purple);
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
          .timeline-row {
            flex-direction: row;
            margin-bottom: 2rem;
          }
          .timeline-center {
            position: absolute;
            left: 0;
          }
          .timeline-side {
            padding-left: 50px !important;
            padding-right: 0 !important;
          }
          .left-side.empty {
            display: none;
          }
          .right-side.empty {
            display: none;
          }
          .left-side.has-card,
          .right-side.has-card {
            visibility: visible;
            flex: 1;
          }
          
          /* Adjust connectors on mobile since all cards align to the right of line */
          .left-side.has-card::after {
            left: 0;
            right: auto;
            width: 30px;
            background: linear-gradient(90deg, var(--accent-purple), rgba(139, 92, 246, 0.1));
          }
          .right-side.has-card::after {
            left: 0;
            width: 30px;
            background: linear-gradient(90deg, var(--accent-purple), rgba(139, 92, 246, 0.1));
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
