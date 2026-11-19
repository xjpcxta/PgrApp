import type { Questao } from '../tipos';

/**
 * Provinha Tensa 2 — 5 questões com 4 opções cada.
 *
 * Formato de cada questão:
 * {
 *   pergunta: 'O que é JSX?',
 *   codigo: 'const el = <h1>Oi</h1>;',   // opcional
 *   opcoes: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
 *   correta: 1,                           // índice da opção certa (0 a 3)
 *   explicacao: 'A certa é a B porque...',
 * },
 */
export const questoesTensa2: Questao[] = [];
