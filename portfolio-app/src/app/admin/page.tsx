'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Shield,
  UserPlus,
  Trash2,
  Users,
  Clock,
  Loader2,
  ArrowLeft,
  Mail,
  Activity,
} from 'lucide-react';

interface AllowedEmail {
  id: string;
  email: string;
}

interface VisitLog {
  id: string;
  email: string;
  timestamp: { seconds: number } | null;
  userAgent: string;
}

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'emails' | 'logs'>('emails');
  const [allowedEmails, setAllowedEmails] = useState<AllowedEmail[]>([]);
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [dataLoading, setDataLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/');
    }
  }, [loading, user, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setDataLoading(true);
    try {
      // Fetch allowed emails
      const emailsSnapshot = await getDocs(collection(db, 'allowedEmails'));
      const emails: AllowedEmail[] = emailsSnapshot.docs.map((d) => ({
        id: d.id,
        email: d.id,
      }));
      setAllowedEmails(emails);

      // Fetch visit logs
      const logsQuery = query(collection(db, 'visitLogs'), orderBy('timestamp', 'desc'));
      const logsSnapshot = await getDocs(logsQuery);
      const logs: VisitLog[] = logsSnapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<VisitLog, 'id'>),
      }));
      setVisitLogs(logs);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setDataLoading(false);
  };

  const addEmail = async () => {
    if (!newEmail.trim()) return;
    setActionLoading(true);
    try {
      await setDoc(doc(db, 'allowedEmails', newEmail.trim().toLowerCase()), {
        addedAt: new Date().toISOString(),
        addedBy: user?.email,
      });
      setNewEmail('');
      await fetchData();
    } catch (err) {
      console.error('Failed to add email:', err);
    }
    setActionLoading(false);
  };

  const removeEmail = async (emailId: string) => {
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, 'allowedEmails', emailId));
      await fetchData();
    } catch (err) {
      console.error('Failed to remove email:', err);
    }
    setActionLoading(false);
  };

  const formatDate = (ts: { seconds: number } | null) => {
    if (!ts) return 'Unknown';
    return new Date(ts.seconds * 1000).toLocaleString();
  };

  if (loading || !isAdmin) {
    return (
      <div className="admin-loader">
        <Loader2 size={32} className="spin" />
        <style jsx>{`
          .admin-loader {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-purple);
          }
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button className="back-btn" onClick={() => router.push('/')}>
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>

          <div className="header-title">
            <Shield size={28} className="shield-icon" />
            <div>
              <h1>Admin Panel</h1>
              <p>Manage access and monitor activity</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="tab-bar">
          <button
            className={`tab ${activeTab === 'emails' ? 'active' : ''}`}
            onClick={() => setActiveTab('emails')}
          >
            <Users size={16} />
            Manage Access
          </button>
          <button
            className={`tab ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            <Activity size={16} />
            Visitor Logs
          </button>
        </div>

        {/* Content */}
        {dataLoading ? (
          <div className="loading-state">
            <Loader2 size={24} className="spin" />
            <p>Loading data...</p>
          </div>
        ) : activeTab === 'emails' ? (
          <motion.div
            className="tab-content glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Add Email Form */}
            <div className="add-email-row">
              <div className="email-input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  id="admin-add-email"
                  type="email"
                  placeholder="Add authorized email..."
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addEmail()}
                />
              </div>
              <button
                className="btn-primary add-btn"
                onClick={addEmail}
                disabled={actionLoading || !newEmail.trim()}
              >
                <UserPlus size={16} />
                Add
              </button>
            </div>

            {/* Email List */}
            <div className="email-list">
              {allowedEmails.length === 0 ? (
                <p className="empty-state">No authorized emails yet. Add one above.</p>
              ) : (
                allowedEmails.map((item) => (
                  <div key={item.id} className="email-row">
                    <div className="email-info">
                      <Mail size={14} />
                      <span>{item.email}</span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeEmail(item.id)}
                      disabled={actionLoading}
                      title="Remove access"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="tab-content glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {visitLogs.length === 0 ? (
              <p className="empty-state">No visitor logs recorded yet.</p>
            ) : (
              <div className="logs-table-wrapper">
                <table className="logs-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Timestamp</th>
                      <th>User Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.email}</td>
                        <td className="timestamp">{formatDate(log.timestamp)}</td>
                        <td className="ua">{log.userAgent?.slice(0, 60)}...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .admin-page {
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .admin-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .admin-header {
          margin-bottom: 2rem;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--text-primary);
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-title h1 {
          font-family: var(--font-serif);
          font-size: 2rem;
          background: linear-gradient(135deg, var(--text-primary), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header-title p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .shield-icon {
          color: var(--accent-purple);
        }

        .tab-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          border: 1px solid rgba(139, 92, 246, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .tab:hover {
          background: rgba(139, 92, 246, 0.08);
          color: var(--text-primary);
        }

        .tab.active {
          background: rgba(139, 92, 246, 0.12);
          border-color: var(--accent-purple);
          color: var(--text-primary);
        }

        .tab-content {
          padding: 2rem;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 4rem;
          color: var(--text-secondary);
        }

        .add-email-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .email-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-secondary);
          pointer-events: none;
        }

        .email-input-wrapper input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.2s;
        }

        .email-input-wrapper input:focus {
          border-color: var(--accent-purple);
        }

        .add-btn {
          padding: 0.75rem 1.25rem;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .email-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .email-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .email-row:hover {
          border-color: rgba(139, 92, 246, 0.2);
          background: rgba(139, 92, 246, 0.04);
        }

        .email-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-family: var(--font-mono);
        }

        .remove-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #ef4444;
          padding: 0.4rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #ef4444;
          color: white;
        }

        .empty-state {
          text-align: center;
          color: var(--text-secondary);
          padding: 3rem 1rem;
          font-size: 0.95rem;
        }

        .logs-table-wrapper {
          overflow-x: auto;
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }

        .logs-table th {
          text-align: left;
          padding: 0.75rem 1rem;
          color: var(--text-purple);
          font-weight: 600;
          border-bottom: 1px solid rgba(139, 92, 246, 0.15);
          white-space: nowrap;
        }

        .logs-table td {
          padding: 0.75rem 1rem;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .logs-table tr:hover td {
          background: rgba(139, 92, 246, 0.03);
        }

        .timestamp {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .ua {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

        @media (max-width: 768px) {
          .add-email-row {
            flex-direction: column;
          }
          .tab-bar {
            flex-direction: column;
          }
          .tab-content {
            padding: 1.25rem;
          }
          .logs-table {
            font-size: 0.75rem;
          }
          .ua {
            max-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}
