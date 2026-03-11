import { useEffect, useState } from "react";

import type { EmergencyContactsProps } from "../../types/index.ts";
import type { EmergencyNumbers } from "../../types/interfaces.ts";
import citiesList from '../../constants/cities.json';
import './EmergencyContacts.css';

export function EmergencyContacts({ isLightTheme }: EmergencyContactsProps) {
  const [numbersList, setNumbersList] = useState<EmergencyNumbers | null>(null);

  //fetches emergency contact numbers every time clicked changes
  useEffect(() => {
    citiesList.cities.forEach((city) => {
      setNumbersList({
        ambulance: city.emergencyNumbers.ambulance,
        fire: city.emergencyNumbers.fire,
        police: city.emergencyNumbers.police
      });
    });
  }, []);

  return (
    <div>
      {numbersList && (
        <div className={`numbers-container ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
          <p> Ambulance: {numbersList.ambulance} </p>
          <p> Fire: {numbersList.fire} </p>
          <p> Police: {numbersList.police} </p>
        </div>
      )}
    </div>
  );
}