'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "CopBotChatbox",
      tag: "🏆 Winner, DevRiot 2025",
      description: "An advanced RAG-based legal assistance system. Employs LangChain and optimized vector indexing to query legal documents and render contextual responses through an interactive interface.",
      tech: ["Python", "Flask", "LangChain", "VectorDB", "RAG", "SQLite"],
      github: "https://github.com/ffrazi",
    },
    {
      title: "OrganChain",
      tag: "🥈 Finalist, Hacksagon 2026",
      description: "A decentralized, immutable ledger system for tracking and registering organ donation queues, ensuring transparency and reducing allocation tampering.",
      tech: ["Java", "Spring Boot", "Flask", "Ethereum", "Docker", "Vercel"],
      github: "https://github.com/ffrazi",
    },
    {
      title: "PHI Masking API",
      tag: "API Services",
      description: "A high-performance security API designed to scan and mask Protected Health Information (PHI) in text streams, leveraging custom NLP pipelines and strict regex rules.",
      tech: ["Python", "FastAPI", "NLP", "Regex", "Security"],
      github: "https://github.com/ffrazi",
    },
    {
      title: "Real-Time Emotion Recognition",
      tag: "Computer Vision",
      description: "A machine learning application utilizing computer vision models to classify human facial expressions in real-time streams with approximately 92% classification accuracy.",
      tech: ["Python", "OpenCV", "TensorFlow", "Keras", "Dlib"],
      github: "https://github.com/ffrazi",
    },
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">Stellar Projects</h2>

        <div className="projects-grid">
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              className="project-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="project-badge-wrapper">
                {proj.tag.includes('🏆') || proj.tag.includes('🥈') ? (
                  <div className="trophy-badge">
                    <Trophy size={14} />
                    <span>{proj.tag}</span>
                  </div>
                ) : (
                  <div className="tag-badge">
                    <span>{proj.tag}</span>
                  </div>
                )}
              </div>

              <h3 className="project-name">{proj.title}</h3>
              <p className="project-desc">{proj.description}</p>

              <div className="project-tech">
                {proj.tech.map((t, idx) => (
                  <span key={idx} className="tech-badge">{t}</span>
                ))}
              </div>

              <div className="project-links">
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                  <Github size={18} />
                  <span>Repository</span>
                </a>
                <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link external">
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
          margin-top: 1rem;
        }

        .project-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-badge-wrapper {
          margin-bottom: 1.25rem;
          align-self: flex-start;
        }

        .trophy-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(234, 179, 8, 0.12);
          border: 1px solid rgba(234, 179, 8, 0.3);
          color: #eab308;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .tag-badge {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          color: var(--text-purple);
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .project-name {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.75rem;
          flex-grow: 1;
        }

        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .tech-badge {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.15);
          color: #a5b4fc;
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
        }

        .project-links {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 1.25rem;
        }

        .proj-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }

        .proj-link:hover {
          color: var(--text-purple);
        }

        .proj-link.external {
          margin-left: auto;
        }

        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
