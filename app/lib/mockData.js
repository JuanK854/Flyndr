/**
 * Mock Flight Data Service
 * Used as fallback when Aviation Stack API is unavailable or not configured.
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
  // México
  MEX: { city: 'Ciudad de México', country: 'México', name: 'Benito Juárez Intl', flag: '🇲🇽' },
  GDL: { city: 'Guadalajara', country: 'México', name: 'Miguel Hidalgo Intl', flag: '🇲🇽' },
  CUN: { city: 'Cancún', country: 'México', name: 'Cancún Intl', flag: '🇲🇽' },
  MTY: { city: 'Monterrey', country: 'México', name: 'Mariano Escobedo Intl', flag: '🇲🇽' },
  ZCL: { city: 'Zacatecas', country: 'México', name: 'Gral. Leobardo C. Ruiz Intl', flag: '🇲🇽' },
  TIJ: { city: 'Tijuana', country: 'México', name: 'Gral. A. L. Rodríguez Intl', flag: '🇲🇽' },
  CJS: { city: 'Ciudad Juárez', country: 'México', name: 'Abraham González Intl', flag: '🇲🇽' },
  MZT: { city: 'Mazatlán', country: 'México', name: 'Rafael Buelna Intl', flag: '🇲🇽' },
  PVR: { city: 'Puerto Vallarta', country: 'México', name: 'Licenciado Gustavo Díaz Ordaz Intl', flag: '🇲🇽' },
  SLP: { city: 'San Luis Potosí', country: 'México', name: 'Ponciano Arriaga Intl', flag: '🇲🇽' },
  AGU: { city: 'Aguascalientes', country: 'México', name: 'Jesús Terán Peredo Intl', flag: '🇲🇽' },
  BJX: { city: 'León/Guanajuato', country: 'México', name: 'Del Bajío Intl', flag: '🇲🇽' },
  HMO: { city: 'Hermosillo', country: 'México', name: 'Gral. Ignacio Pesqueira García Intl', flag: '🇲🇽' },
  CLQ: { city: 'Colima', country: 'México', name: 'Licenciado Miguel de la Madrid Hurtado', flag: '🇲🇽' },
  OAX: { city: 'Oaxaca', country: 'México', name: 'Xoxocotlán Intl', flag: '🇲🇽' },
  TAM: { city: 'Tampico', country: 'México', name: 'Gral. Francisco J. Mina Intl', flag: '🇲🇽' },
  VSA: { city: 'Villahermosa', country: 'México', name: 'Carlos Rovirosa Pérez Intl', flag: '🇲🇽' },
  MID: { city: 'Mérida', country: 'México', name: 'Manuel Crescencio Rejón Intl', flag: '🇲🇽' },
  // USA
  LAX: { city: 'Los Ángeles', country: 'Estados Unidos', name: 'Los Angeles Intl', flag: '🇺🇸' },
  JFK: { city: 'Nueva York', country: 'Estados Unidos', name: 'John F. Kennedy Intl', flag: '🇺🇸' },
  MIA: { city: 'Miami', country: 'Estados Unidos', name: 'Miami Intl', flag: '🇺🇸' },
  ORD: { city: 'Chicago', country: 'Estados Unidos', name: "O'Hare Intl", flag: '🇺🇸' },
  DFW: { city: 'Dallas', country: 'Estados Unidos', name: 'Dallas/Fort Worth Intl', flag: '🇺🇸' },
  SFO: { city: 'San Francisco', country: 'Estados Unidos', name: 'San Francisco Intl', flag: '🇺🇸' },
  LAS: { city: 'Las Vegas', country: 'Estados Unidos', name: 'Harry Reid Intl', flag: '🇺🇸' },
  SEA: { city: 'Seattle', country: 'Estados Unidos', name: 'Seattle-Tacoma Intl', flag: '🇺🇸' },
  ATL: { city: 'Atlanta', country: 'Estados Unidos', name: 'Hartsfield-Jackson Atlanta Intl', flag: '🇺🇸' },
  BOS: { city: 'Boston', country: 'Estados Unidos', name: 'Logan Intl', flag: '🇺🇸' },
  DEN: { city: 'Denver', country: 'Estados Unidos', name: 'Denver Intl', flag: '🇺🇸' },
  PHX: { city: 'Phoenix', country: 'Estados Unidos', name: 'Phoenix Sky Harbor Intl', flag: '🇺🇸' },
  IAH: { city: 'Houston', country: 'Estados Unidos', name: 'George Bush Intercontinental', flag: '🇺🇸' },
  MSY: { city: 'Nueva Orleans', country: 'Estados Unidos', name: 'Louis Armstrong Intl', flag: '🇺🇸' },
  SAN: { city: 'San Diego', country: 'Estados Unidos', name: 'San Diego Intl', flag: '🇺🇸' },
  // Canadá
  YYZ: { city: 'Toronto', country: 'Canadá', name: 'Toronto Pearson Intl', flag: '🇨🇦' },
  YVR: { city: 'Vancouver', country: 'Canadá', name: 'Vancouver Intl', flag: '🇨🇦' },
  YUL: { city: 'Montreal', country: 'Canadá', name: 'Pierre Elliott Trudeau Intl', flag: '🇨🇦' },
  YYC: { city: 'Calgary', country: 'Canadá', name: 'Calgary Intl', flag: '🇨🇦' },
  // Europa
  MAD: { city: 'Madrid', country: 'España', name: 'Adolfo Suárez Madrid–Barajas', flag: '🇪🇸' },
  BCN: { city: 'Barcelona', country: 'España', name: 'Josep Tarradellas Barcelona–El Prat', flag: '🇪🇸' },
  LHR: { city: 'Londres', country: 'Reino Unido', name: 'Heathrow', flag: '🇬🇧' },
  CDG: { city: 'París', country: 'Francia', name: 'Charles de Gaulle', flag: '🇫🇷' },
  FRA: { city: 'Frankfurt', country: 'Alemania', name: 'Frankfurt am Main', flag: '🇩🇪' },
  AMS: { city: 'Ámsterdam', country: 'Países Bajos', name: 'Amsterdam Airport Schiphol', flag: '🇳🇱' },
  FCO: { city: 'Roma', country: 'Italia', name: 'Leonardo da Vinci Intl', flag: '🇮🇹' },
  MXP: { city: 'Milán', country: 'Italia', name: 'Malpensa Intl', flag: '🇮🇹' },
  ZRH: { city: 'Zúrich', country: 'Suiza', name: 'Zurich Airport', flag: '🇨🇭' },
  // Latinoamérica
  BOG: { city: 'Bogotá', country: 'Colombia', name: 'El Dorado Intl', flag: '🇨🇴' },
  GRU: { city: 'São Paulo', country: 'Brasil', name: 'Guarulhos Intl', flag: '🇧🇷' },
  EZE: { city: 'Buenos Aires', country: 'Argentina', name: 'Ministro Pistarini Intl', flag: '🇦🇷' },
  LIM: { city: 'Lima', country: 'Perú', name: 'Jorge Chávez Intl', flag: '🇵🇪' },
  SCL: { city: 'Santiago', country: 'Chile', name: 'Arturo Merino Benítez Intl', flag: '🇨🇱' },
  GYE: { city: 'Guayaquil', country: 'Ecuador', name: 'José Joaquín de Olmedo Intl', flag: '🇪🇨' },
  HAV: { city: 'La Habana', country: 'Cuba', name: 'José Martí Intl', flag: '🇨🇺' },
  PTY: { city: 'Ciudad de Panamá', country: 'Panamá', name: 'Tocumen Intl', flag: '🇵🇦' },
};

const ROUTES = [
  { origin: 'MEX', dest: 'CUN', airlines: ['AM', 'Y4', 'VB'], basePrice: 85, minDuration: 140, maxDuration: 170 },
  { origin: 'MEX', dest: 'GDL', airlines: ['AM', 'Y4', 'VB'], basePrice: 55, minDuration: 65, maxDuration: 85 },
  { origin: 'MEX', dest: 'MTY', airlines: ['AM', 'Y4', 'VB'], basePrice: 60, minDuration: 100, maxDuration: 125 },
  { origin: 'ZCL', dest: 'MEX', airlines: ['AM', 'Y4'], basePrice: 65, minDuration: 80, maxDuration: 110 },
  { origin: 'ZCL', dest: 'GDL', airlines: ['Y4', 'VB'], basePrice: 55, minDuration: 70, maxDuration: 95 },
  { origin: 'ZCL', dest: 'TIJ', airlines: ['Y4', 'VB'], basePrice: 70, minDuration: 160, maxDuration: 210 },
  { origin: 'MEX', dest: 'LAX', airlines: ['AM', 'UA', 'DL', 'Y4'], basePrice: 180, minDuration: 190, maxDuration: 240 },
  { origin: 'MEX', dest: 'JFK', airlines: ['AM', 'AA', 'DL', 'B6'], basePrice: 250, minDuration: 280, maxDuration: 340 },
  { origin: 'MEX', dest: 'MIA', airlines: ['AM', 'AA', 'DL'], basePrice: 200, minDuration: 200, maxDuration: 260 },
  { origin: 'MEX', dest: 'ORD', airlines: ['AM', 'UA', 'AA'], basePrice: 220, minDuration: 240, maxDuration: 300 },
  { origin: 'MEX', dest: 'DFW', airlines: ['AM', 'AA'], basePrice: 170, minDuration: 160, maxDuration: 210 },
  { origin: 'MEX', dest: 'SFO', airlines: ['AM', 'UA', 'DL'], basePrice: 210, minDuration: 250, maxDuration: 310 },
  { origin: 'GDL', dest: 'LAX', airlines: ['AM', 'Y4', 'AA'], basePrice: 190, minDuration: 200, maxDuration: 270 },
  { origin: 'CUN', dest: 'MIA', airlines: ['AM', 'AA', 'NK'], basePrice: 150, minDuration: 140, maxDuration: 180 },
  { origin: 'CUN', dest: 'JFK', airlines: ['AM', 'DL', 'B6'], basePrice: 220, minDuration: 240, maxDuration: 310 },
  { origin: 'MEX', dest: 'YYZ', airlines: ['AM', 'AC', 'WS'], basePrice: 320, minDuration: 290, maxDuration: 380 },
  { origin: 'MEX', dest: 'YVR', airlines: ['AM', 'AC'], basePrice: 350, minDuration: 330, maxDuration: 420 },
  { origin: 'ZCL', dest: 'YYZ', airlines: ['AM', 'AC'], basePrice: 380, minDuration: 360, maxDuration: 480 },
  { origin: 'MEX', dest: 'MAD', airlines: ['AM', 'IB'], basePrice: 550, minDuration: 600, maxDuration: 680 },
  { origin: 'MEX', dest: 'LHR', airlines: ['AM', 'BA'], basePrice: 620, minDuration: 640, maxDuration: 720 },
  { origin: 'MEX', dest: 'CDG', airlines: ['AM', 'AF'], basePrice: 580, minDuration: 650, maxDuration: 740 },
  { origin: 'MEX', dest: 'FRA', airlines: ['AM', 'LH'], basePrice: 600, minDuration: 660, maxDuration: 750 },
  { origin: 'LAX', dest: 'JFK', airlines: ['AA', 'DL', 'UA', 'B6', 'NK'], basePrice: 150, minDuration: 290, maxDuration: 340 },
  { origin: 'LAX', dest: 'MIA', airlines: ['AA', 'DL', 'NK'], basePrice: 130, minDuration: 280, maxDuration: 330 },
  { origin: 'JFK', dest: 'MIA', airlines: ['AA', 'DL', 'B6', 'NK'], basePrice: 100, minDuration: 180, maxDuration: 210 },
  { origin: 'ORD', dest: 'LAX', airlines: ['UA', 'AA', 'WN'], basePrice: 120, minDuration: 240, maxDuration: 280 },
  { origin: 'DFW', dest: 'JFK', airlines: ['AA', 'DL'], basePrice: 140, minDuration: 200, maxDuration: 240 },
  { origin: 'MEX', dest: 'BOG', airlines: ['AM', 'B6'], basePrice: 280, minDuration: 260, maxDuration: 320 },
  { origin: 'MEX', dest: 'GRU', airlines: ['AM'], basePrice: 450, minDuration: 500, maxDuration: 580 },
  { origin: 'MEX', dest: 'LIM', airlines: ['AM', 'DL'], basePrice: 380, minDuration: 400, maxDuration: 480 },
  { origin: 'MEX', dest: 'SCL', airlines: ['AM'], basePrice: 430, minDuration: 480, maxDuration: 560 },
  { origin: 'MEX', dest: 'PTY', airlines: ['AM', 'DL'], basePrice: 250, minDuration: 220, maxDuration: 280 },
  { origin: 'MTY', dest: 'JFK', airlines: ['AM', 'AA'], basePrice: 280, minDuration: 300, maxDuration: 380 },
  { origin: 'MTY', dest: 'LAX', airlines: ['AM', 'AA', 'Y4'], basePrice: 200, minDuration: 220, maxDuration: 280 },
];

/**
 * Search airports by keyword (IATA code or city name)
 * Used for the autocomplete feature
 */
export function searchAirports(keyword) {
  if (!keyword || keyword.length < 1) return [];
  const q = keyword.toUpperCase().trim();

  const results = Object.entries(AIRPORTS)
    .filter(([iata, info]) =>
      iata.startsWith(q) ||
      info.city.toUpperCase().includes(q) ||
      info.name.toUpperCase().includes(q) ||
      info.country.toUpperCase().includes(q)
    )
    .map(([iata, info]) => ({ iata, ...info }))
    .slice(0, 8);

  // Prioritize exact IATA match
  results.sort((a, b) => {
    if (a.iata === q) return -1;
    if (b.iata === q) return 1;
    if (a.iata.startsWith(q)) return -1;
    if (b.iata.startsWith(q)) return 1;
    return 0;
  });

  return results;
}

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

export function searchMockFlights({ origin, destination, departureDate, passengers = 1, cabinClass = 'economy' }) {
  const orig = origin.toUpperCase();
  const dest = destination.toUpperCase();

  const matchingRoutes = ROUTES.filter(r =>
    (r.origin === orig && r.dest === dest) ||
    (r.origin === dest && r.dest === orig)
  );

  if (matchingRoutes.length === 0) {
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
      const numFlights = seededRandom(seed + 3) > 0.5 ? 2 : 1;

      for (let fi = 0; fi < numFlights; fi++) {
        const flightSeed = seed + fi * 37;
        const depTime = generateDepartureTime(flightSeed);
        const duration = Math.round(route.minDuration + seededRandom(flightSeed + 5) * (route.maxDuration - route.minDuration));

        const classMultiplier = cabinClass === 'business' ? 3.2 : cabinClass === 'first' ? 5.5 : 1;
        const variance = 0.7 + seededRandom(flightSeed + 7) * 0.6;
        const price = Math.round(route.basePrice * variance * classMultiplier * passengers);

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
          destination: routeDest,
          destinationCity: AIRPORTS[routeDest]?.city || routeDest,
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
      destination: dest,
      destinationCity: AIRPORTS[dest]?.city || dest,
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

export function getPopularRoutes() {
  return [
    { origin: 'MEX', destination: 'CUN', originCity: 'CDMX', destCity: 'Cancún', avgPrice: 89, emoji: '🏖️' },
    { origin: 'MEX', destination: 'LAX', originCity: 'CDMX', destCity: 'Los Ángeles', avgPrice: 195, emoji: '🌴' },
    { origin: 'ZCL', destination: 'YYZ', originCity: 'Zacatecas', destCity: 'Toronto', avgPrice: 385, emoji: '🍁' },
    { origin: 'MEX', destination: 'JFK', originCity: 'CDMX', destCity: 'Nueva York', avgPrice: 265, emoji: '🗽' },
    { origin: 'MEX', destination: 'MAD', originCity: 'CDMX', destCity: 'Madrid', avgPrice: 560, emoji: '🇪🇸' },
    { origin: 'CUN', destination: 'MIA', originCity: 'Cancún', destCity: 'Miami', avgPrice: 155, emoji: '🌊' },
  ];
}

export { AIRPORTS, AIRLINES };
