import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const AdminDashboard = () => {
  const {
    events,
    bookings,
    deleteEvent,
    checkInAttendee,
    setIsCreateEventOpen,
    setIsAuthModalOpen,
    user
  } = useApp();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'events' | 'checkin'
  const [scanInput, setScanInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Analytics Calculations
  const totalEvents = events.length;
  const totalRegistrations = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const checkedInCount = bookings.filter(b => b.checkedIn).length;
  const checkInRate = bookings.length > 0 ? Math.round((checkedInCount / bookings.length) * 100) : 0;

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => 
    !searchFilter ||
    b.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.userName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    (b.userContact && b.userContact.toLowerCase().includes(searchFilter.toLowerCase())) ||
    b.eventTitle.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleManualScan = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;
    const success = checkInAttendee(scanInput.trim());
    if (success) {
      setScanInput('');
    }
  };

  return (
    <div className="min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                <Icon name="Shield" className="w-6 h-6" />
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Admin Console & Booking Roster
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage public events, track passwordless OTP attendee registrations, and verify gate check-ins.
            </p>
          </div>

          <button
            onClick={() => setIsCreateEventOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <Icon name="Plus" className="w-4 h-4" />
            <span>Create New Public Event</span>
          </button>
        </div>

        {/* METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Active Events</span>
              <span className="text-3xl font-extrabold text-white my-1 block">{totalEvents}</span>
              <span className="text-[11px] text-indigo-400 font-medium">Published in system</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Icon name="Calendar" className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Attendees</span>
              <span className="text-3xl font-extrabold text-white my-1 block">{totalRegistrations}</span>
              <span className="text-[11px] text-emerald-400 font-medium">OTP Verified Bookings</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Icon name="Users" className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Gross Revenue</span>
              <span className="text-3xl font-extrabold text-white my-1 block">${totalRevenue}</span>
              <span className="text-[11px] text-amber-400 font-medium">Ticket Sales</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Icon name="DollarSign" className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Door Check-In Rate</span>
              <span className="text-3xl font-extrabold text-white my-1 block">{checkInRate}%</span>
              <span className="text-[11px] text-rose-400 font-medium">{checkedInCount} / {bookings.length} passes scanned</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <Icon name="QrCode" className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* TABS NAVIGATION */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 mb-6">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon name="Ticket" className="w-4 h-4" />
            <span>Attendee Bookings ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'events'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon name="Calendar" className="w-4 h-4" />
            <span>Manage Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'checkin'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon name="QrCode" className="w-4 h-4 text-rose-400" />
            <span>Gate Scanner Simulator</span>
          </button>
        </div>

        {/* TAB 1: ATTENDEE BOOKINGS TABLE */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search Input for Roster */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by attendee, phone/email, or Ticket ID..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <span className="text-xs text-slate-400">
                Showing <strong className="text-white">{filteredBookings.length}</strong> attendee passes
              </span>
            </div>

            {/* Table */}
            <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Ticket Ref</th>
                      <th className="px-6 py-4">Attendee Name</th>
                      <th className="px-6 py-4">OTP Contact</th>
                      <th className="px-6 py-4">Event Title</th>
                      <th className="px-6 py-4">Pass Type & Price</th>
                      <th className="px-6 py-4">Gate Status</th>
                      <th className="px-6 py-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                          No booking registrations found matching your query.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="px-6 py-4 font-mono font-bold text-amber-400">
                            {b.id}
                          </td>
                          <td className="px-6 py-4 font-semibold text-white">
                            {b.userName}
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-400">
                            {b.userContact || b.userPhone || b.userEmail || "OTP Verified"}
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-200 max-w-xs truncate">
                            {b.eventTitle}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-white">{b.ticketName}</span>
                            <span className="text-slate-500 block">
                              {b.totalPrice === 0 ? 'FREE' : `$${b.totalPrice}`} (x{b.quantity})
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {b.checkedIn ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                                <Icon name="Check" className="w-3 h-3" /> Checked In
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[11px] font-medium">
                                Registered
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {!b.checkedIn ? (
                              <button
                                onClick={() => checkInAttendee(b.id)}
                                className="px-3 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white rounded-lg text-[11px] font-bold transition-all"
                              >
                                Check In
                              </button>
                            ) : (
                              <span className="text-[11px] text-slate-500 font-mono">Verified</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MANAGE EVENTS TABLE */}
        {activeTab === 'events' && (
          <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Event Info</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date & Location</th>
                    <th className="px-6 py-4">Ticket Price</th>
                    <th className="px-6 py-4">Capacity Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                          />
                          <div>
                            <span className="font-bold text-white block max-w-xs truncate">{evt.title}</span>
                            <span className="text-[11px] text-slate-400">ID: {evt.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 uppercase font-bold text-indigo-400">
                        {evt.category}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-200 block">{evt.date}</span>
                        <span className="text-slate-400">{evt.city}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        {evt.price === 0 ? 'FREE' : `$${evt.price}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <div className="flex justify-between text-[11px] mb-1 font-semibold">
                            <span className="text-indigo-300">{evt.registeredCount} / {evt.capacity}</span>
                            <span className="text-slate-500">
                              {Math.round((evt.registeredCount / evt.capacity) * 100)}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-500 rounded-full"
                              style={{ width: `${Math.min(100, (evt.registeredCount / evt.capacity) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete event "${evt.title}"?`)) {
                              deleteEvent(evt.id);
                            }
                          }}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Icon name="Trash" className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: GATE CHECK-IN SCANNER SIMULATOR */}
        {activeTab === 'checkin' && (
          <div className="max-w-2xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto mb-3">
                <Icon name="QrCode" className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-white">Venue Gate Check-In Simulator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter or scan the attendee's Ticket Reference ID (e.g. <code className="text-amber-300 font-mono">BK-89210</code>) to validate entry.
              </p>
            </div>

            <form onSubmit={handleManualScan} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Ticket Reference or QR Payload
                </label>
                <div className="relative">
                  <Icon name="Ticket" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. BK-89210 or EVENTCIRCLE-BK-89210-..."
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-amber-400 font-mono font-bold placeholder-slate-600 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-rose-600/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="Check" className="w-4 h-4" />
                <span>Verify & Check In Attendee</span>
              </button>
            </form>

            {/* Recent Check-in Logs */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Recent Venue Gate Scans
              </h4>
              <div className="space-y-2">
                {bookings.filter(b => b.checkedIn).length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No attendees checked in yet today.</p>
                ) : (
                  bookings.filter(b => b.checkedIn).map(b => (
                    <div key={b.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white">{b.userName}</span>
                        <span className="text-slate-400 block font-mono text-[11px]">{b.id} • {b.eventTitle}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                        VERIFIED ENTRY
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
