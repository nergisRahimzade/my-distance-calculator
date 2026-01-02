import { useEffect, useState } from 'react';
import './CityOverviewInfo.css';

type OverviewCityInfoProps = {
  city: string
}

const getCityInfo = async (cityName: string) => {
  const formattedCity = cityName.replace(/\s+/g, '_');

  const res = await fetch( `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedCity}`);

  if(!res.ok) throw new Error('Wikipedia fetch failed');

  const data = await res.json();
  if(!data.extract) return 'No overview available for this city.';

  return `${data.extract}`;
};

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