import type { Questao } from '../tipos';

/** Provinha Quase Tranquila 1 — questões 1 a 5 da planilha de questões médias. */
export const questoesQuaseTranquila1: Questao[] = [
  {
    pergunta: "Em um projeto React Native com Expo, qual é a vantagem de utilizar o comando 'npx expo install nome-do-pacote' em vez de 'npm install nome-do-pacote' ao instalar bibliotecas nativas do ecossistema (como câmera, notificações ou armazenamento)?",
    opcoes: [
      "O comando 'npx expo install' baixa os pacotes sem precisar de conexão com a internet, usando apenas o cache do sistema operacional.",
      "Ele verifica automaticamente a versão do SDK do Expo configurada no projeto e instala a versão exata da biblioteca que é compatível com ela, evitando conflitos de versão.",
      "Ele instala a biblioteca diretamente na memória do celular conectado, sem adicionar o pacote ao arquivo package.json do projeto.",
      "Ele converte automaticamente qualquer biblioteca feita exclusivamente para páginas HTML da Web em um componente nativo para Android e iOS.",
    ],
    correta: 1,
    explicacao: "O comando 'npm install' baixa, por padrão, a versão mais recente publicada da biblioteca, que muitas vezes pode ser incompatível com a versão atual do SDK do Expo do seu projeto. Já o 'npx expo install' consulta a tabela de compatibilidade do Expo e instala a versão exata testada para aquele SDK.",
  },
  {
    pergunta: "Um desenvolvedor criou uma tela para listar produtos usando o componente <FlatList>, mas o console exibiu um alerta sobre falta de chaves únicas ('VirtualizedList: missing keys for items') e um erro porque o preço foi colocado solto dentro de uma <View>. Como esses dois problemas devem ser corrigidos?",
    opcoes: [
      "Adicionando a propriedade 'idList' na <View> e trocando a <FlatList> por um componente <Modal>.",
      "Configurando a propriedade 'keyExtractor' na <FlatList> para retornar um identificador único (em string) de cada item, e envolvendo o valor do preço dentro de um componente <Text>.",
      "Envolvendo toda a <FlatList> dentro de um componente <Text> e adicionando o Hook useMemo no arquivo app.json.",
      "Removendo a propriedade 'renderItem' da <FlatList> e aplicando 'flexDirection: row' na <View> do produto.",
    ],
    correta: 1,
    explicacao: "No React Native, o 'keyExtractor' (ex.: keyExtractor={(item) => String(item.id)}) ajuda o React a identificar cada item da lista de forma única para otimizar a renderização. Além disso, qualquer texto ou número exibido na tela nunca pode ficar solto diretamente dentro de uma <View>, devendo sempre estar dentro de um <Text>.",
  },
  {
    pergunta: "Sabendo que as Props no React Native são somente leitura (imutáveis pelo componente Filho), qual é o padrão correto quando um componente Filho (como um cartão de tarefa com um botão 'Concluir') precisa atualizar uma informação que está guardada no estado (useState) do componente Pai?",
    opcoes: [
      "O componente Filho deve alterar diretamente o objeto 'props' fazendo 'props.concluida = true' dentro do evento de clique.",
      "O componente Pai deve passar uma função como Prop para o componente Filho (ex.: onConcluir), e o Filho chama essa função passando o ID ou novo valor quando o botão for pressionado.",
      "O componente Filho deve importar o arquivo do componente Pai e sobrescrever a variável useState dele usando o comando fetch().",
      "Não é possível comunicar eventos do Filho para o Pai no React Native; todo botão precisa obrigatoriamente ficar no arquivo App.js.",
    ],
    correta: 1,
    explicacao: "Como o fluxo de dados no React é unidirecional (de Pai para Filho) e as Props são imutáveis no Filho, a comunicação inversa é feita passando uma função (callback) via Props. Quando o usuário clica no Filho, ele executa a função recebida do Pai, e o próprio Pai atualiza seu useState.",
  },
  {
    pergunta: "Ao construir um cabeçalho (Header) personalizado com uma <View> onde o logotipo deve ficar na esquerda e o botão de perfil na extrema direita da mesma linha horizontal, verticalmente centralizados, qual combinação de estilos Flexbox deve ser aplicada nessa <View>?",
    opcoes: [
      "flexDirection: 'column', justifyContent: 'center' e alignItems: 'space-between'",
      "flexDirection: 'row', justifyContent: 'space-between' e alignItems: 'center'",
      "flexDirection: 'row', justifyContent: 'center' e alignItems: 'space-between'",
      "flexDirection: 'column-reverse', justifyContent: 'flex-start' e alignItems: 'stretch'",
    ],
    correta: 1,
    explicacao: "Ao mudar o 'flexDirection' para 'row', o eixo principal passa a ser o horizontal e o eixo cruzado passa a ser o vertical. Assim, 'justifyContent: space-between' empurra o primeiro item para a esquerda e o último para a direita na horizontal, enquanto 'alignItems: center' centraliza os dois verticalmente.",
  },
  {
    pergunta: "Considere o estado 'const [tarefas, setTarefas] = useState([\"Estudar\", \"Treinar\"])'. Por que usar 'tarefas.push(\"Ler\"); setTarefas(tarefas);' NÃO atualiza a lista na tela, e qual é a forma correta de adicionar um novo item ao estado?",
    opcoes: [
      "Porque o método push() apaga o array original; o correto é usar 'setTarefas(\"Ler\")'.",
      "Porque 'tarefas.push()' modifica o mesmo array na memória mantendo a mesma referência, fazendo o React ignorar a re-renderização; o correto é criar um novo array com spread operator: 'setTarefas([...tarefas, \"Ler\"])'.",
      "Porque o Hook useState não aceita arrays ou listas; o correto é usar o useRef para desenhar listas dinâmicas na tela.",
      "Porque arrays no React Native só podem ser alterados dentro do arquivo package.json antes de iniciar o aplicativo.",
    ],
    correta: 1,
    explicacao: "O React verifica se o estado mudou comparando a referência na memória. Quando fazemos '.push()' no próprio array, o endereço de memória continua igual e a tela não atualiza. Usando '[...tarefas, novaTarefa]', criamos um novo array copiando os itens antigos mais o novo, disparando a re-renderização corretamente.",
  },
];
