import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';
import citiesData from '../search-city-list/cities.json';
import './SearchCity.css';
import { OutputCity } from './output-city/OutputCity';

export function SearchCity() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mode, setMode] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const cities = citiesData.cities;

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
    //const html = use(<OutputCity origin={origin} destination={destination} />);
  };

  return (
    <div className='search-container'>
      <FormControl className='search-select-container' fullWidth>
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
              <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl className='search-select-container' fullWidth>
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
            <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl className='search-select-container' fullWidth>
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

      {showOutput && (
        <OutputCity origin={origin} destination={destination} mode={mode} />
      )}
    </div>
  );
}