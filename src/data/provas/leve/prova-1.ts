import type { Questao } from '../tipos';

/** Provinha Leve 1 — questões 1 a 5 da planilha de questões fáceis. */
export const questoesLeve1: Questao[] = [
  {
    pergunta: "Para iniciar um novo projeto moderno utilizando o Expo via linha de comando, qual é a instrução padrão recomendada?",
    opcoes: [
      "npm start react-native",
      "npx create-react-app meu-app",
      "npx create-expo-app meu-app",
      "react-native new meu-app",
    ],
    correta: 2,
    explicacao: "O comando 'npx create-expo-app' é a forma oficial recomendada pelo Expo para gerar toda a estrutura inicial de pastas e arquivos (como app.json, package.json e a pasta de código) de um novo projeto React Native. O 'create-react-app' é voltado apenas para sites web, e o 'npm start' serve apenas para rodar um projeto que já foi criado.",
  },
  {
    pergunta: "Quais são os dois componentes fundamentais do React Native utilizados, respectivamente, para criar um contêiner (como uma caixa ou div) e para exibir palavras na tela?",
    opcoes: [
      "<Container> e <Label>",
      "<Div> e <P>",
      "<Box> e <String>",
      "<View> e <Text>",
    ],
    correta: 3,
    explicacao: "No React Native não utilizamos tags HTML tradicionais como <div> ou <p>. O componente <View> funciona como o contêiner base para agrupar elementos e montar o layout, enquanto qualquer texto exibido na tela precisa obrigatoriamente estar dentro de um componente <Text>.",
  },
  {
    pergunta: "Como são chamadas as propriedades que passamos de um componente \"Pai\" para um componente \"Filho\" no React Native para que ele exiba informações dinâmicas?",
    opcoes: [
      "States",
      "Props",
      "Hooks",
      "Actions",
    ],
    correta: 1,
    explicacao: "Props (abreviação de properties/propriedades) são parâmetros enviados de um componente pai para um componente filho, permitindo reaproveitar o mesmo componente com dados diferentes (como um botão ou cartão dinâmico). Já o State guarda dados internos do próprio componente.",
  },
  {
    pergunta: "Qual é o sistema de layout padrão do React Native para organizar e alinhar componentes de forma dinâmica na tela, e qual é a sua direção padrão (flexDirection)?",
    opcoes: [
      "CSS Grid, com direção em linha (row)",
      "Flexbox, com direção em coluna (column)",
      "Flexbox, com direção em linha (row)",
      "Float Layout, com direção vertical (vertical)",
    ],
    correta: 1,
    explicacao: "O React Native utiliza o Flexbox por padrão para criar layouts dinâmicos que se adaptam a diferentes tamanhos de tela. Diferente do CSS na Web (onde o padrão é em linha/row), nos celulares o padrão do React Native é 'column', empilhando os elementos de cima para baixo.",
  },
  {
    pergunta: "Qual Hook do React é utilizado para armazenar valores que mudam ao longo do tempo (como o texto digitado pelo usuário ou um contador) e atualizar a tela automaticamente quando esse valor é alterado?",
    opcoes: [
      "useState",
      "useVariable",
      "useChange",
      "useProps",
    ],
    correta: 0,
    explicacao: "O Hook useState cria um estado local no componente e retorna o valor atual junto com uma função para atualizá-lo. Uma variável comum do JavaScript não avisa o React Native que a tela precisa ser redesenhada; já o useState atualiza a interface automaticamente sempre que o valor muda.",
  },
];
