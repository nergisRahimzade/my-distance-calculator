import { useEffect, useState } from "react";

import { getEmergencyNumber } from "../../../../services/getEmergencyNumber";

import type { CityEmergencyNumbersInfoProps } from "../../../../assets/types/CityEmergencyNumbersInfoProps";

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