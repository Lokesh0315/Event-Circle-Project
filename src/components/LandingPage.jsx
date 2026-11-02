import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { CATEGORIES } from '../data/mockEvents';

export const LandingPage = () => {
  const {
    events,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    priceFilter,
    setPriceFilter,
    selectedCity,
    navigateToEvent,
    setIsCreateEventOpen,
    setIsAuthModalOpen,
    user
  } = useApp();

  // Filter logic
  const filteredEvents = events.filter(evt => {
    // City filter
    const matchesCity = evt.city.toLowerCase() === selectedCity.toLowerCase();
    // Category filter
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    // Price filter
    const matchesPrice = 
      priceFilter === 'all' ? true :
      priceFilter === 'free' ? evt.price === 0 :
      evt.price > 0;
    // Search query
    const matchesSearch = !searchQuery || 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.locationName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesCategory && matchesPrice && matchesSearch;
  });

  const featuredEvent = filteredEvents[0] || events[0];

  return (
    <div className="min-h-screen pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
              <Icon name="Sparkles" className="w-4 h-4 text-indigo-400" />
              <span>Passwordless OTP Event Registration • Live in {selectedCity}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Discover & Experience <br />
              <span className="gradient-text">Local Public Events</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-400">
              Find developer summits, sunset jazz concerts, rooftop yoga, food markets, and networking mixers near you. Instant passwordless OTP booking.
            </p>
          </div>

          {/* FEATURED EVENT HIGHLIGHT HERO BANNER */}
          {featuredEvent && !searchQuery && selectedCategory === 'all' && (
            <div className="mb-12 relative rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl glass-card group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] overflow-hidden">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/90"></div>
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      Featured Spotlight
                    </span>
                    <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-full flex items-center gap-1">
                      <Icon name="Star" className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {featuredEvent.rating} ({featuredEvent.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900/90">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                      <Icon name="Calendar" className="w-4 h-4" />
                      <span>{featuredEvent.date} • {featuredEvent.time}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3">
                      {featuredEvent.title}
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {featuredEvent.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                      <Icon name="MapPin" className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <span>{featuredEvent.locationName}, {featuredEvent.address}</span>
                    </div>
                  </div>

                  <div>
                    {/* Capacity Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Spots Filled</span>
                        <span className="text-indigo-300">
                          {featuredEvent.registeredCount} / {featuredEvent.capacity} spots
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
                          style={{ width: `${Math.min(100, (featuredEvent.registeredCount / featuredEvent.capacity) * 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <div>
                        <span className="text-xs text-slate-400 block">Ticket Price</span>
                        <span className="text-2xl font-extrabold text-white">
                          {featuredEvent.price === 0 ? 'FREE' : `$${featuredEvent.price}`}
                        </span>
                      </div>

                      <button
                        onClick={() => navigateToEvent(featuredEvent.id)}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center gap-2"
                      >
                        <span>Reserve Spot</span>
                        <Icon name="ChevronRight" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* FILTERING CONTROLS BAR */}
          <div className="space-y-6">
            
            {/* Category Chips Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25'
                        : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Icon name={cat.icon} className="w-4 h-4" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-Filters: Price Tabs & Host Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/60">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
                  <Icon name="Filter" className="w-3.5 h-3.5" />
                  Filter Price:
                </span>
                
                {['all', 'free', 'paid'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPriceFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      priceFilter === type
                        ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type === 'all' ? 'All Prices' : type}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  Showing <strong className="text-white">{filteredEvents.length}</strong> events in {selectedCity}
                </span>

                <button
                  onClick={() => user ? setIsCreateEventOpen(true) : setIsAuthModalOpen(true)}
                  className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-lg text-xs font-semibold text-slate-200 hover:text-rose-400 transition-all flex items-center gap-1.5"
                >
                  <Icon name="Plus" className="w-3.5 h-3.5 text-rose-400" />
                  <span>Host an Event</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* EVENTS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/60 p-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No public events match your search</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Try switching your location or clearing active search filters to discover upcoming events.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(evt => (
              <div
                key={evt.id}
                onClick={() => navigateToEvent(evt.id)}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-indigo-300 text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                      {evt.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-md ${
                      evt.price === 0 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-indigo-600 text-white'
                    }`}>
                      {evt.price === 0 ? 'FREE' : `$${evt.price}`}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                    <Icon name="Calendar" className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                        <Icon name="Clock" className="w-3.5 h-3.5" />
                        {evt.time}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Icon name="Star" className="w-3.5 h-3.5 fill-amber-400" />
                        {evt.rating}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2 leading-snug">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Venue & Action Footer */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 truncate">
                      <Icon name="MapPin" className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span className="truncate">{evt.locationName}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-[11px] text-slate-400">
                        <span className="text-indigo-400 font-bold">{evt.capacity - evt.registeredCount}</span> spots remaining
                      </div>

                      <button className="px-3.5 py-1.5 bg-indigo-600/20 group-hover:bg-indigo-600 text-indigo-300 group-hover:text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1">
                        <span>Details</span>
                        <Icon name="ChevronRight" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* HOST PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-rose-950 border border-indigo-800/40">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Event Organizers & Community Leaders
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Hosting a Local Public Event?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6">
              Reach thousands of eager attendees in {selectedCity}. Publish your event listing with automated passwordless OTP registration and gate check-in scanners.
            </p>
            <button
              onClick={() => user ? setIsCreateEventOpen(true) : setIsAuthModalOpen(true)}
              className="px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm rounded-xl shadow-xl transition-all flex items-center gap-2"
            >
              <Icon name="Plus" className="w-4 h-4 text-indigo-600" />
              <span>Create Public Event Now</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
