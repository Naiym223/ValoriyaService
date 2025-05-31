// Test script to populate Firebase with sample data via API calls
// This ensures the Firebase collections are created and populated with real data

const baseUrl = 'http://localhost:3001'; // Update with your deployment URL
const testGameKey = 'VLR_123456789';

async function makeApiCall(endpoint, data) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log(`✅ ${endpoint}:`, result);
    return result;
  } catch (error) {
    console.error(`❌ ${endpoint}:`, error.message);
    return null;
  }
}

async function populateData() {
  console.log('🚀 Populating Firebase with test data via API...');
  console.log('📡 Base URL:', baseUrl);
  console.log('🎮 Game Key:', testGameKey);
  
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 1. Log user activities
  const activities = [
    {
      gameKey: testGameKey,
      userId: 'test_user_001',
      username: 'TestUser001',
      action: 'player_joined',
      details: { server_id: 'server_001', location: 'spawn' },
      timestamp: Math.floor((Date.now() - 3600000) / 1000) // 1 hour ago
    },
    {
      gameKey: testGameKey,
      userId: 'test_user_001',
      username: 'TestUser001',
      action: 'rank_player',
      details: { 
        target_user: 'Player123',
        from_rank: 1,
        to_rank: 100,
        reason: 'Promotion test'
      },
      timestamp: Math.floor((Date.now() - 1800000) / 1000) // 30 min ago
    },
    {
      gameKey: testGameKey,
      userId: 'user_002',
      username: 'Player123',
      action: 'module_download',
      details: { 
        module_id: 'ranking-gui-v2',
        module_name: 'Advanced Ranking GUI v2.0',
        file_type: 'lua'
      },
      timestamp: Math.floor((Date.now() - 900000) / 1000) // 15 min ago
    },
    {
      gameKey: testGameKey,
      userId: 'user_003',
      username: 'AdminUser',
      action: 'activity_tracker_opened',
      details: { 
        session_id: 'session_001',
        dashboard_version: '2.0'
      },
      timestamp: Math.floor((Date.now() - 300000) / 1000) // 5 min ago
    }
  ];

  for (const activity of activities) {
    await makeApiCall('/api/activity', activity);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
  }

  // 2. Make ranking requests
  const rankingRequests = [
    {
      gameKey: testGameKey,
      targetUserId: 'player_001',
      targetUsername: 'Player001',
      toRank: 100,
      groupId: 12345,
      reason: 'Automatic promotion via API test'
    },
    {
      gameKey: testGameKey,
      targetUserId: 'player_002', 
      targetUsername: 'Player002',
      toRank: 150,
      groupId: 12345,
      reason: 'VIP upgrade test'
    },
    {
      gameKey: testGameKey,
      targetUserId: 'player_003',
      targetUsername: 'Player003',
      toRank: 1,
      groupId: 12345,
      reason: 'Demotion test'
    }
  ];

  for (const request of rankingRequests) {
    await makeApiCall('/api/ranking', request);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
  }

  // 3. Create user profiles
  const users = [
    {
      gameKey: testGameKey,
      userId: 'test_user_001',
      username: 'TestUser001',
      profile: {
        joinDate: new Date().toISOString(),
        totalPlayTime: 7200,
        rank: 100,
        groupId: 12345,
        permissions: ['rank_others', 'view_analytics']
      }
    },
    {
      gameKey: testGameKey,
      userId: 'user_002',
      username: 'Player123',
      profile: {
        joinDate: new Date().toISOString(),
        totalPlayTime: 3600,
        rank: 100,
        groupId: 12345,
        permissions: ['basic_user']
      }
    }
  ];

  for (const user of users) {
    await makeApiCall('/api/user', user);
    await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
  }

  console.log('');
  console.log('✅ Test data population completed!');
  console.log('📊 Data created:');
  console.log(`   - ${activities.length} activity logs`);
  console.log(`   - ${rankingRequests.length} ranking requests`);
  console.log(`   - ${users.length} user profiles`);
  console.log('');
  console.log('🔥 Firebase collections should now contain real data:');
  console.log('   - activities');
  console.log('   - rankingRequests');  
  console.log('   - users');
  console.log('');
  console.log('🎯 Dashboard should now display real statistics!');
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { populateData, testGameKey };
}

// Run if called directly
if (typeof window === 'undefined' && require.main === module) {
  populateData().catch(console.error);
}