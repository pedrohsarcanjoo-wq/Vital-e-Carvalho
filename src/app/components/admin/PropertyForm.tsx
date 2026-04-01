import { useState, useEffect } from 'react';
import { useProperties, type Property } from '../../context/PropertyContext';
import { X, Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface PropertyFormProps {
  property: Property | null;
  onClose: () => void;
}

export function PropertyForm({ property, onClose }: PropertyFormProps) {
  const { addProperty, updateProperty } = useProperties();
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    price: '',
    priceDetail: '',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    parking: 0,
    image: '',
    badge: '',
    description: '',
    type: 'Apartamento',
    status: 'Venda' as 'Venda' | 'Locação',
  });
  const [features, setFeatures] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        code: property.code || '',
        price: property.price,
        priceDetail: property.priceDetail || '',
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        parking: property.parking,
        image: property.image,
        badge: property.badge || '',
        description: property.description,
        type: property.type,
        status: property.status,
      });
      setFeatures(property.features);
      setGallery(property.gallery);
    }
  }, [property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Verificar se há token de autenticação
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) {
        throw new Error('Você precisa estar autenticado para adicionar imóveis. Por favor, faça login novamente.');
      }

      const propertyData = {
        ...formData,
        features,
        gallery: gallery.length > 0 ? gallery : [formData.image],
      };

      console.log('📝 Submetendo imóvel:', propertyData.title);

      if (property) {
        await updateProperty(property.id, propertyData);
        alert('✅ Imóvel atualizado com sucesso!');
      } else {
        await addProperty(propertyData);
        alert('✅ Imóvel adicionado com sucesso!');
      }
      
      console.log('✅ Imóvel salvo com sucesso!');
      onClose();
    } catch (err: any) {
      console.error('❌ Erro ao salvar imóvel:', err);
      
      let errorMessage = 'Erro desconhecido ao salvar imóvel';
      
      // Mensagens de erro mais específicas
      if (err.message.includes('Unauthorized') || err.message.includes('autenticado')) {
        errorMessage = '🔒 Sessão expirada ou inválida. Por favor, faça login novamente.';
      } else if (err.message.includes('Network') || err.message.includes('fetch')) {
        errorMessage = '🌐 Erro de conexão com o servidor. Verifique sua internet.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      alert('❌ Erro: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGallery((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-6 shadow-2xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#E0E8E7] flex-shrink-0">
          <h2 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C]">
            {property ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#E0E8E7] flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            {/* Title & Code */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Título do Imóvel *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Código do Imóvel
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="Ex: REF-1234"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Type */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Tipo *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                >
                  <option>Apartamento</option>
                  <option>Casa</option>
                  <option>Cobertura</option>
                  <option>Penthouse</option>
                  <option>Loft</option>
                  <option>Terreno</option>
                  <option>Comercial</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Finalidade *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Venda' | 'Locação' })}
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                >
                  <option>Venda</option>
                  <option>Locação</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Preço *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="R$ 850.000"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>

              {/* Price Detail */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Detalhe do Preço
                </label>
                <input
                  type="text"
                  value={formData.priceDetail}
                  onChange={(e) => setFormData({ ...formData, priceDetail: e.target.value })}
                  placeholder="ou R$ 4.500/mês"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Localização *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bairro, Cidade - Estado"
                className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Quartos *
                </label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Banheiros *
                </label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Área (m²) *
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>

              {/* Parking */}
              <div>
                <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                  Vagas *
                </label>
                <input
                  type="number"
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Badge */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Badge (opcional)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Destaque, Lançamento, etc."
                className="w-full h-10 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              />
            </div>

            {/* Main Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Imagem Principal *
              </label>
              <div className="flex gap-2">
                <label className="flex-1 h-10 px-3 border-2 border-dashed border-[#00A896] rounded-lg bg-[rgba(0,168,150,0.05)] hover:bg-[rgba(0,168,150,0.1)] cursor-pointer transition-all flex items-center justify-center gap-2 text-[#00A896] text-sm font-semibold">
                  <Upload size={16} />
                  Upload de Imagem
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-2 relative group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Descrição *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Características
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Ex: Piscina, Academia..."
                  className="flex-1 h-9 px-3 border-2 border-[#E0E8E7] rounded-lg bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-2 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="h-9 px-4 bg-[#00A896] text-white rounded-lg text-xs font-semibold hover:bg-[#028174] transition-colors flex items-center gap-1"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 bg-[rgba(0,168,150,0.1)] text-[#028174] px-2.5 py-1 rounded-md"
                  >
                    <span className="text-xs font-medium">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#2C2C2C] mb-1.5">
                Galeria de Imagens
              </label>
              <label className="w-full h-10 px-3 border-2 border-dashed border-[#E0E8E7] rounded-lg hover:border-[#00A896] hover:bg-[rgba(0,168,150,0.05)] cursor-pointer transition-all flex items-center justify-center gap-2 text-[#5A5754] text-sm">
                <ImageIcon size={16} />
                Adicionar Imagens (múltiplas)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </label>
              {gallery.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {gallery.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              </div>
            )}
          </div>

          {/* Actions - Fixed at Bottom */}
          <div className="flex gap-3 px-6 py-4 border-t-2 border-[#E0E8E7] bg-white flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 h-11 border-2 border-[#E0E8E7] text-[#5A5754] rounded-lg text-sm font-semibold hover:bg-[#E0E8E7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 bg-gradient-to-br from-[#00A896] to-[#028174] text-white rounded-lg text-sm font-semibold hover:shadow-[0_8px_28px_rgba(0,168,150,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : (property ? 'Salvar' : 'Adicionar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}