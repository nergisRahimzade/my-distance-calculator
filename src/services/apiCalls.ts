import { fetchCityWeather, fetchEmergencyNumbers, fetchAmadeusAccessToken, fetchAmadeusActivities, fetchLocationCoordinates, fetchRouteDirections } from "./apiClient.ts";
import citiesData from '../constants/cities.json';
import type { Activity } from "../types/activity.ts";
import { calculatePopularityScore } from "../utils/calculatePopularityScore.ts";
import { calculateFlightDistance } from "../utils/calculateFlightDistance.ts";

export const apiCall = {
  getCityWeather: async (cityName: string) => {
    const data = await fetchCityWeather(cityName);

    return {
      temp: data.main.temp,
      feltTemp: data.main.feels_like,
      icon: data.weather[0].icon
    };
  },

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

  getCityInfo: async (cityName: string) => {
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


    async function generateItinerary(cityName: string) {
      const coord = await fetchLocationCoordinates(cityName);

      const token = await fetchAmadeusAccessToken();
      const activities = await fetchAmadeusActivities(coord.lat, coord.lon, token);
      const famousActivities = getTopActivities(activities);

      return famousActivities;
    }

    const res = await generateItinerary(cityName);
    return res;

  },

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