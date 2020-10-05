import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const FlightSearch = (props) => {

  const [origin, setOrigin] = useState('SYD');
  const [destination, setDestination] = useState('MEL');
  const history = useHistory();

  const handleClick = () => {
    history.push(`/search/${origin}/${destination}`);
  };

  return (
    <div>
      <label>Origin:</label>
      &nbsp;&nbsp;
      <select onChange={(ev) => setOrigin(ev.target.value)} value={origin} >
        <option>SYD</option>
        <option>MEL</option>
        <option>SIN</option>
        <option>SFO</option>
      </select>
      &nbsp;&nbsp;
      <label>Destination:</label>
      &nbsp;&nbsp;
      <select onChange={(ev) => setDestination(ev.target.value)} value={destination} >
        <option>SYD</option>
        <option>MEL</option>
        <option>SIN</option>
        <option>SFO</option>
      </select>
      &nbsp;&nbsp;
      <button onClick={ handleClick }>Search</button>
    </div>
  );

};

export default FlightSearch;
