
$(document).ready(function(){

  $('#searchText').focus(); // focus the cursor into the search field as soon as the page loads!

  $('#searchForm').on('submit', function(e){

    $('#movieDetails').hide();
    $('#searchResults')
    .html('<p>Loading...</p>')
    .show();

    const query = $('#searchText').val();
    performMovieSearch( query );

    // Stop the form from its default behaviour of submitting,
    // to prevent a page reload
    e.preventDefault();

  }); // on form submit

  $('#movieDetails button').on('click', function(){
    // "Go back" to the last search results
    $('#movieDetails').hide();
    $('#searchResults').show();
  });

  // Attach a single click handler function to all of the result images
  // Use 'event delegation' to attach the click handler to the whole document
  // (which is always available, whereas the image result tags don't exist yet).
  // Then, inside the .on() method, after the event name, we specify the selector
  // that we want jQuery to check when the event happens. BECAUSE THIS CHECKING HAPPENS
  // AT CLICK TIME (not now when the handler is created, before images exist), the
  // effect is that the handler will work for ANY img.result tags, ANYTIME they are
  // added to the page in the future - as happens whenever we do a search.
  $(document).on('click', 'img.result',  function(){
    const movieID = $(this).attr('movieID');
    showMovieDetails( movieID );
  }); // img.result click handler


}); // $(document).ready()

const performMovieSearch = function( queryText ){
  console.log( 'queryText', queryText );

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=${ queryText }`);
  xhr.send();

  xhr.onload = function(){
    // This code runs when we have finished receiving the response to
    // our AJAX request; the response data is available in 'xhr.response'

    // First turn the JSON string into an actual JS object
    const data = JSON.parse( xhr.response );
    console.log( data );

    $('#searchResults').empty(); // Get rid of 'Loading...' message

    // The array of results is: data.results
    for( let i = 0; i < data.results.length; i++ ){

      const movie = data.results[i];

      //console.log( movie.original_title );

      // Add an h3 tag to the DOM for each movie with the title
      //$('#searchResults').append(`<h3>${ movie.original_title }</h3>`);

      const imgURL = `https://image.tmdb.org/t/p/w92${ movie.poster_path }`;
      $('#searchResults').append(`
        <img movieID="${ movie.id }"
        class="result"
        src="${ imgURL }">
      `);

    } // for


  }; // onload callback

}; // performMovieSearch()


const showMovieDetails = function( id ){
  console.log('showMovieDetails(): id=', id);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.themoviedb.org/3/movie/${ id }?api_key=24d863d54c86392e6e1df55b9a328755`)
  xhr.send();

  xhr.onload = function(){
    const data = JSON.parse( xhr.response );
    console.log( data );

    const imgURL = `https://image.tmdb.org/t/p/w500${ data.poster_path }`;

    // Plug in various values into the show 'template'
    $('#movieDetails h3').html( data.original_title );
    $('#movieDetails h5').html( data.tagline );
    $('#movieDetails p').html(  data.overview );
    $('#movieDetails img').attr('src', imgURL);

    $('#searchResults').hide();
    $('#movieDetails').show();
  };

}; // showMovieDetails()
