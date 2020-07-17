
console.log('Paintr!');

/*
Paintr!

1. When the user moves the mouse around,
2. draw a coloured circle at the mouse position

    2a: get the mouse position
    2b: create a <div> and add it to the DOM at the given mouse position

*/

let hue = 0;  // runs once at the start
let lastX = 0;  // remember the mouse xPos from the *last* time drawBlob() was called

// This function is called by the mousemove event handler code at the bottom of the file
const drawBlob = function(xPos, yPos){

  const xVelocity = xPos - lastX;  // velocity is difference in position over time

  lastX = xPos; // update lastX so it contains the correct previous value of xPos for next time

  const blobSize = Math.abs( xVelocity ) * 1.5; // chop off any minus signs and scale up a bit

  const blobColor = `hsla( ${hue}, 100%, 50%, 40% )`;  // HSL colour space!

  hue = hue + 10;  // keep growing hue (CSS will interally wrap it at 360)

  // 2b: Create a new div.blob and place it on the DOM at the mouse position
  const $blob = $('<div class="blob">'); // detached!

  // Set the position and colour etc using .css()
  $blob.css({
    top:  yPos - (blobSize/2) + 'px', // how far from the top?
    left: xPos - (blobSize/2) + 'px', // how far from the left?

    width:  blobSize + 'px',
    height: blobSize + 'px',

    backgroundColor: blobColor,
  });

  // Add the new div to the page
  $('body').append( $blob );

  // Animate it!
  $blob.animate(
    // which properties to animate
    {
    top: window.innerHeight + 'px',
    left: -blobSize + 'px'
  },
  // How long it will take:
  1000,
  // What to do when it's finished:
  function(){
    // Get rid of the now-invisible blob div
    $(this).remove();
  }); // end of .animate()

}; // end drawBlob()


// Wait for the DOM
$(document).ready(function(){

  console.log('DOM ready!');

  // Respond to mouse movement by running a callback function:
  $(document).on('mousemove', function( ev ){

    // Only draw blobs when the shift key is held during this mouse move event
    if( ev.shiftKey ){
      // Actually draw the blob at the mouse position
      drawBlob( ev.clientX, ev.clientY );
    }

  }); // on mousemove

}); // $(document).ready()
