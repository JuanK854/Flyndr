import { NextResponse } from 'next/server';
import { searchAirports } from '@/app/lib/mockData';
import { searchAirportsAviationStack, isAviationStackConfigured } from '@/app/lib/aviationStack';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('q') || '';

    if (!keyword || keyword.length < 1) {
      return NextResponse.json({ success: true, airports: [] });
    }

    // Validate: solo letras
    if (!/^[a-zA-Z\s]+$/.test(keyword)) {
      return NextResponse.json({ success: true, airports: [] });
    }

    let airports = [];

    // Try Aviation Stack first if configured
    if (isAviationStackConfigured() && keyword.length >= 2) {
      try {
        airports = await searchAirportsAviationStack(keyword);
      } catch {
        airports = searchAirports(keyword);
      }
    } else {
      airports = searchAirports(keyword);
    }

    return NextResponse.json({ success: true, airports });
  } catch {
    return NextResponse.json(
      { error: 'Error al buscar aeropuertos' },
      { status: 500 }
    );
  }
}
