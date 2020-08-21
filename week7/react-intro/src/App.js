import React from 'react';
import './App.css';

import HelloUser from './HelloUser';

// const App = function() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. HAAAAAACKED!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// };

// 'extends' is like ruby '<'
// class User < ActiveRecord

class App extends React.Component{

  // Every component class must define at minimum
  // a render() method, which must return some JSX

  render(){
    return (
      <div>
        <h1>Hello to React: { this.props.greeting }</h1>
        <p>This is my component. Hear me roar.</p>

        <HelloUser name="Danny" imgWidth="300" imgHeight="100" />
        <HelloUser name="Swaroop" imgWidth="100" imgHeight="200"/>

      </div>
    );
  } // render()

}; // class App

// const App = function( props ){
//
//   // console.log('props:', props);
//
//   return (
//     <div>
//       <h1>Hello React: { props.greeting }</h1>
//       <p>This is my app component.</p>
//     </div>
//   );
// };

export default App;
