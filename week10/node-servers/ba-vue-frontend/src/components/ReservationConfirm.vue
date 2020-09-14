<template lang="html">
<div>
  <h3>Your Seat Selection:</h3>
  <div class="seat">

    {{ selectedSeat.row }} {{ selectedSeat.col | toSeatLetter }}
    <br>
    <button @click="confirmSeat">Confirm Seat</button>

  </div>
</div>
</template>

<script>

import axios from 'axios';
// const RAILS_RESERVATION_CREATE_URL = 'http://localhost:3000/reservations';
const RAILS_RESERVATION_CREATE_URL = 'http://localhost:1337/reservations';


export default {
  props: ['selectedSeat', 'flightID'],

  methods: {
    confirmSeat(){
      console.log('Seat confirmed!');

      axios.post(RAILS_RESERVATION_CREATE_URL, {
        flight_id: this.flightID,
        row: this.selectedSeat.row,
        col: this.selectedSeat.col
      })
      .then( res => {
        console.log('reservation create response:', res.data);

        // Tell the parent component FlightDetails that the
        // booking was successful (mainly so it can add this
        // new reservation to its lookup table and update
        // the seating diagram accordingly)

        // In Vue, you don't have to pass down a callback function
        // from the parent component to the child, as a prop.
        // All components have a built-in $emit() method that lets
        // them send named events & data up to the parent component.

        this.$emit( 'seatBooked', res.data );


      })
      .catch( err => console.warn(err) );


    } // confirmSeat()
  },

  filters: {
    toSeatLetter( num ){
      return String.fromCharCode( 64 + num );
    }

  },
}
</script>

<style lang="css" scoped>
.seat {
  font-size: 16pt;
  font-weight: bold;
  /* border: 1px solid grey; */
}
</style>
