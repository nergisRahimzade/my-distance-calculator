const API_KEYS = {
  openroute: import.meta.env.VITE_OPENROUTE_KEY,
  openweathermap: import.meta.env.VITE_OPENWEATHERMAP_KEY,
  amadeus: {
    key: import.meta.env.VITE_AMADEUS_API_KEY,
    secret: import.meta.env.VITE_AMADEUS_API_SECRET
  }
};

const API_BASE_URLS = {
  openrouteservice: import.meta.env.VITE_OPENROUTESERVICE_BASE_URL,
  openstreetmap: import.meta.env.VITE_OPENSTREETMAP_BASE_URL,
  openweathermap: 'https://api.openweathermap.org',
  amadeus: 'https://test.api.amadeus.com',
  emergencyNumbers: '/api/emergency'
};

// Cache for location coordinates to prevent duplicate API calls
const locationCache: Map<string, { lat: number; lon: number }> = new Map();

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

    return data.data;
  } catch (error) {
    console.error('Error fetching amadeus activities: ', error);
    throw error;
  }
};

//AI---

export const fetchLocationCoordinates = async (city: string) => {
  // Check in-memory cache first
  if (locationCache.has(city)) {
    return locationCache.get(city)!;
  }

  // Check localStorage cache
  const localStorageKey = 'locationCoordinatesCache';
  let localCache: Record<string, { lat: number; lon: number }> = {};
  try {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      localCache = JSON.parse(stored);
      if (localCache[city]) {
        // Update in-memory cache for faster future access
        locationCache.set(city, localCache[city]);
        return localCache[city];
      }
    }
  } catch (e) {
    // Ignore JSON parse errors
  }

  //---

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

    const coordinates = {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon)
    };

    //AI---

    // Cache in memory
    locationCache.set(city, coordinates);
    // Cache in localStorage
    localCache[city] = coordinates;
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(localCache));
    } catch (e) {
      // Ignore localStorage errors
    }

    return coordinates;

    //---
    
  } catch (error) {
    console.error('Error fetching lat lon from openstreetmap: ', error);
    throw error;
  }
};

export const fetchRouteDirections = async (
  startLon: number,
  startLat: number,
  endLon: number,
  endLat: number,
  profile: string
) => {
  try {
    const url = `${API_BASE_URLS.openrouteservice}/${profile}?api_key=${API_KEYS.openroute}&start=${startLon},${startLat}&end=${endLon},${endLat}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OpenRouteService error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching route directions from OpenRouteService: ', error);
    throw error;
  }
};
