import type { Questao } from '../tipos';

/** Provinha Tensa 1 — questões 1 a 5 da planilha de questões difíceis. */
export const questoesTensa1: Questao[] = [
  {
    pergunta: "Durante o desenvolvimento de um aplicativo React Native com Expo, a equipe precisou adicionar um módulo nativo de terceiros que exige alterações no AndroidManifest.xml e no Info.plist (código nativo customizado fora do SDK padrão do aplicativo Expo Go). Como o ecossistema moderno do Expo resolve essa necessidade sem perder a configuração centralizada no app.json?",
    opcoes: [
      "Basta rodar 'npx expo start --web', pois o Expo Go compila códigos nativos em C++ e Swift em tempo real diretamente pelo navegador do celular.",
      "Utilizando Config Plugins no 'app.json' em conjunto com um Development Build ('npx expo run:android' / EAS Build), que gera as pastas nativas sob demanda (Prebuild) com as configurações injetadas.",
      "Copiando manualmente os arquivos '.java' e '.swift' para dentro da pasta 'assets' e importando-os com o Hook useMemo.",
      "Não é possível usar código nativo customizado com Expo; a única solução é reescrever todo o aplicativo do zero sem usar React Native.",
    ],
    correta: 1,
    explicacao: "O aplicativo Expo Go já vem pré-compilado das lojas com um conjunto fixo de bibliotecas nativas (SDK). Quando precisamos de código nativo customizado ou alterar arquivos nativos, usamos Config Plugins no 'app.json' e criamos uma Development Build (via Prebuild / EAS), que gera um app de desenvolvimento próprio para o projeto.",
  },
  {
    pergunta: "Em uma <FlatList> que exibe centenas de cartões complexos (<CardProduto />), o desenvolvedor percebeu que digitar uma única letra em um <TextInput> no topo da mesma tela faz todos os cartões da lista serem re-renderizados, causando engasgos. Mesmo envolvendo <CardProduto /> em React.memo(), o problema continuou porque o cartão recebe uma prop 'onFavoritar={(id) => favoritar(id)}'. Por que isso ocorre e como corrigir?",
    opcoes: [
      "Porque funções passadas inline ('() => ...') criam uma nova referência de memória a cada renderização do componente Pai, invalidando a comparação rasa do React.memo; corrige-se memorizando a função com 'useCallback' e extraindo o 'renderItem'.",
      "Porque o React.memo apaga o estado da <FlatList> toda vez que o teclado abre; corrige-se trocando a <FlatList> por uma <ScrollView> com flexDirection: 'row'.",
      "Porque o componente <TextInput> bloqueia a thread principal do Android permanentemente; corrige-se salvando cada letra digitada no AsyncStorage antes de exibir na tela.",
      "Porque a propriedade 'keyExtractor' está retornando strings únicas; para o React.memo funcionar, todas as chaves da lista devem ter o mesmo valor '0'.",
    ],
    correta: 0,
    explicacao: "Quando o estado do <TextInput> muda, a tela Pai re-renderiza e recria todas as funções declaradas dentro dela com novos endereços de memória. Como o 'React.memo' compara as props antigas e novas por referência, ele acha que a prop 'onFavoritar' mudou. Usando 'useCallback', a referência da função é mantida estável entre renderizações.",
  },
  {
    pergunta: "Ao arquitetar um componente de layout reutilizável <CardContainer> que deve envolver conteúdos arbitrários passados entre suas tags de abertura e fechamento (<CardContainer><Text>Olá</Text><Button ... /></CardContainer>), e considerando o compartilhamento de dados profundos na árvore de componentes, assinale a alternativa correta:",
    opcoes: [
      "Para acessar os elementos internos é obrigatório usar 'useRef.children()', e o Prop Drilling é obrigatório porque dados só descem um nível por vez no React Native.",
      "O React Native proíbe colocar componentes dentro de outros componentes criados pelo desenvolvedor; apenas a tag nativa <View> aceita elementos filhos.",
      "Os elementos internos são recebidos automaticamente pela prop especial 'children', permitindo composição; já para evitar repassar Props manualmente por vários níveis intermediários que não as utilizam (Prop Drilling), utiliza-se a Context API ('createContext' / 'useContext').",
      "A prop 'children' converte todos os componentes filhos em strings de texto puro, exigindo um componente <Text> ao redor de todo o aplicativo.",
    ],
    correta: 2,
    explicacao: "A prop 'children' contém tudo o que é passado entre a abertura e o fechamento de um componente customizado, sendo a base do padrão de Composição no React. Quando um dado (como usuário logado ou tema) precisa atravessar muitas camadas de componentes (Prop Drilling), a Context API permite consumi-lo diretamente com 'useContext'.",
  },
  {
    pergunta: "Um desenvolvedor colocou um formulário dentro de um <ScrollView style={{ flex: 1, justifyContent: 'center' }}> para centralizar os campos na tela quando houver pouco conteúdo, mas o aplicativo apresentou erro ou comportamento inesperado no alinhamento interno da rolagem. Qual é a causa técnica disso no React Native?",
    opcoes: [
      "O <ScrollView> exige que todos os seus filhos diretos sejam componentes <Text> sem nenhuma <View> intermediária.",
      "O componente <ScrollView> não suporta Flexbox no React Native, aceitando apenas posicionamento absoluto ('position: absolute') em pixels fixos.",
      "A propriedade 'justifyContent: center' só funciona se o componente estiver dentro de um <Modal> com 'flexDirection: row-reverse'.",
      "No <ScrollView>, a prop 'style' estiliza apenas o contêiner externo (a janela visível), enquanto os estilos de alinhamento dos elementos filhos internos (como 'justifyContent', 'alignItems' e 'flexGrow: 1') devem ser passados na propriedade 'contentContainerStyle'.",
    ],
    correta: 3,
    explicacao: "Internamente, o <ScrollView> possui duas camadas: a moldura externa e o contêiner de conteúdo rolável que envolve os filhos. Propriedades de distribuição do Flexbox como 'justifyContent' e 'alignItems' precisam ser aplicadas no 'contentContainerStyle' (frequentemente usando 'flexGrow: 1' em vez de 'flex: 1' para preservar a rolagem quando o conteúdo crescer).",
  },
  {
    pergunta: "Considere um componente com 'const [segundos, setSegundos] = useState(0)' e um 'useEffect(() => { const id = setInterval(() => { console.log(segundos); setSegundos(segundos + 1); }, 1000); return () => clearInterval(id); }, [])'. Por que o console imprime sempre 0 e a tela trava em 1 segundo, mesmo o intervalo continuando ativo?",
    opcoes: [
      "Porque o 'return () => clearInterval(id)' é executado imediatamente antes do primeiro segundo, cancelando o cronômetro na montagem da tela.",
      "Ocorre o fenômeno de 'Stale Closure' (closure defasada): como o useEffect tem array de dependências vazio '[]', a função do setInterval capturou a variável 'segundos' da primeira renderização (valor 0) para sempre; corrige-se usando a atualização funcional 'setSegundos(prev => prev + 1)'.",
      "Porque o 'setInterval' não funciona no JavaScript do React Native, sendo obrigatório usar o pacote 'expo-notifications' para contar segundos.",
      "Porque o 'useState' congela automaticamente qualquer variável que seja lida dentro de um 'console.log'.",
    ],
    correta: 1,
    explicacao: "No JavaScript, uma função criada na montagem (devido ao '[]') mantém referência ao escopo daquela primeira renderização, onde 'segundos' valia 0. Assim, a cada segundo ela calcula '0 + 1'. Usar 'setSegundos(prev => prev + 1)' permite atualizar o estado com base no valor mais recente sem depender da variável capturada na closure.",
  },
];
