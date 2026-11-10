import React from 'react';
import { QrCode, Coins, Building2, Flame, Award, CheckCircle2 } from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';
import { QRCodeDisplay } from './QRCodeDisplay';

interface PlayerQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStaffOps?: () => void;
}

export const PlayerQRModal: React.FC<PlayerQRModalProps> = ({
  isOpen,
  onClose,
  onOpenStaffOps,
}) => {
  const { currentUser, sites, tierConfigs } = useBingoPlus();

  if (!isOpen || !currentUser) return null;

  const site = sites.find((s) => s.id === currentUser.registeredSiteId) || sites[0];
  const tierConfig = tierConfigs.find((t) => t.id === currentUser.tier) || tierConfigs[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#240e44] via-[#1a0733] to-[#120326] border border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 text-left">
          <div className="flex items-center gap-2">
            <img
              src="/assets/aistudio/bingoplus_logo_transparent.png"
              alt="BingoPlus"
              className="h-7 w-auto"
            />
            <span className="text-[11px] uppercase font-black text-amber-400">
              Official Digital Pass
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-purple-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Member ID and Profile */}
        <div>
          <h3 className="text-lg font-black text-white">{currentUser.fullName}</h3>
          <p className="text-xs text-purple-300">Member ID: {currentUser.id}</p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span
              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${tierConfig.badgeBg}`}
            >
              {tierConfig.name}
            </span>
            <span className="text-[10px] text-purple-300 font-semibold flex items-center gap-1">
              <Building2 className="w-3 h-3 text-amber-400" />
              {site.name}
            </span>
          </div>
        </div>

        {/* Crisp QR Code Container */}
        <div className="flex justify-center py-2">
          <QRCodeDisplay
            value={currentUser.qrCodeData}
            size={210}
            darkColor="#260847"
          />
        </div>

        {/* Stats Pill */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-purple-950/70 rounded-2xl border border-purple-800/50 text-xs">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-purple-400 block">
              Current Points
            </span>
            <span className="text-base font-black text-amber-400 tabular-nums">
              {currentUser.pointsBalance.toLocaleString()} PTS
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-purple-400 block">
              Daily Streak
            </span>
            <span className="text-base font-black text-orange-400 tabular-nums flex items-center justify-end gap-1">
              <Flame className="w-3.5 h-3.5" />
              {currentUser.attendanceStreak} Days
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-[11px] text-purple-200/90 leading-relaxed bg-purple-900/30 p-2.5 rounded-xl border border-purple-700/40">
          Present this QR code to the cashier or counter staff at {site.name} for:
          <ul className="mt-1 space-y-0.5 text-[10px] text-purple-300 text-left list-disc list-inside">
            <li>Daily attendance check-in (+50 pts)</li>
            <li>Machine purchases (₱50 = 1 pt x {tierConfig.pointMultiplier})</li>
            <li>Tournament bonuses & reward releases</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
        >
          Close Digital Pass
        </button>
      </div>
    </div>
  );
};
