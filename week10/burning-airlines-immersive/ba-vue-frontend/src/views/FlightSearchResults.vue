<template>
  <div>
    <h3>
      Flight Search Results for
      {{ origin }} to {{ destination }}
    </h3>

    <div class="container header">
      <div>Departure Date</div>
      <div>Flight Number</div>
      <div>Plane</div>
      <div>Origin</div>
      <div>Destination</div>
    </div>

    <!--
    v-for is like a Ruby each loop:
    flights.each do |flight|
      puts flight.flight_number
    end
    -->
    <div
      v-for="flight in flights"
      v-on:click="gotoFlightDetails(flight.id)"
      class="container result"
     >

      <div>{{ flight.departure_date_formatted }}</div>
      <div>{{ flight.flight_number }}</div>
      <div>{{ flight.airplane.name  }}</div>
      <div>{{ flight.origin }}</div>
      <div>{{ flight.destination }}</div>
    </div>

  </div>
</template>


<script>

import axios from 'axios';
const RAILS_FLIGHT_SEARCH_BASE_URL = 'http://localhost:3000/flights/search';

export default {
  props: ['origin', 'destination'],
  //       ^ these happen to come from the router;
  // all props need to be declared in Vue -
  // once declared, they can be found directly on the
  // instance, i.e. 'this.origin'
  data(){
    return {
      flights: []   // for storing the search results from the Rails Ajax call
    };
  }, // data()

  // Vue lifecycle method: if this is defined, it will be run
  // when the component is added to the page (like React's
  // 'componentDidMount' )
  created(){

    console.log('FlightSearchResults mounted!');
    const url = `${RAILS_FLIGHT_SEARCH_BASE_URL}/${ this.origin }/${ this.destination }`;

    axios.get(url)
    .then(  res => {
      console.log('data', res.data);
      this.flights = res.data;  // save the results into state
    })
    .catch( err => console.warn(err) );

  }, // created()

  methods: {

    gotoFlightDetails( flightID ){
      console.log('flight result clicked:', flightID);
      // TODO: navigate to the FlightsShow component/route
      //   1. create that route in router/index.js
      //   2. use .push, pass the flightID in as a param
      //   (see navigation from FlightSearch to FlightSearchResults as an example)
    }

  } // methods()


}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  padding-top: 8px;
  padding-bottom: 8px;
}

.header {
  background-color: rgb(30, 28, 101);
  color: white;
  font-weight: bold;
}

.result {
  cursor: pointer;
}

.result:hover{
  background-color: #EEEEEE;
  font-weight: bold;
}

</style>
