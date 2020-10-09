import React, { useContext } from 'react';

import UserContext from '../context/UserContext';

import { useMutation } from '@apollo/client';
import { RESERVATION_CREATE } from '../constants/graphql-queries';

const ReservationConfirm = (props) => {

  // This context is provided by the top-level App.js
  const {user, setUser} = useContext( UserContext );
  console.log({ user });

  // https://www.apollographql.com/docs/react/data/mutations/
  // GOTCHA: you might need to update the Apollo cache to reflect
  // the new state of the data you just saved to the server;
  // this can happen automatically if an 'id' is provided,
  // otherwise you will need to define an 'update' method as part of
  // the optional second argument to useMutation (an options object)
  // which uses something like 'cache.writeFragment' to manually
  // update the cache. 🙄
  const [ createReservation, result ] = useMutation(RESERVATION_CREATE, {
    onCompleted: props.onReservationCreated, // run this on success
    onError:     (e) => console.log('got error', e)
  });
  // IF YOU DON'T supply an onError handler in the second options arg ^^^,
  // you will get an unhandled exception error that breaks your whole page
  // if anything goes wrong.

  const { data, called, loading: mutationLoading, error: mutationError } = result;
  console.log({ data });

  const confirmReservation = () => {
    console.log('saving reservation', props.seat);

    createReservation({ variables: {
      row: props.seat.row,
      col: props.seat.col,
      flightID: props.flightID
    }});

  }; // confirmReservation()

  // Just for testing the use of a context-provided state setter
  // const updateUser = () => {
  //   setUser({ email: 'abc@alphabet.com', id: '1234' });
  // };

  return (
    <div>
      <h4>Confirm Reservation for {user.email}</h4>
        <span style={{fontSize: '18pt', color: 'green'}}>
          { props.seat.row + 1 } { String.fromCharCode(65 + props.seat.col) }
          { }
        </span>
        <br/>
          { mutationLoading && <p>Loading...</p> }
          { mutationError && <p>Error: { mutationError.message }</p> }
          {
            // Only show the confirm button if the mutation hasn't run yet
            !called &&
            <button onClick={ confirmReservation }>
              Confirm
            </button>
          }
    </div>
  );

};

export default ReservationConfirm;
