import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameKey = searchParams.get('gameKey');
    const userId = searchParams.get('userId');

    if (!gameKey || !userId) {
      return NextResponse.json({ 
        error: 'Game key and user ID required' 
      }, { status: 400 });
    }

    // Get all ranking requests for this game key
    const rankingRequestsRef = collection(db, 'rankingRequests');
    const q = query(
      rankingRequestsRef,
      where('gameKey', '==', gameKey)
    );

    const querySnapshot = await getDocs(q);
    const requests = querySnapshot.docs.map(doc => doc.data());

    // Calculate statistics
    const stats = {
      successfulRanks: requests.filter(r => r.status === 'success').length,
      invalidRequests: requests.filter(r => r.status === 'invalid').length,
      failedRequests: requests.filter(r => r.status === 'failed').length,
      totalRequests: requests.length,
      todayRequests: requests.filter(r => {
        const requestDate = r.createdAt?.toDate?.() || new Date(r.createdAt);
        const today = new Date();
        return requestDate.toDateString() === today.toDateString();
      }).length,
      recentActivity: requests
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime();
        })
        .slice(0, 10)
        .map(r => ({
          id: r.id || Math.random().toString(36).substring(7),
          targetUsername: r.targetUsername,
          toRank: r.toRank,
          status: r.status,
          reason: r.reason,
          createdAt: r.createdAt?.toDate?.() || new Date(r.createdAt)
        }))
    };

    // Get monthly trend (simplified)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const lastMonthRequests = requests.filter(r => {
      const requestDate = r.createdAt?.toDate?.() || new Date(r.createdAt);
      return requestDate >= lastMonth;
    });

    const trends = {
      successfulRanks: lastMonthRequests.filter(r => r.status === 'success').length,
      invalidRequests: lastMonthRequests.filter(r => r.status === 'invalid').length,
      failedRequests: lastMonthRequests.filter(r => r.status === 'failed').length
    };

    return NextResponse.json({ 
      success: true, 
      data: {
        ...stats,
        trends
      }
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}