'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Code, GraduationCap } from 'lucide-react';

export default function About() {
  const codeSnippet = `const developer = {
  name: "Aneesa Zainab Fazulullah",
  title: "CS Undergrad & Builder",
  skills: [
    "Python", "Java", "C++", "C", 
    "JS", "TS", "FastAPI", "React", 
    "Next.js", "Docker", "LangChain", 
    "Spring Boot", "Firebase"
  ],
  passion: "Building secure, intelligent applications."
};`;

  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">About the Constellation</h2>
        
        <div className="about-grid">
          {/* Left Side: Bio & Details */}
          <motion.div 
            className="about-details glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="about-heading">Aneesa Zainab Fazulullah</h3>
            <p className="about-bio">
              A computer science undergraduate at St. Joseph's College of Engineering with a CGPA of 9.00. 
              I specialize in building intelligent backend services, decentralization layers, and user experiences 
              with rich aesthetics.
            </p>
            <p className="about-bio">
              My core interests sit at the intersection of AI, Web Development, and Cybersecurity. I love breaking down complex 
              problems, optimization, and creating things that feel responsive and alive.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <GraduationCap className="info-icon" />
                <div>
                  <h4>Education</h4>
                  <p>B.E. Computer Science</p>
                  <p className="card-sub text-purple">St. Joseph's (CGPA: 9.00)</p>
                </div>
              </div>
              
              <div className="info-card">
                <Award className="info-icon" />
                <div>
                  <h4>Hackathons</h4>
                  <p>Winner @ DevRiot 2025</p>
                  <p className="card-sub text-purple">Finalist @ Hacksagon 2026</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: IDE/Code Block */}
          <motion.div 
            className="about-code glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="code-header">
              <div className="code-dot red"></div>
              <div className="code-dot yellow"></div>
              <div className="code-dot green"></div>
              <span className="code-title">developer.js</span>
            </div>
            <pre className="code-body">
              <code>{codeSnippet}</code>
            </pre>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
        }

        .about-details {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-heading {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--text-primary);
        }

        .about-bio {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .info-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .info-card {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.1);
          padding: 1.25rem;
          border-radius: 12px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.25);
          transform: translateY(-2px);
        }

        .info-icon {
          color: var(--accent-purple);
          flex-shrink: 0;
        }

        .info-card h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .info-card p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .card-sub {
          font-size: 0.8rem !important;
          margin-top: 0.25rem;
        }

        .about-code {
          border-radius: 12px;
          overflow: hidden;
          padding: 0;
          background: rgba(5, 5, 12, 0.8);
        }

        .code-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(26, 27, 38, 0.5);
          border-bottom: 1px solid var(--glass-border);
        }

        .code-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .code-dot.red { background: #ff5f56; }
        .code-dot.yellow { background: #ffbd2e; }
        .code-dot.green { background: #27c93f; }

        .code-title {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-left: 0.5rem;
        }

        .code-body {
          padding: 1.5rem;
          margin: 0;
          overflow-x: auto;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          line-height: 1.6;
          color: #c084fc;
        }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
