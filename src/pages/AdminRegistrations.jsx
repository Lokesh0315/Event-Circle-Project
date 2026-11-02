import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import { Search, Ticket, Filter } from 'lucide-react';

export const AdminRegistrations = () => {
  const { registrations } = useAuth();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = registrations.filter(r => {
    const matchesSearch = !search ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.userName.toLowerCase().includes(search.toLowerCase()) ||
      r.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.eventTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              All Event Registrations
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              View and filter all attendee registrations and OTP booking logs across the platform.
            </p>
          </div>

          <span className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-xs font-extrabold rounded-xl">
            {filtered.length} Total Registrations
          </span>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, attendee name, email, or event title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            {['All', 'Confirmed', 'Cancelled'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Registration ID</th>
                  <th className="px-6 py-4">Attendee Info</th>
                  <th className="px-6 py-4">Event Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Tickets & Price</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {filtered.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-extrabold text-amber-500">
                      {reg.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 dark:text-white block">{reg.userName}</span>
                      <span className="text-[11px] text-slate-400 font-mono block">{reg.userEmail}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{reg.userPhone}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                      {reg.eventTitle}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono">
                      {reg.bookingDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 dark:text-white block">{reg.tickets} Pass</span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold">
                        {reg.amount === 0 ? 'FREE' : `₹${reg.amount}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        reg.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminRegistrations;
