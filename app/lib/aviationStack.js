const BASE_URL = 'http://api.aviationstack.com/v1';

function getApiKey() {
  const key = process.env.AVIATIONSTACK_API_KEY;
  if (!key) throw new Error('AVIATIONSTACK_API_KEY_MISSING');
  return key;
}

async function aviationGet(path, params) {
  const query = new URLSearchParams({
    access_key: getApiKey(),
    ...params
  });

  const res = await fetch(`${BASE_URL}${path}?${query}`, { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));

  if (!res.ok || data?.error) {
    const msg = data?.error?.message || `AVIATIONSTACK_REQUEST_FAILED_${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export async function searchFlightsAviationStack({
  origin,
  destination,
  departureDate,
  passengers = 1,
  cabinClass = 'economy'
}) {
  const data = await aviationGet('/flights', {
    dep_iata: origin.toUpperCase(),
    arr_iata: destination.toUpperCase(),
    ...(departureDate ? { flight_date: departureDate } : {})
  });

  return normalizeAviationFlights(data, { passengers, cabinClass });
}

export async function searchAirportsAviationStack(keyword) {
  const data = await aviationGet('/airports', { search: keyword.toUpperCase() });

  return (data.data || [])
    .filter((a) => a?.iata_code)
    .slice(0, 8)
    .map((a) => ({
      iata: a.iata_code || '',
      name: a.airport_name || a.airport || a.iata_code || '',
      city: a.city_iata_code || a.city_name || a.city || a.iata_code || '',
      country: a.country_name || a.country_iso2 || ''
    }));
}

function normalizeAviationFlights(data, { passengers, cabinClass }) {
  return (data.data || []).map((item, i) => {
    const depScheduled = item?.departure?.scheduled || '';
    const arrScheduled = item?.arrival?.scheduled || '';

    const depTime = extractTime(depScheduled);
    const arrTime = extractTime(arrScheduled);
    const minutes = computeDurationMinutes(depScheduled, arrScheduled);

    return {
      flightId: item?.flight_date
        ? `avs-${item.flight_date}-${item?.flight?.iata || item?.flight?.number || i}`
        : `avs-${item?.flight?.iata || item?.flight?.number || i}`,
      airline: item?.airline?.name || item?.airline?.iata || 'Unknown',
      airlineCode: item?.airline?.iata || item?.flight?.iata?.slice(0, 2) || '',
      flightNumber: item?.flight?.iata || item?.flight?.number || '',
      origin: item?.departure?.iata || '',
      destination: item?.arrival?.iata || '',
      departureTime: depTime,
      arrivalTime: arrTime,
      duration: formatMinutes(minutes),
      stops: 0,
      price: estimatePriceUSD({
        durationMins: minutes,
        passengers,
        cabinClass,
        airlineCode: item?.airline?.iata || ''
      }),
      currency: 'USD',
      cabinClass: String(cabinClass || 'economy').toUpperCase(),
      seatsLeft: null,
      source: 'aviationstack'
    };
  });
}

function extractTime(isoString) {
  if (!isoString || typeof isoString !== 'string') return '';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(11, 16);
}

function computeDurationMinutes(depIso, arrIso) {
  const dep = new Date(depIso);
  const arr = new Date(arrIso);
  if (Number.isNaN(dep.getTime()) || Number.isNaN(arr.getTime())) return 180;
  const diff = Math.round((arr.getTime() - dep.getTime()) / 60000);
  return diff > 0 ? diff : 180;
}

function formatMinutes(mins) {
  const safe = Number.isFinite(mins) ? Math.max(30, mins) : 180;
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${h}h ${m}m`;
}

function estimatePriceUSD({ durationMins, passengers = 1, cabinClass = 'economy', airlineCode = '' }) {
  const baseByDuration = 70 + Math.round(Math.max(60, durationMins) * 0.85);
  const classMultiplier = cabinClass === 'business' ? 2.6 : cabinClass === 'first' ? 4.2 : 1;
  const airlineBump =
    airlineCode === 'UA' || airlineCode === 'DL' || airlineCode === 'AA' ? 1.12 : 1;
  const pax = Math.max(1, passengers);
  return Math.round(baseByDuration * classMultiplier * airlineBump * pax);
}

export function isAviationStackConfigured() {
  return !!process.env.AVIATIONSTACK_API_KEY;
}
