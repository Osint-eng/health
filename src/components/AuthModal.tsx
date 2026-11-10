import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Language } from '../types';

interface AuthModalProps {
  language: Language;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isTe = language === 'te';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      if (mode === 'login') {
        if (!email.includes('@')) {
          setError(isTe ? 'దయచేసి సరైన ఇమెయిల్‌ను నమోదు చేయండి' : 'Please enter a valid email address');
          return;
        }
      }
      onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-800 mx-auto mb-2 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {mode === 'login'
              ? isTe ? 'లాగిన్ చేయండి (Sign In)' : 'Sign In to Arogya Voice'
              : mode === 'signup'
              ? isTe ? 'ఖాతా తెరవండి (Create Account)' : 'Create Optional Account'
              : isTe ? 'పాస్‌వర్డ్ రీసెట్' : 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isTe
              ? 'ఖాతా తెరవడానికి ఆధార్ లేదా వ్యక్తిగత వైద్య వివరాలు అవసరం లేదు.'
              : 'No Aadhaar, diagnosis, or sensitive medical history is collected.'}
          </p>
        </div>

        {error && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium mb-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isTe ? 'పేరు (ఐచ్ఛికం)' : 'Display Name (optional)'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={isTe ? 'మీ పేరు' : 'Preferred Name'}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isTe ? 'ఇమెయిల్ (Email)' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  {isTe ? 'పాస్‌వర్డ్' : 'Password'}
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-teal-800 hover:underline"
                  >
                    {isTe ? 'పాస్‌వర్డ్ మర్చిపోయారా?' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            {submitting ? '...' : mode === 'login' ? (isTe ? 'సైన్ ఇన్' : 'Sign In') : mode === 'signup' ? (isTe ? 'ఖాతా సృష్టించండి' : 'Create Account') : (isTe ? 'రీసెట్ లింక్ పంపండి' : 'Send Reset Link')}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col space-y-2">
          {mode === 'login' ? (
            <p className="text-xs text-center text-slate-500">
              {isTe ? 'ఖాతా లేదా?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-teal-800 hover:underline"
              >
                {isTe ? 'ఇప్పుడే రిజిస్టర్ చేసుకోండి' : 'Create one'}
              </button>
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-xs text-center font-bold text-teal-800 hover:underline"
            >
              {isTe ? 'సైన్ ఇన్ పేజీకి తిరిగి వెళ్లండి' : 'Back to Sign In'}
            </button>
          )}

          {/* Continue as guest button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            {isTe ? 'అతిథిగా కొనసాగండి (Continue as Guest)' : 'Continue as Guest (No Account Needed)'}
          </button>
        </div>
      </div>
    </div>
  );
};
