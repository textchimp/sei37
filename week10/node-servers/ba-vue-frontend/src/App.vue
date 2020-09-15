<template>
  <div id="app">
    <h1>BUUUURRRNNNIIIINNNG AIIIIRRRLIIIINNNEESSS</h1>
    <nav>

      <span v-if="currentUser._id">
        Hello, {{ currentUser.name }}
        |
        <a @onclick.prevent="doLogout" href="">Logout</a>
      </span>
      <span v-else>
        <router-link to="/login">Login</router-link>
      </span>

      |
      <router-link :to="{ name: 'Search', params: {} }">Search</router-link>
    </nav>
    <hr/>

    <router-view
     @loginSuccess="onLoginSuccess"
     :currentUser="currentUser"
    />

  </div>
</template>

<script>

// Just need to do this to set the default
// authorization header
import axios from 'axios';

export default {
  name: 'App',
  data(){
    return {
      currentUser: {}
    };
  },
  methods: {
    onLoginSuccess(user, token){
      console.log('App.vue:onLoginSuccess()', user, token);
      this.currentUser = user;

      // All future axios requests (until a page reload) will now
      // automatically include the token in the Authorization header
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Install this, create a new project with it, and look at the concern-separated structure it suggests:
      // npm install -g express-generator

      // Look into 'Vuex' global store package:
      // npm install vuex
      // read 'Getting Started' docs: https://vuex.vuejs.org/guide/

      // App.js
      // TODO: store token into localStorage and use
      // created() Vue lifecycle method to check for token
      // in localStorage, set axios header with it, and also
      // make some kind of GET /getUser request to the backend
      // to get the current user object
      // .... look up how to decode a JWT token in the frontend,
      // since it already contains the user object?

    } // onLoginSuccess

  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
