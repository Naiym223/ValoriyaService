export interface User {
  id: string;
  email: string;
  displayName: string;
  robloxUsername?: string;
  robloxUserId?: number;
  isVerified: boolean;
  createdAt: Date;
  subscription: Subscription;
  gameKey: string;
}

export interface Subscription {
  plan: 'free_trial' | 'monthly' | 'yearly';
  status: 'active' | 'expired' | 'cancelled';
  expiresAt: Date;
  startedAt: Date;
  autoRenew: boolean;
}

export interface GameKey {
  id: string;
  userId: string;
  key: string;
  isActive: boolean;
  lastUsed?: Date;
  usageCount: number;
  createdAt: Date;
}

export interface RankingRequest {
  id: string;
  userId: string;
  gameKey: string;
  targetUserId: number;
  targetUsername: string;
  fromRank: number;
  toRank: number;
  status: 'pending' | 'success' | 'failed' | 'invalid';
  reason?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  gameKey: string;
  action: string;
  details: Record<string, any>;
  createdAt: Date;
}

export interface Stats {
  successfulRanks: number;
  invalidRequests: number;
  failedRequests: number;
  totalUsers: number;
  activeToday: number;
}

export interface RobloxGroup {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  isPublic: boolean;
  roles: RobloxRole[];
}

export interface RobloxRole {
  id: number;
  name: string;
  rank: number;
  memberCount: number;
}

export interface RobloxUser {
  id: number;
  username: string;
  displayName: string;
  hasVerifiedBadge: boolean;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardData {
  user: User;
  stats: Stats;
  recentActivity: ActivityLog[];
  gameKey: GameKey;
}