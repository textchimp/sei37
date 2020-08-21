
import React from 'react';  // require 'react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // require_relative './App'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App greeting="hello!" roundness="5" />
    <App greeting="goodbye!" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
