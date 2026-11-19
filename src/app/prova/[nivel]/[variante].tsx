import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Botao } from '@/components/botao';
import { FundoCodigo } from '@/components/fundo-codigo';
import { OpcaoResposta, type EstadoOpcao } from '@/components/opcao-resposta';
import { Professor } from '@/components/professor';
import { Colors, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAluno } from '@/context/aluno-context';
import {
  buscarVariante,
  ehNivelValido,
  PROVAS,
  proximaVariante,
  type Prova,
  type Questao,
  type VarianteProva,
} from '@/data/provas';
import { montarTentativa } from '@/utils/embaralhar';

const LETRAS = ['A', 'B', 'C', 'D'] as const;

/** Enunciados maiores que isso usam uma fonte menor pra caber melhor no celular. */
const PERGUNTA_LONGA = 140;

function estadoDaOpcao(indice: number, questao: Questao, selecionada: number | null): EstadoOpcao {
  if (selecionada === null) return 'livre';
  if (indice === selecionada) return indice === questao.correta ? 'certa' : 'errada';
  if (indice === questao.correta) return 'era-a-certa';
  return 'apagada';
}

function falaDoResultado(nome: string, acertos: number, total: number) {
  const taxa = acertos / total;
  if (taxa === 1) return `Gabaritou, ${nome}! Eu tô muito orgulhoso de você.`;
  if (taxa >= 0.7) return `Mandou muito bem, ${nome}! Só uns detalhes pra eu revisar com você.`;
  if (taxa >= 0.4) return `Tá no caminho, ${nome}. Revisa comigo e tenta de novo que vai melhorar!`;
  return `Calma, ${nome}, faz parte do processo. Dá uma revisada no conteúdo e vem de novo!`;
}

export default function ProvaScreen() {
  const { nivel, variante } = useLocalSearchParams<{ nivel: string; variante: string }>();

  if (!ehNivelValido(nivel)) return <Redirect href="/" />;

  const prova = PROVAS[nivel];
  const escolhida = buscarVariante(prova, variante);

  if (!escolhida) return <Redirect href={{ pathname: '/prova/[nivel]', params: { nivel } }} />;

  return <ProvaEmAndamento key={`${nivel}-${escolhida.id}`} prova={prova} variante={escolhida} />;
}

function ProvaEmAndamento({ prova, variante }: { prova: Prova; variante: VarianteProva }) {
  const { nome } = useAluno();
  const aluno = nome ?? 'aluno';
  const titulo = `${prova.titulo} ${variante.id}`;
  const total = variante.questoes.length;
  const proxima = proximaVariante(prova, variante);

  function irParaProxima() {
    if (!proxima) return;
    router.replace({
      pathname: '/prova/[nivel]/[variante]',
      params: { nivel: prova.nivel, variante: proxima.id },
    });
  }

  // Cada tentativa embaralha a ordem das questões e das opções, pra não criar padrão no gabarito.
  const [questoes, setQuestoes] = useState(() => montarTentativa(variante.questoes));
  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [terminou, setTerminou] = useState(false);

  const { height: altura } = useWindowDimensions();
  const rolagemRef = useRef<ScrollViewInstance>(null);
  const conteudoRef = useRef<ComponentRef<typeof View>>(null);
  const opcaoRefs = useRef<(ComponentRef<typeof View> | null)[]>([]);

  // Quando o aluno erra, rolo a tela até a opção certa pra ele ver o que marquei em verde.
  const questaoAtual = questoes[indice];
  useEffect(() => {
    if (selecionada === null || !questaoAtual || selecionada === questaoAtual.correta) return;
    const opcao = opcaoRefs.current[questaoAtual.correta];
    const conteudo = conteudoRef.current;
    if (!opcao || !conteudo) return;
    opcao.measureLayout(
      conteudo,
      (_x, y) => rolagemRef.current?.scrollTo({ y: Math.max(0, y - Spacing.md), animated: true }),
      () => {},
    );
  }, [selecionada, questaoAtual]);

  if (total === 0) {
    return (
      <TelaCentral>
        <Professor
          tamanho="grande"
          fala={`Opa, ${aluno}! A ${titulo} eu ainda tô montando. Volta daqui a pouco que ela vai estar prontinha.`}
        />
        <Botao titulo="Voltar" onPress={() => router.back()} />
      </TelaCentral>
    );
  }

  if (terminou) {
    return (
      <TelaCentral>
        <Professor tamanho="grande" fala={falaDoResultado(aluno, acertos, total)} />
        <View style={styles.placar}>
          <Text style={[styles.placarNumero, { color: prova.cor }]}>
            {acertos}
            <Text style={styles.placarTotal}>/{total}</Text>
          </Text>
          <Text style={styles.placarLegenda}>acertos na {titulo}</Text>
        </View>
        <View style={styles.botoesResultado}>
          <Botao
            titulo="Refazer provinha"
            cor={prova.cor}
            corSombra={prova.corSombra}
            onPress={() => {
              setQuestoes(montarTentativa(variante.questoes));
              setIndice(0);
              setSelecionada(null);
              setAcertos(0);
              setTerminou(false);
            }}
          />
          {proxima ? (
            <Botao
              titulo={`Encarar a ${prova.titulo} ${proxima.id}`}
              cor={Colors.surfaceRaised}
              corSombra={Colors.border}
              corTexto={Colors.text}
              onPress={irParaProxima}
            />
          ) : null}
          <Botao
            titulo="Voltar pro menu"
            cor={Colors.surfaceRaised}
            corSombra={Colors.border}
            corTexto={Colors.text}
            onPress={() => router.dismissAll()}
          />
        </View>
      </TelaCentral>
    );
  }

  const questao = questoes[indice];
  const respondeu = selecionada !== null;
  const acertou = selecionada === questao.correta;
  const ultima = indice === total - 1;
  const progresso = (indice + (respondeu ? 1 : 0)) / total;

  function responder(opcao: number) {
    if (respondeu) return;
    setSelecionada(opcao);
    if (opcao === questao.correta) setAcertos((a) => a + 1);
  }

  function continuar() {
    if (ultima) {
      setTerminou(true);
      return;
    }
    setIndice((i) => i + 1);
    setSelecionada(null);
    rolagemRef.current?.scrollTo({ y: 0, animated: false });
  }

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.safe}>
        <View style={styles.coluna}>
          <View style={styles.topo}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sair da provinha"
              onPress={() => router.back()}
              hitSlop={12}>
              <Text style={styles.fechar}>✕</Text>
            </Pressable>
            <View style={styles.barra}>
              <View
                style={[styles.barraPreenchida, { width: `${progresso * 100}%`, backgroundColor: prova.cor }]}
              />
            </View>
          </View>

          <ScrollView ref={rolagemRef}>
            <View ref={conteudoRef} style={styles.conteudo}>
            <Text style={styles.contador}>
              {prova.emoji} Questão {indice + 1} de {total}
            </Text>
            <Text
              style={[
                styles.pergunta,
                questao.pergunta.length > PERGUNTA_LONGA && styles.perguntaLonga,
              ]}>
              {questao.pergunta}
            </Text>

            {questao.codigo ? (
              <View style={styles.codigo}>
                <Text style={styles.codigoTexto}>{questao.codigo}</Text>
              </View>
            ) : null}

            <View style={styles.opcoes}>
              {questao.opcoes.map((texto, i) => (
                <View
                  key={i}
                  ref={(el) => {
                    opcaoRefs.current[i] = el;
                  }}>
                  <OpcaoResposta
                    letra={LETRAS[i]}
                    texto={texto}
                    estado={estadoDaOpcao(i, questao, selecionada)}
                    onPress={() => responder(i)}
                  />
                </View>
              ))}
            </View>
            </View>
          </ScrollView>

          <View
            style={[
              styles.rodape,
              respondeu && { backgroundColor: acertou ? Colors.successBg : Colors.errorBg },
            ]}>
            {respondeu ? (
              <ScrollView
                style={{ maxHeight: altura * 0.3 }}
                contentContainerStyle={styles.feedback}>
                <Text style={[styles.feedbackTitulo, { color: acertou ? Colors.success : Colors.error }]}>
                  {acertou ? 'Mandou bem!' : 'Não foi dessa vez...'}
                </Text>
                {!acertou ? (
                  <>
                    <Text style={styles.feedbackCerta}>
                      A certa é a letra {LETRAS[questao.correta]}, que eu marquei em verde ali em cima.
                    </Text>
                    <Text style={styles.feedbackExplicacao}>{questao.explicacao}</Text>
                  </>
                ) : null}
              </ScrollView>
            ) : (
              <Text style={styles.dica}>Toca na resposta que você acha que é a certa.</Text>
            )}

            <Botao
              titulo={ultima ? 'Ver resultado' : 'Continuar'}
              onPress={continuar}
              desabilitado={!respondeu}
              cor={acertou ? Colors.success : Colors.error}
              corSombra={acertou ? Colors.successDark : Colors.errorDark}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

function TelaCentral({ children }: { children: ReactNode }) {
  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.central}>{children}</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  coluna: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  central: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: Spacing.xl,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  topo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  fechar: {
    color: Colors.textMuted,
    fontSize: 24,
    fontWeight: '700',
  },
  barra: {
    flex: 1,
    height: 16,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceRaised,
    overflow: 'hidden',
  },
  barraPreenchida: {
    height: '100%',
    borderRadius: Radius.pill,
  },
  conteudo: {
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  contador: {
    color: Colors.textMuted,
    fontFamily: Fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pergunta: {
    color: Colors.text,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800',
  },
  perguntaLonga: {
    fontSize: 18,
    lineHeight: 25,
  },
  codigo: {
    backgroundColor: '#070B16',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  codigoTexto: {
    color: Colors.react,
    fontFamily: Fonts.mono,
    fontSize: 14,
    lineHeight: 21,
  },
  opcoes: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  rodape: {
    gap: Spacing.md,
    padding: Spacing.lg,
    borderTopWidth: 2,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  dica: {
    color: Colors.textMuted,
    fontSize: 15,
    textAlign: 'center',
  },
  feedback: {
    gap: Spacing.xs,
  },
  feedbackTitulo: {
    fontSize: 22,
    fontWeight: '900',
  },
  feedbackCerta: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  feedbackExplicacao: {
    color: Colors.textMuted,
    fontSize: 15,
    lineHeight: 21,
  },
  placar: {
    alignItems: 'center',
  },
  placarNumero: {
    fontSize: 72,
    fontWeight: '900',
  },
  placarTotal: {
    fontSize: 36,
    color: Colors.textMuted,
  },
  placarLegenda: {
    color: Colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  botoesResultado: {
    gap: Spacing.md,
  },
});
