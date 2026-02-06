import { Button, Tab, Box, Autocomplete, TextField, ThemeProvider, CssBaseline } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
import citiesData from '../../constants/cities.json';
import './DestinationCalculator.css';
import { RouteResult } from '../RouteResult/RouteResult.tsx';

import { CityDetailsPanel } from '../CityDetailsPanel/CityDetailsPanel.tsx';
import { AttractionsList } from '../AttractionsList/AttractionsList.tsx';
import { EmergencyContacts } from '../EmergencyContacts/EmergencyContacts.tsx';
import { detectDayNight } from '../../services/currentLocation/detectDayNight.tsx';
import { getTheme } from '../../utils/getTheme.tsx';

export function DestinationCalculator() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [tabValue, setTabValue] = useState('overview');
  const [showCityInfo, setShowCityInfo] = useState(false);

  const [clicked, setClicked] = useState(false);

  const [originError, setOriginError] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [modeError, setModeError] = useState('');
  const [matchingCityError, setMatchingCityError] = useState('');
  const [isDayTime, setIsDayTime] = useState(true);

  const autoCompleteStyle = { width: 300, fontFamily: 'Poppins' };

  const theme = useMemo(() => getTheme(isDayTime), [isDayTime]);

  //validation of inputs
  const isValid = () => {
    //reset & clear all errors
    setOriginError('');
    setDestinationError('');
    setModeError('');
    setMatchingCityError('');

    if (origin === '')
      setOriginError('Please enter an origin.');

    if (destination === '')
      setDestinationError('Please enter a destination.');

    if (mode === '')
      setModeError('Please enter a mode.');

    if (destination === origin)
      setMatchingCityError('Origin and destination cannot be the same.');
  };

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

  useEffect(() => {
    detectDayNight(setIsDayTime);
  }, []);

  //setting showOutput to true opens RouteResult component
  const handleClick = () => {
    isValid();

    if (origin && destination && mode && origin != destination) {
      setShowOutput(true);
      setShowCityInfo(true);
      setClicked(true);
      setTimeout(() => setClicked(false), 2000);
    }
  };

  //resetting all states to empty autocomplete fields and hiding output
  const handleReset = () => {
    setShowOutput(false);
    setShowCityInfo(false);
    setOrigin('');
    setDestination('');
    setMode('');
  };

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`container ${isDayTime ? 'day-theme' : 'night-theme'}`}>
        <div className='search-container'>

          <Autocomplete
            aria-label='Choose origin city'
            disablePortal
            options={cityList}
            value={origin}
            onChange={(_, newValue) => setOrigin(newValue || '')}
            sx={{ autoCompleteStyle }}
            renderInput={(params: any) =>
              <TextField
                sx={{
                  '& .MuiInputBase-root': {
                    height: '100%',
                    padding: '16px 14px',
                    fontFamily: 'Poppins'
                  }
                }}
                {...params}
                label='From'
                helperText={originError === '' ? '' : originError}
              />
            }
          />

          <Autocomplete
            aria-label='Choose destination city'
            disablePortal
            options={cityList}
            value={destination}
            onChange={(_, newValue) => setDestination(newValue || '')}
            sx={{ autoCompleteStyle }}
            renderInput={(params: any) =>
              <TextField
                sx={{
                  '& .MuiInputBase-root': {
                    height: '100%',
                    padding: '16px 14px',
                    fontFamily: 'Poppins'
                  }
                }}
                {...params}
                label='To'
                helperText={(destinationError === '' ? '' : destinationError) || (matchingCityError === '' ? '' : matchingCityError)}
              />
            }
          />

          <Autocomplete
            aria-label='Choose mode of transportation'
            disablePortal
            options={['Foot', 'Car', 'Plane']}
            value={mode}
            onChange={(_, newValue) => setMode(newValue || '')}
            sx={{ autoCompleteStyle }}
            renderInput={(params: any) =>
              <TextField
                sx={{
                  '& .MuiInputBase-root': {
                    height: '100%',
                    padding: '16px 14px',
                    fontFamily: 'Poppins'
                  }
                }}
                {...params}
                label='Mode'
                helperText={modeError === '' ? '' : modeError}
              />
            }
          />

          <Button
            onClick={handleClick}
            sx={{ fontFamily: 'Poppins', fontSize: 20, backgroundColor: 'rgb(25, 118, 210)', color: 'white', padding: 2 }}
            disabled={isDisabled()}
          >
            Calculate
          </Button>

          <Button
            onClick={handleReset}
            sx={{ fontFamily: 'Poppins', fontSize: 20, padding: 2, borderWidth: 1, borderColor: 'rgb(25, 118, 210)' }}
            variant='outlined'
          >
            Reset
          </Button>


        </div>

        <div className='result-container'>
          {showOutput && (
            <RouteResult
              origin={origin}
              destination={destination}
              mode={mode}
              clicked={clicked}
              setClicked={setClicked}
              isDayTime={isDayTime}
            />
          )}
        </div>

        {showCityInfo && (
          <div className={`city-info-container ${isDayTime ? 'day-theme' : 'night-theme'}`}>
            <Box
              sx={{
                borderRadius: 2,
                padding: 2,
              }}
            >

              <TabContext value={tabValue}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: isDayTime ? '#e0e0e0' : 'rgba(144, 202, 249, 0.2)',
                  }}
                >
                  <TabList onChange={handleTabChange}
                    sx={{ // Match the Box background
                      borderRadius: '8px 8px 0 0', // Optional: rounded top corners
                      '& .MuiTab-root': {
                        fontFamily: 'Poppins',
                        color: isDayTime ? '#666' : '#90caf9',
                        '&.Mui-selected': {
                          color: isDayTime ? '#1976d2' : '#ffffff',
                        },
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: isDayTime ? '#1976d2' : '#90caf9',
                      }
                    }}
                  >
                    <Tab sx={{ fontFamily: 'Poppins' }} label='Overview' value='overview' />
                    <Tab sx={{ fontFamily: 'Poppins' }} label='Attractions' value='attractions' />
                    <Tab sx={{ fontFamily: 'Poppins' }} label='Emergency' value='emergency' />
                  </TabList>
                </Box>
                <TabPanel value='overview'>
                  <CityDetailsPanel city={destination} clicked={clicked} isDayTime={isDayTime} />
                </TabPanel>
                <TabPanel value='attractions'>
                  <AttractionsList city={destination} isDayTime={isDayTime} clicked={clicked} />
                </TabPanel>
                <TabPanel value='emergency'>
                  <EmergencyContacts city={destination} isDayTime={isDayTime} clicked={clicked} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        )}
      </div>
    </ThemeProvider>

  );
}