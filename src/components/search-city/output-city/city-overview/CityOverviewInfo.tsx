import { useEffect, useState } from 'react';
import './CityOverviewInfo.css';

import { getCityInfo } from '../../../../services/getCityInfo';

import type { OverviewCityInfoProps } from '../../../../assets/types/OverCityInfoProps';

export function CityOverviewInfo({ city }: OverviewCityInfoProps) {
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    getCityInfo(city)
      .then((res) => {
        setInfo(res);
      })
      .catch((error) => {
        console.log('Error fetching overview info: ', error);
      });
  }, [city]);

  return (
    <div>
      {info && (
        <p className='overview-info'> {info} </p>
      )}
    </div>
  );
}