import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FundoCodigo } from '@/components/fundo-codigo';
import { Professor } from '@/components/professor';
import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { ehNivelValido, PROVAS, type Prova, type VarianteProva } from '@/data/provas';

/** Cada provocação só "responde" depois que a anterior falou. */
const PRIMEIRA_PROVOCACAO = 300;
const INTERVALO_PROVOCACAO = 750;

export default function EscolhaProvaScreen() {
  const { nivel } = useLocalSearchParams<{ nivel: string }>();

  if (!ehNivelValido(nivel)) return <Redirect href="/" />;

  const prova = PROVAS[nivel];

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.safe}>
        <View style={styles.topo}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar pro menu"
            onPress={() => router.back()}
            hitSlop={12}>
            <Text style={styles.voltar}>‹ Menu</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.conteudo}>
          <Professor fala={prova.falaEscolha} />

          {prova.variantes.map((variante, i) => {
            const esquerda = i % 2 === 0;
            return (
            <View key={variante.id} style={styles.bloco}>
              <Animated.View
                entering={FadeInDown.delay(PRIMEIRA_PROVOCACAO + i * INTERVALO_PROVOCACAO).duration(280)}
                style={[styles.balao, esquerda ? styles.balaoEsquerda : styles.balaoDireita]}>
                <Text style={styles.balaoTexto}>{variante.provocacao}</Text>
                <View
                  style={[
                    styles.balaoSetinha,
                    esquerda ? styles.setinhaEsquerda : styles.setinhaDireita,
                  ]}
                />
              </Animated.View>

              <CardVariante
                prova={prova}
                variante={variante}
                onPress={() =>
                  router.push({
                    pathname: '/prova/[nivel]/[variante]',
                    params: { nivel: prova.nivel, variante: variante.id },
                  })
                }
              />
            </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CardVariante({
  prova,
  variante,
  onPress,
}: {
  prova: Prova;
  variante: VarianteProva;
  onPress: () => void;
}) {
  const total = variante.questoes.length;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${prova.titulo} ${variante.id}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: prova.cor,
          borderBottomColor: prova.corSombra,
          borderBottomWidth: pressed ? 2 : 6,
          marginTop: pressed ? 4 : 0,
        },
      ]}>
      <View style={[styles.cardNumero, { backgroundColor: prova.cor }]}>
        <Text style={styles.cardNumeroTexto}>{variante.id}</Text>
      </View>
      <View style={styles.cardTextos}>
        <Text style={styles.cardTitulo}>
          {prova.emoji} {prova.titulo} {variante.id}
        </Text>
        <Text style={styles.cardDescricao}>
          {total === 0 ? 'Ainda em preparação' : `${total} ${total === 1 ? 'questão' : 'questões'}`}
        </Text>
      </View>
      <Text style={[styles.cardSeta, { color: prova.cor }]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  topo: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  voltar: {
    color: Colors.textMuted,
    fontSize: 17,
    fontWeight: '700',
  },
  conteudo: {
    gap: Spacing.lg,
    padding: Spacing.lg,
  },
  bloco: {
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  balao: {
    maxWidth: '85%',
    backgroundColor: Colors.surfaceRaised,
    borderColor: Colors.border,
    borderWidth: 2,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
  },
  balaoEsquerda: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: Radius.sm,
  },
  balaoDireita: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: Radius.sm,
  },
  balaoTexto: {
    color: Colors.text,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  balaoSetinha: {
    position: 'absolute',
    bottom: -8,
    width: 14,
    height: 14,
    backgroundColor: Colors.surfaceRaised,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.border,
    transform: [{ rotate: '45deg' }],
  },
  setinhaEsquerda: {
    left: 22,
  },
  setinhaDireita: {
    right: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  cardNumero: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNumeroTexto: {
    color: Colors.onAccent,
    fontSize: 26,
    fontWeight: '900',
  },
  cardTextos: {
    flex: 1,
    gap: 2,
  },
  cardTitulo: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  cardDescricao: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  cardSeta: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: -4,
  },
});
