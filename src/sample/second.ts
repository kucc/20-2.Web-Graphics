import * as three from "three";
import * as dat from "dat.gui";

import { createDivWithId } from "../libs/dom";

const addOutputDivOnBody = () => {
  const div = createDivWithId("output");
  document.getElementsByTagName("body")[0].appendChild(div);
};

const controls = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.03,
};

const second = () => {
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
  // const renderScene = () => {
  //   renderer.render(scene, camera);
  //   requestAnimationFrame(renderScene);
  // };

  // renderScene();
  renderer.render(scene, camera);
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("resize", onResize, false);
};

export default second;
