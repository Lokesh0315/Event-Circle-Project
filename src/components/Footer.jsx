import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">
                Event<span className="text-indigo-400">Circle</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Discover local workshops, music concerts, tech summits, rooftop yoga, and food festivals near you.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Explore Events</Link></li>
              <li><Link to="/my-events" className="hover:text-white transition-colors">My Passes</Link></li>
              <li><Link to="/favorites" className="hover:text-white transition-colors">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Top Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/events?category=Technology" className="hover:text-white transition-colors">Technology & AI</Link></li>
              <li><Link to="/events?category=Music" className="hover:text-white transition-colors">Music & Festivals</Link></li>
              <li><Link to="/events?category=Food" className="hover:text-white transition-colors">Food & Dining</Link></li>
              <li><Link to="/events?category=Sports" className="hover:text-white transition-colors">Sports & Fitness</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Admin Access</h4>
            <p className="text-xs text-slate-400 mb-3">
              Event managers & community leaders can access the admin dashboard.
            </p>
            <Link
              to="/admin/login"
              className="inline-block px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            >
              Admin Portal
            </Link>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EventCircle. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for local event discovery.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
