
/*
  //this function is used to check if Calculate button should be disabled or not
  const isDisabled = () => {
    if (origin === '' || destination === '' || mode === '')
      return true;

    if (origin === destination)
      return true;

    else
      return false;
  }

  //this function is called when Calculate button is clicked
  const handleClick = () => {
    //isValid();

    //setting showOutput to true opens RouteResult component
    //setting showCityInfo to true opens city info panel with tabs
    //changing value of clicked to fetch the distance and duration api results
    //setting isVisible to true shows Reset button
    if (origin && destination && mode && origin != destination) {
      setShowOutput(true);
      setShowCityInfo(true);
      setClicked(!clicked);
      setIsVisible(true);
    }
  };

  //this function is called when Reset button is clicked
  //resetting all states to empty autocomplete fields and hiding output
  const handleReset = () => {
    setShowOutput(false);
    setShowCityInfo(false);
    setOrigin('');
    setDestination('');
    setMode('');
    setIsVisible(false);
  };

  //this function is called when a tab is changed in the city info panel
  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  */
