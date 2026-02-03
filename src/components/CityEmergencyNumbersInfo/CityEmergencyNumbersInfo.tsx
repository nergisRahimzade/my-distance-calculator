import { useEffect, useState } from "react";

import { getEmergencyNumber } from "../../services/overviewServices/getEmergencyNumber.tsx";

import type { CityEmergencyNumbersInfoProps } from "../../assets/types/CityEmergencyNumbersInfoProps.ts";

import './CityEmergencyNumbersInfo.css';

export function CityEmergencyNumbersInfo({ city, isDayTime }: CityEmergencyNumbersInfoProps) {
  const [numbersList, setNumbersList] = useState<any | null>(null);

  useEffect(() => {
    getEmergencyNumber(city)
      .then((res) => {
        setNumbersList(res);
      })
      .catch((error) => {
        console.log('Error fetching emergency numbers : ', error);
      });
  }, [city]);

  return (
    <div>
      {numbersList && (
        <div className={`numbers-container ${isDayTime ? 'day-theme' : 'night-theme'}`}>
          <p> Ambulance: {numbersList.ambulance} </p>
          <p> Fire: {numbersList.fire} </p>
          <p> Police: {numbersList.police} </p>
        </div>
      )}
    </div>
  );
}