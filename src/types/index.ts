export type AttractionsListProps = {
  city: string,
  isDayTime: boolean
};

export type EmergencyContactsProps = {
  city: string,
  isDayTime: boolean
};

export type CityDetailsPanelProps = {
  city: string,
  clicked: boolean,
  isDayTime: boolean
};

export type RouteResultProps = {
  origin: string,
  destination: string,
  mode: string,
  clicked: boolean,
  setClicked: (value: React.SetStateAction<boolean>) => void
};

export type WeatherCardProps = {
  city: string
};
