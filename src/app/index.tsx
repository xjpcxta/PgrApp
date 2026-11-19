import { Redirect, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BotaoDesafio } from '@/components/botao-desafio';
import { FundoCodigo } from '@/components/fundo-codigo';
import { Professor } from '@/components/professor';
import { Colors, Fonts, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useAluno } from '@/context/aluno-context';
import { ORDEM_PROVAS, PROVAS } from '@/data/provas';

type OpcaoMenuProps = {
  emoji: string;
  titulo: string;
  descricao: string;
  cor: string;
  corSombra: string;
  onPress: () => void;
};

function OpcaoMenu({ emoji, titulo, descricao, cor, corSombra, onPress }: OpcaoMenuProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${titulo}. ${descricao}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.opcao,
        {
          borderColor: cor,
          borderBottomColor: corSombra,
          borderBottomWidth: pressed ? 2 : 6,
          marginTop: pressed ? 4 : 0,
        },
      ]}>
      <View style={[styles.opcaoIcone, { backgroundColor: cor }]}>
        <Text style={styles.opcaoEmoji}>{emoji}</Text>
      </View>
      <View style={styles.opcaoTextos}>
        <Text style={styles.opcaoTitulo}>{titulo}</Text>
        <Text style={styles.opcaoDescricao}>{descricao}</Text>
      </View>
      <Text style={[styles.opcaoSeta, { color: cor }]}>›</Text>
    </Pressable>
  );
}

export default function MenuScreen() {
  const { nome, esquecerNome } = useAluno();

  if (!nome) return <Redirect href="/boas-vindas" />;

  return (
    <View style={styles.tela}>
      <FundoCodigo />
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.conteudo}>
          <Text style={styles.logo}>
            {'<'}
            <Text style={styles.logoDestaque}>Profe Sr.</Text>
            {' />'}
          </Text>

          <Professor fala={`E aí, ${nome}! Por onde você quer começar?`} />

          <View style={styles.opcoes}>
            {ORDEM_PROVAS.map((nivel) => {
              const prova = PROVAS[nivel];
              return (
                <OpcaoMenu
                  key={nivel}
                  emoji={prova.emoji}
                  titulo={prova.titulo}
                  descricao={prova.descricao}
                  cor={prova.cor}
                  corSombra={prova.corSombra}
                  onPress={() => router.push({ pathname: '/prova/[nivel]', params: { nivel } })}
                />
              );
            })}

            <OpcaoMenu
              emoji="💬"
              titulo="Dúvida"
              descricao="Me pergunta o que travou"
              cor={Colors.purple}
              corSombra={Colors.purpleDark}
              onPress={() => router.push('/duvida')}
            />

            <BotaoDesafio onPress={() => router.push('/desafio')} />
          </View>

          <Pressable onPress={esquecerNome} hitSlop={8} style={styles.trocarNome}>
            <Text style={styles.trocarNomeTexto}>Não é {nome}? Trocar nome</Text>
          </Pressable>
        </ScrollView>
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
  conteudo: {
    flexGrow: 1,
    gap: Spacing.lg,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  logo: {
    fontFamily: Fonts.mono,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  logoDestaque: {
    color: Colors.react,
  },
  opcoes: {
    gap: Spacing.md,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  opcaoIcone: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcaoEmoji: {
    fontSize: 26,
  },
  opcaoTextos: {
    flex: 1,
    gap: 2,
  },
  opcaoTitulo: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  opcaoDescricao: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  opcaoSeta: {
    fontSize: 34,
    fontWeight: '700',
    marginTop: -4,
  },
  trocarNome: {
    alignSelf: 'center',
    marginTop: 'auto',
    paddingVertical: Spacing.sm,
  },
  trocarNomeTexto: {
    color: Colors.textMuted,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
