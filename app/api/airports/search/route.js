import { NextResponse } from 'next/server';
import { searchAirports } from '@/app/lib/mockData';
import { searchAirportsAmadeus, isAmadeusConfigured } from '@/app/lib/amadeus';

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

    // Try Amadeus first if configured
    if (isAmadeusConfigured() && keyword.length >= 2) {
      try {
        airports = await searchAirportsAmadeus(keyword);
      } catch {
        airports = searchAirports(keyword);
      }
    } else {
      airports = searchAirports(keyword);
    }

    return NextResponse.json({ success: true, airports });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al buscar aeropuertos', message: error.message },
      { status: 500 }
    );
  }
}
