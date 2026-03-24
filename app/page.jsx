'use client';

import { useCallback, useEffect, useState } from 'react';
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

  // Cargar favoritos al montar (bug fix: useEffect en lugar de useState)
  useEffect(() => {
    fetch('/api/favorites')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setFavoriteIds(new Set(data.favorites.map(f => f.flight_id)));
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setHasSearched(true);

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
        setDataSource('');
      }
    } catch {
      setFlights([]);
      setDataSource('');
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
            Motor de Búsqueda de Vuelos
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-3 bg-gradient-to-r from-white via-white to-txt-secondary bg-clip-text text-transparent">
            Descubre tu próximo
            <br className="sm:hidden" /> destino
          </h1>
          <p className="max-w-lg mx-auto text-sm text-txt-secondary leading-relaxed">
            Busca vuelos en tiempo real en más de 25 rutas. Desarrollado con Next.js, API de Amadeus y SQLite.
          </p>
        </header>

        {/* Búsqueda: z-index e isolate para que el autocompletado quede por encima de rutas/historial */}
        <div className="relative z-30 isolate">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Badge de fuente de datos */}
        {hasSearched && !loading && dataSource && (
          <div className="flex justify-center mt-3 animate-fade-in">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
              dataSource === 'amadeus'
                ? 'badge-cyan'
                : 'bg-white/[0.04] text-txt-muted border border-white/[0.06]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dataSource === 'amadeus' ? 'bg-accent-cyan' : 'bg-txt-muted'}`} />
              {dataSource === 'amadeus' ? 'Datos en vivo — Amadeus API' : 'Datos de demostración'}
            </span>
          </div>
        )}

        {/* Resultados */}
        <FlightList
          flights={flights}
          loading={loading}
          hasSearched={hasSearched}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />

        {/* Rutas populares e historial (solo cuando no hay búsqueda activa) */}
        {!hasSearched && (
          <div className="relative z-0 space-y-2">
            <PopularRoutes onQuickSearch={handleQuickSearch} />
            <SearchHistory onQuickSearch={handleQuickSearch} refreshKey={historyRefresh} />
          </div>
        )}

        <footer className="mt-16 pb-6 text-center">
          <p className="text-xs text-txt-muted">
            Flyndr — UTCH DS51M · Next.js 14, Node.js API Routes, SQLite &amp; Amadeus API
          </p>
        </footer>
      </div>
    </main>
  );
}
