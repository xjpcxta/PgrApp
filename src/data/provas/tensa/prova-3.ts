import type { Questao } from '../tipos';

/** Provinha Tensa 3 — questões 11 a 15 da planilha de questões difíceis. */
export const questoesTensa3: Questao[] = [
  {
    pergunta: "Em um projeto React Native com Expo, o desenvolvedor criou um arquivo '.env' para armazenar a URL da API de produção, mas ao tentar acessá-la no código da tela via 'process.env.API_URL', o valor retornou 'undefined'. Além disso, após corrigir o nome da variável, o Metro Bundler continuou lendo o valor antigo em cache. Qual é a regra oficial do Expo para variáveis de ambiente no cliente e como limpar o cache do bundler?",
    opcoes: [
      "Variáveis no código do app só são expostas se tiverem o prefixo 'REACT_APP_', e o cache é limpo apagando a pasta 'assets'.",
      "O Expo exige que variáveis de ambiente acessíveis no código JavaScript do app comecem obrigatoriamente com o prefixo 'EXPO_PUBLIC_' (ex.: 'process.env.EXPO_PUBLIC_API_URL'), e para forçar o Metro Bundler a recarregar sem cache utiliza-se 'npx expo start -c' (ou '--clear').",
      "Variáveis '.env' só funcionam se forem importadas dentro do componente <Text> usando o Hook 'useRef', e o cache é limpo com 'npm start --reset-db'.",
      "O arquivo '.env' deve ficar dentro da pasta 'node_modules', e toda alteração nele exige formatar o emulador Android.",
    ],
    correta: 1,
    explicacao: "Por segurança, o Metro Bundler no Expo só substitui inline no pacote do aplicativo as variáveis que iniciam com 'EXPO_PUBLIC_', evitando que chaves secretas de servidor vazem acidentalmente para o código do aplicativo. E como elas são embutidas no bundle, alterações exigem reiniciar com 'npx expo start -c'.",
  },
  {
    pergunta: "Considere o código JSX: '<View>{mensagens.length && <ListaMensagens dados={mensagens} />}</View>'. Quando o array 'mensagens' tem itens, a tela funciona normalmente; porém, quando 'mensagens' está vazio ('length === 0'), o aplicativo quebra com o erro fatal 'Text strings must be rendered within a <Text> component'. Por que esse erro acontece no React Native?",
    opcoes: [
      "Porque o método '.length' retorna uma tag HTML '<span>0</span>' que não é compatível com o Android.",
      "Porque arrays vazios no JavaScript desativam o componente <View> pai, transformando-o em um <Modal>.",
      "Porque em JavaScript a expressão '0 && <Componente />' faz curto-circuito e retorna o próprio número '0'; diferente da Web, o React Native tenta renderizar o valor '0' diretamente dentro da <View> sem um <Text>, causando o crash (corrige-se usando 'mensagens.length > 0 && ...').",
      "Porque o operador '&&' só pode ser usado dentro do Hook 'useEffect' e nunca dentro do retorno JSX de um componente.",
    ],
    correta: 2,
    explicacao: "No JavaScript, o operador lógico '&&' retorna o primeiro operando falsy que encontrar. Quando 'mensagens.length' é '0', o resultado da expressão é o número '0' (e não 'false' ou 'null', que o React ignora). Como o número '0' cai direto dentro de uma <View>, o React Native lança erro por haver texto/número fora de '<Text>'. Usar 'mensagens.length > 0' garante um booleano 'false'.",
  },
  {
    pergunta: "Em uma <FlatList> onde cada item possui um estado interno (como um <Switch> ou <TextInput> próprio) e o usuário pode excluir itens ou adicionar novos no início da lista ('[novoItem, ...lista]'), por que usar o índice do array como chave ('keyExtractor={(item, index) => String(index)}') causa bugs visuais graves?",
    opcoes: [
      "Porque o 'index' no JavaScript começa em -1, fazendo o primeiro item sumir da tela.",
      "Porque a <FlatList> ordena os itens em ordem alfabética automaticamente quando percebe que a chave é um número.",
      "Porque o 'keyExtractor' só aceita objetos JSON completos e nunca strings.",
      "Porque ao remover ou inserir um item no início, os índices de todos os itens seguintes mudam; o React reaproveita a instância visual antiga associada àquele índice ('0', '1', etc.), misturando o estado interno de um item com os dados de outro.",
    ],
    correta: 3,
    explicacao: "O React usa a 'key' para saber qual elemento na memória corresponde a qual item de dados após uma atualização. Se o item da posição 0 é deletado, o antigo item 1 passa a ter índice 0; se a key for o índice, o React acha que o item 0 continuou o mesmo e mantém o estado visual antigo (como um checkbox marcado) no item errado.",
  },
  {
    pergunta: "Para garantir um layout dinâmico que: (1) não deixe os campos de <TextInput> escondidos atrás do teclado virtual quando ele abre no iOS e no Android, e (2) recalcule larguras automaticamente caso o usuário gire a tela do celular (retrato para paisagem), quais ferramentas do React Native devem ser utilizadas?",
    opcoes: [
      "Usar '<Modal>' para substituir o teclado e 'Dimensions.get(\"screen\")' fora do componente, pois ele re-renderiza a tela sozinho ao girar o aparelho.",
      "Usar '<KeyboardAvoidingView>' (geralmente configurando 'behavior=\"padding\"' no iOS) envolvendo o formulário, e o Hook 'useWindowDimensions()' para obter 'width' e 'height' reativos que atualizam o componente automaticamente ao girar a tela.",
      "Aplicar 'flexDirection: keyboard' na <View> principal e configurar a rotação dentro do StyleSheet.create().",
      "Usar 'AsyncStorage' para medir o tamanho da tela e 'useRef' para empurrar o teclado para baixo.",
    ],
    correta: 1,
    explicacao: "Enquanto 'Dimensions.get(\"window\")' chamado fora do componente lê o tamanho apenas uma vez, o Hook 'useWindowDimensions()' escuta mudanças de dimensão/orientação e re-renderiza o layout. Já o '<KeyboardAvoidingView>' ajusta o espaçamento inferior da tela quando o teclado sobe.",
  },
  {
    pergunta: "Um desenvolvedor criou um Custom Hook 'useBuscaDados(url)' que utiliza internamente 'useState' e 'useEffect' para consultar uma API, mas decidiu chamá-lo dentro de uma condicional 'if (usuarioLogado) { const dados = useBuscaDados(url); }', gerando o erro 'Rendered more hooks than during the previous render'. Por que o React proíbe chamar Hooks dentro de condicionais ('if'), loops ('for') ou funções de clique?",
    opcoes: [
      "Porque o React identifica e associa o estado de cada Hook pela ordem exata em que eles são chamados na fila de cada renderização; se um Hook ficar dentro de um 'if' e deixar de rodar em uma renderização, a fila desloca e o React mistura os estados dos Hooks seguintes.",
      "Porque o interpretador JavaScript do celular não suporta blocos 'if' dentro de funções que retornam JSX.",
      "Porque Custom Hooks só podem ser chamados dentro do arquivo 'app.json' antes do aplicativo iniciar.",
      "Porque todo Hook que começa com a palavra 'use' apaga a memória RAM se for chamado após um clique de botão.",
    ],
    correta: 0,
    explicacao: "Internamente, o React guarda os Hooks de um componente em uma lista encadeada baseada na ordem de chamada (1º Hook, 2º Hook, 3º Hook...). Por isso a Regra dos Hooks exige que eles sejam chamados sempre no nível superior (top-level) do componente, na mesma ordem em todas as renderizações.",
  },
];
