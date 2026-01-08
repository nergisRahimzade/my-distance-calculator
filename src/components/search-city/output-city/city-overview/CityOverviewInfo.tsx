import { act, useEffect, useState } from 'react';
import './CityOverviewInfo.css';

import { getCityInfo } from '../../../../services/getCityInfo';

import type { OverviewCityInfoProps } from '../../../../assets/types/OverCityInfoProps';
import type { Activity } from '../../../../assets/types/Activity';

export function CityOverviewInfo({ city }: OverviewCityInfoProps) {
  const [info, setInfo] = useState<Activity[] | null>(null);

  useEffect(() => {
    getCityInfo(city)
      .then((res) => {
        setInfo(res);
      })
      .catch((error) => {
        console.log('Error fetching overview info: ', error);
      });
  }, [city]);

  const findCurrencyIcon = (currencyCode: string) => {
    if(currencyCode === 'USD') return '$';

    else if(currencyCode === 'EUR') return '€';

    else if(currencyCode === 'GBP') return '£';
    
    else if(currencyCode === 'JPY') return '¥';

    else if(currencyCode === 'INR') return '₹';

    else if(currencyCode === 'AUD') return 'A$';

    else if(currencyCode === 'CAD') return 'C$';

    else if(currencyCode === 'TRY') return '₺';

    else return currencyCode;
  };

  return (
    <div>
      {info && (
        <p className='overview-info'>
          {info.map((activity) => (
            <div className='activity-container' key={activity.id}>
              <p className='activity-name' key={activity.id}>
                <span className='activity-span-title'>&#127919; Activity</span> {activity.name}
              </p>

              <p className='activity-short-desc' key={activity.id}>
                <span className='activity-span-title'>&#128204; Description</span> {activity.shortDescription}
              </p>

              <p className='activity-price' key={activity.id}>
                <span className='activity-span-title'>&#128181; Price</span> {activity.price?.amount} {findCurrencyIcon(activity.price?.currencyCode || '')}
              </p>

              <p className='activity-booking-link' key={activity.id}>
                <span className='activity-span-title'>&#127915; Booking Link</span> {activity.bookingLink}
              </p>
            </div>
          ))}
        </p>
      )}
    </div>
  );
}