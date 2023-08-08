// Importar o módulo Scene, PerspectiveCamera e WebGLRenderer do Three.js
import { Scene, PerspectiveCamera, WebGLRenderer } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// Criar a cena
const scene = new Scene();

// Criar a câmera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criar o renderizador
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Função para animação
function animate() {
    requestAnimationFrame(animate);
    // Adicionar animações ou manipulações de objetos aqui
    renderer.render(scene, camera);
}

animate();