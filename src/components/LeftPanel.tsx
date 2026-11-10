import React, { useState } from 'react';
import {
  Coins,
  QrCode,
  Flame,
  Award,
  Building2,
  Calendar,
  Phone,
  Ticket,
  ChevronRight,
  Shield,
  Gift,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';

interface LeftPanelProps {
  activeTab: 'home' | 'rewards' | 'chat' | 'staff_ops' | 'vouchers';
  setActiveTab: (tab: 'home' | 'rewards' | 'chat' | 'staff_ops' | 'vouchers') => void;
  onOpenQR: () => void;
  onOpenAuth: () => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  activeTab,
  setActiveTab,
  onOpenQR,
  onOpenAuth,
}) => {
  const { currentUser, sites, tierConfigs, vouchers } = useBingoPlus();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  if (!currentUser) return null;

  const registeredSite = sites.find((s) => s.id === currentUser.registeredSiteId) || sites[0];
  const tierConfig = tierConfigs.find((t) => t.id === currentUser.tier) || tierConfigs[0];
  const isStaff = ['STAFF', 'BRANCH_MANAGER', 'ADMIN', 'SUPERUSER'].includes(currentUser.role);

  // Find next tier for progression
  const tierIndex = tierConfigs.findIndex((t) => t.id === currentUser.tier);
  const nextTier = tierIndex < tierConfigs.length - 1 ? tierConfigs[tierIndex + 1] : null;
  const progressPercent = nextTier
    ? Math.min(100, Math.round((currentUser.totalSpend / nextTier.minSpend) * 100))
    : 100;

  // Active unredeemed vouchers for current user
  const pendingVouchersCount = vouchers.filter(
    (v) => v.userId === currentUser.id && v.status === 'PENDING_SCAN'
  ).length;

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-4">
      {/* Player Membership Identity Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#2a1147] via-[#1f0b35] to-[#160626] border border-purple-700/50 shadow-xl p-5">
        {/* Subtle decorative purple glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Member Header */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-[#1e0a33] rounded-[10px] flex items-center justify-center text-lg font-black text-amber-300 uppercase">
                {currentUser.fullName.charAt(0)}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-white text-sm sm:text-base leading-tight">
                {currentUser.fullName}
              </h2>
              <p className="text-xs text-purple-300/80">@{currentUser.username}</p>
            </div>
          </div>

          <span
            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${tierConfig.badgeBg}`}
          >
            {tierConfig.name.replace('Member', '').trim()}
          </span>
        </div>

        {/* Home Branch Lockup */}
        <div className="mt-4 p-2.5 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-purple-200 truncate">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-purple-400">Registered Branch</div>
              <div className="font-semibold text-white truncate">{registeredSite.name}</div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 shrink-0">
            Active
          </span>
        </div>

        {/* Points Balance Highlight Box */}
        <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold text-purple-200 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              Points Balance
            </span>
            <span className="text-[10px] text-amber-300 font-medium">{tierConfig.pointMultiplier}x multiplier</span>
          </div>

          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white tabular-nums tracking-tight">
              {currentUser.pointsBalance.toLocaleString()}
            </span>
            <span className="text-xs text-amber-400 font-semibold">REWARD PTS</span>
          </div>

          <div className="mt-2 pt-2 border-t border-purple-800/60 flex items-center justify-between text-[11px] text-purple-300">
            <span>Lifetime: {currentUser.lifetimePoints.toLocaleString()} pts</span>
            <span>Spend: ₱{currentUser.totalSpend.toLocaleString()}</span>
          </div>
        </div>

        {/* Tier Upgrade Progress */}
        {nextTier && (
          <div className="mt-3.5 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-purple-300 flex items-center gap-1">
                <Award className="w-3 h-3 text-purple-400" />
                Next Tier: <strong className="text-white">{nextTier.name}</strong>
              </span>
              <span className="text-purple-400 font-semibold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-purple-950/80 rounded-full h-1.5 overflow-hidden border border-purple-800/60">
              <div
                className="bg-gradient-to-r from-purple-500 to-amber-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-purple-400/90 text-right">
              ₱{(nextTier.minSpend - currentUser.totalSpend).toLocaleString()} spend needed
            </div>
          </div>
        )}

        {/* Attendance Streak Pill */}
        <div className="mt-3.5 flex items-center justify-between p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
            <span>Attendance Streak</span>
          </div>
          <span className="font-bold text-white tabular-nums">
            {currentUser.attendanceStreak} Days (+50 pts/day)
          </span>
        </div>

        {/* Action: Open Digital Member QR */}
        <button
          onClick={onOpenQR}
          className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <QrCode className="w-4 h-4" />
          <span>Show My Membership QR Code</span>
        </button>
      </div>

      {/* Navigation Quick Links */}
      <div className="rounded-2xl bg-[#1a0930]/90 border border-purple-800/40 p-3 space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1">
          Menu & Features
        </div>

        <button
          onClick={() => setActiveTab('home')}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
            activeTab === 'home'
              ? 'bg-purple-700/80 text-white'
              : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>9 Sites Jackpots & Roundtop</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
        </button>

        <button
          onClick={() => setActiveTab('rewards')}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
            activeTab === 'rewards'
              ? 'bg-purple-700/80 text-white'
              : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-pink-400" />
            <span>Redeem Rewards Catalog</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
        </button>

        <button
          onClick={() => setActiveTab('vouchers')}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
            activeTab === 'vouchers'
              ? 'bg-purple-700/80 text-white'
              : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Ticket className="w-4 h-4 text-emerald-400" />
            <span>My Active Vouchers</span>
          </div>
          {pendingVouchersCount > 0 ? (
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-slate-950 font-black rounded-full">
              {pendingVouchersCount}
            </span>
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
            activeTab === 'chat'
              ? 'bg-purple-700/80 text-white'
              : 'text-purple-200 hover:bg-purple-900/50 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <div className="truncate">
              <span>{registeredSite.shortName} Live Chat</span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
        </button>

        {isStaff && (
          <button
            onClick={() => setActiveTab('staff_ops')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors mt-2 ${
              activeTab === 'staff_ops'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Staff QR Scanner & Ops</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Branch Details Card */}
      <div className="rounded-2xl bg-[#1a0930]/80 border border-purple-800/40 p-4 text-xs space-y-2">
        <div className="font-bold text-white flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>{registeredSite.name} Hub</span>
        </div>
        <p className="text-purple-300/80 text-[11px] leading-relaxed">
          {registeredSite.location}
        </p>

        <div className="pt-2 border-t border-purple-800/50 space-y-1 text-[11px] text-purple-300">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-purple-400">
              <Phone className="w-3 h-3" /> Hotline:
            </span>
            <span className="text-white font-mono">{registeredSite.contactNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-purple-400">
              <Calendar className="w-3 h-3" /> Member Since:
            </span>
            <span className="text-white font-mono">{currentUser.memberSince}</span>
          </div>
        </div>
      </div>

      {/* Account Settings Trigger */}
      <div className="pt-1 flex items-center justify-between px-1">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="text-xs text-purple-300 hover:text-white flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-purple-900/40 transition-colors"
        >
          <span>Account Preferences</span>
        </button>
        <button
          onClick={onOpenAuth}
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold py-1 px-2 rounded-lg hover:bg-purple-900/40 transition-colors"
        >
          Switch Account
        </button>
      </div>

      {/* Account Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1d0a33] border border-purple-700/60 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="text-base font-bold text-white">Player Account Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-purple-400 hover:text-white text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs text-purple-200">
              <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-800/40 space-y-1">
                <div className="font-semibold text-white">Member ID: {currentUser.id}</div>
                <div>Full Name: {currentUser.fullName}</div>
                <div>Email: {currentUser.email}</div>
                <div>Mobile: {currentUser.phone}</div>
                <div>Registered Branch: {registeredSite.name}</div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-purple-900/40">
                <span>Sound & Game Alerts</span>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="rounded accent-purple-600 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-purple-900/40">
                <span>Branch Push Announcements</span>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="rounded accent-purple-600 w-4 h-4 cursor-pointer"
                />
              </div>

              <div className="text-[11px] text-purple-400">
                To transfer your primary registered home branch to another BingoPlus site, please coordinate with front counter staff or branch manager.
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
