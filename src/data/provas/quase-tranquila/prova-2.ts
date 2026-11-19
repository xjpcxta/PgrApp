import type { Questao } from '../tipos';

/** Provinha Quase Tranquila 2 — questões 6 a 10 da planilha de questões médias. */
export const questoesQuaseTranquila2: Questao[] = [
  {
    pergunta: "Em uma tela de catálogo com milhares de produtos e uma barra de busca, um desenvolvedor quer: (1) evitar que a filtragem pesada da lista seja recalculada quando outros estados não relacionados mudarem, e (2) guardar a referência do <TextInput> para focar o teclado automaticamente ao clicar em um ícone de lupa. Quais Hooks devem ser usados para (1) e (2), respectivamente?",
    opcoes: [
      "useEffect e useState",
      "useMemo e useRef",
      "useRef e useMemo",
      "useState e useCallback",
    ],
    correta: 1,
    explicacao: "Para o caso (1), o 'useMemo' memoriza o array filtrado e só refaz o cálculo quando a lista de produtos ou o texto da busca realmente mudarem. Para o caso (2), o 'useRef' é conectado à prop 'ref' do <TextInput>, permitindo chamar 'inputRef.current.focus()' diretamente sem causar re-renderizações desnecessárias.",
  },
  {
    pergunta: "No ciclo de vida de um componente funcional, qual é a finalidade de retornar uma função ('return () => { ... }') dentro de um Hook useEffect?",
    opcoes: [
      "Fazer o componente voltar para a tela anterior da navegação Stack automaticamente.",
      "Executar uma rotina de limpeza (cleanup) quando o componente for desmontado da tela (ou antes do efeito rodar novamente), evitando vazamento de memória com timers (setInterval) ou listeners ativos.",
      "Transformar o resultado do useEffect em um componente visual <View> para ser exibido no rodapé da tela.",
      "Impedir que o estado (useState) do componente seja alterado pelo usuário enquanto a tela estiver aberta.",
    ],
    correta: 1,
    explicacao: "A função retornada pelo useEffect representa a fase de desmontagem (unmount) e limpeza do ciclo de vida. Se uma tela cria um cronômetro com setInterval ou escuta eventos de sensores/notificações, essa função de retorno cancela esses processos quando o usuário sai da tela.",
  },
  {
    pergunta: "Em um aplicativo com navegação em pilha (Stack Navigator), a 'TelaProdutos' precisa abrir a 'TelaDetalhes' enviando o ID do produto clicado. Além disso, a 'TelaDetalhes' possui um <Modal> que deve fechar quando o usuário pressiona o botão físico/gesto de voltar no Android. Como esses dois recursos funcionam?",
    opcoes: [
      "Envia-se com 'navigation.navigate(\"TelaDetalhes\", { id: 10 })', lê-se na outra tela com 'route.params.id', e no <Modal> usa-se a propriedade 'onRequestClose' para atualizar o estado que fecha o modal.",
      "Envia-se com 'navigation.pushParams(10)', lê-se com 'useState(id)', e no <Modal> usa-se a propriedade 'onAndroidBack'.",
      "Envia-se salvando no arquivo app.json, lê-se com 'props.navigation.id', e o <Modal> fecha sozinho sem precisar de propriedades.",
      "Envia-se com 'fetch(\"TelaDetalhes/10\")', lê-se com 'useRef()', e no <Modal> usa-se a propriedade 'visible={close}'.",
    ],
    correta: 0,
    explicacao: "No React Navigation (Stack), o segundo argumento de 'navigation.navigate(nomeDaRota, objetoDeParametros)' envia dados que ficam acessíveis em 'route.params' na tela de destino. Já no componente <Modal>, a prop 'onRequestClose' é acionada quando o usuário tenta fechar o modal pelo botão/gesto de voltar do sistema.",
  },
  {
    pergunta: "Ao consumir um Webservice (API REST) usando 'fetch()' dentro de uma função assíncrona (async/await), qual é a estrutura recomendada para exibir um indicador de carregamento (<ActivityIndicator>), tratar possíveis falhas de rede e garantir que o carregamento seja encerrado dando certo ou errado?",
    opcoes: [
      "Usar um bloco 'if/else' simples apenas ao redor do componente <View>, pois o fetch() interrompe o carregamento sozinho em caso de erro.",
      "Ativar o estado de loading antes da requisição e utilizar um bloco 'try / catch / finally': no 'try' converter a resposta com 'await response.json()' e salvar os dados; no 'catch' tratar o erro; e no 'finally' desativar o estado de loading.",
      "Colocar o comando 'fetch()' diretamente dentro do StyleSheet.create() para que os dados carreguem junto com as cores da tela.",
      "Executar o 'fetch()' sem 'await' e usar o Hook useMemo para capturar erros de conexão com a internet.",
    ],
    correta: 1,
    explicacao: "Requisições pela internet podem falhar (sem sinal, servidor fora do ar). O bloco 'try' executa a busca e conversão JSON; se ocorrer falha, o fluxo cai no 'catch' (onde exibimos uma mensagem amigável sem travar o app); e o 'finally' roda sempre ao final de tudo, garantindo que o 'setLoading(false)' esconda o ícone de carregamento.",
  },
  {
    pergunta: "Um desenvolvedor precisa salvar um objeto de usuário '{ nome: \"Ana\", tema: \"escuro\" }' localmente no aparelho usando AsyncStorage e também agendar uma notificação local com 'expo-notifications'. Quais cuidados técnicos são obrigatórios nessas duas tarefas?",
    opcoes: [
      "O AsyncStorage salva apenas textos (strings), exigindo 'JSON.stringify()' ao salvar e 'JSON.parse()' ao ler; e o 'expo-notifications' exige solicitar a permissão do usuário antes de exibir notificações.",
      "O AsyncStorage exige que o objeto seja convertido em imagem antes de salvar; e o 'expo-notifications' funciona apenas se o dados forem salvos antes no useState.",
      "O AsyncStorage salva objetos JavaScript diretamente sem conversão; porém os dados são apagados sempre que a tela sofre uma re-renderização.",
      "O AsyncStorage só funciona com internet ativa; e o 'expo-notifications' envia notificações sem precisar de permissão ou configuração de handler no aplicativo.",
    ],
    correta: 0,
    explicacao: "Como o AsyncStorage armazena apenas pares de chave/valor em formato string, objetos e arrays precisam ser serializados com 'JSON.stringify(objeto)' no 'setItem' e reconstruídos com 'JSON.parse(texto)' no 'getItem'. Já para notificações, os sistemas Android e iOS exigem verificar/pedir permissão ao usuário (requestPermissionsAsync) para que os alertas possam ser exibidos.",
  },
];
