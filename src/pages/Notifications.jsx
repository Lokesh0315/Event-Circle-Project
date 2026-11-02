import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, CheckCheck, Clock } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6 text-indigo-500" />
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notifications
          </h1>
        </div>

        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
            No notifications available.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                !notif.read
                  ? 'bg-indigo-50/60 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {notif.message}
                </p>
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {notif.time}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Notifications;
