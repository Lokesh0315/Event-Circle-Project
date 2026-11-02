import React from 'react';
import { useAuth } from '../context/AuthContext';
import EventGrid from '../components/EventGrid';
import { Heart } from 'lucide-react';

export const Favorites = () => {
  const { events, favorites } = useAuth();

  const favoriteEvents = events.filter(e => favorites.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Favorite Events
        </h1>
      </div>

      <EventGrid
        events={favoriteEvents}
        emptyTitle="No favorite events yet"
        emptyMessage="Click the heart icon on any event card to save it to your personal favorites list."
      />
    </div>
  );
};

export default Favorites;
