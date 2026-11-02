import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Sparkles, Calendar, Heart, Bell, User, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, isAdmin, logout, registrations, favorites, notifications } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const userBookingsCount = registrations.filter(r => user && r.userEmail === user.email && r.status === 'Confirmed').length;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Event<span className="bg-gradient-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent">Circle</span>
              </span>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block -mt-1">
                Discover. Connect.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to={user ? "/home" : "/"}
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                isActive('/') || isActive('/home')
                  ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>

            <Link
              to="/events"
              className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all ${
                isActive('/events')
                  ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Explore Events
            </Link>

            {user && (
              <>
                <Link
                  to="/my-events"
                  className={`relative px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/my-events')
                      ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Events</span>
                  {userBookingsCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-indigo-600 text-white rounded-full font-bold">
                      {userBookingsCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/favorites"
                  className={`relative px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/favorites')
                      ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full font-bold">
                      {favorites.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/notifications"
                  className={`relative px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/notifications')
                      ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                  {unreadNotifCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-white rounded-full font-bold animate-pulse">
                      {unreadNotifCount}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* RIGHT UTILITIES & AUTH */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isAdmin && (
              <Link
                to="/admin/dashboard"
                className="px-3 py-1.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-500 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
              >
                Login (OTP)
              </Link>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            to={user ? "/home" : "/"}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Explore Events
          </Link>

          {user ? (
            <>
              <Link
                to="/my-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                My Events ({userBookingsCount})
              </Link>
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Favorites ({favorites.length})
              </Link>
              <Link
                to="/notifications"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Notifications ({unreadNotifCount})
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400"
              >
                Profile ({user.name})
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-rose-500"
                >
                  Admin Console
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full text-left py-2 text-sm font-semibold text-rose-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
            >
              Login with OTP
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
