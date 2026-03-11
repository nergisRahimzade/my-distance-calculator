export type AttractionsListProps = {
  city: string,
  isLightTheme: boolean
};

export type EmergencyContactsProps = {
  city: string,
  isLightTheme: boolean,
  clicked: boolean
};

export type CityDetailsPanelProps = {
  city: string,
  clicked: boolean,
  isLightTheme: boolean
};

export type RouteResultProps = {
  origin: string,
  destination: string,
  mode: string,
  clicked: boolean,
  setClicked: (value: React.SetStateAction<boolean>) => void,
  isLightTheme: boolean
};

export type WeatherCardProps = {
  city: string,
  clicked: boolean,
  isLightTheme: boolean,
};

export type UseThemeToggleProps = {
  isLightTheme: boolean,
  setIsLightTheme: (value: React.SetStateAction<boolean>) => void
}

