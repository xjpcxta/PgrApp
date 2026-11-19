import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Botao } from '@/components/botao';
import { FundoCodigo } from '@/components/fundo-codigo';
import { Professor } from '@/components/professor';
import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAluno } from '@/context/aluno-context';

export default function DesafioScreen() {
  const { nome } = useAluno();

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.conteudo}>
        <Professor
          tamanho="grande"
          fala={`Gostei da coragem, ${nome ?? 'aluno'}! Eu tô preparando um desafio especial pra você. Volta logo que ele vai estar te esperando.`}
        />
        <Botao titulo="Voltar pro menu" onPress={() => router.back()} />
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
