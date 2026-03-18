import FlightCard from './FlightCard';

export default function FlightList({ flights, hasSearched }) {
  if (!hasSearched) {
    return (
      <div className="text-center text-sm text-gray-400 mt-8">
        Start by searching for flights from MEX to LAX.
      </div>
    );
  }

  if (!flights.length) {
    return (
      <div className="glass-card mt-8 rounded-2xl px-5 py-6 text-center text-sm text-gray-300">
        No flights found for your search. Try adjusting your criteria.
      </div>
    );
  }

  return (
    <section
      aria-label="Available flights"
      className="mt-8 grid gap-5 sm:gap-6 grid-cols-1 lg:grid-cols-2"
    >
      {flights.map((flight, index) => (
        <FlightCard key={`${flight.airline}-${flight.departureTime}`} flight={flight} index={index} />
      ))}
    </section>
  );
}

