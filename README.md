**Solar System Animation**

Este projeto é uma animação do sistema solar em 3D criada usando a biblioteca Three.js. Ele permite a visualização interativa dos planetas e seus movimentos, bem como a alternância entre diferentes câmeras para obter diferentes perspectivas.

**Especificações/Avaliação Atendidas**

- **Visualização de objeto 3D**: Foram criados 5 objetos - o Sol, Terra, Lua, Marte e Júpiter, cada um com suas texturas correspondentes. Além disso, pequenas esferas foram criadas para representar estrelas.

- **Utilização de um shader próprio em um dos objetos**: Foram implementados 2 shaders - um para Júpiter, que altera sua cor e projeta um reflexo, e outro para as esferas, fornecendo a elas cores (branco, azul ou dourado) e um tamanho fixo.

- **Definição de pelo menos duas câmeras**: Duas câmeras foram definidas. A primeira tem foco no Sol, enquanto a segunda acompanha o movimento da Terra.

- **Movimento simples de pelo menos um objeto**: Os planetas estão em movimento ao redor do objeto central, o Sol. Além disso, esses planetas estão girando em torno de si mesmos.

**Pré-requisitos**

- Navegador da web moderno com suporte a WebGL.
- Arquivos de textura para os planetas (sol.jpg, terra.jpg, lua.jpg, marte.jpg) devem estar no mesmo diretório do arquivo HTML.

**Modo de Interação**

- Ao abrir a animação, você será presenteado com uma representação em 3D do sistema solar.
- A animação inclui a rotação da Terra em torno do Sol, a rotação da Lua em torno da Terra e a rotação de Marte e Júpiter.
- Atualmente, não há uma forma direta de interagir com a cena.

**Características Implementadas**

- Representações 3D detalhadas de Sol, Terra, Lua, Marte e Júpiter.
- Aplicação de um shader personalizado que gera pontos brilhantes no cenário.
- Configuração de duas câmeras para oferecer diferentes perspectivas.
- Movimento realista dos planetas, simulando rotações.

**Descrição das Principais Características Implementadas**

Duas câmeras foram incorporadas para oferecer diferentes perspectivas da cena:

- **Câmera de Vista Superior (camera1):** Fornece uma visão geral do sistema solar, permitindo aos usuários observar o alinhamento dos planetas e suas órbitas de cima.

- **Câmera da Superfície da Terra (camera2):** Oferece uma visão mais próxima dos planetas, permitindo que os usuários apreciem detalhes, como a vista da Terra a partir de sua superfície.

Movimento Realista dos Planetas:

- A animação simula o movimento dos planetas ao redor do Sol de maneira realista. As rotações da Terra, Lua, Marte e Júpiter são calculadas com base no tempo, proporcionando uma representação convincente dos movimentos celestes.

Shader Personalizado para Efeitos Visuais:

- Um shader personalizado é aplicado a pontos brilhantes na cena, gerando efeitos visuais para as estrelas ao fundo.
- O shader utiliza cores distintas com base nas coordenadas dos pontos, contribuindo para a aparência vibrante e atraente da animação. Este shader em particular foi aplicado a Júpiter.
 


