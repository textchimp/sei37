console.log('main-lib.js loaded');

var app = app || {};

app.createPlane = () => {

  // Create our first 3D object!
  // Objects are made of two parts:
  // - geometry, i.e. its shape
  // - material, i.e. texture, i.e what is it covered in, how does it
  //   reflect light, what does it look like?
  // These two parts are combined into a final 'mesh'
  const planeGeometry = new THREE.PlaneGeometry( 120, 20 );
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xCCCCCC
  });

  // Combine the geometry and the material into a mesh:
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );

  plane.position.set( 15, 0, 0 );
  plane.rotation.x = -0.5 * Math.PI;  // because of maths
  // plane.receiveShadow = true;  // shadows are cast onto this

  return plane;

}; // app.createPlane()


app.createSpotlight = () => {

  const light = new THREE.SpotLight( 0xFFFFFF );
  light.position.set( -10, 60, 10 );
  // light.castShadow = true;
  // light.shadow.mapSize.width = 2048;
  // light.shadow.mapSize.height = 2048;

  return light;

}; // app.createSpotlight()

app.createCube = () => {

  const cubeGeometry = new THREE.BoxGeometry(
    4, 4, 4
    // THREE.Math.randInt(4, 200),
    // THREE.Math.randInt(4, 8),
    // THREE.Math.randInt(4, 20)
  );

  const cubeMaterial = new THREE.MeshLambertMaterial({
    // color: 0xFF8F00,
    // wireframe: true
  });

  const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  const range = 10;
  cube.position.set(
    THREE.Math.randInt(-range, range),
    THREE.Math.randInt(-range, range),
    THREE.Math.randInt(-range, range)
    // -4, 15, 0
  );

  // cube.rotation.x = Math.random();
  // cube.rotation.y = Math.random();

  cube.userData.rotationSpeed = Math.random() * 0.05;

  cube.material.color.setHSL(
    Math.random(),
    1.0,
    0.5
  );

  // cube.castShadow = true;

  return cube;

}; // app.createCube()


app.createSphere = () => {

  const sphereGeometry = new THREE.SphereGeometry(
    30, // radius
    40, // number of triangle segments on the X axis,
    40 // number of triangle segments on the Y axis
  );

  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture('img/earth.jpg'),
    side: THREE.DoubleSide
    // wireframe: true
  });

  const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  sphere.position.set( 0, 0, 0 );
  // sphere.castShadow = true;

  return sphere;

}; // app.createSphere()


app.createParticleSystem = () => {

  const particles = new THREE.Geometry();
  const distrib = app.controls.particleDistributionRange;

  // Create the individual points (particles) of this geometry
  for( let i = 0; i < app.controls.numParticles; i++ ){

    // Create a particle and give it a random position
    const p = new THREE.Vector3(
      THREE.Math.randInt(-distrib, distrib), // x
      120,  // THREE.Math.randInt(-distrib, distrib), // y
      THREE.Math.randInt(-distrib, distrib)  // z
    );

    p.vx = 0; //THREE.Math.randFloat(-1, 1);
    p.vy = 0; //THREE.Math.randFloat(-1, 1);
    p.vz = 0; //THREE.Math.randFloat(-1, 1);

    particles.vertices.push( p );

  } // for

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 20,
    map:  THREE.ImageUtils.loadTexture('img/snowflake.png'),
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.5
  });

  const particleSystem = new THREE.Points(
    particles, // the geometry
    particleMaterial // the image used to show each particle
  );

  return particleSystem;

}; // app.createParticleSystem()
