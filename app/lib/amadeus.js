/**
 * Amadeus Flight API Client
 * 
 * Integrates with the Amadeus Self-Service API for real flight data.
 * Set AMADEUS_API_KEY and AMADEUS_API_SECRET in your .env.local
 * 
 * Docs: https://developers.amadeus.com/self-service/apis-docs
 */

const BASE_URL = 'https://api.amadeus.com';
const AUTH_URL = `${BASE_URL}/v1/security/oauth2/token`;
const FLIGHT_SEARCH_URL = `${BASE_URL}/v2/shopping/flight-offers`;

let cachedToken = null;
let tokenExpiry = 0;

/**
 * Get OAuth2 access token from Amadeus
 */
async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  const key = process.env.AMADEUS_API_KEY;
  const secret = process.env.AMADEUS_API_SECRET;

  if (!key || !secret) {
    throw new Error('AMADEUS_CREDENTIALS_MISSING');
  }

  const res = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: key,
      client_secret: secret
    })
  });

  if (!res.ok) throw new Error('AMADEUS_AUTH_FAILED');

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + (data.expires_in - 60) * 1000; // refresh 60s early
  return cachedToken;
}

/**
 * Search flights using Amadeus Flight Offers API
 */
export async function searchFlightsAmadeus({ origin, destination, departureDate, passengers = 1, cabinClass = 'ECONOMY' }) {
  const token = await getAccessToken();

  const params = new URLSearchParams({
    originLocationCode: origin.toUpperCase(),
    destinationLocationCode: destination.toUpperCase(),
    departureDate,
    adults: String(passengers),
    travelClass: cabinClass.toUpperCase(),
    max: '20',
    currencyCode: 'USD'
  });

  const res = await fetch(`${FLIGHT_SEARCH_URL}?${params}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.errors?.[0]?.detail || 'AMADEUS_SEARCH_FAILED');
  }

  const data = await res.json();
  return normalizeAmadeusResults(data);
}

/**
 * Normalize Amadeus API response to our internal format
 */
function normalizeAmadeusResults(data) {
  const dictionaries = data.dictionaries || {};
  const carriers = dictionaries.carriers || {};

  return (data.data || []).map((offer, i) => {
    const seg = offer.itineraries?.[0];
    const segments = seg?.segments || [];
    const firstSeg = segments[0] || {};
    const lastSeg = segments[segments.length - 1] || {};

    return {
      flightId: offer.id || `ama-${i}`,
      airline: carriers[firstSeg.carrierCode] || firstSeg.carrierCode || 'Unknown',
      airlineCode: firstSeg.carrierCode || '',
      flightNumber: `${firstSeg.carrierCode}${firstSeg.number}`,
      origin: firstSeg.departure?.iataCode || '',
      destination: lastSeg.arrival?.iataCode || '',
      departureTime: firstSeg.departure?.at?.slice(11, 16) || '',
      arrivalTime: lastSeg.arrival?.at?.slice(11, 16) || '',
      duration: formatDuration(seg?.duration || ''),
      stops: Math.max(0, segments.length - 1),
      price: parseFloat(offer.price?.total) || 0,
      currency: offer.price?.currency || 'USD',
      cabinClass: offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || 'ECONOMY',
      seatsLeft: offer.numberOfBookableSeats || null,
      source: 'amadeus'
    };
  });
}

/**
 * Convert ISO 8601 duration to readable format
 * PT3H20M → 3h 20m
 */
function formatDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] || '0';
  const m = match[2] || '0';
  return `${h}h ${m}m`;
}

/**
 * Check if Amadeus credentials are configured
 */
export function isAmadeusConfigured() {
  return !!(process.env.AMADEUS_API_KEY && process.env.AMADEUS_API_SECRET);
}
