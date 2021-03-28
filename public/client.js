import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';

const fov = 45;
const width = 1;
const height = 1;
const depth = 1;
      
// always need scene, camera and renderer
const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );  // is innerWidth + innerHeight the equivalent of width and height in p5?

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(width, height, depth);
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
const material = new THREE.MeshBasicMaterial({color: 0x6EA2E8});
const cube = new THREE.Mesh(geometry, material);
scene.add(line, cube);

camera.position.x = 0;

var clock = new THREE.Clock();
var theta = 0;
var delta = 0;
const center = new THREE.Vector3(0, 0, 0);

animate();

function animate() {
  requestAnimationFrame(animate);
  verticalWipe(10);
  renderer.render(scene, camera);
}



function sinusoidalZoom(max, min) {
  delta = clock.getDelta();
  theta += delta * 0.2;
  camera.position.z = Math.abs((max-min)*Math.sin(theta))+min;
}



function horizontalCenterSpin(radius) {
  camera.lookAt(center);
  delta = clock.getDelta();
  theta += delta * 0.2;
  camera.position.z = radius * Math.sin(theta);
  camera.position.x = radius * Math.cos(theta);
}




function verticalCenterSpin(radius) {
  camera.lookAt(center);
  delta = clock.getDelta();
  theta += delta * 0.2;
  camera.position.z = radius * Math.sin(theta);
  camera.position.y = radius * Math.cos(theta);
}


//change it so it uses delta value
//perspective camera makes the cube look oblong, maybe there's another type of camera that would work best for this functionality?
function horizontalWipe(distance) {
  camera.position.z = distance;
  camera.position.x+=0.05;
  var x = distance * Math.tan(fov/2 * Math.PI/180.0)*2;
  var rearOffset = depth * Math.tan(fov/2 * Math.PI/180.0) * 2.5; // * 3 works, but by trial and error. revisit the math, find actual formula/reason that it works
  console.log(rearOffset);
  if (camera.position.x >= x + rearOffset) {
    camera.position.x = -(x + rearOffset);
  }
}

function verticalWipe(distance) {
  camera.position.z = distance;
  camera.position.y += 0.05;
  var x = distance * Math.tan(fov/2 * Math.PI/180.0)*2 * (window.innerHeight/window.innerWidth);
  console.log(window.innerHeight/window.innerWidth);
  var rearOffset = depth * Math.tan(fov/2 * Math.PI/180.0) * 2.5;
  if (camera.position.y >= x + rearOffset) {
    camera.position.y = - (x + rearOffset);
  }
}