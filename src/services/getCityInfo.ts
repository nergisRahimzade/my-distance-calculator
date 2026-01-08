import { findLatLon } from "./findLatLon";
import { calculatePopularityScore } from "../utils/calculatePopularityScore";
import type { Activity } from "../assets/types/Activity";

export async function getCityInfo(cityName: string) {
  generateItinerary(cityName);
};

async function getAccessToken(apiKey: string, apiSecret: string) {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
  });

  const data = await response.json();

  return data.access_token;
}

async function getActivities(accessToken: string, latitude: number, longitude: number, radius = 10) {
  const url = `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();

  return data.data;
} 

async function generateItinerary(cityName: string) {
  const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
  const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;

  const coord = (await findLatLon(cityName));
  const lat = coord.lat;
  const lon = coord.lon;

  const token = await getAccessToken(apiKey, apiSecret);
  const activities = await getActivities(token, lat, lon);
  const famousActivities = getTopActivities(activities);


  famousActivities.forEach((activity: Activity) => {
    console.log('activity.name: ' ,activity.name);
    console.log('acitivity.price.amount' ,activity.price?.amount);
    console.log('activity.rating' ,activity.rating);
    console.log('activity.bookingLink' ,activity.bookingLink);
  });
}

interface City {
  cityName: string,
  country: string,
  attractions: string[]
};

function getTopActivities (activities: Activity[]) {
  //rank by popularity
  const ranked = activities
  .filter(a => a.rating && a.bookingLink) // Only consider activities with ratings and booking links
  .map((activity: Activity) => ({
    ...activity,
    score: calculatePopularityScore(activity)
  }))
  .sort((a, b) => b.score - a.score)
  .slice(0, 5);

  return ranked;
}
