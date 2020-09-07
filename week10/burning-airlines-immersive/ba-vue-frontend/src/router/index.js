import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import FlightSearch from '@/views/FlightSearch';
import FlightSearchResults from '@/views/FlightSearchResults';


Vue.use(Router)

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
    }

  ]
})
