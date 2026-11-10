import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Building2,
  Users,
  Clock,
  Sparkles,
  Ticket,
  ChevronRight,
  Gift,
  RefreshCw,
  Coins,
  Radio,
  Layers,
  Power,
} from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';
import { BingoSite } from '../types/bingoplus';

interface HomeInterfaceProps {
  onGoToRewards: () => void;
  onGoToChat: () => void;
  onOpenQR: () => void;
}

export const HomeInterface: React.FC<HomeInterfaceProps> = ({
  onGoToRewards,
  onGoToChat,
  onOpenQR,
}) => {
  const { sites, currentUser } = useBingoPlus();
  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    currentUser?.registeredSiteId || 'sm-lipa'
  );
  const [viewMode, setViewMode] = useState<'featured' | 'all_9_grid'>('featured');
  const [jackpotDisplayTab, setJackpotDisplayTab] = useState<'overview' | 'traditional' | 'ebg_variants'>('overview');

  const activeSite: BingoSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  // Helper for status colors
  const getRoundtopStatusBadge = (status: BingoSite['roundtop']['status']) => {
    switch (status) {
      case 'ROUNDTOP_ALERT':
        return {
          bg: 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse',
          text: '🚨 ROUNDTOP ALERT - FEW BALLS LEFT',
        };
      case 'BALL_DRAW_ACTIVE':
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          text: '🟢 BALL DRAW IN PROGRESS',
        };
      case 'WON':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          text: '🏆 JACKPOT HIT THIS ROUND',
        };
      default:
        return {
          bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          text: 'STANDBY / NEXT ROUND READY',
        };
    }
  };

  const ballProgress = Math.min(
    100,
    Math.round((activeSite.roundtop.ballsDrawn / activeSite.roundtop.ballCallTarget) * 100)
  );

  return (
    <div className="space-y-6">
      {/* 9-Site Quick Switcher & Header Strip */}
      <div className="bg-[#1c0a34]/90 rounded-2xl border border-purple-800/40 p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                Live 9-Site Network Feed
              </span>
              <span className="text-[11px] text-purple-300 font-mono">
                Real-time Database Active
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white">
              BingoPlus Branch Hubs & Jackpots
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('featured')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'featured'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-950/70 text-purple-300 hover:text-white'
              }`}
            >
              Detailed Focus
            </button>
            <button
              onClick={() => setViewMode('all_9_grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'all_9_grid'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-950/70 text-purple-300 hover:text-white'
              }`}
            >
              All 9 Sites Overview
            </button>
          </div>
        </div>

        {/* 9 Sites Selector Bar - Labeled with BingoPlus on all choices */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          {sites.map((site) => {
            const isSelected = site.id === selectedSiteId;
            const isHomeBranch = site.id === currentUser?.registeredSiteId;
            return (
              <button
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/80 shadow-lg shadow-purple-950/60 scale-102'
                    : 'bg-purple-950/50 text-purple-300 hover:text-white hover:bg-purple-900/60 border-purple-900/40'
                }`}
              >
                <Building2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-purple-400'}`} />
                <span>{site.name}</span>
                {isHomeBranch && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                    MY SITE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'featured' ? (
        <>
          {/* Active Site Spotlight Hero with Real-Time Jackpots & Roundtop */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2f1057] via-[#1f0a3b] to-[#120524] border border-purple-600/40 shadow-2xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-purple-800/60">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>LIVE TRANSMISSION: {activeSite.city}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  {activeSite.name}
                </h1>
                <p className="text-xs sm:text-sm text-purple-200/80 mt-0.5">
                  {activeSite.location} • Hotline: {activeSite.contactNumber}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onGoToChat}
                  className="px-4 py-2 rounded-xl bg-purple-700/80 hover:bg-purple-600 text-white text-xs font-bold flex items-center gap-2 border border-purple-500/40 shadow"
                >
                  <span>Join Branch Chat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenQR}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-950/50"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Check In / Earn Points</span>
                </button>
              </div>
            </div>

            {/* Multi-Jackpot Sub-navigation: Overview, Traditional Bingo Brackets, EBG Machine Variants */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => setJackpotDisplayTab('overview')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  jackpotDisplayTab === 'overview'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-purple-950/70 text-purple-300 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Progressive Jackpots & Draw</span>
              </button>

              <button
                onClick={() => setJackpotDisplayTab('traditional')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  jackpotDisplayTab === 'traditional'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-purple-950/70 text-purple-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Traditional Bingo (Ball Brackets)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 font-extrabold">
                  {(activeSite.traditionalJackpots || []).filter((b) => b.isActive).length} Brackets
                </span>
              </button>

              <button
                onClick={() => setJackpotDisplayTab('ebg_variants')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  jackpotDisplayTab === 'ebg_variants'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-purple-950/70 text-purple-300 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>EBG Machine Variants (Roundtop per Type)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold">
                  {(activeSite.ebgVariants || []).filter((v) => v.isEnabled).length} Online
                </span>
              </button>
            </div>

            {/* TAB 1: Overview & Progressive Jackpots */}
            {jackpotDisplayTab === 'overview' && (
              <>
                {/* Real-time Jackpots Trio (Mega, Grand, Major) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {/* Mega Jackpot Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-900/80 to-[#220745] border border-amber-500/40 p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-black tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        MEGA JACKPOT
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-amber-400/20 text-amber-300 font-extrabold rounded-full border border-amber-400/40">
                        REAL-TIME
                      </span>
                    </div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-white tabular-nums tracking-tight">
                      ₱{activeSite.megaJackpot.toLocaleString()}
                    </div>
                    <div className="mt-2 text-[11px] text-purple-300 flex items-center justify-between">
                      <span>Progressive Network Pool</span>
                      <span className="text-emerald-400 font-bold">▲ Growing Live</span>
                    </div>
                  </div>

                  {/* Grand Jackpot Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-950/80 to-[#190635] border border-purple-600/40 p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-black tracking-wider text-purple-200 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        GRAND JACKPOT
                      </span>
                      <span className="text-[10px] text-purple-300 font-medium">Daily Seeded</span>
                    </div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-300 tabular-nums tracking-tight">
                      ₱{activeSite.grandJackpot.toLocaleString()}
                    </div>
                    <div className="mt-2 text-[11px] text-purple-300/80">
                      Must drop before ₱1,000,000 cap
                    </div>
                  </div>

                  {/* Major Jackpot Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-purple-950/80 to-[#190635] border border-purple-600/40 p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-black tracking-wider text-cyan-300 flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-cyan-400" />
                        MAJOR ROUND POT
                      </span>
                      <span className="text-[10px] text-cyan-300 font-semibold">Active Session</span>
                    </div>
                    <div className="mt-2 text-2xl sm:text-3xl font-black text-cyan-300 tabular-nums tracking-tight">
                      ₱{activeSite.majorJackpot.toLocaleString()}
                    </div>
                    <div className="mt-2 text-[11px] text-purple-300/80">
                      Guaranteed hits every session bracket
                    </div>
                  </div>
                </div>

                {/* Bingo Machine Roundtop Live Centerpiece */}
                <div className="mt-6 rounded-2xl bg-[#170529]/90 border border-purple-700/60 p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-amber-500 p-0.5 shadow-md shrink-0">
                        <div className="w-full h-full bg-[#18052e] rounded-[14px] flex items-center justify-center font-black text-amber-300 text-base">
                          #{activeSite.roundtop.roundNumber}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-extrabold text-white">
                            Bingo Machine Roundtop Status
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              getRoundtopStatusBadge(activeSite.roundtop.status).bg
                            }`}
                          >
                            {getRoundtopStatusBadge(activeSite.roundtop.status).text}
                          </span>
                        </div>
                        <p className="text-xs text-purple-300">
                          Machine ball call ceiling: <strong className="text-white">{activeSite.roundtop.ballCallTarget} balls</strong> for Roundtop Jackpot
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-purple-200">
                      <div className="text-right">
                        <span className="text-purple-400 block text-[10px] uppercase font-bold">Active Machines</span>
                        <span className="text-white font-mono font-bold text-sm">
                          {activeSite.roundtop.activeMachines} / {activeSite.roundtop.totalMachines} online
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ball Call Gauge & Progress */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-300 flex items-center gap-1.5 font-semibold">
                        <Flame className="w-4 h-4 text-orange-400" />
                        Balls Drawn in Current Round:
                        <strong className="text-white text-sm font-mono ml-1">
                          {activeSite.roundtop.ballsDrawn}
                        </strong>
                        <span className="text-purple-400">/ {activeSite.roundtop.ballCallTarget} target</span>
                      </span>
                      <span className="text-amber-400 font-mono font-bold">
                        {Math.max(0, activeSite.roundtop.ballCallTarget - activeSite.roundtop.ballsDrawn)} balls left to hit Roundtop
                      </span>
                    </div>

                    <div className="w-full bg-purple-950 rounded-full h-3.5 overflow-hidden border border-purple-800/80 p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          ballProgress > 85
                            ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 animate-pulse'
                            : 'bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400'
                        }`}
                        style={{ width: `${ballProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Simulated Live Ball Call Rack */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                      Recent Ball Calls in Machine:
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                      {[
                        { letter: 'B', num: 12, bg: 'bg-blue-600' },
                        { letter: 'I', num: 24, bg: 'bg-red-600' },
                        { letter: 'N', num: 38, bg: 'bg-amber-500 text-slate-950 font-black' },
                        { letter: 'G', num: 55, bg: 'bg-green-600' },
                        { letter: 'O', num: 71, bg: 'bg-orange-600' },
                        { letter: 'B', num: 7, bg: 'bg-blue-600' },
                        { letter: 'I', num: 19, bg: 'bg-red-600' },
                        { letter: 'N', num: 42, bg: 'bg-amber-500 text-slate-950 font-black' },
                      ].map((ball, idx) => (
                        <div
                          key={idx}
                          className={`w-9 h-9 rounded-full ${ball.bg} text-white flex flex-col items-center justify-center font-bold text-xs shadow-md shrink-0 border border-white/20`}
                        >
                          <span className="text-[8px] leading-none opacity-80">{ball.letter}</span>
                          <span className="leading-none text-xs">{ball.num}</span>
                        </div>
                      ))}
                      <div className="text-xs text-purple-400 italic pl-2 shrink-0">
                        ...next ball rolling in 8s
                      </div>
                    </div>
                  </div>

                  {/* Last Winner Banner */}
                  <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-purple-200">
                      <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        Last Round Winner: <strong className="text-amber-300">{activeSite.roundtop.lastWinnerName}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-purple-300">
                      <span>Prize: <strong className="text-white font-mono">₱{activeSite.roundtop.lastWonPrize.toLocaleString()}</strong></span>
                      <span className="flex items-center gap-1 text-[11px] text-purple-400">
                        <Clock className="w-3 h-3" /> {activeSite.roundtop.lastWonTime}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: Traditional Bingo Jackpots & Ball Brackets */}
            {jackpotDisplayTab === 'traditional' && (
              <div className="mt-4 rounded-2xl bg-[#170529]/95 border border-purple-700/60 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-800/60">
                  <div>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                      TRADITIONAL BINGO HALL JACKPOTS
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      Ball Count Brackets & Prize Payout Schedule ({activeSite.name})
                    </h3>
                    <p className="text-xs text-purple-300">
                      Hit the designated pattern within the target ball call bracket to win the progressive prize.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(activeSite.traditionalJackpots || []).map((bracket) => (
                    <div
                      key={bracket.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        bracket.isActive
                          ? 'bg-purple-950/70 border-amber-500/40 shadow-md'
                          : 'bg-[#150424]/60 border-purple-900/40 opacity-60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-sm sm:text-base">
                            {bracket.gamePattern}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              bracket.isActive
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-red-500/20 text-red-300 border border-red-500/40'
                            }`}
                          >
                            {bracket.isActive ? 'ACTIVE IN HALL' : 'DISABLED'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-purple-300 mt-1">
                          <span className="font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                            Calls: {bracket.minBalls} – {bracket.maxBalls} Balls
                          </span>
                          {bracket.consolationPrize && (
                            <span>
                              Consolation: <strong className="text-purple-200">₱{bracket.consolationPrize.toLocaleString()}</strong>
                            </span>
                          )}
                          {bracket.notes && <span className="text-purple-400 italic">• {bracket.notes}</span>}
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] uppercase font-bold text-purple-400 block">
                          Jackpot Prize
                        </span>
                        <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tabular-nums">
                          ₱{bracket.prizeAmount.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EBG Machine Variants (Roundtop per Type) */}
            {jackpotDisplayTab === 'ebg_variants' && (
              <div className="mt-4 rounded-2xl bg-[#170529]/95 border border-purple-700/60 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-800/60">
                  <div>
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-600 text-white">
                      ELECTRONIC BINGO GAMES (EBG)
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      EBG Machine Variant Roundtops & Status ({activeSite.name})
                    </h3>
                    <p className="text-xs text-purple-300">
                      Roundtop trigger thresholds and progressive jackpot status per machine type
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(activeSite.ebgVariants || []).map((variant) => (
                    <div
                      key={variant.id}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        variant.isEnabled
                          ? 'bg-gradient-to-b from-purple-950/80 to-[#1e0738] border-purple-500/60 shadow-md'
                          : 'bg-[#150424]/60 border-purple-900/40 opacity-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-900 text-amber-300 border border-purple-700/50">
                            {variant.code} • {variant.type.replace('_', ' ')}
                          </span>

                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                              variant.isEnabled
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-red-500/20 text-red-300 border-red-500/40'
                            }`}
                          >
                            {variant.isEnabled ? '🟢 ONLINE IN HALL' : '🔴 OFFLINE / STANDBY'}
                          </span>
                        </div>

                        <h4 className="font-extrabold text-white text-base">
                          {variant.name}
                        </h4>
                        <p className="text-xs text-purple-300 mt-0.5">
                          {variant.activeCabinets} / {variant.totalCabinets} Active Terminals • Ball Ceiling: <strong className="text-white">{variant.ballCeiling} Balls</strong>
                        </p>

                        <div className="mt-3 p-3 rounded-xl bg-purple-950/90 border border-purple-800/60 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-amber-400 block">
                              Roundtop Amount
                            </span>
                            <div className="text-xl font-black text-amber-300 font-mono tabular-nums">
                              ₱{variant.roundtopAmount.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-purple-400 block">
                              Progressive Pool
                            </span>
                            <div className="text-sm font-black text-white font-mono tabular-nums">
                              ₱{variant.progressiveJackpot.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Site Promos & Activities Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <span>Active Promotions & Tournaments at {activeSite.name}</span>
                </h3>
                <p className="text-xs text-purple-300">
                  Exclusive offers automatically available when checking in at this site
                </p>
              </div>
              <button
                onClick={onGoToRewards}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                <span>View Reward Items</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSite.promos.map((promo) => (
                <div
                  key={promo.id}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${promo.bannerGradient} border border-purple-600/40 p-5 shadow-lg flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-400/40">
                        {promo.tag}
                      </span>
                      <span className="text-xs text-purple-200 font-medium">
                        {promo.validPeriod}
                      </span>
                    </div>
                    <h4 className="text-base font-extrabold text-white">{promo.title}</h4>
                    <p className="text-xs font-semibold text-amber-300 mt-0.5">{promo.subtitle}</p>
                    <p className="text-xs text-purple-200/90 mt-2 leading-relaxed">
                      {promo.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-purple-200">
                      Show membership QR at counter to claim
                    </span>
                    <button
                      onClick={onOpenQR}
                      className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
                    >
                      Show QR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* All 9 Sites Grid Overview */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              Live Real-Time Status Across All 9 BingoPlus Branches
            </h3>
            <span className="text-xs text-purple-300">
              Auto-updating via unified database channel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sites.map((site) => {
              const isSelected = site.id === selectedSiteId;
              const isHomeBranch = site.id === currentUser?.registeredSiteId;

              return (
                <div
                  key={site.id}
                  onClick={() => {
                    setSelectedSiteId(site.id);
                    setViewMode('featured');
                  }}
                  className={`cursor-pointer rounded-2xl bg-gradient-to-b from-[#250d44] to-[#16062a] border p-5 shadow-lg transition-all hover:scale-[1.01] ${
                    isSelected
                      ? 'border-purple-400 ring-2 ring-purple-500/40'
                      : 'border-purple-800/40 hover:border-purple-600/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-white text-sm">
                          {site.name}
                        </h4>
                        {isHomeBranch && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                            MY SITE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-purple-300/80">{site.city}</p>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        getRoundtopStatusBadge(site.roundtop.status).bg
                      }`}
                    >
                      Round #{site.roundtop.roundNumber}
                    </span>
                  </div>

                  {/* Jackpot Ticker */}
                  <div className="mt-4 p-3 rounded-xl bg-purple-950/70 border border-purple-800/50">
                    <div className="text-[10px] uppercase font-bold text-amber-400">
                      Mega Jackpot Pool
                    </div>
                    <div className="text-lg font-black text-white tabular-nums tracking-tight">
                      ₱{site.megaJackpot.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-purple-300 flex items-center justify-between mt-1">
                      <span>Grand: ₱{site.grandJackpot.toLocaleString()}</span>
                      <span>Major: ₱{site.majorJackpot.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Machine Roundtop stats */}
                  <div className="mt-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-purple-300">
                      <span>Balls Called:</span>
                      <span className="font-mono font-bold text-white">
                        {site.roundtop.ballsDrawn} / {site.roundtop.ballCallTarget}
                      </span>
                    </div>
                    <div className="w-full bg-purple-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (site.roundtop.ballsDrawn / site.roundtop.ballCallTarget) * 100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-purple-400 pt-1">
                      <span>{site.roundtop.activeMachines} machines active</span>
                      <span className="text-amber-300 hover:underline flex items-center">
                        Open Hub <ChevronRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
