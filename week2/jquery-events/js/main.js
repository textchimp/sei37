
console.log('jQuery events');


$(document).ready( function(){


  // Do something whenever the user clicks on the top kitty image, <img id="kitty">
  // $('#kitty').click( fn ); <-- shortcut convenience method
  $('#kitty').on( 'click', function(){
    // This code will run whenever the #kitty element is clicked
    // The function will re-run EACH click
    console.log('Kitty clicked!');
  });

  // Mousedown?
  $('#kitty').on('mousedown', function(){
    console.log('mouse DOWN');
  });

  // Do something whenever the mouse moves over the list of kitties: <ol>
  $('ol').on( 'mousemove', function( ev ){
    console.log('mouse moved!');
    console.log(`mouse position: x=${ ev.offsetX }, y=${ ev.offsetY }`);
  });

  // Do something whenever the mouse enters the <ol> container, and
  // something else when the mouse leaves
  $('ol').hover(
    function(){
      console.log('mouse entered area');
    },
    function(){
      console.log('mouse left area');
    }
  );


  // Do something whenever a user starts pressing a key in the form input
  $('input[type="text"]').on( 'keydown', function( ev ){
    console.log('Key typed in form!');
    console.log('event object:', ev);

    // Get the current text contents (i.e. what has been typed overall)
    // for the form input element to which this key event is happening
    const inputContents = $(this).val(); // get the value of the input
    console.log('input value:', inputContents);

    // const upperCasedLetter = ev.key.toUpperCase();
    // $(this).val( inputContents + upperCasedLetter );
    // ev.preventDefault();

    const upperCased = inputContents.toUpperCase();
    $(this).val( inputContents.toUpperCase() );

  });



  $('input[type="text"]').on( 'keyup', function(){
    console.log('Key RELEASED!');
  });

  // Do something when this input element is focused
  $('input[type="text"]').on( 'focus', function(){
    console.log('input FOCUSED');
  });

  $('input[type="text"]').on( 'blur', function(){
    console.log('input BLURRED');
  });

  // Do something whenever the user scrolls anywhere in the window
  $(window).on('scroll', function(){
    console.log('window SCROLLED!');
  });

  // Do the same thing whenever ANY of <li> tags on the page are clicked
  // It looks the same as any other event listener code, because of
  // jQuery's "implicit iteration" - our callback will be attached to
  // ALL of the elements that match our selector
  // BUT: how then do we find out which SPEFICIC <li> this particular
  // event happened to?
  $('li').on('click', function( ev ){
    console.log('list item clicked');
    // console.log('target:', ev.target); // <--- vanilla DOM node!

    // #1
    // Change the contents of the element that was clicked for this event
    $(ev.target).html('i was clicked');

    // #2
    // jQuery also uses 'this' to store the target element - but note it's
    // still a vanilla DOM node, so needs to be passed to $() to become jQuery-compatible
    $(this).html('i was clicked');

  });

  // Attach a click handler function to EVERY element on the page at the same time
  $('*').on('click', function( ev ){
    console.log('click target:', ev.currentTarget);
    ev.stopPropagation(); // prevent this event from "bubbling up the DOM tree"
  });


  // Toggle the kitties!
  $('#toggle').on('click', function(){
    $('.triple-kitty1').toggle();
  });

  // Fade the middle kitty in and out
  $('#fade').on('click', function(){
    $('.triple-kitty2').fadeToggle(2000);
  });

  // Show the hidden kitty
  $('#show h2').on('click', function(){
    $('.triple-kitty3').show();
  });



}); // end of $(document).ready()
