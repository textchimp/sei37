<template lang="html">
<div>
  <h3>Login</h3>

  <div v-if="errorMessage" class="loginError">
    {{ errorMessage }}
  </div>

  <form @submit.prevent="doLogin">
    <label>Email:</label>
    <input type="text" v-model="email">
    <label>Password:</label>
    <input type="password" v-model="password">
    <br>
    <button>Login</button>
  </form>

</div>
</template>

<script>
import axios from 'axios';
const LOGIN_URL = 'http://localhost:1337/login';

export default {
  name: 'Login',
  data(){
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    doLogin(){

      console.log('Login form submitted');

      axios.post(LOGIN_URL, {
        email: this.email,
        password: this.password
      })
      .then( res => {
        console.log('Login response:', res.data);
        this.$emit( 'loginSuccess', res.data.user, res.data.token );

        // Redirect to root route (FlightSearch) on success:
        this.$router.push({ name: 'Search' });
      })
      .catch( err => {
        console.log('Login error:', err);
        if( err.response.status === 401 ){
          this.errorMessage = 'Invalid email and/or password';
        }
      });

    } // doLogin()
  }
}
</script>

<style lang="css" scoped>
  form {
    display: grid;
    max-width: 20vw;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
  }
  form > * {
    margin-top: 10px;
  }
  label {
    text-align: right;
    padding-right: 10px;
  }
</style>
