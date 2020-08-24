import React from 'react';

import { Route, Link, HashRouter as Router } from 'react-router-dom';

import Home from './components/Home';
import TeethSales from './components/TeethSales';
import Procedures from './components/Procedures';
import ProcedureSearch from './components/ProcedureSearch';
import ProcedureSearchResults from './components/ProcedureSearchResults';



class App extends React.Component {

  render(){
    return (
      <div>
        <h1>Let me be your dentist. I insist.</h1>
        <hr/>

        <Router>

          <nav>
            <Link to="/">Home</Link> | &nbsp;
            <Link to="/procedures">Procedures</Link> | &nbsp;
            <Link to="/teethshop">Teeth Sales</Link> | &nbsp;
            <Link to="/contactus">Contact Us</Link> | &nbsp;
            <Link to="/proceduresearch">Procedure Search</Link>
          </nav>
          <hr/>

        <br/>

        {
          // Like Rails routes.rb:
          // get '/' => 'pages#home'

          // Whichever route matches will get its component rendered right here:
        }
        <Route exact path="/" component={ Home } />
        <Route exact path="/procedures" component={ Procedures } />
        <Route exact path="/proceduresearch" component={ ProcedureSearch } />
        <Route exact path="/procedures/search/:query" component={ ProcedureSearchResults } />
        <Route exact path="/teethshop" component={ TeethSales } />


        </Router>
        <hr/>
        &copy; 2020 Unsettling Professionals
      </div>
    );
  }

} // class App

export default App;
