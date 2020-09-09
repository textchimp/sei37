console.log('Loaded!');

// for dat.gui control panel
const controls = {
  circleSize: 70,
  circleOpacity: 255,
  clearScreen: true,
  velocityScale: 1.0,
  edgeMode: 'bounce',
  drawCircles: true,
  distanceThreshold: 200
};

// For storing the circles we draw,
// so we can remember their positions
// between each draw(), and animate them
let circles = [];

// p5 asks you to define 2 main functions:

// setup()  - runs once, at start of sketch
// draw()   - animation loop, runs 60 times/sec

// p5 doesn't let you write "const setup = function(){ ... }"
// You have to use the 'function declaration' style
function setup(){
  createCanvas(windowWidth, windowHeight); // Make the canvas as large as the whole window
  background( 0 );  // use a black background (1 arg = greyscale)

  // use Hue, Saturation, Brightness in the range 0..255
  colorMode( HSB, 255 );

  // stroke( 0, 255, 0 );  // specify the outline colour (green)
  // // strokeWeight(3);
  // // noStroke();
  // // noFill();
  // fill( 255, 0, 0 );    // specify the fill-in (solid shape) colour (red)
  //
  // ellipse(
  //   50, 60,  // x,y position of circle center
  //   80, 80   // width and height
  // );
  //
  // line(
  //   100, 100, // x,y starting point
  //   300, 400  // x,y ending point
  // );
  //
  // fill(0, 100, 100);
  // noStroke();
  //
  // rect(
  //    300, 200, // x,y center
  //    100, 100  // width, height
  // );
  //
  // fill(0, 0, 200);
  //
  // triangle(
  //   400, 200,
  //   300, 400,
  //   500, 700
  // );
  //
  // stroke( 255 );
  // point( 300, 100 );

  const gui = new dat.GUI();
  gui.add( controls, 'circleSize', 20, 500 );
  gui.add( controls, 'circleOpacity', 0, 255 );
  gui.add( controls, 'velocityScale', -2.0, 2.0 );
  gui.add( controls, 'edgeMode', ['bounce', 'wrap'] );
  gui.add( controls, 'distanceThreshold', 0, 600 );
  gui.add( controls, 'drawCircles' );
  gui.add( controls, 'clearScreen' );

} // setup()


// This runs all the time, in a loop!
// Ideally 60 draws per second
function draw(){

  // if( mouseX === 0 && mouseY === 0 ){
  //   return;
  // }

  if( controls.clearScreen ){
    background( 0 );
  }

  // fill(
  //   // random(255), // r
  //   // random(255), // g
  //   // random(255), // b
  //   frameCount % 255,
  //   255,
  //   255,
  //   controls.circleOpacity //200
  // );

  noStroke();

  // noFill();
  // stroke( random(255), random(255), random(255) );

  // Calculate the current mouse velocity:
  // the current position minus the last position
  //  (i.e. the change in position since the
  //  last draw)
  // p5 has variables that store the mouseX and
  // mouseY values from the PREVIOUS draw, to
  // help with this calculation
  const vx = mouseX - pwinMouseX + random([-2, 2]);
  const vy = mouseY - pwinMouseY + random([-2, 2]);


  if( keyIsDown(SHIFT) ){

    // const size =  controls.circleSize; //random(50, 400);
    // ellipse(
    //   mouseX, mouseY,
    //   // random(windowWidth), random(windowHeight),
    //   size, size
    // );

    // Add a circle object to our array,
    // so we can keep track of it
    circles.push({
      x: mouseX,
      y: mouseY,
      vx: vx, // circle
      vy: vy,
      hue: frameCount % 255,
      size: controls.circleSize
    });

  } // if shift is held (create new circle)

  updateCircles();

} // draw()



function updateCircles(){

  // Draw all the circles in the array
  for( let i = 0; i < circles.length; i++ ){
    const c = circles[i];

    // Add the circle's velocity to its
    // position on each redraw
    c.x += c.vx * controls.velocityScale;
    c.y += c.vy * controls.velocityScale;

    drawLinesFrom(c);

    // Check if we need to stop the circle
    // from disappearing off the screen

    if( controls.edgeMode === 'bounce' ){
      if( c.x >= windowWidth || c.x <= 0 ){
        // Reverse the direction! (flip the sign)
        c.vx = c.vx * -1;  // c.vx *= -1;
      }
      if( c.y >= windowHeight || c.y <= 0 ){
        // Reverse the direction! (flip the sign)
        c.vy = c.vy * -1;  // c.vx *= -1;
      }
    } else {
      // wrap
      if( c.x >= windowWidth ){
        c.x = 0;
      } else if( c.x <= 0 ){
        c.x = windowWidth;
      }

      if( c.y >= windowHeight ){
        c.y = 0;
      } else if( c.y <= 0 ){
        c.y = windowHeight;
      }

    } // end of else (wrap mode)


    if( controls.drawCircles ){
      fill( c.hue, 255, 255, controls.circleOpacity );
      ellipse( c.x, c.y, c.size, c.size );
    }

  } // for each circle

} // updateCircles()


// This function is called from updateCircles
// above, from inside the loop where we draw
// every circle.
// i.e. every circle in the 'circles' array
// is being passed into this function, and
// this function loops over all of the 'circles'
// array AGAIN to let us compare the distance
// between each circle and every other circle.
// In other words, to do something with every
// PAIR of items in an array, you need a nested
// loop: complexity is O( N*N ) i.e. quadratic
// - not great!
function drawLinesFrom( circle ){

  for( let i = 0; i < circles.length; i++ ){
    const other = circles[i];

    // calculate the distance between
    // 'circle' and 'other':
    const xDist = circle.x - other.x;
    const yDist = circle.y - other.y;

    const dist = Math.sqrt( xDist*xDist + yDist*yDist );



    if( dist < controls.distanceThreshold ){
      // Draw a line between these circles if they
      // are close enough

      // Make the opacity of the line "inversely proportional" to the
      // distance between the lines; i.e., as the distance gets larger,
      // the opacity gets smaller (the line gets more transparent)
      const opacity = map(
        dist,  // input value
        0, controls.distanceThreshold, // input range
        255, 0 // output range
      );

      stroke(circle.hue, 255, 255, opacity);
      line(
        circle.x, circle.y,
        other.x, other.y
      );
    }

  } // for

} // drawLinesFrom()

// p5 runs this function for us whenever a key
// is pressed
function keyPressed(ev){
  console.log(key);
  if( key === ' '){
    background( 0 );
    circles = [];  // empty the circles array!
    ev.preventDefault();
  }

} // keyPressed()
