export default function FlightCard({ flight, index }) {
  return (
    <article
      className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col gap-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Airline
          </p>
          <h3 className="text-base sm:text-lg font-semibold">
            {flight.airline}
          </h3>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-accent">
          ${flight.priceUsd}
          <span className="ml-1 text-xs font-medium text-gray-400">USD</span>
        </p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-left">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              From
            </p>
            <p className="text-sm sm:text-base font-semibold">
              {flight.origin}
            </p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-accent/20 via-accent/70 to-accent/20" />
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              To
            </p>
            <p className="text-sm sm:text-base font-semibold">
              {flight.destination}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {flight.departureTime}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1">
            <span className="h-0.5 w-5 rounded-full bg-accent" />
            {flight.duration}
          </span>
          <span className="inline-flex rounded-full bg-slate-800/70 px-3 py-1">
            {flight.stops}
          </span>
        </div>
      </div>
    </article>
  );
}

