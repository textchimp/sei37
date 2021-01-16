import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import FlightSearch from '@/views/FlightSearch';
import FlightSearchResults from '@/views/FlightSearchResults';
import FlightDetails from '@/views/FlightDetails';

// Bug in vue-test-utils automatically loads router - need to disable for testing
// so we can mock it!
if (!process || process.env.NODE_ENV !== 'testing') {
  Vue.use(Router)
}

export default new Router({
  routes: [

    // React equivalent:
    // <Route exact path="/" component={ FlightSearch } />
    {
      path: '/',
      name: 'Search',  // Like a Rails path helper
      component: FlightSearch
    },

    {
      path: '/search/:origin/:destination',
      name: 'SearchResults',
      component: FlightSearchResults,
      props: true,
      // ^ Make the URL params available to the
      // component as props
      // So we don't have to say:
      //    this.$route.params.origin
      // instead we can just say:
      //    this.origin
    },

    // Flight Show route: /flights/:id
    {
      path: '/flights/:id',
      name: 'FlightShow',
      component: FlightDetails,
      props: true   // gives us 'this.id' inside component
    }

  ]
})
