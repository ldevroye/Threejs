import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let scene, camera, renderer, cube;

var rotate = false;

const step = 10;

function init() {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0, 0, 0 );

    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.rotateX(-0.5)

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    //cube = new THREE.Mesh(geometry, material);

    const Loader = new GLTFLoader();

    Loader.load( './models/cuvette.glb', function ( gltf ) {

        cube = gltf.scene;
        scene.add(cube);


    }, undefined, function ( error ) {

        console.error( error );

    } );


    const light = new THREE.SpotLight(0xbadd1e);
    light.position.set(-2,1,5);
    const helper = new THREE.SpotLightHelper(light, 0xffffff);
    scene.add(light);
    scene.add(helper);

    const light2 = new THREE.SpotLight(0x00ff00);
    light2.position.set(2,1,10);
    const helper2 = new THREE.SpotLightHelper(light2, 0xffffff);
    scene.add(light2);
    scene.add(helper2);


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
        cube.position.set(0, 0, 0);
    }
}

function onVertical(key) {
    const scrollStep = key === 'ArrowDown' ? step : -step; // Adjust the step to control how much the camera moves

    // Simulate scroll
    let move = scrollStep > 0 ? 1 : -1;
    cube.position.y += move * 0.1;
}

function onHorizontal(key) {
    const scrollStep = key === 'ArrowLeft' ? step : -step; // Adjust the step to control how much the camera moves

    // Simulate scroll
    let move = scrollStep > 0 ? 1 : -1;
    cube.position.x += move * 0.1;
}

function animate() {
    requestAnimationFrame(animate);

    if (rotate) {
        cube.rotation.y -= 0.005;
    }

    renderer.render(scene, camera);
}

init();
