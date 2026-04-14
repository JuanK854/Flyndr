'use client';

import { useState } from 'react';
import AirportInput from './AirportInput';

export default function SearchForm({ onSearch, loading }) {
  const [origin, setOrigin] = useState('ZCL');
  const [destination, setDestination] = useState('MEX');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const orig = origin.trim().toUpperCase();
    const dest = destination.trim().toUpperCase();

    if (!orig || !dest) {
      setError('Por favor ingresa origen y destino.');
      return;
    }
    if (!/^[A-Z]{3}$/.test(orig) || !/^[A-Z]{3}$/.test(dest)) {
      setError('Los códigos de aeropuerto deben tener exactamente 3 letras (ej. MEX, CUN).');
      return;
    }
    if (orig === dest) {
      setError('El origen y destino deben ser diferentes.');
      return;
    }

    onSearch({ origin: orig, destination: dest, date, passengers, cabinClass });
  };

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
    setError('');
  };

  const today = new Date().toISOString().split('T')[0];

  const OriginIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
    </svg>
  );

  const DestIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="glass-card rounded-2xl p-4 sm:p-6 overflow-visible ring-1 ring-white/[0.07] shadow-[0_12px_50px_rgba(0,0,0,0.25)]">
        {/* Ruta */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-3">
          <div className="flex-1 min-w-0 relative z-10 focus-within:z-[60]">
            <AirportInput
              label="Origen"
              value={origin}
              onChange={(val) => { setOrigin(val); setError(''); }}
              placeholder="Código IATA"
              icon={OriginIcon}
            />
          </div>

          <button
            type="button"
            onClick={swapCities}
            className="relative z-[5] self-center sm:self-end sm:mb-1 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan/30 hover:scale-105 transition-all group shrink-0"
            aria-label="Intercambiar ciudades"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-txt-secondary group-hover:text-accent-cyan transition-colors rotate-90 sm:rotate-0">
              <path d="m7 16-4-4 4-4"/><path d="M3 12h18"/><path d="m17 8 4 4-4 4"/>
            </svg>
          </button>

          <div className="flex-1 min-w-0 relative z-10 focus-within:z-[60]">
            <AirportInput
              label="Destino"
              value={destination}
              onChange={(val) => { setDestination(val); setError(''); }}
              placeholder="Código IATA"
              icon={DestIcon}
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-xs text-accent-rose flex items-center gap-1.5 animate-fade-in">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </p>
        )}

        <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/[0.06]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-txt-muted mb-3 sm:hidden">
            Detalles del viaje
          </p>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3 lg:gap-3">
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
                Fecha de salida
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:contents gap-3">
              <div className="w-full lg:w-28 min-w-0">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
                  Pasajeros
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all appearance-none cursor-pointer"
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n} className="bg-bg-secondary">{n} {n === 1 ? 'Adulto' : 'Adultos'}</option>
                  ))}
                </select>
              </div>

              <div className="w-full lg:w-36 min-w-0">
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
                  Clase
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all appearance-none cursor-pointer"
                >
                  <option value="economy" className="bg-bg-secondary">Económica</option>
                  <option value="business" className="bg-bg-secondary">Business</option>
                  <option value="first" className="bg-bg-secondary">Primera clase</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !origin || !destination}
              className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap flex items-center justify-center gap-2 shrink-0 lg:min-w-[10rem]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Buscando…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  Buscar vuelos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
