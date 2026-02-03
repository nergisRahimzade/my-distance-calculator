import { useEffect, useState } from 'react';
import './CityDetailsPanel.css';

import { getCityInfo } from '../../services/overviewServices/getCityInfo.ts';

import type { CityDetailsPanelProps } from '../../types/index.ts';
import type { Activity } from '../../types/activity.ts';
import { CopyButton } from '../CopyButton/CopyButton.tsx';

export function CityDetailsPanel({ city, clicked, isDayTime }: CityDetailsPanelProps) {
  const [info, setInfo] = useState<Activity[] | null>(null);

  useEffect(() => {
    getCityInfo(city)
      .then((res) => {
        setInfo(res);
      })
      .catch((error) => {
        console.log('Error fetching overview info: ', error);
      });
  }, [clicked]);

  const findCurrencyIcon = (currencyCode: string) => {
    if (currencyCode === 'USD') return '$';

    else if (currencyCode === 'EUR') return '€';

    else if (currencyCode === 'GBP') return '£';

    else if (currencyCode === 'JPY') return '¥';

    else if (currencyCode === 'INR') return '₹';

    else if (currencyCode === 'AUD') return 'A$';

    else if (currencyCode === 'CAD') return 'C$';

    else if (currencyCode === 'TRY') return '₺';

    else return currencyCode;
  };

  return (
    <div>
      {info && (
        <p className='overview-info'>
          {info.map((activity) => (
            <div className='activity-container' key={activity.id}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <span className='activity-span-title'>&#127919; Activity</span>
                    </th>

                    <th>
                      <span className='activity-span-title'>&#128204; Description</span>
                    </th>

                    <th>
                      <span className='activity-span-title'>&#128181; Price</span>
                    </th>

                    <th>
                      <span className='activity-span-title'>&#127915; Booking Link</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='activity-name' key={activity.id}>
                      {activity.name}
                    </td>

                    <td className='activity-short-desc' key={activity.id}>
                      {activity.shortDescription}
                    </td>

                    <td className='activity-price' key={activity.id}>
                      {activity.price?.amount} {findCurrencyIcon(activity.price?.currencyCode || '')}
                    </td>

                    <td className='activity-booking-link' key={activity.id}>
                      <a
                        href={activity.bookingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'rgb(25, 118, 210)',
                          textDecoration: 'underline',
                          marginRight: '8px',
                          wordBreak: 'break-all'
                        }}
                      >
                        {activity.bookingLink}
                      </a> 
                      <CopyButton textToCopy={activity.bookingLink ? activity.bookingLink : ''} isDayTime={isDayTime} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </p>
      )}
    </div>
  );
}