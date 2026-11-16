import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Botao } from '@/components/botao';
import { FundoCodigo } from '@/components/fundo-codigo';
import { Professor } from '@/components/professor';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAluno } from '@/context/aluno-context';

export default function DuvidaScreen() {
  const { nome } = useAluno();

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.conteudo}>
        <Professor
          tamanho="grande"
          fala={`${nome ?? 'Ei'}, eu ainda tô arrumando esse cantinho pra tirar suas dúvidas. Logo logo eu libero ele pra você!`}
        />
        <Botao
          titulo="Voltar pro menu"
          onPress={() => router.back()}
          cor={Colors.purple}
          corSombra={Colors.purpleDark}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xl,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
});
