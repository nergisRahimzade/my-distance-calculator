import { useEffect, useState } from "react";
import './RouteResult.css';
import { WeatherCard } from "../WeatherCard/WeatherCard.tsx";

import { apiCall } from '../../services/apiCalls.ts';

import type { RouteResultProps } from "../../types/index.ts";
import type { DistanceDataResult } from "../../types/apiResults/distanceDataResult.ts";

export function RouteResult({ origin, destination, mode, clicked, isLightTheme }: RouteResultProps) {
  const [result, setResult] = useState<DistanceDataResult | null>(null);
  const [loading, setLoading] = useState(false);

  //fethces distance and duration whenever clicked changes
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

      {loading && <p aria-label='Calculating distance and duration' className={`calculating-text ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>Calculating...</p>}
      {!loading && result && (
        <div className="output-city-container">
          <div className="display-container">
            <div className={"distance-duration-display-container" + (isLightTheme ? ' light-theme' : ' dark-theme')}>
              <p className={"distance-display-item" + (isLightTheme ? ' light-theme' : ' dark-theme')}>Distance: {result.distanceKm} km</p>
              <p className={"duration-display-item" + (isLightTheme ? ' light-theme' : ' dark-theme')}>Duration: {Math.floor(result.durationMinutes / 60)} hours {result.durationMinutes % 60} minutes </p>
            </div>

            <div className={"weather-display-container" + (isLightTheme ? ' light-theme' : ' dark-theme')}>
              <div className="weather-item">
                <WeatherCard city={origin} clicked={clicked} isLightTheme={isLightTheme} />
              </div>
              <div className="weather-item">
                <WeatherCard city={destination} clicked={clicked} isLightTheme={isLightTheme}  />
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}