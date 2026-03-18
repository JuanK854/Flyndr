import { NextResponse } from 'next/server';
import { getSearchHistory, clearSearchHistory } from '@/app/lib/db';

export async function GET() {
  try {
    const history = await getSearchHistory(15);
    return NextResponse.json({ success: true, history });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch search history', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearSearchHistory();
    return NextResponse.json({ success: true, message: 'Search history cleared' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear search history', message: error.message },
      { status: 500 }
    );
  }
}
