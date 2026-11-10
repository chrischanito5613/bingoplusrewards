import React, { useState } from 'react';
import {
  Bell,
  Coins,
  QrCode,
  ShieldCheck,
  UserCheck,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';
import { UserRole } from '../types/bingoplus';

interface HeaderProps {
  activeTab: 'home' | 'rewards' | 'chat' | 'staff_ops' | 'vouchers';
  setActiveTab: (tab: 'home' | 'rewards' | 'chat' | 'staff_ops' | 'vouchers') => void;
  onOpenQR: () => void;
  onOpenNotifications: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQR,
  onOpenNotifications,
  onOpenAuthModal,
}) => {
  const { currentUser, store, sites, users, notifications } = useBingoPlus();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const registeredSite = sites.find((s) => s.id === currentUser?.registeredSiteId);
  const isStaffOrAdmin = currentUser && ['STAFF', 'BRANCH_MANAGER', 'ADMIN', 'SUPERUSER'].includes(currentUser.role);

  // Unread notification count for current user's branch or ALL
  const unreadCount = notifications.filter(
    (n) => (n.targetSiteId === 'ALL' || n.targetSiteId === currentUser?.registeredSiteId) && !n.readByUsers.includes(currentUser?.id || '')
  ).length;

  const handleSwitchAccount = (userId: string) => {
    store.setCurrentUserId(userId);
    setShowRoleMenu(false);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'SUPERUSER':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'ADMIN':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'BRANCH_MANAGER':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'STAFF':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#160829]/95 backdrop-blur-md border-b border-purple-900/40 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <img
              src="/assets/aistudio/bingoplus_logo_transparent.png"
              alt="BingoPlus Official Logo"
              className="h-10 w-auto object-contain drop-shadow"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                9 Sites Network
              </span>
              <span className="text-[11px] text-purple-300/80">Unified Rewards Hub</span>
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'home'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-purple-200 hover:text-white hover:bg-purple-950/60'
            }`}
          >
            Live Jackpots & Roundtop
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'rewards'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-purple-200 hover:text-white hover:bg-purple-950/60'
            }`}
          >
            Redeem Rewards
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-purple-200 hover:text-white hover:bg-purple-950/60'
            }`}
          >
            <span>Branch Live Chat</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          {isStaffOrAdmin && (
            <button
              onClick={() => setActiveTab('staff_ops')}
              className={`px-3 py-1.5 text-xs lg:text-sm font-bold rounded-lg transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'staff_ops'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/50 font-extrabold'
                  : 'text-amber-300 hover:text-white hover:bg-amber-950/60 border border-amber-500/30'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Staff Operations Console</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions & Active User */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative p-2 rounded-lg bg-purple-950/80 text-purple-200 hover:text-white hover:bg-purple-900 border border-purple-800/50 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Player QR Trigger */}
          {currentUser && (
            <button
              onClick={onOpenQR}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-semibold shadow border border-purple-400/30 transition-all shrink-0"
              title="Show my Membership QR code"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">My QR</span>
            </button>
          )}

          {/* Role & User Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900/80 border border-purple-700/50 text-left transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-xs text-white uppercase shadow">
                {currentUser?.fullName.charAt(0) || 'U'}
              </div>
              <div className="hidden sm:flex flex-col text-xs leading-tight">
                <span className="font-semibold text-white max-w-[120px] truncate">
                  {currentUser?.fullName || 'Guest'}
                </span>
                <span className="text-[10px] text-amber-300 flex items-center gap-1">
                  <Coins className="w-2.5 h-2.5" />
                  {currentUser?.pointsBalance?.toLocaleString() || 0} pts
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
            </button>

            {/* Switcher Popover */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#1e0d36] border border-purple-700/60 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-2 border-b border-purple-800/60 mb-2">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Active Account</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getRoleBadge(currentUser?.role || 'PLAYER')}`}>
                      {currentUser?.role?.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-purple-300 flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3 text-amber-400" />
                    <span>{registeredSite?.name || 'BingoPlus SM Lipa'}</span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-bold tracking-wider text-purple-400 px-3 py-1">
                  Quick Role Switcher (Demo Test)
                </div>

                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {users.slice(0, 8).map((u) => {
                    const site = sites.find((s) => s.id === u.registeredSiteId);
                    const isSelected = u.id === currentUser?.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => handleSwitchAccount(u.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-purple-700 text-white font-semibold'
                            : 'text-purple-200 hover:bg-purple-900/60 hover:text-white'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-medium truncate">{u.fullName}</div>
                          <div className="text-[10px] text-purple-300/80 truncate">
                            {u.role.replace('_', ' ')} • {site?.shortName}
                          </div>
                        </div>
                        {isSelected && <UserCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-purple-800/60 mt-2 flex items-center justify-between px-2">
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onOpenAuthModal();
                    }}
                    className="text-xs text-amber-300 hover:text-amber-200 font-semibold"
                  >
                    + Log In / Register New
                  </button>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onOpenAuthModal();
                    }}
                    className="text-xs text-purple-400 hover:text-purple-200 flex items-center gap-1"
                  >
                    <LogOut className="w-3 h-3" />
                    Switch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
