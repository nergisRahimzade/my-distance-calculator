export type OutputCityProps = {
  origin: string,
  destination: string,
  mode: string,
  clicked: boolean,
  setClicked: (value: React.SetStateAction<boolean>) => void
}