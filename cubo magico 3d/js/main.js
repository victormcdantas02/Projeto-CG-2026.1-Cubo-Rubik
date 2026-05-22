let scene, câmera, renderer, controls, cubo;
 
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
 
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(5,5,5);
 
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);
 
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
 
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,5,5);
    scene.add(light);
 
    cubo = new Cubo(scene);
 
    document.getElementById("shuffleBtn").addEventListener("click", () => {
        cubo.rotacionarFaceU(); // teste: gira face superior
    });
 
    animate();
}
 
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
 
init();