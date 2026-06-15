'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Sparkles } from 'lucide-react';

export default function Arena() {
  const platforms = [
    {
      name: "LeetCode",
      username: "@Aneesa_Zainab_F",
      stats: "400+ Problems Solved",
      color: "#ffa116",
      url: "https://leetcode.com/u/Aneesa_Zainab_F/",
    },
    {
      name: "Codeforces",
      username: "@ffrazi",
      stats: "Active Contestant",
      color: "#3b82f6",
      url: "https://codeforces.com/profile/Ffrazi",
    },
    {
      name: "GeeksforGeeks",
      username: "@ffrazzi",
      stats: "Solving Regularly",
      color: "#10b981",
      url: "https://www.geeksforgeeks.org/user/ffrazzi/",
    },
    {
      name: "CodeChef",
      username: "@solar_book_97",
      stats: "Contest Rating & Badges",
      color: "#f59e0b",
      url: "https://www.codechef.com/users/solar_book_97",
    },
    {
      name: "HackerRank",
      username: "@aneesazainabf",
      stats: "Certifications",
      color: "#a855f7",
      url: "https://www.hackerrank.com/profile/aneesazainabf",
    },
    {
      name: "AtCoder",
      username: "@ffrazi",
      stats: "Algorithm Participant",
      color: "#e2e8f0",
      url: "https://atcoder.jp/users/ffrazi",
    },
  ];

  // Helper to render heatmap cells (7 rows x 20 columns)
  const renderHeatmap = () => {
    const cells = [];
    const intensities = [0.1, 0.25, 0.5, 0.8, 1];
    for (let i = 0; i < 7 * 20; i++) {
      const rand = Math.random();
      let opacity = 0.05;
      if (rand > 0.8) opacity = intensities[4];
      else if (rand > 0.6) opacity = intensities[3];
      else if (rand > 0.4) opacity = intensities[2];
      else if (rand > 0.2) opacity = intensities[1];
      
      cells.push(
        <div 
          key={i} 
          className="heatmap-cell"
          style={{ 
            backgroundColor: `rgba(168, 85, 247, ${opacity})`,
            boxShadow: opacity >= 0.8 ? '0 0 6px rgba(168, 85, 247, 0.6)' : 'none'
          }}
        />
      );
    }
    return cells;
  };

  return (
    <section id="arena" className="arena-section">
      {/* Background drifting particles */}
      <div className="arena-particles">
        {Array.from({ length: 12 }).map((_, i) => {
          const size = Math.random() * 5 + 2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = 12 + Math.random() * 15;

          return (
            <motion.div
              key={i}
              className="arena-particle"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -35, 0],
                x: [0, 15, 0],
                opacity: [0.15, 0.5, 0.15],
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

      <div className="container arena-container">
        <h2 className="section-title">Coding Arena</h2>

        <div className="arena-split-grid">
          {/* LEFT PANEL: Competitive Highlights & LeetCode Stats */}
          <div className="arena-panel glass left-panel">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="panel-header">
                <Award className="header-icon" />
                <h3>Competitive Highlights</h3>
              </div>

              <div className="highlights-content">
                <div className="highlight-row">
                  <span className="emoji-icon">⚡</span>
                  <div className="highlight-text">
                    <h4>400+ Problems Solved</h4>
                    <p>Consistently solving DSA problems across arrays, DP, graphs, trees, greedy algorithms, and system design concepts.</p>
                  </div>
                </div>

                <div className="highlight-row">
                  <span className="emoji-icon">⚔</span>
                  <div className="highlight-text">
                    <h4>Multiple Coding Arenas</h4>
                    <p>Actively participating across several competitive programming platforms to strengthen problem-solving and algorithmic thinking.</p>
                  </div>
                </div>
              </div>

              {/* LeetCode Stats Card Dashboard */}
              <div className="leetcode-dashboard">
                <div className="dashboard-header">
                  <div className="db-brand">
                    <span className="db-logo">L</span>
                    <span>LeetCode Status</span>
                  </div>
                  <div className="db-rank">Rank: 92,104</div>
                </div>

                <div className="dashboard-stats-grid">
                  {/* Solved breakdown */}
                  <div className="stats-circle-container">
                    <svg className="progress-ring" width="100" height="100">
                      <circle className="progress-ring-bg" cx="50" cy="50" r="40" />
                      <circle className="progress-ring-fill" cx="50" cy="50" r="40" />
                    </svg>
                    <div className="circle-labels">
                      <span className="circle-num">412</span>
                      <span className="circle-sub">Solved</span>
                    </div>
                  </div>

                  {/* Level list */}
                  <div className="levels-list">
                    <div className="level-item">
                      <div className="level-meta">
                        <span className="level-name easy">Easy</span>
                        <span className="level-count">150<span className="total">/450</span></span>
                      </div>
                      <div className="level-bar-bg"><div className="level-bar-fill easy" style={{ width: '33%' }}></div></div>
                    </div>
                    <div className="level-item">
                      <div className="level-meta">
                        <span className="level-name medium">Medium</span>
                        <span className="level-count">220<span className="total">/680</span></span>
                      </div>
                      <div className="level-bar-bg"><div className="level-bar-fill medium" style={{ width: '32%' }}></div></div>
                    </div>
                    <div className="level-item">
                      <div className="level-meta">
                        <span className="level-name hard">Hard</span>
                        <span className="level-count">42<span className="total">/270</span></span>
                      </div>
                      <div className="level-bar-bg"><div className="level-bar-fill hard" style={{ width: '15%' }}></div></div>
                    </div>
                  </div>

                  {/* Performance specs */}
                  <div className="performance-specs">
                    <div className="spec-row">
                      <span className="spec-label">Acceptance</span>
                      <span className="spec-val">64.5%</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Contest Rating</span>
                      <span className="spec-val rating">1720</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-label">Daily Streak</span>
                      <span className="spec-val streak">15 Days</span>
                    </div>
                  </div>
                </div>

                {/* Heatmap Contribution Graph */}
                <div className="heatmap-container">
                  <div className="heatmap-header">
                    <span>Contributions</span>
                    <span className="heatmap-legend">Less <span className="cell-sq"></span><span className="cell-sq high"></span> More</span>
                  </div>
                  <div className="heatmap-grid">
                    {renderHeatmap()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT PANEL: Coding Platforms */}
          <div className="arena-panel glass right-panel">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <div className="panel-header">
                <Sparkles className="header-icon" />
                <h3>Coding Platforms</h3>
              </div>

              <div className="platforms-list">
                {platforms.map((plat, idx) => (
                  <a
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    className="platform-row-item"
                  >
                    {/* Column 1: Colored Dot */}
                    <div className="col-dot">
                      <div className="status-dot" style={{ backgroundColor: plat.color, boxShadow: `0 0 10px ${plat.color}` }} />
                    </div>

                    {/* Column 2: Platform Name */}
                    <div className="col-name">
                      <span className="platform-name">{plat.name}</span>
                    </div>

                    {/* Column 3: Username */}
                    <div className="col-username">
                      <span className="platform-username">{plat.username}</span>
                    </div>

                    {/* Column 4: Badge */}
                    <div className="col-badge">
                      <span className="platform-badge">{plat.stats}</span>
                    </div>

                    {/* Column 5: Link Arrow */}
                    <div className="col-arrow">
                      <ExternalLink size={16} className="link-arrow" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .arena-section {
          position: relative;
          overflow: hidden;
        }

        .arena-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .arena-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-purple) 0%, transparent 80%);
          box-shadow: 0 0 8px var(--accent-purple);
        }

        .arena-container {
          max-width: 1400px !important;
          position: relative;
          z-index: 2;
        }

        .arena-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: stretch;
        }

        .arena-panel {
          padding: 2.5rem;
          background: rgba(10, 10, 25, 0.45);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          height: 100%;
        }

        .panel-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1.25rem;
        }

        .panel-header :global(.header-icon) {
          color: var(--accent-purple);
          filter: drop-shadow(0 0 8px var(--accent-purple));
        }

        .panel-header h3 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        /* Highlights Styles */
        .highlights-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .highlight-row {
          display: flex;
          gap: 1.25rem;
        }

        .emoji-icon {
          font-size: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }

        .highlight-text h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }

        .highlight-text p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* LeetCode Dashboard Styles */
        .leetcode-dashboard {
          margin-top: auto;
          background: rgba(10, 10, 20, 0.5);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 12px;
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.75rem;
        }

        .db-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }

        .db-logo {
          background: #ffa116;
          color: #000;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.9rem;
        }

        .db-rank {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-purple);
        }

        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.5rem;
          align-items: center;
        }

        .stats-circle-container {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .progress-ring-bg {
          fill: transparent;
          stroke: rgba(255, 255, 255, 0.05);
          stroke-width: 8;
        }

        .progress-ring-fill {
          fill: transparent;
          stroke: var(--accent-purple);
          stroke-width: 8;
          stroke-dasharray: 251.2;
          stroke-dashoffset: 160;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50px 50px;
        }

        .circle-labels {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .circle-num {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
        }

        .circle-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .levels-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .level-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .level-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .level-name {
          font-weight: 700;
        }

        .level-name.easy { color: #10b981; }
        .level-name.medium { color: #f59e0b; }
        .level-name.hard { color: #ef4444; }

        .level-count {
          color: var(--text-primary);
        }

        .level-count .total {
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .level-bar-bg {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .level-bar-fill {
          height: 100%;
          border-radius: 10px;
        }

        .level-bar-fill.easy { background: #10b981; }
        .level-bar-fill.medium { background: #f59e0b; }
        .level-bar-fill.hard { background: #ef4444; }

        .performance-specs {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          padding-left: 1.5rem;
        }

        .spec-row {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .spec-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .spec-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .spec-val.rating {
          color: var(--text-purple);
        }

        .spec-val.streak {
          color: #ffa116;
        }

        /* Heatmap Graph Styles */
        .heatmap-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 0.75rem;
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .heatmap-legend {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cell-sq {
          width: 8px;
          height: 8px;
          background: rgba(168, 85, 247, 0.15);
          border-radius: 1px;
        }

        .cell-sq.high {
          background: rgba(168, 85, 247, 0.8);
          box-shadow: 0 0 4px rgba(168, 85, 247, 0.6);
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(20, 1fr);
          gap: 4px;
        }

        :global(.heatmap-cell) {
          aspect-ratio: 1;
          border-radius: 1.5px;
        }

        /* RIGHT PANEL: Platform List Row Styles */
        .platforms-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          height: 100%;
          justify-content: space-between;
        }

        .platform-row-item {
          display: grid;
          grid-template-columns: 30px 1.5fr 1.5fr 2.5fr 40px;
          align-items: center;
          padding: 1rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          white-space: nowrap;
          overflow: hidden;
        }

        .platform-row-item:hover {
          transform: scale(1.02);
          border-color: rgba(168, 85, 247, 0.4);
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.15);
        }

        .col-dot {
          display: flex;
          align-items: center;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .col-name {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .platform-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .col-username {
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 0.5rem;
        }

        .platform-username {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .col-badge {
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .platform-badge {
          font-size: 0.85rem;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 50px;
          color: var(--text-purple);
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .col-arrow {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .platform-row-item :global(.link-arrow) {
          color: var(--text-secondary);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .platform-row-item:hover :global(.link-arrow) {
          transform: translate(2px, -2px);
          color: var(--text-purple);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .arena-split-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .platform-row-item {
            padding: 0.9rem 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .arena-panel {
            padding: 1.75rem;
          }
          .dashboard-stats-grid {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 1.25rem;
          }
          .performance-specs {
            border-left: none;
            padding-left: 0;
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
          }
          .platform-row-item {
            grid-template-columns: 20px 1.2fr 1fr auto;
            padding: 0.85rem 1rem;
            gap: 0.5rem;
          }
          .col-badge {
            display: none;
          }
          .platform-name {
            font-size: 1.05rem;
          }
          .platform-username {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
