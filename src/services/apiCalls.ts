import { fetchCityWeather, fetchEmergencyNumbers, fetchAmadeusAccessToken, fetchAmadeusActivities, fetchLocationCoordinates, fetchRouteDirections, fetchAttractions } from "./apiClient.ts";
import citiesData from '../constants/cities.json';
import type { Activity } from "../types/activity.ts";
import { calculatePopularityScore } from "../utils/calculatePopularityScore.ts";
import { calculateFlightDistance } from "../utils/calculateFlightDistance.ts";
import type { CityRecord } from "../types/interfaces.ts";
import type { FeatureProperties } from "../types/interfaces.ts";
import type { Feature } from "../types/interfaces.ts";

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
    const matchingCity = cities.find((city: CityRecord) => city.cityName === cityName);
    const code = matchingCity?.country;
    const data = await fetchEmergencyNumbers(code ? code : '');

    const numbersData =
    {
      ambulance: data.data.ambulance.all,
      fire: data.data.fire.all,
      police: data.data.police.all

    };

    return numbersData;
  },

  
  //returns top 5 attractions for given city
  getCityInfo: async (cityName: string) => {
    //returns top 5 activities by filtering out activities without booking links and ranks by popularity
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
  },
            

  getCityAttractions: async (cityName: string) => {
    const coordinates = await fetchLocationCoordinates(cityName);
    const data = await fetchAttractions(coordinates[0].lat, coordinates[0].lon);

    const attractions: string[] = [];

    data.features.forEach((feature: Feature) => {
      const name = feature.properties.name;

      if (name && name !== "") {
        attractions.push(name);
      }
    });

    return attractions;
  },

  //returns the distance and duration between two cities based on selected mode
  getDistDur: async (origin: string, destination: string, mode: string) => {
    const startCoordResult = await fetchLocationCoordinates(origin);
    const endCoordResult = await fetchLocationCoordinates(destination);

    if (mode === 'Car')
      mode = 'driving'
    else if (mode === 'Foot')
      mode = 'walking'
    else if (mode === 'Plane')
      return calculateFlightDistance(startCoordResult, endCoordResult);

    const data = await fetchRouteDirections(startCoordResult[0].lat, startCoordResult[0].lon, endCoordResult[0].lat, endCoordResult[0].lon, mode.toLowerCase());

    return {
      distanceKm: (data?.distance / 1000).toFixed(2),
      durationMinutes: Math.floor((data?.duration / 60))
    };
  }
};