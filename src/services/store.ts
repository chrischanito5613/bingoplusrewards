import {
  BingoPlusDatabase,
  BingoSite,
  ChatMessage,
  PushNotification,
  RedemptionVoucher,
  RewardItem,
  TierConfig,
  User,
  UserRole,
  ActivityLog,
  TraditionalJackpotBracket,
  EBGMachineVariant,
  PointMechanic,
} from '../types/bingoplus';

const STORAGE_KEY = 'bingoplus_unified_db_v4';
const SYNC_CHANNEL_NAME = 'bingoplus_cross_tab_sync';

export const BINGO_SITES: BingoSite[] = [
  {
    id: 'sm-lipa',
    name: 'BingoPlus SM Lipa',
    shortName: 'SM Lipa',
    city: 'Lipa City, Batangas',
    location: '2nd Level, SM City Lipa, Ayala Highway, Lipa City',
    contactNumber: '(043) 757-3801',
    managerName: 'Richard Tan',
    megaJackpot: 2845600,
    grandJackpot: 890450,
    majorJackpot: 245100,
    roundtop: {
      roundNumber: 42,
      ballCallTarget: 48,
      ballsDrawn: 36,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 68,
      totalMachines: 72,
      lastWonPrize: 154000,
      lastWinnerName: 'Elena V. (Card #304)',
      lastWonTime: '28 mins ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-lipa-1',
        title: 'Friday Mega Bonanza Draw',
        subtitle: '₱500,000 Guaranteed Cash Pot',
        description: 'Earn 2x raffle tickets for every ₱200 play. Exclusive to BingoPlus SM Lipa members.',
        tag: 'HIGH PRIZE',
        bannerGradient: 'from-purple-900 via-indigo-900 to-fuchsia-900',
        validPeriod: 'Valid this Friday 7:00 PM',
      },
      {
        id: 'p-lipa-2',
        title: 'Double Points Power Hour',
        subtitle: '2:00 PM - 5:00 PM Daily',
        description: 'Every ₱50 spent earns 2 points instead of 1 on all electronic roundtop machines.',
        tag: 'DAILY BOOST',
        bannerGradient: 'from-violet-900 via-purple-900 to-amber-900',
        validPeriod: 'Daily 2PM - 5PM',
      },
    ],
    activeAnnouncement: '🔥 Round 42 Roundtop Ball target: 48 balls! Current balls drawn: 36. Mega Jackpot at ₱2.84M!',
  },
  {
    id: 'sm-batangas',
    name: 'BingoPlus SM Batangas',
    shortName: 'SM Batangas',
    city: 'Batangas City',
    location: 'Ground Floor, SM City Batangas, Pallocan West, Batangas City',
    contactNumber: '(043) 723-8822',
    managerName: 'Eduardo Marasigan',
    megaJackpot: 3120400,
    grandJackpot: 940000,
    majorJackpot: 310500,
    roundtop: {
      roundNumber: 55,
      ballCallTarget: 50,
      ballsDrawn: 44,
      status: 'ROUNDTOP_ALERT',
      activeMachines: 82,
      totalMachines: 85,
      lastWonPrize: 210000,
      lastWinnerName: 'Ramon G. (Card #118)',
      lastWonTime: '1 hr ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-batangas-1',
        title: 'Batangueño Jackpot Fest',
        subtitle: 'Free ₱100 Play for First 50 Check-ins',
        description: 'Scan membership QR upon entry and receive instant promotional credit.',
        tag: 'FREE ENTRY',
        bannerGradient: 'from-purple-950 via-purple-800 to-indigo-950',
        validPeriod: 'Weekdays 10:00 AM - 12:00 PM',
      },
    ],
    activeAnnouncement: '🚨 ROUNDTOP ALERT! 6 balls left before jackpot cap at BingoPlus SM Batangas!',
  },
  {
    id: 'pacific-mall-legaspi',
    name: 'BingoPlus Pacific Mall Legaspi',
    shortName: 'Pacific Mall Legaspi',
    city: 'Legazpi City, Albay',
    location: '3rd Floor Entertainment Hub, Pacific Mall, Imperial St, Legazpi City',
    contactNumber: '(052) 480-1920',
    managerName: 'Arlene Bico',
    megaJackpot: 1980300,
    grandJackpot: 720500,
    majorJackpot: 185000,
    roundtop: {
      roundNumber: 38,
      ballCallTarget: 47,
      ballsDrawn: 28,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 54,
      totalMachines: 60,
      lastWonPrize: 98000,
      lastWinnerName: 'Felipe M. (Card #045)',
      lastWonTime: '45 mins ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-legaspi-1',
        title: 'Mayon Fireball Tournament',
        subtitle: '₱150,000 Total Prize Pool',
        description: 'Qualifying rounds open to Silver tier and above. Grand finals this Saturday.',
        tag: 'TOURNAMENT',
        bannerGradient: 'from-fuchsia-950 via-purple-900 to-red-950',
        validPeriod: 'This Saturday 4:00 PM',
      },
    ],
    activeAnnouncement: '🌋 Legazpi tournament registrations now open at the front desk or via player app.',
  },
  {
    id: 'mindoro',
    name: 'BingoPlus Mindoro',
    shortName: 'Mindoro',
    city: 'Calapan City, Oriental Mindoro',
    location: 'Commercial Wing, CityMall Calapan, J.P. Rizal St, Oriental Mindoro',
    contactNumber: '(043) 288-4411',
    managerName: 'Geronimo Cruz',
    megaJackpot: 1650900,
    grandJackpot: 580000,
    majorJackpot: 142000,
    roundtop: {
      roundNumber: 29,
      ballCallTarget: 49,
      ballsDrawn: 19,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 45,
      totalMachines: 50,
      lastWonPrize: 65000,
      lastWinnerName: 'Tessie P. (Card #221)',
      lastWonTime: '2 hrs ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-mindoro-1',
        title: 'Island Lucky Star Cashback',
        subtitle: '10% Rebate in Reward Points',
        description: 'Play any machine today and receive instant 10% points credit added to your card.',
        tag: 'CASHBACK',
        bannerGradient: 'from-purple-900 via-indigo-950 to-blue-950',
        validPeriod: 'Valid All Day Today',
      },
    ],
    activeAnnouncement: '⭐ Island Lucky Star rebate is active for all registered Mindoro members.',
  },
  {
    id: 'lemery',
    name: 'BingoPlus Lemery',
    shortName: 'Lemery',
    city: 'Lemery, Batangas',
    location: 'Xentro Mall Lemery, Ilustre Avenue, Lemery, Batangas',
    contactNumber: '(043) 409-1234',
    managerName: 'Melchor Ramos',
    megaJackpot: 1820500,
    grandJackpot: 640000,
    majorJackpot: 160000,
    roundtop: {
      roundNumber: 33,
      ballCallTarget: 48,
      ballsDrawn: 46,
      status: 'ROUNDTOP_ALERT',
      activeMachines: 50,
      totalMachines: 55,
      lastWonPrize: 112000,
      lastWinnerName: 'Liza D. (Card #087)',
      lastWonTime: '35 mins ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-lemery-1',
        title: 'Taal Heritage Mystery Draw',
        subtitle: 'Hourly Appliance & Voucher Giveaways',
        description: 'Every 50 attendance points qualifies for the hourly mystery chest.',
        tag: 'SPECIAL',
        bannerGradient: 'from-indigo-900 via-purple-900 to-amber-950',
        validPeriod: 'Sundays 1:00 PM - 8:00 PM',
      },
    ],
    activeAnnouncement: '💥 Lemery Roundtop ball count at 46! Next ball could hit the Major Jackpot!',
  },
  {
    id: 'aldp-naga',
    name: 'BingoPlus ALDP Naga',
    shortName: 'ALDP Naga',
    city: 'Naga City, Camarines Sur',
    location: 'ALDP Plaza Mall, Roxas Avenue, Brgy. Triangulo, Naga City',
    contactNumber: '(054) 881-3090',
    managerName: 'Teresa Cruz',
    megaJackpot: 2450800,
    grandJackpot: 810200,
    majorJackpot: 215000,
    roundtop: {
      roundNumber: 47,
      ballCallTarget: 48,
      ballsDrawn: 30,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 70,
      totalMachines: 75,
      lastWonPrize: 185000,
      lastWinnerName: 'Nestor B. (Card #156)',
      lastWonTime: '15 mins ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-naga-1',
        title: 'Peñafrancia Jackpot Splash',
        subtitle: 'Triple Points on Weekend Tournaments',
        description: 'Earn 3x reward points during all sanctioned Saturday session brackets.',
        tag: 'TRIPLE PTS',
        bannerGradient: 'from-purple-900 via-violet-900 to-pink-950',
        validPeriod: 'Weekends 1:00 PM - 9:00 PM',
      },
    ],
    activeAnnouncement: '🎉 Congratulations to Nestor B. for winning ₱185,000 on Round 46 at BingoPlus ALDP Naga!',
  },
  {
    id: 'nasugbu',
    name: 'BingoPlus Nasugbu',
    shortName: 'Nasugbu',
    city: 'Nasugbu, Batangas',
    location: 'Commercial Center, J.P. Laurel St, Poblacion, Nasugbu',
    contactNumber: '(043) 931-5020',
    managerName: 'Vicente Laurel',
    megaJackpot: 1540200,
    grandJackpot: 510000,
    majorJackpot: 135000,
    roundtop: {
      roundNumber: 26,
      ballCallTarget: 50,
      ballsDrawn: 22,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 40,
      totalMachines: 45,
      lastWonPrize: 52000,
      lastWinnerName: 'Cristina M. (Card #019)',
      lastWonTime: '3 hrs ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-nasugbu-1',
        title: 'Sunset Special Spin & Win',
        subtitle: 'Free Bingo Cards with ₱300 Token Purchase',
        description: 'Get 2 bonus cards ready for the 5:30 PM Sunset Roundtop.',
        tag: 'BONUS CARDS',
        bannerGradient: 'from-purple-950 via-indigo-900 to-orange-950',
        validPeriod: 'Daily 4:00 PM - 6:00 PM',
      },
    ],
    activeAnnouncement: '🌅 Sunset Special Spin starts in 45 minutes at BingoPlus Nasugbu.',
  },
  {
    id: 'masbate',
    name: 'BingoPlus Masbate',
    shortName: 'Masbate',
    city: 'Masbate City',
    location: 'Gaisano Capital Masbate, Zurbito St, Masbate City',
    contactNumber: '(056) 333-2810',
    managerName: 'Danilo Medina',
    megaJackpot: 1720000,
    grandJackpot: 620000,
    majorJackpot: 148000,
    roundtop: {
      roundNumber: 31,
      ballCallTarget: 48,
      ballsDrawn: 38,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 48,
      totalMachines: 52,
      lastWonPrize: 76000,
      lastWinnerName: 'Rowena T. (Card #102)',
      lastWonTime: '50 mins ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-masbate-1',
        title: 'Rodeo City High Roller Pass',
        subtitle: 'Exclusive VIP Lounge Perks',
        description: 'Complimentary drinks, snacks, and 1.5x points multiplier for Gold members.',
        tag: 'VIP ACCESS',
        bannerGradient: 'from-purple-950 via-violet-950 to-amber-900',
        validPeriod: 'Daily All Sessions',
      },
    ],
    activeAnnouncement: '🤠 Welcome Masbate players! Check in at counter 1 for attendance rewards.',
  },
  {
    id: 'isabang',
    name: 'BingoPlus Isabang',
    shortName: 'Isabang',
    city: 'Lucena / Isabang, Quezon',
    location: 'Lucena Grand Central Hub, Maharlika Highway, Brgy. Isabang, Lucena City',
    contactNumber: '(042) 710-9400',
    managerName: 'Rosario Alcala',
    megaJackpot: 2150700,
    grandJackpot: 780000,
    majorJackpot: 195000,
    roundtop: {
      roundNumber: 40,
      ballCallTarget: 48,
      ballsDrawn: 40,
      status: 'BALL_DRAW_ACTIVE',
      activeMachines: 62,
      totalMachines: 66,
      lastWonPrize: 140000,
      lastWinnerName: 'Joselito C. (Card #331)',
      lastWonTime: '1 hr ago',
      updatedAt: new Date().toISOString(),
    },
    promos: [
      {
        id: 'p-isabang-1',
        title: 'Niyogyugan Harvest Cash Pot',
        subtitle: 'Guaranteed ₱200,000 Major Round',
        description: 'Every token purchase above ₱500 grants automatic entry to the harvest raffle.',
        tag: 'BIG POT',
        bannerGradient: 'from-purple-950 via-purple-900 to-emerald-950',
        validPeriod: 'Thursdays & Sundays 6:00 PM',
      },
    ],
    activeAnnouncement: '🥥 Harvest Cash Pot round set to trigger at 6:00 PM tonight at BingoPlus Isabang!',
  },
];

export const TIER_CONFIGS: TierConfig[] = [
  {
    id: 'BRONZE',
    name: 'Bronze Member',
    minSpend: 0,
    pointMultiplier: 1.0,
    color: '#cd7f32',
    badgeBg: 'bg-amber-900/40 text-amber-300 border-amber-700/50',
    perks: ['Standard 1pt / ₱50 spend', 'Daily attendance 50 pts', 'Access to branch group chat', 'Birthday bonus 200 pts'],
  },
  {
    id: 'SILVER',
    name: 'Silver Member',
    minSpend: 15000,
    pointMultiplier: 1.25,
    color: '#94a3b8',
    badgeBg: 'bg-slate-700/50 text-slate-200 border-slate-500/50',
    perks: ['1.25x point multiplier', 'Priority attendance lane', 'Access to weekly branch tournaments', '5% discount on reward redemption'],
  },
  {
    id: 'GOLD',
    name: 'Gold Member',
    minSpend: 50000,
    pointMultiplier: 1.5,
    color: '#eab308',
    badgeBg: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    perks: ['1.5x point multiplier', 'Reserved machine seating', 'Invitations to Grand Jackpot nights', '10% discount on reward redemption', 'Free beverage voucher'],
  },
  {
    id: 'PLATINUM',
    name: 'Platinum Elite',
    minSpend: 150000,
    pointMultiplier: 2.0,
    color: '#c084fc',
    badgeBg: 'bg-purple-600/30 text-purple-300 border-purple-500/60',
    perks: ['2.0x point multiplier', 'Dedicated branch VIP host', 'Express redemption instant pickup', 'Exclusive monthly cashback raffle', 'Free valet & snack bar'],
  },
  {
    id: 'DIAMOND_VIP',
    name: 'Diamond VIP',
    minSpend: 350000,
    pointMultiplier: 3.0,
    color: '#38bdf8',
    badgeBg: 'bg-cyan-500/30 text-cyan-300 border-cyan-400/60',
    perks: ['3.0x point multiplier', 'Network-wide VIP access across all 9 sites', 'Instant high-roller voucher clearance', 'Invitations to annual Vegas/Macau holiday draws', 'Direct line to Branch General Manager'],
  },
];

export const INITIAL_USERS: User[] = [
  // Players
  {
    id: 'usr-maria-lipa',
    username: 'maria_lipa',
    password: 'password123',
    fullName: 'Maria Santos-Reyes',
    email: 'maria.santos@gmail.com',
    phone: '0917-889-2144',
    role: 'PLAYER',
    registeredSiteId: 'sm-lipa',
    tier: 'SILVER',
    pointsBalance: 2450,
    lifetimePoints: 8900,
    totalSpend: 28500,
    attendanceStreak: 12,
    lastAttendanceDate: new Date().toISOString().split('T')[0],
    memberSince: '2025-04-12',
    qrCodeData: 'BP-MEMBER:usr-maria-lipa:sm-lipa:SILVER',
    status: 'ACTIVE',
  },
  {
    id: 'usr-juan-legaspi',
    username: 'juan_legaspi',
    password: 'password123',
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@yahoo.com',
    phone: '0920-555-8912',
    role: 'PLAYER',
    registeredSiteId: 'pacific-mall-legaspi',
    tier: 'GOLD',
    pointsBalance: 5820,
    lifetimePoints: 19400,
    totalSpend: 74000,
    attendanceStreak: 18,
    lastAttendanceDate: new Date().toISOString().split('T')[0],
    memberSince: '2024-11-03',
    qrCodeData: 'BP-MEMBER:usr-juan-legaspi:pacific-mall-legaspi:GOLD',
    status: 'ACTIVE',
  },
  {
    id: 'usr-carlo-batangas',
    username: 'carlo_batangas',
    password: 'password123',
    fullName: 'Carlo Mendoza',
    email: 'carlo.m@outlook.com',
    phone: '0918-321-4477',
    role: 'PLAYER',
    registeredSiteId: 'sm-batangas',
    tier: 'BRONZE',
    pointsBalance: 850,
    lifetimePoints: 1200,
    totalSpend: 6500,
    attendanceStreak: 4,
    lastAttendanceDate: new Date().toISOString().split('T')[0],
    memberSince: '2026-01-15',
    qrCodeData: 'BP-MEMBER:usr-carlo-batangas:sm-batangas:BRONZE',
    status: 'ACTIVE',
  },
  {
    id: 'usr-grace-mindoro',
    username: 'grace_mindoro',
    password: 'password123',
    fullName: 'Grace Alcantara',
    email: 'grace.alcantara@gmail.com',
    phone: '0999-777-1234',
    role: 'PLAYER',
    registeredSiteId: 'mindoro',
    tier: 'PLATINUM',
    pointsBalance: 14200,
    lifetimePoints: 42000,
    totalSpend: 195000,
    attendanceStreak: 25,
    lastAttendanceDate: new Date().toISOString().split('T')[0],
    memberSince: '2024-06-20',
    qrCodeData: 'BP-MEMBER:usr-grace-mindoro:mindoro:PLATINUM',
    status: 'ACTIVE',
  },
  // Staff
  {
    id: 'stf-angelo-lipa',
    username: 'staff_lipa',
    password: 'password123',
    fullName: 'Angelo Dimaano',
    email: 'angelo.d@bingoplus.com.ph',
    phone: '0927-111-9988',
    role: 'STAFF',
    registeredSiteId: 'sm-lipa',
    assignedSiteId: 'sm-lipa',
    tier: 'BRONZE',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2024-01-10',
    qrCodeData: 'BP-STAFF:stf-angelo-lipa:sm-lipa',
    status: 'ACTIVE',
  },
  {
    id: 'stf-bea-batangas',
    username: 'staff_batangas',
    password: 'password123',
    fullName: 'Beatriz Hernandez',
    email: 'beatriz.h@bingoplus.com.ph',
    phone: '0928-333-7722',
    role: 'STAFF',
    registeredSiteId: 'sm-batangas',
    assignedSiteId: 'sm-batangas',
    tier: 'BRONZE',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2024-03-15',
    qrCodeData: 'BP-STAFF:stf-bea-batangas:sm-batangas',
    status: 'ACTIVE',
  },
  // Branch Managers
  {
    id: 'mgr-richard-lipa',
    username: 'manager_lipa',
    password: 'password123',
    fullName: 'Mgr. Richard Tan',
    email: 'richard.tan@bingoplus.com.ph',
    phone: '0917-100-2000',
    role: 'BRANCH_MANAGER',
    registeredSiteId: 'sm-lipa',
    assignedSiteId: 'sm-lipa',
    tier: 'DIAMOND_VIP',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2023-08-01',
    qrCodeData: 'BP-MGR:mgr-richard-lipa:sm-lipa',
    status: 'ACTIVE',
  },
  {
    id: 'mgr-teresa-naga',
    username: 'manager_naga',
    password: 'password123',
    fullName: 'Mgr. Teresa Cruz',
    email: 'teresa.cruz@bingoplus.com.ph',
    phone: '0917-300-4000',
    role: 'BRANCH_MANAGER',
    registeredSiteId: 'aldp-naga',
    assignedSiteId: 'aldp-naga',
    tier: 'DIAMOND_VIP',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2023-09-15',
    qrCodeData: 'BP-MGR:mgr-teresa-naga:aldp-naga',
    status: 'ACTIVE',
  },
  // Admin & Superuser
  {
    id: 'adm-sofia-hq',
    username: 'admin_gaming',
    password: 'password123',
    fullName: 'Admin Sofia De Leon',
    email: 'sofia.deleon@bingoplus.com.ph',
    phone: '0917-999-5500',
    role: 'ADMIN',
    registeredSiteId: 'sm-lipa',
    tier: 'DIAMOND_VIP',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2023-01-01',
    qrCodeData: 'BP-ADMIN:adm-sofia-hq:ALL',
    status: 'ACTIVE',
  },
  {
    id: 'spu-vic-hq',
    username: 'superuser_hq',
    password: 'password123',
    fullName: 'Superuser Vic Sotto-Corpuz',
    email: 'vic.corpuz@bingoplus.com.ph',
    phone: '0917-000-0001',
    role: 'SUPERUSER',
    registeredSiteId: 'sm-lipa',
    tier: 'DIAMOND_VIP',
    pointsBalance: 0,
    lifetimePoints: 0,
    totalSpend: 0,
    attendanceStreak: 0,
    memberSince: '2022-10-01',
    qrCodeData: 'BP-SUPERUSER:spu-vic-hq:ALL',
    status: 'ACTIVE',
  },
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'rew-freeplay-500',
    title: 'BingoPlus ₱500 Free Play Gaming Credits',
    category: 'VOUCHER',
    pointsCost: 500,
    description: 'Directly redeemable at the counter for ₱500 worth of electronic bingo credits or roundtop cards.',
    estimatedPhpValue: 500,
    iconName: 'Ticket',
    badgeText: 'MOST POPULAR',
    minTier: 'BRONZE',
    stockPerSite: {
      'sm-lipa': 45,
      'sm-batangas': 50,
      'pacific-mall-legaspi': 30,
      'mindoro': 25,
      'lemery': 20,
      'aldp-naga': 40,
      'nasugbu': 18,
      'masbate': 22,
      'isabang': 35,
    },
  },
  {
    id: 'rew-freeplay-1000',
    title: 'BingoPlus ₱1,000 Free Play Gaming Credits',
    category: 'VOUCHER',
    pointsCost: 950,
    description: 'Best point-to-peso value! Redeemable for ₱1,000 credit across any electronic bingo terminals.',
    estimatedPhpValue: 1000,
    iconName: 'Coins',
    badgeText: '50 PTS BONUS VALUE',
    minTier: 'BRONZE',
    stockPerSite: {
      'sm-lipa': 30,
      'sm-batangas': 35,
      'pacific-mall-legaspi': 20,
      'mindoro': 15,
      'lemery': 14,
      'aldp-naga': 28,
      'nasugbu': 12,
      'masbate': 15,
      'isabang': 25,
    },
  },
  {
    id: 'rew-rice-25kg',
    title: 'Premium Jasmine Rice 25kg Sack',
    category: 'GROCERY',
    pointsCost: 1250,
    description: 'High grade 100% whole grain aromatic jasmine rice. Freshly stocked at on-site branch retail hub.',
    estimatedPhpValue: 1350,
    iconName: 'ShoppingBag',
    badgeText: 'HOUSEHOLD FAVORITE',
    minTier: 'BRONZE',
    stockPerSite: {
      'sm-lipa': 18,
      'sm-batangas': 22,
      'pacific-mall-legaspi': 14,
      'mindoro': 12,
      'lemery': 9,
      'aldp-naga': 16,
      'nasugbu': 8,
      'masbate': 10,
      'isabang': 15,
    },
  },
  {
    id: 'rew-puregold-2000',
    title: 'Puregold ₱2,000 Grocery Gift Certificate',
    category: 'GROCERY',
    pointsCost: 1950,
    description: 'Accepted nationwide at all Puregold supermarket branches for all household goods and food.',
    estimatedPhpValue: 2000,
    iconName: 'CreditCard',
    badgeText: 'GUARANTEED ACCEPTANCE',
    minTier: 'SILVER',
    stockPerSite: {
      'sm-lipa': 12,
      'sm-batangas': 15,
      'pacific-mall-legaspi': 8,
      'mindoro': 7,
      'lemery': 6,
      'aldp-naga': 10,
      'nasugbu': 5,
      'masbate': 6,
      'isabang': 9,
    },
  },
  {
    id: 'rew-merch-jacket',
    title: 'BingoPlus VIP Gold Crest Bomber Jacket',
    category: 'MERCHANDISE',
    pointsCost: 1600,
    description: 'Limited edition high-density embroidered water-resistant bomber jacket with royal purple satin lining.',
    estimatedPhpValue: 1800,
    iconName: 'Shirt',
    badgeText: 'LIMITED EDITION',
    minTier: 'SILVER',
    stockPerSite: {
      'sm-lipa': 8,
      'sm-batangas': 10,
      'pacific-mall-legaspi': 6,
      'mindoro': 4,
      'lemery': 5,
      'aldp-naga': 7,
      'nasugbu': 3,
      'masbate': 4,
      'isabang': 6,
    },
  },
  {
    id: 'rew-airfryer',
    title: 'Philips Digital Air Fryer 4.1L Compact',
    category: 'APPLIANCE',
    pointsCost: 3400,
    description: 'Rapid Air technology for crisp healthy cooking with touch digital preset menus and easy clean basket.',
    estimatedPhpValue: 3990,
    iconName: 'Flame',
    badgeText: 'HOT ITEM',
    minTier: 'SILVER',
    stockPerSite: {
      'sm-lipa': 5,
      'sm-batangas': 6,
      'pacific-mall-legaspi': 4,
      'mindoro': 3,
      'lemery': 2,
      'aldp-naga': 4,
      'nasugbu': 2,
      'masbate': 2,
      'isabang': 4,
    },
  },
  {
    id: 'rew-powerbank-20k',
    title: 'Anker PowerCore 20,000mAh Dual Fast Charge',
    category: 'ELECTRONICS',
    pointsCost: 850,
    description: 'Massive capacity battery pack, fast charge phones up to 4.5 times during your bingo gaming sessions.',
    estimatedPhpValue: 1200,
    iconName: 'BatteryCharging',
    badgeText: 'GAMING ESSENTIAL',
    minTier: 'BRONZE',
    stockPerSite: {
      'sm-lipa': 15,
      'sm-batangas': 18,
      'pacific-mall-legaspi': 10,
      'mindoro': 8,
      'lemery': 7,
      'aldp-naga': 12,
      'nasugbu': 6,
      'masbate': 7,
      'isabang': 11,
    },
  },
  {
    id: 'rew-samsung-tab',
    title: 'Samsung Galaxy Tab A9 64GB Silver',
    category: 'ELECTRONICS',
    pointsCost: 6800,
    description: '8.7-inch immersive screen with Dolby Atmos audio and 5100mAh all-day battery. Brand new in sealed box.',
    estimatedPhpValue: 7990,
    iconName: 'Tablet',
    badgeText: 'PREMIUM TECH',
    minTier: 'GOLD',
    stockPerSite: {
      'sm-lipa': 3,
      'sm-batangas': 4,
      'pacific-mall-legaspi': 2,
      'mindoro': 2,
      'lemery': 1,
      'aldp-naga': 3,
      'nasugbu': 1,
      'masbate': 1,
      'isabang': 2,
    },
  },
  {
    id: 'rew-tv-43',
    title: 'TCL 43-Inch 4K UHD Smart Google TV',
    category: 'APPLIANCE',
    pointsCost: 13500,
    description: 'HDR10 crystal display with built-in Netflix, YouTube, Bluetooth and HDMI ports. Available for claim on site.',
    estimatedPhpValue: 14999,
    iconName: 'Tv',
    badgeText: 'GRAND REWARD',
    minTier: 'GOLD',
    stockPerSite: {
      'sm-lipa': 2,
      'sm-batangas': 2,
      'pacific-mall-legaspi': 1,
      'mindoro': 1,
      'lemery': 1,
      'aldp-naga': 2,
      'nasugbu': 1,
      'masbate': 1,
      'isabang': 2,
    },
  },
  {
    id: 'rew-raffle-ticket',
    title: 'Honda Click 125i Grand Raffle Draw Ticket',
    category: 'VOUCHER',
    pointsCost: 200,
    description: 'Single lucky entry for the quarterly network-wide Brand New Motorcycle giveaway raffle draw.',
    estimatedPhpValue: 200,
    iconName: 'Sparkles',
    badgeText: 'WIN A MOTORCYCLE',
    minTier: 'BRONZE',
    stockPerSite: {
      'sm-lipa': 150,
      'sm-batangas': 200,
      'pacific-mall-legaspi': 120,
      'mindoro': 90,
      'lemery': 80,
      'aldp-naga': 130,
      'nasugbu': 70,
      'masbate': 85,
      'isabang': 110,
    },
    isRedeemable: true,
  },
];

export const INITIAL_MECHANICS: PointMechanic[] = [
  {
    id: 'mech-attendance-checkin',
    title: 'Daily Attendance QR Check-In Bonus',
    category: 'POINTS_EARNING',
    pointsValue: 25,
    spendRatePhp: 0,
    description: 'Instant points awarded upon scanning player membership QR code at the reception counter during hall check-in.',
    conditions: 'Limited to 1 check-in per member per calendar day across all 9 branches.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
  {
    id: 'mech-terminal-spend',
    title: 'Electronic Bingo & Concession Spend Rate',
    category: 'POINTS_EARNING',
    pointsValue: 1,
    spendRatePhp: 50,
    description: 'Earn 1 point for every ₱50 spent on Electronic Bingo (EBG) machines, traditional cards, or on-site concessions.',
    conditions: 'Credited automatically upon purchase or counter QR scan.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
  {
    id: 'mech-tournament-bracket',
    title: 'Tournament Match Placement & Champion Bonus',
    category: 'POINTS_EARNING',
    pointsValue: 300,
    spendRatePhp: 0,
    description: 'Special points awarded to qualifying players and bracket champions during weekly branch tournament showdowns.',
    conditions: 'Validated by referee or branch manager on duty.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'BRANCH_MANAGER',
  },
  {
    id: 'mech-double-happy-hour',
    title: 'Daily Double Points Happy Hour Boost',
    category: 'PROMO_MULTIPLIER',
    pointsValue: 2,
    spendRatePhp: 50,
    description: '2x Point Multiplier active daily from 2:00 PM to 5:00 PM on all EBG machines and roundtop games.',
    conditions: 'Active across all participating halls during peak afternoon sessions.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'BRANCH_MANAGER',
  },
  {
    id: 'mech-trad-buyin',
    title: 'Traditional Bingo 5-Card Buy-In Bonus',
    category: 'POINTS_EARNING',
    pointsValue: 10,
    spendRatePhp: 100,
    description: 'Earn an additional 10 bonus points for every bundle purchase of 5 or more Traditional Bingo cards in a single session.',
    conditions: 'Applies to paper card purchases at traditional bingo counters.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
  {
    id: 'mech-counter-claim-id',
    title: 'Physical Goods Front Counter Verification',
    category: 'CATALOGUE_RULE',
    pointsValue: 0,
    description: 'Physical rewards (Appliances, Rice Sacks, Tech) must be claimed in person at the branch front counter with digital voucher QR and valid government ID.',
    conditions: 'Must be claimed within 7 calendar days from redemption voucher issuance.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
  {
    id: 'mech-tier-exclusivity',
    title: 'Tier Exclusivity for Major Appliances & Tech',
    category: 'CATALOGUE_RULE',
    pointsValue: 0,
    description: 'Redemption of premium appliances (e.g. Smart TV, Air Fryer) and high-end electronics requires Silver Tier or higher membership standing.',
    conditions: 'Validated by system during voucher generation.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
  {
    id: 'mech-voucher-validity',
    title: 'Gaming Credit Digital Voucher Expiry (30 Days)',
    category: 'CATALOGUE_RULE',
    pointsValue: 0,
    description: 'Digital vouchers generated for free play gaming credits remain valid for 30 calendar days from issuance.',
    conditions: 'Non-transferable; one-time redemption per voucher code.',
    applicableSiteId: 'ALL',
    isEnabled: true,
    updatedAt: new Date().toISOString(),
    updatedBy: 'SUPERUSER',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  // SM Lipa Chat
  {
    id: 'msg-lipa-1',
    siteId: 'sm-lipa',
    senderId: 'mgr-richard-lipa',
    senderName: 'Mgr. Richard Tan',
    senderRole: 'BRANCH_MANAGER',
    text: 'Good afternoon, BingoPlus SM Lipa patrons! Round 42 is now ongoing. Roundtop target is set at 48 balls. Best of luck to everyone in the hall!',
    timestamp: '15 mins ago',
    isOfficialAnnouncement: true,
    isPinned: true,
  },
  {
    id: 'msg-lipa-2',
    siteId: 'sm-lipa',
    senderId: 'usr-maria-lipa',
    senderName: 'Maria Santos-Reyes',
    senderRole: 'PLAYER',
    senderTier: 'SILVER',
    text: 'Grabe yung Major pot lapit na tamaan! Sino po nasa terminal 14 to 20?',
    timestamp: '11 mins ago',
  },
  {
    id: 'msg-lipa-3',
    siteId: 'sm-lipa',
    senderId: 'stf-angelo-lipa',
    senderName: 'Angelo Dimaano (Staff)',
    senderRole: 'STAFF',
    text: 'Hi Maam Maria! Terminal 18 has an active streak. Reminder that double points promo runs until 5:00 PM today. Feel free to present your QR at the counter to claim points!',
    timestamp: '8 mins ago',
  },
  {
    id: 'msg-lipa-4',
    siteId: 'sm-lipa',
    senderId: 'usr-maria-lipa',
    senderName: 'Maria Santos-Reyes',
    senderRole: 'PLAYER',
    senderTier: 'SILVER',
    text: 'Salamat Angelo! Otw na mag pa add ng attendance at purchase points.',
    timestamp: '4 mins ago',
  },

  // SM Batangas Chat
  {
    id: 'msg-btg-1',
    siteId: 'sm-batangas',
    senderId: 'stf-bea-batangas',
    senderName: 'Beatriz Hernandez (Staff)',
    senderRole: 'STAFF',
    text: 'Welcome to BingoPlus SM Batangas Live Hub! Front counter 2 is open for instant QR check-ins and reward claim pickups.',
    timestamp: '25 mins ago',
    isOfficialAnnouncement: true,
  },
  {
    id: 'msg-btg-2',
    siteId: 'sm-batangas',
    senderId: 'usr-carlo-batangas',
    senderName: 'Carlo Mendoza',
    senderRole: 'PLAYER',
    senderTier: 'BRONZE',
    text: 'Sir may stock pa po ba ng Jasmine Rice 25kg sa reward counter natin?',
    timestamp: '14 mins ago',
  },
  {
    id: 'msg-btg-3',
    siteId: 'sm-batangas',
    senderId: 'stf-bea-batangas',
    senderName: 'Beatriz Hernandez (Staff)',
    senderRole: 'STAFF',
    text: 'Yes Sir Carlo! 22 sacks available in our stock room today. You can redeem on your app and show the voucher QR at counter 2.',
    timestamp: '10 mins ago',
  },

  // Pacific Mall Legaspi Chat
  {
    id: 'msg-leg-1',
    siteId: 'pacific-mall-legaspi',
    senderId: 'usr-juan-legaspi',
    senderName: 'Juan Dela Cruz',
    senderRole: 'PLAYER',
    senderTier: 'GOLD',
    text: 'Magandang araw mga taga-Legaspi! Handang handa na para sa Mayon Fireball tournament bukas.',
    timestamp: '32 mins ago',
  },
  {
    id: 'msg-leg-2',
    siteId: 'pacific-mall-legaspi',
    senderId: 'adm-sofia-hq',
    senderName: 'Admin Sofia De Leon',
    senderRole: 'ADMIN',
    text: 'Tournament brackets will be finalized by 3:00 PM tomorrow. All Gold & Platinum members will receive bonus 200 warmup points upon entry.',
    timestamp: '20 mins ago',
    isOfficialAnnouncement: true,
  },
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: '🔥 ₱2.84 Million Mega Jackpot Alert!',
    body: 'The Mega Jackpot at BingoPlus SM Lipa is climbing rapidly. Roundtop ball count target is 48 balls!',
    targetSiteId: 'sm-lipa',
    targetSiteName: 'BingoPlus SM Lipa',
    sentAt: 'Today at 2:15 PM',
    senderName: 'HQ System Operations',
    category: 'JACKPOT',
    readByUsers: [],
  },
  {
    id: 'notif-2',
    title: '🎁 2x Points Daily Power Hour is Active!',
    body: 'Earn double reward points on all electronic bingo play between 2:00 PM and 5:00 PM today.',
    targetSiteId: 'ALL',
    targetSiteName: 'All 9 BingoPlus Branches',
    sentAt: 'Today at 1:45 PM',
    senderName: 'Branch Promotions Team',
    category: 'PROMO',
    readByUsers: [],
  },
  {
    id: 'notif-3',
    title: '🏆 Saturday Mayon Fireball Tournament',
    body: 'Registration is now open for Gold & Platinum members at BingoPlus Pacific Mall Legaspi.',
    targetSiteId: 'pacific-mall-legaspi',
    targetSiteName: 'BingoPlus Pacific Mall Legaspi',
    sentAt: 'Yesterday at 5:00 PM',
    senderName: 'Legaspi Events Desk',
    category: 'EVENT',
    readByUsers: [],
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-101',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    siteId: 'sm-lipa',
    siteName: 'BingoPlus SM Lipa',
    userId: 'usr-maria-lipa',
    userName: 'Maria Santos-Reyes',
    userTier: 'SILVER',
    staffId: 'stf-angelo-lipa',
    staffName: 'Angelo Dimaano',
    type: 'ATTENDANCE',
    pointsDelta: 50,
    notes: 'Daily verified attendance check-in (Day 12 streak)',
  },
  {
    id: 'log-102',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    siteId: 'sm-batangas',
    siteName: 'BingoPlus SM Batangas',
    userId: 'usr-carlo-batangas',
    userName: 'Carlo Mendoza',
    userTier: 'BRONZE',
    staffId: 'stf-bea-batangas',
    staffName: 'Beatriz Hernandez',
    type: 'PURCHASE',
    pointsDelta: 40,
    purchaseAmount: 2000,
    notes: 'Machine credits purchase ₱2,000 (1pt per ₱50)',
  },
  {
    id: 'log-103',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    siteId: 'pacific-mall-legaspi',
    siteName: 'BingoPlus Pacific Mall Legaspi',
    userId: 'usr-juan-legaspi',
    userName: 'Juan Dela Cruz',
    userTier: 'GOLD',
    type: 'TOURNAMENT_WIN',
    pointsDelta: 500,
    notes: '2nd Place Runner-Up - Albay Fast-Ball Bracket',
  },
  {
    id: 'log-104',
    timestamp: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    siteId: 'mindoro',
    siteName: 'BingoPlus Mindoro',
    userId: 'usr-grace-mindoro',
    userName: 'Grace Alcantara',
    userTier: 'PLATINUM',
    type: 'PURCHASE',
    pointsDelta: 300,
    purchaseAmount: 7500,
    notes: 'VIP card reload ₱7,500 (2x Platinum multiplier applied)',
  },
];

// Seed sample redemption vouchers
export const INITIAL_VOUCHERS: RedemptionVoucher[] = [
  {
    id: 'vch-1001',
    voucherCode: 'BP-VCH-882194',
    userId: 'usr-maria-lipa',
    userName: 'Maria Santos-Reyes',
    userSiteId: 'sm-lipa',
    rewardId: 'rew-freeplay-500',
    rewardTitle: 'BingoPlus ₱500 Free Play Gaming Credits',
    pointsCost: 500,
    status: 'PENDING_SCAN',
    createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
  },
  {
    id: 'vch-1002',
    voucherCode: 'BP-VCH-449102',
    userId: 'usr-juan-legaspi',
    userName: 'Juan Dela Cruz',
    userSiteId: 'pacific-mall-legaspi',
    rewardId: 'rew-rice-25kg',
    rewardTitle: 'Premium Jasmine Rice 25kg Sack',
    pointsCost: 1250,
    status: 'CLAIMED',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    claimedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    claimedByStaffId: 'adm-sofia-hq',
    claimedAtSiteId: 'pacific-mall-legaspi',
  },
];

export const createDefaultTraditionalBrackets = (baseGrand: number): TraditionalJackpotBracket[] => [
  {
    id: 'tjb-1',
    gamePattern: 'Grand Coverall / Blackout',
    minBalls: 1,
    maxBalls: 48,
    prizeAmount: baseGrand,
    consolationPrize: Math.round(baseGrand * 0.05),
    isActive: true,
    notes: 'Hit Coverall pattern on or before 48th ball draw',
  },
  {
    id: 'tjb-2',
    gamePattern: 'Tier 2 Coverall (49-50 Balls)',
    minBalls: 49,
    maxBalls: 50,
    prizeAmount: Math.round(baseGrand * 0.4),
    consolationPrize: Math.round(baseGrand * 0.03),
    isActive: true,
    notes: 'Coverall hit exactly on ball 49 or 50',
  },
  {
    id: 'tjb-3',
    gamePattern: 'Tier 3 Coverall (51-52 Balls)',
    minBalls: 51,
    maxBalls: 52,
    prizeAmount: Math.round(baseGrand * 0.2),
    consolationPrize: Math.round(baseGrand * 0.02),
    isActive: true,
    notes: 'Coverall hit exactly on ball 51 or 52',
  },
  {
    id: 'tjb-4',
    gamePattern: 'Tier 4 Coverall (53-54 Balls)',
    minBalls: 53,
    maxBalls: 54,
    prizeAmount: Math.round(baseGrand * 0.1),
    consolationPrize: Math.round(baseGrand * 0.01),
    isActive: true,
    notes: 'Coverall hit on ball 53 or 54',
  },
  {
    id: 'tjb-5',
    gamePattern: 'Consolation House Prize (55+ Balls)',
    minBalls: 55,
    maxBalls: 75,
    prizeAmount: 15000,
    isActive: true,
    notes: 'Guaranteed payout to winning card after ball 55',
  },
];

export const createDefaultEBGVariants = (siteCode: string): EBGMachineVariant[] => [
  {
    id: `ebg-${siteCode}-1`,
    name: 'Dragon Fortune Link',
    code: 'DFL-01',
    type: 'COMMUNITY_LINK',
    roundtopAmount: 85000,
    progressiveJackpot: 450000,
    ballCeiling: 48,
    currentBallsDrawn: 36,
    activeCabinets: 18,
    totalCabinets: 20,
    isEnabled: true,
    status: 'ACTIVE',
  },
  {
    id: `ebg-${siteCode}-2`,
    name: 'Super Ball Bingo 88',
    code: 'SBB-88',
    type: 'CLASSIC_EBG',
    roundtopAmount: 62000,
    progressiveJackpot: 320000,
    ballCeiling: 50,
    currentBallsDrawn: 44,
    activeCabinets: 16,
    totalCabinets: 16,
    isEnabled: true,
    status: 'ROUNDTOP_CALL',
  },
  {
    id: `ebg-${siteCode}-3`,
    name: 'Mega Lightning Royale',
    code: 'MLR-09',
    type: 'PROGRESSIVE',
    roundtopAmount: 115000,
    progressiveJackpot: 620000,
    ballCeiling: 47,
    currentBallsDrawn: 28,
    activeCabinets: 14,
    totalCabinets: 15,
    isEnabled: true,
    status: 'ACTIVE',
  },
  {
    id: `ebg-${siteCode}-4`,
    name: 'Color Ball Deluxe 4-Card',
    code: 'CBD-04',
    type: 'MULTI_CARD',
    roundtopAmount: 48000,
    progressiveJackpot: 185000,
    ballCeiling: 52,
    currentBallsDrawn: 20,
    activeCabinets: 10,
    totalCabinets: 12,
    isEnabled: false,
    status: 'STANDBY',
  },
];

export function getInitialDatabase(): BingoPlusDatabase {
  const initializedSites = BINGO_SITES.map((site) => ({
    ...site,
    traditionalJackpots: site.traditionalJackpots || createDefaultTraditionalBrackets(site.megaJackpot > 2000000 ? 1000000 : 750000),
    ebgVariants: site.ebgVariants || createDefaultEBGVariants(site.id),
  }));

  return {
    sites: initializedSites,
    users: INITIAL_USERS,
    rewards: INITIAL_REWARDS,
    vouchers: INITIAL_VOUCHERS,
    logs: INITIAL_ACTIVITY_LOGS,
    chatMessages: INITIAL_CHAT_MESSAGES,
    notifications: INITIAL_NOTIFICATIONS,
    tierConfigs: TIER_CONFIGS,
    mechanics: INITIAL_MECHANICS,
    systemSettings: {
      defaultAttendancePoints: 50,
      purchasePointsRate: 50, // ₱50 spend = 1 pt standard
      autoJackpotTicker: true,
    },
  };
}

class BingoPlusStoreManager {
  private state: BingoPlusDatabase;
  private listeners: Set<() => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  private currentUserId: string = 'usr-maria-lipa'; // Default demo user: Maria Santos at SM Lipa

  constructor() {
    this.state = this.loadDatabase();

    if (typeof window !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'SYNC_STATE') {
            this.state = this.loadDatabase();
            this.notify();
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported', e);
      }

      window.addEventListener('storage', (event) => {
        if (event.key === STORAGE_KEY) {
          this.state = this.loadDatabase();
          this.notify();
        }
      });

      // Subtle realistic Jackpot ticker simulation
      setInterval(() => {
        if (this.state.systemSettings.autoJackpotTicker) {
          this.tickJackpots();
        }
      }, 5000);
    }
  }

  private loadDatabase(): BingoPlusDatabase {
    if (typeof window === 'undefined') return getInitialDatabase();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.sites) && parsed.sites.length === 9) {
          if (!parsed.mechanics || !Array.isArray(parsed.mechanics) || parsed.mechanics.length === 0) {
            parsed.mechanics = INITIAL_MECHANICS;
          }
          if (Array.isArray(parsed.rewards)) {
            parsed.rewards = parsed.rewards.map((r: any) => ({
              ...r,
              isRedeemable: r.isRedeemable !== undefined ? r.isRedeemable : true,
            }));
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse database from localStorage', e);
    }
    const initial = getInitialDatabase();
    this.saveDatabase(initial);
    return initial;
  }

  private saveDatabase(data: BingoPlusDatabase) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.broadcastChannel?.postMessage({ type: 'SYNC_STATE', timestamp: Date.now() });
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): BingoPlusDatabase {
    return this.state;
  }

  public getCurrentUserId(): string {
    return this.currentUserId;
  }

  public setCurrentUserId(userId: string) {
    this.currentUserId = userId;
    this.notify();
  }

  public getCurrentUser(): User | undefined {
    return this.state.users.find((u) => u.id === this.currentUserId);
  }

  private tickJackpots() {
    // Subtle increments to simulate real-time live gaming activity across sites
    let changed = false;
    const newSites = this.state.sites.map((site) => {
      const incrementMega = Math.floor(Math.random() * 8) + 1; // ₱1 - ₱8
      const incrementGrand = Math.floor(Math.random() * 4) + 1;
      const incrementMajor = Math.floor(Math.random() * 2) + 1;

      return {
        ...site,
        megaJackpot: site.megaJackpot + incrementMega,
        grandJackpot: site.grandJackpot + incrementGrand,
        majorJackpot: site.majorJackpot + incrementMajor,
      };
    });

    if (newSites.length) {
      this.state = { ...this.state, sites: newSites };
      this.saveDatabase(this.state);
      this.notify();
    }
  }

  // User Actions: Register
  public registerUser(params: {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    registeredSiteId: string;
    password?: string;
  }): { success: boolean; user?: User; error?: string } {
    const existing = this.state.users.find(
      (u) => u.username.toLowerCase() === params.username.toLowerCase() || (params.email && u.email.toLowerCase() === params.email.toLowerCase())
    );
    if (existing) {
      return { success: false, error: 'Username or email is already registered.' };
    }

    const newUserId = 'usr-' + Date.now();
    const newUser: User = {
      id: newUserId,
      username: params.username,
      password: params.password || 'password123',
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      role: 'PLAYER',
      registeredSiteId: params.registeredSiteId,
      tier: 'BRONZE',
      pointsBalance: 100, // Welcome signup bonus!
      lifetimePoints: 100,
      totalSpend: 0,
      attendanceStreak: 1,
      lastAttendanceDate: new Date().toISOString().split('T')[0],
      memberSince: new Date().toISOString().split('T')[0],
      qrCodeData: `BP-MEMBER:${newUserId}:${params.registeredSiteId}:BRONZE`,
      status: 'ACTIVE',
    };

    const site = this.state.sites.find((s) => s.id === params.registeredSiteId);

    const log: ActivityLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      siteId: params.registeredSiteId,
      siteName: site?.name || 'BingoPlus Branch',
      userId: newUserId,
      userName: params.fullName,
      userTier: 'BRONZE',
      type: 'REGISTRATION',
      pointsDelta: 100,
      notes: 'New member registration bonus (+100 pts) at ' + (site?.name || 'BingoPlus'),
    };

    // Auto welcome message in branch chat
    const welcomeChat: ChatMessage = {
      id: 'chat-' + Date.now(),
      siteId: params.registeredSiteId,
      senderId: 'SYSTEM',
      senderName: 'BingoPlus System',
      senderRole: 'STAFF',
      text: `👋 Let's all welcome our newest registered branch member, ${params.fullName}! Welcome to ${site?.name}!`,
      timestamp: 'Just now',
    };

    this.state = {
      ...this.state,
      users: [newUser, ...this.state.users],
      logs: [log, ...this.state.logs],
      chatMessages: [...this.state.chatMessages, welcomeChat],
    };

    this.currentUserId = newUserId;
    this.saveDatabase(this.state);
    this.notify();

    return { success: true, user: newUser };
  }

  // User Actions: Login
  public loginUser(username: string, password?: string): { success: boolean; user?: User; error?: string } {
    const user = this.state.users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (!user) {
      return { success: false, error: 'User account not found.' };
    }
    if (user.status === 'SUSPENDED') {
      return { success: false, error: 'Account is temporarily suspended. Please consult staff.' };
    }

    this.currentUserId = user.id;
    this.notify();
    return { success: true, user };
  }

  // Redeem Reward Voucher
  public redeemReward(rewardId: string, siteId?: string): { success: boolean; voucher?: RedemptionVoucher; error?: string } {
    const user = this.getCurrentUser();
    if (!user) return { success: false, error: 'Not logged in' };

    const reward = this.state.rewards.find((r) => r.id === rewardId);
    if (!reward) return { success: false, error: 'Reward not found' };

    if (reward.isRedeemable === false) {
      return {
        success: false,
        error: 'This item is currently disabled for redemption by the branch manager.',
      };
    }

    const effectiveSiteId = siteId || user.registeredSiteId;
    const currentStock = reward.stockPerSite[effectiveSiteId] ?? 0;

    if (currentStock <= 0) {
      return { success: false, error: `This item is currently out of stock at ${effectiveSiteId}.` };
    }

    if (user.pointsBalance < reward.pointsCost) {
      return {
        success: false,
        error: `Insufficient points. You need ${reward.pointsCost.toLocaleString()} pts, but only have ${user.pointsBalance.toLocaleString()} pts.`,
      };
    }

    // Deduct points
    const newBalance = user.pointsBalance - reward.pointsCost;
    const voucherCode = 'BP-VCH-' + Math.floor(100000 + Math.random() * 900000);

    const newVoucher: RedemptionVoucher = {
      id: 'vch-' + Date.now(),
      voucherCode,
      userId: user.id,
      userName: user.fullName,
      userSiteId: effectiveSiteId,
      rewardId: reward.id,
      rewardTitle: reward.title,
      pointsCost: reward.pointsCost,
      status: 'PENDING_SCAN',
      createdAt: new Date().toISOString(),
    };

    const site = this.state.sites.find((s) => s.id === effectiveSiteId);

    const log: ActivityLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      siteId: effectiveSiteId,
      siteName: site?.name || 'BingoPlus Branch',
      userId: user.id,
      userName: user.fullName,
      userTier: user.tier,
      type: 'REWARD_REDEEM',
      pointsDelta: -reward.pointsCost,
      notes: `Voucher generated for ${reward.title} (Code: ${voucherCode})`,
    };

    const updatedUsers = this.state.users.map((u) =>
      u.id === user.id ? { ...u, pointsBalance: newBalance } : u
    );

    this.state = {
      ...this.state,
      users: updatedUsers,
      vouchers: [newVoucher, ...this.state.vouchers],
      logs: [log, ...this.state.logs],
    };

    this.saveDatabase(this.state);
    this.notify();

    return { success: true, voucher: newVoucher };
  }

  // Staff Action: Claim / Accept Reward Voucher
  public claimVoucherByStaff(voucherCode: string, staffUser: User, targetSiteId?: string): { success: boolean; voucher?: RedemptionVoucher; error?: string } {
    const voucher = this.state.vouchers.find((v) => v.voucherCode.trim().toUpperCase() === voucherCode.trim().toUpperCase());
    if (!voucher) {
      return { success: false, error: 'Voucher code not found or invalid.' };
    }
    if (voucher.status === 'CLAIMED') {
      return { success: false, error: `Voucher ${voucherCode} was already redeemed on ${new Date(voucher.claimedAt || '').toLocaleDateString()}.` };
    }

    const reward = this.state.rewards.find((r) => r.id === voucher.rewardId);
    const siteIdToUse = targetSiteId || staffUser.assignedSiteId || staffUser.registeredSiteId || voucher.userSiteId;

    // Decrement stock at this site
    let updatedRewards = this.state.rewards;
    if (reward) {
      const currentSiteStock = reward.stockPerSite[siteIdToUse] ?? 1;
      const newStock = Math.max(0, currentSiteStock - 1);
      updatedRewards = this.state.rewards.map((r) =>
        r.id === reward.id ? { ...r, stockPerSite: { ...r.stockPerSite, [siteIdToUse]: newStock } } : r
      );
    }

    const updatedVoucher: RedemptionVoucher = {
      ...voucher,
      status: 'CLAIMED',
      claimedAt: new Date().toISOString(),
      claimedByStaffId: staffUser.id,
      claimedAtSiteId: siteIdToUse,
    };

    const site = this.state.sites.find((s) => s.id === siteIdToUse);

    const log: ActivityLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      siteId: siteIdToUse,
      siteName: site?.name || 'BingoPlus Branch',
      userId: voucher.userId,
      userName: voucher.userName,
      staffId: staffUser.id,
      staffName: staffUser.fullName,
      type: 'REWARD_REDEEM',
      pointsDelta: 0,
      notes: `Voucher ${voucherCode} accepted and item "${voucher.rewardTitle}" physically released by ${staffUser.fullName}.`,
    };

    this.state = {
      ...this.state,
      rewards: updatedRewards,
      vouchers: this.state.vouchers.map((v) => (v.id === voucher.id ? updatedVoucher : v)),
      logs: [log, ...this.state.logs],
    };

    this.saveDatabase(this.state);
    this.notify();

    return { success: true, voucher: updatedVoucher };
  }

  // Staff Action: Scan Player QR and Add Points
  public addPointsToPlayer(params: {
    targetUserId: string;
    siteId: string;
    type: 'ATTENDANCE' | 'PURCHASE' | 'TOURNAMENT_WIN' | 'MANUAL_ADJUST';
    purchaseAmount?: number;
    tournamentBonusPoints?: number;
    staffUser: User;
    notes?: string;
  }): { success: boolean; pointsAwarded: number; newBalance: number; error?: string } {
    const player = this.state.users.find((u) => u.id === params.targetUserId);
    if (!player) return { success: false, pointsAwarded: 0, newBalance: 0, error: 'Player account not found.' };

    const tierConfig = this.state.tierConfigs.find((t) => t.id === player.tier) || this.state.tierConfigs[0];
    const multiplier = tierConfig.pointMultiplier || 1.0;

    let pointsAwarded = 0;
    let customNote = params.notes || '';

    if (params.type === 'ATTENDANCE') {
      const today = new Date().toISOString().split('T')[0];
      const isAlreadyCheckedIn = player.lastAttendanceDate === today;
      // Award base 50 attendance points
      pointsAwarded = Math.round(this.state.systemSettings.defaultAttendancePoints * multiplier);
      customNote = isAlreadyCheckedIn
        ? `Repeat site visit verified by ${params.staffUser.fullName} (+${pointsAwarded} pts)`
        : `Daily verified attendance check-in (Streak: ${player.attendanceStreak + 1}) (+${pointsAwarded} pts)`;
    } else if (params.type === 'PURCHASE') {
      const amount = params.purchaseAmount || 0;
      if (amount <= 0) return { success: false, pointsAwarded: 0, newBalance: player.pointsBalance, error: 'Please enter a valid purchase amount.' };
      // Standard: ₱50 = 1 pt * tier multiplier
      const basePoints = amount / this.state.systemSettings.purchasePointsRate;
      pointsAwarded = Math.max(1, Math.round(basePoints * multiplier));
      customNote = `Machine/Token purchase ₱${amount.toLocaleString()} at ${multiplier}x ${tierConfig.name} rate`;
    } else if (params.type === 'TOURNAMENT_WIN') {
      pointsAwarded = params.tournamentBonusPoints || 100;
      customNote = customNote || `Tournament winner bonus points awarded by ${params.staffUser.fullName}`;
    } else {
      pointsAwarded = params.tournamentBonusPoints || 50;
      customNote = customNote || `Manual points adjustment by ${params.staffUser.fullName}`;
    }

    const newPointsBalance = player.pointsBalance + pointsAwarded;
    const newLifetime = player.lifetimePoints + pointsAwarded;
    const newTotalSpend = player.totalSpend + (params.purchaseAmount || 0);

    // Check automatic tier progression based on total spending
    let newTier = player.tier;
    for (const tier of [...this.state.tierConfigs].reverse()) {
      if (newTotalSpend >= tier.minSpend) {
        newTier = tier.id;
        break;
      }
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const newStreak = player.lastAttendanceDate === todayStr ? player.attendanceStreak : player.attendanceStreak + 1;

    const updatedPlayer: User = {
      ...player,
      pointsBalance: newPointsBalance,
      lifetimePoints: newLifetime,
      totalSpend: newTotalSpend,
      tier: newTier,
      attendanceStreak: newStreak,
      lastAttendanceDate: todayStr,
      qrCodeData: `BP-MEMBER:${player.id}:${player.registeredSiteId}:${newTier}`,
    };

    const site = this.state.sites.find((s) => s.id === params.siteId);

    const log: ActivityLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      siteId: params.siteId,
      siteName: site?.name || 'BingoPlus Branch',
      userId: player.id,
      userName: player.fullName,
      userTier: newTier,
      staffId: params.staffUser.id,
      staffName: params.staffUser.fullName,
      type: params.type,
      pointsDelta: pointsAwarded,
      purchaseAmount: params.purchaseAmount,
      notes: customNote,
    };

    this.state = {
      ...this.state,
      users: this.state.users.map((u) => (u.id === player.id ? updatedPlayer : u)),
      logs: [log, ...this.state.logs],
    };

    this.saveDatabase(this.state);
    this.notify();

    return {
      success: true,
      pointsAwarded,
      newBalance: newPointsBalance,
    };
  }

  // Site Management: Update Jackpot & Roundtop
  public updateSiteDetails(siteId: string, updates: Partial<BingoSite>) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        return {
          ...site,
          ...updates,
          roundtop: {
            ...site.roundtop,
            ...(updates.roundtop || {}),
            updatedAt: new Date().toISOString(),
          },
        };
      }
      return site;
    });

    this.state = {
      ...this.state,
      sites: updatedSites,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Inventory Management: Update Retail Item Stock
  public updateItemStock(rewardId: string, siteId: string, newStock: number) {
    const updatedRewards = this.state.rewards.map((rew) => {
      if (rew.id === rewardId) {
        return {
          ...rew,
          stockPerSite: {
            ...rew.stockPerSite,
            [siteId]: Math.max(0, newStock),
          },
        };
      }
      return rew;
    });

    this.state = {
      ...this.state,
      rewards: updatedRewards,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Toggle Reward Item Redeemable ON/OFF (Branch Manager to Superuser)
  public toggleRewardItemRedeemable(rewardId: string) {
    const updatedRewards = this.state.rewards.map((rew) => {
      if (rew.id === rewardId) {
        return {
          ...rew,
          isRedeemable: rew.isRedeemable !== false ? false : true,
        };
      }
      return rew;
    });

    this.state = {
      ...this.state,
      rewards: updatedRewards,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Update Reward Item Details & Points Cost
  public updateRewardItem(rewardId: string, updates: Partial<RewardItem>) {
    const updatedRewards = this.state.rewards.map((rew) => {
      if (rew.id === rewardId) {
        return {
          ...rew,
          ...updates,
        };
      }
      return rew;
    });

    this.state = {
      ...this.state,
      rewards: updatedRewards,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Add New Retail Item to Catalogue
  public addRewardItem(item: Omit<RewardItem, 'id'>) {
    const newReward: RewardItem = {
      ...item,
      id: 'rew-' + Date.now(),
      isRedeemable: item.isRedeemable !== undefined ? item.isRedeemable : true,
    };

    this.state = {
      ...this.state,
      rewards: [newReward, ...this.state.rewards],
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Delete Reward Item
  public deleteRewardItem(rewardId: string) {
    this.state = {
      ...this.state,
      rewards: this.state.rewards.filter((r) => r.id !== rewardId),
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Toggle Point Mechanic ON/OFF (Branch Manager to Superuser)
  public toggleMechanic(mechanicId: string) {
    const updatedMechanics = this.state.mechanics.map((mech) => {
      if (mech.id === mechanicId) {
        return {
          ...mech,
          isEnabled: !mech.isEnabled,
          updatedAt: new Date().toISOString(),
        };
      }
      return mech;
    });

    this.state = {
      ...this.state,
      mechanics: updatedMechanics,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Update Point Mechanic / Catalogue Rule
  public updateMechanic(mechanicId: string, updates: Partial<PointMechanic>) {
    const updatedMechanics = this.state.mechanics.map((mech) => {
      if (mech.id === mechanicId) {
        return {
          ...mech,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return mech;
    });

    this.state = {
      ...this.state,
      mechanics: updatedMechanics,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Add New Point / Catalogue Mechanic
  public addMechanic(mechanic: Omit<PointMechanic, 'id'>) {
    const newMechanic: PointMechanic = {
      ...mechanic,
      id: 'mech-' + Date.now(),
      updatedAt: new Date().toISOString(),
    };

    this.state = {
      ...this.state,
      mechanics: [newMechanic, ...this.state.mechanics],
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Delete Point Mechanic
  public deleteMechanic(mechanicId: string) {
    this.state = {
      ...this.state,
      mechanics: this.state.mechanics.filter((m) => m.id !== mechanicId),
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Chat Management
  public sendChatMessage(params: {
    siteId: string;
    text: string;
    isOfficialAnnouncement?: boolean;
    isPinned?: boolean;
  }) {
    const user = this.getCurrentUser();
    if (!user) return;

    const newMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      siteId: params.siteId,
      senderId: user.id,
      senderName: user.fullName + (user.role !== 'PLAYER' ? ` (${user.role.replace('_', ' ')})` : ''),
      senderRole: user.role,
      senderTier: user.tier,
      text: params.text,
      timestamp: 'Just now',
      isOfficialAnnouncement: params.isOfficialAnnouncement || false,
      isPinned: params.isPinned || false,
    };

    this.state = {
      ...this.state,
      chatMessages: [...this.state.chatMessages, newMessage],
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  public deleteChatMessage(messageId: string) {
    this.state = {
      ...this.state,
      chatMessages: this.state.chatMessages.filter((m) => m.id !== messageId),
    };
    this.saveDatabase(this.state);
    this.notify();
  }

  // Push Notifications Broadcast
  public broadcastPushNotification(params: {
    title: string;
    body: string;
    targetSiteId: string;
    category: 'PROMO' | 'JACKPOT' | 'SYSTEM' | 'EVENT';
    senderName: string;
  }) {
    const targetSite = this.state.sites.find((s) => s.id === params.targetSiteId);
    const targetSiteName = params.targetSiteId === 'ALL' ? 'All 9 BingoPlus Branches' : targetSite?.name || 'Selected Branch';

    const newNotification: PushNotification = {
      id: 'notif-' + Date.now(),
      title: params.title,
      body: params.body,
      targetSiteId: params.targetSiteId,
      targetSiteName,
      sentAt: 'Just now',
      senderName: params.senderName,
      category: params.category,
      readByUsers: [],
    };

    this.state = {
      ...this.state,
      notifications: [newNotification, ...this.state.notifications],
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Account Management
  public updateUserStatus(userId: string, status: 'ACTIVE' | 'SUSPENDED', tier?: UserRole | any) {
    const updatedUsers = this.state.users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          status,
          ...(tier ? { tier } : {}),
        };
      }
      return u;
    });

    this.state = {
      ...this.state,
      users: updatedUsers,
    };

    this.saveDatabase(this.state);
    this.notify();
  }

  // Update Tier Spending & Multipliers
  public updateTierConfig(tierId: string, updates: Partial<TierConfig>) {
    const updatedConfigs = this.state.tierConfigs.map((t) => (t.id === tierId ? { ...t, ...updates } : t));
    this.state = { ...this.state, tierConfigs: updatedConfigs };
    this.saveDatabase(this.state);
    this.notify();
  }

  // Traditional Bingo Jackpots & Ball Brackets
  public addTraditionalJackpot(siteId: string, bracket: Omit<TraditionalJackpotBracket, 'id'>) {
    const newBracket: TraditionalJackpotBracket = {
      ...bracket,
      id: 'tjb-' + Date.now(),
    };

    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        return {
          ...site,
          traditionalJackpots: [...(site.traditionalJackpots || []), newBracket],
        };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public updateTraditionalJackpot(siteId: string, bracketId: string, updates: Partial<TraditionalJackpotBracket>) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedBrackets = (site.traditionalJackpots || []).map((b) =>
          b.id === bracketId ? { ...b, ...updates } : b
        );
        return { ...site, traditionalJackpots: updatedBrackets };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public toggleTraditionalJackpot(siteId: string, bracketId: string) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedBrackets = (site.traditionalJackpots || []).map((b) =>
          b.id === bracketId ? { ...b, isActive: !b.isActive } : b
        );
        return { ...site, traditionalJackpots: updatedBrackets };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public deleteTraditionalJackpot(siteId: string, bracketId: string) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedBrackets = (site.traditionalJackpots || []).filter((b) => b.id !== bracketId);
        return { ...site, traditionalJackpots: updatedBrackets };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  // EBG Machine Variants & Roundtop Control
  public addEBGMachineVariant(siteId: string, variant: Omit<EBGMachineVariant, 'id'>) {
    const newVariant: EBGMachineVariant = {
      ...variant,
      id: 'ebg-' + Date.now(),
    };

    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        return {
          ...site,
          ebgVariants: [...(site.ebgVariants || []), newVariant],
        };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public updateEBGMachineVariant(siteId: string, variantId: string, updates: Partial<EBGMachineVariant>) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedVariants = (site.ebgVariants || []).map((v) =>
          v.id === variantId ? { ...v, ...updates } : v
        );
        return { ...site, ebgVariants: updatedVariants };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public toggleEBGMachineVariant(siteId: string, variantId: string) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedVariants = (site.ebgVariants || []).map((v) =>
          v.id === variantId
            ? {
                ...v,
                isEnabled: !v.isEnabled,
                status: !v.isEnabled ? ('ACTIVE' as const) : ('STANDBY' as const),
              }
            : v
        );
        return { ...site, ebgVariants: updatedVariants };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  public deleteEBGMachineVariant(siteId: string, variantId: string) {
    const updatedSites = this.state.sites.map((site) => {
      if (site.id === siteId) {
        const updatedVariants = (site.ebgVariants || []).filter((v) => v.id !== variantId);
        return { ...site, ebgVariants: updatedVariants };
      }
      return site;
    });

    this.state = { ...this.state, sites: updatedSites };
    this.saveDatabase(this.state);
    this.notify();
  }

  // Reset demo data
  public resetToFactory() {
    this.state = getInitialDatabase();
    this.saveDatabase(this.state);
    this.notify();
  }
}

export const store = new BingoPlusStoreManager();
