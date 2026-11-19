import type { Questao } from '../tipos';

/** Provinha Leve 3 — questões 11 a 15 da planilha de questões fáceis. */
export const questoesLeve3: Questao[] = [
  {
    pergunta: "Na estrutura de pastas e arquivos de um projeto React Native com Expo, qual arquivo é responsável por configurar informações próprias do aplicativo, como nome, ícone, tela de abertura (splash screen) e orientação da tela?",
    opcoes: [
      "index.html",
      "app.json",
      "styles.css",
      "README.md",
    ],
    correta: 1,
    explicacao: "O arquivo app.json guarda todas as configurações globais do projeto Expo, como o nome do aplicativo, versão, ícone, permissões e imagem de carregamento (splash). Já o package.json lista as bibliotecas instaladas, e arquivos .html ou .css não são usados por padrão no React Native.",
  },
  {
    pergunta: "Após criar um projeto Expo, qual comando é utilizado no terminal para iniciar o servidor de desenvolvimento e gerar o QR Code que permite testar o aplicativo no celular pelo app Expo Go?",
    opcoes: [
      "npx expo start",
      "npx expo build-server",
      "npm install qr-code",
      "react-native compile",
    ],
    correta: 0,
    explicacao: "O comando 'npx expo start' (ou 'npm start') inicia o servidor de desenvolvimento no terminal e exibe o QR Code. Ao ler esse QR Code com o aplicativo Expo Go no celular, o projeto carrega em tempo real no aparelho.",
  },
  {
    pergunta: "Como os estilos visuais (como cor de fundo e tamanho de fonte) são escritos no React Native utilizando o StyleSheet.create()?",
    opcoes: [
      "Usando arquivos .css externos com nomes separados por hífen, como background-color.",
      "Usando objetos JavaScript com propriedades em camelCase, como backgroundColor e fontSize.",
      "Escrevendo comandos SQL dentro do componente <View>.",
      "Apenas através de tags <font> e <center> iguais ao HTML antigo.",
    ],
    correta: 1,
    explicacao: "No React Native a estilização é feita via JavaScript com o StyleSheet.create(). Por serem objetos JS, os nomes das propriedades não levam hífen como no CSS tradicional, adotando o padrão camelCase (primeira palavra em minúsculo e a seguinte iniciando com maiúscula).",
  },
  {
    pergunta: "Para exibir uma lista dinâmica de dados na tela (como uma lista de produtos ou contatos) com rolagem eficiente e bom desempenho no React Native, qual componente nativo é o mais indicado?",
    opcoes: [
      "<TableView>",
      "<FlatList>",
      "<UlList>",
      "<TextList>",
    ],
    correta: 1,
    explicacao: "O componente <FlatList> recebe um array de dados (na prop 'data') e uma função de desenho (na prop 'renderItem'), renderizando na memória apenas os itens que estão visíveis na tela no momento, o que garante ótimo desempenho mesmo em listas grandes.",
  },
  {
    pergunta: "Ao criar um layout dinâmico com Flexbox no React Native, quais são as duas propriedades usadas para alinhar os elementos filhos, respectivamente, no eixo principal (main axis) e no eixo cruzado (cross axis)?",
    opcoes: [
      "marginTop e marginLeft",
      "justifyContent e alignItems",
      "positionTop e positionCenter",
      "textAlign e verticalAlign",
    ],
    correta: 1,
    explicacao: "No Flexbox, 'justifyContent' distribui e alinha os elementos ao longo do eixo principal (por padrão, vertical/coluna no React Native), enquanto 'alignItems' alinha os elementos no eixo perpendicular/cruzado (por padrão, horizontal).",
  },
];
