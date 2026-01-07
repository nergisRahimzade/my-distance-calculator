import { useEffect, useState } from "react";
import './CityAttractionsInfo.css';

import { getAttractionsInfo } from "../../../../utils/getAttractionsInfo";

import type { CityAttractionInfoProps } from "../../../../assets/types/CityAttractionInfoProps";

export function CityAttractionInfo({ city }: CityAttractionInfoProps) {
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
        <div key={crypto.randomUUID()} className="attraction-item">
          <p> {attraction} </p>
        </div>
      ))}
    </div>
  );
}