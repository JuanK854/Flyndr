import { NextResponse } from 'next/server';
import { searchFlightsAmadeus, isAmadeusConfigured } from '@/app/lib/amadeus';
import { searchMockFlights } from '@/app/lib/mockData';
import { logSearch } from '@/app/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const departureDate = searchParams.get('date');
    const passengers = parseInt(searchParams.get('passengers') || '1', 10);
    const cabinClass = searchParams.get('class') || 'economy';

    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origin and destination are required' },
        { status: 400 }
      );
    }

    // Log search to database
    await logSearch({ origin, destination, departureDate, passengers, cabinClass });

    let flights = [];
    let dataSource = 'mock';

    // Try Amadeus API first, fall back to mock data
    if (isAmadeusConfigured() && departureDate) {
      try {
        flights = await searchFlightsAmadeus({
          origin,
          destination,
          departureDate,
          passengers,
          cabinClass
        });
        dataSource = 'amadeus';
      } catch (err) {
        console.warn('Amadeus API error, falling back to mock data:', err.message);
        flights = searchMockFlights({ origin, destination, departureDate, passengers, cabinClass });
      }
    } else {
      flights = searchMockFlights({ origin, destination, departureDate, passengers, cabinClass });
    }

    return NextResponse.json({
      success: true,
      dataSource,
      count: flights.length,
      query: { origin, destination, departureDate, passengers, cabinClass },
      flights
    });
  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
