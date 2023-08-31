## Solar System Animation

## Membros do Grupo

- Leonardo Oliveira Pedro (https://github.com/leope22)
- Matheus de Araujo (https://github.com/matheusaraujo14)
- Mauricio Cawanga Chilombo Kessongo (https://github.com/mauriciokessongo10)

## Objetivo

O objetivo deste projeto é criar uma representação 3D de um sistema solar animado, com planetas em órbita ao redor do sol e diferentes câmeras para visualização. Cada membro do grupo contribuiu para a visualização de pelo menos um objeto 3D, implementando movimentos e posicionamento.

## Especificações/Avaliação Atendidas

- **Visualização de objeto 3D**: Foram criados 5 objetos - o Sol, Terra, Lua, Marte e Júpiter, cada um com suas texturas correspondentes. Além disso, pequenas esferas foram criadas para representar estrelas.

- **Utilização de um shader próprio em um dos objetos**: Foram implementados 2 shaders - um para Júpiter, que altera sua cor e projeta um reflexo, e outro para as esferas, fornecendo a elas cores (branco, azul ou dourado) e um tamanho fixo.

- **Definição de pelo menos duas câmeras**: Duas câmeras foram definidas. A primeira tem foco no Sol, enquanto a segunda acompanha o movimento da Terra.

- **Movimento simples de pelo menos um objeto**: Os planetas estão em movimento ao redor do objeto central, o Sol além disso, esses planetas estão girando em torno de si mesmos.

## Instruções de Execução

1. Clone este repositório para sua máquina local.
2. Abra o arquivo `index.html` em um navegador compatível.
3. A animação será renderizada em duas visualizações lado a lado.


## Modo de Interação

A interação com a cena 3D é feita de forma automática através da animação. Os planetas se movem em órbita ao redor do Sol, e a câmera alterna entre a vista de cima e a vista da superfície da Terra. Não há interação direta do usuário, pois o foco é na visualização da animação.
  
## Características Implementadas

- Representação 3D dos planetas Sol, Terra, Lua, Marte e Júpiter.
- Shader personalizado para o planeta Júpiter, com cores variáveis e reflexão especular.
- Duas câmeras com posições e ângulos diferentes para visualização.
- Movimentos de rotação e órbita dos planetas em sincronia.
- Uso de diferentes tipos de luzes para iluminação realista.

## Descrição das Principais Características Implementadas

Duas câmeras foram incorporadas para oferecer diferentes perspectivas da cena:

- **Câmera de Vista Superior (camera1):** Fornece uma visão geral do sistema solar, permitindo aos usuários observar o alinhamento dos planetas e suas órbitas de cima.

- **Câmera da Superfície da Terra (camera2):** Oferece uma visão mais próxima dos planetas, permitindo que os usuários apreciem detalhes, como a vista da Terra a partir de sua superfície.

Movimento Realista dos Planetas:

- A animação simula o movimento dos planetas ao redor do Sol de maneira realista. As rotações da Terra, Lua, Marte e Júpiter são calculadas com base no tempo, proporcionando uma representação convincente dos movimentos celestes.

Shader Personalizado para Efeitos Visuais:

- Um shader personalizado é aplicado a pontos brilhantes na cena, gerando efeitos visuais para as estrelas ao fundo.
- O shader utiliza cores distintas com base nas coordenadas dos pontos, contribuindo para a aparência vibrante e atraente da animação. Este shader em particular foi aplicado a Júpiter.
 
## Créditos

Este projeto foi desenvolvido como parte do curso de Processamento Grafico da Universidade Federal de São Carlos (Ufscar-Sorocaba).



