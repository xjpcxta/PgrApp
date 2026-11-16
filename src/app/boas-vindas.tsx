import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Botao } from '@/components/botao';
import { FundoCodigo } from '@/components/fundo-codigo';
import { Professor } from '@/components/professor';
import { Colors, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAluno } from '@/context/aluno-context';

export default function BoasVindasScreen() {
  const { salvarNome } = useAluno();
  const [nome, setNome] = useState('');
  const podeSeguir = nome.trim().length > 0;

  async function confirmar() {
    if (!podeSeguir) return;
    await salvarNome(nome);
    router.replace('/');
  }

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior="padding" style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled">
            <Professor
              tamanho="grande"
              fala={'Oi! Eu sou o Profe Sr. e vou revisar com você tudo o que a gente viu de React em aula.\n\nAntes de começar: como eu posso te chamar?'}
            />

            <TextInput
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome ou apelido"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="done"
              onSubmitEditing={confirmar}
              style={styles.input}
            />

            <Botao titulo="Pode me chamar assim!" onPress={confirmar} desabilitado={!podeSeguir} />
          </ScrollView>
        </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 2,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: Spacing.md,
  },
});
