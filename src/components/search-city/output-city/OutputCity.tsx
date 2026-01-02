import { useEffect, useState } from "react";
import './OutputCity.css';
import { OutputCityWeather } from "./output-city-weather/OutputCityWeather";

type OutputCityProps = {
  origin: string,
  destination: string,
  mode: string
}

type DistanceResult = {
  distanceKm: string,
  durationMinutes: number
}

export function OutputCity({ origin, destination, mode }: OutputCityProps) {
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDistanceBetweenCities(origin, destination, mode)
      .then((res) => {
        setResult(res);
        console.log(`result.distanceKm: ${res.distanceKm}`);
        console.log(`result.durationMinutes: ${res.durationMinutes}`);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching distance: ', error);
        setLoading(false);
      });

  }, [origin, destination, mode]);

  const getCoordinates = async (city: string) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TravelDistanceApp/1.0'
      }
    });
    const data = await response.json();

    if (!data || data.lenght === 0)
      throw new Error(`City not found: ${city}`);

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };
  };

  const getDistanceBetweenCities = async (city1: string, city2: string, mode: string): Promise<DistanceResult> => {
    try {
      const apiKey = import.meta.env.VITE_OPENROUTE_KEY;

      if (!apiKey) {
        throw new Error('API key not found. Please add VITE_OPENROUTE_KEY to your .env file');
      }

      const origin = await getCoordinates(city1);
      const destination = await getCoordinates(city2);

      console.log('Origin: ', origin);
      console.log('Destination: ', destination);

      let profile = 'driving-car';
      if (mode === 'foot')
        profile = 'foot-walking';
      else if (mode === 'car')
        profile = 'driving-car';
      else if (mode === 'plane')
        return calculateFlightDistance(origin, destination);

      const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${origin.lon},${origin.lat}&end=${destination.lon},${destination.lat}`;

      console.log('Fetching route...');
      const response = await fetch(url);

      if (!response.ok)
        throw new Error(`API request failed: ${response.status}`);

      const data = await response.json();
      console.log('Route data: ', data);

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

  };

  //calculates duration between 2 cities if mode is plane
  const calculateFlightDistance = (origin: { lat: number, lon: number }, destination: { lat: number, lon: number }): DistanceResult => {
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

  return (
    <div className="cities-container">
      
      {loading && <p>Calculating...</p>}
      {!loading && result && (
        <div className="display-container">
          <div className="distance-duration-display-container">
            <p className="distance-display-item">Distance: {result.distanceKm} km</p>
            <p className="duration-display-item">Duration: {(result.durationMinutes / 60).toFixed(2)} hours</p>
          </div>

          <div className="weather-display-container">
            <div className="weather-item">
              <OutputCityWeather city={origin} />
            </div>
            <div className="weather-item">
              <OutputCityWeather city={destination} />
            </div> 
          </div>

        </div>
      )}
    </div>
  );
}