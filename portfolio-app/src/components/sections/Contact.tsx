'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    try {
      // 1. Save message to Firestore database
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      // 2. Forward notification to user email using FormSubmit
      try {
        await fetch('https://formsubmit.co/ajax/aneesazainabf@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`
          })
        });
      } catch (emailError) {
        console.error('Email forwarding error:', emailError);
      }

      setFormData({ name: '', email: '', message: '' });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const socials = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/ffrazi",
      color: "rgba(255,255,255,0.1)",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/aneesa-zainab-6355ba2b6/",
      color: "rgba(10, 102, 194, 0.15)",
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:aneesazainabf@gmail.com",
      color: "rgba(139, 92, 246, 0.15)",
    },
  ];

  return (
    <section id="contact">
      <div className="container">
        <h2 className="section-title">Connect with Me</h2>

        <div className="contact-wrapper">
          {/* Left Side: Connect details */}
          <motion.div
            className="contact-details glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Ready to Build?</h3>
            <p className="contact-tagline">
              Have an exciting project, a role suggestion, or just want to chat about algorithms and stars? 
              Reach out and let's configure something amazing.
            </p>

            <div className="social-links-list">
              {socials.map((soc, index) => (
                <a
                  key={index}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-badge"
                  style={{ background: soc.color }}
                >
                  <span className="social-icon">{soc.icon}</span>
                  <span className="social-name">{soc.name}</span>
                </a>
              ))}
            </div>

            <div className="quote-panel">
              <MessageSquare className="quote-icon" />
              <p className="poetic-quote">
                "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
              </p>
              <span className="quote-author">— Carl Sagan</span>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            className="contact-form-wrapper glass"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Greetings from across the galaxy..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary form-submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.p
                  className="status-message success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message transmitted successfully!
                </motion.p>
              )}

              {status === 'error' && (
                <motion.p
                  className="status-message error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Transmission failed. Please try again or use direct email.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .contact-wrapper {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 3rem;
        }

        .contact-details {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-details h3 {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          color: var(--text-primary);
        }

        .contact-tagline {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .social-links-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }

        .social-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
        }

        .social-badge:hover {
          border-color: var(--accent-purple);
          transform: translateX(4px);
        }

        .social-icon {
          color: var(--text-primary);
          display: flex;
          align-items: center;
        }

        .social-name {
          font-size: 1rem;
          font-weight: 600;
        }

        .quote-panel {
          margin-top: auto;
          background: rgba(139, 92, 246, 0.04);
          border-left: 3px solid var(--accent-purple);
          padding: 1.25rem;
          border-radius: 0 12px 12px 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quote-icon {
          color: var(--accent-purple);
          opacity: 0.5;
        }

        .poetic-quote {
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .quote-author {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-purple);
          align-self: flex-end;
        }

        .contact-form-wrapper {
          padding: 2.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-group input,
        .form-group textarea {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-purple);
          background: rgba(139, 92, 246, 0.05);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.15);
        }

        .form-submit-btn {
          width: 100%;
          padding: 0.9rem 1.5rem;
          margin-top: 0.5rem;
        }

        .status-message {
          font-size: 0.9rem;
          font-weight: 600;
          text-align: center;
          margin-top: 0.5rem;
        }

        .status-message.success {
          color: #10b981;
        }

        .status-message.error {
          color: #ef4444;
        }

        @media (max-width: 968px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
