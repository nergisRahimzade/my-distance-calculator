import { Button, Tab, Box, Autocomplete, TextField, ThemeProvider, CssBaseline, Switch, FormControlLabel, createTheme, type AutocompleteRenderInputParams } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useEffect, useState, type SyntheticEvent } from 'react';
import './DestinationCalculator.css';
import { RouteResult } from '../RouteResult/RouteResult.tsx';

import { CityDetailsPanel } from '../CityDetailsPanel/CityDetailsPanel.tsx';
import { AttractionsList } from '../AttractionsList/AttractionsList.tsx';
import { EmergencyContacts } from '../EmergencyContacts/EmergencyContacts.tsx';
import { getCurrentLocation } from '../../utils/getCurrentLocation.ts';
import { fetchCityName } from '../../services/apiClient.ts';
import styled from '@emotion/styled';
import { useCityList } from '../../hooks/useCityList.ts';
import { useThemeToggle } from '../../hooks/useThemeToggle.ts';
import { useCurrentCity } from '../../hooks/useCurrentCity.ts';
import { useCalculatorForm } from '../../hooks/useCalculatorForm.ts';

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
  const [currentCity, setCurrentCity] = useState('');
  const {isLightTheme, toggleTheme} = useThemeToggle();
  const {
    origin, setOrigin,
    destination, setDestination,
    mode, setMode,
    showOutput,
    tabValue,
    showCityInfo,
    clicked, setClicked,
    isVisible,
    isDisabled,
    handleClick,
    handleReset,
    handleTabChange
  } = useCalculatorForm();

  useEffect(() => {
    useCurrentCity().then(setCurrentCity);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`container ${isLightTheme ? 'light-theme' : 'dark-theme'}`}>
        <div className='switch-container'>
          <FormControlLabel
            control={
              <Switch
                checked={isLightTheme}
                onChange={() => toggleTheme()}
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
            options={useCityList()}
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
            options={useCityList()}
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