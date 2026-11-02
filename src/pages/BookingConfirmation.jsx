import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, Sparkles, Download, Home, Calendar, MapPin, User } from 'lucide-react';

export const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;
  const event = location.state?.event;

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Active Registration Found</h2>
        <Link to="/home" className="inline-block px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    alert(`Downloading Digital Event Ticket (${booking.id})... Pass saved!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-500 block">
          Booking Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Registration Successful!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Your digital ticket pass has been generated and saved to your EventCircle wallet.
        </p>
      </div>

      {/* DIGITAL TICKET PASS CARD */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
        {/* Holographic Header Bar */}
        <div className="h-3 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"></div>

        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                Event<span className="text-indigo-500">Circle</span> Pass
              </span>
            </div>

            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-extrabold uppercase tracking-wider">
              {booking.status}
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-amber-500 font-mono block mb-1">
              Registration ID: {booking.id}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {booking.eventTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span>Date & Time: <strong className="text-slate-900 dark:text-white">{event?.date || "Scheduled"} ({event?.time})</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>Venue: <strong className="text-slate-900 dark:text-white">{event?.location || "Chennai"}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Attendee: <strong className="text-slate-900 dark:text-white">{booking.userName}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-indigo-500 flex-shrink-0" />
              <span>Tickets Reserved: <strong className="text-slate-900 dark:text-white">{booking.tickets} Pass</strong></span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total Amount Paid</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {booking.amount === 0 ? 'FREE' : `₹${booking.amount}`}
            </span>
          </div>

        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/my-events"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
        >
          <Ticket className="w-4 h-4" />
          <span>View My Events</span>
        </Link>

        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-indigo-500" />
          <span>Download Pass</span>
        </button>

        <Link
          to="/home"
          className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

    </div>
  );
};

export default BookingConfirmation;
