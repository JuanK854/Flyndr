'use client';

export default function FlightCard({ flight, index, isFavorite, onToggleFavorite }) {
  const stopsLabel = flight.stops === 0 ? 'Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`;
  const stopsColor = flight.stops === 0 ? 'badge-emerald' : 'badge-amber';
  const seatsLabel =
    typeof flight.seatsLeft === 'number'
      ? `${flight.seatsLeft} asiento${flight.seatsLeft === 1 ? '' : 's'}`
      : 'Disponibilidad estimada';
  const detailPill =
    'text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-[color:var(--surface-ticket)] text-txt-secondary border border-[color:var(--border-subtle)]';

  return (
    <article
      className="glass-card ticket-surface rounded-2xl overflow-hidden animate-fade-in-up group hover:border-[color:var(--border-active)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.24)] transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-amber/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-4 sm:p-5">
        {/* Header: Aerolínea + Precio */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[color:var(--surface-ticket)] to-transparent border border-[color:var(--border-subtle)] flex items-center justify-center text-xs font-bold font-display text-accent-cyan tracking-wider shrink-0">
              {flight.airlineCode || flight.airline?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-tight">{flight.airline}</h3>
              <p className="text-xs text-txt-muted mt-0.5">{flight.flightNumber || 'Vuelo programado'}</p>
            </div>
          </div>

          <div className="text-right flex items-start gap-2">
            <div>
              <p className="text-xl sm:text-2xl font-bold font-display text-accent-cyan leading-none">
                ${flight.price}
              </p>
              <p className="text-[10px] text-txt-muted mt-0.5 uppercase tracking-wider">
                {flight.currency || 'USD'} {flight.priceSource === 'estimated' ? '· Estimado' : ''}
              </p>
            </div>
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(flight)}
                className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[color:var(--surface-ticket)] transition-colors"
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                     fill={isFavorite ? 'var(--accent-rose)' : 'none'}
                     stroke={isFavorite ? 'var(--accent-rose)' : 'var(--text-muted)'}
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="transition-colors">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Ruta */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="text-left min-w-0">
            <p className="text-lg sm:text-xl font-bold font-display leading-none">{flight.departureTime}</p>
            <p className="text-sm font-semibold mt-1">{flight.origin}</p>
            {flight.originCity && (
              <p className="text-[11px] text-txt-muted truncate max-w-[100px]">{flight.originCity}</p>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 px-2">
            <p className="text-[10px] text-txt-muted tracking-wide">{flight.duration}</p>
            <div className="w-full flex items-center gap-1">
              <div className="h-[3px] w-[3px] rounded-full bg-accent-cyan shrink-0" />
              <div className="flex-1 h-[1px] bg-gradient-to-r from-accent-cyan/60 via-txt-muted/35 to-accent-amber/60 relative">
                {flight.stops > 0 && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-amber border border-bg-primary" />
                )}
              </div>
              <div className="h-[3px] w-[3px] rounded-full bg-accent-amber shrink-0" />
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stopsColor}`}>
              {stopsLabel}
            </span>
          </div>

          <div className="text-right min-w-0">
            <p className="text-lg sm:text-xl font-bold font-display leading-none">{flight.arrivalTime || '—'}</p>
            <p className="text-sm font-semibold mt-1">{flight.destination}</p>
            {flight.destinationCity && (
              <p className="text-[11px] text-txt-muted truncate max-w-[100px]">{flight.destinationCity}</p>
            )}
          </div>
        </div>

        {/* Footer badges */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[color:var(--border-subtle)]">
          <span className={detailPill}>{stopsLabel}</span>
          <span className={detailPill}>{seatsLabel}</span>
          {flight.cabinClass && (
            <span className={detailPill}>
              {flight.cabinClass === 'economy' ? 'Económica' : flight.cabinClass === 'business' ? 'Business' : 'Primera'}
            </span>
          )}
          {typeof flight.seatsLeft === 'number' && flight.seatsLeft <= 5 && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg bg-accent-rose/10 text-accent-rose border border-accent-rose/30">
              Quedan pocos
            </span>
          )}
          {flight.source && (
            <span className="ml-auto text-[10px] uppercase tracking-wider text-txt-muted">
              {flight.source === 'aviationstack' ? '● Operación en vivo' : '● Referencia'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
