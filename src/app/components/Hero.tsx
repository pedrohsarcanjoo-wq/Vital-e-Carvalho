import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Hero() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    type: 'Apartamento',
    city: 'São Paulo',
    price: 'Até R$ 300.000'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to all properties page with filters
    navigate('/imoveis');
  };

  return (
    <section className="relative pt-44 pb-32 bg-gradient-to-br from-white via-[#F0F7F6] to-[#E8F8F6] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-[#00A896] blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#028174] blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-8 hover:bg-[rgba(0,168,150,0.12)] transition-colors">
              <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">Excelência Imobiliária desde 2009</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Poppins'] text-[clamp(42px,5.5vw,72px)] font-extrabold leading-[1.08] tracking-tight text-[#1C1C1C] mb-8">
              Encontre o Imóvel dos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A896] to-[#028174]">
                Seus Sonhos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-[#5A5754] leading-relaxed mb-10 max-w-xl font-light">
              Mais de 15 anos conectando pessoas aos melhores imóveis com excelência, confiança e resultados que transformam vidas.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-8 mb-12">
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1.5 h-16 bg-gradient-to-b from-[#00A896] to-[#028174] rounded-full group-hover:h-20 transition-all"></div>
                <div>
                  <div className="text-3xl font-bold text-[#1C1C1C] font-['Poppins'] mb-0.5">2.400+</div>
                  <div className="text-xs text-[#9A9690] uppercase tracking-wider font-semibold">Imóveis</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1.5 h-16 bg-gradient-to-b from-[#00A896] to-[#028174] rounded-full group-hover:h-20 transition-all"></div>
                <div>
                  <div className="text-3xl font-bold text-[#1C1C1C] font-['Poppins'] mb-0.5">15+</div>
                  <div className="text-xs text-[#9A9690] uppercase tracking-wider font-semibold">Anos</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-1.5 h-16 bg-gradient-to-b from-[#00A896] to-[#028174] rounded-full group-hover:h-20 transition-all"></div>
                <div>
                  <div className="text-3xl font-bold text-[#1C1C1C] font-['Poppins'] mb-0.5">5.200+</div>
                  <div className="text-xs text-[#9A9690] uppercase tracking-wider font-semibold">Clientes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Search Card */}
          <div className="flex-1 w-full max-w-lg">
            <div className="bg-white/80 backdrop-blur-xl border-2 border-[#E0E8E7] rounded-3xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_100px_rgba(0,168,150,0.15)] transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C]">
                    Buscar Imóvel
                  </h3>
                  <p className="text-sm text-[#9A9690] font-light">Encontre sua nova casa</p>
                </div>
              </div>
              
              <form onSubmit={handleSearch} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2.5">Tipo de Imóvel</label>
                  <select 
                    value={searchFilters.type}
                    onChange={(e) => setSearchFilters({...searchFilters, type: e.target.value})}
                    className="w-full h-14 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-sm text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                  >
                    <option>Apartamento</option>
                    <option>Casa</option>
                    <option>Cobertura</option>
                    <option>Loft</option>
                    <option>Terreno</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2.5">Cidade</label>
                  <select 
                    value={searchFilters.city}
                    onChange={(e) => setSearchFilters({...searchFilters, city: e.target.value})}
                    className="w-full h-14 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-sm text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                  >
                    <option>São Paulo</option>
                    <option>Rio de Janeiro</option>
                    <option>Belo Horizonte</option>
                    <option>Curitiba</option>
                    <option>Porto Alegre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2.5">Faixa de Preço</label>
                  <select 
                    value={searchFilters.price}
                    onChange={(e) => setSearchFilters({...searchFilters, price: e.target.value})}
                    className="w-full h-14 px-4 border-2 border-[#E0E8E7] rounded-xl bg-white text-sm text-[#1C1C1C] focus:border-[#00A896] focus:ring-4 focus:ring-[rgba(0,168,150,0.12)] outline-none transition-all font-medium"
                  >
                    <option>Até R$ 300.000</option>
                    <option>R$ 300.000 - R$ 500.000</option>
                    <option>R$ 500.000 - R$ 800.000</option>
                    <option>R$ 800.000 - R$ 1.200.000</option>
                    <option>Acima de R$ 1.200.000</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full h-14 bg-gradient-to-br from-[#00A896] to-[#028174] text-white rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <Search size={20} />
                  Buscar Imóveis
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}