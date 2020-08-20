'use strict';

var FLICKR_BASE_URL = 'https://api.flickr.com/services/rest';
var FLICKR_API_KEY = '2f5ac274ecfac5a455f38745704ad084';

$(document).ready(function () {

  $('#searchText').focus(); // kbd focus in form

  $('#searchForm').on('submit', function (ev) {

    var query = $('#searchText').val();
    getSearchResults(query);

    ev.preventDefault(); // stop form from submitting
  });
}); // $(document).ready();


var getSearchResults = function getSearchResults(queryText) {
  console.log('getSearchResults():', queryText);

  // Perform AJAX request to Flickr API
  $.getJSON(FLICKR_BASE_URL, {
    method: 'flickr.photos.search',
    api_key: FLICKR_API_KEY,
    text: queryText,
    format: 'json',
    nojsoncallback: 1
  })
  // .done( data => displaySearchResults(data.photos) )
  .done(function (data) {
    displaySearchResults(data.photos);
  }).fail(function (err) {
    return console.warn(err);
  });
}; // getSearchResults()


var displaySearchResults = function displaySearchResults(results) {
  console.log('displaySearchResults():', results);

  // Save a reference to the results div DOM node
  // so we're not querying the DOM in each iteration
  // of the loop (there are 100 iterations!)
  var $results = $('#results');

  // Display each result on the page:
  results.photo.forEach(function (photo) {
    var thumbnailURL = generatePhotoURL(photo, 's');
    console.log(thumbnailURL);
    $results.append('<img src="' + thumbnailURL + '"> ');
  });
}; // displaySearchResults()

var generatePhotoURL = function generatePhotoURL(photo) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'q';
  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
};