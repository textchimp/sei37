import React from 'react';
import logo from './logo.svg';
import './App.css';

import TeethSales from './components/TeethSales';
import Procedures from './components/Procedures';


class App extends React.Component {

  state = {
    currentPage: 'home'
  };


  go = (destination) => {
    console.log('go():', destination);
    this.setState({ currentPage: destination });
  }


  render(){

    let pageContent;

    if( this.state.currentPage === 'procedures' ){
      pageContent = <Procedures />;
    } else if( this.state.currentPage === 'teethsales' ){
      pageContent = <TeethSales />;
    } else {
      // 'home' is the default
      pageContent = <p>I am a good dentist. Let me look in your mouth.</p>;
    }


    return (
      <div>
        <h1>Let me be your dentist. I insist.</h1>
        <hr/>
        <nav>
          <button onClick={ () => this.go('home') }>Home</button>
          <button onClick={ () => this.go('procedures') }>Procedures</button>
          <button onClick={ () => this.go('teethsales') }>Teeth Sales</button>
          <button onClick={ () => this.go('contact') }>Contact Us</button>
        </nav>
        <div>
          { pageContent }
        </div>
        <hr/>
        &copy; 2020 Unsettling Professionals
      </div>
    );
  } // render()

} // class App


export default App;
