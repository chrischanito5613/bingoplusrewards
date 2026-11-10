import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Building2,
  ShieldCheck,
  Megaphone,
  Trash2,
  Pin,
  Users,
  Sparkles,
  Info,
} from 'lucide-react';
import { useBingoPlus } from '../hooks/useBingoPlus';
import { ChatMessage, UserRole } from '../types/bingoplus';

export const BranchLiveChat: React.FC = () => {
  const { chatMessages, sites, currentUser, store } = useBingoPlus();
  const [selectedSiteId, setSelectedSiteId] = useState<string>(
    currentUser?.assignedSiteId || currentUser?.registeredSiteId || 'sm-lipa'
  );
  const [messageText, setMessageText] = useState('');
  const [isOfficialAnnouncement, setIsOfficialAnnouncement] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const activeSite = sites.find((s) => s.id === selectedSiteId) || sites[0];
  const isStaffOrAdmin = currentUser && ['STAFF', 'BRANCH_MANAGER', 'ADMIN', 'SUPERUSER'].includes(currentUser.role);

  // Filter messages for current site
  const siteMessages = chatMessages.filter((m) => m.siteId === selectedSiteId);
  const pinnedMessage = siteMessages.find((m) => m.isPinned);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [siteMessages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentUser) return;

    store.sendChatMessage({
      siteId: selectedSiteId,
      text: messageText.trim(),
      isOfficialAnnouncement: isStaffOrAdmin ? isOfficialAnnouncement : false,
      isPinned: false,
    });

    setMessageText('');
    setIsOfficialAnnouncement(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (window.confirm('Delete this message as branch moderator?')) {
      store.deleteChatMessage(messageId);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'SUPERUSER':
        return 'bg-rose-500/30 text-rose-300 border-rose-500/50';
      case 'ADMIN':
        return 'bg-purple-500/30 text-purple-300 border-purple-500/50';
      case 'BRANCH_MANAGER':
        return 'bg-amber-500/30 text-amber-300 border-amber-500/50';
      case 'STAFF':
        return 'bg-emerald-500/30 text-emerald-300 border-emerald-500/50';
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl bg-[#1b0832] border border-purple-700/50 shadow-2xl flex flex-col h-[750px] overflow-hidden">
      {/* Chat Room Header */}
      <div className="p-4 bg-gradient-to-r from-[#290e4a] to-[#1a0731] border-b border-purple-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/40 border border-purple-400/40 flex items-center justify-center text-amber-300">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-white text-base">
                {activeSite.name} Live Chat
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-purple-300/80">
              Official community discussion for patrons and branch personnel
            </p>
          </div>
        </div>

        {/* Room Switcher: If Staff or Admin, can switch channels to any of the 9 sites */}
        {isStaffOrAdmin ? (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-purple-300 font-semibold shrink-0">Branch Room:</span>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="bg-[#240c42] text-white border border-purple-700/60 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none"
            >
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="text-xs text-purple-300 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/50 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Registered to this branch group</span>
          </div>
        )}
      </div>

      {/* Pinned Announcement Box if exists */}
      {pinnedMessage && (
        <div className="bg-amber-500/10 border-b border-amber-500/30 px-4 py-2.5 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-amber-200">
            <Pin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-bold text-amber-400">PINNED ANNOUNCEMENT:</span>
            <span className="truncate">{pinnedMessage.text}</span>
          </div>
          <span className="text-[10px] text-amber-400/80 font-mono shrink-0">
            by {pinnedMessage.senderName}
          </span>
        </div>
      )}

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {siteMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-purple-300/70 space-y-2">
            <Sparkles className="w-8 h-8 text-purple-400 opacity-50" />
            <p className="text-sm font-semibold text-white">Welcome to {activeSite.name} Live Chat!</p>
            <p className="text-xs max-w-xs">
              Say hello to fellow patrons, ask branch staff about ongoing machine rounds, or share jackpot celebrations.
            </p>
          </div>
        ) : (
          siteMessages.map((msg: ChatMessage) => {
            const isMe = msg.senderId === currentUser?.id;
            const isStaffSender = ['STAFF', 'BRANCH_MANAGER', 'ADMIN', 'SUPERUSER'].includes(
              msg.senderRole
            );
            const roleBadge = getRoleBadge(msg.senderRole);

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1 group`}
              >
                {/* Sender Info Line */}
                <div className="flex items-center gap-1.5 text-[11px] px-1">
                  <span className={`font-bold ${isMe ? 'text-amber-300' : 'text-purple-200'}`}>
                    {msg.senderName}
                  </span>

                  {roleBadge && (
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded border ${roleBadge}`}
                    >
                      {msg.senderRole.replace('_', ' ')}
                    </span>
                  )}

                  {msg.senderTier && !isStaffSender && (
                    <span className="text-[9px] font-semibold text-purple-400">
                      [{msg.senderTier}]
                    </span>
                  )}

                  <span className="text-[10px] text-purple-400/70">{msg.timestamp}</span>

                  {/* Staff Moderation Delete Button */}
                  {isStaffOrAdmin && (
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="opacity-0 group-hover:opacity-100 text-purple-400 hover:text-red-400 transition-opacity ml-1"
                      title="Delete message"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-md rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-md ${
                    msg.isOfficialAnnouncement
                      ? 'bg-gradient-to-r from-amber-600/30 to-purple-800/50 border border-amber-500/60 text-white font-medium'
                      : isMe
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none border border-purple-400/30'
                      : isStaffSender
                      ? 'bg-[#291047] text-purple-100 rounded-bl-none border border-purple-600/50'
                      : 'bg-[#21093d] text-purple-200 rounded-bl-none border border-purple-800/40'
                  }`}
                >
                  {msg.isOfficialAnnouncement && (
                    <div className="flex items-center gap-1 text-[10px] uppercase font-black text-amber-300 mb-1">
                      <Megaphone className="w-3 h-3 text-amber-400" />
                      <span>Official Branch Advisory</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-1.5 bg-[#17062b] border-t border-purple-900/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {[
          'Good luck sa Roundtop!',
          'May available machine pa po?',
          'Pa-verify po ng attendance check-in',
          'Sino po nanalo sa previous round?',
        ].map((quickText, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setMessageText(quickText)}
            className="px-2.5 py-1 rounded-full bg-purple-950/70 hover:bg-purple-900 border border-purple-800/40 text-[11px] text-purple-300 hover:text-white whitespace-nowrap transition-colors"
          >
            {quickText}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={handleSendMessage}
        className="p-3 bg-[#1e0a35] border-t border-purple-800/60 flex flex-col gap-2 shrink-0"
      >
        {isStaffOrAdmin && (
          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-amber-300 font-semibold">
              <input
                type="checkbox"
                checked={isOfficialAnnouncement}
                onChange={(e) => setIsOfficialAnnouncement(e.target.checked)}
                className="rounded accent-amber-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                Post as Official Branch Advisory
              </span>
            </label>
            <span className="text-[10px] text-purple-400">Moderator mode active</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message ${activeSite.name} members & staff...`}
            className="flex-1 bg-[#140424] text-white placeholder-purple-400/60 text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className={`p-2.5 rounded-xl font-bold transition-all shadow ${
              messageText.trim()
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500'
                : 'bg-purple-950/60 text-purple-500 cursor-not-allowed border border-purple-900/40'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
