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

//returns access token to be used in Amadeus API calls
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

export const fetchRouteDirections = async (origin: string, destination: string, mode: string) => {
  try {
    const url = `http://localhost:3000/api/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=${mode}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if(data.status !== 'OK') {
      throw new Error(`Google Distance Matrix API returned this as a status: ${data.status}`);
    }

    const routeData = data.rows[0].elements[0];

    if(routeData.status !== 'OK') {
      throw new Error('Google Distance Matrix API in elements returned this as a status: ', routeData.status);
    }

    return {
      distance: routeData.distance.text,
      duration: routeData.duration.text
    };
  } catch (error) {
    console.error('Error when fetching data from Google Distance Matrix API: ', error);
  }
};

//returns the name of a city given coordinates as parameters, using OpenStreetMap API
export const fetchCityName = async (lat: number, lon: number) => {
  try {
    const response = await fetch(`${API_BASE_URLS.openstreetmap}/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();
    console.log(data.address.city || data.address.town || data.address.village);

    return data.address.city || data.address.town || data.address.village;
  } catch (error) {
    console.error('Error fetching city name from coordinates: ', error);
  }
};
