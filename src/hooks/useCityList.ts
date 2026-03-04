import citiesData from '../constants/cities.json';

export function useCityList() {
  return citiesData.cities.map(city => city.cityName);
}