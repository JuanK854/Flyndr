function hashString(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getSeasonFactor(departureDate) {
  if (!departureDate) return 1;
  const month = Number(String(departureDate).slice(5, 7));
  if ([6, 7, 8, 12].includes(month)) return 1.22;
  if ([3, 4, 10, 11].includes(month)) return 1.08;
  return 0.95;
}

function getCabinMultiplier(cabinClass = 'economy') {
  const cabin = String(cabinClass).toLowerCase();
  if (cabin === 'business') return 2.4;
  if (cabin === 'first') return 3.8;
  return 1;
}

function getTimeFactor(departureTime) {
  if (!departureTime || !/^\d{2}:\d{2}$/.test(departureTime)) return 1;
  const hour = Number(departureTime.slice(0, 2));
  if (hour >= 6 && hour <= 9) return 1.12;
  if (hour >= 18 && hour <= 22) return 1.1;
  if (hour >= 0 && hour <= 5) return 0.92;
  return 1;
}

function estimateSeatsLeft({ flightId = '', departureDate = '', source = '' }) {
  const seed = hashString(`${flightId}-${departureDate}-${source}`);
  const base = 2 + (seed % 8);
  return Math.min(9, Math.max(1, base));
}

export function estimateFlightQuote({
  origin,
  destination,
  departureDate,
  passengers = 1,
  cabinClass = 'economy',
  durationMins = 180,
  departureTime = '',
  airlineCode = '',
  flightId = '',
  source = 'estimated'
}) {
  const durationBase = 65 + Math.round(Math.max(60, durationMins) * 0.82);
  const seasonFactor = getSeasonFactor(departureDate);
  const cabinMultiplier = getCabinMultiplier(cabinClass);
  const timeFactor = getTimeFactor(departureTime);
  const airlineFactor = ['AA', 'DL', 'UA', 'AM'].includes(String(airlineCode).toUpperCase()) ? 1.08 : 1;
  const routeFactor = origin === destination ? 1 : 1.04;
  const pax = Math.max(1, Number(passengers) || 1);

  const estimatedPrice = Math.round(
    durationBase * seasonFactor * cabinMultiplier * timeFactor * airlineFactor * routeFactor * pax
  );

  const seatsLeft = estimateSeatsLeft({ flightId, departureDate, source });

  return {
    estimatedPrice,
    currency: 'USD',
    priceSource: 'estimated',
    seatsLeft,
    seatsSource: 'estimated',
    confidence: 0.78,
    factorsApplied: {
      seasonFactor,
      cabinMultiplier,
      timeFactor,
      airlineFactor,
      routeFactor
    }
  };
}
