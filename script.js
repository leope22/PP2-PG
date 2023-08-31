<<<<<<< HEAD
// Crie a cena
const cena = new THREE.Scene();

// Crie a câmera 1 (vista de cima)
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera1.position.z = 20; // x = y = 0

// Crie a câmera 2 (vista da superfície da Terra)
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera2.position.set(-15, -5, 0); // x = y = 0
camera2.lookAt(10, 0, 0);

// Crie os renderizadores para cada câmera
const renderizador1 = new THREE.WebGLRenderer();
const renderizador2 = new THREE.WebGLRenderer();

// Defina o tamanho dos renderizadores
const largura = window.innerWidth / 2;
const altura = window.innerHeight;

renderizador1.setSize(largura, altura);
renderizador2.setSize(largura, altura);

// Adicione os renderizadores à página em posições diferentes para ver as duas câmeras
document.body.appendChild(renderizador1.domElement);
document.body.appendChild(renderizador2.domElement);

 //Shaders
const UniversovertexShader = `
    void main() {
        gl_PointSize = 3.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

// Fragment shader para os pontos brilhantes (renderizando pontos)
const UniversofragmentShader =  `
    void main() {
        if (gl_PointCoord.x < 0.33) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Cor branca para um terço dos pontos
        } else if (gl_PointCoord.x < 0.67) {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Cor azul para outro terço dos pontos
        } else {
            gl_FragColor = vec4(1.0, 0.84, 0.0, 1.0); // Cor dourada para o último terço dos pontos
        }
    }
    `;

// Crie os objetos (Sol, Terra, Lua, Outros planetas) e adicione-os à cena com texturas
const geometriaSol = new THREE.SphereGeometry(3, 32, 32);
const geometriaTerra = new THREE.SphereGeometry(1.5, 32, 32);
const geometriaLua = new THREE.SphereGeometry(0.5, 32, 32);
const geometriaMarte = new THREE.SphereGeometry(1.2, 32, 32);
const geometriaJupiter = new THREE.SphereGeometry(4, 32, 32);
const pointsGeometry = new THREE.BufferGeometry();

const texturaSol = new THREE.TextureLoader().load('/sol.jpg');
const texturaTerra = new THREE.TextureLoader().load('/terra.jpg');
const texturaLua = new THREE.TextureLoader().load('/lua.jpg');
const texturaMarte = new THREE.TextureLoader().load('/marte.jpg');


const materialSol = new THREE.MeshPhongMaterial({ map: texturaSol });
const materialTerra = new THREE.MeshPhongMaterial({ map: texturaTerra });
const materialLua = new THREE.MeshPhongMaterial({ map: texturaLua });
const materialMarte = new THREE.MeshPhongMaterial({ map: texturaMarte });
const pointMaterial = new THREE.ShaderMaterial({
    vertexShader: UniversovertexShader,
    fragmentShader: UniversofragmentShader,
    blending: THREE.AdditiveBlending, // Adiciona o brilho dos pontos
    depthTest: true, // realiza teste de profundidade para os pontos
    transparent: true // Permite transparência nos pontos
});
const numPoints = 1000;


const materialJupiter = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        // Função para calcular a reflexão especular
        vec3 calculateSpecular(vec3 lightDir, vec3 viewDir, vec3 normal, float shininess) {
            vec3 halfwayDir = normalize(lightDir + viewDir);
            float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
            return spec * vec3(1.0);
        }

        void main() {
            vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
            vec3 viewDir = normalize(cameraPosition - vPosition);
            vec3 normal = normalize(vNormal);

            float diff = max(dot(normal, lightDir), 0.0);

            // Efeito facetado com múltiplas cores
            vec3 baseColor = vec3(0.4, 0.4, 0.4); // Cor base

            // Cores variáveis
            vec3 color1 = vec3(0.7, 0.3, 0.1);
            vec3 color2 = vec3(0.5, 0.5, 0.2);
            vec3 color3 = vec3(0.2, 0.2, 0.7);
            vec3 color4 = vec3(0.1, 0.6, 0.3);

            // Padrões de cores baseados nas coordenadas do planeta
            vec3 patternColor = mix(color1, color2, sin(vPosition.x * 0.1));
            patternColor = mix(patternColor, color3, cos(vPosition.y * 0.2));
            patternColor = mix(patternColor, color4, sin(vPosition.z * 0.05));

            // Reflexão especular
            vec3 specularColor = calculateSpecular(lightDir, viewDir, normal, 32.0);

            vec3 finalColor = baseColor + patternColor * diff + specularColor;

            // Aplicar shader flat facetado
            float facet = ceil(mod(gl_FragCoord.x + gl_FragCoord.y, 2.0));
            if (facet == 0.0) {
                finalColor = baseColor;
            }

            gl_FragColor = vec4(finalColor, 1.0);
        }
    `,
});

const jupiter = new THREE.Mesh(geometriaJupiter, materialJupiter);
const sol = new THREE.Mesh(geometriaSol, materialSol);
const terra = new THREE.Mesh(geometriaTerra, materialTerra);
const lua = new THREE.Mesh(geometriaLua, materialLua);
const marte = new THREE.Mesh(geometriaMarte, materialMarte);
const Universopositions = new Float32Array(numPoints * 3);
for (let i = 0; i < numPoints; i++) {
     Universopositions[i * 3] = (Math.random() - 0.5) * 2000; // Posições aleatórias no espaço
     Universopositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
     Universopositions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
}
pointsGeometry.setAttribute('position', new THREE.BufferAttribute(Universopositions, 3));
const points = new THREE.Points(pointsGeometry, pointMaterial);



sol.position.set(0, 0, 0); // origem
terra.position.set(10, 0, 0);
lua.position.set(12, 0, 0);
marte.position.set(-15, -5, 0);
jupiter.position.set(-25,0,0);




cena.add(sol);
cena.add(terra);
cena.add(lua);
cena.add(marte);
cena.add(jupiter);
cena.add(points);

// Crie uma luz ambiente
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
cena.add(luzAmbiente);

// Crie uma luz direcional
const luzDirecional = new THREE.DirectionalLight(0xffffff, 1);
luzDirecional.position.set(10, 10, 10);
cena.add(luzDirecional);

// Crie uma luz que sai do Sol
const luzSol = new THREE.PointLight(0xffffff, 1, 100);
luzSol.position.set(0, 0, 0);
sol.add(luzSol);

// Atualize a posição da câmera2 para que ambos os objetos sejam visíveis nas duas câmeras
camera2.lookAt(cena.position);

// Crie uma função para atualizar a animação
function animar() {
    // Atualize a posição dos objetos e das câmeras aqui
    const tempo = Date.now() * 0.001; // Tempo em segundos

    // Rotação da Terra em torno do Sol
    terra.position.x = 10 * Math.cos(tempo);
    terra.position.z = 10 * Math.sin(tempo);

    // Rotação da Lua em torno da Terra
    lua.position.x = 2 * Math.cos(2 * tempo) + terra.position.x;
    lua.position.z = 2 * Math.sin(2 * tempo) + terra.position.z;

    // Rotação de Marte
    marte.position.x = 15 * Math.cos(0.8 * tempo);
    marte.position.z = 15 * Math.sin(0.8 * tempo);

    // Rotação de Júpiter
    
    jupiter.position.x = 25 * Math.cos(0.5 * tempo);
    jupiter.position.z = 25 * Math.sin(0.5 * tempo);


    // Posição da câmera 2 em Marte olhando para a Terra
    camera2.position.x = marte.position.x;
    camera2.position.z = marte.position.z;
    camera2.position.y = marte.position.y;
    camera2.lookAt(terra.position);

    renderizador1.render(cena, camera1);
    renderizador2.render(cena, camera2);

    requestAnimationFrame(animar);
}

// Chamando a função de animação para começar a renderização
animar();
=======

 // Crie a cena
 const cena = new THREE.Scene();
 //Shaders
 const UniversovertexShader = `
    void main() {
        gl_PointSize = 3.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `;

// Fragment shader para os pontos brilhantes (renderizando pontos)
const UniversofragmentShader =  `
    void main() {
        if (gl_PointCoord.x < 0.33) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Cor branca para um terço dos pontos
        } else if (gl_PointCoord.x < 0.67) {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Cor azul para outro terço dos pontos
        } else {
            gl_FragColor = vec4(1.0, 0.84, 0.0, 1.0); // Cor dourada para o último terço dos pontos
        }
    }
    `;
 // Crie a câmera 1 (vista de cima)
 const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera1.position.z = 20; // x = y = 0

 // Crie a câmera 2 (vista da superfície da Terra)
 const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 camera2.position.set(-15, -5, 0); // x = y = 0
 camera2.lookAt(10, 0, 0);

 // Crie os renderizadores para cada câmera
 const renderizador1 = new THREE.WebGLRenderer();
 const renderizador2 = new THREE.WebGLRenderer();

 // Defina o tamanho dos renderizadores
 const largura = window.innerWidth / 2;
 const altura = window.innerHeight;

 renderizador1.setSize(largura, altura);
 renderizador2.setSize(largura, altura);

 // Adicione os renderizadores à página em posições diferentes para ver as duas câmeras
 document.body.appendChild(renderizador1.domElement);
 document.body.appendChild(renderizador2.domElement);

 // Crie os objetos (Sol, Terra, Lua, Outros planetas) e adicione-os à cena com texturas
 const geometriaSol = new THREE.SphereGeometry(3, 32, 32);
 const geometriaTerra = new THREE.SphereGeometry(1.5, 32, 32);
 const geometriaLua = new THREE.SphereGeometry(0.5, 32, 32);
 const geometriaMarte = new THREE.SphereGeometry(1.2, 32, 32);
 const geometriaJupiter = new THREE.SphereGeometry(4, 32, 32);
 const pointsGeometry = new THREE.BufferGeometry();

 const texturaSol = new THREE.TextureLoader().load('/sol.jpg');
 const texturaTerra = new THREE.TextureLoader().load('/terra.jpg');
 const texturaLua = new THREE.TextureLoader().load('/lua.jpg');
 const texturaMarte = new THREE.TextureLoader().load('/marte.jpg');
 const texturaJupiter = new THREE.TextureLoader().load('/jupiter.jpg');

 const materialSol = new THREE.MeshPhongMaterial({ map: texturaSol });
 const materialTerra = new THREE.MeshPhongMaterial({ map: texturaTerra });
 const materialLua = new THREE.MeshPhongMaterial({ map: texturaLua });
 const materialMarte = new THREE.MeshPhongMaterial({ map: texturaMarte });
 const materialJupiter = new THREE.MeshPhongMaterial({ map: texturaJupiter });
 const pointMaterial = new THREE.ShaderMaterial({
        vertexShader: UniversovertexShader,
        fragmentShader: UniversofragmentShader,
        blending: THREE.AdditiveBlending, // Adiciona o brilho dos pontos
        depthTest: true, // realiza teste de profundidade para os pontos
        transparent: true // Permite transparência nos pontos
    });
const numPoints = 1000;

 const sol = new THREE.Mesh(geometriaSol, materialSol);
 const terra = new THREE.Mesh(geometriaTerra, materialTerra);
 const lua = new THREE.Mesh(geometriaLua, materialLua);
 const marte = new THREE.Mesh(geometriaMarte, materialMarte);
 const jupiter = new THREE.Mesh(geometriaJupiter, materialJupiter);
 const Universopositions = new Float32Array(numPoints * 3);
 for (let i = 0; i < numPoints; i++) {
     Universopositions[i * 3] = (Math.random() - 0.5) * 2000; // Posições aleatórias no espaço
     Universopositions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
     Universopositions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
 }
 pointsGeometry.setAttribute('position', new THREE.BufferAttribute(Universopositions, 3));
 const points = new THREE.Points(pointsGeometry, pointMaterial);

 sol.position.set(0, 0, 0); // origem
 terra.position.set(10, 0, 0);
 lua.position.set(12, 0, 0);
 marte.position.set(-15, -5, 0);
 jupiter.position.set(-25, 0, 0);

 cena.add(sol);
 cena.add(terra);
 cena.add(lua);
 cena.add(marte);
 cena.add(jupiter);
 cena.add(points);

 // Crie uma luz ambiente
 const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
 cena.add(luzAmbiente);

 // Crie uma luz direcional
 const luzDirecional = new THREE.DirectionalLight(0xffffff, 1);
 luzDirecional.position.set(10, 10, 10);
 cena.add(luzDirecional);

 // Crie uma luz que sai do Sol
 const luzSol = new THREE.PointLight(0xffffff, 1, 100);
 luzSol.position.set(0, 0, 0);
 sol.add(luzSol);

 // Atualize a posição da câmera2 para que ambos os objetos sejam visíveis nas duas câmeras
 camera2.lookAt(cena.position);

 // Crie uma função para atualizar a animação
 function animar() {
     // Atualize a posição dos objetos e das câmeras aqui
     const tempo = Date.now() * 0.001; // Tempo em segundos

     // Rotação da Terra em torno do Sol
     terra.position.x = 10 * Math.cos(tempo);
     terra.position.z = 10 * Math.sin(tempo);

     // Rotação da Lua em torno da Terra
     lua.position.x = 2 * Math.cos(2 * tempo) + terra.position.x;
     lua.position.z = 2 * Math.sin(2 * tempo) + terra.position.z;

     // Rotação de Marte
     marte.position.x = 15 * Math.cos(0.8 * tempo);
     marte.position.z = 15 * Math.sin(0.8 * tempo);

     // Rotação de Júpiter
     jupiter.position.x = 25 * Math.cos(0.5 * tempo);
     jupiter.position.z = 25 * Math.sin(0.5 * tempo);

     // Posição da câmera 2 em Marte olhando para a Terra
     camera2.position.x = marte.position.x;
     camera2.position.z = marte.position.z;
     camera2.position.y = marte.position.y;
     camera2.lookAt(terra.position);

     renderizador1.render(cena, camera1);
     renderizador2.render(cena, camera2);

     requestAnimationFrame(animar);
 }

 // Chamando a função de animação para começar a renderização
 animar();
>>>>>>> edfd70bc189e365b4c35057810fce767415b1d50
