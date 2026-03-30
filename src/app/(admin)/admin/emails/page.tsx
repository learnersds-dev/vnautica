'use client';

import { useState, useEffect, useCallback } from 'react';
import { Mail, CheckCircle, XCircle, Clock } from 'lucide-react';

interface EmailLog {
  id: string;
  customerId: string;
  to: string;
  subject: string;
  template: string;
  status: string;
  sentAt: string;
  openedAt?: string;
}

const statusIcons: Record<string, typeof CheckCircle> = {
  sent: CheckCircle,
  failed: XCircle,
  pending: Clock,
};
const statusColors: Record<string, string> = {
  sent: 'text-green-500',
  failed: 'text-red-500',
  pending: 'text-amber-500',
};

export default function EmailsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch('/api/email');
      if (res.ok) setLogs(await res.json());
    } catch { /* empty */ }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const sentCount = logs.filter((l) => l.status === 'sent').length;
  const pendingCount = logs.filter((l) => l.status === 'pending').length;
  const failedCount = logs.filter((l) => l.status === 'failed').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-navy">Email Logs</h1>
        <p className="text-gray-500 text-sm">
          {logs.length} total • {sentCount} sent • {pendingCount} pending • {failedCount} failed
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-sm p-4 text-center">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-green-700">{sentCount}</div>
          <div className="text-xs text-green-600">Sent</div>
        </div>
        <div className="bg-amber-50 rounded-sm p-4 text-center">
          <Clock className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-xs text-amber-600">Pending (SMTP not configured)</div>
        </div>
        <div className="bg-red-50 rounded-sm p-4 text-center">
          <XCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-red-700">{failedCount}</div>
          <div className="text-xs text-red-600">Failed</div>
        </div>
      </div>

      {/* Email Log Table */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">To</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Template</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  No emails sent yet. When leads submit enquiries, confirmation and notification emails will appear here.
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                const StatusIcon = statusIcons[log.status] || Clock;
                return (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <StatusIcon className={`w-4 h-4 ${statusColors[log.status] || 'text-gray-400'}`} />
                    </td>
                    <td className="px-4 py-3 text-navy">{log.to}</td>
                    <td className="px-4 py-3 text-xs">{log.subject}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {log.template}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(log.sentAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* SMTP Config Notice */}
      <div className="mt-6 p-4 bg-sand-light rounded-sm text-sm text-gray-600">
        <strong>SMTP Configuration:</strong> Set these environment variables to enable email sending:
        <code className="block mt-2 bg-white p-3 rounded text-xs text-navy">
          SMTP_HOST=smtp.gmail.com<br />
          SMTP_PORT=587<br />
          SMTP_USER=your-email@gmail.com<br />
          SMTP_PASS=your-app-password<br />
          SMTP_FROM=reservations@villanautica.com<br />
          INTERNAL_NOTIFICATION_EMAIL=team@villanautica.com
        </code>
      </div>
    </div>
  );
}
