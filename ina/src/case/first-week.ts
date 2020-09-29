import * as three from "three";

const firstWeek = () => {
  const body = document.getElementsByTagName("body")[0];

  const outputDiv = document.createElement("div");
  outputDiv.id = "output";

  body.appendChild(outputDiv);
  console.log("what?");

  const scene = new three.Scene();
  const renderer = new three.WebGLRenderer();
  const camera = new three.PerspectiveCamera();

  renderer.setClearColor(0xeeeeee);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const axes = new three.AxesHelper(20);

  scene.add(axes);

  const boxGeometry = new three.BoxGeometry(10, 10, 10);
  const boxMaterial = new three.MeshLambertMaterial({ color: 0x483278 });
  const box = new three.Mesh(boxGeometry, boxMaterial);

  box.castShadow = true;
  box.receiveShadow = true;

  box.position.set(0, 0, 0);
  box.material.side = three.DoubleSide;

  const light = new three.PointLight(0xffffff, 1);
  light.position.set(300, 200, 100);
  scene.add(box);
  scene.add(light);

  camera.position.set(50, 50, 50);
  camera.lookAt(scene.position);
  console.log(scene.position);

  const camPos = {
    radius: 50 * Math.sqrt(3),
    theta: 0,
    psi: 0,
  };

  outputDiv.appendChild(renderer.domElement);

  renderer.render(scene, camera);

  window.addEventListener("mousewheel", (e: WheelEvent) => {
    if (e.deltaX) {
      console.log("move x " + e.deltaX);
      camPos.theta += e.deltaX * 0.002;
    }

    if (e.deltaY) {
      console.log("move y " + e.deltaY);
      camPos.psi += e.deltaY * 0.002;
    }

    camera.position.set(
      camPos.radius * Math.sin(camPos.theta) * Math.cos(camPos.psi),
      camPos.radius * Math.sin(camPos.theta) * Math.sin(camPos.psi),
      camPos.radius * Math.cos(camPos.theta)
    );

    camera.lookAt(scene.position);

    // update
    renderer.render(scene, camera);
  });
};

export default firstWeek;
