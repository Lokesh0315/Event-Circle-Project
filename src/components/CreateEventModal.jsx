import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';
import { CATEGORIES, CITIES } from '../data/mockEvents';

export const CreateEventModal = () => {
  const { isCreateEventOpen, setIsCreateEventOpen, addEvent, selectedCity } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'tech',
    date: '2026-09-15',
    time: '06:00 PM - 09:00 PM',
    city: selectedCity,
    locationName: '',
    address: '',
    price: 0,
    capacity: 100,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: '',
  });

  if (!isCreateEventOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.locationName || !formData.description) return;

    addEvent({
      ...formData,
      price: Number(formData.price),
      capacity: Number(formData.capacity),
      tickets: [
        {
          id: `t-${Date.now()}`,
          name: Number(formData.price) === 0 ? "Free General Pass" : "Standard Entry",
          price: Number(formData.price),
          perks: ["Full Event Access", "Event Circle Pass", "Networking Session"]
        }
      ],
      schedule: [
        { time: formData.time.split('-')[0].trim(), topic: "Welcome & Event Kickoff" },
        { time: "Main Session", topic: formData.title },
        { time: formData.time.split('-')[1]?.trim() || "Closing", topic: "Networking & Wrap Up" }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCreateEventOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Icon name="X" className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <Icon name="Plus" className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create New Public Event</h2>
            <p className="text-xs text-slate-400">Publish your event to local attendees on EventCircle</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. SF Tech Networking Mixer & Drinks"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">City Location</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time Range</label>
              <input
                type="text"
                name="time"
                placeholder="e.g. 06:00 PM - 09:00 PM"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Venue Name *</label>
              <input
                type="text"
                name="locationName"
                required
                placeholder="e.g. Downtown Innovation Hub"
                value={formData.locationName}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. 100 Main St, San Francisco, CA"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ticket Price ($)</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Capacity</label>
              <input
                type="number"
                name="capacity"
                min="10"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Banner Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Event Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="Provide event details, schedule highlights, and what attendees can expect..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateEventOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/25 hover:from-indigo-500 hover:to-rose-500 transition-all"
            >
              Publish Event
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
