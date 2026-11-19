import { Colors } from '@/constants/theme';

import { questoesLeve1 } from './leve/prova-1';
import { questoesLeve2 } from './leve/prova-2';
import { questoesLeve3 } from './leve/prova-3';
import { questoesLeve4 } from './leve/prova-4';
import { questoesQuaseTranquila1 } from './quase-tranquila/prova-1';
import { questoesQuaseTranquila2 } from './quase-tranquila/prova-2';
import { questoesQuaseTranquila3 } from './quase-tranquila/prova-3';
import { questoesQuaseTranquila4 } from './quase-tranquila/prova-4';
import { questoesTensa1 } from './tensa/prova-1';
import { questoesTensa2 } from './tensa/prova-2';
import { questoesTensa3 } from './tensa/prova-3';
import { questoesTensa4 } from './tensa/prova-4';
import type { NivelProva, Prova, VarianteProva } from './tipos';

export type { IndiceOpcao, NivelProva, Prova, Questao, VarianteId, VarianteProva } from './tipos';

export const PROVAS: Record<NivelProva, Prova> = {
  leve: {
    nivel: 'leve',
    titulo: 'Provinha Leve',
    descricao: 'Pra aquecer os dedos',
    falaEscolha: 'Separei quatro provinhas leves pra você. Só não acredita em tudo que elas falam uma da outra, tá?',
    emoji: '🌱',
    cor: Colors.success,
    corSombra: Colors.successDark,
    variantes: [
      { id: '1', provocacao: 'Psiu! Essas aí embaixo são bem mais difíceis que eu 👇', questoes: questoesLeve1 },
      { id: '2', provocacao: 'Não escuta ele, eu estou mais fácil! 😇', questoes: questoesLeve2 },
      { id: '3', provocacao: 'Fácil? Vocês duas são pegadinha pura. Vem comigo 😎', questoes: questoesLeve3 },
      { id: '4', provocacao: 'Deixa elas brigarem… eu sou a mais tranquila de todas 🤫', questoes: questoesLeve4 },
    ],
  },
  'quase-tranquila': {
    nivel: 'quase-tranquila',
    titulo: 'Provinha Quase Tranquila',
    descricao: 'Começa a esquentar',
    falaEscolha: 'Aqui já começa a esquentar. Escolhe uma, mas não liga pra fofoca delas.',
    emoji: '☕',
    cor: Colors.warning,
    corSombra: Colors.warningDark,
    variantes: [
      { id: '1', provocacao: 'Eu sou tranquila. As de baixo é que são só "quase" 👇', questoes: questoesQuaseTranquila1 },
      { id: '2', provocacao: 'Mentira! Ela que esconde as pegadinhas 🙄', questoes: questoesQuaseTranquila2 },
      { id: '3', provocacao: 'Olha quem fala de pegadinha… eu sou a única honesta aqui 😌', questoes: questoesQuaseTranquila3 },
      { id: '4', provocacao: 'Honesta? Eu sou o café fraquinho desse cardápio ☕', questoes: questoesQuaseTranquila4 },
    ],
  },
  tensa: {
    nivel: 'tensa',
    titulo: 'Provinha Tensa',
    descricao: 'Aqui o bicho pega',
    falaEscolha: 'Agora é sério. As quatro são tensas, mas cada uma jura que as outras são piores.',
    emoji: '🔥',
    cor: Colors.error,
    corSombra: Colors.errorDark,
    variantes: [
      { id: '1', provocacao: 'Comigo você sobrevive. Com as de baixo, sei não 👇', questoes: questoesTensa1 },
      { id: '2', provocacao: 'Não escuta ele, eu estou mais fácil… juro 🤞', questoes: questoesTensa2 },
      { id: '3', provocacao: 'Jura? Eu vi o que tem aí dentro. Escolhe eu 👀', questoes: questoesTensa3 },
      { id: '4', provocacao: 'Todas mentindo. Eu sou tensa, mas pelo menos sou sincera 😤', questoes: questoesTensa4 },
    ],
  },
};

export const ORDEM_PROVAS: NivelProva[] = ['leve', 'quase-tranquila', 'tensa'];

export function ehNivelValido(valor: unknown): valor is NivelProva {
  return typeof valor === 'string' && valor in PROVAS;
}

export function buscarVariante(prova: Prova, id: unknown): VarianteProva | undefined {
  return prova.variantes.find((v) => v.id === id);
}

/** Próxima prova do mesmo nível que já tem questões (dando a volta no fim), ou `undefined`. */
export function proximaVariante(prova: Prova, atual: VarianteProva): VarianteProva | undefined {
  const i = prova.variantes.indexOf(atual);
  for (let passo = 1; passo < prova.variantes.length; passo++) {
    const candidata = prova.variantes[(i + passo) % prova.variantes.length];
    if (candidata.questoes.length > 0) return candidata;
  }
  return undefined;
}
