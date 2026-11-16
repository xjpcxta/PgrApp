import { StyleSheet, Text, View, type DimensionValue } from 'react-native';

import { Colors, Fonts } from '@/constants/theme';

type Enfeite = {
  texto: string;
  top: DimensionValue;
  left: DimensionValue;
  cor: string;
  tamanho: number;
  giro: number;
};

/** Pedacinhos de código espalhados pelo fundo, só para decorar. */
const ENFEITES: Enfeite[] = [
  { texto: '<App />', top: '4%', left: '6%', cor: Colors.react, tamanho: 18, giro: -8 },
  { texto: 'useState()', top: '9%', left: '58%', cor: Colors.purple, tamanho: 15, giro: 6 },
  { texto: '{ }', top: '17%', left: '82%', cor: Colors.warning, tamanho: 26, giro: 0 },
  { texto: '=>', top: '22%', left: '12%', cor: Colors.success, tamanho: 24, giro: -4 },
  { texto: 'props', top: '30%', left: '70%', cor: Colors.react, tamanho: 16, giro: 10 },
  { texto: '⚛', top: '36%', left: '4%', cor: Colors.react, tamanho: 38, giro: 0 },
  { texto: '</>', top: '44%', left: '84%', cor: Colors.error, tamanho: 22, giro: -10 },
  { texto: 'useEffect(() => {})', top: '52%', left: '18%', cor: Colors.purple, tamanho: 14, giro: 4 },
  { texto: 'npm start', top: '60%', left: '66%', cor: Colors.success, tamanho: 14, giro: -6 },
  { texto: '[...state]', top: '67%', left: '4%', cor: Colors.warning, tamanho: 15, giro: 8 },
  { texto: '===', top: '74%', left: '78%', cor: Colors.react, tamanho: 20, giro: 0 },
  { texto: 'export default', top: '81%', left: '30%', cor: Colors.purple, tamanho: 14, giro: -5 },
  { texto: '// TODO: estudar', top: '88%', left: '58%', cor: Colors.textMuted, tamanho: 13, giro: 3 },
  { texto: 'JSX', top: '93%', left: '8%', cor: Colors.error, tamanho: 20, giro: -12 },
];

export function FundoCodigo() {
  return (
    <View style={styles.camada} aria-hidden>
      {ENFEITES.map((e) => (
        <Text
          key={e.texto}
          style={[
            styles.enfeite,
            {
              top: e.top,
              left: e.left,
              color: e.cor,
              fontSize: e.tamanho,
              transform: [{ rotate: `${e.giro}deg` }],
            },
          ]}>
          {e.texto}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  camada: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  enfeite: {
    position: 'absolute',
    fontFamily: Fonts.mono,
    fontWeight: '700',
    opacity: 0.13,
  },
});
