import * as three from "three";
import * as dat from "dat.gui";

import { addOutputDivOnBody } from "../libs/dom";

const controls = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.03,
};

const first = () => {
  addOutputDivOnBody();

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const gui = new dat.GUI();

  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

  const planeGeometry = new three.PlaneGeometry(60, 40);
  const planeMaterial = new three.MeshLambertMaterial({ color: 0xcccccc });
  const plane = new three.Mesh(planeGeometry, planeMaterial);

  plane.castShadow = true;
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(15, 0, 0);
  scene.add(plane);

  const cubeGeometry = new three.BoxGeometry(4, 4, 4);
  const cubeMaterial = new three.MeshLambertMaterial({ color: 0xff0000 });
  const cube = new three.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.receiveShadow = true;
  cube.position.set(-4, 3, 0);
  scene.add(cube);

  const sphereGeometry = new three.SphereGeometry(4, 20, 20);
  const sphereMaterial = new three.MeshLambertMaterial({ color: 0x7777ff });
  const sphere = new three.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  sphere.position.set(20, 4, 2);
  scene.add(sphere);

  const camera = new three.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000,
  );
  camera.position.set(-30, 40, 30);
  camera.lookAt(scene.position);

  const spotLight = new three.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  scene.overrideMaterial = new three.MeshLambertMaterial({ color: 0xffffff });
  scene.fog = new three.Fog(0xffffff, 0.015, 100);

  document.getElementById("output").appendChild(renderer.domElement);

  let step = 0;
  const renderScene = () => {
    if (controls.rotationSpeed !== 0 && controls.bouncingSpeed !== 0) {
      cube.rotation.x += controls.rotationSpeed;
      cube.rotation.y += controls.rotationSpeed;
      cube.rotation.z += controls.rotationSpeed;

      step += controls.bouncingSpeed;
      sphere.position.x = 20 + 10 * Math.cos(step);
      sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
      renderer.render(scene, camera);
    }
    requestAnimationFrame(renderScene);
  };

  renderScene();
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize, false);
};

export default first;
