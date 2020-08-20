
console.log('Hello Vue!');

Vue.component('dog-info', {
  props: [ 'roundness', 'title' ],
  template: `
    <div>
      <h4 v-on:click="incrementAge">{{ title }}</h4>
      Roundness: {{ roundness }}
      <br>
      Age: {{ age }}
      <hr/>
    </div>
  `,
  data: function(){
    return {
      name: '',
      age: 0
    };
  },
  methods: {
    incrementAge: function(){
      this.age++;
    }
  }
}); // dog-info component



const myApp = new Vue({

  // Where does this app live in the DOM?
  // (Where to 'attach' the Vue app)
  el: '#app',

  // What is the 'state' for this app?
  // I.e. what are the combination of variables
  // that change as a user interacts with your app
  data: {
    message: 'Hello Vuorld!',
    loadTime: 'You loaded this page on ' + new Date().toLocaleString(),
    watevz: true,
    errorStatus: 'allgood',
    todoList: [
      { text: 'Learn Vue' },
      { text: 'Finish homework' },
      { text: 'Relax' }
    ]
  },

  methods: {
    reverseMessage: function(){
      this.message = Math.random();
    },
    changeStatus: function(){
      this.todoList.pop();
      // this.errorStatus = 'error';
      // if( this.errorStatus === 'allgood' ){
      //   this.errorStatus = 'error';
      // } else {
      //   this.errorStatus = 'allgood';
      // }
    } // changeStatus
  },

}); // new Vue()
