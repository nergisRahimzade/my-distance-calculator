export const API_KEYS = {
  openroute: import.meta.env.VITE_OPENROUTE_KEY,
  openweathermap: import.meta.env.VITE_OPENWEATHERMAP_KEY,
  amadeus: {
    key: import.meta.env.VITE_AMADEUS_API_KEY,
    secret: import.meta.env.VITE_AMADEUS_API_SECRET
  },
  google: import.meta.env.VITE_GOOGLE_API_KEY
};

export const API_BASE_URLS = {
  openrouteservice: import.meta.env.VITE_OPENROUTESERVICE_BASE_URL,
  openstreetmap: import.meta.env.VITE_OPENSTREETMAP_BASE_URL,
  openweathermap: 'https://api.openweathermap.org',
  amadeus: 'https://test.api.amadeus.com',
  emergencyNumbers: '/api/emergency'
};