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
  Activity, 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar,
  RefreshCw,
  ArrowLeft,
  BarChart3,
  Eye,
  Filter
} from 'lucide-react';

interface ActivityLog {
  id: string;
  userId: number;
  username: string;
  action: string;
  details: Record<string, unknown>;
  timestamp: Date;
  createdAt: Date;
}

export default function ActivityPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActivities: 0,
    uniqueUsers: 0,
    todayActivities: 0,
    topAction: ''
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    loadActivityData();
  }, [user, router]);

  const loadActivityData = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from the activity API using the user's game key
      const mockActivities: ActivityLog[] = [
        {
          id: '1',
          userId: 123456789,
          username: 'Player1',
          action: 'player_joined',
          details: { joinTime: Date.now() - 3600000 },
          timestamp: new Date(Date.now() - 3600000),
          createdAt: new Date(Date.now() - 3600000)
        },
        {
          id: '2',
          userId: 987654321,
          username: 'StaffMember1',
          action: 'player_ranked',
          details: { targetRank: 5, reason: 'Good performance' },
          timestamp: new Date(Date.now() - 7200000),
          createdAt: new Date(Date.now() - 7200000)
        },
        {
          id: '3',
          userId: 123456789,
          username: 'Player1',
          action: 'activity_report',
          details: { totalActiveTime: 1800, isCurrentlyActive: true },
          timestamp: new Date(Date.now() - 1800000),
          createdAt: new Date(Date.now() - 1800000)
        },
        {
          id: '4',
          userId: 456789123,
          username: 'Player2',
          action: 'player_left',
          details: { leaveTime: Date.now() - 900000, totalSessionTime: 2400 },
          timestamp: new Date(Date.now() - 900000),
          createdAt: new Date(Date.now() - 900000)
        }
      ];

      setActivities(mockActivities);
      
      // Calculate stats
      const uniqueUsers = new Set(mockActivities.map(a => a.userId)).size;
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayActivities = mockActivities.filter(a => a.timestamp >= todayStart).length;
      
      const actionCounts = mockActivities.reduce((acc, activity) => {
        acc[activity.action] = (acc[activity.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topAction = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

      setStats({
        totalActivities: mockActivities.length,
        uniqueUsers,
        todayActivities,
        topAction
      });
    } catch (error) {
      console.error('Error loading activity data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDetails = (details: Record<string, unknown>) => {
    if (!details || Object.keys(details).length === 0) return 'No additional details';
    
    return Object.entries(details).map(([key, value]) => 
      `${key}: ${typeof value === 'number' && key.includes('Time') ? `${Math.round(value / 60)}m` : value}`
    ).join(', ');
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
                <h1 className="text-2xl font-bold gradient-text">Activity Tracking</h1>
                <p className="text-gray-600">Monitor player and staff activity in real-time</p>
              </div>
            </div>
            <Button onClick={loadActivityData} disabled={loading}>
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
                  <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                  <Activity className="h-4 w-4 text-valoriya-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-valoriya-blue-600">{stats.totalActivities}</div>
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
                  <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.uniqueUsers}</div>
                  <p className="text-xs text-muted-foreground">Active players</p>
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
                  <CardTitle className="text-sm font-medium">Today's Activities</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.todayActivities}</div>
                  <p className="text-xs text-muted-foreground">Since midnight</p>
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
                  <CardTitle className="text-sm font-medium">Top Action</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-purple-600">{formatAction(stats.topAction)}</div>
                  <p className="text-xs text-muted-foreground">Most common activity</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Activity Logs */}
          <Tabs defaultValue="recent" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="users">User Summary</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity Log</CardTitle>
                      <CardDescription>Latest player and staff activities</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <div className="bg-valoriya-gradient-light p-2 rounded-full">
                                <Activity className="h-4 w-4 text-valoriya-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{activity.username}</h3>
                                <p className="text-sm text-gray-600">{formatAction(activity.action)}</p>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>{formatDetails(activity.details)}</p>
                              <p className="flex items-center mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                {activity.timestamp.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Summary</CardTitle>
                  <CardDescription>Activity breakdown by user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(activities.map(a => a.username))).map((username, index) => {
                      const userActivities = activities.filter(a => a.username === username);
                      const lastActivity = userActivities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
                      
                      return (
                        <motion.div
                          key={username}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{username}</h3>
                              <p className="text-sm text-gray-600">
                                {userActivities.length} activities
                              </p>
                              <p className="text-xs text-gray-500">
                                Last seen: {lastActivity?.timestamp.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-valoriya-blue-600">
                                {userActivities.length}
                              </div>
                              <p className="text-xs text-gray-500">activities</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
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
                      Activity Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(
                        activities.reduce((acc, activity) => {
                          acc[activity.action] = (acc[activity.action] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([action, count]) => (
                        <div key={action} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{formatAction(action)}</span>
                          <div className="flex items-center space-x-2">
                            <div className="bg-valoriya-blue-100 h-2 rounded-full w-20">
                              <div 
                                className="bg-valoriya-blue-600 h-2 rounded-full" 
                                style={{ width: `${(count / activities.length) * 100}%` }}
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
                    <CardTitle>Usage Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Peak Activity Time</span>
                        <span className="font-medium">2:00 PM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Session Length</span>
                        <span className="font-medium">45 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Most Active User</span>
                        <span className="font-medium">Player1</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Activity Growth</span>
                        <span className="font-medium text-green-600">+23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}