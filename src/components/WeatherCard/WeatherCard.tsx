import { useEffect, useState } from "react";
import '../../assets/weather-icons/clear-sky.png';
import '../../assets/weather-icons/few-clouds.png';
import '../../assets/weather-icons/mist.png';
import '../../assets/weather-icons/rain.png';
import '../../assets/weather-icons/scattered-clouds.png';
import '../../assets/weather-icons/snow.png';
import '../../assets/weather-icons/thunderstorm.png';
import './WeatherCard.css';
import '../../assets/other-icons/calendar.png';

import { apiCall } from "../../services/apiCalls.ts";
import { matchWeatherIcon } from "../../utils/matchWeatherIcon.tsx";

import type { WeatherCardProps } from "../../types/index.ts";
import type { WeatherResult } from "../../types/weatherResult.ts";

import { DateTime } from "luxon";
import cities from '../../constants/cities.json';

export function WeatherCard({ city, clicked, isDayTime }: WeatherCardProps) {
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<{ iconId: string } | null>(null);

  const matchingCity = cities.cities.find((cityItem) => {
    return cityItem.cityName.toLowerCase() === city.toLowerCase();
  });

  const timeZone = matchingCity?.timeZone;

  const localTime = getLocalTime(timeZone ? timeZone : '');

  //AI---

  useEffect(() => {
    const localStorageKey = 'weatherResultsCache';
    let weatherCache: Record<string, WeatherResult> = {};
    try {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        weatherCache = JSON.parse(stored);
        if (weatherCache[city]) {
          setResult(weatherCache[city]);
          setWeatherIcon(matchWeatherIcon(weatherCache[city].icon));
          return;
        }
      }
    } catch (e) {
      // Ignore JSON parse errors
    }

    apiCall.getCityWeather(city)
      .then((res) => {
        setResult(res);
        setWeatherIcon(matchWeatherIcon(res.icon));
        // Cache result in localStorage
        weatherCache[city] = res;
        try {
          localStorage.setItem(localStorageKey, JSON.stringify(weatherCache));
        } catch (e) {
          // Ignore localStorage errors
        }
      })
      .catch((error) => {
        console.error('Error fetching weather: ', error);
      });
  }, [clicked, city]);

  //---

  return (
    <div>
      {result && weatherIcon && (
        <div className="city-weather-info-container">
          <div className={"city-weather-info" + (isDayTime ? 'day-theme' : 'night-theme')}>
            <p className="city-name"> {city} </p>
            <div className="weather-icon-container">
              <img className="weather-icon" aria-label='weather-icon' src={new URL(
                `../../assets/weather-icons/${weatherIcon.iconId}.png`,
                import.meta.url
              ).href} alt={`${city} weather`} />
              <div className="local-time-container">
                <img className="calendar-icon" aria-label='local-time-and-date' src={new URL('../../assets/other-icons/calendar.png', import.meta.url).href} /> <p> {localTime} </p>
              </div>
            </div>
          </div>
          <p className="temp-info"> Temp.: {result.temp}°C </p>
          <p className="felt-temp-info"> Felt Temp.:  {result.feltTemp}°C </p>
        </div>
      )}
    </div>
  );
}

function getLocalTime(timeZone: string) {
  if (!timeZone) return null;

  return DateTime.now()
    .setZone(timeZone)
    .toFormat("EEEE, MMM d yyyy, HH:mm");
}