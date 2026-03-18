'use client';

import { useMemo, useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightList from './components/FlightList';

const MOCK_FLIGHTS = [
  {
    airline: 'Aeromexico',
    origin: 'MEX',
    destination: 'LAX',
    departureTime: '08:30',
    duration: '3h 20m',
    stops: 'Nonstop',
    priceUsd: 210
  },
  {
    airline: 'Volaris',
    origin: 'USA',
    destination: 'LAX',
    departureTime: '13:00',
    duration: '3h 50m',
    stops: '1 stop',
    priceUsd: 145
  },
  {
    airline: 'United',
    origin: 'China',
    destination: 'LAX',
    departureTime: '17:45',
    duration: '3h 10m',
    stops: 'Nonstop',
    priceUsd: 289
  }
];

export default function HomePage() {
  const [query, setQuery] = useState(null);

  const filteredFlights = useMemo(() => {
    if (!query) return [];

    const origin = query.origin.trim().toLowerCase();
    const destination = query.destination.trim().toLowerCase();

    return MOCK_FLIGHTS.filter((flight) => {
      const matchesOrigin = origin
        ? flight.origin.toLowerCase().includes(origin)
        : true;
      const matchesDestination = destination
        ? flight.destination.toLowerCase().includes(destination)
        : true;
      return matchesOrigin && matchesDestination;
    });
  }, [query]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-slate-950 to-background px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 sm:mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent mb-2">
            Flyndr
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Find your next flight.
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
            Explore a curated set of mock flights from Mexico City to Los Angeles.
            No real bookings, just a clean search interface.
          </p>
        </header>

        <SearchForm onSearch={setQuery} />

        <FlightList flights={filteredFlights} hasSearched={!!query} />
      </div>
    </main>
  );
}

