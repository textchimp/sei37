import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { FLIGHT_DETAILS } from '../constants/graphql-queries';


const FlightDetails = (props) => {

  const { id } = props.match.params;

  const { loading, error, data } = useQuery(FLIGHT_DETAILS, { variables: { id } });

  if( error ){
    return <h2>ERROR!</h2>
  }

  if( loading ){
    return <p>Loading...</p>;
  }

  console.log( data );

  // const [destination, setDestination] = useState('MEL');
  // const history = useHistory();

  // const handleClick = () => {
  //   history.push(`/search/${origin}/${destination}`);
  // };

  return (
    <div>
      <h1>Flight Details: { data.flight.flightNumber }</h1>
    </div>
  );

};

export default FlightDetails;
