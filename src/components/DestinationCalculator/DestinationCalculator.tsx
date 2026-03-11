import { Button, Tab, Box, Autocomplete, TextField, ThemeProvider, CssBaseline, Switch, FormControlLabel, createTheme, type AutocompleteRenderInputParams } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useEffect, useState } from 'react';
import './DestinationCalculator.css';
import { RouteResult } from '../RouteResult/RouteResult.tsx';

import { AttractionsList } from '../AttractionsList/AttractionsList.tsx';
import { EmergencyContacts } from '../EmergencyContacts/EmergencyContacts.tsx';
import styled from '@emotion/styled';
import { useCityList } from '../../hooks/useCityList.ts';
import { useThemeToggle } from '../../hooks/useThemeToggle.ts';
import { useCurrentCity } from '../../utils/getCurrentCity.ts';
import { useCalculatorForm } from '../../hooks/useCalculatorForm.ts';
import { CityDetailsPanel } from '../../components/CityDetailsPanel/CityDetailsPanel.tsx';

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

const StyledTextField = styled(TextField)(({ isLightTheme }: { isLightTheme: boolean }) => ({
  '& .MuiInputBase-root': {
    height: '100%',
    padding: '16px 14px',
    fontFamily: 'Poppins'
  },
  '& .MuiInputLabel-root': {
    color: isLightTheme ? '#757575' : '#fff',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: isLightTheme ? '#1976d2' : '#90caf9',
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

const StyledAutocomplete = styled(Autocomplete<string>)(({ isLightTheme }: { isLightTheme: boolean }) => ({
  '& .MuiOutlinedInput-root': {
    color: isLightTheme ? '#000' : '#fff',
    '& fieldset': {
      borderColor: isLightTheme ? '#bdbdbd' : 'rgba(144, 202, 249, 0.5)',
    },
    '&:hover fieldset': {
      borderColor: isLightTheme ? '#616161' : '#90caf9',
    },
    '&.Mui-focused fieldset': {
      borderColor: isLightTheme ? '#1976d2' : '#90caf9',
    },
  },
  '& .MuiAutocomplete-listbox': {
    backgroundColor: isLightTheme ? '#fff' : '#121212',
    color: isLightTheme ? '#000' : '#fff',
  },
  '& .MuiAutocomplete-option': {
    backgroundColor: isLightTheme ? '#fff' : '#1e1e1e',
    '&[aria-selected="true"]': {
      backgroundColor: isLightTheme ? '#bbdefb' : '#1565c0',
    },
    '&:hover': {
      backgroundColor: isLightTheme ? '#e3f2fd' : '#0d47a1',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: isLightTheme ? '#9e9e9e' : '#bdbdbd',
    opacity: 1,
  }
}));

export function DestinationCalculator() {
  const [currentCity, setCurrentCity] = useState('');
  const { isLightTheme, toggleTheme } = useThemeToggle();
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

          <StyledAutocomplete
            isLightTheme={isLightTheme}
            aria-label='Choose origin city'
            disablePortal
            options={useCityList()}
            value={origin}
            onChange={(_, newValue) => setOrigin(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                isLightTheme={isLightTheme}
                {...params}
                label='From'
              />
            }
          />

          <StyledAutocomplete
            isLightTheme={isLightTheme}
            aria-label='Choose destination city'
            disablePortal
            options={useCityList()}
            value={destination}
            onChange={(_, newValue) => setDestination(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                isLightTheme={isLightTheme}
                {...params}
                label='To'
              />
            }
          />

          <StyledAutocomplete
            isLightTheme={isLightTheme}
            aria-label='Choose mode of transportation'
            disablePortal
            options={['Foot', 'Car', 'Plane']}
            value={mode}
            onChange={(_, newValue) => setMode(newValue || '')}
            renderInput={(params: AutocompleteRenderInputParams) =>
              <StyledTextField
                isLightTheme={isLightTheme}
                {...params}
                label='Mode'
                onKeyDown={(event) => {
                  if(event.key === 'Enter') 
                    handleClick();
                }}
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
                  <AttractionsList city={destination} isLightTheme={isLightTheme} />
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