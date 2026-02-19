import { API_BASE_URLS, API_KEYS } from "../types/constants/apiConstants.ts";

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

export const fetchEmergencyNumbers = async (code: string) => {
  try {
    const response = await fetch(`${API_BASE_URLS.emergencyNumbers}/${code}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch emergency numbers`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching emergency numbers: ', error);
    throw error;
  }
};

export const fetchAmadeusAccessToken = async () => {
  try {
    const url = `${API_BASE_URLS.amadeus}/v1/security/oauth2/token`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${API_KEYS.amadeus.key}&client_secret=${API_KEYS.amadeus.secret}`
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
