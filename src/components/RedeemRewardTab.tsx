import React, { useState } from 'react';
import {
  Coins,
  Gift,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Building2,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Shirt,
  Flame,
  BatteryCharging,
  Tablet,
  Tv,
  ArrowRight,
  Sliders,
  BookOpen,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBingoPlus } from '../hooks/useBingoPlus';
import { RedemptionVoucher, RewardItem } from '../types/bingoplus';
import { QRCodeDisplay } from './QRCodeDisplay';

interface RedeemRewardTabProps {
  onOpenQR: () => void;
}

export const RedeemRewardTab: React.FC<RedeemRewardTabProps> = () => {
  const { rewards, sites, currentUser, store, vouchers, mechanics } = useBingoPlus();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [targetSiteId, setTargetSiteId] = useState<string>(
    currentUser?.registeredSiteId || 'sm-lipa'
  );
  const [selectedReward, setSelectedReward] = useState<RewardItem | null>(null);
  const [activeVoucherModal, setActiveVoucherModal] = useState<RedemptionVoucher | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'mechanics' | 'my_vouchers'>('catalog');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedSite = sites.find((s) => s.id === targetSiteId) || sites[0];

  const categories = [
    { id: 'ALL', label: 'All Rewards' },
    { id: 'VOUCHER', label: 'Gaming Credits' },
    { id: 'GROCERY', label: 'Groceries & Rice' },
    { id: 'ELECTRONICS', label: 'Tech & Gadgets' },
    { id: 'APPLIANCE', label: 'Home Appliances' },
    { id: 'MERCHANDISE', label: 'Merch & Raffles' },
  ];

  const filteredRewards = rewards.filter((r) => {
    if (selectedCategory === 'ALL') return true;
    return r.category === selectedCategory;
  });

  const myVouchers = vouchers.filter((v) => v.userId === currentUser?.id);

  // Icon mapper
  const renderItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ticket':
        return <Ticket className="w-8 h-8 text-amber-400" />;
      case 'Coins':
        return <Coins className="w-8 h-8 text-amber-300" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-8 h-8 text-emerald-400" />;
      case 'CreditCard':
        return <CreditCard className="w-8 h-8 text-cyan-400" />;
      case 'Shirt':
        return <Shirt className="w-8 h-8 text-purple-300" />;
      case 'Flame':
        return <Flame className="w-8 h-8 text-orange-400" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-8 h-8 text-emerald-400" />;
      case 'Tablet':
        return <Tablet className="w-8 h-8 text-sky-400" />;
      case 'Tv':
        return <Tv className="w-8 h-8 text-indigo-300" />;
      default:
        return <Gift className="w-8 h-8 text-amber-400" />;
    }
  };

  const handleConfirmRedemption = () => {
    if (!selectedReward) return;

    const res = store.redeemReward(selectedReward.id, targetSiteId);
    if (res.success && res.voucher) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
      setActiveVoucherModal(res.voucher);
      setSelectedReward(null);
      setFeedbackMsg({
        type: 'success',
        text: `Voucher ${res.voucher.voucherCode} generated successfully! Present to staff at ${selectedSite.name}.`,
      });
    } else {
      setFeedbackMsg({
        type: 'error',
        text: res.error || 'Failed to redeem reward item.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Points Status */}
      <div className="rounded-2xl bg-gradient-to-r from-[#2c0e52] via-[#21093f] to-[#16062a] border border-purple-700/60 p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              On-Site Reward Redemption Center
            </span>
            <span className="text-[11px] text-purple-300">
              Live Stock at all 9 Branches
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Exchange Your Points for Premium Rewards
          </h2>
          <p className="text-xs text-purple-200/80 mt-0.5">
            Claim physical retail items, grocery sacks, and free play credits directly at the front counter.
          </p>
        </div>

        {/* User Balance Card */}
        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-purple-950/80 border border-purple-600/50 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-300 block">
              Your Available Points
            </span>
            <span className="text-2xl font-black text-white tabular-nums tracking-tight">
              {currentUser?.pointsBalance.toLocaleString() || 0}
            </span>
            <span className="text-xs text-amber-400 font-bold ml-1.5">PTS</span>
          </div>

          <div className="border-l border-purple-800/80 pl-4 space-y-1">
            <button
              onClick={() => setActiveSubTab('my_vouchers')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold block"
            >
              My Vouchers ({myVouchers.filter((v) => v.status === 'PENDING_SCAN').length})
            </button>
          </div>
        </div>
      </div>

      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200'
              : 'bg-red-950/80 border-red-500/60 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-white hover:text-purple-300 font-bold px-1"
          >
            ×
          </button>
        </div>
      )}

      {/* Sub-tab navigation: Catalog vs Mechanics vs My Vouchers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-800/40">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'catalog'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-950/60 text-purple-300 hover:text-white'
            }`}
          >
            Reward Catalog
          </button>
          <button
            onClick={() => setActiveSubTab('mechanics')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'mechanics'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-950/60 text-purple-300 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Points & Catalogue Mechanics ({mechanics.filter((m) => m.isEnabled).length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('my_vouchers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'my_vouchers'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-purple-950/60 text-purple-300 hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-amber-400" />
            <span>My Claim Vouchers ({myVouchers.length})</span>
          </button>
        </div>

        {/* Site Stock Selector - Labeled with BingoPlus on all choices */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="text-purple-300 shrink-0 flex items-center gap-1 font-semibold">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Pick-up Branch:
          </span>
          <select
            value={targetSiteId}
            onChange={(e) => setTargetSiteId(e.target.value)}
            className="bg-[#1c0934] text-white border border-purple-700/60 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeSubTab === 'catalog' ? (
        <>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-extrabold shadow'
                    : 'bg-purple-950/70 text-purple-300 hover:bg-purple-900/60 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredRewards.map((reward) => {
              const stock = reward.stockPerSite[targetSiteId] ?? 0;
              const hasEnoughPoints = (currentUser?.pointsBalance || 0) >= reward.pointsCost;
              const isOutOfStock = stock <= 0;
              const isRedeemable = reward.isRedeemable !== false;

              return (
                <div
                  key={reward.id}
                  className={`rounded-2xl border p-5 shadow-lg flex flex-col justify-between transition-all ${
                    isRedeemable
                      ? 'bg-gradient-to-b from-[#230c3f] to-[#150527] border-purple-700/50 hover:border-purple-500/70'
                      : 'bg-[#18052a] border-purple-900/40 opacity-75'
                  }`}
                >
                  <div>
                    {/* Badge and Stock */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-900/80 text-amber-300 border border-purple-600/50">
                        {reward.badgeText || reward.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {!isRedeemable && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40">
                            Redemption Paused
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            stock > 5
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : stock > 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-red-500/20 text-red-300 border border-red-500/40'
                          }`}
                        >
                          {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>

                    {/* Visual Asset Container */}
                    <div className="w-full h-32 rounded-xl bg-gradient-to-tr from-purple-950 via-[#2d0f50] to-indigo-950 border border-purple-700/40 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-3">
                      <div className="absolute inset-0 bg-purple-500/5 mix-blend-overlay" />
                      <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center shadow-inner mb-1">
                        {renderItemIcon(reward.iconName)}
                      </div>
                      <span className="text-[10px] text-purple-300 font-mono">
                        Valued at ~₱{reward.estimatedPhpValue.toLocaleString()}
                      </span>
                    </div>

                    {/* Reward Title & Details */}
                    <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-purple-300/80 mt-1 line-clamp-2 leading-relaxed">
                      {reward.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-400 block">
                        Points Needed
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black text-amber-400 tabular-nums">
                          {reward.pointsCost.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-purple-300 font-bold">PTS</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedReward(reward)}
                      disabled={!isRedeemable || !hasEnoughPoints || isOutOfStock}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                        !isRedeemable
                          ? 'bg-purple-950/60 text-purple-400 cursor-not-allowed border border-purple-900/40'
                          : !hasEnoughPoints
                          ? 'bg-purple-950/60 text-purple-400 cursor-not-allowed border border-purple-900/40'
                          : isOutOfStock
                          ? 'bg-red-950/40 text-red-400 cursor-not-allowed border border-red-900/40'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black hover:scale-[1.02]'
                      }`}
                    >
                      <span>
                        {!isRedeemable
                          ? 'Redemption Paused'
                          : !hasEnoughPoints
                          ? 'Needs Points'
                          : isOutOfStock
                          ? 'No Stock'
                          : 'Redeem Item'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : activeSubTab === 'mechanics' ? (
        /* Points Mechanics & Catalogue Rules Sub-Tab */
        <div className="space-y-5">
          <div className="rounded-2xl bg-[#1d0937] border border-purple-700/60 p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-800/60">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-400" />
                  <span>Official Points Mechanics & Catalogue Guidelines</span>
                </h3>
                <p className="text-xs text-purple-300">
                  Standard earning rates, promo multipliers, and front counter redemption rules enforced across all 9 BingoPlus branches.
                </p>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Active Mechanics: {mechanics.filter((m) => m.isEnabled).length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {mechanics
                .filter((m) => m.isEnabled)
                .map((mech) => {
                  const targetSite = sites.find((s) => s.id === mech.applicableSiteId);
                  const siteName = mech.applicableSiteId === 'ALL' ? 'All 9 Branches' : targetSite?.name || mech.applicableSiteId;

                  return (
                    <div
                      key={mech.id}
                      className="p-4 rounded-xl bg-purple-950/60 border border-purple-700/50 flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-900 text-amber-300 border border-purple-700/50">
                            {mech.category.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-bold text-purple-300 bg-[#130325] px-2 py-0.5 rounded border border-purple-800/60">
                            {siteName}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-white text-sm">
                          {mech.title}
                        </h4>
                        <p className="text-xs text-purple-300/80 mt-1 leading-relaxed">
                          {mech.description}
                        </p>

                        {mech.conditions && (
                          <div className="mt-2 text-[11px] text-amber-300/90 font-medium">
                            • Qualification: {mech.conditions}
                          </div>
                        )}
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#140326] border border-purple-800/60 flex items-center justify-between text-xs">
                        <span className="text-purple-400 font-bold">
                          {mech.category === 'PROMO_MULTIPLIER'
                            ? 'Boost Multiplier'
                            : mech.category === 'CATALOGUE_RULE'
                            ? 'Policy Type'
                            : 'Points Credited'}
                        </span>
                        <strong className="text-amber-400 font-mono font-black text-sm">
                          {mech.category === 'PROMO_MULTIPLIER'
                            ? `${mech.pointsValue}x Multiplier`
                            : mech.category === 'CATALOGUE_RULE'
                            ? 'Counter Verification'
                            : `+${mech.pointsValue} PTS`}
                        </strong>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        /* My Active Claim Vouchers View */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              My Digital Reward Claim Vouchers
            </h3>
            <span className="text-xs text-purple-300">
              Present QR code to front counter staff at your branch
            </span>
          </div>

          {myVouchers.length === 0 ? (
            <div className="rounded-2xl bg-purple-950/40 border border-purple-800/50 p-8 text-center space-y-3">
              <Gift className="w-12 h-12 text-purple-400 mx-auto opacity-60" />
              <h4 className="text-base font-bold text-white">No active vouchers yet</h4>
              <p className="text-xs text-purple-300 max-w-sm mx-auto">
                Use your points from the reward catalog to generate digital claim vouchers redeemable on site.
              </p>
              <button
                onClick={() => setActiveSubTab('catalog')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Browse Reward Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myVouchers.map((voucher) => {
                const voucherSite = sites.find((s) => s.id === voucher.userSiteId);
                const isPending = voucher.status === 'PENDING_SCAN';

                return (
                  <div
                    key={voucher.id}
                    className={`rounded-2xl border p-5 shadow-lg flex flex-col justify-between ${
                      isPending
                        ? 'bg-gradient-to-br from-[#2a104c] to-[#16062a] border-amber-500/50'
                        : 'bg-purple-950/30 border-purple-900/40 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isPending
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {isPending ? '⏳ READY FOR COUNTER SCAN' : '✓ CLAIMED & RELEASED'}
                        </span>
                        <span className="text-xs text-purple-300 font-mono">
                          {voucher.voucherCode}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-white text-base">
                        {voucher.rewardTitle}
                      </h4>
                      <div className="text-xs text-purple-300 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Redeem at: <strong className="text-white">{voucherSite?.name}</strong></span>
                      </div>
                      <div className="text-[11px] text-purple-400 mt-1">
                        Issued: {new Date(voucher.createdAt).toLocaleString()}
                        {voucher.claimedAt && ` • Claimed: ${new Date(voucher.claimedAt).toLocaleString()}`}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-purple-800/60 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">
                        {voucher.pointsCost.toLocaleString()} PTS SPENT
                      </span>

                      {isPending && (
                        <button
                          onClick={() => setActiveVoucherModal(voucher)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow"
                        >
                          <span>Show Voucher QR</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal to Redeem */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-[#1d0a33] border border-purple-600/70 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>Confirm Reward Exchange</span>
              </h3>
              <button
                onClick={() => setSelectedReward(null)}
                className="text-purple-400 hover:text-white text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-purple-950/70 border border-purple-800/50 space-y-2">
                <h4 className="font-extrabold text-white text-sm">
                  {selectedReward.title}
                </h4>
                <p className="text-purple-300">{selectedReward.description}</p>
                <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between font-semibold">
                  <span className="text-purple-300">Points to be Deducted:</span>
                  <span className="text-amber-400 font-bold text-sm">
                    {selectedReward.pointsCost.toLocaleString()} PTS
                  </span>
                </div>
                <div className="flex items-center justify-between text-purple-300">
                  <span>Balance after exchange:</span>
                  <span className="text-white font-mono font-bold">
                    {((currentUser?.pointsBalance || 0) - selectedReward.pointsCost).toLocaleString()} PTS
                  </span>
                </div>
                <div className="flex items-center justify-between text-purple-300">
                  <span>Pick-up Site:</span>
                  <span className="text-amber-300 font-bold">{selectedSite.name}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-amber-200 text-[11px] leading-relaxed">
                ℹ️ Once confirmed, a digital QR voucher code will be issued. Present the QR voucher to the counter staff at {selectedSite.name} to receive your item.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedReward(null)}
                className="px-4 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedemption}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-950/60"
              >
                Confirm & Issue Voucher QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Voucher Full-Screen QR Modal */}
      {activeVoucherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-sm bg-[#1e0a35] border border-amber-500/60 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  Official Claim Voucher
                </span>
                <h3 className="text-sm font-extrabold text-white">
                  {activeVoucherModal.rewardTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveVoucherModal(null)}
                className="text-purple-400 hover:text-white text-xl font-bold ml-2"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-purple-200">
              Present this QR to counter staff at{' '}
              <strong className="text-amber-300">
                {sites.find((s) => s.id === activeVoucherModal.userSiteId)?.name || 'BingoPlus Branch'}
              </strong>
            </p>

            {/* QR Code Canvas */}
            <div className="flex justify-center py-2">
              <QRCodeDisplay
                value={`BP-VOUCHER:${activeVoucherModal.voucherCode}:${activeVoucherModal.rewardId}:${activeVoucherModal.userId}`}
                size={200}
                darkColor="#3b0764"
              />
            </div>

            <div className="p-3 bg-purple-950/80 rounded-xl border border-purple-800/60 space-y-1">
              <div className="text-[10px] text-purple-400 uppercase font-bold">Voucher ID</div>
              <div className="text-lg font-mono font-black text-amber-300 tracking-wider">
                {activeVoucherModal.voucherCode}
              </div>
              <div className="text-[11px] text-purple-300">
                Member: {activeVoucherModal.userName}
              </div>
            </div>

            <button
              onClick={() => setActiveVoucherModal(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              Done / Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
