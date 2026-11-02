import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Calendar, Ticket, LogOut, Sparkles } from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between flex-shrink-0 transition-colors">
      <div>
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 dark:text-white">
              Admin<span className="text-rose-500">Console</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
              EventCircle Platform
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              isActive('/admin/dashboard')
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/events"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              isActive('/admin/events')
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Manage Events</span>
          </Link>

          <Link
            to="/admin/registrations"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              isActive('/admin/registrations')
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Ticket className="w-4 h-4" />
            <span>All Registrations</span>
          </Link>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <Link
          to="/home"
          className="block w-full text-center py-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          Exit to Main App
        </Link>
        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Admin Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
