import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { KeyRound, CheckCircle2, RotateCcw, ArrowLeft } from 'lucide-react';

export const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOTP } = useAuth();

  const phone = location.state?.phone || '+91 98765 43210';
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [error, setError] = useState('');

  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-box-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    const success = verifyOTP(phone, code);
    if (success) {
      navigate('/home');
    } else {
      setError('Invalid OTP code. Please use demo OTP: 123456.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 transition-colors">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verify OTP Passcode
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter the 6-digit OTP sent to <strong className="text-slate-900 dark:text-white">{phone}</strong>
          </p>
        </div>

        {/* DEMO OTP BANNER */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-center">
          <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block">
            Demo OTP Passcode:
          </span>
          <span className="text-2xl font-extrabold text-amber-500 tracking-[0.3em] font-mono my-0.5 block">
            123456
          </span>
          <span className="text-[10px] text-slate-400">
            (Frontend Simulation)
          </span>
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-600 dark:text-rose-400 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex items-center justify-between gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-box-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-center text-xl font-extrabold text-slate-900 dark:text-white font-mono transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify OTP & Sign In</span>
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link to="/login" className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Number</span>
          </Link>

          <button
            type="button"
            onClick={() => setOtp(['1', '2', '3', '4', '5', '6'])}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resend OTP</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default OTPVerification;
