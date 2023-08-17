
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

    // Crie os objetos (Sol, Terra, Lua, Outros planetas) e adicione-os à cena com texturas
    const geometriaSol = new THREE.SphereGeometry(3, 32, 32);
    const geometriaTerra = new THREE.SphereGeometry(1.5, 32, 32);
    const geometriaLua = new THREE.SphereGeometry(0.5, 32, 32);
    const geometriaMarte = new THREE.SphereGeometry(1.2, 32, 32);
    const geometriaJupiter = new THREE.SphereGeometry(4, 32, 32);

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

    const sol = new THREE.Mesh(geometriaSol, materialSol);
    const terra = new THREE.Mesh(geometriaTerra, materialTerra);
    const lua = new THREE.Mesh(geometriaLua, materialLua);
    const marte = new THREE.Mesh(geometriaMarte, materialMarte);
    const jupiter = new THREE.Mesh(geometriaJupiter, materialJupiter);

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
