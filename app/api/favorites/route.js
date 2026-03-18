import { NextResponse } from 'next/server';
import { getFavorites, addFavorite, removeFavorite } from '@/app/lib/db';

export async function GET() {
  try {
    const favorites = await getFavorites();
    return NextResponse.json({ success: true, favorites });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites', message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.flightId || !body.airline || !body.origin || !body.destination || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: flightId, airline, origin, destination, price' },
        { status: 400 }
      );
    }

    await addFavorite(body);
    return NextResponse.json({ success: true, message: 'Flight added to favorites' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add favorite', message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const flightId = searchParams.get('flightId');

    if (!flightId) {
      return NextResponse.json(
        { error: 'flightId is required' },
        { status: 400 }
      );
    }

    await removeFavorite(flightId);
    return NextResponse.json({ success: true, message: 'Flight removed from favorites' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove favorite', message: error.message },
      { status: 500 }
    );
  }
}
