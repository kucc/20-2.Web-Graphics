import * as three from "three";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { addOutputDivOnBody } from "../libs/dom";

const controls = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.03,
};

const importBlender = async () => {
  addOutputDivOnBody();

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const gui = new dat.GUI();

  const axis = new three.AxesHelper(100);
  scene.add(axis);

  gui.add(controls, "rotationSpeed", 0, 0.5);
  gui.add(controls, "bouncingSpeed", 0, 0.5);

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

  const loader = new GLTFLoader();
  const bmw27 = await loader.loadAsync("bmw27_gpu.gltf");

  scene.add(bmw27.scene);
  console.log(bmw27);
  bmw27.scene.mesj;
  const planeGeometry = new three.PlaneGeometry(60, 40);
  const planeMaterial = new three.MeshLambertMaterial({ color: 0x652764 });
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
  camera.position.set(30, 40, 30);
  camera.lookAt(scene.position);

  const spotLight = new three.AmbientLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  document.getElementById("output").appendChild(renderer.domElement);

  const renderScene = () => {
    renderer.render(scene, camera);
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

export default importBlender;
