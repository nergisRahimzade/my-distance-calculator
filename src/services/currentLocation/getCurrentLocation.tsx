export function getCurrentLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('lat: ', latitude, ', lon: ', longitude);

        //use the coordinates
        displayLocation(latitude, longitude);
      }, 
      (error) => {
        console.log('Error getting location: ', error.message);
        alert('Unable to retrieve your location.');
      }
    );
  }
  
  else {
    alert('Geolocation is not supported by your browser.');
  }
}

function displayLocation(latitude: number, longitude: number) {
  throw new Error("Function not implemented.");
}
