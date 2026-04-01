import { PropertyCard } from './PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function FeaturedProperties() {
  const { properties } = useProperties();
  const featuredProperties = properties.slice(0, 6);

  return (
    <section id="imoveis" className="py-32 bg-gradient-to-b from-[#F0F7F6] to-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Portfólio Premium</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            Imóveis em Destaque
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Seleção exclusiva dos melhores imóveis disponíveis no mercado
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {featuredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#9A9690] font-light text-lg">
              Nenhum imóvel disponível no momento.
            </p>
          </div>
        )}

        {/* Ver Todos Button */}
        {properties.length > 6 && (
          <div className="text-center">
            <Link
              to="/imoveis"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] hover:-translate-y-1 transition-all duration-300"
            >
              Ver Todos os Imóveis
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}