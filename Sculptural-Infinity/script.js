// This artwork is inspired by (and adapted from) the artist @farisk on CodePen. You can find more about Faris here: https://codepen.io/farisk

var renderer = new THREE.WebGLRenderer({ canvas : document.getElementById('canvas'), antialias:true});
// default bg canvas color //
renderer.setClearColor('black');
//  use device aspect ratio //
renderer.setPixelRatio(window.devicePixelRatio);
// set size of canvas within window //
renderer.setSize(window.innerWidth, window.innerHeight);




var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;


var sphere_geometry = new THREE.SphereGeometry(1000, 10, 10);
var material = new THREE.MeshNormalMaterial();

var sphere = new THREE.Mesh(sphere_geometry, material);
scene.add(sphere);


var update = function() {

  // change '0.003' for more aggressive animation
  var time = performance.now() * 0.0002;
  //console.log(time)

  //go through vertices here and reposition them
  
  // change 'k' value for more spikes
  var k = 1;
  for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i];
      p.normalize().multiplyScalar(1 + 1 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
  }
  sphere.geometry.computeVertexNormals();
  sphere.geometry.normalsNeedUpdate = true;
sphere.geometry.verticesNeedUpdate = true;


}

function animate() {
  //sphere.rotation.x += 0.0005;
  //sphere.rotation.y += 0.0005;

  update();
  /* render scene and camera */
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}


requestAnimationFrame(animate);