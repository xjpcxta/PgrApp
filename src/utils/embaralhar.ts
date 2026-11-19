import type { IndiceOpcao, Questao } from '@/data/provas';

/** Devolve uma cópia da lista em ordem aleatória (Fisher–Yates). */
export function embaralhar<T>(lista: readonly T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/** Embaralha as 4 opções de uma questão e recalcula qual é a correta. */
export function embaralharOpcoes(questao: Questao): Questao {
  const ordem = embaralhar<IndiceOpcao>([0, 1, 2, 3]);
  const opcoes = ordem.map((i) => questao.opcoes[i]) as Questao['opcoes'];
  const correta = ordem.indexOf(questao.correta) as IndiceOpcao;
  return { ...questao, opcoes, correta };
}

/** Monta uma tentativa nova: questões em ordem aleatória e opções embaralhadas em cada uma. */
export function montarTentativa(questoes: readonly Questao[]): Questao[] {
  return embaralhar(questoes).map(embaralharOpcoes);
}
