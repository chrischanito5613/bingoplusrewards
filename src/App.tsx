import React, { useState } from 'react';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { HomeInterface } from './components/HomeInterface';
import { RedeemRewardTab } from './components/RedeemRewardTab';
import { BranchLiveChat } from './components/BranchLiveChat';
import { StaffOpsConsole } from './components/StaffOpsConsole';
import { PlayerQRModal } from './components/PlayerQRModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AuthModal } from './components/AuthModal';
import { useBingoPlus } from './hooks/useBingoPlus';

export default function App() {
  const { currentUser, sites } = useBingoPlus();
  const [activeTab, setActiveTab] = useState<'home' | 'rewards' | 'chat' | 'staff_ops' | 'vouchers'>('home');
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const registeredSite = sites.find((s) => s.id === currentUser?.registeredSiteId);

  return (
    <div className="min-h-screen bg-[#0e041d] text-purple-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Official Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQR={() => setIsQRModalOpen(true)}
        onOpenNotifications={() => setIsNotifModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Panel: Account Details, Tier, Registered Branch, Points, Navigation */}
          <LeftPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenQR={() => setIsQRModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />

          {/* Right Main Viewport */}
          <div className="flex-1 w-full min-w-0">
            {activeTab === 'home' && (
              <HomeInterface
                onGoToRewards={() => setActiveTab('rewards')}
                onGoToChat={() => setActiveTab('chat')}
                onOpenQR={() => setIsQRModalOpen(true)}
              />
            )}

            {(activeTab === 'rewards' || activeTab === 'vouchers') && (
              <RedeemRewardTab onOpenQR={() => setIsQRModalOpen(true)} />
            )}

            {activeTab === 'chat' && <BranchLiveChat />}

            {activeTab === 'staff_ops' && <StaffOpsConsole />}
          </div>
        </div>
      </main>

      {/* Bottom Footer Info */}
      <footer className="border-t border-purple-900/40 bg-[#130526]/80 text-xs text-purple-400/80 py-4 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">BingoPlus 9-Site Unified Network</span>
            <span aria-hidden="true">·</span>
            <span>SM Lipa · SM Batangas · Pacific Mall Legaspi · Mindoro · Lemery · ALDP Naga · Nasugbu · Masbate · Isabang</span>
          </div>
          <div className="text-[11px] text-purple-400">
            Real-time Central Database Active
          </div>
        </div>
      </footer>

      {/* Scannable Membership Pass QR Modal */}
      <PlayerQRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onOpenStaffOps={() => {
          setIsQRModalOpen(false);
          setActiveTab('staff_ops');
        }}
      />

      {/* Push Notifications & Branch Announcements Drawer Modal */}
      <NotificationsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
      />

      {/* Login & New Player Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
