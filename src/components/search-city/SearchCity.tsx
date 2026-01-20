import { Button, Tab, Box, Autocomplete, TextField } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useMemo, useState, type SyntheticEvent } from 'react';
import citiesData from '../search-city-list/cities.json';
import './SearchCity.css';
import { OutputCity } from './output-city/OutputCity';

import { CityOverviewInfo } from './output-city/city-overview/CityOverviewInfo';
import { CityAttractionInfo } from './output-city/city-overview/CityAttractionsInfo';
import { CityEmergencyNumbersInfo } from './output-city/city-overview/CityEmergencyNumbersInfo';

export function SearchCity() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [tabValue, setTabValue] = useState('overview');
  const [showCityInfo, setShowCityInfo] = useState(false);

  const [clicked, setClicked] = useState(false);

  const cityList = useMemo(() => {
    return citiesData.cities.map(city => city.cityName);
  }, []);

  const handleClick = () => {
    setShowOutput(true);
    setShowCityInfo(true);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
    //const html = use(<OutputCity origin={origin} destination={destination} />);
  };

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
    <div className='container'>
      <div className='search-container'>

        <Autocomplete
          disablePortal
          options={cityList}
          value={origin}
          onChange={(_, newValue) => setOrigin(newValue || '')}
          sx={{ width: 300, fontFamily: 'Poppins' }}
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
            />
          }
        />


        <Autocomplete
          disablePortal
          options={cityList}
          value={destination}
          onChange={(_, newValue) => setDestination(newValue || '')}
          sx={{ width: 300, fontFamily: 'Poppins' }}
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
            />
          }
        />

        <Autocomplete
          disablePortal
          options={['Foot', 'Car', 'Plane']}
          value={mode}
          onChange={(_, newValue) => setMode(newValue || '')}
          sx={{ width: 300, fontFamily: 'Poppins' }}
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
              label='By'
            />
          }
        />

        <Button
          onClick={handleClick}
          sx={{ fontFamily: 'Poppins', fontSize: 20, backgroundColor: 'rgb(25, 118, 210)', color: 'white', padding: 2 }}
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
          <OutputCity
            origin={origin}
            destination={destination}
            mode={mode}
            clicked={clicked}
            setClicked={setClicked}
          />
        )}
      </div>

      {showCityInfo && (
        <div className='city-info-container'>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList onChange={handleTabChange}>
                  <Tab sx={{ fontFamily: 'Poppins' }} label='Overview' value='overview' />
                  <Tab sx={{ fontFamily: 'Poppins' }} label='Attractions' value='attractions' />
                  <Tab sx={{ fontFamily: 'Poppins' }} label='Emergency' value='emergency' />
                </TabList>
              </Box>
              <TabPanel value='overview'>
                <CityOverviewInfo city={destination} clicked={clicked} />
              </TabPanel>
              <TabPanel value='attractions'>
                <CityAttractionInfo city={destination} />
              </TabPanel>
              <TabPanel value='emergency'>
                <CityEmergencyNumbersInfo city={destination} />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
    </div>
  );
}