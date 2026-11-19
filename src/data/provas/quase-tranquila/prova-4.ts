import type { Questao } from '../tipos';

/** Provinha Quase Tranquila 4 — questões 16 a 20 da planilha de questões médias. */
export const questoesQuaseTranquila4: Questao[] = [
  {
    pergunta: "Ao criar um cronômetro na tela, por que devemos guardar o ID do setInterval dentro de um useRef ('const timerRef = useRef(null)') em vez de usar uma variável comum ('let timerId = null') declarada dentro da função do componente?",
    opcoes: [
      "Porque uma variável comum 'let' declarada dentro do componente é reiniciada do zero a cada re-renderização da tela (perdendo o ID do intervalo), enquanto o 'useRef' mantém seu valor '.current' preservado durante todo o ciclo de vida do componente.",
      "Porque o JavaScript no React Native bloqueia o uso da palavra-chave 'let' dentro de componentes funcionais.",
      "Porque o 'useRef' atualiza os números do cronômetro na tela automaticamente sem precisar do 'useState'.",
      "Porque o 'setInterval' só aceita objetos gerados pelo pacote 'expo-notifications' ou 'useRef'.",
    ],
    correta: 0,
    explicacao: "A cada segundo que o estado do cronômetro muda, a função do componente roda novamente. Uma variável 'let' local voltaria a ser 'null' a cada segundo, impedindo o 'clearInterval' de parar o cronômetro depois. O 'useRef' preserva o mesmo objeto entre todas as renderizações.",
  },
  {
    pergunta: "Um aluno escreveu um useEffect que busca dados de uma API e salva o resultado com 'setUsuarios(dados)', mas esqueceu de colocar o array de dependências '[]' (ou colocou a própria variável 'usuarios' nas dependências), causando um loop infinito de requisições. Por que isso acontece?",
    opcoes: [
      "Porque a função fetch() repete a chamada automaticamente a cada segundo quando não encontra um componente <Modal>.",
      "Porque sem o array vazio (ou dependendo do próprio estado que ele altera), o useEffect roda após a renderização, chama 'setUsuarios', o que provoca uma nova renderização, que dispara o useEffect novamente sem parar.",
      "Porque o Expo Go recarrega o aplicativo sempre que uma variável useState recebe uma lista JSON.",
      "Porque o useEffect só pode conter código síncrono e nunca chamadas a estados.",
    ],
    correta: 1,
    explicacao: "Todo 'setState' agenda uma re-renderização do componente. Se o 'useEffect' não tiver o array vazio '[]' para limitar sua execução à montagem da tela, ele rodará a cada nova renderização causada pelo próprio 'setUsuarios', criando um ciclo infinito.",
  },
  {
    pergunta: "Após o usuário fazer login com sucesso na 'TelaLogin', o desenvolvedor quer levá-lo para a 'TelaHome' de modo que, ao apertar o botão de voltar do celular, o usuário NÃO retorne para a tela de login. Qual método da navegação em Stack deve ser usado?",
    opcoes: [
      "navigation.navigate('TelaHome')",
      "navigation.replace('TelaHome') (ou reset da pilha)",
      "navigation.goBack('TelaHome')",
      "navigation.openModal('TelaHome')",
    ],
    correta: 1,
    explicacao: "Enquanto 'navigation.navigate()' apenas empilha a 'TelaHome' em cima da 'TelaLogin' (permitindo voltar para o login ao pressionar voltar), o método 'navigation.replace()' substitui a tela atual na pilha de navegação pela nova tela, removendo a tela de login do histórico.",
  },
  {
    pergunta: "Ao enviar os dados de um formulário de cadastro ({ nome, email }) para uma API REST utilizando a função fetch(), como a requisição deve ser configurada?",
    opcoes: [
      "Basta passar o objeto como segundo parâmetro: fetch(url, { nome, email }), pois o método padrão já é POST.",
      "Deve-se configurar o segundo parâmetro do fetch com 'method: \"POST\"', o cabeçalho 'headers: { \"Content-Type\": \"application/json\" }' e o corpo convertido em texto com 'body: JSON.stringify({ nome, email })'.",
      "Deve-se usar 'method: \"GET\"' e passar o objeto dentro de um AsyncStorage antes de chamar o fetch.",
      "O fetch() serve apenas para buscar dados (GET); para enviar dados (POST) é obrigatório usar o componente <WebView>.",
    ],
    correta: 1,
    explicacao: "Por padrão, o 'fetch(url)' faz apenas uma requisição GET. Para cadastrar ou enviar dados a um webservice, precisamos especificar o método HTTP ('POST' ou 'PUT'), avisar ao servidor no cabeçalho ('headers') que estamos enviando um JSON e serializar o objeto no 'body' com 'JSON.stringify()'.",
  },
  {
    pergunta: "Para que um aplicativo recupere automaticamente o tema preferido do usuário salvo no AsyncStorage assim que é aberto, e para agendar uma notificação local usando 'expo-notifications', qual combinação de recursos é utilizada?",
    opcoes: [
      "Uma função assíncrona chamada dentro de um 'useEffect(..., [])' que executa 'await AsyncStorage.getItem()' e atualiza o estado; e a função 'Notifications.scheduleNotificationAsync()' passando o 'content' (título/corpo) e o 'trigger' (gatilho de disparo).",
      "Chamar 'AsyncStorage.getItem()' diretamente dentro do StyleSheet.create(); e usar 'alert()' do JavaScript para criar notificações na barra de status com celular bloqueado.",
      "Usar o Hook 'useMemo' para ler o banco de dados sem 'await'; e usar 'fetch()' para disparar notificações locais sem precisar da biblioteca expo-notifications.",
      "Salvar o tema no arquivo package.json em tempo de execução; e usar a propriedade 'visible' do componente <Modal> para agendar notificações em segundo plano.",
    ],
    correta: 0,
    explicacao: "Como a leitura do AsyncStorage é assíncrona (retorna uma Promise), ela deve ser executada na montagem do componente ('useEffect' com '[]') para carregar o 'useState'. Já no 'expo-notifications', o método 'scheduleNotificationAsync' agenda alertas locais definindo o conteúdo ('content') e o gatilho de tempo ('trigger').",
  },
];
