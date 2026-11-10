export type UserRole = 'PLAYER' | 'STAFF' | 'BRANCH_MANAGER' | 'ADMIN' | 'SUPERUSER';

export type TierLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND_VIP';

export interface BingoSite {
  id: string;
  name: string; // e.g., "BingoPlus SM Lipa"
  shortName: string; // e.g., "SM Lipa"
  city: string;
  location: string;
  contactNumber: string;
  managerName: string;
  megaJackpot: number;
  grandJackpot: number;
  majorJackpot: number;
  roundtop: {
    roundNumber: number;
    ballCallTarget: number; // e.g. 48 balls
    ballsDrawn: number; // e.g. 34
    status: 'BALL_DRAW_ACTIVE' | 'ROUNDTOP_ALERT' | 'WON' | 'INTERMISSION';
    activeMachines: number;
    totalMachines: number;
    lastWonPrize: number;
    lastWinnerName: string;
    lastWonTime: string;
    updatedAt: string;
  };
  promos: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    tag: string;
    bannerGradient: string;
    validPeriod: string;
  }[];
  activeAnnouncement: string;
  traditionalJackpots?: TraditionalJackpotBracket[];
  ebgVariants?: EBGMachineVariant[];
}

export interface TraditionalJackpotBracket {
  id: string;
  gamePattern: string; // e.g. "Coverall / Blackout", "Four Corners", "Diagonal"
  minBalls: number;
  maxBalls: number;
  prizeAmount: number;
  consolationPrize?: number;
  isActive: boolean;
  notes?: string;
}

export interface EBGMachineVariant {
  id: string;
  name: string; // e.g. "Dragon Fortune Link", "Super Ball Bingo 88", "Mega Gold 4-Card"
  code: string; // e.g. "DFL-01", "SBB-88"
  type: 'CLASSIC_EBG' | 'COMMUNITY_LINK' | 'MULTI_CARD' | 'STANDALONE' | 'PROGRESSIVE';
  roundtopAmount: number; // e.g. ₱75,000
  progressiveJackpot: number; // e.g. ₱380,000
  ballCeiling: number; // e.g. 48 balls
  currentBallsDrawn: number; // e.g. 36
  activeCabinets: number;
  totalCabinets: number;
  isEnabled: boolean; // Staff toggle ON and OFF!
  status: 'ACTIVE' | 'STANDBY' | 'MAINTENANCE' | 'ROUNDTOP_CALL';
}

export interface TierConfig {
  id: TierLevel;
  name: string;
  minSpend: number;
  pointMultiplier: number;
  color: string;
  badgeBg: string;
  perks: string[];
}

export interface User {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  registeredSiteId: string; // foreign key to BingoSite.id
  tier: TierLevel;
  pointsBalance: number;
  lifetimePoints: number;
  totalSpend: number;
  attendanceStreak: number;
  lastAttendanceDate?: string;
  memberSince: string;
  qrCodeData: string;
  status: 'ACTIVE' | 'SUSPENDED';
  assignedSiteId?: string; // For Staff / Branch Manager
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'VOUCHER' | 'ELECTRONICS' | 'GROCERY' | 'MERCHANDISE' | 'APPLIANCE';
  pointsCost: number;
  description: string;
  estimatedPhpValue: number;
  iconName: string;
  badgeText?: string;
  minTier: TierLevel;
  stockPerSite: Record<string, number>; // siteId -> quantity
  isRedeemable?: boolean; // Branch Manager / Superuser toggle ON and OFF!
  mechanicsNotes?: string;
}

export interface PointMechanic {
  id: string;
  title: string;
  category: 'POINTS_EARNING' | 'CATALOGUE_RULE' | 'PROMO_MULTIPLIER';
  pointsValue: number; // e.g. 25 pts, 300 pts
  spendRatePhp?: number; // e.g. 50 PHP = 1 pt
  description: string;
  conditions?: string;
  applicableSiteId: string; // 'ALL' or specific site ID
  isEnabled: boolean; // Staff & Branch Manager toggle ON and OFF
  updatedAt?: string;
  updatedBy?: string;
}

export interface RedemptionVoucher {
  id: string;
  voucherCode: string;
  userId: string;
  userName: string;
  userSiteId: string;
  rewardId: string;
  rewardTitle: string;
  pointsCost: number;
  status: 'PENDING_SCAN' | 'CLAIMED' | 'EXPIRED';
  createdAt: string;
  claimedAt?: string;
  claimedByStaffId?: string;
  claimedAtSiteId?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  siteId: string;
  siteName: string;
  userId: string;
  userName: string;
  userTier?: TierLevel;
  staffId?: string;
  staffName?: string;
  type: 'ATTENDANCE' | 'PURCHASE' | 'TOURNAMENT_WIN' | 'REWARD_REDEEM' | 'MANUAL_ADJUST' | 'REGISTRATION';
  pointsDelta: number;
  purchaseAmount?: number;
  notes: string;
}

export interface ChatMessage {
  id: string;
  siteId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderTier?: TierLevel;
  text: string;
  timestamp: string;
  isOfficialAnnouncement?: boolean;
  isPinned?: boolean;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  targetSiteId: string; // 'ALL' or specific siteId
  targetSiteName: string;
  sentAt: string;
  senderName: string;
  category: 'PROMO' | 'JACKPOT' | 'SYSTEM' | 'EVENT';
  readByUsers: string[]; // array of userIds who marked read
}

export interface BingoPlusDatabase {
  sites: BingoSite[];
  users: User[];
  rewards: RewardItem[];
  vouchers: RedemptionVoucher[];
  logs: ActivityLog[];
  chatMessages: ChatMessage[];
  notifications: PushNotification[];
  tierConfigs: TierConfig[];
  mechanics: PointMechanic[];
  systemSettings: {
    defaultAttendancePoints: number;
    purchasePointsRate: number; // ₱ spend per 1 point (e.g. 50 PHP = 1 pt)
    autoJackpotTicker: boolean;
  };
}
