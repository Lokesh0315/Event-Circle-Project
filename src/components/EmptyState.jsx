import React from 'react';
import { CalendarX } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  title = "No events found",
  message = "We couldn't find any events matching your criteria.",
  actionText,
  actionLink
}) => {
  return (
    <div className="text-center py-16 px-4 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
        <CalendarX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
        {message}
      </p>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-block px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-rose-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
