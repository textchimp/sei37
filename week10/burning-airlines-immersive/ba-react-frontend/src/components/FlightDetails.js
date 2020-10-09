import React, { useState, useEffect, createContext } from 'react';

import { useQuery } from '@apollo/client';
import { FLIGHT_DETAILS } from '../constants/graphql-queries';

import './FlightDetails.css';

import ReservationConfirm from './ReservationConfirm';

const FAKE_LOGGED_IN_USER_ID = '5f673b507360b02fdde9b2a4';


const FlightDetails = (props) => {

  const { id } = props.match.params;

  const [reservations, setReservations] = useState( {} );
  const [selectedSeat, setSelectedSeat] = useState( {} );
  const [successMessage, setSuccessMessage] = useState( '' );

  const { loading, error, data, refetch } = useQuery(FLIGHT_DETAILS, { variables: { id } });

  // 'refetch' is a fn we can use to get the data again!
  // https://www.apollographql.com/docs/react/data/queries/#refetching
  // ( could also go with useLazyQuery() )

  useEffect(() => {
    // Setup reservation lookup table
    if( data ){
      const resLookup = {};
      data.flight.reservations.forEach( r => {
        const key = `${r.row}-${r.col}`; // i.e. '10-2'
        resLookup[key] = r.user; //r.user_id;
      });
      setReservations( resLookup );
    }
  }, [data]);

  if( error ){
    return <h2>ERROR!</h2>
  }

  if( loading ){
    return <p>Loading...</p>;
  }

  console.log( data );

  const handleReservationCreated = () => {
    console.log('FlightDetails: CREATED');

    // 1. add new reservation to existing lookup
    const key = `${selectedSeat.row}-${selectedSeat.col}`;
    reservations[key] = FAKE_LOGGED_IN_USER_ID;
    setReservations( reservations );

    // 2. Set success message
    const col = String.fromCharCode(65 + selectedSeat.col);
    setSuccessMessage(`Booking successful for seat ${selectedSeat.row+1}${col}`);

    // 2. Clear existing seat selection
    setSelectedSeat( {} );

  };

  const selectSeat = (row, col) => {

    if( selectedSeat.row === row && selectedSeat.col === col ){
      // de-select
      setSelectedSeat( {} );
      return;
    }
    
    setSelectedSeat({ row, col});

    setSuccessMessage(''); // clear the last booking message if set
    // TODO: use timeout to clear booking message instead?
  };

  const seatStatus = (row, col) => {
    // return Math.random() > 0.5 ? 'booked' : 'occupied';

    // First, check if the current seat is selected as
    // the seat that is about to be booked.
    if( row === selectedSeat.row && col == selectedSeat.col){
      return 'selected';
    }

    const key = `${row}-${col}`;
    const resUser = reservations[key];

    if( resUser !== undefined  ){

      if( resUser === FAKE_LOGGED_IN_USER_ID ){
        return 'booked'; // The seat is booked by the logged-in user
      } else {
        return 'occupied'; // it's reserved by someone else
      }

    } else {
      return 'available'; // The key is not defined, i.e. the seat is free
    }


  }; // seatStatus()


  return (
    <div>
      <h1>Flight Details: { data.flight.flightNumber }</h1>

      {
        ('row' in selectedSeat) &&
          <ReservationConfirm
            seat={ selectedSeat }
            flightID={ id }
            onReservationCreated={ handleReservationCreated }
          />
      }

      {
        successMessage &&
        <div style={{color: 'green'}}>{ successMessage }</div>
      }

      <div className="seating">

      { [...Array(data.flight.airplane.rows)].map( (row, i) => (
        <div className="planeRow" key={ i }>
          <span>{ i + 1 }</span>
          { [...Array(data.flight.airplane.cols)].map( (col, j) => (
            <div
              onClick={ () => selectSeat(i, j) }
              className={ 'planeSeat ' + seatStatus(i,j) }
              key={ j }
            >
              { String.fromCharCode(65 + j) }
            </div>
          )) }
          <span>{ i + 1 }</span>
        </div>
      )) }

    </div>{ /* div.seating */ }

    </div>
  );

};

export default FlightDetails;
