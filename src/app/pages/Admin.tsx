import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { Plus, LogOut, Home, Edit, Trash2, Eye } from 'lucide-react';
import { PropertyForm } from '../components/admin/PropertyForm';
import { BackendStatus } from '../components/admin/BackendStatus';
import type { Property } from '../context/PropertyContext';
import { projectId } from '/utils/supabase/info';

export default function Admin() {
  const { isAuthenticated, logout, user } = useAuth();
  const { properties, deleteProperty } = useProperties();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      try {
        await deleteProperty(id);
        alert('✅ Imóvel excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        alert('❌ Erro ao deletar imóvel: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7F6] to-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-[#E0E8E7] shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C]">
                Painel Administrativo
              </h1>
              <p className="text-sm text-[#9A9690] font-light">Vita & Carvalho Imóveis</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-[#5A5754] hover:text-[#00A896] transition-colors font-semibold text-sm"
            >
              Ver Site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border-2 border-[#E0E8E7] text-[#5A5754] hover:border-red-500 hover:text-red-500 px-4 py-2 rounded-lg transition-all font-semibold text-sm"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-6">
            <div className="text-sm font-semibold text-[#9A9690] uppercase tracking-wider mb-2">
              Total de Imóveis
            </div>
            <div className="text-4xl font-bold text-[#1C1C1C]">{properties.length}</div>
          </div>
          <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-6">
            <div className="text-sm font-semibold text-[#9A9690] uppercase tracking-wider mb-2">
              Para Venda
            </div>
            <div className="text-4xl font-bold text-[#00A896]">
              {properties.filter((p) => p.status === 'Venda').length}
            </div>
          </div>
          <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-6">
            <div className="text-sm font-semibold text-[#9A9690] uppercase tracking-wider mb-2">
              Para Locação
            </div>
            <div className="text-4xl font-bold text-[#028174]">
              {properties.filter((p) => p.status === 'Locação').length}
            </div>
          </div>
        </div>

        {/* Backend Status */}
        <BackendStatus />

        {/* Debug Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔍</div>
            <div className="flex-1">
              <div className="font-bold text-blue-900 mb-2">Debug - Estado de Autenticação</div>
              <div className="space-y-1 text-sm text-blue-800">
                <div>✅ Autenticado: <strong>{isAuthenticated ? 'Sim' : 'Não'}</strong></div>
                <div>👤 Usuário: <strong>{user?.email || 'N/A'}</strong></div>
                <div>🎟️ Token no localStorage: <strong>{localStorage.getItem('auth_token') ? 'Presente' : 'AUSENTE'}</strong></div>
              </div>
              {!isAuthenticated || !localStorage.getItem('auth_token') ? (
                <div className="mt-3 p-3 bg-red-100 border-2 border-red-300 rounded-lg">
                  <div className="font-bold text-red-900 mb-1 text-sm">🚨 ERRO CRÍTICO DETECTADO</div>
                  <div className="text-xs text-red-800 mb-3">
                    Você NÃO está autenticado. Por isso está dando "Failed to add". Use o botão abaixo para corrigir AGORA:
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        logout();
                        navigate('/admin/login');
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                    >
                      🔐 Fazer Login AGORA
                    </button>
                    <button
                      onClick={() => {
                        console.log('=== DETALHES DO ERRO ===');
                        console.log('isAuthenticated:', isAuthenticated);
                        console.log('user:', user);
                        console.log('auth_token:', localStorage.getItem('auth_token'));
                        console.log('API_URL:', `https://${projectId}.supabase.co/functions/v1/make-server-9a04a9a2`);
                        alert('✅ Logs enviados para console. Pressione F12 para ver.');
                      }}
                      className="px-4 py-2 bg-red-800 text-white rounded-lg text-xs font-semibold hover:bg-red-900 transition-colors"
                    >
                      Ver Logs
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-3 p-3 bg-green-100 border-2 border-green-300 rounded-lg">
                  <div className="font-bold text-green-900 text-sm">✅ Tudo OK! Você pode adicionar imóveis.</div>
                </div>
              )}
              <button
                onClick={() => {
                  console.log('=== DEBUG INFO ===');
                  console.log('isAuthenticated:', isAuthenticated);
                  console.log('user:', user);
                  console.log('auth_token:', localStorage.getItem('auth_token'));
                  alert('Informações de debug enviadas para o console (F12)');
                }}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
              >
                Ver detalhes no Console
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-['Poppins'] text-2xl font-bold text-[#1C1C1C]">
            Gerenciar Imóveis
          </h2>
          <button
            onClick={() => {
              setEditingProperty(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_8px_28px_rgba(0,168,150,0.3)] transition-all"
          >
            <Plus size={20} />
            Adicionar Imóvel
          </button>
        </div>

        {/* Properties Table */}
        <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#F0F7F6] to-[#E8F8F6] border-b-2 border-[#E0E8E7]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Imóvel
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Código
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#E0E8E7]">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-[#F0F7F6] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-20 h-14 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-semibold text-[#2C2C2C] mb-1">
                            {property.title}
                          </div>
                          <div className="text-sm text-[#9A9690]">
                            {property.bedrooms} quartos • {property.area}m²
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1C1C1C]">
                      {property.code || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5A5754]">
                      {property.location}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#00A896]">{property.price}</div>
                      {property.priceDetail && (
                        <div className="text-xs text-[#9A9690]">{property.priceDetail}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          property.status === 'Venda'
                            ? 'bg-[rgba(0,168,150,0.1)] text-[#00A896]'
                            : 'bg-[rgba(2,129,116,0.1)] text-[#028174]'
                        }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#5A5754]">
                      {property.type}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/imovel/${property.id}`)}
                          className="p-2 hover:bg-[#E0E8E7] rounded-lg transition-colors text-[#5A5754]"
                          title="Visualizar"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-2 hover:bg-[#E0E8E7] rounded-lg transition-colors text-[#00A896]"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {properties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#9A9690] font-light">
                Nenhum imóvel cadastrado ainda.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}