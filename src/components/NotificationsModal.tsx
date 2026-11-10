import React from 'react';
import { Bell, Sparkles, Building2, Trophy, Gift, Megaphone, Check } from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, currentUser, sites } = useBingoPlus();

  if (!isOpen) return null;

  // Filter notifications for this user's branch or ALL
  const relevantNotifs = notifications.filter(
    (n) => n.targetSiteId === 'ALL' || n.targetSiteId === currentUser?.registeredSiteId
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'JACKPOT':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'PROMO':
        return <Gift className="w-4 h-4 text-pink-400" />;
      case 'EVENT':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      default:
        return <Megaphone className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-[#1d0937] border border-purple-700/70 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Branch Announcements & Push Alerts
              </h3>
              <p className="text-[11px] text-purple-300">
                Real-time updates for {sites.find((s) => s.id === currentUser?.registeredSiteId)?.name || 'all branches'}
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

        {/* Notifications Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {relevantNotifs.length === 0 ? (
            <div className="text-center py-8 text-purple-400 text-xs">
              No new notifications right now.
            </div>
          ) : (
            relevantNotifs.map((notif) => (
              <div
                key={notif.id}
                className="p-4 rounded-2xl bg-purple-950/70 border border-purple-700/50 space-y-1.5 shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-900/80 text-amber-300 border border-purple-600/40 flex items-center gap-1">
                    {getCategoryIcon(notif.category)}
                    <span>{notif.category}</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-mono">
                    {notif.sentAt}
                  </span>
                </div>

                <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug">
                  {notif.title}
                </h4>

                <p className="text-xs text-purple-200/90 leading-relaxed">
                  {notif.body}
                </p>

                <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between text-[10px] text-purple-400">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-amber-400" />
                    {notif.targetSiteName}
                  </span>
                  <span>From: {notif.senderName}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
