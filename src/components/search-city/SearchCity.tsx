import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState, type SyntheticEvent } from 'react';
import citiesData from '../search-city-list/cities.json';
import './SearchCity.css';
import { OutputCity } from './output-city/OutputCity';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { CityOverviewInfo } from './output-city/city-overview/CityOverviewInfo';
import { CityAttractionInfo } from './output-city/city-overview/CityAttractionsInfo';
import { CityEmergencyNumbersInfo } from './output-city/city-overview/CityEmergencyNumbersInfo';

export function SearchCity() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const cities = citiesData.cities;
  const [tabValue, setTabValue] = useState('overview');
  const [showCityInfo, setShowCityInfo] = useState(false);

  const handleOriginChange = (event: any) => {
    setOrigin(event?.target.value)
  };

  const handleDestinationChange = (event: any) => {
    setDestination(event.target.value);
  };

  const handleModeChange = (event: any) => {
    setMode(event.target.value);
  };

  const handleClick = () => {
    setShowOutput(true);
    setShowCityInfo(true);
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
    <div>
      <div className='search-container'>
        <FormControl className='search-select-container' sx={{
          width: 200,
          '&  .MuiSelect-select': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          },
          marginRight: 2
        }}>
          <InputLabel id='origin-select-label'>From...</InputLabel>
          <Select
            className='search-select-item'
            labelId='simple-select-label'
            id='simple-select'
            value={origin}
            label='Select City'
            onChange={handleOriginChange}
          >
            {cities.map((city) => {
              return (
                <MenuItem key={city.cityName} value={city.cityName}>{city.cityName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className='search-select-container'
          sx={{
            width: 200,
            '&  .MuiSelect-select': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            },
            marginRight: 2
          }}
        >
          <InputLabel id='destination-select-label'>To...</InputLabel>
          <Select
            className='search-select-item'
            labelId='simple-select-label'
            id='simple-select'
            value={destination}
            label='Select City'
            onChange={handleDestinationChange}
          >
            {cities.map((city) => (
              <MenuItem key={city.cityName} value={city.cityName}>{city.cityName}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className='search-select-container'
          sx={{
            width: 200,
            '&  .MuiSelect-select': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }
          }}
        >
          <InputLabel id='mode-select-label'>By...</InputLabel>
          <Select
            className='search-select-item'
            labelId='simple-select-label'
            id='simple-select'
            value={mode}
            label='Select Mode'
            onChange={handleModeChange}
          >
            <MenuItem value='foot'>Foot</MenuItem>
            <MenuItem value='car'>Car</MenuItem>
            <MenuItem value='plane'>Plane</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={handleClick}
        >
          Calculate
        </Button>

        <Button
          onClick={handleReset}
        >
          Reset
        </Button>


      </div>

      <div className='result-container'>
        {showOutput && (
          <OutputCity origin={origin} destination={destination} mode={mode} />
        )}
      </div>

      {showCityInfo && (
        <div className='city-info-container'>
          <Box>
            <TabContext value={tabValue}>
              <Box>
                <TabList onChange={handleTabChange}>
                  <Tab label='Overview' value='overview' />
                  <Tab label='Attractions' value='attractions' />
                  <Tab label='Emergency' value='emergency' />
                </TabList>
              </Box>
              <TabPanel value='overview'>
                <CityOverviewInfo city={destination} />
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