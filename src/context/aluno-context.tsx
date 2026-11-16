import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CHAVE_NOME = '@profesr/nome-aluno';

type AlunoContextValue = {
  /** Nome do aluno, ou `null` se ainda não foi informado. */
  nome: string | null;
  /** `true` enquanto o nome salvo ainda está sendo lido do aparelho. */
  carregando: boolean;
  salvarNome: (nome: string) => Promise<void>;
  esquecerNome: () => Promise<void>;
};

const AlunoContext = createContext<AlunoContextValue | null>(null);

export function AlunoProvider({ children }: { children: ReactNode }) {
  const [nome, setNome] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_NOME)
      .then((salvo) => setNome(salvo))
      .catch(() => setNome(null))
      .finally(() => setCarregando(false));
  }, []);

  async function salvarNome(novoNome: string) {
    const limpo = novoNome.trim();
    setNome(limpo);
    await AsyncStorage.setItem(CHAVE_NOME, limpo);
  }

  async function esquecerNome() {
    setNome(null);
    await AsyncStorage.removeItem(CHAVE_NOME);
  }

  return (
    <AlunoContext.Provider value={{ nome, carregando, salvarNome, esquecerNome }}>
      {children}
    </AlunoContext.Provider>
  );
}

export function useAluno() {
  const ctx = useContext(AlunoContext);
  if (!ctx) throw new Error('useAluno precisa estar dentro de <AlunoProvider>');
  return ctx;
}
