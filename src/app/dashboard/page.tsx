'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  Key, 
  Settings, 
  LogOut, 
  Calendar, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Copy,
  RefreshCw,
  Download,
  Crown,
  Activity,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    successfulRanks: 1247,
    invalidRequests: 23,
    failedRequests: 0,
    totalUsers: 156,
    activeToday: 89
  });
  const [gameKey, setGameKey] = useState('VLR_' + Math.random().toString(36).substring(2, 15).toUpperCase());
  const [subscription, setSubscription] = useState({
    plan: 'Free Trial',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isActive: true
  });

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const copyGameKey = () => {
    navigator.clipboard.writeText(gameKey);
    // Add toast notification here
  };

  const regenerateKey = () => {
    setGameKey('VLR_' + Math.random().toString(36).substring(2, 15).toUpperCase());
  };

  const daysRemaining = Math.ceil((subscription.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

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
            <h1 className="text-2xl font-bold gradient-text">Valoriya Service</h1>
            <div className="text-sm text-gray-600">
              Welcome back, <span className="font-semibold">{user.displayName || user.email}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Crown className="h-4 w-4 text-valoriya-blue-600" />
              <span className="font-medium">{subscription.plan}</span>
              <span className="text-gray-500">({daysRemaining} days left)</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Subscription Alert */}
        {daysRemaining <= 3 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">
                  Your {subscription.plan} expires in {daysRemaining} days
                </h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Upgrade to continue using Valoriya Service without interruption
                </p>
              </div>
              <Button variant="valoriya" className="ml-4">
                Upgrade Now
              </Button>
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Ranks</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.successfulRanks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
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
                <CardTitle className="text-sm font-medium">Invalid Requests</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.invalidRequests}</div>
                <p className="text-xs text-muted-foreground">
                  -5% from last month
                </p>
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
                <CardTitle className="text-sm font-medium">Failed Requests</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.failedRequests}</div>
                <p className="text-xs text-muted-foreground">
                  No change
                </p>
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
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-valoriya-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-valoriya-blue-600">{stats.activeToday}</div>
                <p className="text-xs text-muted-foreground">
                  Today: {stats.activeToday} of {stats.totalUsers}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="keys">Game Keys</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-valoriya-blue-600" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Manage your ranking system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="valoriya" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Recent Rankings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-valoriya-blue-600" />
                    Account Status
                  </CardTitle>
                  <CardDescription>Your subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plan Type</span>
                    <span className="text-sm text-valoriya-blue-600 font-semibold">{subscription.plan}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Expires</span>
                    <span className="text-sm">{subscription.expiresAt.toLocaleDateString()}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Days Remaining</span>
                      <span>{daysRemaining} days</span>
                    </div>
                    <Progress value={(daysRemaining / 7) * 100} className="h-2" />
                  </div>
                  <Button variant="valoriya" className="w-full">
                    Extend Subscription
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="h-5 w-5 mr-2 text-valoriya-blue-600" />
                  Game Key Management
                </CardTitle>
                <CardDescription>
                  Your game key connects your Roblox games to Valoriya Service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Your Game Key</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={copyGameKey}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" onClick={regenerateKey}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  <div className="font-mono text-lg bg-white p-3 rounded border">
                    {gameKey}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Keep this key secure. Anyone with this key can access your ranking system.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">Active</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Last used: 2 hours ago
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Usage Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Today</span>
                          <span className="font-medium">47 requests</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>This month</span>
                          <span className="font-medium">1,247 requests</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-800">Important Security Notice</h3>
                      <p className="text-yellow-700 text-sm mt-1">
                        Regenerating your game key will break existing integrations. Update all your Roblox games 
                        with the new key after regeneration.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Application Center</CardTitle>
                  <CardDescription>Handle player applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="valoriya" className="w-full mb-3">
                    <Download className="h-4 w-4 mr-2" />
                    Download Module
                  </Button>
                  <p className="text-xs text-gray-600">
                    Automatically rank players when they apply through your game
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Ranking Center</CardTitle>
                  <CardDescription>Gamepass-based ranking</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="valoriya" className="w-full mb-3">
                    <Download className="h-4 w-4 mr-2" />
                    Download Module
                  </Button>
                  <p className="text-xs text-gray-600">
                    Rank players automatically when they purchase gamepasses
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Activity Tracker</CardTitle>
                  <CardDescription>Monitor staff activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="valoriya" className="w-full mb-3">
                    <Download className="h-4 w-4 mr-2" />
                    Download Module
                  </Button>
                  <p className="text-xs text-gray-600">
                    Track player and staff activity in your games
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-valoriya-blue-600" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Profile Information</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Display Name</label>
                      <input 
                        type="text" 
                        value={user.displayName || ''} 
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        value={user.email || ''} 
                        className="w-full p-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Roblox Integration</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-3">
                        Connect your Roblox account to access ranking features
                      </p>
                      <Button variant="outline" className="w-full">
                        Link Roblox Account
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Archive Account</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" size="sm">
                      Archive Account
                    </Button>
                  </div>
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