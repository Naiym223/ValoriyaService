import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit as firestoreLimit, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameKey, targetUserId, targetUsername, toRank, groupId, reason } = body;

    // Validate required fields
    if (!gameKey || !targetUserId || !toRank || !groupId) {
      return NextResponse.json({ 
        error: 'Missing required fields: gameKey, targetUserId, toRank, groupId' 
      }, { status: 400 });
    }

    // In a real implementation, you'd query for the user with this game key
    // For now, we'll simulate the process

    // Validate game key format
    if (!gameKey.startsWith('VLR_')) {
      return NextResponse.json({ 
        error: 'Invalid game key format' 
      }, { status: 400 });
    }

    // Simulate Roblox API call
    const rankingSuccess = await simulateRobloxRanking({
      groupId,
      targetUserId,
      toRank
    });

    const rankingRequest = {
      gameKey,
      targetUserId,
      targetUsername: targetUsername || `User${targetUserId}`,
      toRank,
      groupId,
      reason: reason || 'API Request',
      status: rankingSuccess ? 'success' : 'failed',
      createdAt: new Date(),
      completedAt: rankingSuccess ? new Date() : null
    };

    // Log the ranking request
    await addDoc(collection(db, 'rankingRequests'), rankingRequest);

    // Update user stats (you'd need to find the user first)
    // This is simplified for the demo
    
    return NextResponse.json({ 
      success: rankingSuccess,
      data: rankingRequest,
      message: rankingSuccess ? 'User ranked successfully' : 'Ranking failed'
    });

  } catch (error) {
    console.error('Error processing ranking request:', error);
    
    // Log failed request
    try {
      const body = await request.json();
      await addDoc(collection(db, 'rankingRequests'), {
        gameKey: body?.gameKey || 'unknown',
        targetUserId: body?.targetUserId || 0,
        status: 'failed',
        reason: 'Internal server error',
        createdAt: new Date()
      });
    } catch (logError) {
      console.error('Error logging failed request:', logError);
    }

    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

async function simulateRobloxRanking(data: {
  groupId: number;
  targetUserId: number;
  toRank: number;
}): Promise<boolean> {
  // This would normally make actual Roblox API calls
  // For demo purposes, we'll simulate success/failure
  
  // Simulate some validation
  if (data.toRank < 1 || data.toRank > 255) {
    return false;
  }

  if (data.targetUserId < 1) {
    return false;
  }

  // Simulate 95% success rate
  return Math.random() > 0.05;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameKey = searchParams.get('gameKey');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!gameKey) {
      return NextResponse.json({ error: 'Game key required' }, { status: 400 });
    }

    // Query Firestore for ranking requests with the given game key
    const rankingRequestsRef = collection(db, 'rankingRequests');
    const q = query(
      rankingRequestsRef,
      where('gameKey', '==', gameKey),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limit)
    );

    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      completedAt: doc.data().completedAt?.toDate()
    }));

    return NextResponse.json({ 
      success: true, 
      data: requests
    });

  } catch (error) {
    console.error('Error fetching ranking requests:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}