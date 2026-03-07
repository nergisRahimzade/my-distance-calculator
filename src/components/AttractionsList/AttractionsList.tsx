import './AttractionsList.css';

import { getAttractionsInfo } from "../../utils/getAttractionsInfo.ts";

import type { AttractionsListProps } from "../../types/index.ts";
import { CopyButton } from "../CopyButton/CopyButton.tsx";

export function AttractionsList({ city, isLightTheme }: AttractionsListProps) {
  const attractionsInfo = getAttractionsInfo(city);

  if(!attractionsInfo || attractionsInfo.length === 0) {
    return <p>No attractions found.</p>;
  }

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