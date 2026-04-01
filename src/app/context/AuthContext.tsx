import { createContext, useContext, useState, useCallback, useMemo, ReactNode, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sessão ativa ao carregar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          console.log('✅ [Auth] Sessão ativa encontrada');
          setIsAuthenticated(true);
          setUser(session.user);
          localStorage.setItem('auth_token', session.access_token);
        } else {
          console.log('⚠️ [Auth] Nenhuma sessão ativa');
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error('❌ [Auth] Erro ao verificar sessão:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔐 [Auth] Tentando login:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.session) {
        console.error('❌ [Auth] Erro no login:', error?.message);
        return false;
      }

      console.log('✅ [Auth] Login bem-sucedido');
      setIsAuthenticated(true);
      setUser(data.user);
      localStorage.setItem('auth_token', data.session.access_token);
      return true;
    } catch (error) {
      console.error('❌ [Auth] Exceção no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('📝 [Auth] Criando nova conta:', email);
      
      const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9a04a9a2`;
      
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ [Auth] Erro ao criar conta:', error);
        return false;
      }

      console.log('✅ [Auth] Conta criada, fazendo login...');
      return await login(email, password);
    } catch (error) {
      console.error('❌ [Auth] Exceção ao criar conta:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [login]);

  const logout = useCallback(async () => {
    try {
      console.log('👋 [Auth] Fazendo logout...');
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('auth_token');
      console.log('✅ [Auth] Logout realizado');
    } catch (error) {
      console.error('❌ [Auth] Erro no logout:', error);
    }
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    loading,
  }), [isAuthenticated, user, login, signup, logout, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}