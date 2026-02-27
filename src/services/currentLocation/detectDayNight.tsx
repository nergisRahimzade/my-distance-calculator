export function detectDayNight(setIsDayTime: (value: React.SetStateAction<boolean>) => void) {
  if(!navigator.geolocation) {
    //fallback to browser's local time if geolocation not available
    const hour = new Date().getHours();
    setIsDayTime(hour >= 6 && hour < 18);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      //Calculate if it's day or night based on location
      const isDay = calculateDayTime(latitude, longitude);
      setIsDayTime(isDay);
    }, 
    (error) => {
      //If location access denied, use browser's local time
      console.log('Location access denied, using local time: ', error);
      const hour = new Date().getHours();
      setIsDayTime(hour >= 6 && hour < 18);
    }
  );
}

function calculateDayTime(lat: number, lon: number) {
  const now = new Date();

  const utcHour = now.getUTCHours();
  const timezoneOffset = Math.round(lon / 15);
  const localHour = (utcHour + timezoneOffset + 24) % 24;
  
  return localHour >= 6 && localHour < 18;
}