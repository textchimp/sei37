import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Link } from 'react-router-dom';


const FLIGHT_SEARCH = gql`
  query searchFlights( $origin: String!, $destination: String! ){
    flights( origin: $origin, destination: $destination  ){
      _id
      origin
      destination
      flightNumber
    }
  }
`;

const FlightSearchResults = (props) => {

  // Without needing a useEffect,
  // this query will be re-performed whenever these props change (how?)
  const { loading, error, data } = useQuery(FLIGHT_SEARCH, {
    variables:  {
      origin: props.match.params.origin,
      destination: props.match.params.destination
    }
  });

  if (error) {
    // console.log(error?.networkError?.result?.errors);
    return <h2>ERROR!</h2>
  }

  return (
    <div>

      <h3>
        Flight Results from {props.match.params.origin} to {props.match.params.destination}
        <pre>
          {
            loading
            ?
            <p>Loading...</p>
            :
            data.flights.map( f => (
              <div key={f._id}>
                <Link to={`/flights/${f._id}`}>{ f.flightNumber }</Link>
                <p>Origin: { f.origin }</p>
                <p>Destination: { f.destination }</p>
              </div>
            ))
          }
        </pre>
      </h3>
    </div>
  );

};

export default FlightSearchResults;
