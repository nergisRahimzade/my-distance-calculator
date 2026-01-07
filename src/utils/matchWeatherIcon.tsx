export function matchWeatherIcon(weatherId: string) {
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