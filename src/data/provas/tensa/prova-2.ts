import type { Questao } from '../tipos';

/** Provinha Tensa 2 — questões 6 a 10 da planilha de questões difíceis. */
export const questoesTensa2: Questao[] = [
  {
    pergunta: "Um desenvolvedor usou 'const relatorio = useMemo(() => gerarRelatorioPesado(filtros), [filtros])', mas declarou 'const filtros = { categoria: \"games\", ativo: true }' diretamente no corpo do componente, antes do useMemo. Por que o useMemo está sendo completamente inútil nesse código?",
    opcoes: [
      "Porque 'gerarRelatorioPesado' deveria ser chamado dentro de um 'useRef', já que o 'useMemo' apaga o retorno da função após 100 milissegundos.",
      "Porque o Hook 'useMemo' só aceita números inteiros no array de dependências, gerando erro silencioso ao receber objetos ou strings.",
      "Porque em JavaScript objetos literais ('{ ... }') criados no corpo do componente recebem um novo endereço de memória a cada renderização; como o React compara as dependências por referência, ele entende que 'filtros' mudou em toda renderização e recalcula o 'useMemo' sempre.",
      "Porque variáveis declaradas com 'const' não podem ser lidas por Hooks do React, sendo obrigatório usar 'var'.",
    ],
    correta: 2,
    explicacao: "Em JS, '{} === {}' é 'false' porque são duas referências distintas na memória. Se 'filtros' é recriado a cada renderização da tela, a dependência '[filtros]' sempre parecerá diferente para o React. A solução é passar os valores primitivos nas dependências ('[filtros.categoria, filtros.ativo]') ou manter 'filtros' em um 'useState'/'useMemo'.",
  },
  {
    pergunta: "Em um navegador Stack, a 'TelaLista' abre a 'TelaCadastro' via 'navigation.navigate(\"TelaCadastro\")'. Após cadastrar um novo item e voltar com 'navigation.goBack()', o desenvolvedor nota que o 'useEffect(() => { carregarItens(); }, [])' da 'TelaLista' NÃO rodou novamente para atualizar a lista. Por que isso acontece e qual recurso resolve esse cenário?",
    opcoes: [
      "Na navegação em Stack, quando avançamos para outra tela, a tela anterior permanece montada em segundo plano na pilha (não sofre unmount/mount ao voltar); para executar uma ação toda vez que a tela ganha foco, deve-se usar o Hook 'useFocusEffect' do React Navigation.",
      "O método 'navigation.goBack()' desativa todos os Hooks da tela anterior por segurança; a única solução é fechar e reabrir o aplicativo.",
      "O 'useEffect' com '[]' só roda quando o componente é desmontado; para rodar ao abrir a tela deve-se remover as chaves da função.",
      "A 'TelaLista' foi apagada da memória RAM, mas o componente <FlatList> bloqueia novas chamadas ao 'fetch()' após a primeira execução.",
    ],
    correta: 0,
    explicacao: "Diferente da Web, em uma pilha (Stack) do React Navigation a 'TelaLista' continua viva e montada por baixo da 'TelaCadastro'. Quando o usuário volta, ela apenas recupera o foco visual, mas não passa pela montagem ('mount') novamente. O Hook 'useFocusEffect' (combinado com 'useCallback') observa o ciclo de vida de foco da navegação.",
  },
  {
    pergunta: "Ao utilizar o componente <Modal> nativo do React Native para exibir uma janela de confirmação centralizada com um fundo escuro semi-transparente (ex.: 'backgroundColor: \"rgba(0,0,0,0.5)\"') permitindo ver a tela anterior por baixo, qual configuração é indispensável no <Modal>?",
    opcoes: [
      "A propriedade 'animationType' deve ser configurada como 'rgba', pois ela controla a cor de fundo e a transparência do modal.",
      "O componente <Modal> possui fundo transparente por padrão, mas exige que a tela anterior seja desmontada com 'navigation.replace()' antes de abrir.",
      "É necessário aplicar 'opacity: 0' no componente <Modal>, o que deixa apenas o fundo transparente mantendo os textos internos visíveis.",
      "É obrigatório ativar a propriedade 'transparent={true}' no componente <Modal>, caso contrário o modal preencherá toda a tela com um fundo opaco sólido, ignorando a transparência rgba definida na <View> interna.",
    ],
    correta: 3,
    explicacao: "Por padrão, a prop 'transparent' do <Modal> é 'false', fazendo o sistema nativo desenhar uma janela opaca sobre a tela. Ao definir 'transparent={true}' no <Modal> e estilizar uma <View> interna com 'flex: 1' e 'backgroundColor: rgba(0,0,0,0.5)', criamos o efeito de máscara escura translúcida sobre a tela atual.",
  },
  {
    pergunta: "Um desenvolvedor implementou uma chamada à API usando 'try { const res = await fetch(url); const dados = await res.json(); } catch (erro) { ... }'. Quando o servidor retornou erro 404 (Não Encontrado) ou 500 (Erro Interno), o código NÃO entrou no bloco 'catch'. Além disso, se o usuário sair da tela antes da resposta chegar, a requisição continua pendente. Como a API fetch() funciona nesses dois casos?",
    opcoes: [
      "O bloco 'catch' do JavaScript não funciona com 'async/await'; erros 404 e 500 só podem ser capturados usando o Hook 'useMemo'.",
      "O 'fetch()' só rejeita a Promise (caindo no 'catch') em caso de falha de rede (ex.: sem internet); para erros HTTP como 404 ou 500, é obrigatório verificar 'if (!res.ok) throw new Error(...)' manualmente, e usa-se 'AbortController' no cleanup do 'useEffect' para cancelar requisições pendentes ao desmontar a tela.",
      "O 'fetch()' ignora erros do servidor porque falta passar a propriedade 'catchHttpErrors: true' dentro do arquivo 'app.json'.",
      "Quando o servidor retorna status 404 ou 500, o 'fetch()' apaga automaticamente o armazenamento do 'AsyncStorage' e reinicia o aplicativo.",
    ],
    correta: 1,
    explicacao: "Essa é uma das pegadinhas clássicas do 'fetch()': se o servidor respondeu (mesmo com status 400, 401, 404 ou 500), a Promise do fetch é resolvida com sucesso e 'res.ok' vem como 'false'. Por isso precisamos checar 'if (!res.ok)'. Já o 'AbortController' permite abortar a requisição no 'return () => controller.abort()' do 'useEffect' caso o usuário saia da tela.",
  },
  {
    pergunta: "Sobre segurança na persistência de dados locais no celular e o gerenciamento avançado de alertas com 'expo-notifications', assinale a alternativa tecnicamente correta:",
    opcoes: [
      "Notificações Push remotas funcionam normalmente sem internet e não precisam de 'ExpoPushToken', bastando usar 'AsyncStorage.setItem(\"notificacao\", texto)'.",
      "O 'AsyncStorage' criptografa automaticamente todos os dados com chave militar no Android e iOS, enquanto o 'expo-secure-store' serve apenas para salvar fotos da galeria.",
      "O 'AsyncStorage' armazena dados sem criptografia (texto aberto no armazenamento do app), por isso tokens de autenticação e senhas devem ser salvos no 'expo-secure-store' (que usa Keychain no iOS e Keystore criptografado no Android); já para que notificações apareçam como banner mesmo com o app aberto em primeiro plano (foreground), é necessário configurar 'Notifications.setNotificationHandler()'.",
      "Os listeners de notificação ('addNotificationReceivedListener') são removidos sozinhos da memória sem precisar de cleanup no 'useEffect', e o 'expo-secure-store' aceita arquivos de vídeo de até 10 GB.",
    ],
    correta: 2,
    explicacao: "O AsyncStorage é ótimo para preferências e cache leve, mas não é criptografado. Dados sensíveis como tokens JWT devem ir para o 'expo-secure-store'. Já no 'expo-notifications', por padrão o sistema silencia alertas visuais quando o usuário já está com o app aberto, exigindo configurar 'setNotificationHandler' (definindo 'shouldShowBanner: true' / 'shouldShowAlert: true') para exibi-los em primeiro plano.",
  },
];
