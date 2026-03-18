/**
 * Mock Flight Data Service
 * 
 * Generates realistic flight data for demo/development.
 * Used as fallback when Amadeus API credentials are not configured.
 */

const AIRLINES = {
  AM: { name: 'Aeroméxico', code: 'AM', country: 'MX' },
  Y4: { name: 'Volaris', code: 'Y4', country: 'MX' },
  VB: { name: 'VivaAerobus', code: 'VB', country: 'MX' },
  UA: { name: 'United Airlines', code: 'UA', country: 'US' },
  AA: { name: 'American Airlines', code: 'AA', country: 'US' },
  DL: { name: 'Delta Air Lines', code: 'DL', country: 'US' },
  AC: { name: 'Air Canada', code: 'AC', country: 'CA' },
  WS: { name: 'WestJet', code: 'WS', country: 'CA' },
  IB: { name: 'Iberia', code: 'IB', country: 'ES' },
  BA: { name: 'British Airways', code: 'BA', country: 'GB' },
  LH: { name: 'Lufthansa', code: 'LH', country: 'DE' },
  AF: { name: 'Air France', code: 'AF', country: 'FR' },
  NK: { name: 'Spirit Airlines', code: 'NK', country: 'US' },
  B6: { name: 'JetBlue', code: 'B6', country: 'US' },
  WN: { name: 'Southwest', code: 'WN', country: 'US' },
};

const AIRPORTS = {
  MEX: { city: 'Mexico City', country: 'MX', name: 'Benito Juárez Intl' },
  GDL: { city: 'Guadalajara', country: 'MX', name: 'Miguel Hidalgo Intl' },
  CUN: { city: 'Cancún', country: 'MX', name: 'Cancún Intl' },
  MTY: { city: 'Monterrey', country: 'MX', name: 'Mariano Escobedo Intl' },
  ZCL: { city: 'Zacatecas', country: 'MX', name: 'Gral. Leobardo C. Ruiz Intl' },
  TIJ: { city: 'Tijuana', country: 'MX', name: 'Gral. A. L. Rodríguez Intl' },
  LAX: { city: 'Los Angeles', country: 'US', name: 'Los Angeles Intl' },
  JFK: { city: 'New York', country: 'US', name: 'John F. Kennedy Intl' },
  MIA: { city: 'Miami', country: 'US', name: 'Miami Intl' },
  ORD: { city: 'Chicago', country: 'US', name: "O'Hare Intl" },
  DFW: { city: 'Dallas', country: 'US', name: 'Dallas/Fort Worth Intl' },
  SFO: { city: 'San Francisco', country: 'US', name: 'San Francisco Intl' },
  YYZ: { city: 'Toronto', country: 'CA', name: 'Toronto Pearson Intl' },
  YVR: { city: 'Vancouver', country: 'CA', name: 'Vancouver Intl' },
  MAD: { city: 'Madrid', country: 'ES', name: 'Adolfo Suárez Madrid–Barajas' },
  LHR: { city: 'London', country: 'GB', name: 'Heathrow' },
  CDG: { city: 'Paris', country: 'FR', name: 'Charles de Gaulle' },
  FRA: { city: 'Frankfurt', country: 'DE', name: 'Frankfurt am Main' },
};

// Route definitions with base prices and typical airlines
const ROUTES = [
  // Mexico domestic
  { origin: 'MEX', dest: 'CUN', airlines: ['AM', 'Y4', 'VB'], basePrice: 85, minDuration: 140, maxDuration: 170 },
  { origin: 'MEX', dest: 'GDL', airlines: ['AM', 'Y4', 'VB'], basePrice: 55, minDuration: 65, maxDuration: 85 },
  { origin: 'MEX', dest: 'MTY', airlines: ['AM', 'Y4', 'VB'], basePrice: 60, minDuration: 100, maxDuration: 125 },
  { origin: 'ZCL', dest: 'MEX', airlines: ['AM', 'Y4'], basePrice: 65, minDuration: 80, maxDuration: 110 },
  { origin: 'ZCL', dest: 'GDL', airlines: ['Y4', 'VB'], basePrice: 55, minDuration: 70, maxDuration: 95 },
  { origin: 'ZCL', dest: 'TIJ', airlines: ['Y4', 'VB'], basePrice: 70, minDuration: 160, maxDuration: 210 },
  // Mexico to US
  { origin: 'MEX', dest: 'LAX', airlines: ['AM', 'UA', 'DL', 'Y4'], basePrice: 180, minDuration: 190, maxDuration: 240 },
  { origin: 'MEX', dest: 'JFK', airlines: ['AM', 'AA', 'DL', 'B6'], basePrice: 250, minDuration: 280, maxDuration: 340 },
  { origin: 'MEX', dest: 'MIA', airlines: ['AM', 'AA', 'DL'], basePrice: 200, minDuration: 200, maxDuration: 260 },
  { origin: 'MEX', dest: 'ORD', airlines: ['AM', 'UA', 'AA'], basePrice: 220, minDuration: 240, maxDuration: 300 },
  { origin: 'MEX', dest: 'DFW', airlines: ['AM', 'AA'], basePrice: 170, minDuration: 160, maxDuration: 210 },
  { origin: 'MEX', dest: 'SFO', airlines: ['AM', 'UA', 'DL'], basePrice: 210, minDuration: 250, maxDuration: 310 },
  { origin: 'GDL', dest: 'LAX', airlines: ['AM', 'Y4', 'AA'], basePrice: 190, minDuration: 200, maxDuration: 270 },
  { origin: 'CUN', dest: 'MIA', airlines: ['AM', 'AA', 'NK'], basePrice: 150, minDuration: 140, maxDuration: 180 },
  { origin: 'CUN', dest: 'JFK', airlines: ['AM', 'DL', 'B6'], basePrice: 220, minDuration: 240, maxDuration: 310 },
  // Mexico to Canada
  { origin: 'MEX', dest: 'YYZ', airlines: ['AM', 'AC', 'WS'], basePrice: 320, minDuration: 290, maxDuration: 380 },
  { origin: 'MEX', dest: 'YVR', airlines: ['AM', 'AC'], basePrice: 350, minDuration: 330, maxDuration: 420 },
  { origin: 'ZCL', dest: 'YYZ', airlines: ['AM', 'AC'], basePrice: 380, minDuration: 360, maxDuration: 480 },
  // Mexico to Europe
  { origin: 'MEX', dest: 'MAD', airlines: ['AM', 'IB'], basePrice: 550, minDuration: 600, maxDuration: 680 },
  { origin: 'MEX', dest: 'LHR', airlines: ['AM', 'BA'], basePrice: 620, minDuration: 640, maxDuration: 720 },
  { origin: 'MEX', dest: 'CDG', airlines: ['AM', 'AF'], basePrice: 580, minDuration: 650, maxDuration: 740 },
  { origin: 'MEX', dest: 'FRA', airlines: ['AM', 'LH'], basePrice: 600, minDuration: 660, maxDuration: 750 },
  // US domestic
  { origin: 'LAX', dest: 'JFK', airlines: ['AA', 'DL', 'UA', 'B6', 'NK'], basePrice: 150, minDuration: 290, maxDuration: 340 },
  { origin: 'LAX', dest: 'MIA', airlines: ['AA', 'DL', 'NK'], basePrice: 130, minDuration: 280, maxDuration: 330 },
  { origin: 'JFK', dest: 'MIA', airlines: ['AA', 'DL', 'B6', 'NK'], basePrice: 100, minDuration: 180, maxDuration: 210 },
  { origin: 'ORD', dest: 'LAX', airlines: ['UA', 'AA', 'WN'], basePrice: 120, minDuration: 240, maxDuration: 280 },
  { origin: 'DFW', dest: 'JFK', airlines: ['AA', 'DL'], basePrice: 140, minDuration: 200, maxDuration: 240 },
];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function formatMinutes(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

function generateDepartureTime(seed) {
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const h = hours[Math.floor(seededRandom(seed) * hours.length)];
  const m = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(seededRandom(seed + 1) * 12)];
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function addMinutes(time, mins) {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const newH = Math.floor(total / 60) % 24;
  const newM = total % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

/**
 * Search mock flights
 */
export function searchMockFlights({ origin, destination, departureDate, passengers = 1, cabinClass = 'economy' }) {
  const orig = origin.toUpperCase();
  const dest = destination.toUpperCase();

  // Find matching routes (both directions)
  const matchingRoutes = ROUTES.filter(r =>
    (r.origin === orig && r.dest === dest) ||
    (r.origin === dest && r.dest === orig)
  );

  if (matchingRoutes.length === 0) {
    // Generate generic flights if no predefined route
    return generateGenericFlights(orig, dest, departureDate, passengers, cabinClass);
  }

  const flights = [];
  const dateSeed = departureDate ? parseInt(departureDate.replace(/-/g, ''), 10) : 20260401;

  matchingRoutes.forEach((route, ri) => {
    const isReversed = route.origin !== orig;
    const routeOrig = isReversed ? route.dest : route.origin;
    const routeDest = isReversed ? route.origin : route.dest;

    route.airlines.forEach((airlineCode, ai) => {
      const airline = AIRLINES[airlineCode];
      const seed = dateSeed + ri * 100 + ai * 17;

      // Generate 1-2 flights per airline on this route
      const numFlights = seededRandom(seed + 3) > 0.5 ? 2 : 1;

      for (let fi = 0; fi < numFlights; fi++) {
        const flightSeed = seed + fi * 37;
        const depTime = generateDepartureTime(flightSeed);
        const duration = Math.round(route.minDuration + seededRandom(flightSeed + 5) * (route.maxDuration - route.minDuration));
        const arrTime = addMinutes(depTime, duration);

        // Price variance
        const classMultiplier = cabinClass === 'business' ? 3.2 : cabinClass === 'first' ? 5.5 : 1;
        const variance = 0.7 + seededRandom(flightSeed + 7) * 0.6;
        const price = Math.round(route.basePrice * variance * classMultiplier * passengers);

        // Stops
        const directThreshold = duration < 200 ? 0.7 : 0.4;
        const stops = seededRandom(flightSeed + 9) < directThreshold ? 0 : 1;
        const finalDuration = stops > 0 ? duration + Math.round(40 + seededRandom(flightSeed + 11) * 60) : duration;

        const flightNum = `${airlineCode}${100 + Math.floor(seededRandom(flightSeed + 13) * 899)}`;
        const seatsLeft = Math.floor(1 + seededRandom(flightSeed + 15) * 8);

        flights.push({
          flightId: `mock-${flightNum}-${departureDate || 'nodate'}-${fi}`,
          airline: airline.name,
          airlineCode: airline.code,
          flightNumber: flightNum,
          origin: routeOrig,
          originCity: AIRPORTS[routeOrig]?.city || routeOrig,
          originAirport: AIRPORTS[routeOrig]?.name || '',
          destination: routeDest,
          destinationCity: AIRPORTS[routeDest]?.city || routeDest,
          destinationAirport: AIRPORTS[routeDest]?.name || '',
          departureTime: depTime,
          arrivalTime: addMinutes(depTime, finalDuration),
          duration: formatMinutes(finalDuration),
          stops,
          price,
          currency: 'USD',
          cabinClass: cabinClass || 'economy',
          seatsLeft,
          source: 'mock'
        });
      }
    });
  });

  // Sort by price
  flights.sort((a, b) => a.price - b.price);
  return flights;
}

function generateGenericFlights(origin, dest, date, passengers, cabinClass) {
  const genericAirlines = ['AM', 'UA', 'AA', 'DL'];
  const dateSeed = date ? parseInt(date.replace(/-/g, ''), 10) : 20260401;
  const flights = [];

  genericAirlines.forEach((code, i) => {
    const airline = AIRLINES[code];
    const seed = dateSeed + i * 53;
    const depTime = generateDepartureTime(seed);
    const duration = Math.round(120 + seededRandom(seed + 2) * 480);
    const stops = duration > 300 ? (seededRandom(seed + 4) > 0.3 ? 1 : 0) : 0;
    const finalDuration = stops > 0 ? duration + 60 : duration;
    const basePrice = Math.round(100 + seededRandom(seed + 6) * 500);
    const classMultiplier = cabinClass === 'business' ? 3.2 : cabinClass === 'first' ? 5.5 : 1;

    flights.push({
      flightId: `mock-gen-${code}${Math.floor(seededRandom(seed) * 900 + 100)}-${date || 'nd'}`,
      airline: airline.name,
      airlineCode: code,
      flightNumber: `${code}${Math.floor(seededRandom(seed) * 900 + 100)}`,
      origin,
      originCity: AIRPORTS[origin]?.city || origin,
      originAirport: AIRPORTS[origin]?.name || '',
      destination: dest,
      destinationCity: AIRPORTS[dest]?.city || dest,
      destinationAirport: AIRPORTS[dest]?.name || '',
      departureTime: depTime,
      arrivalTime: addMinutes(depTime, finalDuration),
      duration: formatMinutes(finalDuration),
      stops,
      price: Math.round(basePrice * classMultiplier * passengers),
      currency: 'USD',
      cabinClass: cabinClass || 'economy',
      seatsLeft: Math.floor(1 + seededRandom(seed + 8) * 8),
      source: 'mock'
    });
  });

  flights.sort((a, b) => a.price - b.price);
  return flights;
}

/**
 * Get popular routes for the homepage
 */
export function getPopularRoutes() {
  return [
    { origin: 'MEX', destination: 'CUN', originCity: 'CDMX', destCity: 'Cancún', avgPrice: 89, emoji: '🏖️' },
    { origin: 'MEX', destination: 'LAX', originCity: 'CDMX', destCity: 'Los Angeles', avgPrice: 195, emoji: '🌴' },
    { origin: 'ZCL', destination: 'YYZ', originCity: 'Zacatecas', destCity: 'Toronto', avgPrice: 385, emoji: '🍁' },
    { origin: 'MEX', destination: 'JFK', originCity: 'CDMX', destCity: 'New York', avgPrice: 265, emoji: '🗽' },
    { origin: 'MEX', destination: 'MAD', originCity: 'CDMX', destCity: 'Madrid', avgPrice: 560, emoji: '🇪🇸' },
    { origin: 'CUN', destination: 'MIA', originCity: 'Cancún', destCity: 'Miami', avgPrice: 155, emoji: '🌊' },
  ];
}

export { AIRPORTS, AIRLINES };
