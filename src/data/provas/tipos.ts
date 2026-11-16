export type IndiceOpcao = 0 | 1 | 2 | 3;

export type Questao = {
  /** Enunciado da questão. */
  pergunta: string;
  /** Trecho de código opcional, mostrado abaixo do enunciado. */
  codigo?: string;
  /** Exatamente 4 opções de resposta. */
  opcoes: [string, string, string, string];
  /** Posição da opção correta em `opcoes` (0 a 3). */
  correta: IndiceOpcao;
  /** Explicação mostrada quando o aluno erra (escrita em 1ª pessoa, como o professor). */
  explicacao: string;
};

export type NivelProva = 'leve' | 'quase-tranquila' | 'tensa';

export type Prova = {
  nivel: NivelProva;
  titulo: string;
  /** Frase curta que aparece no card do menu. */
  descricao: string;
  emoji: string;
  cor: string;
  corSombra: string;
  questoes: Questao[];
};
