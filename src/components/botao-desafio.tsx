import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { cubicBezier, useReducedMotion } from 'react-native-reanimated';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

const EASE_IN_OUT = cubicBezier(0.77, 0, 0.175, 1);
const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

/** Anel de energia que "respira" em volta do botão. */
const PULSO = {
  animationName: {
    from: { opacity: 0.85, transform: [{ scale: 1 }] },
    to: { opacity: 0, transform: [{ scale: 1.08 }] },
  },
  animationDuration: '1.8s',
  animationIterationCount: 'infinite',
  animationTimingFunction: EASE_OUT,
} as const;

/** Átomo do React girando sem parar. */
const GIRO = {
  animationName: {
    from: { transform: [{ rotate: '0deg' }] },
    to: { transform: [{ rotate: '360deg' }] },
  },
  animationDuration: '6s',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
} as const;

/** Faixa de brilho que atravessa o botão de tempos em tempos. */
const BRILHO = {
  animationName: {
    '0%': { transform: [{ translateX: '-150%' }, { skewX: '-20deg' }] },
    '45%': { transform: [{ translateX: '650%' }, { skewX: '-20deg' }] },
    '100%': { transform: [{ translateX: '650%' }, { skewX: '-20deg' }] },
  },
  animationDuration: '3.2s',
  animationIterationCount: 'infinite',
  animationTimingFunction: EASE_IN_OUT,
} as const;

export function BotaoDesafio({ onPress }: { onPress: () => void }) {
  const reduzirMovimento = useReducedMotion();

  return (
    <View style={styles.envoltorio}>
      {!reduzirMovimento ? <Animated.View style={[styles.anel, PULSO]} /> : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quer se desafiar?"
        onPress={onPress}
        style={({ pressed }) => [
          styles.botao,
          { borderBottomWidth: pressed ? 2 : 6, marginTop: pressed ? 4 : 0 },
        ]}>
        {!reduzirMovimento ? <Animated.View style={[styles.brilho, BRILHO]} /> : null}

        <Animated.Text style={[styles.atomo, !reduzirMovimento && GIRO]}>⚛</Animated.Text>

        <View style={styles.textos}>
          <Text style={styles.titulo}>Quer se desafiar?</Text>
          <Text style={styles.subtitulo}>{'// só pros corajosos'}</Text>
        </View>

        <Text style={styles.raio}>⚡</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  envoltorio: {
    marginTop: Spacing.sm,
  },
  anel: {
    ...StyleSheet.absoluteFill,
    borderRadius: Radius.lg,
    borderWidth: 3,
    borderColor: Colors.react,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    overflow: 'hidden',
    backgroundColor: Colors.react,
    borderColor: Colors.react,
    borderBottomColor: Colors.reactDark,
    borderWidth: 2,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.md,
  },
  brilho: {
    position: 'absolute',
    top: -20,
    bottom: -20,
    left: 0,
    width: '18%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  atomo: {
    fontSize: 40,
    lineHeight: 48,
    color: Colors.onAccent,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  titulo: {
    color: Colors.onAccent,
    fontSize: 20,
    fontWeight: '900',
  },
  subtitulo: {
    color: Colors.onAccent,
    fontFamily: Fonts.mono,
    fontSize: 13,
    fontWeight: '700',
    opacity: 0.7,
  },
  raio: {
    fontSize: 26,
  },
});
