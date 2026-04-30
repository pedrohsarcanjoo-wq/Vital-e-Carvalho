import { Award, Shield, Heart, TrendingUp, Users, HeadphonesIcon } from 'lucide-react';

const differentials = [
  {
    icon: Award,
    title: 'Excelência Comprovada',
    description: 'Reconhecidos no mercado pela qualidade e profissionalismo em todas as negociações.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Processos transparentes com suporte especializado e indicação de assessoria contábil parceira para a sua tranquilidade.',
  },
  {
    icon: Heart,
    title: 'Atendimento Personalizado',
    description: 'Cada cliente é único. Oferecemos soluções sob medida para suas necessidades.',
  },
  {
    icon: TrendingUp,
    title: 'Valorização Garantida',
    description: 'Imóveis selecionados em regiões estratégicas com alto potencial de valorização.',
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Corretores altamente capacitados e com vasto conhecimento do mercado imobiliário.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suporte Contínuo',
    description: 'Acompanhamento completo desde a primeira visita até a entrega das chaves.',
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#00A896] blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Nossos Valores</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            Por Que Escolher a
            <br />
            <span className="text-[#00A896]">Vita & Carvalho?</span>
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Comprometimento, expertise e resultados que fazem a diferença
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="group p-8 border-2 border-[#E0E8E7] rounded-2xl hover:border-[#00A896] hover:shadow-[0_20px_60px_rgba(0,168,150,0.12)] hover:-translate-y-2 transition-all duration-500 bg-white"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <item.icon className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-['Poppins'] text-xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#00A896] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#5A5754] leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}