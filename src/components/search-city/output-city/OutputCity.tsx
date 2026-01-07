import { useEffect, useState } from "react";
import './OutputCity.css';
import { OutputCityWeather } from "./output-city-weather/OutputCityWeather";

import { findDistDur } from "../../../services/findDistDur";

import type { DistanceResult } from "../../../assets/types/DistanceResult";
import type { OutputCityProps } from "../../../assets/types/OutputCityProps";

export function OutputCity({ origin, destination, mode }: OutputCityProps) {
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

  }, [origin, destination, mode]);

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