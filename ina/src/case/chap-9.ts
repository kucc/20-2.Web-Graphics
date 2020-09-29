import * as three from "three";

export default function chap9() {
  const div = document.createElement("div");
  div.id = "output";
  document.getElementsByTagName("body")[0].appendChild(div);

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new three.Scene();

  // create a camera, which defines where we're looking at.
  const camera = new three.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // create a render and set the size
  const renderer = new three.WebGLRenderer();

  renderer.setClearColor(0xeeeeee, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // create the ground plane
  const planeGeometry = new three.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new three.MeshLambertMaterial({ color: 0xffffff });
  const plane = new three.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  const cubeGeometry = new three.BoxGeometry(4, 4, 4);
  const cubeMaterial = new three.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new three.Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.x = -9;
  cube.position.y = 3;
  cube.position.z = 0;

  // add the cube to the scene
  scene.add(cube);

  const sphereGeometry = new three.SphereGeometry(4, 20, 20);
  const sphereMaterial = new three.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new three.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 0;
  sphere.position.z = 2;
  // add the sphere to the scene
  scene.add(sphere);

  const cylinderGeometry = new three.CylinderGeometry(2, 2, 20);
  const cylinderMaterial = new three.MeshLambertMaterial({
    color: 0x77ff77,
  });
  const cylinder = new three.Mesh(cylinderGeometry, cylinderMaterial);

  cylinder.position.set(0, 0, 1);

  scene.add(cylinder);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // add subtle ambient lighting
  const ambientLight = new three.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // add spotlight for the shadows
  const spotLight = new three.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);

  scene.add(spotLight);

  // add the output of the renderer to the html element
  document.getElementById("output").appendChild(renderer.domElement);

  renderer.render(scene, camera);

  let step = 0;
  let scalingStep = 0;

  const controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
    scalingSpeed: 0.03,
  };

  cube.rotation.x += controls.rotationSpeed;
  cube.rotation.y += controls.rotationSpeed;
  cube.rotation.z += controls.rotationSpeed;

  step += controls.bouncingSpeed;

  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

  scalingStep += controls.scalingSpeed;
}
