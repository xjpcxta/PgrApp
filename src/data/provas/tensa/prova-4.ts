import type { Questao } from '../tipos';

/** Provinha Tensa 4 — questões 16 a 20 da planilha de questões difíceis. */
export const questoesTensa4: Questao[] = [
  {
    pergunta: "Quando um componente Pai cria 'const inputRef = useRef(null)' e tenta passá-lo para um componente Filho customizado '<MeuInputCustomizado ref={inputRef} />', a referência não funciona automaticamente como em um <TextInput> nativo. Como o React permite que um componente Filho customizado receba e exponha uma 'ref' para o componente Pai?",
    opcoes: [
      "Basta renomear o arquivo do componente Filho para 'useRef.js' que o Expo conecta a referência sozinho.",
      "Passando o 'useRef' dentro de um 'AsyncStorage' no Pai e lendo com 'useMemo' no Filho.",
      "Envolvendo o componente Filho com 'React.forwardRef((props, ref) => ...)' para encaminhar a 'ref' ao <TextInput> interno (ou utilizando 'useImperativeHandle' para expor métodos específicos).",
      "Não é permitido usar 'useRef' quando o projeto possui mais de um arquivo de componente.",
    ],
    correta: 2,
    explicacao: "Por padrão, 'ref' não é uma prop comum (como 'titulo' ou 'cor') e não entra no objeto 'props' de componentes funcionais customizados. Usamos 'forwardRef' para permitir que o componente Filho receba a 'ref' enviada pelo Pai e a encaminhe para o '<TextInput>' nativo lá dentro.",
  },
  {
    pergunta: "Se o usuário estiver com a tela do aplicativo aberta e minimizar o app (indo para a tela inicial do celular ou abrindo outro aplicativo) sem fechá-lo definitivamente, o componente da tela atual NÃO sofre desmontagem (unmount). Como o desenvolvedor pode detectar no React Native que o aplicativo foi para segundo plano ('background') ou voltou para o primeiro plano ('active')?",
    opcoes: [
      "Usando um 'useEffect' vazio '[]', pois ele roda automaticamente toda vez que o usuário minimiza o aplicativo.",
      "Registrando um listener na API nativa 'AppState' ('AppState.addEventListener(\"change\", proximoEstado => ...)') dentro de um 'useEffect' e removendo esse listener na função de cleanup.",
      "Verificando a propriedade 'visible' do componente <View> principal da tela.",
      "Fazendo uma requisição 'fetch(\"http://localhost/status\")' a cada milissegundo.",
    ],
    correta: 1,
    explicacao: "Minimizar o aplicativo não desmonta os componentes da árvore do React. Para pausar vídeos, salvar rascunhos ou atualizar dados quando o usuário minimiza ('background') ou reabre ('active') o app, utiliza-se o módulo 'AppState' do React Native monitorado dentro de um 'useEffect'.",
  },
  {
    pergunta: "Na arquitetura moderna do React Navigation para separar telas públicas ('TelaLogin', 'TelaCadastro') de telas privadas ('TelaHome', 'TelaPerfil'), qual é a abordagem recomendada para garantir segurança e evitar que o usuário consiga voltar para o login após autenticar (ou acessar telas privadas após fazer logout)?",
    opcoes: [
      "Renderizar condicionalmente os grupos de '<Stack.Screen>' dentro do '<Stack.Navigator>' com base em um estado global de autenticação (ex.: 'usuarioToken ? <TelasPrivadas /> : <TelasPublicas />'), fazendo o React Navigation trocar e limpar a pilha automaticamente.",
      "Deixar todas as telas misturadas sem verificação e esconder apenas o botão de login usando 'opacity: 0'.",
      "Criar dois arquivos 'app.json' diferentes, um para o usuário deslogado e outro para o usuário logado.",
      "Usar o componente '<Modal>' como única tela privada do aplicativo, pois o Stack Navigator não aceita estados.",
    ],
    correta: 0,
    explicacao: "Ao declarar telas condicionalmente no Stack Navigator com base no estado do token (geralmente vindo de um AuthContext hidratado pelo SecureStore/AsyncStorage), quando o usuário faz login as telas públicas deixam de existir na árvore de navegação, impossibilitando voltar a elas pelo botão físico de retorno.",
  },
  {
    pergunta: "Em uma tela de Dashboard que precisa buscar simultaneamente dados de '/perfil' e '/pedidos' (independentes entre si) no menor tempo possível, e em uma barra de busca que dispara 'fetch()' a cada letra digitada, quais técnicas evitam, respectivamente, a lentidão de chamadas em série e o problema de uma resposta antiga chegar depois da mais recente (Race Condition)?",
    opcoes: [
      "Usar dois 'await fetch()' em linhas separadas para rodar em paralelo; e usar 'JSON.stringify()' para evitar Race Condition.",
      "Usar 'AsyncStorage' no lugar do 'fetch()'; e desativar o teclado a cada letra digitada pelo usuário.",
      "Usar 'useMemo' para fazer chamadas HTTP; e envolver o <TextInput> em um <ScrollView>.",
      "Disparar as requisições independentes em paralelo com 'await Promise.all([fetch(url1), fetch(url2)])'; e na barra de busca aplicar Debounce (atraso controlado) aliado ao cancelamento da requisição anterior via 'AbortController' (ou flag de controle no cleanup do useEffect).",
    ],
    correta: 3,
    explicacao: "Dois 'await' seguidos esperam a primeira requisição terminar para só então iniciar a segunda (em série); já o 'Promise.all' dispara ambas juntas em paralelo. Na busca dinâmica, se a busca por 're' demorar mais na rede do que 'rea', ela pode sobrescrever a tela com dados atrasados (Race Condition), o que é resolvido cancelando a requisição anterior no cleanup do useEffect e usando Debounce.",
  },
  {
    pergunta: "Quando um aplicativo envia uma notificação contendo dados extras no payload ('content: { title: \"Novo Pedido\", data: { pedidoId: 42 } }'), como o código React Native identifica que o usuário TOCOU na notificação na barra do sistema para abrir diretamente a 'TelaDetalhes' daquele pedido?",
    opcoes: [
      "O componente <View> detecta o toque na barra de status automaticamente através da propriedade 'onPressNotification'.",
      "O clique na notificação salva o 'pedidoId' sozinho dentro do 'useState' da 'TelaDetalhes' sem precisar de código.",
      "Através do listener 'Notifications.addNotificationResponseReceivedListener(response => ...)' (ou do Hook 'useLastNotificationResponse'), de onde se extrai 'response.notification.request.content.data.pedidoId' para acionar 'navigation.navigate(\"TelaDetalhes\", { id: pedidoId })'.",
      "Através da função 'fetch(\"expo://notification\")', que só funciona se o celular estiver conectado via cabo USB no computador.",
    ],
    correta: 2,
    explicacao: "No 'expo-notifications', existem dois eventos distintos: 'addNotificationReceivedListener' (disparado quando a notificação chega no aparelho com o app aberto) e 'addNotificationResponseReceivedListener' (disparado quando o usuário interage/clica na notificação), permitindo ler o objeto 'data' e navegar até a tela correspondente.",
  },
];
