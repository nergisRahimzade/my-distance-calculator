export function getCurrentLocation() {
  let permissionGranted = false;

  if (navigator.geolocation) {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          permissionGranted = true;
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          return { lat, lon, permissionGranted };
        });
    } catch (error) {
      console.error('Error: ', error);

      return { lat: -91, lon: -91, permissionGranted: false };
    }
  }
}
