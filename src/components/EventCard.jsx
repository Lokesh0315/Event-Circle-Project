import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Star, Heart, Clock } from 'lucide-react';

export const EventCard = ({ event }) => {
  const { favorites, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const isFavorite = favorites.includes(event.id);

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* IMAGE & BADGES */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-800 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
          {event.category}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(event.id);
          }}
          aria-label="Add to Favorites"
          className="absolute top-3 right-3 p-2 bg-slate-900/70 backdrop-blur-md rounded-full text-slate-300 hover:text-rose-500 transition-colors"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Price Tag */}
        <span className={`absolute bottom-3 right-3 px-3 py-1 text-xs font-extrabold rounded-full backdrop-blur-md shadow-md ${
          event.price === 0 
            ? 'bg-emerald-500 text-white' 
            : 'bg-indigo-600 text-white'
        }`}>
          {event.price === 0 ? 'FREE' : `₹${event.price}`}
        </span>

        {/* Date Tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{event.date}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {event.rating}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-3 truncate">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span className="truncate">{event.location} • {event.address}</span>
          </div>

          {/* Seats Indicator & CTA */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{event.availableSeats}</strong> seats left
            </span>

            <button
              onClick={() => navigate(`/events/${event.id}`)}
              className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-600/20 group-hover:bg-indigo-600 text-indigo-600 dark:text-indigo-300 group-hover:text-white rounded-xl text-xs font-bold transition-all"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
