export type CityAttractionInfoProps = {
  city: string,
  isDayTime: boolean
};

export type CityEmergencyNumbersInfoProps = {
  city: string,
  isDayTime: boolean
};

export type OutputCityProps = {
  origin: string,
  destination: string,
  mode: string,
  clicked: boolean,
  setClicked: (value: React.SetStateAction<boolean>) => void
}

export type OutputCityWeatherProps = {
  city: string
}

export type OverviewCityInfoProps = {
  city: string,
  clicked: boolean,
  isDayTime: boolean
}