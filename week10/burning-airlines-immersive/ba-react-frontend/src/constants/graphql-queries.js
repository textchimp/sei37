import { gql } from '@apollo/client';

export const FLIGHT_SEARCH = gql`
  query searchFlights( $origin: String!, $destination: String! ){
    flights( origin: $origin, destination: $destination  ){
      _id
      origin
      destination
      flightNumber
      departureDate
      airplane {
        name
      }
    }
  }
`;

export const FLIGHT_DETAILS = gql`
  query getFlight( $id: String! ){
    flight( id: $id ){
      _id
      origin
      destination
      flightNumber
      departureDate
      airplane {
        name
        rows
        cols
      }
      reservations {
        row
        col
      }
    }
  }
`;
