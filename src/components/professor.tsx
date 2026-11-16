import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type ProfessorProps = {
  /** O que o professor fala, sempre em 1ª pessoa. */
  fala: string;
  tamanho?: 'normal' | 'grande';
  style?: StyleProp<ViewStyle>;
};

/** Avatar do Profe Sr. com o balão de fala ao lado. */
export function Professor({ fala, tamanho = 'normal', style }: ProfessorProps) {
  const grande = tamanho === 'grande';

  return (
    <View style={[styles.linha, grande && styles.coluna, style]}>
      <View style={[styles.avatar, grande && styles.avatarGrande]}>
        <Text style={[styles.emoji, grande && styles.emojiGrande]}>🧑‍🏫</Text>
        <View style={styles.cracha}>
          <Text style={styles.crachaTexto}>Sr.</Text>
        </View>
      </View>

      <View style={[styles.balao, grande ? styles.balaoGrande : styles.balaoLinha]}>
        <View style={[styles.setinha, grande && styles.setinhaCima]} />
        <Text style={[styles.fala, grande && styles.falaGrande]}>{fala}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  coluna: {
    flexDirection: 'column',
    gap: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    backgroundColor: Colors.surfaceRaised,
    borderWidth: 3,
    borderColor: Colors.react,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarGrande: {
    width: 112,
    height: 112,
    borderWidth: 4,
  },
  emoji: {
    fontSize: 32,
  },
  emojiGrande: {
    fontSize: 58,
  },
  cracha: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: Colors.react,
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  crachaTexto: {
    fontFamily: Fonts.mono,
    fontWeight: '800',
    fontSize: 12,
    color: Colors.onAccent,
  },
  balao: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 2,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  balaoLinha: {
    flex: 1,
  },
  balaoGrande: {
    alignSelf: 'stretch',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  setinha: {
    position: 'absolute',
    left: -9,
    top: '50%',
    marginTop: -8,
    width: 16,
    height: 16,
    backgroundColor: Colors.surface,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.border,
    transform: [{ rotate: '45deg' }],
  },
  setinhaCima: {
    left: '50%',
    top: -9,
    marginTop: 0,
    marginLeft: -8,
    borderBottomWidth: 0,
    borderTopWidth: 2,
  },
  fala: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
  },
  falaGrande: {
    fontSize: 19,
    lineHeight: 27,
    textAlign: 'center',
  },
});
