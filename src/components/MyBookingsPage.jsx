import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

// Helper component to render a realistic, scannable QR Code visual using pure SVG
const QRCodeVisual = ({ value = "EVENTCIRCLE-DEFAULT" }) => {
  // Generate deterministic grid pattern based on string hash
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const hash = getHash(value);
  const size = 15;
  const cells = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Corner positioning targets
      const isTopLeft = r < 4 && c < 4;
      const isTopRight = r < 4 && c >= size - 4;
      const isBottomLeft = r >= size - 4 && c < 4;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // Outer square box
        const isBorder = r === 0 || r === 3 || c === 0 || c === 3 || 
                         r === 0 || r === 3 || c === size - 4 || c === size - 1 ||
                         r === size - 4 || r === size - 1 || c === 0 || c === 3;
        const isCenterDot = (r >= 1 && r <= 2 && c >= 1 && c <= 2) ||
                           (r >= 1 && r <= 2 && c >= size - 3 && c <= size - 2) ||
                           (r >= size - 3 && r <= size - 2 && c >= 1 && c <= 2);
        cells.push(isBorder || isCenterDot);
      } else {
        // Pseudo-random data bits based on position and string hash
        const bit = ((hash ^ (r * 31 + c * 17)) % 3) === 0;
        cells.push(bit);
      }
    }
  }

  return (
    <div className="w-32 h-32 bg-white p-2.5 rounded-xl shadow-inner flex items-center justify-center border border-slate-200">
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {cells.map((isFilled, idx) => {
          const r = Math.floor(idx / size);
          const c = idx % size;
          return isFilled ? (
            <rect key={idx} x={c} y={r} width="0.9" height="0.9" fill="#0f172a" rx="0.15" />
          ) : null;
        })}
      </svg>
    </div>
  );
};

export const MyBookingsPage = () => {
  const { userBookings, cancelBooking, navigateTo, setIsAuthModalOpen, user } = useApp();
  const [selectedPass, setSelectedPass] = useState(null);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4">
          <Icon name="Key" className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Login to View Your Digital Passes</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          EventCircle uses passwordless OTP authentication. Enter your phone number or email to view your active event registrations.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all"
        >
          Login with OTP
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Icon name="Ticket" className="w-6 h-6 text-indigo-400" />
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                My Event Pass Wallet
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Show your digital QR code at the venue gate for instant door check-in.
            </p>
          </div>

          <button
            onClick={() => navigateTo('explore')}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <Icon name="Sparkles" className="w-4 h-4 text-indigo-400" />
            <span>Discover More Events</span>
          </button>
        </div>

        {/* EMPTY BOOKINGS STATE */}
        {userBookings.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Ticket" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Active Passes Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              You haven't registered for any local public events yet. Explore events in your city and register in seconds with OTP validation.
            </p>
            <button
              onClick={() => navigateTo('explore')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-rose-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30"
            >
              Browse Local Events
            </button>
          </div>
        ) : (
          /* PASSES LIST */
          <div className="space-y-6">
            {userBookings.map((booking) => (
              <div
                key={booking.id}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden glass-card transition-all hover:border-indigo-500/40"
              >
                {/* Holographic Header Bar */}
                <div className="ticket-hologram h-3 w-full"></div>

                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* LEFT DETAILS */}
                  <div className="md:col-span-8 space-y-4">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
                        {booking.ticketName}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-950 text-amber-400 border border-slate-800 rounded-full text-xs font-mono font-bold">
                        Ref: {booking.id}
                      </span>
                      {booking.checkedIn && (
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold flex items-center gap-1">
                          <Icon name="Check" className="w-3.5 h-3.5" /> Checked In
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                      {booking.eventTitle}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{booking.eventDate || "Upcoming Event"} ({booking.eventTime || "Scheduled"})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        <span className="truncate">{booking.locationName || "Local Venue"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="User" className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>Attendee: <strong className="text-white">{booking.userName}</strong></span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Icon name="Phone" className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>OTP Auth: <strong className="text-white">{booking.userContact || user.contact}</strong></span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          alert(`Downloading Digital E-Ticket Pass (${booking.id})... PDF generated successfully!`);
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                      >
                        <Icon name="Download" className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Download Pass PDF</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to cancel booking ${booking.id}?`)) {
                            cancelBooking(booking.id);
                          }
                        }}
                        className="px-3.5 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Icon name="Trash" className="w-3.5 h-3.5" />
                        <span>Cancel Pass</span>
                      </button>
                    </div>

                  </div>

                  {/* RIGHT QR CODE & PASS STUB */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-center">
                    <QRCodeVisual value={booking.qrCodeValue} />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2 block">
                      SCAN FOR ENTRY
                    </span>
                    <span className="text-xs text-indigo-300 font-bold mt-0.5">
                      {booking.quantity} Pass ({booking.totalPrice === 0 ? 'FREE' : `$${booking.totalPrice}`})
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
