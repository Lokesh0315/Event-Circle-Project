import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Trash2, ExternalLink, CheckCircle2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';

export const MyEvents = () => {
  const { user, registrations, events, cancelRegistration } = useAuth();
  const [tab, setTab] = useState('upcoming'); // 'upcoming' | 'past' | 'cancelled'
  const navigate = useNavigate();

  // User registrations
  const myRegistrations = registrations.filter(
    r => user && (r.userEmail === user.email || r.userPhone === user.phone)
  );

  const filtered = myRegistrations.filter(r => {
    if (tab === 'cancelled') return r.status === 'Cancelled';
    if (tab === 'past') return r.status === 'Completed';
    return r.status === 'Confirmed';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-indigo-500" />
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Event Passes
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your registered event tickets, view digital passes, or cancel bookings.
          </p>
        </div>

        <Link
          to="/events"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
        >
          Explore More Events
        </Link>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        {['upcoming', 'past', 'cancelled'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-xs sm:text-sm font-bold capitalize border-b-2 transition-all ${
              tab === t
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {filtered.length === 0 ? (
        <EmptyState
          title={`No ${tab} event passes`}
          message="You don't have any event bookings in this tab."
          actionText="Browse Events"
          actionLink="/events"
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((reg) => {
            const event = events.find(e => e.id === reg.eventId);
            return (
              <div
                key={reg.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  {event && (
                    <img
                      src={event.image}
                      alt={reg.eventTitle}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 flex-shrink-0"
                    />
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-500">{reg.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        reg.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}>
                        {reg.status}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                      {reg.eventTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {event?.date || reg.bookingDate} ({event?.time})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {event?.location || "Venue"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 justify-end">
                  <button
                    onClick={() => navigate(`/events/${reg.eventId}`)}
                    className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Event</span>
                  </button>

                  {reg.status === 'Confirmed' && (
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to cancel booking ${reg.id}?`)) {
                          cancelRegistration(reg.id);
                        }
                      }}
                      className="px-3 py-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyEvents;
