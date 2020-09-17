import React from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';
import Profile from './components/Profile';

const Routes = (
  <Router>
    <div>
      {
        // If we create a route WITHOUT the 'exact' attribute,
        // and we say path="/", then that component will appear
        // on EVERY route, since every path includes a "/" somewhere
      }
      <Route path="/" component={ Search } />
      <Route exact path="/" component={ Home } />
      <Route exact path="/profile/:user" component={ Profile } />

    </div>
  </Router>
);

export default Routes;
