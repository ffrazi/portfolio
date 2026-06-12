'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, Network, Award, Zap } from 'lucide-react';

export default function Arena() {
  const platforms = [
    {
      name: "LeetCode",
      username: "Aneesa_Zainab_F",
      stats: "400+ Solved",
      color: "#FFA116",
      url: "https://leetcode.com/u/Aneesa_Zainab_F/",
    },
    {
      name: "Codeforces",
      username: "Ffrazi",
      stats: "Active Contestant",
      color: "#3182CE",
      url: "https://codeforces.com/profile/Ffrazi",
    },
    {
      name: "GeeksforGeeks",
      username: "ffrazzi",
      stats: "Solving Regularly",
      color: "#2F855A",
      url: "https://www.geeksforgeeks.org/user/ffrazzi/",
    },
    {
      name: "CodeChef",
      username: "solar_book_97",
      stats: "Contest Rating & Badges",
      color: "#964B00",
      url: "https://www.codechef.com/users/solar_book_97",
    },
    {
      name: "HackerRank",
      username: "aneesazainabf",
      stats: "Certifications",
      color: "#00EA64",
      url: "https://www.hackerrank.com/profile/aneesazainabf",
    },
    {
      name: "AtCoder",
      username: "ffrazi",
      stats: "Algorithm Participant",
      color: "#000000",
      url: "https://atcoder.jp/users/ffrazi",
    },
  ];

  return (
    <section id="arena">
      <div className="container">
        <h2 className="section-title">Coding Arena</h2>

        <div className="arena-wrapper">
          {/* Left Side: Highlights */}
          <motion.div
            className="arena-stats glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="stats-header">
              <Award className="gold-icon" />
              <h3>Competitive Highlights</h3>
            </div>
            
            <div className="highlight-items">
              <div className="highlight-item">
                <Zap className="highlight-icon" />
                <div>
                  <h4>400+ Problems Solved</h4>
                  <p>Consistently solving algorithms on LeetCode covering dynamic programming, graphs, and system design concepts.</p>
                </div>
              </div>
              <div className="highlight-item">
                <Code2 className="highlight-icon" />
                <div>
                  <h4>Multiple Arenas</h4>
                  <p>Solving on 7+ platforms to expand mathematical reasoning, problem solving, and low-level code speed.</p>
                </div>
              </div>
            </div>

            <div className="leetcode-preview">
              <img
                src="https://leetcode-stats-badge.herokuapp.com/?username=Aneesa_Zainab_F&theme=dark"
                alt="LeetCode Stats"
                className="lc-badge-img"
              />
            </div>
          </motion.div>

          {/* Right Side: Platform list */}
          <div className="platforms-grid">
            {platforms.map((plat, idx) => (
              <motion.a
                href={plat.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="platform-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, borderColor: plat.color }}
              >
                <div className="plat-info">
                  <div className="plat-indicator" style={{ backgroundColor: plat.color }}></div>
                  <div>
                    <h4 className="plat-name">{plat.name}</h4>
                    <span className="plat-username">@{plat.username}</span>
                  </div>
                </div>
                <div className="plat-action">
                  <span className="plat-stats">{plat.stats}</span>
                  <ExternalLink size={14} className="plat-arrow" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .arena-wrapper {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
        }

        .arena-stats {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .gold-icon {
          color: #eab308;
          flex-shrink: 0;
        }

        .stats-header h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .highlight-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .highlight-item {
          display: flex;
          gap: 1rem;
        }

        .highlight-icon {
          color: var(--accent-purple);
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .highlight-item h4 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .highlight-item p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .leetcode-preview {
          margin-top: auto;
          display: flex;
          justify-content: center;
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .lc-badge-img {
          max-width: 100%;
          height: auto;
        }

        .platforms-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .platform-card {
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }

        .plat-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .plat-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .plat-name {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .plat-username {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .plat-action {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .plat-stats {
          font-size: 0.85rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .plat-arrow {
          color: var(--text-secondary);
          transition: transform 0.2s ease;
        }

        .platform-card:hover .plat-arrow {
          transform: translateX(3px);
          color: var(--text-primary);
        }

        @media (max-width: 968px) {
          .arena-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
