const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(5, 5, 7);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const cubo = new Cubo(scene);

document.getElementById("btnU").addEventListener("click", () => {
  cubo.rotacionarFace("U");
});

document.getElementById("btnF").addEventListener("click", () => {
  cubo.rotacionarFace("F");
});

document.getElementById("btnShuffle").addEventListener("click", () => {
  cubo.embaralhar();
});
document.getElementById("btnD").addEventListener("click", () => {
  cubo.rotacionarFace("D");
});

document.getElementById("btnReset").addEventListener("click", () => {
  cubo.reiniciar();
});

document.getElementById("themeSelect").addEventListener("change", (event) => {
  cubo.alterarTema(event.target.value);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cubo.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener("keydown", function (event) {
  console.log("Tecla apertada:", event.key);

  if (event.key.toLowerCase() === "u") {
    cubo.rotacionarFace("U");
  }

  if (event.key.toLowerCase() === "f") {
    cubo.rotacionarFace("F");
  }

  if (event.key.toLowerCase() === "e") {
    cubo.embaralhar();
  }
  if (event.key.toLowerCase() === "d") {
  cubo.rotacionarFace("D");
}
if (event.key === "+" || event.key === "=") {
  camera.position.multiplyScalar(0.9);
}
if (event.key === "-") {
  camera.position.multiplyScalar(1.1);
}
if (event.key.toLowerCase() === "r") {
  cubo.reiniciar();
}
});
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);