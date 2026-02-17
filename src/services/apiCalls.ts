import { fetchCityWeather, fetchEmergencyNumbers, fetchAmadeusAccessToken, fetchAmadeusActivities, fetchLocationCoordinates, fetchRouteDirections } from "./apiClient.ts";
import citiesData from '../constants/cities.json';
import type { Activity } from "../types/activity.ts";
import { calculatePopularityScore } from "../utils/calculatePopularityScore.tsx";
import { calculateFlightDistance } from "../utils/calculateFlightDistance.tsx";

export const apiCall = {
  //returns weather data for given city
  getCityWeather: async (cityName: string) => {
    const data = await fetchCityWeather(cityName);

    return {
      temp: data.main.temp,
      feltTemp: data.main.feels_like,
      icon: data.weather[0].icon
    };
  },

  //returns emergency contact numbers for given city
  getEmergencyNumber: async (cityName: string) => {
    const cities = citiesData.cities;
    const matchingCity = cities.find((city: any) => city.cityName === cityName);
    const code = matchingCity?.country;
    const data = await fetchEmergencyNumbers(code ? code : '');

    const numbersData = data.member_112 === true ?
      {
        ambulance: 112,
        fire: 112,
        police: 112
      } :
      {
        ambulance: data.ambulance.all[0],
        fire: data.fire.all[0],
        police: data.police.all[0]
      };

    return numbersData;
  },

  //returns top 5 attractions for given city
  getCityInfo: async (cityName: string) => {
    //filters out activities without booking links and ranks by popularity
    function getTopActivities(activities: Activity[]) {
      //rank by popularity
      const ranked = activities
        .filter(a => a.bookingLink) // Only consider activities with booking links
        .map((activity: Activity) => ({
          ...activity,
          score: calculatePopularityScore(activity)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      return ranked;
    }

    //returns list of top 5 activities for a city
    async function generateItinerary(cityName: string) {
      const result = await fetchLocationCoordinates(cityName);
      const coord = {
        lat: parseFloat(result[0].lat),
        lon: parseFloat(result[0].lon)
      };

      const token = await fetchAmadeusAccessToken();
      const data = await fetchAmadeusActivities(coord.lat, coord.lon, token);
      const activities = data.data;
      const famousActivities = getTopActivities(activities);

      return famousActivities;
    }

    const res = await generateItinerary(cityName);
    return res;

  },

  //returns the distance and duration between two cities based on selected mode
  getDistDur: async (city1: string, city2: string, mode: string) => {
    const startCoord = await fetchLocationCoordinates(city1);
    const endCoord = await fetchLocationCoordinates(city2);

    let profile = 'driving-car';
    if (mode === 'Foot')
      profile = 'foot-walking';
    else if (mode === 'Car')
      profile = 'driving-car';
    else if (mode === 'Plane')
      return calculateFlightDistance(startCoord, endCoord);

    const data = await fetchRouteDirections(startCoord.lon, startCoord.lat, endCoord.lon, endCoord.lat, profile);
    const route = data.features[0].properties.segments[0];

    return {
      distanceKm: (route.distance / 1000).toFixed(2),
      durationMinutes: Math.round(route.duration / 60)
    };
  }
};