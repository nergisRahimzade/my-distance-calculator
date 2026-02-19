# Destination Calculator

Destination Calculator is a web application that allows users to see the distance and duration between 2 cities alongside cities' temperature, local time and date, attraction list of the destination city and emergency numbers available at the destination city.

---

## Features

- Responsive UI
- Light/Dark theme according to the day/night time of the location of the user
- Attractions list of the destination city
- Overview of the destination city with top activities to do and their booking link
- Emergency numbers available at the destination city
- Local time, date and temperature of the destination city 

---

## Tech Stack

Frontend:
- React
- MUI
- CSS

Backend:
- External APIs: OpenWeatherMap, OpenStreetMap, OpenRouteService, Amadeus, [github opensource API](https://emergencynumberapi.com/api/country)

---

## Installation 

1. Install dependencies
   
```bash
  npm install
```

2. Start the development server 

```bash
npm run dev
```
---

## Usage

- Users can see the distance and duration between 2 cities.
- Have an idea in mind of what to look for and what to do.

---

## Project Structure

```
/components     -> Components of the web application
/constants      -> Constants used in components
/services       -> API consolidation file and API usage files
/types          -> Types and Props used accross components and helper functions
/utils          -> Helper functions

```

---

## Future Improvements

- Custom APIs to fetch weather, time, attractions, overview, emergency numbers, distance and duration
- Wider selection of cities and modes of travel
- Accomodation search for destination city
- More professional UI for a multi-page web application

---

## Author

Nergiz Rahimzade
Frontend Developer
[Linkedin](https://www.linkedin.com/in/nergiz-rahimzade-183967337/)