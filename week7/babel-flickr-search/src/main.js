
const FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';
const FLICKR_API_KEY  = '2f5ac274ecfac5a455f38745704ad084';

$(document).ready(function(){

  $('#searchText').focus(); // kbd focus in form

  $('#searchForm').on('submit', function(ev){

    const query = $('#searchText').val();
    getSearchResults( query );

    ev.preventDefault(); // stop form from submitting
  });

}); // $(document).ready();



const getSearchResults = (queryText) => {
  console.log('getSearchResults():', queryText);

  // Perform AJAX request to Flickr API
  $.getJSON( FLICKR_BASE_URL, {
    method: 'flickr.photos.search',
    api_key: FLICKR_API_KEY,
    text: queryText,
    format: 'json',
    nojsoncallback: 1
  })
  // .done( data => displaySearchResults(data.photos) )
  .done( function( data ){
    displaySearchResults( data.photos );
  })
  .fail( err  => console.warn(err) );

}; // getSearchResults()


const displaySearchResults = (results) => {
  console.log('displaySearchResults():', results);

  // Save a reference to the results div DOM node
  // so we're not querying the DOM in each iteration
  // of the loop (there are 100 iterations!)
  const $results = $('#results');

  // Display each result on the page:
  results.photo.forEach( photo => {
    const thumbnailURL = generatePhotoURL( photo, 's' );
    console.log( thumbnailURL );
    $results.append(`<img src="${ thumbnailURL }"> `);
  });

}; // displaySearchResults()

const generatePhotoURL = (photo, size='q', debug=false) => {
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
};
