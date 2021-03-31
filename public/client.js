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

var geometries - 

var geometries = [];
geometries.push(new THREE.BoxGeometry(width, height, depth));
geometries.push(new THREE.BoxGeometry(width, height, depth));

var edges = [];
edges.push(new THREE.EdgesGeometry(geometries[0]));
edges.push(new THREE.EdgesGeometry(geometries[1]));

var lines = [];
lines.push(new THREE.LineSegments(edges[0], new THREE.LineBasicMaterial({color: 0x000000})));
lines.push(new THREE.LineSegments(edges[1], new THREE.LineBasicMaterial({color: 0x000000})));

const material = new THREE.MeshBasicMaterial({color: 0x6EA2E8});

var cubes = [];
cubes.push(new THREE.Mesh(geometries[0], material));
cubes.push(new THREE.Mesh(geometries[1], material));

scene.add(lines[0], cubes[0]);
scene.add(lines[1], cubes[1]);

cubes[0].position.x = -2;
lines[0].position.x = -2;
cubes[1].position.x = 2;
lines[1].position.x = 2;


// const geometry1 = new THREE.BoxGeometry(width, height, depth);
// const edges1 = new THREE.EdgesGeometry(geometry1);
// const line1 = new THREE.LineSegments(edges1, new THREE.LineBasicMaterial({color: 0x000000}));
// const material1 = new THREE.MeshBasicMaterial({color: 0x6EA2E8});
// const cube1 = new THREE.Mesh(geometry1, material1);
// scene.add(line1, cube1);


// // //cube 2
// const geometry2 = new THREE.BoxGeometry(width, height, depth);
// const edges2 = new THREE.EdgesGeometry(geometry2);
// const line2 = new THREE.LineSegments(edges2, new THREE.LineBasicMaterial({color: 0x000000}));
// const material2 = new THREE.MeshBasicMaterial({color: 0x6EA2E8});
// const cube2 = new THREE.Mesh(geometry2, material2);
// scene.add(line2, cube2)

//  camera.position.x = 0;
//  cube1.position.x = 2;
//  line1.position.x = 2;
//  cube2.position.x = -2;
//  line2.position.x = -2;

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
