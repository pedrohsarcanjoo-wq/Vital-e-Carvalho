import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowLeft, Mail, User } from 'lucide-react';
import { Link } from 'react-router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success = false;

      if (isSignup) {
        if (!name.trim()) {
          setError('Por favor, preencha o nome');
          setLoading(false);
          return;
        }
        success = await signup(email, password, name);
        if (!success) {
          setError('Erro ao criar conta. Tente novamente.');
        }
      } else {
        success = await login(email, password);
        if (!success) {
          setError('Email ou senha incorretos');
        }
      }

      if (success) {
        navigate('/admin');
      }
    } catch (err) {
      setError('Erro ao processar sua solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1C] via-[#0A2F2A] to-[#1C1C1C] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-[#00A896] blur-[150px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#05C4B4] blur-[150px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[rgba(255,255,255,0.6)] hover:text-[#00A896] transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </Link>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center mx-auto mb-8">
            <Lock className="w-8 h-8 text-white" />
          </div>

          {/* Header */}
          <h1 className="font-['Poppins'] text-3xl font-bold text-[#1C1C1C] text-center mb-2">
            {isSignup ? 'Criar Conta Admin' : 'Painel Admin'}
          </h1>
          <p className="text-center text-[#9A9690] mb-8 font-light">
            {isSignup ? 'Cadastre-se para gerenciar imóveis' : 'Acesso restrito para administradores'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-br from-[#00A896] to-[#028174] text-white rounded-xl font-bold tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : (isSignup ? 'Criar Conta' : 'Acessar Painel')}
            </button>
          </form>

          {/* Toggle Sign up / Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError('');
              }}
              className="text-sm text-[#00A896] hover:text-[#028174] font-semibold transition-colors"
            >
              {isSignup ? 'Já tem uma conta? Fazer login' : 'Não tem conta? Criar agora'}
            </button>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-[rgba(0,168,150,0.08)] border-2 border-[rgba(0,168,150,0.2)] rounded-xl">
            <p className="text-xs text-[#028174] text-center font-semibold">
              💡 Crie sua conta de administrador usando seu email e senha preferidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
