import { useState, type SyntheticEvent } from "react";

export function useCalculatorForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [tabValue, setTabValue] = useState('overview');
  const [showCityInfo, setShowCityInfo] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isDisabled = () => {
    if (origin === '' || destination === '' || mode === '')
      return true;

    if (origin === destination)
      return true;

    else
      return false;
  }

  const handleClick = () => {
    if (origin && destination && mode && origin != destination) {
      setShowOutput(true);
      setShowCityInfo(true);
      setClicked(!clicked);
      setIsVisible(true);
    }
  };

  const handleReset = () => {
    setShowOutput(false);
    setShowCityInfo(false);
    setOrigin('');
    setDestination('');
    setMode('');
    setClicked(false);
    setIsVisible(false);
  };

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return {
    origin, setOrigin,
    destination, setDestination, 
    mode, setMode,
    showOutput, setShowOutput,
    tabValue, 
    showCityInfo, 
    clicked, setClicked,
    isVisible, setIsVisible,
    isDisabled, 
    handleClick,
    handleReset,
    handleTabChange
  };

}