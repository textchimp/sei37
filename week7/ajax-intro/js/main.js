// let globalData;

$(document).ready(function(){

  // This code runs only after DOM
  // has loaded.

  $('#lookupNumber').on('click', function(){
    // This code runs when the button is clicked
    const query = $('#numberQuery').val();
    console.log('Search clicked!', query);

    // XMLHttpRequest
    // AJAX: Asynchronous Javascript and XML
    // XML: eXtensible Markup Language
    //      structured data exchange format
    //      for networking
    // JSON: JS Object Notation

    const xhr = new XMLHttpRequest();

    // This is the ancient way of defining a callback function in JS:
    // Set some '.on____' property of a library object to be a function,
    // which it will run for you in response to the relevant event triggering.
    // xhr.onreadystatechange = function(){
    //   // console.log('Ready state changed: ', xhr.readyState);
    //   if( xhr.readyState === 4 ){
    //     console.log('Response: ', xhr.response );
    //   }
    //
    // };

    xhr.onload = function(){
      // turn the JSON string of the response into structured data:
      const data = JSON.parse( xhr.response );
      debugger;
      console.log('Response: ', data );
      // globalData = data;
      $('#results').append(`<p>${ data.results[0] }</p>`);

    };

    // const url = `http://numbersapi.com/${query}/trivia?json`;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=${query}`;

    xhr.open('GET', url);
    xhr.send();


  }); // button handler



}); // $(document).ready()
