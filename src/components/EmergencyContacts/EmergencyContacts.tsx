import { useEffect, useState } from "react";

import { apiCall } from "../../services/apiCalls.ts";

import type { EmergencyContactsProps } from "../../types/index.ts";

import './EmergencyContacts.css';

export function EmergencyContacts({ city, isDayTime, clicked }: EmergencyContactsProps) {
  const [numbersList, setNumbersList] = useState<any | null>(null);

  //fetches emergency contact numbers every time clicked changes
  useEffect(() => {
    apiCall.getEmergencyNumber(city)
      .then((res) => {
        setNumbersList(res);
      })
      .catch((error) => {
        console.error('Error fetching emergency numbers : ', error);
      });
  }, [clicked]);

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