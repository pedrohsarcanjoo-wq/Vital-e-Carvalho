import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import type { Property } from '../context/PropertyContext';
import { Plus, LogOut, Home, Edit, Trash2, Eye, Search, Power, Star } from 'lucide-react';
import { PropertyForm } from '../components/admin/PropertyForm';
import { LocationManager } from '../components/admin/LocationManager';
import { BlogManager } from '../components/admin/BlogManager';

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const { properties, deleteProperty, updateProperty } = useProperties();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  const [activeTab, setActiveTab] = useState<'ativos' | 'inativos' | 'destaques' | 'localidades' | 'blog'>('ativos');
  const [searchTerm, setSearchTerm] = useState('');

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
    if (window.confirm('Tem certeza que deseja excluir permanentemente este imóvel?')) {
      try {
        await deleteProperty(id);
        alert('✅ Imóvel excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        alert('❌ Erro ao deletar imóvel: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      }
    }
  };

  const toggleStatus = async (property: Property) => {
    try {
      await updateProperty(property.id, { isActive: property.isActive === false ? true : false });
    } catch (e) {
      alert('Erro ao alterar status');
    }
  };

  const toggleFeatured = async (property: Property) => {
    try {
      await updateProperty(property.id, { isFeatured: !property.isFeatured });
    } catch (e) {
      alert('Erro ao alterar destaque');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = !searchTerm || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.code && p.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.code2 && p.code2.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (activeTab === 'ativos') return p.isActive !== false;
      if (activeTab === 'inativos') return p.isActive === false;
      if (activeTab === 'destaques') return p.isFeatured === true;
      return true;
    });
  }, [properties, searchTerm, activeTab]);

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

      <div className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2 flex-shrink-0">
          <button 
            onClick={() => setActiveTab('ativos')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'ativos' ? 'bg-[#00A896] text-white' : 'text-[#5A5754] hover:bg-[#F0F7F6]'}`}
          >
            Imóveis Ativos ({properties.filter(p => p.isActive !== false).length})
          </button>
          <button 
            onClick={() => setActiveTab('inativos')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'inativos' ? 'bg-[#00A896] text-white' : 'text-[#5A5754] hover:bg-[#F0F7F6]'}`}
          >
            Imóveis Inativos ({properties.filter(p => p.isActive === false).length})
          </button>
          <button 
            onClick={() => setActiveTab('destaques')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'destaques' ? 'bg-[#00A896] text-white' : 'text-[#5A5754] hover:bg-[#F0F7F6]'}`}
          >
            Destaques da Home ({properties.filter(p => p.isFeatured).length})
          </button>
          <button 
            onClick={() => setActiveTab('localidades')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'localidades' ? 'bg-[#00A896] text-white' : 'text-[#5A5754] hover:bg-[#F0F7F6]'}`}
          >
            Gerenciar Cidades/Bairros
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'blog' ? 'bg-[#00A896] text-white' : 'text-[#5A5754] hover:bg-[#F0F7F6]'}`}
          >
            Gerenciar Blog
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {activeTab === 'localidades' && <LocationManager />}
          {activeTab === 'blog' && <BlogManager />}
          
          {(activeTab === 'ativos' || activeTab === 'inativos' || activeTab === 'destaques') && (
            <>
              {/* Actions */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por código ou título..."
                    className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingProperty(null);
                    setShowForm(true);
                  }}
                  className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_8px_28px_rgba(0,168,150,0.3)] transition-all w-full md:w-auto justify-center"
                >
                  <Plus size={20} />
                  Adicionar Imóvel
                </button>
              </div>

              {/* Properties Table */}
              <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-gradient-to-r from-[#F0F7F6] to-[#E8F8F6] border-b-2 border-[#E0E8E7]">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Imóvel</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Código</th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Preço</th>
                        <th className="text-center px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Destaque</th>
                        <th className="text-center px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Status</th>
                        <th className="text-right px-6 py-4 text-sm font-bold text-[#2C2C2C] uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-[#E0E8E7]">
                      {filteredProperties.map((property) => (
                        <tr key={property.id} className={`hover:bg-[#F0F7F6] transition-colors ${property.isActive === false ? 'opacity-60' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img src={property.image} alt={property.title} className="w-16 h-12 object-cover rounded-lg" />
                              <div className="font-semibold text-[#2C2C2C] line-clamp-2 max-w-xs">{property.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-[#1C1C1C]">
                            {property.code || '-'}
                            {property.code2 && <div className="text-xs text-[#9A9690]">{property.code2}</div>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-bold text-[#00A896]">{property.price}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => toggleFeatured(property)} className={`p-2 rounded-lg transition-colors ${property.isFeatured ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' : 'text-[#9A9690] hover:bg-[#E0E8E7]'}`} title={property.isFeatured ? "Remover Destaque" : "Destacar na Home"}>
                              <Star size={20} fill={property.isFeatured ? "currentColor" : "none"} />
                            </button>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => toggleStatus(property)} className={`p-2 rounded-lg transition-colors ${property.isActive !== false ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-red-500 bg-red-50 hover:bg-red-100'}`} title={property.isActive !== false ? "Desativar Imóvel" : "Reativar Imóvel"}>
                              <Power size={20} />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => navigate(`/imovel/${property.id}`)} className="p-2 hover:bg-[#E0E8E7] rounded-lg text-[#5A5754]" title="Visualizar"><Eye size={18} /></button>
                              <button onClick={() => handleEdit(property)} className="p-2 hover:bg-[#E0E8E7] rounded-lg text-[#00A896]" title="Editar"><Edit size={18} /></button>
                              <button onClick={() => handleDelete(property.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500" title="Excluir Permanentemente"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-[#9A9690] font-light">Nenhum imóvel encontrado.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}