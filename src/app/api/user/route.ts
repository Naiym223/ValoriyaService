import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    // In a real app, you'd verify the Firebase auth token here
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userData = userDoc.data();
    
    return NextResponse.json({ 
      success: true, 
      data: userData 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    const gameKey = 'VLR_' + Math.random().toString(36).substring(2, 15).toUpperCase();
    
    const defaultUserData = {
      id: userId,
      email: userData.email,
      displayName: userData.displayName || userData.email.split('@')[0],
      isVerified: false,
      createdAt: new Date(),
      subscription: {
        plan: 'free_trial',
        status: 'active',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        startedAt: new Date(),
        autoRenew: false
      },
      gameKey: gameKey,
      stats: {
        successfulRanks: 0,
        invalidRequests: 0,
        failedRequests: 0,
        totalRankings: 0
      }
    };

    await setDoc(userRef, defaultUserData);

    return NextResponse.json({ 
      success: true, 
      data: defaultUserData 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    });

    return NextResponse.json({ 
      success: true, 
      message: 'User updated successfully' 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}