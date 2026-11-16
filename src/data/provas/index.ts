import { Colors } from '@/constants/theme';

import { questoesLeve } from './leve';
import { questoesQuaseTranquila } from './quase-tranquila';
import { questoesTensa } from './tensa';
import type { NivelProva, Prova } from './tipos';

export type { IndiceOpcao, NivelProva, Prova, Questao } from './tipos';

export const PROVAS: Record<NivelProva, Prova> = {
  leve: {
    nivel: 'leve',
    titulo: 'Provinha Leve',
    descricao: 'Pra aquecer os dedos',
    emoji: '🌱',
    cor: Colors.success,
    corSombra: Colors.successDark,
    questoes: questoesLeve,
  },
  'quase-tranquila': {
    nivel: 'quase-tranquila',
    titulo: 'Provinha Quase Tranquila',
    descricao: 'Começa a esquentar',
    emoji: '☕',
    cor: Colors.warning,
    corSombra: Colors.warningDark,
    questoes: questoesQuaseTranquila,
  },
  tensa: {
    nivel: 'tensa',
    titulo: 'Provinha Tensa',
    descricao: 'Aqui o bicho pega',
    emoji: '🔥',
    cor: Colors.error,
    corSombra: Colors.errorDark,
    questoes: questoesTensa,
  },
};

export const ORDEM_PROVAS: NivelProva[] = ['leve', 'quase-tranquila', 'tensa'];

export function ehNivelValido(valor: unknown): valor is NivelProva {
  return typeof valor === 'string' && valor in PROVAS;
}
