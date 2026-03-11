import { API_BASE_URLS, API_KEYS } from "../constants/apiConstants.ts";

//returns the weather data of a city using OpenWeatherMap API
export const fetchCityWeather = async (cityName: string) => {
  try {
    const url = `${API_BASE_URLS.openweathermap}/data/2.5/weather?q=${cityName}&appid=${API_KEYS.openweathermap}&units=metric`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching weather data: ', error);
    throw error;
  }
};

//returns the emergency contact numbers data of a city using an open source github API
export const fetchEmergencyNumbers = async (code: string) => {
  try {
    const response = await fetch(`https://raw.githubusercontent.com/EmergencyNumberAPI/emergency_number/master/data/${code}.json`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch emergency numbers`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching emergency numbers: ', error);
    throw error;
  }
};

//returns access token to be used in Amadeus API calls
export const fetchAmadeusAccessToken = async () => {
  try {
    const url = `${API_BASE_URLS.amadeus}/v1/security/oauth2/token`;

    console.log('API_KEYS.amadeus.key: ', API_KEYS.amadeus.key);
    console.log('API_KEYS.amadeus.secret: ', API_KEYS.amadeus.secret);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_KEYS.amadeus.key,
        client_secret: API_KEYS.amadeus.secret,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch amadeus access token`);
    }

    const data = await response.json();

    return data.access_token;
  } catch (error) {
    console.error('Error fetching amadeus access token: ', error);
    throw error;
  }
};

//returns the data of activities of a city using Amadeus API
export const fetchAmadeusActivities = async (lat: number, lon: number, accessToken: string, radius = 10) => {
  try {
    const url = `${API_BASE_URLS.amadeus}/v1/shopping/activities?latitude=${lat}&longitude=${lon}&radius=${radius}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch activities`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching amadeus activities: ', error);
    throw error;
  }
};

//returns the data of coordinates of a city using OpenStreetMap API
export const fetchLocationCoordinates = async (city: string) => {
  try {
    const url = `${API_BASE_URLS.openstreetmap}/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'TravelDistanceApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch coordinates for ${city}`);
    }

    const data = await response.json();

    if (!data || data.length === 0)
      throw new Error(`City not found: ${city}`);

    return data;
  } catch (error) {
    console.error('Error fetching lat lon from openstreetmap: ', error);
    throw error;
  }

};

/*
//returns the data of distance and duration between 2 cities using OpenRouteServie API
export const fetchRouteDirections = async (startLon: number, startLat: number, endLon: number, endLat: number, profile: string) => {
  try {
    const url = `${API_BASE_URLS.openrouteservice}/${profile}?api_key=${API_KEYS.openroute}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates: [[startLon, startLat], [endLon, endLat]]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouteService error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching route directions from OpenRouteService: ', error);
    throw error;
  }
};
*/

export const fetchRouteDirections = async (originLat: number, originLon: number, destinationLat: number, destinationLon: number, profile: string) => {
  const url = `https://router.project-osrm.org/route/v1/${profile}/${originLon},${originLat};${destinationLon},${destinationLat}?overview=false`;

  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`OSRM request failed: ${response.status}`);
  }

  const data = await response.json();

  return {
    distance: data.routes[0].distance,
    duration: data.routes[0].duration
  };
};

//returns the name of a city given coordinates as parameters, using OpenStreetMap API
export const fetchCityName = async (lat: number, lon: number) => {
  try {
    const response = await fetch(`${API_BASE_URLS.openstreetmap}/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();

    return data.address.city || data.address.town || data.address.village;
  } catch (error) {
    console.error('Error fetching city name from coordinates: ', error);
  }
};

export const fetchAttractions = async (lat: number, lon: number) => {
  try {
    const url = `https://api.geoapify.com/v2/places?categories=tourism.sights,tourism.attraction&filter=circle:${lon},${lat},5000&limit=10&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`;

    const response = await fetch(url);
    if (!response.ok)
      throw new Error('Failed to fetch activities using Geoapify Places API.');

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data from Geoapify Places API: ', error);
  }
};
