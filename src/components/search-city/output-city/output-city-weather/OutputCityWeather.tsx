import { useEffect, useState } from "react";
import '../../../../assets/weather-icons/clear-sky.png';
import '../../../../assets/weather-icons/few-clouds.png';
import '../../../../assets/weather-icons/mist.png';
import '../../../../assets/weather-icons/rain.png';
import '../../../../assets/weather-icons/scattered-clouds.png';
import '../../../../assets/weather-icons/snow.png';
import '../../../../assets/weather-icons/thunderstorm.png';
import './OutputCityWeather.css';

type OutputCityWeatherProps = {
  city: string
}

type WeatherResult = {
  temp: number,
  feltTemp: number,
  icon: string
}


function matchWeatherIcon(weatherId: string) {
  if (weatherId === '01n' || weatherId === '01d')
    return { iconId: 'clear-sky' };
  else if (weatherId === '02n' || weatherId === '02d')
    return { iconId: 'few-clouds' };
  else if (weatherId === '03n' || weatherId === '04n' || weatherId === '03d' || weatherId === '04d')
    return { iconId: 'scattered-clouds' };
  else if (weatherId === '09n' || weatherId === '10n' || weatherId === '09d' || weatherId === '10d')
    return { iconId: 'rain' };
  else if (weatherId === '11n' || weatherId === '11d')
    return { iconId: 'thunderstorm' };
  else if (weatherId === '13n' || weatherId === '13d')
    return { iconId: 'snow' };
  else if (weatherId === '50n' || weatherId === '50d')
    return { iconId: 'mist' };

  return { iconId: 'unknown' };
}

async function getCityWeather(cityName: string) {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    temp: data.main.temp,
    feltTemp: data.main.feels_like,
    icon: data.weather[0].icon
  };
}

export function OutputCityWeather({ city }: OutputCityWeatherProps) {
  const [result, setResult] = useState<WeatherResult | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<{ iconId: string } | null>(null);

  useEffect(() => {
    getCityWeather(city)
      .then((res) => {
        setResult(res);
        const icon = matchWeatherIcon(res.icon);
        setWeatherIcon(icon);
      })
      .catch((error) => {
        console.log('Error fetching weather: ', error);
      });
  }, [city]);

  return (
    <div>
      {result && weatherIcon && (
        <div className="city-weather-info-container">
          <div className="city-weather-info">
            <img className="weather-icon" src={new URL(
              `../../../../assets/weather-icons/${weatherIcon.iconId}.png`,
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