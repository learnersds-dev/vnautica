'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Send, ChevronDown, Tag } from 'lucide-react';
import Button from '@/components/ui/Button';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  tags: string[];
  status: string;
  totalEnquiries: number;
  lastEnquiry: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  qualified: 'bg-purple-100 text-purple-700',
  booked: 'bg-green-100 text-green-700',
  archived: 'bg-gray-100 text-gray-500',
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch('/api/customers');
      if (res.ok) setCustomers(await res.json());
    } catch { /* empty */ }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  async function updateStatus(id: string, status: string) {
    await fetch('/api/customers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    fetchCustomers();
  }

  async function sendFollowUp(customerId: string) {
    await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'send-followup', customerId }),
    });
    alert('Follow-up email queued');
  }

  const filtered = customers.filter((c) => {
    const matchesSearch = `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-navy">Customer CRM</h1>
          <p className="text-gray-500 text-sm">{customers.length} total leads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="booked">Booked</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Source</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Enquiries</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  {customers.length === 0
                    ? 'No leads yet. Enquiries from the website will appear here.'
                    : 'No customers match your search.'}
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy">{c.firstName} {c.lastName}</div>
                    <div className="text-xs text-gray-400">{c.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{c.email}</div>
                    <div className="text-xs text-gray-400">{c.phone || '—'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {c.tags.includes('google-ads') && (
                        <Tag className="w-3 h-3 text-cyan-500" />
                      )}
                      <span className="text-xs">{c.source}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative inline-block">
                      <select
                        value={c.status}
                        onChange={(e) => updateStatus(c.id, e.target.value)}
                        className={`appearance-none px-2.5 py-1 pr-6 rounded text-xs font-medium ${statusColors[c.status] || statusColors.new} cursor-pointer border-0`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="booked">Booked</option>
                        <option value="archived">Archived</option>
                      </select>
                      <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{c.totalEnquiries}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={() => sendFollowUp(c.id)}>
                      <Send className="w-3.5 h-3.5 mr-1" />
                      Follow-up
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
