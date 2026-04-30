import { useState, useMemo } from 'react';
import { useProperties } from '../context/PropertyContext';
import { PropertyCard } from '../components/PropertyCard';
import { Search, SlidersHorizontal, Home as HomeIcon, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router';

// Helper component for multiple selection
function MultiSelect({ label, options, selected, onChange }: { label: string, options: string[], selected: string[], onChange: (val: string[]) => void }) {
  const [open, setOpen] = useState(false);
  
  const toggle = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter(x => x !== opt));
    else onChange([...selected, opt]);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">{label}</label>
      <div 
        onClick={() => setOpen(!open)}
        className="w-full min-h-12 px-4 py-2 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm cursor-pointer flex items-center justify-between"
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selected.length === 0 ? <span className="text-[#9A9690]">Todos</span> : 
            selected.map(s => <span key={s} className="bg-[rgba(0,168,150,0.1)] text-[#028174] px-2 py-1 rounded text-xs">{s}</span>)
          }
        </div>
        <ChevronDown size={16} className={`text-[#9A9690] transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Backdrop to close dropdown */}
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
      
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#E0E8E7] rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto p-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 p-2 hover:bg-[#F0F7F6] rounded cursor-pointer">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="rounded text-[#00A896]" />
              <span className="text-sm text-[#2C2C2C]">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AllProperties() {
  const { properties } = useProperties();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const initialType = searchParams.get('type') && searchParams.get('type') !== 'Todos' ? [searchParams.get('type')!] : [];
  const initialStatus = searchParams.get('status') && searchParams.get('status') !== 'Todos' ? [searchParams.get('status')!] : [];

  const [searchTerm, setSearchTerm] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialStatus);
  const initialCity = searchParams.get('city') && searchParams.get('city') !== 'Todas' ? [searchParams.get('city')!] : [];
  const initialNeighborhood = searchParams.get('neighborhood') && searchParams.get('neighborhood') !== 'Todos' ? [searchParams.get('neighborhood')!] : [];
  const initialMinPrice = searchParams.get('minPrice') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';

  const [selectedCities, setSelectedCities] = useState<string[]>(initialCity);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(initialNeighborhood);
  
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  // Extract unique options from properties
  const allTypes = useMemo(() => Array.from(new Set(properties.map(p => p.type).filter(Boolean))), [properties]);
  const allStatuses = useMemo(() => Array.from(new Set(properties.flatMap(p => Array.isArray(p.status) ? p.status : [p.status]).filter(Boolean))), [properties]);
  const allCities = useMemo(() => Array.from(new Set(properties.map(p => p.city || (p.location ? p.location.split(',')[0].split('-')[0].trim() : '')).filter(Boolean))), [properties]);
  const allNeighborhoods = useMemo(() => Array.from(new Set(properties.map(p => p.neighborhood || (p.location ? p.location.split(',')[0].trim() : '')).filter(Boolean))), [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // 1. Search Code
      const matchesCode = !searchCode || 
        (property.code && property.code.toLowerCase().includes(searchCode.toLowerCase())) ||
        (property.code2 && property.code2.toLowerCase().includes(searchCode.toLowerCase())) ||
        property.id.toLowerCase().includes(searchCode.toLowerCase());

      // 2. Search Term
      const matchesSearch = !searchTerm ||
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase());

      // 3. Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);

      // 4. Status filter
      const propStatuses = Array.isArray(property.status) ? property.status : [property.status];
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.some(s => propStatuses.includes(s));

      // 5. City filter
      const propCity = property.city || property.location;
      const matchesCity = selectedCities.length === 0 || selectedCities.some(c => propCity.includes(c));

      // 6. Neighborhood filter
      const propNeighborhood = property.neighborhood || property.location;
      const matchesNeighborhood = selectedNeighborhoods.length === 0 || selectedNeighborhoods.some(n => propNeighborhood.includes(n));

      // 7. Price filter
      const priceNum = parseInt(property.price.replace(/\D/g, '')) || 0;
      const minP = parseInt(minPrice.replace(/\D/g, '')) || 0;
      const maxP = parseInt(maxPrice.replace(/\D/g, '')) || Infinity;
      const matchesPrice = priceNum >= minP && priceNum <= (maxPrice ? maxP : Infinity);

      // Active Filter (Don't show inactive properties in the catalog)
      const matchesActive = property.isActive !== false;

      return matchesActive && matchesCode && matchesSearch && matchesType && matchesStatus && matchesCity && matchesNeighborhood && matchesPrice;
    });
  }, [properties, searchCode, searchTerm, selectedTypes, selectedStatuses, selectedCities, selectedNeighborhoods, minPrice, maxPrice]);

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
              Filtros Avançados
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Buscar por Palavra-chave
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por título, descrição..."
                  className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
              </div>
            </div>

            {/* Code Input */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Buscar por Código
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A9690]" size={18} />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Ex: REF-1234"
                  className="w-full h-12 pl-12 pr-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
                />
              </div>
            </div>

            {/* Type Filter */}
            <MultiSelect 
              label="Tipo de Imóvel" 
              options={allTypes} 
              selected={selectedTypes} 
              onChange={setSelectedTypes} 
            />

            {/* Status Filter */}
            <MultiSelect 
              label="Finalidade" 
              options={allStatuses} 
              selected={selectedStatuses} 
              onChange={setSelectedStatuses} 
            />

            {/* City Filter */}
            <MultiSelect 
              label="Cidade" 
              options={allCities} 
              selected={selectedCities} 
              onChange={setSelectedCities} 
            />

            {/* Neighborhood Filter */}
            <MultiSelect 
              label="Bairro" 
              options={allNeighborhoods} 
              selected={selectedNeighborhoods} 
              onChange={setSelectedNeighborhoods} 
            />

            {/* Price Filter Min */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Valor Mínimo (R$)
              </label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Ex: 100.000"
                className="w-full h-12 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              />
            </div>

            {/* Price Filter Max */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Valor Máximo (R$)
              </label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Ex: 500.000"
                className="w-full h-12 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-[#1C1C1C] text-sm focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t-2 border-[#E0E8E7] flex justify-between items-center">
            <p className="text-sm text-[#5A5754]">
              <span className="font-bold text-[#00A896]">{filteredProperties.length}</span>{' '}
              {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSearchCode('');
                setSelectedTypes([]);
                setSelectedStatuses([]);
                setSelectedCities([]);
                setSelectedNeighborhoods([]);
                setMinPrice('');
                setMaxPrice('');
              }}
              className="text-sm text-red-500 hover:underline font-medium"
            >
              Limpar Filtros
            </button>
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