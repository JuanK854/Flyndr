import { NextResponse } from 'next/server';
import { getPopularRoutes } from '@/app/lib/mockData';

export async function GET() {
  try {
    const routes = getPopularRoutes();
    return NextResponse.json({ success: true, routes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch popular routes' },
      { status: 500 }
    );
  }
}
