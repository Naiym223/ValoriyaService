'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Key, 
  BarChart3, 
  Shield, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  displayName: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt: Date;
  };
  gameKey: string;
  stats: {
    successfulRanks: number;
    invalidRequests: number;
    failedRequests: number;
  };
  createdAt: Date;
  lastActive?: Date;
}

interface AuthKey {
  id: string;
  key: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  usageCount: number;
  expiresAt?: Date;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [authKeys, setAuthKeys] = useState<AuthKey[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin (in real app, check server-side)
    if (!user || !isAdmin(user.email)) {
      router.push('/dashboard');
      return;
    }

    loadData();
  }, [user, router]);

  const isAdmin = (email: string | null) => {
    // In a real app, this would be stored in the database
    const adminEmails = ['admin@valoriya.service', 'naiym223@example.com'];
    return email ? adminEmails.includes(email) : false;
  };

  const loadData = async () => {
    setLoading(true);
    try {
      // Mock data - in real app, fetch from API
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'user1@example.com',
          displayName: 'John Doe',
          subscription: {
            plan: 'Free Trial',
            status: 'active',
            expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
          },
          gameKey: 'VLR_ABC123DEF456',
          stats: {
            successfulRanks: 150,
            invalidRequests: 5,
            failedRequests: 2
          },
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: '2',
          email: 'user2@example.com',
          displayName: 'Jane Smith',
          subscription: {
            plan: 'Monthly',
            status: 'active',
            expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
          },
          gameKey: 'VLR_GHI789JKL012',
          stats: {
            successfulRanks: 89,
            invalidRequests: 12,
            failedRequests: 0
          },
          createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          lastActive: new Date(Date.now() - 30 * 60 * 1000)
        }
      ];

      const mockAuthKeys: AuthKey[] = [
        {
          id: '1',
          key: 'AUTH_MASTER_001',
          description: 'Master admin key',
          isActive: true,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          usageCount: 1523
        },
        {
          id: '2',
          key: 'AUTH_DIST_002',
          description: 'Distribution key for resellers',
          isActive: true,
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          usageCount: 89,
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        }
      ];

      setUsers(mockUsers);
      setAuthKeys(mockAuthKeys);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAuthKey = () => {
    const newKey: AuthKey = {
      id: Date.now().toString(),
      key: 'AUTH_' + Math.random().toString(36).substring(2, 15).toUpperCase(),
      description: 'New auth key',
      isActive: true,
      createdAt: new Date(),
      usageCount: 0
    };
    setAuthKeys([...authKeys, newKey]);
  };

  const toggleKeyStatus = (keyId: string) => {
    setAuthKeys(authKeys.map(key => 
      key.id === keyId ? { ...key, isActive: !key.isActive } : key
    ));
  };

  const deleteKey = (keyId: string) => {
    setAuthKeys(authKeys.filter(key => key.id !== keyId));
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user || !isAdmin(user.email)) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You don&apos;t have permission to access the admin panel.</p>
            <Button onClick={() => router.push('/dashboard')} className="w-full mt-4">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <div className="flex items-center space-x-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4" />
              <span>Administrator</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button onClick={loadData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-valoriya-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +3 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
              <Key className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{authKeys.filter(k => k.isActive).length}</div>
              <p className="text-xs text-muted-foreground">
                {authKeys.length} total keys
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rankings</CardTitle>
              <BarChart3 className="h-4 w-4 text-valoriya-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.reduce((sum, user) => sum + user.stats.successfulRanks, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.subscription.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((users.filter(u => u.subscription.status === 'active').length / users.length) * 100)}% active
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="keys">Auth Keys</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and subscriptions</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="font-semibold">{user.displayName}</h3>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                            <div className="flex space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                user.subscription.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.subscription.plan}
                              </span>
                              {user.lastActive && (
                                <span className="text-xs text-gray-500">
                                  Last active: {user.lastActive.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Rankings:</span>{' '}
                              <span className="font-medium">{user.stats.successfulRanks}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Game Key:</span>{' '}
                              <code className="text-xs bg-gray-100 px-1 rounded">{user.gameKey}</code>
                            </div>
                            <div>
                              <span className="text-gray-500">Expires:</span>{' '}
                              <span className="font-medium">{user.subscription.expiresAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Authentication Keys</CardTitle>
                    <CardDescription>Manage admin and distribution keys</CardDescription>
                  </div>
                  <Button onClick={generateAuthKey}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {authKeys.map((authKey, index) => (
                    <motion.div
                      key={authKey.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="font-semibold font-mono">{authKey.key}</h3>
                              <p className="text-sm text-gray-600">{authKey.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                authKey.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {authKey.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {authKey.expiresAt && (
                                <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                  Expires: {authKey.expiresAt.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Created:</span>{' '}
                              <span className="font-medium">{authKey.createdAt.toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Usage Count:</span>{' '}
                              <span className="font-medium">{authKey.usageCount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleKeyStatus(authKey.id)}
                          >
                            {authKey.isActive ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteKey(authKey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly subscription revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-bold text-valoriya-blue-600">$125.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-bold">$98.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Growth</span>
                      <span className="font-bold text-green-600">+26.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Service status and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">125ms</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Roblox API Status</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Online</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Status</span>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Healthy</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}