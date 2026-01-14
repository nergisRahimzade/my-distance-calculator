export async function findLatLon(city: string) {
  const url = import.meta.env.VITE_OPENSTREETMAP_BASE_URL + `/search?q=${encodeURIComponent(city)}&format=json&limit=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'TravelDistanceApp/1.0'
    }
  });
  const data = await response.json();

  if (!data || data.lenght === 0)
    throw new Error(`City not found: ${city}`);

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}