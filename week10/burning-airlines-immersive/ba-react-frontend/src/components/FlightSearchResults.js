import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import './FlightSearchResults.css';

import { FLIGHT_SEARCH } from '../constants/graphql-queries';

const FlightSearchResults = (props) => {

  // Without needing a useEffect,
  // this query will be re-performed whenever these props change (how?)
  const { loading, error, data } = useQuery(FLIGHT_SEARCH, {
    variables:  {
      origin: props.match.params.origin,
      destination: props.match.params.destination
    }
  });

  if( error ){
    // console.log(error?.networkError?.result?.errors);
    return <h2>ERROR!</h2>
  }

  if( loading ){
    return <p>Loading...</p>;
  }

  console.log({ data });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString()
      + ' '
      + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div>

      <h3>
        Flight Results from {props.match.params.origin} to {props.match.params.destination}
      </h3>
        <div className="container header">
          <div>Departure Date</div>
          <div>Flight Number</div>
          <div>Plane</div>
          <div>Origin</div>
          <div>Destination</div>
        </div>
        {
          data.flights.map( flight => (
            <Link to={`/flights/${flight._id}`} style={{ textDecoration: 'none'}} key={flight._id}>
              <div className="container result" >
                <div>{ formatDate(flight.departureDate) }</div>
                <div>{ flight.flightNumber }</div>
                <div>{ flight.airplane.name  }</div>
                <div>{ flight.origin }</div>
                <div>{ flight.destination }</div>
              </div>
            </Link>
          ))
        }
    </div>
  );

};

export default FlightSearchResults;
