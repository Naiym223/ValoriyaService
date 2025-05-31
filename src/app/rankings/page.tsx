'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Crown, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  BarChart3,
  Eye,
  Clock,
  Users,
  Filter
} from 'lucide-react';

interface RankingRequest {
  id: string;
  targetUserId: number;
  targetUsername: string;
  toRank: number;
  groupId: number;
  reason: string;
  status: 'success' | 'failed' | 'pending';
  createdAt: Date;
  completedAt?: Date;
}

export default function RankingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [rankings, setRankings] = useState<RankingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRankings: 0,
    successfulRankings: 0,
    failedRankings: 0,
    successRate: 0
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    loadRankingData();
  }, [user, router]);

  const loadRankingData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from the ranking API using the user's game key
      const mockRankings: RankingRequest[] = [
        {
          id: '1',
          targetUserId: 123456789,
          targetUsername: 'Player1',
          toRank: 5,
          groupId: 1234567,
          reason: 'Application Approved',
          status: 'success',
          createdAt: new Date(Date.now() - 3600000),
          completedAt: new Date(Date.now() - 3599000)
        },
        {
          id: '2',
          targetUserId: 987654321,
          targetUsername: 'Player2',
          toRank: 10,
          groupId: 1234567,
          reason: 'Gamepass Purchase',
          status: 'success',
          createdAt: new Date(Date.now() - 7200000),
          completedAt: new Date(Date.now() - 7199000)
        },
        {
          id: '3',
          targetUserId: 456789123,
          targetUsername: 'Player3',
          toRank: 15,
          groupId: 1234567,
          reason: 'Manual Ranking',
          status: 'failed',
          createdAt: new Date(Date.now() - 10800000),
          completedAt: new Date(Date.now() - 10799000)
        },
        {
          id: '4',
          targetUserId: 789123456,
          targetUsername: 'Player4',
          toRank: 8,
          groupId: 1234567,
          reason: 'Promotion',
          status: 'pending',
          createdAt: new Date(Date.now() - 1800000)
        },
        {
          id: '5',
          targetUserId: 321654987,
          targetUsername: 'Player5',
          toRank: 12,
          groupId: 1234567,
          reason: 'Merit-based Promotion',
          status: 'success',
          createdAt: new Date(Date.now() - 14400000),
          completedAt: new Date(Date.now() - 14399000)
        }
      ];

      setRankings(mockRankings);
      
      // Calculate stats
      const successfulRankings = mockRankings.filter(r => r.status === 'success').length;
      const failedRankings = mockRankings.filter(r => r.status === 'failed').length;
      const totalRankings = mockRankings.length;
      const successRate = totalRankings > 0 ? Math.round((successfulRankings / totalRankings) * 100) : 0;

      setStats({
        totalRankings,
        successfulRankings,
        failedRankings,
        successRate
      });
    } catch (error) {
      console.error('Error loading ranking data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.push('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Ranking Center</h1>
                <p className="text-gray-600">Monitor and manage all ranking activities</p>
              </div>
            </div>
            <Button onClick={loadRankingData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Rankings</CardTitle>
                  <Crown className="h-4 w-4 text-valoriya-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-valoriya-blue-600">{stats.totalRankings}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Successful</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.successfulRankings}</div>
                  <p className="text-xs text-muted-foreground">Completed successfully</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Failed</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.failedRankings}</div>
                  <p className="text-xs text-muted-foreground">Needs attention</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.successRate}%</div>
                  <p className="text-xs text-muted-foreground">Overall performance</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Ranking Logs */}
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Rankings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="failed">Failed Rankings</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Ranking Requests</CardTitle>
                      <CardDescription>Latest ranking activities and their status</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rankings.map((ranking, index) => (
                      <motion.div
                        key={ranking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="bg-valoriya-gradient-light p-2 rounded-full">
                                {getStatusIcon(ranking.status)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{ranking.targetUsername}</h3>
                                <p className="text-sm text-gray-600">
                                  Ranked to position {ranking.toRank} • {ranking.reason}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ranking.status)}`}>
                                {ranking.status.charAt(0).toUpperCase() + ranking.status.slice(1)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {ranking.createdAt.toLocaleString()}
                              </span>
                              {ranking.completedAt && (
                                <span>
                                  Completed in {Math.round((ranking.completedAt.getTime() - ranking.createdAt.getTime()) / 1000)}s
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {ranking.status === 'failed' && (
                              <Button size="sm" variant="valoriya">
                                Retry
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-valoriya-blue-600" />
                      Ranking Reasons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(
                        rankings.reduce((acc, ranking) => {
                          acc[ranking.reason] = (acc[ranking.reason] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([reason, count]) => (
                        <div key={reason} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{reason}</span>
                          <div className="flex items-center space-x-2">
                            <div className="bg-valoriya-blue-100 h-2 rounded-full w-20">
                              <div 
                                className="bg-valoriya-blue-600 h-2 rounded-full" 
                                style={{ width: `${(count / rankings.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Top Ranked Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.from(new Set(rankings.map(r => r.targetUsername)))
                        .map(username => ({
                          username,
                          count: rankings.filter(r => r.targetUsername === username).length,
                          latestRank: rankings.filter(r => r.targetUsername === username).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]?.toRank || 0
                        }))
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((user, index) => (
                          <motion.div
                            key={user.username}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <h4 className="font-semibold">{user.username}</h4>
                              <p className="text-sm text-gray-600">Current rank: {user.latestRank}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-valoriya-blue-600">{user.count}</div>
                              <p className="text-xs text-gray-500">rankings</p>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="failed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Failed Rankings</CardTitle>
                  <CardDescription>Rankings that need attention or retry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {rankings.filter(r => r.status === 'failed').map((ranking, index) => (
                      <motion.div
                        key={ranking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-red-200 rounded-lg p-4 bg-red-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <XCircle className="h-5 w-5 text-red-600" />
                              <div>
                                <h3 className="font-semibold text-red-800">{ranking.targetUsername}</h3>
                                <p className="text-sm text-red-600">
                                  Failed to rank to position {ranking.toRank} • {ranking.reason}
                                </p>
                                <p className="text-xs text-red-500 mt-1">
                                  Attempted: {ranking.createdAt.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            <Button size="sm" variant="valoriya">
                              Retry Ranking
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    {rankings.filter(r => r.status === 'failed').length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                        <p>No failed rankings! Everything is working smoothly.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}