import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import StatsCard from '../components/StatsCard';
import { Calendar, Ticket, CheckCircle2, DollarSign, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  const { events, registrations } = useAuth();

  const totalEvents = events.length;
  const totalRegistrations = registrations.length;
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').length;
  const completedEvents = events.filter(e => e.status === 'Completed').length;
  const grossRevenue = registrations.reduce((sum, r) => sum + r.amount, 0);

  const recentRegistrations = registrations.slice(0, 5);
  const popularEvents = [...events].sort((a, b) => b.attendees - a.attendees).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Platform Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of event statistics, total ticket bookings, and recent registrations.
          </p>
        </div>

        {/* METRICS STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Events"
            value={totalEvents}
            subtitle={`${upcomingEvents} upcoming, ${completedEvents} completed`}
            icon={Calendar}
            color="indigo"
          />
          <StatsCard
            title="Registrations"
            value={totalRegistrations}
            subtitle="OTP Verified Attendees"
            icon={Ticket}
            color="emerald"
          />
          <StatsCard
            title="Gross Revenue"
            value={`₹${grossRevenue}`}
            subtitle="Ticket Sales"
            icon={DollarSign}
            color="amber"
          />
          <StatsCard
            title="Upcoming Events"
            value={upcomingEvents}
            subtitle="Active on platform"
            icon={TrendingUp}
            color="rose"
          />
        </div>

        {/* RECENT REGISTRATIONS & POPULAR EVENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Registrations Table */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Recent Registrations
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Attendee</th>
                    <th className="px-4 py-3">Event</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {recentRegistrations.map(r => (
                    <tr key={r.id}>
                      <td className="px-4 py-3 font-mono font-bold text-amber-500">{r.id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{r.userName}</td>
                      <td className="px-4 py-3 max-w-[150px] truncate">{r.eventTitle}</td>
                      <td className="px-4 py-3 font-bold text-emerald-500">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Events List */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Popular Events by Attendance
            </h3>

            <div className="space-y-3">
              {popularEvents.map(evt => (
                <div key={evt.id} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={evt.image} alt={evt.title} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">{evt.title}</h4>
                      <span className="text-[10px] text-slate-400">{evt.category} • {evt.location}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold rounded-lg">
                    {evt.attendees} Registered
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
