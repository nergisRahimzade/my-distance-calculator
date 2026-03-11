import './AttractionsList.css';

import type { AttractionsListProps } from "../../types/index.ts";
import { CopyButton } from "../CopyButton/CopyButton.tsx";
import { useEffect, useState } from 'react';
import { apiCall } from '../../services/apiCalls.ts';

export function AttractionsList({ city, isLightTheme }: AttractionsListProps) {
  const [attractionsInfo, setAttractionsInfo] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiCall.getCityAttractions(city)
      .then((res) => {
        setAttractionsInfo(res);
        setLoading(false);
        console.log('Attractions from api: ', res);
      })
      .catch((error) => {
        console.error('Error fetching attractions info: ', error);
        setLoading(false);
      });
  }, [city]);

  if(!loading && (!attractionsInfo || attractionsInfo.length === 0)) {
    return <p>No attractions found.</p>;
  }

  return (
    <div>
      {loading && (
        <div>
          <p className='loading-text'>Loading...</p>
        </div>
      )}

      {attractionsInfo && attractionsInfo.map((attraction) => (
        <div key={attraction} className="attraction-item">
          <p className={`attraction-name ${isLightTheme ? 'light-theme' : 'dark-theme'}`}> {attraction} </p> 
          <CopyButton textToCopy={attraction} isLightTheme={isLightTheme}  />
        </div>
      ))}
    </div>
  );
}