import * as THREE from '/build/three.module.js';
import {OrbitControls} from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';

const fov = 45;
const width = 1;
const height = 1;
const depth = 1;
const objNum = 2;

// always need scene, camera and renderer
const scene = new THREE.Scene();  
const camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );  // is innerWidth + innerHeight the equivalent of width and height in p5?

document.body.appendChild(renderer.domElement);


var geometries = [];
var edges = [];
var lines = [];
const material = new THREE.MeshBasicMaterial({color: 0x6EA2E8});
var cubes = [];

for (let i = 0; i < objNum; i++) {
  geometries.push(new THREE.BoxGeometry(width, height, depth));
  edges.push(new THREE.EdgesGeometry(geometries[i]));
  lines.push(new THREE.LineSegments(edges[i], new THREE.LineBasicMaterial({color: 0x000000})));
  cubes.push(new THREE.Mesh(geometries[i], material));
  scene.add(lines[i], cubes[i]);
}

cubes[0].position.x = -2;
lines[0].position.x = -2;
cubes[1].position.x = 2;
lines[1].position.x = 2;



var clock = new THREE.Clock();
var theta = 0;
var phi = 0;
var delta = 0;
const center = new THREE.Vector3(0, 0, 0);

animate();

function animate() {
  requestAnimationFrame(animate);
  figureEight();
  renderer.render(scene, camera);
}


//slightly less lag at max distance by incrementing theta by a consistent value, but definitely still noticeable
function sinusoidalZoom(min, max) {
  delta = clock.getDelta();
  theta += delta * 0.2;
  //theta += 0.01;
  camera.position.z = Math.abs((max-min)*Math.sin(theta))+min;
}



function horizontalCenterSpin(radius) {
  camera.lookAt(center);
  delta = clock.getDelta();
  theta += delta * 0.2;
  var yPos = 0;
  camera.position.z = radius * Math.sin(theta);
  camera.position.x = radius * Math.cos(theta);
  camera.position.y = yPos;
}




function verticalCenterSpin(radius) {
  camera.lookAt(center);
  delta = clock.getDelta();
  theta += delta * 0.2;
  camera.position.z = radius * Math.sin(theta);
  camera.position.y = radius * Math.cos(theta);
}

function helixSpin(radius) {
  camera.lookAt(center);
  delta = clock.getDelta();
  theta += delta * 0.2;
  camera.position.z = radius * Math.sin(theta);
  camera.position.x = radius * Math.cos(theta);
  camera.position.y = radius * Math.sin(2 * theta);
}


//change it so it uses delta value
//perspective camera makes the cube look oblong, maybe there's another type of camera that would work best for this functionality?
function horizontalWipe(distance) {
  camera.position.z = distance;
  camera.position.x+=0.05;
  var x = distance * Math.tan(fov/2 * Math.PI/180.0)*2;
  var rearOffset = depth * Math.tan(fov/2 * Math.PI/180.0) * 2.5; // * 3 works, but by trial and error. revisit the math, find actual formula/reason that it works
  if (camera.position.x >= x + rearOffset) {
    camera.position.x = -(x + rearOffset);
  }
}

function verticalWipe(distance) {
  camera.position.z = distance;
  camera.position.y += 0.05;
  var x = distance * Math.tan(fov/2 * Math.PI/180.0)*2 * (window.innerHeight/window.innerWidth);
  var rearOffset = depth * Math.tan(fov/2 * Math.PI/180.0) * 2;
  if (camera.position.y >= x + rearOffset) {
    camera.position.y = - (x + rearOffset);
  }
}




// functions for displaying multiple objects
function figureEight() {
  // if (phi < 5*Math.PI/4) {
  //   phi += 0.002;
  // }
  // else {
  //   phi = 3*Math.PI/4;
  // }
  phi += 0.002;

  camera.lookAt(-1, 0, 0);

  var x = 10*Math.cos(phi)/(1 + Math.pow(Math.sin(phi), 2));
  var y = (10*Math.cos(phi)*Math.sin(phi))/(1 + Math.pow(Math.sin(phi), 2));

  camera.position.x = x;
  camera.position.y = y;

}



