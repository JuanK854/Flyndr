import { NextResponse } from 'next/server';
import { searchFlightsAviationStack, isAviationStackConfigured } from '@/app/lib/aviationStack';
import { searchMockFlights } from '@/app/lib/mockData';
import { logSearch } from '@/app/lib/db';

function validateIATA(code) {
  return /^[A-Z]{3}$/.test(code?.toUpperCase() || '');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin')?.toUpperCase()?.trim();
    const destination = searchParams.get('destination')?.toUpperCase()?.trim();
    const departureDate = searchParams.get('date');
    const passengers = parseInt(searchParams.get('passengers') || '1', 10);
    const cabinClass = searchParams.get('class') || 'economy';

    // Validación de campos requeridos
    if (!origin || !destination) {
      return NextResponse.json(
        { error: 'Origen y destino son requeridos' },
        { status: 400 }
      );
    }

    // Validación de formato IATA (3 letras)
    if (!validateIATA(origin)) {
      return NextResponse.json(
        { error: 'El código de origen debe tener 3 letras (ej. MEX, LAX)' },
        { status: 400 }
      );
    }

    if (!validateIATA(destination)) {
      return NextResponse.json(
        { error: 'El código de destino debe tener 3 letras (ej. CUN, JFK)' },
        { status: 400 }
      );
    }

    if (origin === destination) {
      return NextResponse.json(
        { error: 'El origen y destino no pueden ser iguales' },
        { status: 400 }
      );
    }

    if (passengers < 1 || passengers > 9) {
      return NextResponse.json(
        { error: 'El número de pasajeros debe estar entre 1 y 9' },
        { status: 400 }
      );
    }

    // Registrar búsqueda en base de datos
    await logSearch({ origin, destination, departureDate, passengers, cabinClass });

    let flights = [];
    let dataSource = 'mock';

    if (isAviationStackConfigured() && departureDate) {
      try {
        flights = await searchFlightsAviationStack({
          origin,
          destination,
          departureDate,
          passengers,
          cabinClass
        });
        dataSource = 'aviationstack';
      } catch {
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
  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
