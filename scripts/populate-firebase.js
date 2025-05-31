// Script to populate Firebase with test data
// Run this to ensure the dashboard shows real data

const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to add your service account key)
// For production, use environment variables
const serviceAccount = {
  "type": "service_account",
  "project_id": "valoriyaservice",
  // Add your Firebase service account credentials here
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://valoriyaservice-default-rtdb.firebaseio.com"
  });
}

const db = admin.firestore();

async function populateTestData() {
  console.log('🚀 Populating Firebase with test data...');

  // Test game key
  const testGameKey = 'VLR_123456789';
  const testUserId = 'test_user_001';

  try {
    // 1. Add test users
    await db.collection('users').doc(testUserId).set({
      userId: testUserId,
      username: 'TestUser001',
      gameKey: testGameKey,
      joinDate: new Date(),
      lastActive: new Date(),
      totalPlayTime: 7200, // 2 hours
      rank: 100,
      groupId: 12345,
      permissions: ['rank_others'],
      stats: {
        totalRanks: 15,
        activeSessions: 3,
        averageSessionTime: 2400
      }
    });

    // 2. Add test activities
    const activities = [
      {
        gameKey: testGameKey,
        userId: testUserId,
        username: 'TestUser001',
        action: 'player_joined',
        details: { server_id: 'server_001' },
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        gameKey: testGameKey,
        userId: testUserId,
        username: 'TestUser001',
        action: 'rank_player',
        details: { 
          target_user: 'Player123',
          from_rank: 1,
          to_rank: 100,
          reason: 'Promotion'
        },
        timestamp: new Date(Date.now() - 1800000), // 30 min ago
        createdAt: new Date(Date.now() - 1800000)
      },
      {
        gameKey: testGameKey,
        userId: 'user_002',
        username: 'Player123',
        action: 'activity_logged',
        details: { 
          activity_type: 'quest_completed',
          quest_id: 'quest_001'
        },
        timestamp: new Date(Date.now() - 900000), // 15 min ago
        createdAt: new Date(Date.now() - 900000)
      }
    ];

    for (const activity of activities) {
      await db.collection('activities').add(activity);
    }

    // 3. Add test ranking requests
    const rankingRequests = [
      {
        gameKey: testGameKey,
        targetUserId: 'player_001',
        targetUsername: 'Player001',
        toRank: 100,
        groupId: 12345,
        reason: 'Automatic promotion',
        status: 'success',
        requestedBy: testUserId,
        createdAt: new Date(Date.now() - 7200000), // 2 hours ago
        processedAt: new Date(Date.now() - 7100000)
      },
      {
        gameKey: testGameKey,
        targetUserId: 'player_002',
        targetUsername: 'Player002',
        toRank: 150,
        groupId: 12345,
        reason: 'VIP upgrade',
        status: 'success',
        requestedBy: testUserId,
        createdAt: new Date(Date.now() - 5400000), // 1.5 hours ago
        processedAt: new Date(Date.now() - 5300000)
      },
      {
        gameKey: testGameKey,
        targetUserId: 'player_003',
        targetUsername: 'Player003',
        toRank: 1,
        groupId: 12345,
        reason: 'Demotion for inactivity',
        status: 'failed',
        requestedBy: testUserId,
        createdAt: new Date(Date.now() - 3600000), // 1 hour ago
        error: 'Insufficient permissions'
      }
    ];

    for (const request of rankingRequests) {
      await db.collection('rankingRequests').add(request);
    }

    // 4. Add analytics data
    await db.collection('analytics').doc('dashboard_stats').set({
      gameKey: testGameKey,
      totalUsers: 1247,
      activeUsers: 89,
      totalActivities: 15463,
      totalRankings: 342,
      successRate: 94.2,
      averageSessionTime: 2100,
      peakUsers: 156,
      lastUpdated: new Date(),
      monthlyStats: {
        newUsers: 134,
        totalSessions: 2341,
        totalPlayTime: 89234,
        activeDays: 28
      }
    });

    // 5. Add module download tracking
    const moduleDownloads = [
      {
        gameKey: testGameKey,
        userId: testUserId,
        moduleId: 'ranking-gui-v2',
        moduleName: 'Advanced Ranking GUI v2.0',
        downloadTime: new Date(Date.now() - 1800000),
        fileType: 'lua'
      },
      {
        gameKey: testGameKey,
        userId: 'user_003',
        moduleId: 'complete-gui-system',
        moduleName: 'Complete GUI System (RBXL)',
        downloadTime: new Date(Date.now() - 3600000),
        fileType: 'rbxl'
      }
    ];

    for (const download of moduleDownloads) {
      await db.collection('moduleDownloads').add(download);
    }

    console.log('✅ Test data populated successfully!');
    console.log('📊 Data includes:');
    console.log('   - User profiles and stats');
    console.log('   - Activity logs');
    console.log('   - Ranking requests');
    console.log('   - Analytics data');
    console.log('   - Module download tracking');
    console.log('');
    console.log('🎮 Test Game Key:', testGameKey);
    console.log('👤 Test User ID:', testUserId);

  } catch (error) {
    console.error('❌ Error populating data:', error);
  }
}

// Run the population script
if (require.main === module) {
  populateTestData()
    .then(() => {
      console.log('🏁 Script completed');
      process.exit(0);
    })
    .catch(error => {
      console.error('Script failed:', error);
      process.exit(1);
    });
}

module.exports = { populateTestData };