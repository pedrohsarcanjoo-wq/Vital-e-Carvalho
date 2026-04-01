import { useState, useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { Search, SlidersHorizontal, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

export default function AllProperties() {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priceFilter, setPriceFilter] = useState('Todos');

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Search term filter
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.code && property.code.toLowerCase().includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType = typeFilter === 'Todos' || property.type === typeFilter;

      // Status filter
      const matchesStatus = statusFilter === 'Todos' || property.status === statusFilter;

      // Price filter (basic implementation)
      let matchesPrice = true;
      if (priceFilter !== 'Todos') {
        const priceNum = parseInt(property.price.replace(/\D/g, ''));
        switch (priceFilter) {
          case 'Até R$ 300.000':
            matchesPrice = priceNum <= 300000;
            break;
          case 'R$ 300.000 - R$ 500.000':
            matchesPrice = priceNum > 300000 && priceNum <= 500000;
            break;
          case 'R$ 500.000 - R$ 800.000':
            matchesPrice = priceNum > 500000 && priceNum <= 800000;
            break;
          case 'R$ 800.000 - R$ 1.200.000':
            matchesPrice = priceNum > 800000 && priceNum <= 1200000;
            break;
          case 'Acima de R$ 1.200.000':
            matchesPrice = priceNum > 1200000;
            break;
        }
      }

      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [properties, searchTerm, typeFilter, statusFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F7F6] to-white">
      {/* Header */}
      <header className="bg-white border-b-2 border-[#E0E8E7] sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center group-hover:shadow-lg transition-all">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C]">
                Vita & Carvalho
              </h1>
              <p className="text-xs text-[#9A9690]">Imóveis de Excelência</p>
            </div>
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Catálogo Completo</span>
          </div>
          
          <h1 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-4 leading-[1.15] tracking-tight">
            Todos os Imóveis
          </h1>
          
          <p className="text-lg text-[#5A5754] max-w-2xl font-light">
            Explore nosso portfólio completo de imóveis disponíveis
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-6 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <SlidersHorizontal className="text-[#00A896]" size={24} />
            <h2 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C]">
              Filtros de Busca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por título, localização..."
                  className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Tipo de Imóvel
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full h-12 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              >
                <option>Todos</option>
                <option>Apartamento</option>
                <option>Casa</option>
                <option>Cobertura</option>
                <option>Penthouse</option>
                <option>Loft</option>
                <option>Terreno</option>
                <option>Comercial</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Finalidade
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-12 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              >
                <option>Todos</option>
                <option>Venda</option>
                <option>Locação</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Faixa de Preço
              </label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full h-12 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              >
                <option>Todos</option>
                <option>Até R$ 300.000</option>
                <option>R$ 300.000 - R$ 500.000</option>
                <option>R$ 500.000 - R$ 800.000</option>
                <option>R$ 800.000 - R$ 1.200.000</option>
                <option>Acima de R$ 1.200.000</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t-2 border-[#E0E8E7]">
            <p className="text-sm text-[#5A5754]">
              <span className="font-bold text-[#00A896]">{filteredProperties.length}</span>{' '}
              {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-[rgba(0,168,150,0.1)] flex items-center justify-center mx-auto mb-6">
              <Search className="text-[#00A896]" size={40} />
            </div>
            <h3 className="font-['Poppins'] text-2xl font-bold text-[#1C1C1C] mb-3">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-[#9A9690] max-w-md mx-auto">
              Tente ajustar os filtros de busca para encontrar o imóvel ideal para você.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}