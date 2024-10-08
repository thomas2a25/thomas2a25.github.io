import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

// Création de la scène
const scene = new THREE.Scene();

// Caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière ponctuelle
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Charger une texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/wall.jpg');

// Objet 3D (Cube texturé)
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ map: texture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    // Faire tourner le cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rendu de la scène
    renderer.render(scene, camera);
}

animate();