import React from 'react';

export const StatsCard = ({ title, value, subtitle, icon: Icon, color = "indigo" }) => {
  const colorStyles = {
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  }[color] || "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-center justify-between transition-colors">
      <div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block mb-1">
          {title}
        </span>
        <span className="text-3xl font-extrabold text-slate-900 dark:text-white block">
          {value}
        </span>
        {subtitle && (
          <span className="text-[11px] text-slate-400 mt-1 block">
            {subtitle}
          </span>
        )}
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${colorStyles}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
