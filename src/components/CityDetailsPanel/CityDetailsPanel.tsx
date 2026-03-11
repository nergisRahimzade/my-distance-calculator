import { Fragment, useEffect, useState } from 'react';
import './CityDetailsPanel.css';

import { apiCall } from '../../services/apiCalls.ts';

import type { CityDetailsPanelProps } from '../../types/index.ts';
import type { Activity } from '../../types/activity.ts';
import { CopyButton } from '../CopyButton/CopyButton.tsx';
import { Box, Grid } from '@mui/material';


export function CityDetailsPanel({ city, clicked, isLightTheme }: CityDetailsPanelProps) {
  const [info, setInfo] = useState<Activity[] | null>(null);
  const [loading, setLoading] = useState(false);

  //fetches city info (top 5 attractions) every time clicked changes
  useEffect(() => {
    setLoading(true);
    apiCall.getCityInfo(city)
      .then((res) => {
        setInfo(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching overview info: ', error);
        setLoading(false);
      });
  }, [city, clicked]);

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
      {loading && (
        <div>
          <p className='loading-text'>Loading...</p>
        </div>
      )}

      {!loading && info && (
        <section className='overview-info'>

          <div className='activity-container' >
            <Box>
              <Grid container spacing={1}>
                <Grid size={4}>
                  <span className='activity-span-title' aria-label='activity-emoji'>&#127919; Activity</span>
                </Grid>

                <Grid size={2}>
                  <span className='activity-span-title' aria-label='price-emoji'>&#128181; Price</span>
                </Grid>

                <Grid size={6}>
                  <span className='activity-span-title' aria-label='booking-link-emoji'>&#127915; Booking Link</span>
                </Grid>

                {info.map((activity) => (
                  <Fragment key={activity.id}>
                    <Grid size={4}>
                      <p key={activity.id} className='activity-name'>
                        {activity.name}
                      </p>
                    </Grid>

                    <Grid size={2}>
                      <p key={activity.id} className='activity-price'>
                        {activity.price?.amount} {findCurrencyIcon(activity.price?.currencyCode || '')}
                      </p>
                    </Grid>

                    <Grid size={6}>
                      <div className='activity-booking-link-row'>
                        <a className='activity-booking-link'
                          href={activity.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {activity.bookingLink}
                        </a>
                        <CopyButton textToCopy={activity.bookingLink ? activity.bookingLink : ''} isLightTheme={isLightTheme} />
                      </div>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </Box>

          </div>

        </section>
      )}
    </div>
  );
}
