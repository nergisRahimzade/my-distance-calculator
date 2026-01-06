import { useEffect, useState } from "react";
import citiesData from '../../../search-city-list/cities.json';

type CityEmergencyNumbersInfoProps = {
  city: string
};

const getEmergencyNumber = async (cityName: string) => {
  const cities = citiesData.cities;
  const matchingCity = cities.find(city => city.cityName === cityName);
  const code = matchingCity?.country;

  const response = await fetch(`/api/emergency/${code}`);
  const result = await response.json();
  const data = result.data;

  const numbersData = {
    ambulance: data.ambulance.all[0],
    fire: data.fire.all[0],
    police: data.police.all[0]
  };

  return numbersData;
};

export function CityEmergencyNumbersInfo({ city }: CityEmergencyNumbersInfoProps) {
  const [numbersList, setNumbersList] = useState<any | null>(null);

  useEffect(() => {
    getEmergencyNumber(city)
      .then((res) => {
        setNumbersList(res);
        console.log(res);
      })
      .catch((error) => {
        console.log('Error fetching emergency numbers : ', error);
      });
  }, [city]);

  return (
    <div>
      {numbersList && (
        <div>
          <p> Ambulance: {numbersList.ambulance} </p>
          <p> Fire: {numbersList.fire} </p>
          <p> Police: {numbersList.police} </p>
        </div>
      )}
    </div>
  );
}