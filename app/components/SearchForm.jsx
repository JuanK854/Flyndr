'use client';

import { useState } from 'react';

export default function SearchForm({ onSearch, loading }) {
  const [origin, setOrigin] = useState('ZCL');
  const [destination, setDestination] = useState('YYZ');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    onSearch({ origin: origin.trim().toUpperCase(), destination: destination.trim().toUpperCase(), date, passengers, cabinClass });
  };

  const swapCities = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Row 1: Origin / Destination */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 mb-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          {/* Origin */}
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
              Origin
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
                </svg>
              </span>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                placeholder="IATA code"
                maxLength={3}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] pl-10 pr-3 py-3 text-sm font-semibold font-display tracking-wider focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 placeholder:text-txt-muted placeholder:font-normal placeholder:tracking-normal transition-all"
              />
            </div>
          </div>

          {/* Swap button */}
          <button
            type="button"
            onClick={swapCities}
            className="self-center sm:self-end sm:mb-1 w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-accent-cyan/10 hover:border-accent-cyan/30 transition-all group shrink-0"
            aria-label="Swap cities"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-txt-secondary group-hover:text-accent-cyan transition-colors rotate-90 sm:rotate-0">
              <path d="m7 16-4-4 4-4"/><path d="M3 12h18"/><path d="m17 8 4 4-4 4"/>
            </svg>
          </button>

          {/* Destination */}
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
              Destination
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value.toUpperCase())}
                placeholder="IATA code"
                maxLength={3}
                className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] pl-10 pr-3 py-3 text-sm font-semibold font-display tracking-wider focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 placeholder:text-txt-muted placeholder:font-normal placeholder:tracking-normal transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Date / Passengers / Class / Button */}
      <div className="glass-card rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          {/* Date */}
          <div className="flex-1 min-w-0">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
              Departure Date
            </label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all"
            />
          </div>

          {/* Passengers */}
          <div className="w-full sm:w-28">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
              Travelers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all appearance-none cursor-pointer"
            >
              {[1,2,3,4,5,6].map(n => (
                <option key={n} value={n} className="bg-bg-secondary">{n} {n === 1 ? 'Adult' : 'Adults'}</option>
              ))}
            </select>
          </div>

          {/* Cabin Class */}
          <div className="w-full sm:w-36">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
              Class
            </label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 transition-all appearance-none cursor-pointer"
            >
              <option value="economy" className="bg-bg-secondary">Economy</option>
              <option value="business" className="bg-bg-secondary">Business</option>
              <option value="first" className="bg-bg-secondary">First Class</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading || !origin || !destination}
            className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Searching…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                Search Flights
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
