<template lang="html">
  <div>
    <h3>Flight Search</h3>

    <label for="">Origin:</label>
    <select v-model="origin">
      <option value="">Please select:</option>
      <option>SYD</option>
      <option>MEL</option>
      <option>SIN</option>
      <option>SFO</option>
    </select>
    &nbsp; &nbsp;
    <label for="">Destination:</label>
    <select v-model="destination">
      <option value="">Please select:</option>
      <option>SYD</option>
      <option>MEL</option>
      <option>SIN</option>
      <option>SFO</option>
    </select>
    &nbsp; &nbsp;
    <button v-on:click="submitSearch">Search Flights</button>

  </div>
</template>

<script>
export default {
  name: 'FlightSearch',

  data(){
    return {
      // Like initialising "state = {...};" in a React class

      // Pre-select the dropdown just for dev
      // TODO: clear for production deploy
      origin: 'SYD',
      destination: 'MEL',
    };
  }, // data()

  methods: {

    submitSearch(){
      console.log('Button pressed!', this);
      // TODO: navigate to a new Vue route
      this.$router.push({
        name: 'SearchResults',
        params: {
          origin: this.origin,
          destination: this.destination
        }
      });

    } // submitSearch()

  } // methods

}
</script>

<style lang="css" scoped>
</style>
