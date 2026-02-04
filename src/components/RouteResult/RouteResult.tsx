import { useEffect, useState } from "react";
import './RouteResult.css';
import { WeatherCard } from "../WeatherCard/WeatherCard.tsx";

import { apiCall } from '../../services/apiCalls.ts';

import type { RouteResultProps } from "../../types/index.ts";
import type { DistanceResult } from "../../types/distanceResult.ts";

export function RouteResult({ origin, destination, mode, clicked }: RouteResultProps) {
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCall.getDistDur(origin, destination, mode)
      .then((res) => {
        setResult(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching distance: ', error);
        setLoading(false);
      });

  }, [clicked]);

  return (
    <div className="cities-container">

      {loading && <p aria-label='calculating' className="calculating-text">Calculating...</p>}
      {!loading && result && (
        <div className="output-city-container">
          <div className="display-container">
            <div className="distance-duration-display-container">
              <p className="distance-display-item">Distance: {result.distanceKm} km</p>
              <p className="duration-display-item">Duration: {Math.floor(result.durationMinutes / 60)} hours {result.durationMinutes % 60} minutes </p>
            </div>

            <div className="weather-display-container">
              <div className="weather-item">
                <WeatherCard city={origin} />
              </div>
              <div className="weather-item">
                <WeatherCard city={destination} />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}