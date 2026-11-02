import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import EventGrid from '../components/EventGrid';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import { Sparkles, Calendar, Ticket, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { user, events, registrations } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('date');

  // Filter & Search Logic
  const filteredEvents = events.filter((evt) => {
    const matchesSearch = !searchQuery ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' ? true :
                         selectedPrice === 'free' ? evt.price === 0 : evt.price > 0;
    const matchesLocation = selectedLocation === 'All Locations' || evt.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesPrice && matchesLocation;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return new Date(a.date) - new Date(b.date);
  });

  // User's upcoming confirmed booking
  const userRegistrations = registrations.filter(
    r => user && (r.userEmail === user.email || r.userPhone === user.phone) && r.status === 'Confirmed'
  );
  const latestBooking = userRegistrations[0];
  const latestEvent = latestBooking ? events.find(e => e.id === latestBooking.eventId) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TOP GREETING HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-slate-900 to-rose-950 text-white rounded-3xl border border-indigo-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Welcome Back</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Good morning, {user?.name || "Event Explorer"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Discover 12+ upcoming public events, workshops, and music festivals in Chennai and top tech hubs.
          </p>
        </div>

        <Link
          to="/my-events"
          className="px-5 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg"
        >
          <Ticket className="w-4 h-4 text-indigo-600" />
          <span>My Passes ({userRegistrations.length})</span>
        </Link>
      </div>

      {/* UPCOMING REGISTERED EVENT CAROUSEL / HIGHLIGHT BANNER */}
      {latestEvent && (
        <div className="p-6 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-3xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block">
                Your Next Registered Event
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {latestEvent.title}
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {latestEvent.date} at {latestEvent.time} • {latestEvent.location}
              </span>
            </div>
          </div>

          <Link
            to="/my-events"
            className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
          >
            View Digital Pass
          </Link>
        </div>
      )}

      {/* SEARCH BAR */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search events, locations, or topics..."
      />

      {/* FILTER BAR */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        onSelectPrice={setSelectedPrice}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        sortBy={sortBy}
        onSelectSort={setSortBy}
        onReset={() => {
          setSelectedCategory('All');
          setSelectedPrice('all');
          setSelectedLocation('All Locations');
          setSearchQuery('');
          setSortBy('date');
        }}
        totalResults={filteredEvents.length}
      />

      {/* EVENTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-indigo-500" />
            <span>Discover Events</span>
          </h2>
        </div>

        <EventGrid events={filteredEvents} />
      </div>

    </div>
  );
};

export default Home;
