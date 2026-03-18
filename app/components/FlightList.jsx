'use client';

import { useMemo, useState } from 'react';
import FlightCard from './FlightCard';

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'duration', label: 'Duration' },
  { value: 'departure', label: 'Departure' },
];

export default function FlightList({ flights, loading, hasSearched, favoriteIds, onToggleFavorite }) {
  const [sort, setSort] = useState('price-asc');
  const [stopsFilter, setStopsFilter] = useState('all');

  const filteredAndSorted = useMemo(() => {
    let result = [...flights];

    // Filter by stops
    if (stopsFilter === 'nonstop') result = result.filter(f => f.stops === 0);
    else if (stopsFilter === '1stop') result = result.filter(f => f.stops <= 1);

    // Sort
    result.sort((a, b) => {
      switch (sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'duration': return parseDuration(a.duration) - parseDuration(b.duration);
        case 'departure': return a.departureTime.localeCompare(b.departureTime);
        default: return 0;
      }
    });

    return result;
  }, [flights, sort, stopsFilter]);

  // Loading skeletons
  if (loading) {
    return (
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 mb-4">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton h-8 w-24 ml-auto" />
        </div>
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="glass-card rounded-2xl p-5" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="skeleton w-10 h-10 rounded-xl" />
                <div>
                  <div className="skeleton h-4 w-28 mb-1.5" />
                  <div className="skeleton h-3 w-16" />
                </div>
              </div>
              <div className="skeleton h-7 w-16" />
            </div>
            <div className="flex items-center gap-4">
              <div className="skeleton h-6 w-14" />
              <div className="flex-1 skeleton h-1" />
              <div className="skeleton h-6 w-14" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state before search
  if (!hasSearched) return null;

  // No results
  if (flights.length === 0) {
    return (
      <div className="mt-12 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a5168" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
        </div>
        <h3 className="text-base font-semibold mb-1">No flights found</h3>
        <p className="text-sm text-txt-secondary max-w-sm mx-auto">
          We couldn&apos;t find flights for that route. Try different airports or adjust your dates.
        </p>
      </div>
    );
  }

  // Cheapest price
  const cheapest = Math.min(...flights.map(f => f.price));

  return (
    <div className="mt-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-txt-secondary">
          <span className="text-txt-primary font-semibold">{filteredAndSorted.length}</span> flight{filteredAndSorted.length !== 1 ? 's' : ''} found
          <span className="ml-2 text-accent-cyan font-semibold">from ${cheapest}</span>
        </p>

        <div className="flex items-center gap-2">
          {/* Stops filter */}
          <div className="flex items-center rounded-lg bg-white/[0.03] border border-white/[0.06] overflow-hidden">
            {[
              { value: 'all', label: 'All' },
              { value: 'nonstop', label: 'Direct' },
              { value: '1stop', label: '≤1 stop' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setStopsFilter(opt.value)}
                className={`px-3 py-1.5 text-xs font-medium transition-all ${
                  stopsFilter === opt.value
                    ? 'bg-accent-cyan/15 text-accent-cyan'
                    : 'text-txt-secondary hover:text-txt-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-1.5 text-xs font-medium text-txt-secondary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 cursor-pointer appearance-none"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-bg-secondary">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredAndSorted.map((flight, i) => (
          <FlightCard
            key={flight.flightId}
            flight={flight}
            index={i}
            isFavorite={favoriteIds?.has(flight.flightId)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {filteredAndSorted.length === 0 && flights.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-txt-secondary">No flights match your filters. Try adjusting them.</p>
        </div>
      )}
    </div>
  );
}

function parseDuration(str) {
  const match = str?.match(/(\d+)h\s*(\d+)?m?/);
  if (!match) return 9999;
  return (parseInt(match[1]) || 0) * 60 + (parseInt(match[2]) || 0);
}
