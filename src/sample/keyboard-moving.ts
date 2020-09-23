import * as three from "three";
import * as dat from "dat.gui";

import { addOutputDivOnBody } from "../libs/dom";

const KeyboardMoving = () => {
  addOutputDivOnBody();

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const gui = new dat.GUI();

  const axis = new three.AxesHelper(100);
  scene.add(axis);

  // const light = new three.AmbientLight();
  const light = new three.PointLight(0x957388, 2);
  light.position.set(0, 40, 0);
  scene.add(light);

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

  const camera = new three.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    1000,
  );
  camera.position.set(100, 100, 100);
  camera.lookAt(scene.position);

  document.getElementById("output").appendChild(renderer.domElement);

  const movingBox = new three.Mesh(
    new three.BoxGeometry(10, 10, 10),
    new three.MeshLambertMaterial({ color: 0x7295a4 }),
  );

  const movingBoxAxes = new three.AxesHelper(20);
  movingBox.add(movingBoxAxes);

  movingBox.position.set(5, 5, 5);

  scene.add(movingBox);
  renderer.render(scene, camera);

  const currentDirection = {
    left: false,
    right: false,
    up: false,
    down: false,
  };

  let currentHandle: number = null;

  const updatePosition = () => {
    if (Object.keys(currentDirection).every((key) => !currentDirection[key])) {
      return;
    }

    const { left, right, up, down } = currentDirection;

    if (left && !right) {
      movingBox.translateX(-1);
      // movingBox.rotation.z += 0.1;
    }

    if (right && !left) {
      movingBox.translateX(1);
    }

    if (up && !down) {
      movingBox.translateZ(-1);
    }

    if (down && !up) {
      movingBox.translateZ(1);
    }

    renderer.render(scene, camera);
    currentHandle = requestAnimationFrame(updatePosition);
  };

  const updateMovingEvent = (direction: string, isAdd: boolean) => {
    if (isAdd) {
      if (currentDirection[direction]) return;

      currentDirection[direction] = true;
    } else {
      currentDirection[direction] = false;
    }

    if (currentHandle) {
      cancelAnimationFrame(currentHandle);
    }

    currentHandle = requestAnimationFrame(updatePosition);
  };

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        updateMovingEvent("left", true);
        break;
      case "ArrowRight":
        updateMovingEvent("right", true);
        break;
      case "ArrowUp":
        updateMovingEvent("up", true);
        break;
      case "ArrowDown":
        updateMovingEvent("down", true);
        break;
    }
  });

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        updateMovingEvent("left", false);
        break;
      case "ArrowRight":
        updateMovingEvent("right", false);
        break;
      case "ArrowUp":
        updateMovingEvent("up", false);
        break;
      case "ArrowDown":
        updateMovingEvent("down", false);
        break;
    }
  });
};

export default KeyboardMoving;
