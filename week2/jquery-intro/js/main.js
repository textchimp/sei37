
// Do a query to retrieve from the DOM the element we want to change
const $billImg = $('img');  // luckily there is only one image on this page

// Calling .attr() with ONE argument mean GET the current value of the
// specified attribute, i.e. 'src'
const imgSrc = $billImg.attr('src');
console.log( imgSrc );

// Calling .attr() with TWO arguments means SET the attribute (the first argument)
// to be this new value (the second argument)
$billImg.attr('src', 'http://www.placekitten.com/400/300');

// Let's the contents of a tag - in this case, the <li id="bestDog">
const $bestDogListItem = $('#bestDog');
// console.log( $bestDogListItem );

// Calling .html() with ONE arguments means SET the innerHTML to be that argument
$bestDogListItem.html('Nookie (as if...yeah right...nice try, Mikaela)');

// Implicit iteration: every tag that matches the query will have its
// HTML contents changed!
$('p').html('HAXXORRREEED!!!1!');
$('p').css('background-color', 'black'); // Censored

// Run a custom loop that does something to each <li> on the page:
// We have to pass .each() a function as its argument
// This function will be run for each <li> element that is found,
// and inside the function we can use '$(this)' to refer to the current
// element (as we loop over all of them)
$('li').each( function(){
  const oldContents = $(this).html();
  $(this).html( oldContents + "...AND SO ON" );
});
