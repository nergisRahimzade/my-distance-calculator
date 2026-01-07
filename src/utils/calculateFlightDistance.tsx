import type { DistanceResult } from "../assets/types/DistanceResult";

export function calculateFlightDistance(origin: { lat: number, lon: number }, destination: { lat: number, lon: number }): DistanceResult {
    // Haversine formula for great circle distance
    const R = 6371; // Earth's radius in km
    const dLat = (destination.lat - origin.lat) * Math.PI / 180;
    const dLon = (destination.lon - origin.lon) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    // Estimate flight time (average commercial flight speed ~800 km/h + 30 min for takeoff/landing)
    const duration = (distance / 800) * 60 + 30;

    return {
      distanceKm: distance.toFixed(2),
      durationMinutes: Math.round(duration)
    };
  };