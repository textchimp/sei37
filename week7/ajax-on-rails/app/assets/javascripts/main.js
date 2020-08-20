
$(document).ready(function(){

  console.log('ready!');

  $.getJSON('/uptime')
  .done( data => {
    $('#uptime').html( data.output );
  })
  .fail( err  => console.warn(err) );


  $.getJSON('/cpuhog')
  .done( data => {
    $('#hog').html( data.cpuHog );
  })
  .fail( err  => console.warn(err) );


  $.getJSON('/dogs')
  .done( data => {
    // console.log( data );
    data.forEach( dog => {
      $('#dogsList').append(`<li>${ dog.name }</li>`);
    });
  })
  .fail( err  => console.warn(err) );


  $('#findDog').on('click', () => {
    const dogQuery = $('#dogSearch').val();
    const searchURL = `/dogs/search/${ dogQuery }`;
    console.log('searchURL', searchURL);

    $.getJSON( searchURL )
    .done( data => {
      $('#dogSearchResults').empty();
      data.forEach( dog => {

        $('#dogSearchResults').append(`
          <p>
          <strong>Name:</strong> ${ dog.name }<br>
          <strong>Roundness:</strong> ${ dog.roundness }<br>
          </p>
        `);

      }); // forEach
    })
    .fail( err => console.warn(err) );


  });  // Dog search click handler



}); // $(document).ready()
