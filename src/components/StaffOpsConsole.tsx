import React, { useState } from 'react';
import {
  QrCode,
  ShieldCheck,
  Search,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Coins,
  Ticket,
  Trophy,
  Users,
  Package,
  Layers,
  Send,
  Radio,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Plus,
  Trash2,
  Power,
  Flame,
  Check,
  Edit3,
  Sliders,
  Settings,
  BookOpen,
  FileText,
  Lock,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBingoPlus } from '../hooks/useBingoPlus';
import {
  User,
  TierLevel,
  TraditionalJackpotBracket,
  EBGMachineVariant,
  RewardItem,
  PointMechanic,
} from '../types/bingoplus';

export const StaffOpsConsole: React.FC = () => {
  const {
    sites,
    users,
    logs,
    rewards,
    vouchers,
    tierConfigs,
    mechanics,
    currentUser,
    store,
  } = useBingoPlus();

  const isSuperuserOrAdmin = currentUser && ['SUPERUSER', 'ADMIN'].includes(currentUser.role);
  const isManagerOrAbove = currentUser && ['SUPERUSER', 'ADMIN', 'BRANCH_MANAGER'].includes(currentUser.role);
  const isStaffOnly = currentUser?.role === 'STAFF';
  const defaultSiteId = currentUser?.assignedSiteId || currentUser?.registeredSiteId || 'sm-lipa';

  const [activeOpsTab, setActiveOpsTab] = useState<
    'scanner' | 'trad_bingo' | 'ebg_machines' | 'logs' | 'site_editor' | 'inventory' | 'members' | 'tiers' | 'broadcast'
  >('scanner');

  const [selectedBranchId, setSelectedBranchId] = useState<string>(defaultSiteId);

  // Retail Inventory & Catalogue State
  const [inventorySubTab, setInventorySubTab] = useState<'items' | 'mechanics'>('items');
  const [mechanicCategoryFilter, setMechanicCategoryFilter] = useState<string>('ALL');

  // Add Item Modal State
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<RewardItem['category']>('VOUCHER');
  const [newItemPointsCost, setNewItemPointsCost] = useState(500);
  const [newItemPhpValue, setNewItemPhpValue] = useState(500);
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemMinTier, setNewItemMinTier] = useState<TierLevel>('BRONZE');
  const [newItemIcon, setNewItemIcon] = useState('Ticket');
  const [newItemInitialStock, setNewItemInitialStock] = useState(25);
  const [newItemIsRedeemable, setNewItemIsRedeemable] = useState(true);

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<RewardItem | null>(null);
  const [editItemTitle, setEditItemTitle] = useState('');
  const [editItemCategory, setEditItemCategory] = useState<RewardItem['category']>('VOUCHER');
  const [editItemPointsCost, setEditItemPointsCost] = useState(500);
  const [editItemPhpValue, setEditItemPhpValue] = useState(500);
  const [editItemDescription, setEditItemDescription] = useState('');
  const [editItemMinTier, setEditItemMinTier] = useState<TierLevel>('BRONZE');
  const [editItemIsRedeemable, setEditItemIsRedeemable] = useState(true);

  // Add Mechanic Modal State
  const [showAddMechanicModal, setShowAddMechanicModal] = useState(false);
  const [newMechTitle, setNewMechTitle] = useState('');
  const [newMechCategory, setNewMechCategory] = useState<PointMechanic['category']>('POINTS_EARNING');
  const [newMechPoints, setNewMechPoints] = useState(50);
  const [newMechSpendRate, setNewMechSpendRate] = useState(50);
  const [newMechDesc, setNewMechDesc] = useState('');
  const [newMechConditions, setNewMechConditions] = useState('');
  const [newMechSite, setNewMechSite] = useState('ALL');
  const [newMechIsEnabled, setNewMechIsEnabled] = useState(true);

  // Edit Mechanic Modal State
  const [editingMechanic, setEditingMechanic] = useState<PointMechanic | null>(null);
  const [editMechTitle, setEditMechTitle] = useState('');
  const [editMechCategory, setEditMechCategory] = useState<PointMechanic['category']>('POINTS_EARNING');
  const [editMechPoints, setEditMechPoints] = useState(50);
  const [editMechSpendRate, setEditMechSpendRate] = useState(50);
  const [editMechDesc, setEditMechDesc] = useState('');
  const [editMechConditions, setEditMechConditions] = useState('');
  const [editMechSite, setEditMechSite] = useState('ALL');
  const [editMechIsEnabled, setEditMechIsEnabled] = useState(true);

  // Traditional Bingo Jackpots State
  const [showAddTradModal, setShowAddTradModal] = useState(false);
  const [newTradPattern, setNewTradPattern] = useState('Coverall / Blackout');
  const [newTradMinBalls, setNewTradMinBalls] = useState(1);
  const [newTradMaxBalls, setNewTradMaxBalls] = useState(48);
  const [newTradPrize, setNewTradPrize] = useState(500000);
  const [newTradConsolation, setNewTradConsolation] = useState(15000);
  const [newTradNotes, setNewTradNotes] = useState('Win Coverall on or before 48 balls');

  // EBG Machine Variants State
  const [showAddEbgModal, setShowAddEbgModal] = useState(false);
  const [newEbgName, setNewEbgName] = useState('Dragon Fortune Link');
  const [newEbgCode, setNewEbgCode] = useState('DFL-01');
  const [newEbgType, setNewEbgType] = useState<EBGMachineVariant['type']>('COMMUNITY_LINK');
  const [newEbgRoundtop, setNewEbgRoundtop] = useState(85000);
  const [newEbgProgressive, setNewEbgProgressive] = useState(450000);
  const [newEbgBallCeiling, setNewEbgBallCeiling] = useState(48);
  const [newEbgCabinets, setNewEbgCabinets] = useState(18);

  // Scanner state
  const [scannedInput, setScannedInput] = useState('');
  const [scannedPlayer, setScannedPlayer] = useState<User | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1000);
  const [tournamentBonus, setTournamentBonus] = useState<number>(300);
  const [tournamentNotes, setTournamentNotes] = useState('Albay Weekend Bracket Winner');
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [scannerFeedback, setScannerFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Site editor state
  const currentBranch = sites.find((s) => s.id === selectedBranchId) || sites[0];
  const [editMega, setEditMega] = useState(currentBranch.megaJackpot);
  const [editGrand, setEditGrand] = useState(currentBranch.grandJackpot);
  const [editMajor, setEditMajor] = useState(currentBranch.majorJackpot);
  const [editRoundNum, setEditRoundNum] = useState(currentBranch.roundtop.roundNumber);
  const [editBallsDrawn, setEditBallsDrawn] = useState(currentBranch.roundtop.ballsDrawn);
  const [editTargetBalls, setEditTargetBalls] = useState(currentBranch.roundtop.ballCallTarget);
  const [editStatus, setEditStatus] = useState(currentBranch.roundtop.status);
  const [editAnnouncement, setEditAnnouncement] = useState(currentBranch.activeAnnouncement);

  // Logs filters
  const [logFilterSite, setLogFilterSite] = useState<string>('ALL');
  const [logFilterType, setLogFilterType] = useState<string>('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Push notification composer state
  const [notifTitle, setNotifTitle] = useState('');
  const [notifBody, setNotifBody] = useState('');
  const [notifTargetSite, setNotifTargetSite] = useState<string>('ALL');
  const [notifCategory, setNotifCategory] = useState<'PROMO' | 'JACKPOT' | 'SYSTEM' | 'EVENT'>('PROMO');

  // Handle Scan Player Code or Simulated Selection
  const handleVerifyPlayerCode = (codeToVerify: string) => {
    setScannerFeedback(null);
    const trimmed = codeToVerify.trim();
    if (!trimmed) return;

    // Check if it's a voucher QR: BP-VOUCHER:code:...
    if (trimmed.startsWith('BP-VOUCHER:') || trimmed.startsWith('BP-VCH-')) {
      const parts = trimmed.split(':');
      const vCode = parts.length > 1 ? parts[1] : trimmed;
      setVoucherCodeInput(vCode);
      handleAcceptVoucher(vCode);
      return;
    }

    // Check if it's member QR: BP-MEMBER:userId:site:tier
    let targetUser: User | undefined;
    if (trimmed.startsWith('BP-MEMBER:')) {
      const parts = trimmed.split(':');
      const uId = parts[1];
      targetUser = users.find((u) => u.id === uId);
    } else {
      // Lookup by username, id, or phone
      targetUser = users.find(
        (u) =>
          u.id.toLowerCase() === trimmed.toLowerCase() ||
          u.username.toLowerCase() === trimmed.toLowerCase() ||
          u.phone.replace(/[^0-9]/g, '').includes(trimmed.replace(/[^0-9]/g, ''))
      );
    }

    if (targetUser) {
      setScannedPlayer(targetUser);
      setScannerFeedback({
        type: 'success',
        message: `Verified: ${targetUser.fullName} (${targetUser.tier} Member) at ${
          sites.find((s) => s.id === targetUser.registeredSiteId)?.name
        }`,
      });
    } else {
      setScannerFeedback({
        type: 'error',
        message: 'No player record matched this QR code or identifier.',
      });
    }
  };

  // Award Attendance
  const handleAwardAttendance = () => {
    if (!scannedPlayer || !currentUser) return;
    const res = store.addPointsToPlayer({
      targetUserId: scannedPlayer.id,
      siteId: selectedBranchId,
      type: 'ATTENDANCE',
      staffUser: currentUser,
    });

    if (res.success) {
      confetti({ particleCount: 50, spread: 50 });
      setScannerFeedback({
        type: 'success',
        message: `Awarded +${res.pointsAwarded} attendance points to ${scannedPlayer.fullName}! New Balance: ${res.newBalance.toLocaleString()} pts.`,
      });
      // refresh scanned player state
      const updated = users.find((u) => u.id === scannedPlayer.id);
      if (updated) setScannedPlayer(updated);
    }
  };

  // Award Purchase
  const handleAwardPurchase = () => {
    if (!scannedPlayer || !currentUser) return;
    const res = store.addPointsToPlayer({
      targetUserId: scannedPlayer.id,
      siteId: selectedBranchId,
      type: 'PURCHASE',
      purchaseAmount,
      staffUser: currentUser,
    });

    if (res.success) {
      confetti({ particleCount: 70, spread: 60 });
      setScannerFeedback({
        type: 'success',
        message: `Successfully credited +${res.pointsAwarded} pts for ₱${purchaseAmount.toLocaleString()} purchase! New Balance: ${res.newBalance.toLocaleString()} pts.`,
      });
      const updated = users.find((u) => u.id === scannedPlayer.id);
      if (updated) setScannedPlayer(updated);
    } else {
      setScannerFeedback({ type: 'error', message: res.error || 'Failed to add purchase points.' });
    }
  };

  // Award Tournament Win
  const handleAwardTournament = () => {
    if (!scannedPlayer || !currentUser) return;
    const res = store.addPointsToPlayer({
      targetUserId: scannedPlayer.id,
      siteId: selectedBranchId,
      type: 'TOURNAMENT_WIN',
      tournamentBonusPoints: tournamentBonus,
      notes: tournamentNotes,
      staffUser: currentUser,
    });

    if (res.success) {
      confetti({ particleCount: 80, spread: 70 });
      setScannerFeedback({
        type: 'success',
        message: `Tournament award +${res.pointsAwarded} pts credited to ${scannedPlayer.fullName}!`,
      });
      const updated = users.find((u) => u.id === scannedPlayer.id);
      if (updated) setScannedPlayer(updated);
    }
  };

  // Accept Voucher
  const handleAcceptVoucher = (code: string) => {
    if (!currentUser) return;
    const res = store.claimVoucherByStaff(code, currentUser, selectedBranchId);
    if (res.success && res.voucher) {
      confetti({ particleCount: 80, spread: 60 });
      setScannerFeedback({
        type: 'success',
        message: `Voucher ${res.voucher.voucherCode} verified and marked CLAIMED! Item "${res.voucher.rewardTitle}" released. Branch stock decremented.`,
      });
      setVoucherCodeInput('');
    } else {
      setScannerFeedback({
        type: 'error',
        message: res.error || 'Invalid or already claimed voucher.',
      });
    }
  };

  // Save Site Settings
  const handleSaveSiteDetails = () => {
    store.updateSiteDetails(selectedBranchId, {
      megaJackpot: editMega,
      grandJackpot: editGrand,
      majorJackpot: editMajor,
      activeAnnouncement: editAnnouncement,
      roundtop: {
        ...currentBranch.roundtop,
        roundNumber: editRoundNum,
        ballsDrawn: editBallsDrawn,
        ballCallTarget: editTargetBalls,
        status: editStatus,
      },
    });

    setScannerFeedback({
      type: 'success',
      message: `Updated live parameters for ${currentBranch.name}! Synced across network.`,
    });
  };

  // Broadcast Push Notification
  const handleBroadcastNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifBody.trim() || !currentUser) return;

    store.broadcastPushNotification({
      title: notifTitle.trim(),
      body: notifBody.trim(),
      targetSiteId: notifTargetSite,
      category: notifCategory,
      senderName: `${currentUser.fullName} (${currentUser.role.replace('_', ' ')})`,
    });

    setNotifTitle('');
    setNotifBody('');
    setScannerFeedback({
      type: 'success',
      message: 'Push Announcement broadcasted in real-time to players!',
    });
  };

  // Export Activity Logs to CSV
  const handleExportCSV = () => {
    const filtered = logs.filter((log) => {
      const matchSite = logFilterSite === 'ALL' || log.siteId === logFilterSite;
      const matchType = logFilterType === 'ALL' || log.type === logFilterType;
      return matchSite && matchType;
    });

    const headers = [
      'Log ID',
      'Timestamp',
      'Branch Site',
      'Member Name',
      'User ID',
      'Tier',
      'Type',
      'Points Delta',
      'Purchase Amount (PHP)',
      'Staff In-Charge',
      'Notes',
    ];

    const rows = filtered.map((l) => [
      l.id,
      new Date(l.timestamp).toISOString(),
      `"${l.siteName}"`,
      `"${l.userName}"`,
      l.userId,
      l.userTier || 'N/A',
      l.type,
      l.pointsDelta,
      l.purchaseAmount || 0,
      `"${l.staffName || 'System'}"`,
      `"${l.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `BingoPlus_Activity_Logs_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Logs
  const displayedLogs = logs.filter((l) => {
    const matchSite = logFilterSite === 'ALL' || l.siteId === logFilterSite;
    const matchType = logFilterType === 'ALL' || l.type === logFilterType;
    const matchSearch =
      !logSearchQuery ||
      l.userName.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      l.notes.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      l.siteName.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchSite && matchType && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Staff Credentials & Active Branch Context */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2e0e56] via-[#220942] to-[#17062d] border border-amber-500/50 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Staff Operations & Branch Administration
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-extrabold">
              LEVEL: {currentUser?.role.replace('_', ' ')}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Unified Multi-Site Management Console
          </h2>
          <p className="text-xs text-purple-200/80 mt-0.5">
            Logged in as <strong>{currentUser?.fullName}</strong> • Real-time synchronization active across all 9 locations.
          </p>
        </div>

        {/* Branch Context Selector */}
        <div className="flex items-center gap-2 bg-[#1b0833] p-2.5 rounded-xl border border-purple-700/60 shrink-0">
          <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-purple-400 block">
              Operating Branch
            </span>
            <select
              value={selectedBranchId}
              onChange={(e) => {
                setSelectedBranchId(e.target.value);
                const s = sites.find((x) => x.id === e.target.value);
                if (s) {
                  setEditMega(s.megaJackpot);
                  setEditGrand(s.grandJackpot);
                  setEditMajor(s.majorJackpot);
                  setEditRoundNum(s.roundtop.roundNumber);
                  setEditBallsDrawn(s.roundtop.ballsDrawn);
                  setEditTargetBalls(s.roundtop.ballCallTarget);
                  setEditStatus(s.roundtop.status);
                  setEditAnnouncement(s.activeAnnouncement);
                }
              }}
              className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
            >
              {sites.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#1b0833] text-white">
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Operations Navigation Tabs */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 border-b border-purple-800/40 no-scrollbar">
        {[
          { id: 'scanner', label: 'QR Scanner & Points Desk', icon: QrCode },
          { id: 'trad_bingo', label: 'Traditional Bingo & Ball Brackets', icon: Trophy },
          { id: 'ebg_machines', label: 'EBG Variants & Roundtop', icon: Flame },
          { id: 'site_editor', label: 'Jackpots & Hall Operations', icon: Sparkles },
          { id: 'logs', label: 'Activity & Revenue Logs', icon: FileSpreadsheet },
          { id: 'inventory', label: 'Retail Inventory Tracker', icon: Package },
          { id: 'members', label: 'Member Accounts', icon: Users },
          { id: 'tiers', label: 'Tiered Reward Levels', icon: Layers },
          { id: 'broadcast', label: 'Broadcast Push Promo', icon: Send },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeOpsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveOpsTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-950/50'
                  : 'bg-purple-950/60 text-purple-200 hover:bg-purple-900/60 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Global Feedback Banner */}
      {scannerFeedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            scannerFeedback.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-100 shadow-lg'
              : 'bg-red-950/90 border-red-500/80 text-red-100 shadow-lg'
          }`}
        >
          <div className="flex items-center gap-2">
            {scannerFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{scannerFeedback.message}</span>
          </div>
          <button
            onClick={() => setScannerFeedback(null)}
            className="text-white hover:text-purple-300 font-bold px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* TAB 1: QR Scanner & Points Station */}
      {activeOpsTab === 'scanner' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: QR Scanner & Lookup Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span>Scan Player Membership QR</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready
                </span>
              </div>

              {/* Camera Scanner Simulation Frame */}
              <div className="relative rounded-xl bg-purple-950/80 border-2 border-dashed border-purple-500/40 h-52 flex flex-col items-center justify-center p-4 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                <div className="w-36 h-36 border-2 border-amber-400/80 rounded-2xl relative flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-300" />
                  <QrCode className="w-12 h-12 text-purple-300/60 animate-pulse" />
                </div>
                <p className="text-[11px] text-purple-300 mt-2">
                  Position Player QR code or Voucher QR within view
                </p>
              </div>

              {/* Input for QR text or direct code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-purple-300">
                  Manual Code / ID Lookup:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={scannedInput}
                    onChange={(e) => setScannedInput(e.target.value)}
                    placeholder="e.g. maria_lipa or BP-MEMBER:... or BP-VCH-882194"
                    className="flex-1 bg-[#130325] text-white text-xs rounded-xl px-3 py-2.5 border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={() => handleVerifyPlayerCode(scannedInput)}
                    className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Quick Demo Player Buttons for immediate 1-click test */}
              <div className="pt-2 border-t border-purple-800/60 space-y-1.5">
                <span className="text-[11px] uppercase font-bold text-purple-400 block">
                  1-Click Test Quick Scan:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {users.filter((u) => u.role === 'PLAYER').slice(0, 4).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setScannedInput(p.qrCodeData);
                        handleVerifyPlayerCode(p.qrCodeData);
                      }}
                      className="p-2 rounded-lg bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/40 text-left text-purple-200 hover:text-white transition-colors"
                    >
                      <div className="font-semibold truncate">{p.fullName}</div>
                      <div className="text-[10px] text-amber-300">{p.tier} • {p.pointsBalance} pts</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voucher quick claim box */}
              <div className="pt-3 border-t border-purple-800/60 space-y-1.5">
                <span className="text-[11px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Ticket className="w-3 h-3" />
                  Redeem Reward Voucher Code:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={voucherCodeInput}
                    onChange={(e) => setVoucherCodeInput(e.target.value)}
                    placeholder="Enter Voucher Code (e.g. BP-VCH-882194)"
                    className="flex-1 bg-[#130325] text-white text-xs rounded-xl px-3 py-2 border border-purple-700/60 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAcceptVoucher(voucherCodeInput)}
                    className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Player Card & Point Award Panels */}
          <div className="lg:col-span-7 space-y-4">
            {scannedPlayer ? (
              <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-6 shadow-xl space-y-5">
                {/* Verified Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-800/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-black text-amber-300 text-lg">
                      {scannedPlayer.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-white text-lg">
                          {scannedPlayer.fullName}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                          ACTIVE MEMBER
                        </span>
                      </div>
                      <p className="text-xs text-purple-300">
                        @{scannedPlayer.username} • Mobile: {scannedPlayer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-purple-400 block">
                      Registered Branch
                    </span>
                    <span className="text-xs font-bold text-amber-300">
                      {sites.find((s) => s.id === scannedPlayer.registeredSiteId)?.name}
                    </span>
                  </div>
                </div>

                {/* Live Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-purple-950/70 rounded-xl border border-purple-800/50">
                    <span className="text-[10px] text-purple-400 uppercase font-bold">Points Balance</span>
                    <div className="text-xl font-black text-amber-400 tabular-nums">
                      {scannedPlayer.pointsBalance.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-950/70 rounded-xl border border-purple-800/50">
                    <span className="text-[10px] text-purple-400 uppercase font-bold">Tier Level</span>
                    <div className="text-sm font-black text-white">
                      {scannedPlayer.tier}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-950/70 rounded-xl border border-purple-800/50">
                    <span className="text-[10px] text-purple-400 uppercase font-bold">Total Spent</span>
                    <div className="text-sm font-black text-white tabular-nums">
                      ₱{scannedPlayer.totalSpend.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-950/70 rounded-xl border border-purple-800/50">
                    <span className="text-[10px] text-purple-400 uppercase font-bold">Streak</span>
                    <div className="text-sm font-black text-orange-400">
                      {scannedPlayer.attendanceStreak} Days
                    </div>
                  </div>
                </div>

                {/* Point Addition Workflows */}
                <div className="space-y-4 pt-2">
                  <h5 className="text-xs uppercase font-extrabold text-amber-400">
                    Available Counter Actions for this Player:
                  </h5>

                  {/* Action 1: Attendance */}
                  <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h6 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Daily Attendance Verification</span>
                      </h6>
                      <p className="text-[11px] text-purple-300">
                        Awards standard 50 points (multiplied by {scannedPlayer.tier} multiplier) and advances visit streak.
                      </p>
                    </div>
                    <button
                      onClick={handleAwardAttendance}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shrink-0 shadow"
                    >
                      + Award Attendance
                    </button>
                  </div>

                  {/* Action 2: Purchase */}
                  <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-800/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h6 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-amber-400" />
                          <span>Machine Tokens / Credits Purchase</span>
                        </h6>
                        <p className="text-[11px] text-purple-300">
                          Rate: ₱50 spend = 1 pt. Player tier multiplier will be applied automatically.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-purple-300 font-bold">₱</span>
                        <input
                          type="number"
                          step="100"
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                          className="w-28 bg-[#120323] text-white text-xs font-mono font-bold rounded-lg px-2.5 py-1.5 border border-purple-700/60 focus:outline-none"
                        />
                        <button
                          onClick={handleAwardPurchase}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shrink-0 shadow"
                        >
                          Credit Points
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action 3: Tournament Win */}
                  <div className="p-4 rounded-xl bg-purple-950/50 border border-purple-800/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h6 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span>Tournament Winner Points Bonus</span>
                        </h6>
                        <p className="text-[11px] text-purple-300">
                          Award special bonus points for tournament ranking or bingo champion rounds.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={tournamentBonus}
                          onChange={(e) => setTournamentBonus(Number(e.target.value))}
                          placeholder="Points"
                          className="w-20 bg-[#120323] text-white text-xs font-mono font-bold rounded-lg px-2 py-1.5 border border-purple-700/60 focus:outline-none"
                        />
                        <button
                          onClick={handleAwardTournament}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shrink-0 shadow"
                        >
                          Award Winner
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full rounded-2xl bg-purple-950/30 border border-purple-800/40 p-8 flex flex-col items-center justify-center text-center space-y-3">
                <QrCode className="w-12 h-12 text-purple-400/60" />
                <h4 className="text-base font-bold text-white">No Player Scanned Yet</h4>
                <p className="text-xs text-purple-300 max-w-sm">
                  Scan a member’s physical or digital QR code from the player app, or pick one from the quick test list on the left to verify attendance, purchases, or vouchers.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: Traditional Bingo Jackpots & Ball Brackets */}
      {activeOpsTab === 'trad_bingo' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-800/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                  TRADITIONAL HALL BINGO
                </span>
                <span className="text-xs text-purple-300">
                  Paper Cards & Mechanical Blower Sessions
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Traditional Jackpot Prizes & Ball Brackets ({currentBranch.name})</span>
              </h3>
              <p className="text-xs text-purple-200/80">
                Prizes awarded when a winning card covers the pattern within a specific number of ball calls.
              </p>
            </div>

            <button
              onClick={() => setShowAddTradModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/50 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Traditional Jackpot Prize</span>
            </button>
          </div>

          {/* Ball Brackets List */}
          <div className="space-y-3">
            {(currentBranch.traditionalJackpots || []).length === 0 ? (
              <div className="text-center py-12 text-purple-400 text-xs">
                No traditional jackpot brackets configured yet for {currentBranch.name}.
              </div>
            ) : (
              (currentBranch.traditionalJackpots || []).map((bracket) => (
                <div
                  key={bracket.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    bracket.isActive
                      ? 'bg-purple-950/70 border-purple-600/60 shadow'
                      : 'bg-[#150424]/80 border-purple-900/40 opacity-60'
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-white text-sm sm:text-base">
                        {bracket.gamePattern}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                          bracket.isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-red-500/20 text-red-300 border-red-500/40'
                        }`}
                      >
                        {bracket.isActive ? 'ACTIVE IN DRAW' : 'DISABLED'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-purple-300 pt-0.5">
                      <span className="font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40 font-mono">
                        Ball Bracket: {bracket.minBalls} – {bracket.maxBalls} Balls
                      </span>
                      {bracket.consolationPrize && bracket.consolationPrize > 0 && (
                        <span>
                          Consolation: <strong className="text-purple-200">₱{bracket.consolationPrize.toLocaleString()}</strong>
                        </span>
                      )}
                      {bracket.notes && (
                        <span className="text-purple-400 italic">
                          • {bracket.notes}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Prize Amount & Interactive Controls */}
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] uppercase font-bold text-purple-400 block">
                        Jackpot Prize
                      </span>
                      <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
                        ₱{bracket.prizeAmount.toLocaleString()}
                      </div>
                    </div>

                    {/* Quick Prize Adjusters */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() =>
                          store.updateTraditionalJackpot(selectedBranchId, bracket.id, {
                            prizeAmount: bracket.prizeAmount + 25000,
                          })
                        }
                        className="px-2 py-0.5 bg-purple-900 hover:bg-purple-800 text-white rounded text-[10px] font-bold"
                        title="Add ₱25,000"
                      >
                        +25k
                      </button>
                      <button
                        onClick={() =>
                          store.updateTraditionalJackpot(selectedBranchId, bracket.id, {
                            prizeAmount: Math.max(5000, bracket.prizeAmount - 25000),
                          })
                        }
                        className="px-2 py-0.5 bg-purple-900 hover:bg-purple-800 text-white rounded text-[10px] font-bold"
                        title="Minus ₱25,000"
                      >
                        -25k
                      </button>
                    </div>

                    {/* Toggle ON/OFF Switch */}
                    <button
                      onClick={() => store.toggleTraditionalJackpot(selectedBranchId, bracket.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                        bracket.isActive
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                          : 'bg-purple-900/60 hover:bg-purple-800 text-purple-300 border border-purple-700/40'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{bracket.isActive ? 'Active' : 'Off'}</span>
                    </button>

                    {/* Delete Bracket */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${bracket.gamePattern}" jackpot bracket?`)) {
                          store.deleteTraditionalJackpot(selectedBranchId, bracket.id);
                        }
                      }}
                      className="p-2 text-purple-400 hover:text-red-400 transition-colors"
                      title="Delete bracket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB: EBG Machine Variants & Roundtop Control */}
      {activeOpsTab === 'ebg_machines' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-800/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-600 text-white">
                  ELECTRONIC BINGO GAMES (EBG)
                </span>
                <span className="text-xs text-purple-300 font-mono">
                  Machine Variant Roundtops
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>EBG Machine Variants & Roundtop Amount ({currentBranch.name})</span>
              </h3>
              <p className="text-xs text-purple-200/80">
                Staff can adjust roundtop prize caps and toggle individual machine variants on or off in real-time.
              </p>
            </div>

            <button
              onClick={() => setShowAddEbgModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/50 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add EBG Machine Variant</span>
            </button>
          </div>

          {/* EBG Machine Variants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(currentBranch.ebgVariants || []).map((variant) => (
              <div
                key={variant.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  variant.isEnabled
                    ? 'bg-gradient-to-b from-[#2a104c] to-[#17062b] border-purple-500/60 shadow-lg'
                    : 'bg-[#150424]/80 border-purple-900/40 opacity-60'
                }`}
              >
                <div>
                  {/* Top Bar of Variant Card */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-900 text-amber-300 border border-purple-700/60">
                      {variant.code} • {variant.type.replace('_', ' ')}
                    </span>

                    {/* Toggle ON / OFF Badge */}
                    <button
                      onClick={() => store.toggleEBGMachineVariant(selectedBranchId, variant.id)}
                      className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border transition-all ${
                        variant.isEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30'
                      }`}
                    >
                      <Power className="w-3 h-3" />
                      <span>{variant.isEnabled ? 'ON (ACTIVE IN HALL)' : 'OFF (STANDBY)'}</span>
                    </button>
                  </div>

                  <h4 className="font-extrabold text-white text-base">
                    {variant.name}
                  </h4>
                  <p className="text-xs text-purple-300 mt-0.5">
                    {variant.activeCabinets} / {variant.totalCabinets} Active Terminals • Ball Ceiling: <strong className="text-white">{variant.ballCeiling} Balls</strong>
                  </p>

                  {/* Roundtop Amount Box */}
                  <div className="mt-4 p-3.5 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-black text-amber-400 block">
                        Roundtop Prize Amount
                      </span>
                      <div className="text-2xl font-black text-amber-300 font-mono tabular-nums">
                        ₱{variant.roundtopAmount.toLocaleString()}
                      </div>
                    </div>

                    {/* Quick +/- ₱5,000 adjusters */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          store.updateEBGMachineVariant(selectedBranchId, variant.id, {
                            roundtopAmount: Math.max(5000, variant.roundtopAmount - 5000),
                          })
                        }
                        className="w-7 h-7 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-bold flex items-center justify-center text-xs"
                        title="Minus ₱5,000"
                      >
                        -5k
                      </button>
                      <button
                        onClick={() =>
                          store.updateEBGMachineVariant(selectedBranchId, variant.id, {
                            roundtopAmount: variant.roundtopAmount + 5000,
                          })
                        }
                        className="w-7 h-7 rounded-lg bg-purple-900 hover:bg-purple-800 text-white font-bold flex items-center justify-center text-xs"
                        title="Add ₱5,000"
                      >
                        +5k
                      </button>
                    </div>
                  </div>

                  {/* Progressive Pool row */}
                  <div className="mt-2 text-[11px] text-purple-300 flex items-center justify-between px-1">
                    <span>Progressive Jackpot Pool:</span>
                    <strong className="text-white font-mono">₱{variant.progressiveJackpot.toLocaleString()}</strong>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-purple-400">
                    Status: <strong className={variant.isEnabled ? 'text-emerald-400' : 'text-red-400'}>{variant.status}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => store.toggleEBGMachineVariant(selectedBranchId, variant.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        variant.isEnabled
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                          : 'bg-emerald-500 text-slate-950 font-black'
                      }`}
                    >
                      {variant.isEnabled ? 'Toggle OFF' : 'Toggle ON'}
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete EBG Variant "${variant.name}"?`)) {
                          store.deleteEBGMachineVariant(selectedBranchId, variant.id);
                        }
                      }}
                      className="p-1.5 text-purple-400 hover:text-red-400 transition-colors"
                      title="Delete Variant"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Activity & Revenue Logs + CSV Export */}
      {activeOpsTab === 'logs' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-800/60">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                <span>Player Activity & Revenue Audit Trail</span>
              </h3>
              <p className="text-xs text-purple-300">
                Synchronized historical logs for all 9 sites
              </p>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV Report</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-purple-300 font-bold block mb-1">Filter by Branch:</label>
              <select
                value={logFilterSite}
                onChange={(e) => setLogFilterSite(e.target.value)}
                className="w-full bg-[#130325] text-white border border-purple-700/60 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="ALL">All 9 BingoPlus Branches</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Filter by Action Type:</label>
              <select
                value={logFilterType}
                onChange={(e) => setLogFilterType(e.target.value)}
                className="w-full bg-[#130325] text-white border border-purple-700/60 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="ALL">All Actions</option>
                <option value="ATTENDANCE">Attendance Check-in</option>
                <option value="PURCHASE">Machine / Token Purchase</option>
                <option value="TOURNAMENT_WIN">Tournament Win Bonus</option>
                <option value="REWARD_REDEEM">Reward Redemption</option>
                <option value="REGISTRATION">New Registration</option>
              </select>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Search Player / Notes:</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full bg-[#130325] text-white pl-9 pr-3 py-2 rounded-xl border border-purple-700/60"
                />
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="overflow-x-auto rounded-xl border border-purple-800/60">
            <table className="w-full text-left text-xs text-purple-200">
              <thead className="bg-purple-950/80 text-[10px] uppercase font-bold text-purple-300 border-b border-purple-800/60">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Branch</th>
                  <th className="p-3">Player</th>
                  <th className="p-3">Action Type</th>
                  <th className="p-3 text-right">Points</th>
                  <th className="p-3 text-right">Amount (₱)</th>
                  <th className="p-3">Staff In-Charge</th>
                  <th className="p-3">Details / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/40">
                {displayedLogs.slice(0, 15).map((log) => (
                  <tr key={log.id} className="hover:bg-purple-900/30 transition-colors">
                    <td className="p-3 whitespace-nowrap font-mono text-[11px] text-purple-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="p-3 font-semibold text-white whitespace-nowrap">
                      {log.siteName.replace('BingoPlus ', '')}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold text-white">{log.userName}</div>
                      {log.userTier && <span className="text-[10px] text-purple-400">[{log.userTier}]</span>}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-900/60 text-amber-300 border border-purple-700/40">
                        {log.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap font-mono font-bold">
                      <span className={log.pointsDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {log.pointsDelta >= 0 ? `+${log.pointsDelta}` : log.pointsDelta}
                      </span>
                    </td>
                    <td className="p-3 text-right whitespace-nowrap font-mono font-semibold text-white">
                      {log.purchaseAmount ? `₱${log.purchaseAmount.toLocaleString()}` : '—'}
                    </td>
                    <td className="p-3 whitespace-nowrap text-purple-300">
                      {log.staffName || 'System'}
                    </td>
                    <td className="p-3 text-[11px] text-purple-300 max-w-xs truncate">
                      {log.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Site Machine Roundtop & Jackpots Live Editor */}
      {activeOpsTab === 'site_editor' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Live Jackpots & Roundtop Machine Control ({currentBranch.name})</span>
              </h3>
              <p className="text-xs text-purple-300">
                Updates made here are pushed immediately in real-time to all player apps and hall displays.
              </p>
            </div>

            <button
              onClick={handleSaveSiteDetails}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg"
            >
              Push Updates Live
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mega Jackpot Input */}
            <div className="p-4 rounded-xl bg-purple-950/70 border border-purple-800/60 space-y-1.5">
              <label className="text-xs uppercase font-extrabold text-amber-300 block">
                Mega Jackpot (₱)
              </label>
              <input
                type="number"
                value={editMega}
                onChange={(e) => setEditMega(Number(e.target.value))}
                className="w-full bg-[#130325] text-white text-lg font-mono font-black rounded-lg px-3 py-2 border border-purple-700/60"
              />
              <span className="text-[10px] text-purple-400">Current pool displayed on player app</span>
            </div>

            {/* Grand Jackpot Input */}
            <div className="p-4 rounded-xl bg-purple-950/70 border border-purple-800/60 space-y-1.5">
              <label className="text-xs uppercase font-extrabold text-purple-200 block">
                Grand Jackpot (₱)
              </label>
              <input
                type="number"
                value={editGrand}
                onChange={(e) => setEditGrand(Number(e.target.value))}
                className="w-full bg-[#130325] text-white text-lg font-mono font-black rounded-lg px-3 py-2 border border-purple-700/60"
              />
              <span className="text-[10px] text-purple-400">Daily seeded pot</span>
            </div>

            {/* Major Pot Input */}
            <div className="p-4 rounded-xl bg-purple-950/70 border border-purple-800/60 space-y-1.5">
              <label className="text-xs uppercase font-extrabold text-cyan-300 block">
                Major Round Pot (₱)
              </label>
              <input
                type="number"
                value={editMajor}
                onChange={(e) => setEditMajor(Number(e.target.value))}
                className="w-full bg-[#130325] text-white text-lg font-mono font-black rounded-lg px-3 py-2 border border-purple-700/60"
              />
              <span className="text-[10px] text-purple-400">Session bracket jackpot</span>
            </div>
          </div>

          {/* Machine Roundtop Parameters */}
          <div className="p-5 rounded-xl bg-purple-950/50 border border-purple-800/60 space-y-4">
            <h4 className="text-xs uppercase font-extrabold text-white">
              Bingo Machine Roundtop Configuration
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-purple-300 font-bold block mb-1">Current Round #</label>
                <input
                  type="number"
                  value={editRoundNum}
                  onChange={(e) => setEditRoundNum(Number(e.target.value))}
                  className="w-full bg-[#130325] text-white font-mono font-bold rounded-lg px-3 py-2 border border-purple-700/60"
                />
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Balls Drawn So Far</label>
                <input
                  type="number"
                  value={editBallsDrawn}
                  onChange={(e) => setEditBallsDrawn(Number(e.target.value))}
                  className="w-full bg-[#130325] text-white font-mono font-bold rounded-lg px-3 py-2 border border-purple-700/60"
                />
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Target Ball Ceiling</label>
                <input
                  type="number"
                  value={editTargetBalls}
                  onChange={(e) => setEditTargetBalls(Number(e.target.value))}
                  className="w-full bg-[#130325] text-white font-mono font-bold rounded-lg px-3 py-2 border border-purple-700/60"
                />
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Machine Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-[#130325] text-white font-bold rounded-lg px-3 py-2 border border-purple-700/60"
                >
                  <option value="BALL_DRAW_ACTIVE">Ball Draw Active</option>
                  <option value="ROUNDTOP_ALERT">Roundtop Alert (Few Balls Left)</option>
                  <option value="WON">Won / Winner Declared</option>
                  <option value="INTERMISSION">Intermission / Next Round</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1 text-xs">
                Active Branch Announcement Banner:
              </label>
              <input
                type="text"
                value={editAnnouncement}
                onChange={(e) => setEditAnnouncement(e.target.value)}
                className="w-full bg-[#130325] text-white text-xs rounded-xl px-4 py-2.5 border border-purple-700/60"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Retail Inventory & Points Mechanics Engine (Branch Manager to Superuser Access) */}
      {activeOpsTab === 'inventory' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl space-y-5">
          {/* Header & Access Permission Notice */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-purple-800/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-600 text-white">
                  BRANCH MANAGER TO SUPERUSER ENGINE
                </span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    isManagerOrAbove
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  }`}
                >
                  {isManagerOrAbove ? 'Full Edit & Toggle Authorized' : 'Staff Level: Read-Only Audit'}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1 flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <span>Retail Inventory Tracker & Catalogue Management</span>
              </h3>
              <p className="text-xs text-purple-200/80">
                Configure redeemable items, edit points needed, adjust branch stock, and manage points mechanics rules.
              </p>
            </div>

            {/* Sub-tab Navigation: Retail Items vs Points Mechanics */}
            <div className="flex items-center gap-1.5 bg-[#140327] p-1.5 rounded-xl border border-purple-800/60 shrink-0">
              <button
                onClick={() => setInventorySubTab('items')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  inventorySubTab === 'items'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <Package className="w-3.5 h-3.5 text-amber-400" />
                <span>Catalogue Items ({rewards.length})</span>
              </button>
              <button
                onClick={() => setInventorySubTab('mechanics')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  inventorySubTab === 'mechanics'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/40'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Points Mechanics ({mechanics.length})</span>
              </button>
            </div>
          </div>

          {/* Access Banner if Staff only */}
          {!isManagerOrAbove && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/50 flex items-center gap-2 text-xs text-amber-200">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Manager Access Required:</strong> You are viewing with Staff privileges. Toggling redeemable status, adding/editing items, changing points needed, and modifying catalogue mechanics require Branch Manager, Admin, or Superuser role.
              </span>
            </div>
          )}

          {/* SUB-TAB 1: Retail & Catalogue Items */}
          {inventorySubTab === 'items' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-purple-300">
                  Managing stock & redeemability for: <strong className="text-amber-300">{currentBranch.name}</strong>
                </div>

                {isManagerOrAbove && (
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/40 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Catalogue Item</span>
                  </button>
                )}
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => {
                  const currentStock = reward.stockPerSite[selectedBranchId] ?? 0;
                  const isRedeemable = reward.isRedeemable !== false;

                  return (
                    <div
                      key={reward.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isRedeemable
                          ? 'bg-purple-950/60 border-purple-700/60 shadow-lg'
                          : 'bg-[#150424]/80 border-purple-900/40 opacity-75'
                      }`}
                    >
                      <div>
                        {/* Top Bar: Category, Min Tier & Toggle Redeemable */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-900 text-amber-300 border border-purple-700/50">
                              {reward.category}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#130325] text-purple-300 border border-purple-800/60">
                              Min: {reward.minTier}
                            </span>
                          </div>

                          {/* Toggle Redeemable ON / OFF Button */}
                          <button
                            onClick={() => {
                              if (isManagerOrAbove) {
                                store.toggleRewardItemRedeemable(reward.id);
                              } else {
                                alert('Branch Manager Level to Superuser permission required to toggle item redeemable.');
                              }
                            }}
                            className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border transition-all ${
                              isRedeemable
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                                : 'bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30'
                            }`}
                            title={isManagerOrAbove ? 'Click to toggle item redeemable ON/OFF' : 'Manager access required'}
                          >
                            <Power className="w-3 h-3" />
                            <span>{isRedeemable ? 'Redeemable: ON' : 'Redeemable: OFF (Paused)'}</span>
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-extrabold text-white text-base leading-snug">
                          {reward.title}
                        </h4>
                        <p className="text-xs text-purple-300/80 mt-1 line-clamp-2">
                          {reward.description}
                        </p>

                        <div className="text-[11px] text-purple-400 mt-1">
                          Est. Retail Value: <strong className="text-white font-mono">₱{reward.estimatedPhpValue.toLocaleString()}</strong>
                        </div>

                        {/* Points Needed Box & Quick Points Adjuster */}
                        <div className="mt-3 p-3 rounded-xl bg-[#140326] border border-purple-800/60 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-purple-400 block">
                              Points Needed to Redeem
                            </span>
                            <div className="text-xl font-black text-amber-400 font-mono tabular-nums">
                              {reward.pointsCost.toLocaleString()} <span className="text-xs text-amber-300 font-bold">PTS</span>
                            </div>
                          </div>

                          {isManagerOrAbove && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  store.updateRewardItem(reward.id, {
                                    pointsCost: Math.max(10, reward.pointsCost - 50),
                                  })
                                }
                                className="px-2 py-1 bg-purple-900 hover:bg-purple-800 text-white rounded text-[10px] font-bold"
                                title="Minus 50 pts"
                              >
                                -50
                              </button>
                              <button
                                onClick={() =>
                                  store.updateRewardItem(reward.id, {
                                    pointsCost: reward.pointsCost + 50,
                                  })
                                }
                                className="px-2 py-1 bg-purple-900 hover:bg-purple-800 text-white rounded text-[10px] font-bold"
                                title="Add 50 pts"
                              >
                                +50
                              </button>
                              <button
                                onClick={() =>
                                  store.updateRewardItem(reward.id, {
                                    pointsCost: reward.pointsCost + 200,
                                  })
                                }
                                className="px-2 py-1 bg-purple-900 hover:bg-purple-800 text-white rounded text-[10px] font-bold"
                                title="Add 200 pts"
                              >
                                +200
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stock Adjuster & Action Controls Footer */}
                      <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between gap-2">
                        {/* Stock Controls */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-purple-400 mr-1">
                            Stock:
                          </span>
                          <button
                            onClick={() =>
                              store.updateItemStock(reward.id, selectedBranchId, Math.max(0, currentStock - 1))
                            }
                            className="w-6 h-6 rounded bg-purple-900 hover:bg-purple-800 text-white font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono font-black text-xs text-amber-300 w-7 text-center">
                            {currentStock}
                          </span>
                          <button
                            onClick={() =>
                              store.updateItemStock(reward.id, selectedBranchId, currentStock + 1)
                            }
                            className="w-6 h-6 rounded bg-purple-900 hover:bg-purple-800 text-white font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                          <button
                            onClick={() =>
                              store.updateItemStock(reward.id, selectedBranchId, currentStock + 10)
                            }
                            className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold"
                          >
                            +10
                          </button>
                        </div>

                        {/* Edit & Delete Action Buttons (Branch Manager to Superuser) */}
                        {isManagerOrAbove && (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingItem(reward);
                                setEditItemTitle(reward.title);
                                setEditItemCategory(reward.category);
                                setEditItemPointsCost(reward.pointsCost);
                                setEditItemPhpValue(reward.estimatedPhpValue);
                                setEditItemDescription(reward.description);
                                setEditItemMinTier(reward.minTier);
                                setEditItemIsRedeemable(reward.isRedeemable !== false);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1 border border-purple-700/50"
                            >
                              <Edit3 className="w-3 h-3 text-amber-400" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete item "${reward.title}" from catalogue?`)) {
                                  store.deleteRewardItem(reward.id);
                                }
                              }}
                              className="p-1.5 text-purple-400 hover:text-red-400 transition-colors"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: Points Mechanics & Catalogue Rules Engine */}
          {inventorySubTab === 'mechanics' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'ALL', label: 'All Mechanics' },
                    { id: 'POINTS_EARNING', label: 'Points Earning' },
                    { id: 'CATALOGUE_RULE', label: 'Redemption Rules' },
                    { id: 'PROMO_MULTIPLIER', label: 'Promo Multipliers' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setMechanicCategoryFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        mechanicCategoryFilter === filter.id
                          ? 'bg-amber-400 text-slate-950 font-black shadow'
                          : 'bg-purple-950/70 text-purple-300 hover:bg-purple-900/60 hover:text-white'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                {isManagerOrAbove && (
                  <button
                    onClick={() => setShowAddMechanicModal(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-950/40 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Point Mechanic</span>
                  </button>
                )}
              </div>

              {/* Mechanics List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mechanics
                  .filter((m) =>
                    mechanicCategoryFilter === 'ALL' ? true : m.category === mechanicCategoryFilter
                  )
                  .map((mech) => {
                    const targetSite = sites.find((s) => s.id === mech.applicableSiteId);
                    const siteLabel = mech.applicableSiteId === 'ALL' ? 'All 9 Branches' : targetSite?.name || mech.applicableSiteId;

                    return (
                      <div
                        key={mech.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          mech.isEnabled
                            ? 'bg-purple-950/60 border-purple-700/60 shadow-lg'
                            : 'bg-[#150424]/80 border-purple-900/40 opacity-70'
                        }`}
                      >
                        <div>
                          {/* Top Row: Category, Site & Toggle ON/OFF */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-900 text-amber-300 border border-purple-700/50">
                                {mech.category.replace('_', ' ')}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#130325] text-purple-300 border border-purple-800/60">
                                {siteLabel}
                              </span>
                            </div>

                            {/* Toggle ON/OFF Button */}
                            <button
                              onClick={() => {
                                if (isManagerOrAbove) {
                                  store.toggleMechanic(mech.id);
                                } else {
                                  alert('Branch Manager Level to Superuser permission required to toggle mechanics.');
                                }
                              }}
                              className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1 border transition-all ${
                                mech.isEnabled
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                                  : 'bg-red-500/20 text-red-300 border-red-500/50 hover:bg-red-500/30'
                              }`}
                              title={isManagerOrAbove ? 'Toggle Mechanic ON/OFF' : 'Manager access required'}
                            >
                              <Power className="w-3 h-3" />
                              <span>{mech.isEnabled ? 'ON (ACTIVE)' : 'OFF (DISABLED)'}</span>
                            </button>
                          </div>

                          <h4 className="font-extrabold text-white text-base leading-snug">
                            {mech.title}
                          </h4>
                          <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
                            {mech.description}
                          </p>

                          {mech.conditions && (
                            <div className="mt-2 text-[11px] text-amber-300/90 font-medium">
                              • Rule condition: {mech.conditions}
                            </div>
                          )}

                          {/* Metric Box */}
                          <div className="mt-3 p-3 rounded-xl bg-[#140326] border border-purple-800/60 flex items-center justify-between gap-2">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-purple-400 block">
                                {mech.category === 'PROMO_MULTIPLIER'
                                  ? 'Multiplier Rate'
                                  : mech.category === 'CATALOGUE_RULE'
                                  ? 'Redemption Policy'
                                  : 'Points Value'}
                              </span>
                              <div className="text-lg font-black text-amber-400 font-mono">
                                {mech.category === 'PROMO_MULTIPLIER'
                                  ? `${mech.pointsValue}x Points Multiplier`
                                  : mech.category === 'CATALOGUE_RULE'
                                  ? 'Enforced on Counter Scan'
                                  : `+${mech.pointsValue} PTS`}
                              </div>
                            </div>

                            {mech.spendRatePhp ? (
                              <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-purple-400 block">
                                  Spend Base
                                </span>
                                <div className="text-xs font-bold text-white font-mono">
                                  ₱{mech.spendRatePhp} Spend
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* Edit & Delete Action Footer */}
                        {isManagerOrAbove && (
                          <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between text-xs">
                            <span className="text-[10px] text-purple-400">
                              Configured by: <strong className="text-purple-300">{mech.updatedBy || 'SUPERUSER'}</strong>
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingMechanic(mech);
                                  setEditMechTitle(mech.title);
                                  setEditMechCategory(mech.category);
                                  setEditMechPoints(mech.pointsValue);
                                  setEditMechSpendRate(mech.spendRatePhp || 0);
                                  setEditMechDesc(mech.description);
                                  setEditMechConditions(mech.conditions || '');
                                  setEditMechSite(mech.applicableSiteId);
                                  setEditMechIsEnabled(mech.isEnabled);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1 border border-purple-700/50"
                              >
                                <Edit3 className="w-3 h-3 text-amber-400" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete mechanic "${mech.title}"?`)) {
                                    store.deleteMechanic(mech.id);
                                  }
                                }}
                                className="p-1.5 text-purple-400 hover:text-red-400 transition-colors"
                                title="Delete Mechanic"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Member Accounts Management */}
      {activeOpsTab === 'members' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Player Accounts & Membership Management</span>
              </h3>
              <p className="text-xs text-purple-300">
                Directory of registered players across all branches
              </p>
            </div>
            <span className="text-xs text-purple-400 font-mono">
              Total: {users.length} accounts
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-purple-800/60">
            <table className="w-full text-left text-xs text-purple-200">
              <thead className="bg-purple-950/80 text-[10px] uppercase font-bold text-purple-300 border-b border-purple-800/60">
                <tr>
                  <th className="p-3">Member Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Registered Branch</th>
                  <th className="p-3">Tier</th>
                  <th className="p-3 text-right">Points Balance</th>
                  <th className="p-3 text-right">Total Spend</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/40">
                {users.map((u) => {
                  const site = sites.find((s) => s.id === u.registeredSiteId);
                  return (
                    <tr key={u.id} className="hover:bg-purple-900/30">
                      <td className="p-3">
                        <div className="font-bold text-white">{u.fullName}</div>
                        <div className="text-[10px] text-purple-400">@{u.username} • {u.phone}</div>
                      </td>
                      <td className="p-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-700/50">
                          {u.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-white">
                        {site?.name.replace('BingoPlus ', '')}
                      </td>
                      <td className="p-3 font-bold text-amber-300">
                        {u.tier}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-amber-400">
                        {u.pointsBalance.toLocaleString()}
                      </td>
                      <td className="p-3 text-right font-mono font-semibold text-white">
                        ₱{u.totalSpend.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            u.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setScannedPlayer(u);
                            setActiveOpsTab('scanner');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px]"
                        >
                          Scan / Add Pts
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: Tiered Reward Levels */}
      {activeOpsTab === 'tiers' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-purple-800/60">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Tiered Membership Levels & Spend Multipliers</span>
              </h3>
              <p className="text-xs text-purple-300">
                Automated progression thresholds based on player machine spend
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tierConfigs.map((tier) => (
              <div
                key={tier.id}
                className="p-5 rounded-2xl bg-purple-950/60 border border-purple-700/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-white text-base">{tier.name}</h4>
                  <span className="text-xs font-black text-amber-300 font-mono">
                    {tier.pointMultiplier}x Multiplier
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#140326] border border-purple-800/60 space-y-1 text-xs">
                  <div className="text-purple-300 flex items-center justify-between">
                    <span>Minimum Spending:</span>
                    <strong className="text-white font-mono">₱{tier.minSpend.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-purple-400 block">
                    Exclusive Perks:
                  </span>
                  <ul className="space-y-1 text-[11px] text-purple-200">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: Broadcast Push Notification Composer */}
      {activeOpsTab === 'broadcast' && (
        <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-6 shadow-xl space-y-4 max-w-2xl">
          <div className="pb-3 border-b border-purple-800/60">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-amber-400" />
              <span>Broadcast Real-time Push Notification</span>
            </h3>
            <p className="text-xs text-purple-300">
              Instantly sends announcement popups and inbox alerts to registered branch members.
            </p>
          </div>

          <form onSubmit={handleBroadcastNotification} className="space-y-4 text-xs">
            <div>
              <label className="text-purple-300 font-bold block mb-1">Target Audience / Branch:</label>
              <select
                value={notifTargetSite}
                onChange={(e) => setNotifTargetSite(e.target.value)}
                className="w-full bg-[#130325] text-white border border-purple-700/60 rounded-xl px-3 py-2 font-semibold"
              >
                <option value="ALL">All 9 BingoPlus Branches (Network-wide)</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} Only
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Category:</label>
              <div className="flex items-center gap-2">
                {(['PROMO', 'JACKPOT', 'EVENT', 'SYSTEM'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNotifCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      notifCategory === cat
                        ? 'bg-amber-400 text-slate-950 font-black'
                        : 'bg-purple-950/70 text-purple-300 border border-purple-800/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Notification Title:</label>
              <input
                type="text"
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="e.g. 🔥 Flash Promo: 2x Points this Saturday!"
                className="w-full bg-[#130325] text-white rounded-xl px-4 py-2.5 border border-purple-700/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-purple-300 font-bold block mb-1">Message Body:</label>
              <textarea
                rows={3}
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                placeholder="Enter details of promotional event, prize pool, or machine updates..."
                className="w-full bg-[#130325] text-white rounded-xl px-4 py-2.5 border border-purple-700/60 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!notifTitle.trim() || !notifBody.trim()}
              className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg ${
                notifTitle.trim() && notifBody.trim()
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                  : 'bg-purple-950/60 text-purple-500 cursor-not-allowed'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Broadcast Push Notification Now</span>
            </button>
          </form>
        </div>
      )}

      {/* MODAL: Add Traditional Bingo Jackpot Bracket */}
      {showAddTradModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1d0a33] border border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Add Traditional Jackpot Ball Bracket</span>
              </h4>
              <button
                onClick={() => setShowAddTradModal(false)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.addTraditionalJackpot(selectedBranchId, {
                  gamePattern: newTradPattern.trim(),
                  minBalls: Number(newTradMinBalls),
                  maxBalls: Number(newTradMaxBalls),
                  prizeAmount: Number(newTradPrize),
                  consolationPrize: Number(newTradConsolation),
                  notes: newTradNotes.trim(),
                  isActive: true,
                });
                setShowAddTradModal(false);
                setScannerFeedback({
                  type: 'success',
                  message: `Added new ball bracket (${newTradMinBalls}-${newTradMaxBalls} balls) for ${currentBranch.name}!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-purple-300 font-bold block mb-1">Game Pattern Name:</label>
                <input
                  type="text"
                  value={newTradPattern}
                  onChange={(e) => setNewTradPattern(e.target.value)}
                  placeholder="e.g. Grand Coverall / Blackout or Four Corners"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Min Ball Call:</label>
                  <input
                    type="number"
                    min="1"
                    max="75"
                    value={newTradMinBalls}
                    onChange={(e) => setNewTradMinBalls(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Max Ball Call:</label>
                  <input
                    type="number"
                    min="1"
                    max="75"
                    value={newTradMaxBalls}
                    onChange={(e) => setNewTradMaxBalls(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-300 font-bold block mb-1">Jackpot Prize (₱):</label>
                  <input
                    type="number"
                    step="5000"
                    value={newTradPrize}
                    onChange={(e) => setNewTradPrize(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Consolation Prize (₱):</label>
                  <input
                    type="number"
                    step="1000"
                    value={newTradConsolation}
                    onChange={(e) => setNewTradConsolation(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Rule / Qualification Notes:</label>
                <input
                  type="text"
                  value={newTradNotes}
                  onChange={(e) => setNewTradNotes(e.target.value)}
                  placeholder="e.g. Valid on all card purchases during 3PM session"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTradModal(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black"
                >
                  Add Ball Bracket Prize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add EBG Machine Variant */}
      {showAddEbgModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1d0a33] border border-purple-500/70 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span>Add EBG Machine Variant</span>
              </h4>
              <button
                onClick={() => setShowAddEbgModal(false)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.addEBGMachineVariant(selectedBranchId, {
                  name: newEbgName.trim(),
                  code: newEbgCode.trim(),
                  type: newEbgType,
                  roundtopAmount: Number(newEbgRoundtop),
                  progressiveJackpot: Number(newEbgProgressive),
                  ballCeiling: Number(newEbgBallCeiling),
                  currentBallsDrawn: 0,
                  activeCabinets: Number(newEbgCabinets),
                  totalCabinets: Number(newEbgCabinets),
                  isEnabled: true,
                  status: 'ACTIVE',
                });
                setShowAddEbgModal(false);
                setScannerFeedback({
                  type: 'success',
                  message: `Added machine variant "${newEbgName}" (Roundtop: ₱${newEbgRoundtop.toLocaleString()}) to ${currentBranch.name}!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Variant Name:</label>
                  <input
                    type="text"
                    value={newEbgName}
                    onChange={(e) => setNewEbgName(e.target.value)}
                    placeholder="e.g. Dragon Fortune Link"
                    className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Variant Code:</label>
                  <input
                    type="text"
                    value={newEbgCode}
                    onChange={(e) => setNewEbgCode(e.target.value)}
                    placeholder="e.g. DFL-01"
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Machine Type Category:</label>
                <select
                  value={newEbgType}
                  onChange={(e) => setNewEbgType(e.target.value as any)}
                  className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                >
                  <option value="COMMUNITY_LINK">Community Link (Shared Roundtop)</option>
                  <option value="CLASSIC_EBG">Classic EBG Terminal</option>
                  <option value="PROGRESSIVE">Progressive Mystery Jackpot</option>
                  <option value="MULTI_CARD">Multi-Card Electronic Bingo</option>
                  <option value="STANDALONE">Standalone EBG Station</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">Roundtop Amount (₱):</label>
                  <input
                    type="number"
                    step="5000"
                    value={newEbgRoundtop}
                    onChange={(e) => setNewEbgRoundtop(Number(e.target.value))}
                    className="w-full bg-[#120323] text-amber-300 font-mono font-black px-3 py-2 rounded-xl border border-amber-500/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Progressive Jackpot (₱):</label>
                  <input
                    type="number"
                    step="10000"
                    value={newEbgProgressive}
                    onChange={(e) => setNewEbgProgressive(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Ball Ceiling Trigger:</label>
                  <input
                    type="number"
                    min="30"
                    max="60"
                    value={newEbgBallCeiling}
                    onChange={(e) => setNewEbgBallCeiling(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Terminal/Cabinet Count:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newEbgCabinets}
                    onChange={(e) => setNewEbgCabinets(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEbgModal(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black"
                >
                  Add Machine Variant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Retail Item (Branch Manager to Superuser) */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#1d0a33] border border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <span>Add Retail / Catalogue Item</span>
              </h4>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.addRewardItem({
                  title: newItemTitle.trim(),
                  category: newItemCategory,
                  pointsCost: Number(newItemPointsCost),
                  estimatedPhpValue: Number(newItemPhpValue),
                  description: newItemDescription.trim(),
                  minTier: newItemMinTier,
                  iconName: newItemIcon,
                  stockPerSite: {
                    [selectedBranchId]: Number(newItemInitialStock),
                  },
                  isRedeemable: newItemIsRedeemable,
                });
                setShowAddItemModal(false);
                setNewItemTitle('');
                setNewItemDescription('');
                setScannerFeedback({
                  type: 'success',
                  message: `Successfully added "${newItemTitle}" to reward catalogue!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-purple-300 font-bold block mb-1">Item Title:</label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="e.g. Sony Wireless Noise-Cancelling Headphones"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Category:</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="VOUCHER">Gaming Credits (Voucher)</option>
                    <option value="GROCERY">Groceries & Food</option>
                    <option value="ELECTRONICS">Tech & Electronics</option>
                    <option value="APPLIANCE">Home Appliance</option>
                    <option value="MERCHANDISE">Merchandise & VIP</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Minimum Member Tier:</label>
                  <select
                    value={newItemMinTier}
                    onChange={(e) => setNewItemMinTier(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="BRONZE">Bronze (All Members)</option>
                    <option value="SILVER">Silver Tier & Up</option>
                    <option value="GOLD">Gold Tier & Up</option>
                    <option value="PLATINUM">Platinum Tier & Up</option>
                    <option value="DIAMOND_VIP">Diamond VIP Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">Points Needed to Redeem:</label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={newItemPointsCost}
                    onChange={(e) => setNewItemPointsCost(Number(e.target.value))}
                    className="w-full bg-[#120323] text-amber-300 font-mono font-black px-3 py-2 rounded-xl border border-amber-500/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Estimated Retail Value (₱):</label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={newItemPhpValue}
                    onChange={(e) => setNewItemPhpValue(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Initial Stock ({currentBranch.name}):</label>
                  <input
                    type="number"
                    min="0"
                    value={newItemInitialStock}
                    onChange={(e) => setNewItemInitialStock(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Redeemable Status:</label>
                  <button
                    type="button"
                    onClick={() => setNewItemIsRedeemable(!newItemIsRedeemable)}
                    className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                      newItemIsRedeemable
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                        : 'bg-red-500/20 text-red-300 border-red-500/50'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{newItemIsRedeemable ? 'Active (Redeemable)' : 'Paused (Disabled)'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Item Description & Specifications:</label>
                <textarea
                  rows={2}
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Provide product specs, warranty details, or redemption instructions..."
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg"
                >
                  Add Item to Catalogue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Retail Item (Branch Manager to Superuser) */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#1d0a33] border border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>Edit Retail Item & Points Needed</span>
              </h4>
              <button
                onClick={() => setEditingItem(null)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.updateRewardItem(editingItem.id, {
                  title: editItemTitle.trim(),
                  category: editItemCategory,
                  pointsCost: Number(editItemPointsCost),
                  estimatedPhpValue: Number(editItemPhpValue),
                  description: editItemDescription.trim(),
                  minTier: editItemMinTier,
                  isRedeemable: editItemIsRedeemable,
                });
                setEditingItem(null);
                setScannerFeedback({
                  type: 'success',
                  message: `Updated item "${editItemTitle}" (Points needed: ${editItemPointsCost.toLocaleString()} PTS)!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-purple-300 font-bold block mb-1">Item Title:</label>
                <input
                  type="text"
                  value={editItemTitle}
                  onChange={(e) => setEditItemTitle(e.target.value)}
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Category:</label>
                  <select
                    value={editItemCategory}
                    onChange={(e) => setEditItemCategory(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="VOUCHER">Gaming Credits (Voucher)</option>
                    <option value="GROCERY">Groceries & Food</option>
                    <option value="ELECTRONICS">Tech & Electronics</option>
                    <option value="APPLIANCE">Home Appliance</option>
                    <option value="MERCHANDISE">Merchandise & VIP</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Minimum Member Tier:</label>
                  <select
                    value={editItemMinTier}
                    onChange={(e) => setEditItemMinTier(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="BRONZE">Bronze (All Members)</option>
                    <option value="SILVER">Silver Tier & Up</option>
                    <option value="GOLD">Gold Tier & Up</option>
                    <option value="PLATINUM">Platinum Tier & Up</option>
                    <option value="DIAMOND_VIP">Diamond VIP Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">Points Needed to Redeem:</label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={editItemPointsCost}
                    onChange={(e) => setEditItemPointsCost(Number(e.target.value))}
                    className="w-full bg-[#120323] text-amber-300 font-mono font-black px-3 py-2 rounded-xl border border-amber-500/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Estimated Retail Value (₱):</label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={editItemPhpValue}
                    onChange={(e) => setNewItemPhpValue(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Redeemable Status Toggle:</label>
                <button
                  type="button"
                  onClick={() => setEditItemIsRedeemable(!editItemIsRedeemable)}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    editItemIsRedeemable
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-red-500/20 text-red-300 border-red-500/50'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{editItemIsRedeemable ? 'Active (Redeemable by Players)' : 'Paused (Disabled / Unavailable)'}</span>
                </button>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Item Description & Specifications:</label>
                <textarea
                  rows={2}
                  value={editItemDescription}
                  onChange={(e) => setEditItemDescription(e.target.value)}
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg"
                >
                  Save Item Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Point Mechanic (Branch Manager to Superuser) */}
      {showAddMechanicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#1d0a33] border border-purple-500/60 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>Add Points / Catalogue Mechanic</span>
              </h4>
              <button
                onClick={() => setShowAddMechanicModal(false)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.addMechanic({
                  title: newMechTitle.trim(),
                  category: newMechCategory,
                  pointsValue: Number(newMechPoints),
                  spendRatePhp: Number(newMechSpendRate),
                  description: newMechDesc.trim(),
                  conditions: newMechConditions.trim(),
                  applicableSiteId: newMechSite,
                  isEnabled: newMechIsEnabled,
                  updatedBy: currentUser?.role || 'SUPERUSER',
                });
                setShowAddMechanicModal(false);
                setNewMechTitle('');
                setNewMechDesc('');
                setNewMechConditions('');
                setScannerFeedback({
                  type: 'success',
                  message: `Added point mechanic "${newMechTitle}"!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-purple-300 font-bold block mb-1">Mechanic Title:</label>
                <input
                  type="text"
                  value={newMechTitle}
                  onChange={(e) => setNewMechTitle(e.target.value)}
                  placeholder="e.g. VIP Birthday Month 3x Multiplier"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Category:</label>
                  <select
                    value={newMechCategory}
                    onChange={(e) => setNewMechCategory(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="POINTS_EARNING">Points Earning (Attendance/Spend)</option>
                    <option value="CATALOGUE_RULE">Catalogue Redemption Rule / Policy</option>
                    <option value="PROMO_MULTIPLIER">Promo Multiplier (2x/3x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Applicable Branch:</label>
                  <select
                    value={newMechSite}
                    onChange={(e) => setNewMechSite(e.target.value)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="ALL">All 9 BingoPlus Branches</option>
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} Only
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">
                    {newMechCategory === 'PROMO_MULTIPLIER' ? 'Multiplier (e.g. 2 for 2x)' : 'Points Awarded / Value:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={newMechPoints}
                    onChange={(e) => setNewMechPoints(Number(e.target.value))}
                    className="w-full bg-[#120323] text-amber-300 font-mono font-black px-3 py-2 rounded-xl border border-amber-500/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Spend Base (₱ Required):</label>
                  <input
                    type="number"
                    min="0"
                    value={newMechSpendRate}
                    onChange={(e) => setNewMechSpendRate(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={newMechDesc}
                  onChange={(e) => setNewMechDesc(e.target.value)}
                  placeholder="Explain how this mechanic works for players and staff..."
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Conditions / Constraints:</label>
                <input
                  type="text"
                  value={newMechConditions}
                  onChange={(e) => setNewMechConditions(e.target.value)}
                  placeholder="e.g. Once per calendar day, or requires valid ID"
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMechanicModal(false)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg"
                >
                  Add Mechanic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Edit Point Mechanic (Branch Manager to Superuser) */}
      {editingMechanic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#1d0a33] border border-purple-500/60 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>Edit Point Mechanic / Policy</span>
              </h4>
              <button
                onClick={() => setEditingMechanic(null)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                store.updateMechanic(editingMechanic.id, {
                  title: editMechTitle.trim(),
                  category: editMechCategory,
                  pointsValue: Number(editMechPoints),
                  spendRatePhp: Number(editMechSpendRate),
                  description: editMechDesc.trim(),
                  conditions: editMechConditions.trim(),
                  applicableSiteId: editMechSite,
                  isEnabled: editMechIsEnabled,
                  updatedBy: currentUser?.role || 'BRANCH_MANAGER',
                });
                setEditingMechanic(null);
                setScannerFeedback({
                  type: 'success',
                  message: `Updated mechanic "${editMechTitle}"!`,
                });
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="text-purple-300 font-bold block mb-1">Mechanic Title:</label>
                <input
                  type="text"
                  value={editMechTitle}
                  onChange={(e) => setEditMechTitle(e.target.value)}
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Category:</label>
                  <select
                    value={editMechCategory}
                    onChange={(e) => setEditMechCategory(e.target.value as any)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="POINTS_EARNING">Points Earning (Attendance/Spend)</option>
                    <option value="CATALOGUE_RULE">Catalogue Redemption Rule / Policy</option>
                    <option value="PROMO_MULTIPLIER">Promo Multiplier (2x/3x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Applicable Branch:</label>
                  <select
                    value={editMechSite}
                    onChange={(e) => setEditMechSite(e.target.value)}
                    className="w-full bg-[#120323] text-white font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  >
                    <option value="ALL">All 9 BingoPlus Branches</option>
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} Only
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-amber-400 font-bold block mb-1">
                    {editMechCategory === 'PROMO_MULTIPLIER' ? 'Multiplier (e.g. 2 for 2x)' : 'Points Value:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editMechPoints}
                    onChange={(e) => setEditMechPoints(Number(e.target.value))}
                    className="w-full bg-[#120323] text-amber-300 font-mono font-black px-3 py-2 rounded-xl border border-amber-500/60 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-purple-300 font-bold block mb-1">Spend Base (₱ Required):</label>
                  <input
                    type="number"
                    min="0"
                    value={editMechSpendRate}
                    onChange={(e) => setEditMechSpendRate(Number(e.target.value))}
                    className="w-full bg-[#120323] text-white font-mono font-bold px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Mechanic Status Toggle:</label>
                <button
                  type="button"
                  onClick={() => setEditMechIsEnabled(!editMechIsEnabled)}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    editMechIsEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-red-500/20 text-red-300 border-red-500/50'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{editMechIsEnabled ? 'Active (Mechanic Enforced)' : 'Paused (Mechanic Disabled)'}</span>
                </button>
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Description:</label>
                <textarea
                  rows={2}
                  value={editMechDesc}
                  onChange={(e) => setEditMechDesc(e.target.value)}
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-purple-300 font-bold block mb-1">Conditions / Constraints:</label>
                <input
                  type="text"
                  value={editMechConditions}
                  onChange={(e) => setEditMechConditions(e.target.value)}
                  className="w-full bg-[#120323] text-white px-3 py-2 rounded-xl border border-purple-700/60 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMechanic(null)}
                  className="px-4 py-2 rounded-xl bg-purple-950 text-purple-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg"
                >
                  Save Mechanic Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
