import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loading = ({ text = "Loading EventCircle..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mb-3" />
      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{text}</span>
    </div>
  );
};

export default Loading;
