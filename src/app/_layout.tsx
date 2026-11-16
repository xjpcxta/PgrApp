import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Colors } from '@/constants/theme';
import { AlunoProvider, useAluno } from '@/context/aluno-context';

SplashScreen.preventAutoHideAsync();

const tema = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.background,
    card: Colors.background,
    primary: Colors.react,
    text: Colors.text,
    border: Colors.border,
  },
};

function Navegacao() {
  const { carregando } = useAluno();

  useEffect(() => {
    if (!carregando) SplashScreen.hideAsync();
  }, [carregando]);

  if (carregando) return null;

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="boas-vindas" options={{ animation: 'fade' }} />
      <Stack.Screen name="prova/[nivel]" options={{ gestureEnabled: false }} />
      <Stack.Screen name="duvida" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={tema}>
      <AlunoProvider>
        <StatusBar style="light" />
        <Navegacao />
      </AlunoProvider>
    </ThemeProvider>
  );
}
