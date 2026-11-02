import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import confetti from 'canvas-confetti';

export const EventDetailPage = () => {
  const {
    selectedEvent,
    navigateTo,
    user,
    bookTicket,
    setIsAuthModalOpen,
    userBookings
  } = useApp();

  const [selectedTicket, setSelectedTicket] = useState(
    selectedEvent?.tickets?.[0] || { name: 'General Admission', price: selectedEvent?.price || 0 }
  );
  const [quantity, setQuantity] = useState(1);
  const [attendeeContact, setAttendeeContact] = useState(user?.contact || '');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!selectedEvent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">Event not found.</p>
        <button
          onClick={() => navigateTo('explore')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  // Check if current user already registered for this event
  const existingBooking = userBookings.find(b => b.eventId === selectedEvent.id);

  const handleRegistration = (e) => {
    e.preventDefault();

    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const bookingResult = bookTicket(selectedEvent, selectedTicket, quantity, attendeeContact);
    if (bookingResult) {
      setConfirmedBooking(bookingResult);
      
      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback if canvas-confetti not present
      }
    }
  };

  const totalPrice = selectedTicket.price * quantity;

  return (
    <div className="min-h-screen pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 group transition-colors"
        >
          <Icon name="ArrowLeft" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Events</span>
        </button>

        {/* HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl mb-8">
          <div className="h-64 sm:h-96 w-full relative">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {selectedEvent.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Icon name="Star" className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {selectedEvent.rating} rating
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {selectedEvent.title}
                </h1>
              </div>

              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 px-5 py-3 rounded-2xl flex items-center gap-3">
                <img
                  src={selectedEvent.organizer.avatar}
                  alt={selectedEvent.organizer.name}
                  className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
                />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Hosted By</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    {selectedEvent.organizer.name}
                    {selectedEvent.organizer.verified && (
                      <Icon name="Check" className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CONTENT GRID: DETAILS + BOOKING WIDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: EVENT DETAILS & SCHEDULE */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 glass-card rounded-2xl border border-slate-800">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Icon name="Calendar" className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Date & Time</span>
                  <span className="text-sm font-bold text-white block">{selectedEvent.date}</span>
                  <span className="text-xs text-slate-300">{selectedEvent.time}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                  <Icon name="MapPin" className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Venue Location</span>
                  <span className="text-sm font-bold text-white block">{selectedEvent.locationName}</span>
                  <span className="text-xs text-slate-300">{selectedEvent.address}</span>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Icon name="Sparkles" className="w-5 h-5 text-indigo-400" />
                <span>About this Event</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedEvent.description}
              </p>
            </div>

            {/* Schedule Agenda Breakdown */}
            {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Icon name="Clock" className="w-5 h-5 text-indigo-400" />
                  <span>Event Agenda & Timeline</span>
                </h3>

                <div className="space-y-4">
                  {selectedEvent.schedule.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="px-3 py-1 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-mono font-bold whitespace-nowrap">
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-slate-200 pt-0.5">
                        {item.topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT: TICKET BOOKING WIDGET */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
              
              {confirmedBooking ? (
                /* CONFIRMED BOOKING VIEW */
                <div className="text-center py-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Check" className="w-8 h-8" />
                  </div>
                  
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 block mb-1">
                    Registration Confirmed!
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-2">You're Going!</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    A digital pass with your unique QR code has been saved to your ticket wallet.
                  </p>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left mb-6 font-mono text-xs text-slate-300 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ticket Ref:</span>
                      <span className="text-amber-400 font-bold">{confirmedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pass Type:</span>
                      <span className="text-white">{confirmedBooking.ticketName} (x{confirmedBooking.quantity})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Paid:</span>
                      <span className="text-emerald-400 font-bold">
                        {confirmedBooking.totalPrice === 0 ? 'FREE' : `$${confirmedBooking.totalPrice}`}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('my-bookings')}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="Ticket" className="w-4 h-4" />
                    <span>View Digital Ticket Pass</span>
                  </button>
                </div>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegistration} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Select Registration Pass</h3>
                      <span className="text-xs text-indigo-400 font-semibold">
                        {selectedEvent.capacity - selectedEvent.registeredCount} spots open
                      </span>
                    </div>

                    {/* Ticket Options */}
                    <div className="space-y-3">
                      {(selectedEvent.tickets || [{ name: 'General Pass', price: selectedEvent.price }]).map((t, idx) => {
                        const isSelected = selectedTicket.name === t.name;
                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedTicket(t)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-600/20 border-indigo-500 shadow-md'
                                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                                {t.perks && (
                                  <ul className="mt-1 space-y-0.5">
                                    {t.perks.map((perk, i) => (
                                      <li key={i} className="text-[11px] text-slate-400 flex items-center gap-1">
                                        <Icon name="Check" className="w-3 h-3 text-emerald-400" />
                                        <span>{perk}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              <span className="text-lg font-extrabold text-white">
                                {t.price === 0 ? 'FREE' : `$${t.price}`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-slate-300">Ticket Quantity</span>
                    <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-slate-400 hover:text-white font-bold text-base px-2"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-white w-4 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(5, quantity + 1))}
                        className="text-slate-400 hover:text-white font-bold text-base px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Breakdown */}
                  <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block">Total Due</span>
                      <span className="text-2xl font-extrabold text-white">
                        {totalPrice === 0 ? 'FREE' : `$${totalPrice}`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
                        Passwordless OTP Auth
                      </span>
                      <span className="text-xs text-slate-400">Instant Digital E-Ticket</span>
                    </div>
                  </div>

                  {/* Existing Registration Warning */}
                  {existingBooking && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                      <Icon name="Ticket" className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>You already have a pass registered for this event ({existingBooking.id}).</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Icon name={user ? 'Check' : 'Key'} className="w-5 h-5" />
                    <span>{user ? 'Confirm & Book Pass' : 'Login with OTP to Register'}</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                    <Icon name="Shield" className="w-3.5 h-3.5 text-indigo-400" />
                    Verified EventCircle Registration • No passwords required
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
