<template>
  <div class="hello">
    <h1>HelloWord Component</h1>
    <p>
      {{ msg }}
    </p>

    <p v-bind:class="pClass">
      Search:
      <input type="text" v-model="searchText" />
    </p>

  </div>
</template>



<script>
export default {
  name: 'HelloWorld',
  // data: {
  //   msg: 'wtf'
  // },

  // data: function(){
  //
  // },

  data() {
    // This is the 'state' of your Vue component.
    // Because we might make many instances of this
    // component to render on an app's page, we need
    // to make sure each instance gets its own unique
    // version of the state.
    // To do this, data is no longer just an object,
    // it's a function that returns an object. This
    // causes each component to get a unique copy
    // of the state.
    return {
      msg: 'Welcome to Your Vue.js App',
      searchText: '',
      pClass: 'green'
    }
  }
}
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.green {
  background-color: green;
}
.red {
  background-color: red;
  font-weight: bold;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
