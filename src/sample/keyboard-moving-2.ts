import * as three from "three";
import * as dat from "dat.gui";

import { addOutputDivOnBody } from "../libs/dom";

const KeyboardMovingTwo = () => {
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
  camera.position.set(200, 200, 200);
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

  const currentSpeed = {
    ArrowLeft: 0,
    ArrowRight: 0,
    ArrowUp: 0,
    ArrowDown: 0,
  };

  const updatePosition = () => {
    if (!Object.keys(currentSpeed).every((key) => currentSpeed[key] === 0)) {
      const { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } = currentSpeed;
      movingBox.translateX(ArrowRight - ArrowLeft);
      movingBox.translateZ(ArrowDown - ArrowUp);

      renderer.render(scene, camera);
    }

    requestAnimationFrame(updatePosition);
  };

  updatePosition();

  const updateMovingEvent = (direction: string, keydown: boolean) => {
    // 관성 개념을 어떻게 만들어야 할까용
    // 여기가 아니라, updatePosition에서 해야할거같음.
    if (keydown) {
      if (currentSpeed[direction] === 0) currentSpeed[direction] = 1;
      else currentSpeed[direction] += 0.5;
    } else {
      currentSpeed[direction] = 0;
    }
  };

  window.addEventListener("keydown", (e: KeyboardEvent) => {
    updateMovingEvent(e.key, true);
  });

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    updateMovingEvent(e.key, false);
  });
};

export default KeyboardMovingTwo;
