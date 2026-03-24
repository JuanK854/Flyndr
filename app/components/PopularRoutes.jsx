'use client';

import { useEffect, useState } from 'react';

export default function PopularRoutes({ onQuickSearch }) {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('/api/flights/popular')
      .then(r => r.json())
      .then(data => { if (data.success) setRoutes(data.routes); })
      .catch(() => {});
  }, []);

  if (routes.length === 0) return null;

  return (
    <section className="relative z-0 mt-12 sm:mt-14 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h2 className="text-sm font-semibold text-txt-secondary uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-amber">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Rutas Populares
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {routes.map((route, i) => (
          <button
            key={`${route.origin}-${route.destination}`}
            onClick={() => onQuickSearch({ origin: route.origin, destination: route.destination })}
            className="glass-card rounded-xl p-3.5 text-left hover:border-accent-cyan/20 hover:bg-white/[0.04] transition-all group animate-fade-in-up"
            style={{ animationDelay: `${300 + i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{route.emoji}</span>
              <span className="text-xs font-semibold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                Buscar →
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold font-display tracking-wide">
              <span>{route.origin}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4a5168" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
              <span>{route.destination}</span>
            </div>
            <p className="text-[11px] text-txt-muted mt-1">{route.originCity} → {route.destCity}</p>
            <p className="text-xs font-semibold text-txt-secondary mt-1.5">
              desde <span className="text-accent-emerald">${route.avgPrice}</span>
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
