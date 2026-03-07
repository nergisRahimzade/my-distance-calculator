import { useEffect, useState } from "react";
import './AttractionsList.css';

import { getAttractionsInfo } from "../../utils/getAttractionsInfo.ts";

import type { AttractionsListProps } from "../../types/index.ts";
import { CopyButton } from "../CopyButton/CopyButton.tsx";

export function AttractionsList({ city, isLightTheme, clicked }: AttractionsListProps) {
  const [attractionsInfo, setAttractionsInfo] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  //fetches attractions info every time clicked changes
  useEffect(() => {
    setLoading(true);
    const res = getAttractionsInfo(city);
    setAttractionsInfo(res);
    setLoading(false);
  }, [clicked]);

  if (loading) return <p>Loading attractions...</p>;
  if (!attractionsInfo?.length) return <p>No attractions found.</p>;

  return (
    <div>
      {attractionsInfo && attractionsInfo.map((attraction) => (
        <div key={attraction} className="attraction-item">
          <p className={`attraction-name ${isLightTheme ? 'light-theme' : 'dark-theme'}`}> {attraction} </p> 
          <CopyButton textToCopy={attraction} isLightTheme={isLightTheme}  />
        </div>
      ))}
    </div>
  );
}