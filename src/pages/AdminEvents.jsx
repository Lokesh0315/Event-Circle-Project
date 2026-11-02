import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import Modal from '../components/Modal';
import { Plus, Edit2, Trash2, Search, Calendar, MapPin } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export const AdminEvents = () => {
  const { events, addEvent, editEvent, deleteEvent } = useAuth();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    date: '2026-09-15',
    time: '10:00 AM',
    location: 'Chennai',
    address: 'Tidel Park, Chennai',
    organizer: 'Tech Community Chennai',
    price: 299,
    totalSeats: 100,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: ''
  });

  const filteredEvents = events.filter(e =>
    !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Technology',
      date: '2026-09-15',
      time: '10:00 AM',
      location: 'Chennai',
      address: 'Tidel Park, Chennai',
      organizer: 'Tech Community Chennai',
      price: 299,
      totalSeats: 100,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setFormData({ ...evt });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      editEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Manage Events
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Add new events, edit details, adjust capacity, or remove listings.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-rose-600/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Event Info</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date & Location</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Seats Availability</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={evt.image} alt={evt.title} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-extrabold text-slate-900 dark:text-white block max-w-xs truncate">{evt.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: #{evt.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-indigo-600 dark:text-indigo-400">{evt.category}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900 dark:text-white block">{evt.date}</span>
                      <span className="text-slate-400">{evt.location}</span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                      {evt.price === 0 ? 'FREE' : `₹${evt.price}`}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{evt.availableSeats}</span> / {evt.totalSeats} left
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete event "${evt.title}"?`)) {
                            deleteEvent(evt.id);
                          }
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ADD/EDIT MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? "Edit Event Details" : "Publish New Event"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              >
                {CATEGORIES.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Time</label>
              <input
                type="text"
                placeholder="10:00 AM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">City Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Total Seats</label>
              <input
                type="number"
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl shadow-md transition-all"
          >
            {editingEvent ? "Save Changes" : "Publish Event"}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default AdminEvents;
