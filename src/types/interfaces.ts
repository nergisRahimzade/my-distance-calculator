// Define interfaces for the Geoapify Places API response
export interface FeatureProperties {
  name?: string;
  [key: string]: any; // allow other properties
}

export interface Feature {
  properties: FeatureProperties;
  [key: string]: any; // allow geometry, etc.
}

export interface CopyButtonProps {
  textToCopy: string,
  isLightTheme: boolean
}

export interface CityRecord {
  cityName: string,
  country: string
}

export interface EmergencyNumbers {
  ambulance: number | string,
  fire: number | string,
  police: number | string
}
