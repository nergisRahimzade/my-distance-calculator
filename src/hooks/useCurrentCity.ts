//this function is called when the page first mounts

import { fetchCityName } from "../services/apiClient";
import { getCurrentLocation } from "../utils/getCurrentLocation";

//it is used to get the user's current location and set it as the default value of the origin city
export async function useCurrentCity() {
  const current = getCurrentLocation();
  if (current?.permissionGranted === true) {
    const city = await fetchCityName(current.lat, current.lon);
    return city;
  }
};