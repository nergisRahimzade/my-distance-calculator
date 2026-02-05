import { useEffect, useState } from "react";
import '../../assets/weather-icons/clear-sky.png';
import '../../assets/weather-icons/few-clouds.png';
import '../../assets/weather-icons/mist.png';
import '../../assets/weather-icons/rain.png';
import '../../assets/weather-icons/scattered-clouds.png';
import '../../assets/weather-icons/snow.png';
import '../../assets/weather-icons/thunderstorm.png';
import './WeatherCard.css';

import { apiCall } from "../../services/apiCalls.ts";
import { matchWeatherIcon } from "../../utils/matchWeatherIcon.tsx";

import type { WeatherCardProps } from "../../types/index.ts";
import type { WeatherResult } from "../../types/weatherResult.ts";

export function WeatherCard({ city, clicked }: WeatherCardProps) {
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<{ iconId: string } | null>(null);

  //fetches weather data every time clicked changes
  useEffect(() => {
    apiCall.getCityWeather(city)
      .then((res) => {
        setResult(res);
        const icon = matchWeatherIcon(res.icon);
        setWeatherIcon(icon);
      })
      .catch((error) => {
        console.error('Error fetching weather: ', error);
      });
  }, [clicked]);

  return (
    <div>
      {result && weatherIcon && (
        <div className="city-weather-info-container">
          <div className="city-weather-info">
            <img className="weather-icon" aria-label='weather-icon' src={new URL(
              `../../assets/weather-icons/${weatherIcon.iconId}.png`,
              import.meta.url
            ).href} alt={`${city} weather`} />
            <p> {city} </p>
          </div>
          <p className="temp-info"> Temp.: {result.temp}°C </p>
          <p className="felt-temp-info"> Felt Temp.:  {result.feltTemp}°C </p>
        </div>
      )}
    </div>
  );
}