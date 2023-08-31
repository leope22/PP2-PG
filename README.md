**Solar System Animation**

Este projeto é uma animação do sistema solar em 3D criada usando a biblioteca Three.js. Ele permite a visualização interativa dos planetas e seus movimentos, bem como a alternância entre diferentes câmeras para obter diferentes perspectivas.

**Especificações/Avaliação Atendidas**

 **Visualização de objeto 3D** : foram criados 5 objetos, o Sol, Terra, Lua, Marte e Júpiter, cada um com suas texturas correspondentes. Além disso foram criadas pequenas esferas para representar estrelas do proprio universo.
 **Utilização de um shader próprio em um dos objetos** : Foram criados 2 shader, um para para jupiter, que altera sua cor conforme o tempo e induz mostra um reflexo e tambem um para as esferas, dando a elas uma cor(branco,azul ou dourado) e tambem um tamanho fixo.
 **Definição de pelo menos duas câmera** :Foram definidas duas cameras, a primeira com foco no sol e a segunda com foco no terra acompanhando seu movimento.
 **Movimento simples de pelo menos um objeto** : Os Planetas estao se movimento em volta do objeto central, O sol, estes objetos tambem estão se movendo em torno de si mesmo.

 **Pré-requisitos**
- Navegador da web moderno com suporte a WebGL.
- Arquivos de textura para os planetas (sol.jpg, terra.jpg, lua.jpg, marte.jpg) no mesmo diretório do arquivo HTML.
- 
**Modo de Interação**
- Ao abrir a animação, você verá uma representação em 3D do sistema solar.
- A animação inclui a rotação da Terra em torno do Sol, a rotação da Lua em torno da Terra e a rotação de Marte e Júpiter.
- Não ha um forma de intergir diretamente com cena.

**Características Implementadas**

-Representações 3D detalhadas de Sol, Terra, Lua, Marte e Júpiter.
-Shader personalizado que aplica cores diferenciadas aos pontos na cena.
-Duas câmeras configuradas para diferentes perspectivas.
-Movimento realista dos planetas simulado por rotações.

**descrição das principais características implementadas**
Duas câmeras foram implementadas para proporcionar diferentes perspectivas da cena:
        -Câmera de Vista Superior (camera1): Oferece uma visão geral do sistema solar, permitindo que os usuários observem o alinhamento dos    planetas e suas órbitas a partir de cima.
        -Câmera da Superfície da Terra (camera2): Proporciona uma visão mais próxima dos planetas, permitindo que os usuários observem detalhes como a Terra vista da sua superfície.

Movimento Realista dos Planetas
        -A animação simula o movimento dos planetas em torno do Sol de maneira realista. As rotações da Terra, Lua, Marte e Júpiter são calculadas com base no tempo, proporcionando uma representação convincente dos movimentos celestes.

Shader Personalizado para Efeitos Visuais
        -Um shader personalizado é aplicado a pontos brilhantes na cena, criando efeitos visuais das estrelas ao fundo. 
        -O shader utiliza cores diferenciadas com base nas coordenadas dos pontos, o que contribui para a aparência vibrante e atraente da animação, esse shader foi aplicado a jupiter.

 


