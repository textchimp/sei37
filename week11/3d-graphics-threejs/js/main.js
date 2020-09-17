console.log('main.js loaded');

// This syntax only works with 'var' due to something called
// "variable hoisting" - google it. "Temporal dead zone" wtf
var app = app || {};

app.controls = {
  rotationSpeed: 0.01,
  bouncingSpeed: 0.05,
  stepSize: 0.01,  // for controlling the sphere bounce size
  step: 0
};

app.init = () => {

  console.log('Hello 3D W0rld!');

  app.gui = new dat.GUI();
  app.gui.add( app.controls, 'rotationSpeed', 0, 1 );
  app.gui.add( app.controls, 'bouncingSpeed', 0, 2 );
  app.gui.add( app.controls, 'stepSize', 0, 1 );

  // The scene stores and keeps track of all the 3D objects we're
  // creating, includes the camera and the light sources
  app.scene = new THREE.Scene();


  app.camera = new THREE.PerspectiveCamera(
    60,  // field of view
    window.innerWidth / window.innerHeight,  // screen aspect ratio
    0.1, // near field: how close to the camera can objects be
    1000 // far field: how far away from the camera can we still see things
  );

  app.camera.position.x = -30;
  app.camera.position.y = 40;
  app.camera.position.z = 30;
  // app.camera.position.set( -30, 40, 30 );

  app.camera.lookAt( app.scene.position ); // Look at origin: x=0, y=0, z=0


  // The renderer calculates how to draw all the objects in the scene,
  // based on the lighting and the camera perspective; it renders
  // it all down to a 2D image to show in a <canvas> tag in the DOM.
  app.renderer = new THREE.WebGLRenderer(); // use hardware acceleration
  app.renderer.setSize( window.innerWidth, window.innerHeight );
  app.renderer.setClearColor( 0x000000 ); // background colour

  // Casting shadows is computationally expensive, thus disabled by default
  app.renderer.shadowMap.enabled = true;
  app.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // WTF?

  // Attach the renderer's <canvas> tag to the DOM
  document.getElementById('output').appendChild( app.renderer.domElement );

  // Create an "axes helper" to show us reference X,Y,Z arms
  app.axes = new THREE.AxesHelper( 50 );
  app.scene.add( app.axes );

  // Let's add a 2D 'plane', i.e. a 'sheet', aka 'The Runway'
  app.plane = app.createPlane();
  app.scene.add( app.plane );

  // Let's add a cube! A perfect platonic solid
  app.cube = app.createCube();
  app.scene.add( app.cube );

  // Let's add a sphere. A ball... a planet, every point on the surface
  // the same distance from the center... our new home
  app.sphere = app.createSphere();
  app.scene.add( app.sphere );

  // Let there be light!
  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  // Control camera position and zoom using the mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera, app.renderer.domElement
  );


  app.animate(); // kick off the animation process

}; // app.init()


// setInterval( app.animate, 16 );

app.animate = () => {

  app.cube.rotation.x += app.controls.rotationSpeed;
  app.cube.rotation.y += app.controls.rotationSpeed;
  // app.cube.rotation.z += app.controls.rotationSpeed;

  app.controls.step += app.controls.stepSize;

  const sphereXOffset = Math.sin( app.controls.step ) * 30;
  const sphereYOffset = Math.cos( app.controls.step ) * 30;
  app.sphere.position.x = 20 + sphereXOffset;
  app.sphere.position.y = 6  + Math.abs( sphereYOffset );

  // Actually render a frame
  app.renderer.render( app.scene, app.camera );

  // Get the browser animation API to work out how often to run
  // our animate() method - ideally 60 times/sec, and also,
  // only when the tab is visible.
  // i.e. this creates an animation loop
  requestAnimationFrame( app.animate );

}; // app.animate()


// Like jQuery $(document).ready() - run our code
// after the DOM is loaded.
// Problem: you can only have one onload function
window.onload = app.init;
