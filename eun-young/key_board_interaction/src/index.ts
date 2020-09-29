import * as three from "three";
import { Vector3 } from "three";

const main = () => {
  const body = document.getElementsByTagName("body")[0];

  const outputDiv = document.createElement("div");
  outputDiv.id = "output";

  body.appendChild(outputDiv);

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const camera = new three.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const axes = new three.AxesHelper(20);

  scene.add(axes);

  const planeGeometry = new three.PlaneGeometry(300, 300);
  const planeMatrial = new three.MeshLambertMaterial({ color: 0x707070 });
  const plane = new three.Mesh(planeGeometry, planeMatrial);
  plane.rotateX(-0.5 * Math.PI);

  const boxGeometry = new three.BoxGeometry(10, 10, 10);
  const boxMaterial = new three.MeshLambertMaterial({ color: 0x483278 });
  const box = new three.Mesh(boxGeometry, boxMaterial);
  box.position.setY(10);

  box.castShadow = true;
  box.receiveShadow = true;

  //box.material.side = three.DoubleSide;

  const light = new three.PointLight(0xffffff, 1);
  light.position.set(300, 200, 100);

  scene.add(plane);
  scene.add(box);
  scene.add(light);

  camera.position.set(70, 70, 70);
  camera.lookAt(scene.position);
  //console.log(scene.position);

  outputDiv.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  var move = 0;

  const updatePosition = () => {
    if (move) {
      box.position.setX(box.position.x);
      box.position.setY(box.position.y);
      box.position.setZ(box.position.z);

      renderer.render(scene, camera);
    }

    requestAnimationFrame(updatePosition);
  };

  updatePosition();

  function updateStep(keyCode: number, keydown: boolean) {
    if (keydown) {
      if (keyCode === 37) {
        //왼쪽 37, 위 38 , 오른쪽 39, 아래 40
        //console.log(e);
        box.position.x -= 1;
        //console.log(box.position.x, box.position.y, box.position.z);
      }

      if (keyCode === 38) {
        box.position.z -= 1;
        //console.log(box.position.x, box.position.y, box.position.z);
      }

      if (keyCode === 39) {
        box.position.x += 1;
        //console.log(box.position.x, box.position.y, box.position.z);
      }

      if (keyCode === 40) {
        box.position.z += 1;
        //console.log(box.position.x, box.position.y, box.position.z);
      }
    }
  }

  window.addEventListener("keydown", (e) => {
    move = 1;
    updateStep(e.keyCode, true);
  });

  window.addEventListener("keyup", (e) => {
    move = 0;
    updateStep(e.keyCode, false);
  });
};

window.onload = main;
