console.log('main.js loaded');

// This syntax only works with 'var' due to something called
// "variable hoisting" - google it. "Temporal dead zone" wtf
var app = app || {};

app.controls = {
  rotationSpeed: 0.2,
  bouncingSpeed: 0.05,
  stepSize: 0.01,  // for controlling the sphere bounce size
  step: 0,
  numParticles: 10000,
  particleDistributionRange: 200,
  particleVelocityScale: 0.5
};

app.init = () => {

  console.log('Hello 3D W0rld!');

  app.gui = new dat.GUI();
  app.gui.add( app.controls, 'rotationSpeed', 0, 1 );
  app.gui.add( app.controls, 'bouncingSpeed', 0, 2 );
  app.gui.add( app.controls, 'stepSize', 0, 1 );
  app.gui.add( app.controls, 'particleVelocityScale', -1, 1 );

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
  // app.renderer.shadowMap.enabled = true;
  // app.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // WTF?

  // Attach the renderer's <canvas> tag to the DOM
  document.getElementById('output').appendChild( app.renderer.domElement );

  // Create an "axes helper" to show us reference X,Y,Z arms
  // app.axes = new THREE.AxesHelper( 50 );
  // app.scene.add( app.axes );

  // Let's add a 2D 'plane', i.e. a 'sheet', aka 'The Runway'
  // app.plane = app.createPlane();
  // app.scene.add( app.plane );

  // Let's add a cube! A perfect platonic solid
  app.cubes = [];

  for( let i = 0; i < 3; i++ ){
    const cube = app.createCube();
    app.scene.add( cube );
    app.cubes.push( cube );
  }


  // Let's add a sphere. A ball... a planet, every point on the surface
  // the same distance from the center... our new home
  app.sphere = app.createSphere();
  app.scene.add( app.sphere );

  // Add the particle system
  app.particleSystem = app.createParticleSystem();
  app.scene.add( app.particleSystem );

  // Let there be light!
  app.spotlight = app.createSpotlight();
  app.scene.add( app.spotlight );

  app.ambient = new THREE.AmbientLight( 0x444444 );
  app.scene.add( app.ambient);


  // Control camera position and zoom using the mouse
  app.mouseControls = new THREE.OrbitControls(
    app.camera, app.renderer.domElement
  );

  app.stats = app.addStats();

  app.animate(); // kick off the animation process

}; // app.init()


// setInterval( app.animate, 16 );

app.animate = () => {

  app.cubes.forEach( cube => {
    cube.rotation.x += cube.userData.rotationSpeed * app.controls.rotationSpeed;
    cube.rotation.y += cube.userData.rotationSpeed * app.controls.rotationSpeed;
  });
  // app.cube.rotation.z += app.controls.rotationSpeed;

  app.controls.step += app.controls.stepSize;

  app.sphere.rotation.y += app.controls.rotationSpeed * 0.07;

  // const sphereXOffset = Math.sin( app.controls.step ) * 30;
  // const sphereYOffset = Math.cos( app.controls.step ) * 30;
  // app.sphere.position.x = 20 + sphereXOffset;
  // app.sphere.position.y = 6  + Math.abs( sphereYOffset );

  app.animateParticles();

  app.stats.update();

  // Actually render a frame
  app.renderer.render( app.scene, app.camera );

  // Get the browser animation API to work out how often to run
  // our animate() method - ideally 60 times/sec, and also,
  // only when the tab is visible.
  // i.e. this creates an animation loop
  requestAnimationFrame( app.animate );

}; // app.animate()


app.animateParticles = () => {

  const particles = app.particleSystem.geometry.vertices;

  for( let i = 0; i < particles.length; i++ ){
    const p = particles[i];

    const distSquared = (p.x * p.x) + (p.y * p.y) + (p.z * p.z);

    if( distSquared > 10.0 ){
      // Prevent the stars from getting too much acceleration
      // when they get too close to the center of the earth
      // (otherwise they fly off and never return)

      // Newton yo!
      const gravityForce = -0.2 * (1.0 / distSquared);

      // Apply the force of gravity to the particle's velocity
      p.vx += gravityForce * p.x;
      p.vy += gravityForce * p.y;
      // p.vz += gravityForce * p.z;
    }

    p.x += p.vx * app.controls.particleVelocityScale;
    p.y += p.vy * app.controls.particleVelocityScale;
    p.z += p.vz * app.controls.particleVelocityScale;

    // p.y -= 0.5; // move each particle down every time we draw
    //
    // if( p.y < -100 ){
    //   // warp each star back to the top when it gets too low
    //   p.y = 100;
    // }

  } // for

  app.particleSystem.geometry.verticesNeedUpdate = true;

  // app.particleSystem.rotation.y += app.controls.rotationSpeed;

}; // app.animateParticles()



app.addStats = () => {
  const stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.getElementById("stats").appendChild( stats.domElement );

  return stats;
};


app.onResize = () => {
  // Update THREE.js internals whenever browser window size changes
  app.camera.aspect = window.innerWidth / window.innerHeight;
  app.camera.updateProjectionMatrix();
  app.renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( 'resize', app.onResize );


// Like jQuery $(document).ready() - run our code
// after the DOM is loaded.
// Problem: you can only have one onload function
window.onload = app.init;
