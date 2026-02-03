import { useEffect, useState } from "react";
import './OutputCity.css';
import { OutputCityWeather } from "../OutputCityWeather/OutputCityWeather.tsx";

import { findDistDur } from "../../services/destServices/getDistDur.ts";

import type { OutputCityProps } from "../../types/index.ts";
import type { DistanceResult } from '../../types/DistanceResult.ts';

export function OutputCity({ origin, destination, mode, clicked }: OutputCityProps) {
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    findDistDur(origin, destination, mode)
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

      {loading && <p className="calculating-text">Calculating...</p>}
      {!loading && result && (
        <div className="output-city-container">
          <div className="display-container">
            <div className="distance-duration-display-container">
              <p className="distance-display-item">Distance: {result.distanceKm} km</p>
              <p className="duration-display-item">Duration: {Math.floor(result.durationMinutes / 60)} hours {result.durationMinutes % 60} minutes </p>
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
        </div>
      )}
    </div>
  );
}