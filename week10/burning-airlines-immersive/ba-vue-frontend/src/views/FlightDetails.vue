<template lang="html">
<div>

  <div v-if="flight.id">
    <!--
     The v-if condition will only be true once the flight data
     has loaded into the state called 'flight', i.e. this content
     will only appear after the Ajax request has returned the
     flight data (which includes the id)
     -->
    <h1>Flight {{ flight.flight_number }}</h1>

    <strong>Departure Date:</strong> {{ flight.departure_date_formatted }}
    <br>
    <strong>Origin:</strong> {{ flight.origin }}
    <br>
    <strong>Destination:</strong> {{ flight.destination }}
    <br>
    <strong>Aircraft:</strong> {{ flight.airplane.name }}
    <br>
    <strong>Seats:</strong> {{ flight.airplane.rows * flight.airplane.cols }}

    <div class="seating">

      <!-- loop over rows -->
      <div class="planeRow" v-for="row in flight.airplane.rows">
        {{ row }}
        <div class="planeSeat"
         v-for="col in flight.airplane.cols"
         v-bind:class="seatStatus(row, col)"
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

window.seatLoops = 0;

import axios from 'axios';
const RAILS_FLIGHT_SHOW_BASE_URL = 'http://localhost:3000/flights/';

// TODO: implement a real login system with real authentication
const FAKE_LOGGED_IN_USER_ID = 10;

export default {
  props: ['id'],

  data(){
    return {
      // state goes here
      flight: {}
    };
  },

  created(){
    const url = RAILS_FLIGHT_SHOW_BASE_URL + this.id;
    console.log({ url }); // << "object property notation shorthand", same as { url: url }

    axios.get( url )
    .then( res => {
      console.log('response', res.data);
      this.flight = res.data;  // save the response data into state (for display)
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

      for( let i = 0; i < this.flight.reservations.length; i++ ){
        window.seatLoops++;
        const res = this.flight.reservations[i];
        // Is this a reservation for the current seat we're checking?
        if( res.row === row && res.col === col ){

          if( res.user_id === FAKE_LOGGED_IN_USER_ID ){
            // The seat is booked by the logged-in user
            return 'booked';
          } else {
            return 'occupied';  // someone else
          }

        } // if (reservation is for current seat)
      } // for

      return 'available';

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

</style>
