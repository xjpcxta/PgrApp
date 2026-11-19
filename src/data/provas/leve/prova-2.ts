import type { Questao } from '../tipos';

/** Provinha Leve 2 — questões 6 a 10 da planilha de questões fáceis. */
export const questoesLeve2: Questao[] = [
  {
    pergunta: "Entre os Hooks do React, qual é a diferença principal entre o useRef e o useMemo?",
    opcoes: [
      "useRef serve para criar rotas de navegação e useMemo salva dados no banco de dados do celular.",
      "useRef guarda uma referência mutável (ou elemento de tela) sem causar nova renderização, enquanto useMemo memoriza o resultado de um cálculo para evitar reprocessamentos desnecessários.",
      "useRef substitui o useState em todas as telas e useMemo serve apenas para aplicar estilos CSS.",
      "Não há diferença, ambos servem apenas para buscar dados da internet.",
    ],
    correta: 1,
    explicacao: "Alterar o valor de um useRef não faz a tela re-renderizar (ótimo para focar um campo de texto ou guardar referências auxiliares). Já o useMemo guarda em cache o retorno de um cálculo pesado, recalculando apenas se suas dependências mudarem.",
  },
  {
    pergunta: "Para executar uma ação exatamente uma única vez assim que a tela abre (fase de montagem do ciclo de vida do componente), qual Hook e configuração devemos utilizar?",
    opcoes: [
      "useState() sem parâmetros",
      "useEffect(() => { ... }, []) com um array de dependências vazio",
      "useMemo() dentro de um botão",
      "useLifecycle('start')",
    ],
    correta: 1,
    explicacao: "O Hook useEffect gerencia o ciclo de vida dos componentes funcionais (montagem, atualização e desmontagem). Quando passamos os colchetes vazios '[]' como segundo parâmetro, indicamos ao React que aquele código deve rodar apenas uma vez, no momento em que o componente aparece na tela.",
  },
  {
    pergunta: "Sobre a navegação entre telas com Stack (pilha) e o uso do componente <Modal> no React Native, assinale a alternativa correta:",
    opcoes: [
      "A navegação em Stack empilha telas permitindo avançar e voltar ao histórico anterior, enquanto o <Modal> exibe uma janela sobreposta à tela atual para avisos ou confirmações.",
      "O <Modal> apaga todas as telas do aplicativo e o Stack serve apenas para exibir alertas de erro.",
      "Não é possível voltar para a tela anterior quando usamos navegação em Stack.",
      "O componente <Modal> só funciona se o celular estiver conectado à internet.",
    ],
    correta: 0,
    explicacao: "A navegação em Stack (pilha) funciona colocando uma nova tela sobre a anterior, permitindo que o usuário volte facilmente pelo botão de retorno. Já o <Modal> abre uma camada temporária focada por cima da própria tela em que o usuário está.",
  },
  {
    pergunta: "Quando um aplicativo React Native precisa buscar ou enviar informações para um servidor na internet (Webservice / API), qual função nativa do JavaScript é comumente utilizada junto com async/await?",
    opcoes: [
      "StyleSheet.create()",
      "fetch()",
      "View.connect()",
      "React.memo()",
    ],
    correta: 1,
    explicacao: "A função fetch() realiza chamadas HTTP (como GET e POST) para se comunicar com Webservices e APIs externas, geralmente trocando dados em formato JSON. Usamos async/await porque a comunicação pela internet é assíncrona (leva um tempo para responder) e não pode travar o aplicativo.",
  },
  {
    pergunta: "No React Native com Expo, quais recursos são utilizados, respectivamente, para salvar dados localmente no aparelho (persistência de dados mesmo após fechar o app) e para trabalhar com notificações no celular?",
    opcoes: [
      "expo-camera e expo-av",
      "AsyncStorage (ou expo-secure-store) e expo-notifications",
      "React-Router e React-Alert",
      "useState e console.log",
    ],
    correta: 1,
    explicacao: "Como os dados do useState são apagados quando o aplicativo é fechado, usamos bibliotecas de persistência como o AsyncStorage (ou expo-secure-store para dados sensíveis) para gravar dados na memória do aparelho. Já o pacote expo-notifications é a ferramenta oficial do Expo para agendar e receber notificações locais e push.",
  },
];
