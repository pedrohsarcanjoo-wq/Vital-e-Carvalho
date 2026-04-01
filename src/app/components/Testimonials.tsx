import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Mariana Costa',
    role: 'Empresária',
    text: 'A Vita & Carvalho superou todas as minhas expectativas. Encontrei o apartamento perfeito em menos de um mês. Profissionalismo e atenção em cada detalhe!',
    rating: 5,
    avatar: 'MC',
  },
  {
    name: 'Roberto Silva',
    role: 'Investidor',
    text: 'Excelente corretora! Me ajudaram a encontrar imóveis com ótimo potencial de valorização. O suporte da equipe foi impecável do início ao fim.',
    rating: 5,
    avatar: 'RS',
  },
  {
    name: 'Ana Paula Ferreira',
    role: 'Médica',
    text: 'Realizei o sonho da casa própria com a ajuda da Vita & Carvalho. Equipe atenciosa, transparente e extremamente competente. Recomendo de olhos fechados!',
    rating: 5,
    avatar: 'AF',
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-32 bg-gradient-to-b from-[#F0F7F6] to-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Depoimentos</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            O Que Nossos Clientes Dizem
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Histórias reais de quem confiou na Vita & Carvalho
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-8 hover:shadow-[0_20px_60px_rgba(0,168,150,0.12)] hover:-translate-y-2 hover:border-[#00A896] transition-all duration-500 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#00A896] text-[#00A896]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#5A5754] leading-relaxed mb-8 font-light text-base">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-[#E0E8E7]">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-500">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-['Poppins'] font-semibold text-[#2C2C2C]">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#9A9690] font-light">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}