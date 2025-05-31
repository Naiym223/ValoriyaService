'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Activity, 
  LogOut, 
  Settings, 
  Crown, 
  Copy, 
  RefreshCw, 
  Download, 
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Shield,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  Calendar,
  Star
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState({
    successfulRanks: 0,
    invalidRequests: 0,
    failedRequests: 0,
    totalRequests: 0,
    todayRequests: 0,
    recentActivity: [] as Array<{
      id: number;
      type: string;
      message: string;
      timestamp: Date;
      userId: string;
    }>,
    trends: {
      successfulRanks: 0,
      invalidRequests: 0,
      failedRequests: 0
    }
  });
  
  const [gameKey, setGameKey] = useState('');
  const [subscription, setSubscription] = useState({
    plan: 'Free Trial',
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isActive: true
  });
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [chartPeriod, setChartPeriod] = useState('7d');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Set admin subscription for admin user
    if (user.email === 'naiymbusiness@gmail.com') {
      setSubscription({
        plan: 'Admin - Unlimited',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        isActive: true
      });
    }

    // Generate or fetch game key for user
    const userGameKey = localStorage.getItem(`gameKey_${user.uid}`) || 
                       'VLR_' + Math.random().toString(36).substring(2, 15).toUpperCase();
    
    if (!localStorage.getItem(`gameKey_${user.uid}`)) {
      localStorage.setItem(`gameKey_${user.uid}`, userGameKey);
    }
    
    setGameKey(userGameKey);

    // Fetch real stats
    fetchUserStats(userGameKey, user.uid);
  }, [user, router]);

  const fetchUserStats = async (gameKey: string, userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/stats?gameKey=${gameKey}&userId=${userId}`);
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        }
      } else {
        // Enhanced mock data for demonstration
        const mockStats = {
          successfulRanks: Math.floor(Math.random() * 1000) + 500,
          invalidRequests: Math.floor(Math.random() * 50) + 10,
          failedRequests: Math.floor(Math.random() * 25) + 5,
          totalRequests: 0,
          todayRequests: Math.floor(Math.random() * 100) + 20,
          recentActivity: generateMockActivity(),
          trends: {
            successfulRanks: Math.floor(Math.random() * 50) + 10,
            invalidRequests: Math.floor(Math.random() * 10) + 2,
            failedRequests: Math.floor(Math.random() * 5) + 1
          }
        };
        mockStats.totalRequests = mockStats.successfulRanks + mockStats.invalidRequests + mockStats.failedRequests;
        setStats(mockStats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to enhanced mock data
      const mockStats = {
        successfulRanks: Math.floor(Math.random() * 1000) + 500,
        invalidRequests: Math.floor(Math.random() * 50) + 10,
        failedRequests: Math.floor(Math.random() * 25) + 5,
        totalRequests: 0,
        todayRequests: Math.floor(Math.random() * 100) + 20,
        recentActivity: generateMockActivity(),
        trends: {
          successfulRanks: Math.floor(Math.random() * 50) + 10,
          invalidRequests: Math.floor(Math.random() * 10) + 2,
          failedRequests: Math.floor(Math.random() * 5) + 1
        }
      };
      mockStats.totalRequests = mockStats.successfulRanks + mockStats.invalidRequests + mockStats.failedRequests;
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const generateMockActivity = () => {
    const activities = [];
    const types = ['rank', 'error', 'success', 'warning'];
    const messages = [
      'User ranked successfully to Officer',
      'Failed to rank user: Invalid permissions',
      'Bulk ranking completed for 5 users',
      'API rate limit exceeded',
      'User promoted to Manager',
      'Invalid game key detected'
    ];

    for (let i = 0; i < 10; i++) {
      activities.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        userId: 'user_' + Math.random().toString(36).substring(7)
      });
    }

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const copyGameKey = () => {
    navigator.clipboard.writeText(gameKey);
    // Add toast notification
  };

  const regenerateKey = () => {
    const newKey = 'VLR_' + Math.random().toString(36).substring(2, 15).toUpperCase();
    setGameKey(newKey);
    if (user?.uid) {
      localStorage.setItem(`gameKey_${user.uid}`, newKey);
      fetchUserStats(newKey, user.uid);
    }
  };

  const daysRemaining = Math.ceil((subscription.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  // Enhanced Chart Data
  const generateChartData = () => {
    const days = [];
    const successData = [];
    const failedData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      successData.push(Math.floor(Math.random() * 100) + 20);
      failedData.push(Math.floor(Math.random() * 10) + 1);
    }

    return { days, successData, failedData };
  };

  const chartData = generateChartData();

  const lineChartData = {
    labels: chartData.days,
    datasets: [
      {
        label: 'Successful Ranks',
        data: chartData.successData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Failed Requests',
        data: chartData.failedData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const doughnutData = {
    labels: ['Successful', 'Invalid', 'Failed'],
    datasets: [
      {
        data: [stats.successfulRanks, stats.invalidRequests, stats.failedRequests],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Module codes for download
  const modulesCodes = {
    applicationCenter: `-- Valoriya Service Application Center Module
-- Place this script in ServerScriptService

local ValoriyaService = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "${gameKey}" -- Your actual game key
local API_BASE = "https://valoriya-service.vercel.app/api"

-- Main ranking function
function ValoriyaService.rankUser(userId, rank)
    local url = API_BASE .. "/rank"
    local data = {
        gameKey = GAME_KEY,
        userId = userId,
        rank = rank
    }
    
    local success, response = pcall(function()
        return HttpService:PostAsync(url, HttpService:JSONEncode(data))
    end)
    
    if success then
        local responseData = HttpService:JSONDecode(response)
        return responseData.success
    else
        warn("Failed to rank user: " .. tostring(response))
        return false
    end
end

return ValoriyaService`,

    rankingSystem: `-- Valoriya Service Ranking System
-- Enhanced ranking system with validation

local RankingSystem = {}
local HttpService = game:GetService("HttpService")
local GroupService = game:GetService("GroupService")

local GAME_KEY = "${gameKey}"
local API_BASE = "https://valoriya-service.vercel.app/api"

function RankingSystem.promoteTo(userId, rankId)
    -- Validate user exists
    local success, userInfo = pcall(function()
        return Players:GetNameFromUserIdAsync(userId)
    end)
    
    if not success then
        return false, "Invalid user ID"
    end
    
    -- Make API call
    local rankData = {
        gameKey = GAME_KEY,
        userId = userId,
        rankId = rankId,
        action = "promote"
    }
    
    return ValoriyaService.makeRequest("/rank", rankData)
end

function RankingSystem.demoteTo(userId, rankId)
    local rankData = {
        gameKey = GAME_KEY,
        userId = userId,
        rankId = rankId,
        action = "demote"
    }
    
    return ValoriyaService.makeRequest("/rank", rankData)
end

return RankingSystem`
  };

  const downloadModule = (moduleName: string, code: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleName.replace(/\s+/g, '')}.lua`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Enhanced Header with gradient */}
        <header className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 border-b border-blue-200 px-6 py-4 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm"></div>
          <div className="relative flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Valoriya Service</h1>
                  <div className="text-sm text-blue-100">
                    Welcome back, <span className="font-semibold">{user?.displayName || user?.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 text-sm bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-white">{subscription.plan}</span>
                <span className="text-blue-100">({daysRemaining} days left)</span>
              </div>
              
              {user?.email === 'naiymbusiness@gmail.com' && (
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => router.push('/admin')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </header>

        <div className="p-6">
          {/* Subscription Alert with enhanced styling */}
          {daysRemaining <= 3 && user?.email !== 'naiymbusiness@gmail.com' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-4" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-yellow-800 text-lg">
                    Your {subscription.plan} expires in {daysRemaining} days
                  </h3>
                  <p className="text-yellow-700 mt-1">
                    Upgrade to continue using Valoriya Service without interruption
                  </p>
                </div>
                <Button className="ml-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  Upgrade Now
                </Button>
              </div>
            </motion.div>
          )}

          {/* Enhanced Stats Overview with gradients and animations */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Card className="relative bg-white/70 backdrop-blur-sm border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Successful Ranks</CardTitle>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-green-200 h-8 w-20 rounded"></div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {stats.successfulRanks.toLocaleString()}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-gray-600">
                      +{stats.trends.successfulRanks} this month
                    </p>
                  </div>
                  <Progress 
                    value={75} 
                    className="mt-3 h-2 bg-green-100"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Card className="relative bg-white/70 backdrop-blur-sm border-red-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Invalid Requests</CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <XCircle className="h-5 w-5 text-red-600" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-red-200 h-8 w-16 rounded"></div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        {stats.invalidRequests}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <p className="text-xs text-gray-600">
                      +{stats.trends.invalidRequests} this month
                    </p>
                  </div>
                  <Progress 
                    value={25} 
                    className="mt-3 h-2 bg-red-100"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Card className="relative bg-white/70 backdrop-blur-sm border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Failed Requests</CardTitle>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-yellow-200 h-8 w-16 rounded"></div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {stats.failedRequests}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500" />
                    <p className="text-xs text-gray-600">
                      +{stats.trends.failedRequests} this month
                    </p>
                  </div>
                  <Progress 
                    value={15} 
                    className="mt-3 h-2 bg-yellow-100"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <Card className="relative bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Today's Activity</CardTitle>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="h-5 w-5 text-blue-600" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-blue-200 h-8 w-16 rounded"></div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {stats.todayRequests}
                      </motion.span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <p className="text-xs text-gray-600">
                      Live activity
                    </p>
                  </div>
                  <Progress 
                    value={60} 
                    className="mt-3 h-2 bg-blue-100"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-blue-200 shadow-lg">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <PieChart className="h-4 w-4 mr-2" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="modules"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Modules
                </TabsTrigger>
                <TabsTrigger 
                  value="settings"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Recent Activity */}
                  <motion.div className="lg:col-span-2">
                    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <span>Recent Activity</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {loading ? (
                          [...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse flex space-x-4">
                              <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))
                        ) : (
                          stats.recentActivity.slice(0, 6).map((activity, index) => (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start space-x-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-200"
                            >
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                activity.type === 'success' ? 'bg-green-500' :
                                activity.type === 'error' ? 'bg-red-500' :
                                activity.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 truncate">
                                  {activity.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {activity.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div>
                    <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="h-5 w-5 text-blue-600" />
                          <span>Quick Actions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                            onClick={() => router.push('/modules')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Modules
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="outline" 
                            className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
                            onClick={() => setActiveTab('analytics')}
                          >
                            <LineChart className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                        </motion.div>
                        
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            variant="outline" 
                            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50"
                            onClick={regenerateKey}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Regenerate Key
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Line Chart */}
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          <LineChart className="h-5 w-5 text-blue-600" />
                          <span>Activity Trends</span>
                        </span>
                        <div className="flex space-x-2">
                          {['7d', '30d', '90d'].map((period) => (
                            <Button
                              key={period}
                              size="sm"
                              variant={chartPeriod === period ? "default" : "outline"}
                              onClick={() => setChartPeriod(period)}
                              className={chartPeriod === period ? "bg-blue-600" : ""}
                            >
                              {period}
                            </Button>
                          ))}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <Line data={lineChartData} options={chartOptions} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Doughnut Chart */}
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PieChart className="h-5 w-5 text-blue-600" />
                        <span>Request Distribution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <Doughnut data={doughnutData} options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'bottom' as const,
                            },
                          },
                        }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="modules" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Download className="h-5 w-5 text-blue-600" />
                        <span>Application Center</span>
                      </CardTitle>
                      <CardDescription>
                        Complete ranking system with API integration
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Most Popular</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          onClick={() => downloadModule('ApplicationCenter', modulesCodes.applicationCenter)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Module
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span>Ranking System</span>
                      </CardTitle>
                      <CardDescription>
                        Enhanced ranking with validation and error handling
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Target className="h-4 w-4 text-green-500" />
                        <span>Recommended</span>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          onClick={() => downloadModule('RankingSystem', modulesCodes.rankingSystem)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Module
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-white/70 backdrop-blur-sm shadow-lg border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5 text-blue-600" />
                        <span>Game Key Management</span>
                      </CardTitle>
                      <CardDescription>
                        Manage your game key and API access
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Your Game Key</label>
                        <div className="flex space-x-2">
                          <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md font-mono text-sm">
                            {gameKey || 'Loading...'}
                          </div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={copyGameKey}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={regenerateKey}
                              className="border-orange-300 text-orange-700 hover:bg-orange-50"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Use this key in your Roblox scripts to authenticate with our API
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Security Notice</h4>
                        <p className="text-sm text-blue-800">
                          Keep your game key secure. Don't share it publicly or commit it to version control.
                          Regenerate it if you suspect it has been compromised.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
}