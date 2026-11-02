import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Ticket, User, Mail, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RegisterEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, user, registerForEvent } = useAuth();

  const event = events.find(e => e.id === Number(id));

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [tickets, setTickets] = useState(1);
  const [error, setError] = useState('');

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Event not found.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (tickets > event.availableSeats) {
      setError(`Cannot book more than ${event.availableSeats} available seats.`);
      return;
    }

    const booking = registerForEvent(event.id, tickets, fullName, email, phone);
    if (booking) {
      navigate('/booking-confirmation', { state: { booking, event } });
    }
  };

  const totalPrice = event.price * tickets;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Event Details</span>
      </button>

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Event Registration
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Complete your registration details below to reserve your digital event pass.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: FORM */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Number of Tickets
              </label>
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white w-4 text-center">{tickets}</span>
                  <button
                    type="button"
                    onClick={() => setTickets(Math.min(event.availableSeats, tickets + 1))}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* DEMO PAYMENT NOTICE */}
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-xl text-center">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block">
                Demo payment — no real transaction
              </span>
              <span className="text-[11px] text-slate-400">
                Frontend simulation for project presentation.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Registration</span>
            </button>
          </form>

        </div>

        {/* RIGHT: SUMMARY */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800"
            />
            <div>
              <span className="text-[10px] uppercase font-extrabold text-indigo-600 dark:text-indigo-400">Selected Event</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{event.title}</h3>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Date:</span>
              <strong className="text-slate-900 dark:text-white">{event.date}</strong>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <strong className="text-slate-900 dark:text-white">{event.time}</strong>
            </div>
            <div className="flex justify-between">
              <span>Venue:</span>
              <strong className="text-slate-900 dark:text-white">{event.location}</strong>
            </div>
            <div className="flex justify-between">
              <span>Price per ticket:</span>
              <strong className="text-slate-900 dark:text-white">{event.price === 0 ? 'FREE' : `₹${event.price}`}</strong>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Amount Due</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalPrice === 0 ? 'FREE' : `₹${totalPrice}`}
            </span>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>Instant confirmation & digital pass generation</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default RegisterEvent;
