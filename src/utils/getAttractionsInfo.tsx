import citiesData from '../components/search-city-list/cities.json';

export const getAttractionsInfo = (cityName: string) => {
  const cities = citiesData.cities;

  const matchingCity = cities.find((city) => city.cityName === cityName);

  return matchingCity?.attractions || [];
};