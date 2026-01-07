export async function getCityInfo(cityName: string) {
  const formattedCity = cityName.replace(/\s+/g, '_');

  const res = await fetch( `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedCity}`);

  if(!res.ok) throw new Error('Wikipedia fetch failed');

  const data = await res.json();
  if(!data.extract) return 'No overview available for this city.';

  return `${data.extract}`;
};