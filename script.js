import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// Criar a cena
const scene = new Scene();

// Criar a câmera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Criar o renderizador
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Função para criar uma pétala
function createPetal(color) {
    const petalGeometry = new BoxGeometry(1, 0.2, 2);
    const petalMaterial = new MeshBasicMaterial({ color });
    return new Mesh(petalGeometry, petalMaterial);
}

// Criar as pétalas
const petalColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
const petals = [];
petalColors.forEach((color, index) => {
    const petal = createPetal(color);
    const angle = (index / petalColors.length) * Math.PI * 2;
    petal.position.set(Math.cos(angle) * 5, Math.sin(angle) * 5, 0);
    petals.push(petal);
    scene.add(petal);
});

// Criar o corpo central
const centralGeometry = new BoxGeometry(0.5, 2, 0.5);
const centralMaterial = new MeshBasicMaterial({ color: 0xff00ff });
const central = new Mesh(centralGeometry, centralMaterial);
scene.add(central);

// Função para animação
function animate() {
    requestAnimationFrame(animate);

    // Girar as pétalas
    petals.forEach((petal, index) => {
        const angle = Date.now() * 0.001 + (index / petalColors.length) * Math.PI * 2;
        petal.rotation.z = Math.sin(angle) * 0.5;
    });

    renderer.render(scene, camera);
}

animate();