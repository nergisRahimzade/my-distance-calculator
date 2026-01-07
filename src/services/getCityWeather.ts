export async function getCityWeather(cityName: string) {
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