import { useEffect, useState } from "react";

import { apiCall } from "../../services/apiCalls.ts";

import type { EmergencyContactsProps } from "../../types/index.ts";

import './EmergencyContacts.css';

export function EmergencyContacts({ city, isDayTime }: EmergencyContactsProps) {
  const [numbersList, setNumbersList] = useState<any | null>(null);

  useEffect(() => {
    apiCall.getEmergencyNumber(city)
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