import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Radius, Spacing } from '@/constants/theme';

export type EstadoOpcao = 'livre' | 'certa' | 'errada' | 'era-a-certa' | 'apagada';

type OpcaoRespostaProps = {
  letra: string;
  texto: string;
  estado: EstadoOpcao;
  onPress: () => void;
};

const VISUAL: Record<EstadoOpcao, { borda: string; fundo: string; letraFundo: string; letraCor: string }> = {
  livre: { borda: Colors.border, fundo: Colors.surface, letraFundo: Colors.surfaceRaised, letraCor: Colors.text },
  certa: { borda: Colors.success, fundo: Colors.successBg, letraFundo: Colors.success, letraCor: Colors.onAccent },
  errada: { borda: Colors.error, fundo: Colors.errorBg, letraFundo: Colors.error, letraCor: Colors.onAccent },
  'era-a-certa': { borda: Colors.success, fundo: Colors.surface, letraFundo: Colors.success, letraCor: Colors.onAccent },
  apagada: { borda: Colors.border, fundo: Colors.surface, letraFundo: Colors.surfaceRaised, letraCor: Colors.textMuted },
};

export function OpcaoResposta({ letra, texto, estado, onPress }: OpcaoRespostaProps) {
  const visual = VISUAL[estado];
  const livre = estado === 'livre';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !livre, selected: estado === 'certa' || estado === 'errada' }}
      disabled={!livre}
      onPress={onPress}
      style={({ pressed }) => [
        styles.opcao,
        {
          borderColor: visual.borda,
          backgroundColor: pressed ? Colors.surfaceRaised : visual.fundo,
          opacity: estado === 'apagada' ? 0.5 : 1,
        },
      ]}>
      <View style={[styles.letra, { backgroundColor: visual.letraFundo }]}>
        <Text style={[styles.letraTexto, { color: visual.letraCor }]}>{letra}</Text>
      </View>
      <Text style={styles.texto}>{texto}</Text>
      {estado === 'certa' || estado === 'era-a-certa' ? <Text style={styles.marca}>✓</Text> : null}
      {estado === 'errada' ? <Text style={[styles.marca, { color: Colors.error }]}>✗</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  letra: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letraTexto: {
    fontSize: 16,
    fontWeight: '800',
  },
  texto: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  marca: {
    color: Colors.success,
    fontSize: 20,
    fontWeight: '900',
  },
});
