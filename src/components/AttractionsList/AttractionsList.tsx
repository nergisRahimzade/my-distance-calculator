import { useEffect, useState } from "react";
import './AttractionsList.css';

import { getAttractionsInfo } from "../../utils/getAttractionsInfo.tsx";

import type { AttractionsListProps } from "../../types/index.ts";
import { CopyButton } from "../CopyButton/CopyButton.tsx";

export function AttractionsList({ city, isDayTime }: AttractionsListProps) {
  const [attractionsInfo, setAttractionsInfo] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const res = getAttractionsInfo(city);
    setAttractionsInfo(res);
    setLoading(false);
  }, [city]);

  if (loading) return <p>Loading attractions...</p>;
  if (!attractionsInfo?.length) return <p>No attractions found.</p>;

  return (
    <div>
      {attractionsInfo && attractionsInfo.map((attraction) => (
        <div key={attraction.index} className="attraction-item">
          <p className={`attraction-name ${isDayTime ? 'day-theme' : 'night-theme'}`}> {attraction} </p> 
          <CopyButton textToCopy={attraction} isDayTime={isDayTime} />
        </div>
      ))}
    </div>
  );
}