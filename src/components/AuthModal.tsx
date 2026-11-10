import React, { useState } from 'react';
import { Building2, Sparkles, CheckCircle2, UserPlus, LogIn, Lock, Mail, Phone, User as UserIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBingoPlus } from '../hooks/useBingoPlus';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { sites, store, users } = useBingoPlus();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('maria_lipa');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [authError, setAuthError] = useState<string | null>(null);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('0917-');
  const [regSiteId, setRegSiteId] = useState('sm-lipa');
  const [regPassword, setRegPassword] = useState('password123');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const res = store.loginUser(loginUsername, loginPassword);
    if (res.success) {
      onClose();
    } else {
      setAuthError(res.error || 'Failed to sign in.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!regFullName.trim() || !regUsername.trim() || !regEmail.trim()) {
      setAuthError('Please fill in all required registration fields.');
      return;
    }

    const res = store.registerUser({
      username: regUsername.trim(),
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      registeredSiteId: regSiteId,
      password: regPassword,
    });

    if (res.success && res.user) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onClose();
    } else {
      setAuthError(res.error || 'Registration failed.');
    }
  };

  // Quick switch shortcut
  const handleQuickDemoSelect = (userId: string) => {
    store.setCurrentUserId(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg bg-[#1a0832] border border-purple-600/70 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-800/60 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/bingoplus_logo_transparent.png"
              alt="BingoPlus"
              className="h-9 w-auto"
            />
            <div>
              <h3 className="text-base font-extrabold text-white">
                BingoPlus Rewards & Multi-Site Portal
              </h3>
              <p className="text-[11px] text-purple-300">
                Single database synchronized across all 9 locations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Tab switch between Login and Register */}
        <div className="flex rounded-xl bg-purple-950/80 p-1 border border-purple-800/60 text-xs font-bold relative z-10">
          <button
            onClick={() => {
              setMode('login');
              setAuthError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In to Account</span>
          </button>
          <button
            onClick={() => {
              setMode('register');
              setAuthError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'text-purple-300 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New Player</span>
          </button>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-semibold">
            {authError}
          </div>
        )}

        {mode === 'login' ? (
          /* Sign In Form */
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs relative z-10">
            <div>
              <label className="text-purple-300 font-bold block mb-1">Username or Member ID:</label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. maria_lipa or staff_lipa"
                  className="w-full bg-[#120323] text-white pl-9 pr-3 py-2.5 rounded-xl border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Password:</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#120323] text-white pl-9 pr-3 py-2.5 rounded-xl border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-950/60 transition-all hover:scale-[1.01]"
            >
              Log In to Portal
            </button>

            {/* Quick Demo Credentials */}
            <div className="pt-3 border-t border-purple-800/60">
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-2">
                Or Select Instant Demo Persona:
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleQuickDemoSelect('usr-maria-lipa')}
                  className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-left text-purple-200"
                >
                  <div className="font-bold text-white">Maria Santos</div>
                  <div className="text-[10px] text-amber-300">Player • SM Lipa</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoSelect('stf-angelo-lipa')}
                  className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-left text-purple-200"
                >
                  <div className="font-bold text-emerald-300">Angelo D. (Staff)</div>
                  <div className="text-[10px] text-purple-300">Staff • SM Lipa</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoSelect('mgr-richard-lipa')}
                  className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-left text-purple-200"
                >
                  <div className="font-bold text-amber-400">Mgr. Richard Tan</div>
                  <div className="text-[10px] text-purple-300">Branch Mgr • SM Lipa</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoSelect('spu-vic-hq')}
                  className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-700/40 text-left text-purple-200"
                >
                  <div className="font-bold text-rose-300">Superuser Vic</div>
                  <div className="text-[10px] text-purple-300">Superuser • HQ All Sites</div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Register New Player Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs relative z-10">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-[11px] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                New members receive <strong>+100 Welcome Points</strong> and instant access to their registered branch group chat!
              </span>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Full Name:</label>
              <input
                type="text"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="e.g. Juan De Guzman"
                className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-purple-300 font-bold block mb-1">Username:</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. juan_deguzman"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-purple-300 font-bold block mb-1">Mobile Number:</label>
                <input
                  type="text"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="0917-..."
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Email Address:</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="juan@example.com"
                className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                required
              />
            </div>

            {/* Crucial Site Selection Dropdown - Labeled with BingoPlus on all choices */}
            <div>
              <label className="text-amber-400 font-extrabold block mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Select Your Registered BingoPlus Site:
              </label>
              <select
                value={regSiteId}
                onChange={(e) => setRegSiteId(e.target.value)}
                className="w-full bg-[#140326] text-white font-bold text-xs rounded-xl px-3 py-2.5 border-2 border-amber-500/80 focus:outline-none"
              >
                {sites.map((site) => (
                  <option key={site.id} value={site.id} className="bg-[#1a0832] text-white font-medium py-1">
                    {site.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-purple-400 mt-1">
                You will automatically join the live chat and see promotions for this branch.
              </p>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Password:</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-950/60 transition-all hover:scale-[1.01]"
            >
              Complete Registration & Claim +100 Points
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
