import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithOTP, showToast } = useApp();

  const [step, setStep] = useState(1); // 1: Input Contact, 2: Input OTP
  const [contact, setContact] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Reset modal state on open
  useEffect(() => {
    if (isAuthModalOpen) {
      setStep(1);
      setContact('');
      setOtpDigits(['', '', '', '', '', '']);
      setGeneratedOTP('');
      setErrorMsg('');
    }
  }, [isAuthModalOpen]);

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isAuthModalOpen) return null;

  // Send OTP trigger
  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!contact.trim()) {
      setErrorMsg('Please enter a valid phone number or email address.');
      return;
    }
    setErrorMsg('');

    // Generate random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(code);
    setStep(2);
    setTimer(30);
    setOtpDigits(['', '', '', '', '', '']);

    // Show top notification toast with OTP code for easy testing
    showToast(`Verification code sent to ${contact}`, 'success', code);
  };

  // OTP Digit Box Change Handler
  const handleDigitChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle Backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Submit OTP Verification
  const handleVerifyOTP = (e) => {
    e?.preventDefault();
    const enteredCode = otpDigits.join('');
    
    if (enteredCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP code.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      if (enteredCode === generatedOTP || enteredCode === '123456') {
        loginWithOTP(contact);
      } else {
        setErrorMsg(`Invalid verification code. Use ${generatedOTP} or 123456.`);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Decorative Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Icon name="X" className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-3">
            <Icon name={step === 1 ? 'Phone' : 'Key'} className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {step === 1 ? 'Passwordless OTP Login' : 'Enter Verification Code'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {step === 1 
              ? 'No password required! We will send a secure one-time passcode.' 
              : `Enter the 6-digit code sent to ${contact}`}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <Icon name="AlertCircle" className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Enter Phone / Email */}
        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Mobile Number or Email Address
              </label>
              <div className="relative">
                <Icon name="Phone" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="+1 (555) 019-2831 or user@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Icon name="Shield" className="w-3 h-3 text-emerald-400" />
                Secure instant verification. No passwords stored.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Send OTP Code</span>
              <Icon name="ChevronRight" className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setContact('admin@eventcircle.com');
                  setStep(1);
                }}
                className="text-xs text-indigo-400 hover:underline"
              >
                Demo Tip: Login as Admin
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Enter 6-Digit OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            
            {/* Display Simulated OTP Banner inside Modal */}
            <div className="p-3 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-center">
              <span className="text-xs text-indigo-300 block font-medium">Demo Verification Code:</span>
              <span className="text-2xl font-extrabold text-amber-400 tracking-[0.25em] font-mono my-1 block">
                {generatedOTP}
              </span>
              <span className="text-[10px] text-indigo-400">
                (Simulated SMS/Email delivery)
              </span>
            </div>

            {/* 6 Input Boxes */}
            <div className="flex items-center justify-between gap-2">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-center text-xl font-bold text-white font-mono transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <span>Verifying OTP...</span>
              ) : (
                <>
                  <Icon name="Check" className="w-4 h-4" />
                  <span>Verify & Sign In</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="hover:text-slate-200 underline"
              >
                Change Contact
              </button>

              {timer > 0 ? (
                <span className="text-slate-500">Resend code in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  Resend OTP Code
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
