import { Button, Tab, Box, Autocomplete, TextField, ThemeProvider, CssBaseline, Switch, FormControlLabel, createTheme, type AutocompleteRenderInputParams } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import citiesData from '../../types/constants/cities.json';
import './DestinationCalculator.css';
import { RouteResult } from '../RouteResult/RouteResult.tsx';

import { CityDetailsPanel } from '../CityDetailsPanel/CityDetailsPanel.tsx';
import { AttractionsList } from '../AttractionsList/AttractionsList.tsx';
import { EmergencyContacts } from '../EmergencyContacts/EmergencyContacts.tsx';
import { getCurrentLocation } from '../../services/getCurrentLocation.ts';
import { fetchCityName } from '../../services/apiClient.ts';
import styled from '@emotion/styled';

const theme = createTheme({
  typography: {
    fontFamily: "Poppins"
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: 300
        }
      }
    }
  }
});

const StyledTabList = styled(TabList)(({ isLightTheme }: { isLightTheme: boolean }) => ({
  // Match the Box background
  borderRadius: '8px 8px 0 0', // Optional: rounded top corners
  fontFamily: 'Poppins',
  color: isLightTheme ? '#666' : '#90caf9',
  '&.Mui-selected': {
    color: isLightTheme ? '#1976d2' : '#ffffff',
  },

  '& .MuiTabs-indicator': {
    backgroundColor: isLightTheme ? '#1976d2' : '#90caf9',
  }

}));

const StyledButton = styled(Button)(() => ({
  fontFamily: 'Poppins',
  fontSize: 20,
  padding: 2,
  borderWidth: 1,
  borderColor: 'rgb(25, 118, 210)'
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    height: '100%',
    padding: '16px 14px',
    fontFamily: 'Poppins'
  }
}));

const StyledBox1 = styled(Box)(() => ({
  borderRadius: 2,
  padding: 2,
}));

const StyledBox2 = styled(Box)(({ isLightTheme }: { isLightTheme: boolean }) => ({
  borderBottom: 1,
  borderColor: isLightTheme ? '#e0e0e0' : 'rgba(144, 202, 249, 0.2)'
}));


export function DestinationCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [tabValue, setTabValue] = useState('overview');
  const [showCityInfo, setShowCityInfo] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const [isLightTheme, setIsLightTheme] = useState(true);
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    handleDefaultOrigin();
  }, []);

  //theme is used as the default value of ThemeProvider
  //const theme = useMemo(() => getTheme(isLightTheme), [isLightTheme]);  

  //this function is used to check if Calculate button should be disabled or not
  const isDisabled = () => {
    if (origin === '' || destination === '' || mode === '')
      return true;

    if (origin === destination)
      return true;

    else
      return false;
  }

  const cityList = useMemo(() => {
    return citiesData.cities.map(city => city.cityName);
  }, []);

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

  //this function is called when the theme switch is toggled
  //it toggles between light and dark themes
  const handleSwitchChange = () => {
    setIsLightTheme(!isLightTheme);
  };

  //this function is called when the page first mounts
  //it is used to get the user's current location and set it as the default value of the origin city
  const handleDefaultOrigin = async () => {
    const current = getCurrentLocation();
    if (current?.permissionGranted === true) {
      const city = await fetchCityName(current.lat, current.lon);
      setCurrentCity(city);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`container ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
        <div className='switch-container'>
          <FormControlLabel
            control={
              <Switch
                checked={isLightTheme}
                onChange={handleSwitchChange}
                slotProps={{ input: { 'aria-label': 'Switch theme' } }}
              />
            }
            label={isLightTheme ? 'Light Theme' : 'Dark Theme'}
          />
        </div>

        <div className='search-container'>

          <Autocomplete
            aria-label='Choose origin city'
            disablePortal
            options={cityList}
            value={currentCity !== '' ? currentCity : origin}
            onChange={(_, newValue) => setOrigin(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                {...params}
                label='From'
              />
            }
          />

          <Autocomplete
            aria-label='Choose destination city'
            disablePortal
            options={cityList}
            value={destination}
            onChange={(_, newValue) => setDestination(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                {...params}
                label='To'
              />
            }
          />

          <Autocomplete
            aria-label='Choose mode of transportation'
            disablePortal
            options={['Foot', 'Car', 'Plane']}
            value={mode}
            onChange={(_, newValue) => setMode(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                {...params}
                label='Mode'
              />
            }
          />

          <StyledButton
            onClick={handleClick}
            disabled={isDisabled()}
          >
            Calculate
          </StyledButton>

          {isVisible && (
            <StyledButton
              onClick={handleReset}
              variant='outlined'

            >
              Reset
            </StyledButton>
          )}


        </div>

        <div className='result-container'>
          {showOutput && (
            <RouteResult
              origin={origin}
              destination={destination}
              mode={mode}
              clicked={clicked}
              setClicked={setClicked}
              isLightTheme={isLightTheme}
            />
          )}
        </div>

        {showCityInfo && (
          <div className={`city-info-container ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
            <StyledBox1>

              <TabContext value={tabValue}>
                <StyledBox2 isLightTheme={isLightTheme}>
                  <StyledTabList isLightTheme={isLightTheme} onChange={handleTabChange}>
                    <Tab label='Overview' value='overview' />
                    <Tab label='Attractions' value='attractions' />
                    <Tab label='Emergency' value='emergency' />
                  </StyledTabList>
                </StyledBox2>
                <TabPanel value='overview'>
                  <CityDetailsPanel city={destination} clicked={clicked} isLightTheme={isLightTheme} />
                </TabPanel>
                <TabPanel value='attractions'>
                  <AttractionsList city={destination} isLightTheme={isLightTheme} clicked={clicked} />
                </TabPanel>
                <TabPanel value='emergency'>
                  <EmergencyContacts city={destination} isLightTheme={isLightTheme} clicked={clicked} />
                </TabPanel>
              </TabContext>
            </StyledBox1>
          </div>
        )}
      </div>
    </ThemeProvider>

  );
}