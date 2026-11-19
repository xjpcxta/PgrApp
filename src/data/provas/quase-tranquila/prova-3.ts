import type { Questao } from '../tipos';

/** Provinha Quase Tranquila 3 — questões 11 a 15 da planilha de questões médias. */
export const questoesQuaseTranquila3: Questao[] = [
  {
    pergunta: "Ao compartilhar um projeto React Native (Expo) no GitHub ou enviá-lo para outro desenvolvedor, qual pasta NÃO deve ser enviada (ficando listada no .gitignore) e qual comando o outro desenvolvedor deve rodar para reconstruí-la a partir do package.json?",
    opcoes: [
      "A pasta 'assets' não deve ser enviada, e o comando 'npx expo start' recria todas as imagens automaticamente.",
      "A pasta 'node_modules' não deve ser enviada por ser muito pesada, e o comando 'npm install' (ou 'npx expo install') baixa novamente todas as dependências listadas no package.json.",
      "A pasta 'src' não deve ser enviada, e o comando 'npm build' recria os componentes de tela automaticamente.",
      "O arquivo 'package.json' não deve ser enviado, pois a pasta 'node_modules' já contém o código-fonte das telas criadas pelo programador.",
    ],
    correta: 1,
    explicacao: "A pasta 'node_modules' armazena os arquivos de todas as bibliotecas externas e pode ocupar centenas de megabytes. Por boas práticas, ela fica no '.gitignore' e qualquer pessoa que baixe o projeto só precisa rodar 'npm install' para que o Node leia o 'package.json' e recrie a pasta completa.",
  },
  {
    pergunta: "Qual é a diferença prática entre utilizar o componente <ScrollView> e o <FlatList> no React Native, e por que usar <ScrollView> com .map() para uma lista de 2.000 itens pode deixar o aplicativo lento ou travando?",
    opcoes: [
      "O <ScrollView> renderiza todos os seus elementos filhos de uma só vez na memória, enquanto o <FlatList> usa virtualização para montar apenas os itens próximos da área visível da tela.",
      "O <ScrollView> só permite rolagem horizontal, enquanto o <FlatList> só permite rolagem vertical.",
      "O <ScrollView> exige conexão com a internet para carregar os itens, enquanto o <FlatList> funciona apenas com dados estáticos.",
      "Não há diferença de desempenho; o travamento ocorre porque o método .map() do JavaScript aceita no máximo 10 itens.",
    ],
    correta: 0,
    explicacao: "O <ScrollView> é ideal para telas ou formulários com poucos elementos, pois monta todos os componentes simultaneamente. Para listas dinâmicas ou extensas, a <FlatList> recicla e monta apenas os itens que cabem na tela (virtualização), economizando memória RAM e processamento.",
  },
  {
    pergunta: "Ao criar um componente dinâmico <BotaoCustomizado titulo=\"Salvar\" cor=\"#007AFF\" />, como o componente Filho pode receber essas Props usando desestruturação e definir que, caso a prop 'cor' não seja enviada pelo Pai, ela assuma '#333333' como padrão?",
    opcoes: [
      "function BotaoCustomizado([titulo, cor = '#333333']) { ... }",
      "function BotaoCustomizado({ titulo, cor = '#333333' }) { ... }",
      "function BotaoCustomizado(props.titulo, props.cor || '#333333') { ... }",
      "function BotaoCustomizado() { const { titulo, cor } = useState('#333333'); }",
    ],
    correta: 1,
    explicacao: "Todo componente React recebe um único objeto 'props' como primeiro parâmetro. Usando a desestruturação de objetos do JavaScript '{ titulo, cor = \"#333333\" }', extraímos diretamente as propriedades pelo nome e já garantimos um valor default (padrão) caso o componente Pai omita a propriedade 'cor'.",
  },
  {
    pergunta: "Uma tela principal possui <View style={{ flex: 1 }}> e dentro dela há três <View> filhas: a primeira com style={{ flex: 1 }}, a segunda com style={{ flex: 2 }} e a terceira com style={{ flex: 1 }}. Como o espaço disponível da tela será dividido entre essas três Views filhas?",
    opcoes: [
      "Cada uma ocupará exatamente 1/3 (33,3%) da tela, pois o React Native ignora valores maiores que 1 no flex.",
      "O espaço será dividido em 4 partes iguais: a primeira e a terceira ocuparão 25% (1/4) da tela cada, e a do meio ocupará 50% (2/4) da tela.",
      "A primeira e a terceira terão 1 pixel de altura e a segunda terá 2 pixels de altura.",
      "A segunda <View> sobreporá as outras duas, ocupando 100% da tela como se fosse um <Modal>.",
    ],
    correta: 1,
    explicacao: "A propriedade 'flex' distribui o espaço livre proporcionalmente à soma dos valores dos elementos irmãos (1 + 2 + 1 = 4 partes no total). Portanto, quem tem 'flex: 1' recebe 1/4 do espaço e quem tem 'flex: 2' recebe 2/4 (metade da tela), mantendo o layout dinâmico em qualquer tamanho de celular.",
  },
  {
    pergunta: "Em um componente com 'const [pontos, setPontos] = useState(0)', um botão executa duas linhas seguidas na mesma função: 'setPontos(pontos + 1); setPontos(pontos + 1);'. Por que o placar sobe apenas para 1 em vez de 2, e como resolver isso?",
    opcoes: [
      "Porque o useState só permite uma chamada por arquivo; deve-se criar dois estados separados.",
      "Porque a atualização do estado é assíncrona e ambas as linhas leem o mesmo valor antigo de 'pontos' (0); resolve-se usando a função de atualização com o estado anterior: 'setPontos(prev => prev + 1)' nas duas chamadas.",
      "Porque o operador '+' no React Native concatena números como texto; resolve-se usando 'Number(pontos)++'.",
      "Porque falta envolver o setPontos dentro de um Hook useMemo para forçar a soma imediata.",
    ],
    correta: 1,
    explicacao: "O valor da variável 'pontos' só muda na próxima renderização. Quando chamamos 'setPontos(pontos + 1)' duas vezes na mesma execução, ambas calculam '0 + 1'. Ao usar a forma funcional 'setPontos(prev => prev + 1)', o React enfileira as atualizações e entrega o valor mais recente para cada chamada.",
  },
];
