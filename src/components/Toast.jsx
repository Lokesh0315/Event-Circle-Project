import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useAuth();

  if (!toast) return null;

  const bgStyles = 
    toast.type === 'success' ? 'bg-emerald-600 text-white' :
    toast.type === 'error' ? 'bg-rose-600 text-white' :
    toast.type === 'warning' ? 'bg-amber-600 text-white' :
    'bg-indigo-600 text-white';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl ${bgStyles} font-semibold text-xs sm:text-sm max-w-md`}>
        {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> :
         toast.type === 'error' ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> :
         <Info className="w-5 h-5 flex-shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
