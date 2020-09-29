import * as three from "three";

const wh02 = () => {
  const body = document.getElementsByTagName("body")[0];

  const outputDiv = document.createElement("div");
  outputDiv.id = "output";

  body.appendChild(outputDiv);

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const camera = new three.PerspectiveCamera();

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const axes = new three.AxesHelper(20);

  scene.add(axes);

  const planeGeometry = new three.PlaneGeometry(60, 20, 1, 1);
  const planeMaterial = new three.MeshLambertMaterial({ color: 0xffffff });
  const plane = new three.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  const boxGeometry = new three.BoxGeometry(3, 3, 3);
  const boxMaterial = new three.MeshLambertMaterial({ color: 0x483278 });
  const box = new three.Mesh(boxGeometry, boxMaterial);

  box.castShadow = true;
  box.receiveShadow = true;

  box.position.set(0, 2, 0);
  box.material.side = three.DoubleSide;

  const light = new three.PointLight(0xffffff, 1);
  light.position.set(300, 200, 100);
  scene.add(box);
  scene.add(light);

  camera.position.set(70, 70, 50);
  camera.lookAt(scene.position);
  console.log(scene.position);

  const camPos = {
    radius: 50 * Math.sqrt(3),
    theta: 0,
    psi: 0,
  };

  outputDiv.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  window.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key === "ArrowLeft") {
      // 만약 키보드가 왼쪽을 누르면
      console.log("left"); // 왼쪽을 출력한다.
      box.position.x -= 15;
    }

    if (e.key === "ArrowRight") {
      console.log("right");
      box.position.x += 1;
    }

    if (e.key === "ArrowUp") {
      console.log("Up");
      box.position.z -= 1;
    }
    if (e.key === "ArrowDown") {
      console.log("Down");
      box.position.z += 1;
    }

    camera.lookAt(scene.position);

    // update
    renderer.render(scene, camera);
  });
};

export default wh02;
