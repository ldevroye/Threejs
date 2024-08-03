import * as THREE from 'three';

let scene, camera, renderer, cube;

var rotate = true;

const step = 10;

function init() {
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.x = 0;
    camera.position.y = 1;
    camera.rotateX(-0.5);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    cube = new THREE.Mesh(geometry, material);

    const light = new THREE.PointLight(0x00ff00)
    const light2 = new THREE.PointLight(0xff0000)
    scene.add(cube);
    scene.add(light);
    scene.add(light2);

    light.position.z = 5;
    light.position.y = 3;
    light.position.x = 5;

    light2.position.z = 5;
    light2.position.x = -5;
    light2.position.y = 3;





    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);


    // Handle keydown
    window.addEventListener('keydown', onKeyDown, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    const key = event.key;

    if (key === 'ArrowDown' || key === 'ArrowUp') {
        onVertical(key);
    } else if (key === 'ArrowRight' || key === 'ArrowLeft') {
        onHorizontal(key);
    } else if (key === ' ') {
        rotate = !rotate;
    } else if (key === 'r') {
        camera.position.z = 5;
        camera.position.x = 0;
        camera.position.y = 1;
    }
}

function onVertical(key) {
    const scrollStep = key === 'ArrowDown' ? step : -step; // Adjust the step to control how much the camera moves

    // Simulate scroll
    let move = scrollStep > 0 ? 1 : -1;
    camera.position.y -= move * 0.1;
}

function onHorizontal(key) {
    const scrollStep = key === 'ArrowLeft' ? step : -step; // Adjust the step to control how much the camera moves

    // Simulate scroll
    let move = scrollStep > 0 ? 1 : -1;
    camera.position.x -= move * 0.1;
}

function animate() {
    requestAnimationFrame(animate);

    if (rotate) {
        cube.rotation.y -= 0.005;
    }

    renderer.render(scene, camera);
}

init();