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
import type { WeatherDataResult } from "../../types/apiResults/weatherDataResult.ts";

import { getLocalTime } from "../../utils/getLocalTime.tsx";
import cities from '../../types/constants/cities.json';

export function WeatherCard({ city, clicked, isLightTheme }: WeatherCardProps) {
  const [result, setResult] = useState<WeatherDataResult | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<{ iconId: string } | null>(null);

  const matchingCity = cities.cities.find((cityItem) => {
    return cityItem.cityName.toLowerCase() === city.toLowerCase();
  });

  const timeZone = matchingCity?.timeZone;

  const localTime = getLocalTime(timeZone ? timeZone : '');

  useEffect(() => {
    apiCall.getCityWeather(city)
      .then((res) => {
        setResult(res);
        setWeatherIcon(matchWeatherIcon(res.icon));
      })
      .catch((error) => {
        console.error('Error fetching weather data: ', error);
      });
  }, [clicked, city]);

  return (
    <div>
      {result && weatherIcon && (
        <div className="city-weather-info-container">
          <div className={"city-weather-info" + (isLightTheme ? 'light-theme' : 'dark-theme')}>
            <p className="city-name"> {city} </p>
            <div className="weather-icon-container">
              <img className="weather-icon" aria-label='weather-icon' src={new URL(
                `../../assets/weather-icons/${weatherIcon.iconId}.png`,
                import.meta.url
              ).href} alt={`${city} weather`} />
              <div className="local-time-container">
                <img className="calendar-icon" aria-label='local-time-and-date' src={new URL('../../assets/other-icons/calendar.png', import.meta.url).href} /> 
                <p> {localTime} </p>
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
