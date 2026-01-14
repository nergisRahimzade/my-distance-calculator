import citiesData from '../../components/search-city-list/cities.json';

export async function getEmergencyNumber(cityName: string) {
  const cities = citiesData.cities;
  const matchingCity = cities.find(city => city.cityName === cityName);
  const code = matchingCity?.country

  //full url is in vite.config.ts
  const response = await fetch(`/api/emergency/${code}`);
  const result = await response.json();
  const data = result.data;

  const numbersData = data.member_112 === true ? 
  {
    ambulance: 112,
    fire: 112,
    police: 112
  } : 
  {
    ambulance: data.ambulance.all[0],
    fire: data.fire.all[0],
    police: data.police.all[0]
  };

  return numbersData;
};