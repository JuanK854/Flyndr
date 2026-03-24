'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function AirportInput({ value, onChange, placeholder, icon, label }) {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Sync external value changes
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const fetchSuggestions = useCallback(async (q) => {
    if (!q || q.length < 1) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/airports/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.success && data.airports.length > 0) {
        setSuggestions(data.airports);
        setOpen(true);
        setActiveIdx(-1);
      } else {
        setSuggestions([]);
        setOpen(false);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setQuery(val);
    onChange(val);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 200);
  };

  const handleSelect = (airport) => {
    setQuery(airport.iata);
    onChange(airport.iata);
    setSuggestions([]);
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleKeyDown = (e) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative isolate">
      <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-txt-muted mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none">
          {icon}
        </span>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 1 && suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          maxLength={3}
          autoComplete="off"
          className="w-full rounded-xl bg-white/[0.03] border border-white/[0.06] pl-10 pr-8 py-3 text-sm font-semibold font-display tracking-wider focus:outline-none focus:ring-2 focus:ring-accent-cyan/40 focus:border-accent-cyan/30 placeholder:text-txt-muted placeholder:font-normal placeholder:tracking-normal transition-all"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="animate-spin h-3.5 w-3.5 text-accent-cyan/50" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </span>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="autocomplete-dropdown animate-fade-in">
          {suggestions.map((airport, i) => (
            <div
              key={airport.iata}
              className={`autocomplete-item ${i === activeIdx ? 'active' : ''}`}
              onMouseDown={() => handleSelect(airport)}
            >
              <span className="text-base w-6 shrink-0">{airport.flag || '✈️'}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-display text-accent-cyan tracking-wider">
                    {airport.iata}
                  </span>
                  <span className="text-xs font-semibold text-txt-primary truncate">
                    {airport.city}
                  </span>
                </div>
                <p className="text-[10px] text-txt-muted truncate">{airport.name} · {airport.country}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
