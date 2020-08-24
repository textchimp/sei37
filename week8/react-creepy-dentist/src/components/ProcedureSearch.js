import React from 'react';

// import { Route, Link, HashRouter as Router } from 'react-router-dom';


class ProcedureSearch extends React.Component {

  state = {
    searchQuery: ''
  };

  handleInput = (ev) => {
    this.setState({ searchQuery: ev.target.value });
  }

  handleSubmit = () => {
    console.log('Search submitted:', this.state.searchQuery);
    // How to navigate to new React route in JS?
    // i.e. /procedures/search/THEQUERYHERE
    const path = `/procedures/search/${ this.state.searchQuery }`;
    this.props.history.push( path );

  }

  render(){
    return (
      <div>
        <h2>Search for a Procedure:</h2>
         <input type="text" onChange={ this.handleInput }/>
         <button onClick={ this.handleSubmit }>Search</button>
      </div>
    );
  }

} // class ProcedureSearch


export default ProcedureSearch;
