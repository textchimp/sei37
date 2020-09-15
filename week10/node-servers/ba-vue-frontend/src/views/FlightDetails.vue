<template lang="html">
<div>

  <div v-if="flight._id">
    <!--
     The v-if condition will only be true once the flight data
     has loaded into the state called 'flight', i.e. this content
     will only appear after the Ajax request has returned the
     flight data (which includes the id)
     -->
    <h1>Flight {{ flight.flight_number }}</h1>

    <strong>Departure Date:</strong> {{ flight.departure_date }}
    <br>
    <strong>Origin:</strong> {{ flight.origin }}
    <br>
    <strong>Destination:</strong> {{ flight.destination }}
    <br>
    <strong>Aircraft:</strong> {{ flight.airplane.name }}
    <br>
    <strong>Seats:</strong> {{ flight.airplane.rows * flight.airplane.cols }}

    <div v-if="bookedSeat.row && bookedSeat.col" class="bookedMessage">
      Congratulations! You have successfully booked seat
      {{ bookedSeat.row }}
      {{ bookedSeat.col | toSeatLetter }}
    </div>

    <ReservationConfirm
      v-if="seat.row && seat.col"
      :selectedSeat="seat"
      :flightID="flight._id"
      v-on:seatBooked="updateReservations"
    />
    <!-- ^^ We are listening for 'seatBooked' events being
         emitted by this child component, i.e when it runs:
           this.$emit( 'seatBooked', someData );
         The handler 'updateReservations' has to be defined
         in the methods for this parent component FlightDetails,
         and it has to expect arguments, if the child is passing
         any
    -->

    <div class="seating">

      <!-- loop over rows -->
      <div class="planeRow" v-for="row in flight.airplane.rows">
        {{ row }}
        <div class="planeSeat"
         v-for="col in flight.airplane.cols"
         :class="seatStatus(row, col)"
         @click="selectSeat(row, col)"
        >
          {{ col | toSeatLetter }}
        </div>
        {{ row }}
      </div>

    </div><!-- div.seating -->

  </div><!-- v-if="flight.id" -->
  <div v-else>
    <p>Loading flight details...</p>
  </div>



</div>
</template>

<script>

import ReservationConfirm from '@/components/ReservationConfirm';

window.seatLoops = 0;

import axios from 'axios';
// const RAILS_FLIGHT_SHOW_BASE_URL = 'http://localhost:3000/flights/';

// Express version of the URL
const RAILS_FLIGHT_SHOW_BASE_URL = 'http://localhost:1337/flights/';


// TODO: implement a real login system with real authentication
const FAKE_LOGGED_IN_USER_ID = 10;

export default {
  props: ['id', 'currentUser'],
  components: {
    // The current component needs you to 'register'
    // any child components it is going to use:
    ReservationConfirm
  },
  data(){
    return {
      // state goes here
      flight: {},
      reservationsLookup: {},
      seat: {
        // For keeping track of the user's selected seat,
        // before confirmation
        row: null,
        col: null
      },
      bookedSeat: {
        // For showing a "booking successful" message
        row: null,
        col: null
      }
    };
  },

  created(){
    const url = RAILS_FLIGHT_SHOW_BASE_URL + this.id;
    console.log({ url }); // << "object property notation shorthand", same as { url: url }

    axios.get( url )
    .then( res => {
      console.log('response', res.data);
      this.flight = res.data;  // save the response data into state (for display)

      // Build the reservations lookup table:
      // loop through the reservations array,
      // and construct an object where each key
      // is the combo of row+col, and the value
      // is the user ID for the reservation
      res.data.reservations.forEach( r => {
        const key = `${r.row}-${r.col}`; // i.e. '10-2'
        this.reservationsLookup[key] = r.user_id;
      }); // forEach


    })
    .catch( err => console.warn(err) );

  }, // created()

  filters: {

    // Filters are like Rails template helper functions; they only
    // work in template tags and there's a special syntax for using
    // them: "{{ col | toSeatLetter  }}"
    toSeatLetter( num ){
      return String.fromCharCode( 64 + num );
    }

  },

  methods: {

    updateReservations( reservation ){

      console.log('updateReservations()', reservation);

      // Update the reservationsLookup to include our new booking
      const key = `${reservation.row}-${reservation.col}`; // i.e. '10-2'

      // NOPE! Vue does not notice new keys added to
      // state objects. You must use this.$set() to do this.
      // ...kind of like React's "this.setState()"
      // this.reservationsLookup[key] = reservation.user_id;
      this.$set( this.reservationsLookup, key, reservation.user_id );

      // De-select the selected seat, since it's now booked by us.
      // This also hides the ReservationConfirm component again
      this.seat = { row: null, col: null };

      // Set this bit of state to display a "booking successful"
      // message
      this.bookedSeat = { row: reservation.row, col: reservation.col };

    }, // updateReservations(),


    selectSeat(row, col){

      console.log('selectSeat()', row, col);

      // De-select the seat if it is already the selected seat
      if( row === this.seat.row && col === this.seat.col ){
        row = null;
        col = null;
      }

      this.seat = { row, col }; // save the selection into state

      // Stop "booking successful" message from appearing once
      // the user starts selecting new seats for the next booking
      this.bookedSeat = { row: null, col: null };

    }, // selectSeat()

    seatStatus(row, col){

      // 1. Loop through all the reservations for this flight
      // 2. Check if the current reservation's row & col matches
      //    the current function args row & col (i.e. the current seat
      //    that is being checked)
      //    2a. if they match, this seat's class is 'occupied'
      //    2b. if they don't match... keep checking until the end
      // 3. If no seats have matched by the end, the seat is unoccupied, ''


      // Homework: Use an object to do a quick lookup of a seat status,
      // instead of looping, i.e. status = reservations[`${row}-${col}`]

      // i.e. get Rails to create a HASH of reservations, from the array, and
      // render that as part of the json response

      // for( let i = 0; i < this.flight.reservations.length; i++ ){
      //   window.seatLoops++;
      //   const res = this.flight.reservations[i];
      //   // Is this a reservation for the current seat we're checking?
      //   if( res.row === row && res.col === col ){
      //
      //     if( res.user_id === FAKE_LOGGED_IN_USER_ID ){
      //       // The seat is booked by the logged-in user
      //       return 'booked';
      //     } else {
      //       return 'occupied';  // someone else
      //     }
      //
      //   } // if (reservation is for current seat)
      // } // for

      window.seatLoops++;

      // First, check if the current seat is selected as
      // the seat that is about to be booked.
      if( row === this.seat.row && col == this.seat.col){
        return 'selected';
      }


      // NO NESTED LOOPING!
      // To check whether a seat is reserved, look up
      // its row-col as a key of the reservationsLookup
      // hash.
      const key = `${row}-${col}`;
      const resUser = this.reservationsLookup[key];

      if( resUser !== undefined  ){

        if( resUser === FAKE_LOGGED_IN_USER_ID ){
          // The seat is booked by the logged-in user
          return 'booked';
        } else {
          // it's reserved by someone else
          return 'occupied';
        }

      } else {
        // The key is not defined, i.e. the seat is free
        return 'available';
      }


      // using ES6 .some()
      // const found = this.flight.reservations.some( r => r.row === row && r.col === col );
      // return found ? 'occupied' : 'available';

    } // seatStatus()

  } // methods()

}
</script>

<style lang="css" scoped>

.seating {
  margin-top: 30px;
}

.planeSeat {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 4px;
  border: 1px solid #CCCCCC;
  border-radius: 20% 20% 0 0;
  cursor: pointer;
}

/* this is the class for seats which are reserved by the logged-in user */
.booked {
  background-color: orange;
  pointer-events: none;
}

/* this class is for seats reserved by someone else */
.occupied {
  background-color: grey;
  pointer-events: none; /* ignore clicks on occupied seats! can't reserve */
}

.selected {
  background-color: rgb(100, 255, 37);
  border: 1px solid green !important;
}

.bookedMessage {
  padding-top: 20px;
  font-weight: bold;
  color: green;
}

</style>
