import { Store, Home, Factory, MessageCircle } from 'lucide-react';

export function ServiceCategories() {
  const categories = [
    {
      icon: Store,
      title: 'Para Comércio',
      description: 'A Imobiliária Vita e Morais trabalha com a venda e o aluguel de Imóveis para comércio, salas e pontos comerciais.'
    },
    {
      icon: Home,
      title: 'Para Você',
      description: 'Trabalhamos para proporcionar a melhor experiência no aluguel, na compra e na assessoria de Imóveis como casas, apartamentos, condomínios fechados, terrenos e chácaras.'
    },
    {
      icon: Factory,
      title: 'Para Indústria',
      description: 'Também te auxiliamos na compra, alocação de imóveis industriais, galpões e terrenos.'
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFA] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00A896] blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Nossos Serviços</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            Soluções Completas para
            <br />
            <span className="text-[#00A896]">Cada Necessidade</span>
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Da casa dos sonhos ao ponto comercial ideal, temos a solução perfeita para você
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white border-2 border-[#E0E8E7] rounded-2xl p-10 hover:border-[#00A896] hover:shadow-[0_20px_60px_rgba(0,168,150,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="mb-8 relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00A896] to-[#028174] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_8px_24px_rgba(0,168,150,0.2)]">
                  <category.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                
                {/* Decorative Ring */}
                <div className="absolute -top-2 -left-2 w-24 h-24 border-2 border-[#00A896] rounded-2xl opacity-0 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <h3 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C] mb-4 group-hover:text-[#00A896] transition-colors duration-300">
                {category.title}
              </h3>
              
              <p className="text-[#5A5754] leading-relaxed font-light mb-6">
                {category.description}
              </p>

              {/* CTA Button */}
              <a
                href="https://wa.me/5511942113331"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-[0_8px_24px_rgba(0,168,150,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Fale Conosco
              </a>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A896] to-[#028174] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-10 bg-gradient-to-br from-white to-[#F0F7F6] rounded-2xl border-2 border-[#E0E8E7]">
          <h3 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C] mb-3">
            Não Encontrou o Que Procura?
          </h3>
          <p className="text-[#5A5754] mb-6 font-light">
            Entre em contato conosco e descubra todas as soluções que temos para você
          </p>
          <a
            href="https://wa.me/5511942113331"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-10 py-4 rounded-xl font-semibold text-sm tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] hover:-translate-y-1 transition-all duration-300"
          >
            Fale com um Especialista
          </a>
        </div>
      </div>
    </section>
  );
}