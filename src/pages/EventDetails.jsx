import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import {
  Calendar, MapPin, Star, Heart, Share2, Clock, Users, ShieldCheck,
  ArrowLeft, Sparkles, CheckCircle2, Building
} from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, favorites, toggleFavorite, showToast } = useAuth();

  const event = events.find(e => e.id === Number(id));
  const isFavorite = event ? favorites.includes(event.id) : false;

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Event Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl">
          Back to All Events
        </Link>
      </div>
    );
  }

  const similarEvents = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: event.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'success');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </button>

      {/* HERO HERO IMAGE & OVERLAY */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl">
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {event.rating} rating
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleFavorite(event.id)}
                className="p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl text-slate-300 hover:text-rose-500 border border-slate-800 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl text-slate-300 hover:text-white border border-slate-800 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DETAILS & REGISTRATION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: DETAILS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">Date & Time</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{event.date}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">Location</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{event.location}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate block max-w-[150px]">{event.address}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">Available Seats</span>
                <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{event.availableSeats} / {event.totalSeats}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{event.attendees} Registered</span>
              </div>
            </div>
          </div>

          {/* About this event */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>About this event</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* What you'll experience */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">What you'll experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Hands-on interactive sessions with industry experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Networking with community members & professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Digital ticket reference with instant QR entry pass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Complimentary refreshments & event swag</span>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg">
              {event.organizer.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block">Hosted By</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{event.organizer}</h4>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Community Organizer
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY CARD */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Ticket Price</span>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {event.price === 0 ? 'FREE' : `₹${event.price}`}
                </span>
              </div>
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
                {event.availableSeats > 0 ? `${event.availableSeats} spots open` : 'SOLD OUT'}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-500 dark:text-slate-400">
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
            </div>

            {event.availableSeats > 0 ? (
              <Link
                to={`/events/${event.id}/register`}
                className="block text-center w-full py-3.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all"
              >
                Register Now
              </Link>
            ) : (
              <button disabled className="w-full py-3.5 bg-slate-300 dark:bg-slate-800 text-slate-500 text-sm font-bold rounded-2xl">
                Event Sold Out
              </button>
            )}

            <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              Passwordless OTP Verified Ticket • No real payment charged
            </p>

          </div>
        </div>

      </div>

      {/* SIMILAR EVENTS */}
      {similarEvents.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
            Similar Events You Might Like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarEvents.map(evt => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default EventDetails;
