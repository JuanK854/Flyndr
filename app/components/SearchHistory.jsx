'use client';

import { useEffect, useState } from 'react';

export default function SearchHistory({ onQuickSearch, refreshKey }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then(r => r.json())
      .then(data => { if (data.success) setHistory(data.history); })
      .catch(() => {});
  }, [refreshKey]);

  const clearHistory = async () => {
    await fetch('/api/history', { method: 'DELETE' });
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <section className="mt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-txt-secondary uppercase tracking-[0.15em] flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-txt-muted">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          Recent Searches
        </h2>
        <button
          onClick={clearHistory}
          className="text-[11px] text-txt-muted hover:text-accent-rose transition-colors font-medium"
        >
          Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.slice(0, 8).map((item, i) => (
          <button
            key={item.id || i}
            onClick={() => onQuickSearch({
              origin: item.origin,
              destination: item.destination,
              date: item.departure_date || ''
            })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-txt-secondary hover:text-txt-primary hover:border-accent-cyan/20 hover:bg-accent-cyan/5 transition-all"
          >
            <span className="font-display font-semibold tracking-wide">{item.origin}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
            <span className="font-display font-semibold tracking-wide">{item.destination}</span>
            {item.departure_date && (
              <span className="text-txt-muted ml-0.5">{formatDate(item.departure_date)}</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}
