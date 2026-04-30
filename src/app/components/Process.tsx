import { Search, ClipboardCheck, Home, Key } from 'lucide-react';

export function Process() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Encontre seu Imóvel',
      description: 'Busque em nosso portfólio premium ou conte-nos suas necessidades para uma busca personalizada.',
      highlight: 'Mais de 2.400 opções'
    },
    {
      number: '02',
      icon: ClipboardCheck,
      title: 'Análise e Vistoria',
      description: 'Após a visita e aceitação da proposta pelo proprietário, nossa equipe realiza análise da documentação e vistoria técnica.',
      highlight: 'Segurança garantida'
    },
    {
      number: '03',
      icon: Home,
      title: 'Negociação',
      description: 'Negociamos as melhores condições de compra, financiamento e prazos em seu nome.',
      highlight: 'Economia de até 15%'
    },
    {
      number: '04',
      icon: Key,
      title: 'Concretização',
      description: 'Acompanhamento detalhado e seguro até a entrega das chaves, com foco na tranquilidade de ambas as partes.',
      highlight: 'Processo seguro'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-[#F0F7F6] to-white relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(#00A896 1px, transparent 1px), linear-gradient(90deg, #00A896 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Como Funciona</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            Jornada Simples e
            <br />
            <span className="text-[#00A896]">Totalmente Transparente</span>
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Quatro etapas estratégicas para você realizar o sonho do imóvel ideal com total segurança
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-[100px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#E0E8E7] via-[#00A896] to-[#E0E8E7]"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-8 hover:border-[#00A896] hover:shadow-[0_20px_60px_rgba(0,168,150,0.12)] transition-all duration-500 hover:-translate-y-3 group">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <span className="font-['Poppins'] text-xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[rgba(0,168,150,0.1)] flex items-center justify-center mb-6 group-hover:bg-[#00A896] transition-colors duration-500">
                    <step.icon className="w-7 h-7 text-[#00A896] group-hover:text-white transition-colors duration-500" strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="font-['Poppins'] text-xl font-bold text-[#2C2C2C] mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-[#5A5754] leading-relaxed mb-4 font-light">
                    {step.description}
                  </p>

                  {/* Highlight */}
                  <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] text-[#028174] px-3 py-1.5 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></div>
                    <span className="text-xs font-semibold">{step.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#5A5754] mb-6 font-light">Pronto para começar sua jornada?</p>
          <button className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-10 py-4 rounded-xl font-semibold text-sm tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] hover:-translate-y-1 transition-all duration-300">
            Iniciar Agora
          </button>
        </div>
      </div>
    </section>
  );
}
