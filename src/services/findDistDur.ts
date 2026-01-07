import { findLatLon } from "./findLatLon";
import { calculateFlightDistance } from "../utils/calculateFlightDistance.tsx";

export async function findDistDur(city1: string, city2: string, mode: string) {
  try {
    const apiKey = import.meta.env.VITE_OPENROUTE_KEY;

    if (!apiKey) {
      throw new Error('API key not found. Please add VITE_OPENROUTE_KEY to your .env file');
    }

    const origin = await findLatLon(city1);
    const destination = await findLatLon(city2);

    let profile = 'driving-car';
    if (mode === 'foot')
      profile = 'foot-walking';
    else if (mode === 'car')
      profile = 'driving-car';
    else if (mode === 'plane')
      return calculateFlightDistance(origin, destination);

    const url = import.meta.env.VITE_OPENROUTESERVICE_BASE_URL + `/${profile}?api_key=${apiKey}&start=${origin.lon},${origin.lat}&end=${destination.lon},${destination.lat}`;

    const response = await fetch(url);

    if (!response.ok)
      throw new Error(`API request failed: ${response.status}`);

    const data = await response.json();

    const route = data.features[0].properties.segments[0];

    return {
      distanceKm: (route.distance / 1000).toFixed(2),
      durationMinutes: Math.round(route.duration / 60)
    };
  }
  catch (error) {
    console.log('Error in getDistanceBetweenCities: ', error);
    throw error;
  }
}