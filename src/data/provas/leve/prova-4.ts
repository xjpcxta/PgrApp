import type { Questao } from '../tipos';

/** Provinha Leve 4 — questões 16 a 20 da planilha de questões fáceis. */
export const questoesLeve4: Questao[] = [
  {
    pergunta: "Para capturar em tempo real o que o usuário digita em um componente <TextInput> e guardar esse valor no estado (useState), qual propriedade do <TextInput> devemos utilizar?",
    opcoes: [
      "onPress",
      "onChangeText",
      "onKeyClick",
      "onWriteValue",
    ],
    correta: 1,
    explicacao: "A propriedade 'onChangeText' recebe uma função que é chamada a cada letra digitada ou apagada pelo usuário, passando o novo texto diretamente para a função atualizadora do useState (ex.: onChangeText={setTexto}). Já o 'onPress' é usado para cliques em botões.",
  },
  {
    pergunta: "No ciclo de vida de um componente com useEffect(() => { ... }, [contador]), o que acontece quando colocamos a variável 'contador' dentro dos colchetes (array de dependências)?",
    opcoes: [
      "O código dentro do useEffect nunca será executado.",
      "O código será executado quando a tela abrir e também toda vez que o valor de 'contador' mudar.",
      "O aplicativo será fechado automaticamente quando 'contador' mudar.",
      "A variável 'contador' será bloqueada e não poderá mais mudar de valor.",
    ],
    correta: 1,
    explicacao: "Quando informamos variáveis no array de dependências do useEffect, o React monitora essas variáveis (fase de atualização do ciclo de vida). Sempre que 'contador' sofrer alteração, o efeito é disparado novamente.",
  },
  {
    pergunta: "Qual propriedade booleana (true ou false) do componente <Modal> do React Native controla se o modal está aparecendo na tela ou se está oculto, geralmente sendo ligada a um useState?",
    opcoes: [
      "open",
      "visible",
      "active",
      "display",
    ],
    correta: 1,
    explicacao: "A prop 'visible' do componente <Modal> define sua visibilidade: quando recebe 'true', o modal é exibido sobre a tela; quando recebe 'false', ele fica escondido. Por isso, costuma-se criar um estado como 'const [modalVisivel, setModalVisivel] = useState(false)' para abri-lo e fechá-lo.",
  },
  {
    pergunta: "Ao consumir um Webservice (API) com fetch(), em qual formato de texto leve os dados geralmente trafegam pela internet antes de serem convertidos para objetos JavaScript com o método .json()?",
    opcoes: [
      "MP4",
      "JSON (JavaScript Object Notation)",
      "APK",
      "PNG",
    ],
    correta: 1,
    explicacao: "O JSON é o formato padrão utilizado pelas APIs modernas para enviar e receber dados estruturados (como listas e objetos de texto) entre o servidor e o aplicativo. No React Native, usamos 'await resposta.json()' para converter esse retorno em um objeto JavaScript pronto para uso.",
  },
  {
    pergunta: "Ao utilizar o AsyncStorage para persistência de dados no celular, quais são os dois métodos básicos utilizados, respectivamente, para salvar uma informação e para ler essa informação depois?",
    opcoes: [
      "pushData() e pullData()",
      "setItem() e getItem()",
      "writeDisk() e readDisk()",
      "createState() e loadState()",
    ],
    correta: 1,
    explicacao: "O AsyncStorage funciona no modelo de chave e valor. O método 'AsyncStorage.setItem(chave, valor)' grava o dado na memória permanente do aparelho, enquanto 'AsyncStorage.getItem(chave)' recupera o valor salvo mesmo que o usuário tenha fechado e reaberto o aplicativo.",
  },
];
