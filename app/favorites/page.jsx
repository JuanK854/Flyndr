'use client';

import { useCallback, useEffect, useState } from 'react';
import FlightCard from '../components/FlightCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      if (data.success) setFavorites(data.favorites);
    } catch {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const removeFavorite = async (flight) => {
    const fid = flight.flightId || flight.flight_id;
    await fetch(`/api/favorites?flightId=${encodeURIComponent(fid)}`, { method: 'DELETE' });
    setFavorites(prev => prev.filter(f => f.flight_id !== fid));
  };

  // Normalize DB rows to FlightCard format
  const normalizeFav = (f) => ({
    flightId: f.flight_id,
    airline: f.airline,
    airlineCode: f.airline?.slice(0, 2).toUpperCase(),
    origin: f.origin,
    destination: f.destination,
    departureTime: f.departure_time || '—',
    arrivalTime: f.arrival_time || '—',
    duration: f.duration || '—',
    stops: f.stops || 0,
    price: f.price,
    currency: f.currency || 'USD',
    cabinClass: f.cabin_class || 'economy',
  });

  return (
    <main className="min-h-screen mesh-gradient px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-2">
            Saved Flights
          </h1>
          <p className="text-sm text-txt-secondary">
            Your favorite flights stored in the database. {favorites.length > 0 && `${favorites.length} saved.`}
          </p>
        </header>

        {loading ? (
          <div className="space-y-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="skeleton w-10 h-10 rounded-xl" />
                  <div className="skeleton h-4 w-32" />
                  <div className="skeleton h-6 w-16 ml-auto" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="skeleton h-5 w-12" />
                  <div className="flex-1 skeleton h-1" />
                  <div className="skeleton h-5 w-12" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a5168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-1">No favorites yet</h3>
            <p className="text-sm text-txt-secondary max-w-sm mx-auto">
              Search for flights and tap the heart icon to save them here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav, i) => (
              <FlightCard
                key={fav.flight_id}
                flight={normalizeFav(fav)}
                index={i}
                isFavorite={true}
                onToggleFavorite={removeFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
