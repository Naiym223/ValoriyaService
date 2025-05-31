import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, limit as firestoreLimit, getDocs } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameKey, userId, username, action, details, timestamp } = body;

    // Validate required fields
    if (!gameKey || !userId || !action) {
      return NextResponse.json({ 
        error: 'Missing required fields: gameKey, userId, action' 
      }, { status: 400 });
    }

    // Validate game key format
    if (!gameKey.startsWith('VLR_')) {
      return NextResponse.json({ 
        error: 'Invalid game key format' 
      }, { status: 400 });
    }

    const activityLog = {
      gameKey,
      userId,
      username: username || `User${userId}`,
      action,
      details: details || {},
      timestamp: timestamp ? new Date(timestamp * 1000) : new Date(),
      createdAt: new Date()
    };

    // Log the activity
    await addDoc(collection(db, 'activityLogs'), activityLog);

    return NextResponse.json({ 
      success: true,
      data: activityLog,
      message: 'Activity logged successfully'
    });

  } catch (error) {
    console.error('Error logging activity:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameKey = searchParams.get('gameKey');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (!gameKey) {
      return NextResponse.json({ error: 'Game key required' }, { status: 400 });
    }

    // Build query
    let constraints = [where('gameKey', '==', gameKey)];
    
    if (userId) {
      constraints.push(where('userId', '==', parseInt(userId)));
    }
    
    if (action) {
      constraints.push(where('action', '==', action));
    }

    const activityLogsRef = collection(db, 'activityLogs');
    const q = query(
      activityLogsRef,
      ...constraints,
      orderBy('timestamp', 'desc'),
      firestoreLimit(limit)
    );

    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
      createdAt: doc.data().createdAt?.toDate()
    }));

    return NextResponse.json({ 
      success: true, 
      data: activities
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}