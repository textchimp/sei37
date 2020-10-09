import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';

import UserContext from './context/UserContext';

import FlightSearch from './components/FlightSearch';
import FlightSearchResults from './components/FlightSearchResults';
import FlightDetails from './components/FlightDetails';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Just for friggin errors!
import { ApolloLink } from '@apollo/client';
import { createHttpLink } from '@apollo/client/link/http';
import { onError } from "@apollo/client/link/error";

// https://www.apollographql.com/docs/react/get-started/
//
// Complicated error handling:
// https://www.apollographql.com/docs/link/links/error/
// https://www.apollographql.com/docs/link/links/http/

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `%c[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        'font-size: 12pt'
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorHandler,
    createHttpLink({ uri: 'http://localhost:1337/graphql' })  // must come after onError!
  ]),

  // simpler, instead of the above (but silent errors):  uri: 'http://localhost:1337/graphql',

  cache: new InMemoryCache()
});

const testUser = {
  email: 'one@two', id: 3
}

function App() {

  const [user, setUser] = useState( testUser );

  return (
    <UserContext.Provider value={{user, setUser}}>
     <ApolloProvider client={client}>
       <div className="App">
          <h1>BURNING AIRLINES</h1>
          <nav>
            { user.email }
            {
            /*
            Changing the 'user' state, due to its use in the UserContext above, will cause any child components using it to re-render
            (i.e. ReservationConfirm, rendered by FlightDetails)
            <button onClick={() => setUser({email: 'one@two', id: 3})}>user</button>
            */
            }
          </nav>
          <hr/>
          <Router>
            <div>
              <Route path="/" component={ FlightSearch } />
              <Route exact path="/search/:origin/:destination" component={ FlightSearchResults } />
              <Route exact path="/flights/:id" component={ FlightDetails } />
            </div>
          </Router>
        </div>
      </ApolloProvider>
    </UserContext.Provider>
  );
}

export default App;
