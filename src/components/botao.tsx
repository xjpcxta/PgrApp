import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

type BotaoProps = {
  titulo: string;
  onPress: () => void;
  cor?: string;
  corSombra?: string;
  corTexto?: string;
  desabilitado?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Botão "3D" com sombra embaixo que afunda ao ser pressionado. */
export function Botao({
  titulo,
  onPress,
  cor = Colors.react,
  corSombra = Colors.reactDark,
  corTexto = Colors.onAccent,
  desabilitado = false,
  style,
}: BotaoProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      disabled={desabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        desabilitado
          ? styles.desabilitado
          : {
              backgroundColor: cor,
              borderBottomColor: corSombra,
              borderBottomWidth: pressed ? 0 : 4,
              marginTop: pressed ? 4 : 0,
            },
        style,
      ]}>
      <Text style={[styles.texto, { color: desabilitado ? Colors.textMuted : corTexto }]}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desabilitado: {
    backgroundColor: Colors.surfaceRaised,
    borderBottomColor: Colors.border,
    borderBottomWidth: 4,
  },
  texto: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
