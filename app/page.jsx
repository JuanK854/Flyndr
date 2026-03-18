'use client';

import { useCallback, useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightList from './components/FlightList';
import PopularRoutes from './components/PopularRoutes';
import SearchHistory from './components/SearchHistory';

export default function HomePage() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [dataSource, setDataSource] = useState('');
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [lastQuery, setLastQuery] = useState(null);

  // Load favorites on mount
  useState(() => {
    fetch('/api/favorites')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setFavoriteIds(new Set(data.favorites.map(f => f.flight_id)));
        }
      })
      .catch(() => {});
  });

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setHasSearched(true);
    setLastQuery(query);

    const params = new URLSearchParams({
      origin: query.origin,
      destination: query.destination,
      ...(query.date && { date: query.date }),
      ...(query.passengers && { passengers: String(query.passengers) }),
      ...(query.cabinClass && { class: query.cabinClass }),
    });

    try {
      const res = await fetch(`/api/flights/search?${params}`);
      const data = await res.json();

      if (data.success) {
        setFlights(data.flights);
        setDataSource(data.dataSource);
      } else {
        setFlights([]);
      }
    } catch {
      setFlights([]);
    } finally {
      setLoading(false);
      setHistoryRefresh(prev => prev + 1);
    }
  }, []);

  const handleQuickSearch = useCallback((route) => {
    handleSearch({
      origin: route.origin,
      destination: route.destination,
      date: route.date || '',
      passengers: 1,
      cabinClass: 'economy'
    });
  }, [handleSearch]);

  const toggleFavorite = useCallback(async (flight) => {
    const isFav = favoriteIds.has(flight.flightId);

    if (isFav) {
      await fetch(`/api/favorites?flightId=${encodeURIComponent(flight.flightId)}`, { method: 'DELETE' });
      setFavoriteIds(prev => {
        const next = new Set(prev);
        next.delete(flight.flightId);
        return next;
      });
    } else {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flight)
      });
      setFavoriteIds(prev => new Set([...prev, flight.flightId]));
    }
  }, [favoriteIds]);

  return (
    <main className="min-h-screen mesh-gradient px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <header className="mb-8 text-center animate-fade-in">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent-cyan mb-3">
            Flight Search Engine
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-3 bg-gradient-to-r from-white via-white to-txt-secondary bg-clip-text text-transparent">
            Discover your next
            <br className="sm:hidden" /> destination
          </h1>
          <p className="max-w-lg mx-auto text-sm text-txt-secondary leading-relaxed">
            Search real-time flight offers across 25+ routes. Powered by Node.js, Amadeus API, and SQLite.
          </p>
        </header>

        {/* Search */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Data source badge */}
        {hasSearched && !loading && dataSource && (
          <div className="flex justify-center mt-3 animate-fade-in">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
              dataSource === 'amadeus'
                ? 'badge-cyan'
                : 'bg-white/[0.04] text-txt-muted border border-white/[0.06]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dataSource === 'amadeus' ? 'bg-accent-cyan' : 'bg-txt-muted'}`} />
              {dataSource === 'amadeus' ? 'Live Data — Amadeus API' : 'Demo Data — Mock Flights'}
            </span>
          </div>
        )}

        {/* Results */}
        <FlightList
          flights={flights}
          loading={loading}
          hasSearched={hasSearched}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />

        {/* Show popular routes and history when no search */}
        {!hasSearched && (
          <>
            <PopularRoutes onQuickSearch={handleQuickSearch} />
            <SearchHistory onQuickSearch={handleQuickSearch} refreshKey={historyRefresh} />
          </>
        )}

        {/* Footer */}
        <footer className="mt-16 pb-6 text-center">
          <p className="text-xs text-txt-muted">
            Flyndr &mdash; Built with Next.js 14, Node.js API Routes, SQLite &amp; Amadeus API
          </p>
        </footer>
      </div>
    </main>
  );
}
