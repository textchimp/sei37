<template>
  <div id="app">
    <h1>BUUUURRRNNNIIIINNNG AIIIIRRRLIIIINNNEESSS</h1>
    <nav>
      <router-link to="/login">Login</router-link>
      |
      <router-link :to="{ name: 'Search', params: {} }">Search</router-link>
    </nav>
    <hr/>

    <router-view />

  </div>
</template>

<script>
export default {
  name: 'App'
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
