import { NextResponse } from 'next/server';
import { estimateFlightQuote } from '@/app/lib/pricing';

function validateIATA(code) {
  return /^[A-Z]{3}$/.test(String(code || '').toUpperCase());
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin')?.toUpperCase()?.trim();
    const destination = searchParams.get('destination')?.toUpperCase()?.trim();
    const departureDate = searchParams.get('date') || '';
    const cabinClass = searchParams.get('class') || 'economy';
    const departureTime = searchParams.get('departureTime') || '';
    const airlineCode = searchParams.get('airlineCode') || '';
    const flightId = searchParams.get('flightId') || '';
    const passengers = parseInt(searchParams.get('passengers') || '1', 10);
    const durationMins = parseInt(searchParams.get('durationMins') || '180', 10);

    if (!origin || !destination || !validateIATA(origin) || !validateIATA(destination)) {
      return NextResponse.json(
        { error: 'Origin y destination deben ser codigos IATA validos de 3 letras.' },
        { status: 400 }
      );
    }

    if (passengers < 1 || passengers > 9) {
      return NextResponse.json(
        { error: 'El numero de pasajeros debe estar entre 1 y 9.' },
        { status: 400 }
      );
    }

    const quote = estimateFlightQuote({
      origin,
      destination,
      departureDate,
      passengers,
      cabinClass,
      durationMins,
      departureTime,
      airlineCode,
      flightId,
      source: 'internal-pricing'
    });

    return NextResponse.json({
      success: true,
      query: {
        origin,
        destination,
        departureDate,
        passengers,
        cabinClass,
        durationMins,
        departureTime,
        airlineCode
      },
      pricing: quote
    });
  } catch {
    return NextResponse.json(
      { error: 'Error interno al estimar precio' },
      { status: 500 }
    );
  }
}
