'use client';

import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [origin, setOrigin] = useState('MEX');
  const [destination, setDestination] = useState('LAX');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card w-full max-w-3xl mx-auto px-4 py-5 sm:px-6 sm:py-6 rounded-2xl flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5"
    >
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1">
          Origin
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="e.g. MEX"
          className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-gray-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1">
          Destination
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. LAX"
          className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-gray-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1">
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background transition-colors whitespace-nowrap"
      >
        Search flights
      </button>
    </form>
  );
}

